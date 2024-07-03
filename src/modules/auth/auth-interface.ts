import { Request } from "express";

export interface JwtTokenPayload {
  email: string;
}

export interface AuthRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}
