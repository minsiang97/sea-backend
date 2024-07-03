import { NextFunction, Request, Response } from "express";
import { AuthHelper } from "./auth-helper";
import jwt, { VerifyErrors } from "jsonwebtoken";
import userModel from "../user/user-model";
import _ from "lodash";
import { AuthRequest } from "./auth-interface";

export function wrap(fn: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
}

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No Auth Token" });
  }
  // Get Auth Headers
  let authToken;
  try {
    authToken = AuthHelper.getJwtTokenFromAuthToken(req.headers.authorization);
  } catch (e) {
    let errorMessage = "";
    if (e instanceof Error) {
      errorMessage = e.message;
    } else {
      errorMessage = JSON.stringify(e);
    }
    return res.status(401).json({ message: "No Auth Token " });
  }

  // Verify the JWT token
  jwt.verify(
    authToken,
    AuthHelper.SECRET_KEY,
    async function (err: VerifyErrors | null, tokenPayload: any) {
      if (err) {
        return res.status(401).json({ message: err.message });
      }

      if (!tokenPayload) {
        return res.status(401).json({ message: "Invalid Auth Token" });
      }

      const user = await userModel.findOne({ _id: tokenPayload.id });

      if (!user) {
        return res.status(401).send({ message: "Invalid Auth Token" });
      }

      req.user = {
        id: user._id.toString(),
        email: user.email,
      };

      next();
    }
  );
}
