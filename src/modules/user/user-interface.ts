import { ObjectId } from "mongoose";

export interface UserSchemaInterface {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
}
