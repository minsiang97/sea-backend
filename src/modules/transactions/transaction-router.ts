import express, { Router } from "express";
import { TransactionController } from "./transaction-controller";
import { authenticateToken, wrap } from "../auth/auth-middleware";

const TransactionRouter: Router = express.Router();

TransactionRouter.post(
  "/create",
  wrap(authenticateToken),
  wrap(TransactionController.createTransaction)
);

TransactionRouter.get(
  "/transaction/:_id",
  wrap(authenticateToken),
  wrap(TransactionController.getTransaction)
);

TransactionRouter.get(
  "/transaction-list",
  wrap(authenticateToken),
  wrap(TransactionController.getListTransaction)
);

export default TransactionRouter;
