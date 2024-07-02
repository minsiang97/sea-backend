import express, { Router } from "express";
import { UserController } from "./user-controller";

const UserRouter: Router = express.Router();

UserRouter.post("/create", UserController.createUser);

UserRouter.post("/login", UserController.login);

export default UserRouter;
