import { Request, Response } from "express";
import {
  GetTransactionQuery,
  GetTransactionRequest,
  TransactionRequest,
} from "./transaction-interface";
import transactionModel from "./transaction-model";
import { AuthRequest } from "../auth/auth-interface";

export namespace TransactionController {
  export const createTransaction = async (req: AuthRequest, res: Response) => {
    try {
      const { amount, description, type }: TransactionRequest = req.body;
      const { id } = req.user;
      const transaction = await transactionModel.create({
        amount,
        description,
        type,
        user_id: id,
      });

      if (!transaction) {
        throw new Error("Unable to create transaction");
      }

      return res.status(200).json({
        message: "Successfully created transaction",
        data: transaction,
      });
    } catch (err: any) {
      let errorMessage = "";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = JSON.stringify(err);
      }
      return res.status(500).json({ message: errorMessage });
    }
  };

  export const getTransaction = async (req: AuthRequest, res: Response) => {
    try {
      const { _id } = req.params;
      const { id } = req.user;
      const transaction = await transactionModel.findOne({ _id, user_id: id });
      if (!transaction) {
        return res.status(404).json({ message: "No transaction exist" });
      }
      return res
        .status(200)
        .json({ message: "Get Transaction Successfully", data: transaction });
    } catch (err: any) {
      let errorMessage = "";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = JSON.stringify(err);
      }
      return res.status(500).json({ message: errorMessage });
    }
  };

  export const getListTransaction = async (req: AuthRequest, res: Response) => {
    try {
      const { page, limit }: GetTransactionQuery = req.query;
      const { id } = req.user;

      if (page === undefined || limit === undefined) {
        throw new Error("Page or limit is missing");
      }
      const offset = (page - 1) * limit;

      const transactionQuery = transactionModel
        .find({ user_id: id })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);

      const countQuery = transactionModel.countDocuments();

      const [transaction, total] = await Promise.all([
        transactionQuery,
        countQuery,
      ]);

      if (total === 0) {
        return res.status(404).json({ message: "No Transactions exist" });
      }

      return res.status(200).json({
        message: "Get Transactions Successfully",
        data: transaction,
        total,
      });
    } catch (err: any) {
      let errorMessage = "";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = JSON.stringify(err);
      }
      return res.status(500).json({ message: errorMessage });
    }
  };
}
