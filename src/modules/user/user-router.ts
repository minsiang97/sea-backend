import express, { Router } from "express";
import { UserController } from "./user-controller";
import { authenticateToken, wrap } from "../auth/auth-middleware";

const UserRouter: Router = express.Router();

UserRouter.post("/create", UserController.createUser);

UserRouter.post("/login", UserController.login);
UserRouter.post(
  "/refresh",
  wrap(authenticateToken),
  wrap(UserController.refreshAccessToken)
);

export default UserRouter;
