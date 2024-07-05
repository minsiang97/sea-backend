import { Request, Response } from "express";
import UserModel from "./user-model";
import { UserHelper } from "./user-helper";
import {
  LoginResponse,
  RefreshTokenResponse,
  UserRequest,
} from "./user-interface";
import { AuthHelper } from "../auth/auth-helper";
import { AuthRequest } from "../auth/auth-interface";

export namespace UserController {
  export const createUser = async (req: Request, res: Response) => {
    try {
      const { email, password }: UserRequest = req.body;
      const lowercaseEmail = email.toLowerCase();
      const userExist = await UserModel.findOne({ email: lowercaseEmail });
      if (userExist) {
        return res.status(400).json({ message: "User already exist" });
      }

      const hashedPassword = await UserHelper.hashPassword(password);
      const user = await UserModel.create({
        email: lowercaseEmail,
        passwordHash: hashedPassword,
      });

      if (!user) {
        throw new Error("Not able to create user");
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
      const lowercaseEmail = email.toLowerCase();
      const user = await UserModel.findOne({ email: lowercaseEmail });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Email or password is invalid" });
      }

      const verified = await UserHelper.verifyPassword(
        password,
        user.passwordHash
      );

      if (!verified) {
        return res
          .status(403)
          .json({ message: "Email or password is invalid" });
      }

      const jwtToken = await AuthHelper.generateJwt({
        email: user.email,
        id: user._id,
      });
      const refreshToken = await AuthHelper.generateJwt(
        { email: user.email, id: user._id },
        true
      );
      const response: LoginResponse = {
        email: user.email,
        token: jwtToken,
        refreshToken,
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

  export const refreshAccessToken = async (req: AuthRequest, res: Response) => {
    try {
      const { id, email } = req.user;

      const jwtToken = await AuthHelper.generateJwt({ email, id });

      const response: RefreshTokenResponse = {
        email,
        token: jwtToken,
      };
      return res
        .status(200)
        .json({ message: "Refresh Access Token Successfully", data: response });
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
