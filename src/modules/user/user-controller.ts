import { Request, Response } from "express";
import UserModel from "./user-model";
import { UserHelper } from "./user-helper";
import { LoginResponse, UserRequest } from "./user-interface";

export namespace UserController {
  export const createUser = async (req: Request, res: Response) => {
    try {
      const { email, password }: UserRequest = req.body;
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        throw new Error("User already exists");
      }

      const hashedPassword = await UserHelper.hashPassword(password);
      const user = await UserModel.create({
        email,
        passwordHash: hashedPassword,
      });

      if (!user) {
        throw new Error("Unable to create user");
      }

      return res.status(200).json({ message: "Successfully create user!" });
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

  export const login = async (req: Request, res: Response) => {
    try {
      const { email, password }: UserRequest = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(429).json({ message: "User does not exist" });
      }

      const verified = await UserHelper.verifyPassword(
        password,
        user.passwordHash
      );

      if (!verified) {
        return res
          .status(429)
          .json({ message: "Email or password is invalid" });
      }

      const jwtToken = await UserHelper.generateJwt({ email });
      const response: LoginResponse = {
        email,
        token: jwtToken,
      };
      return res
        .status(200)
        .json({ message: "Login Successfully", data: response });
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