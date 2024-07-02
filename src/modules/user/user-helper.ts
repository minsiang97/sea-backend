import * as bcrypt from "bcrypt";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

export namespace UserHelper {
  export const SIGN_OPTIONS: SignOptions = {
    expiresIn: "24h",
  };

  const SECRET_KEY = process.env.JWT_SECRET_KEY ?? "secret";

  export const hashPassword = async (password: string) => {
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);
    return passwordHash;
  };

  export const verifyPassword = async (
    password: string,
    hashPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
  };

  export const generateJwt = async (params: { email: string }) => {
    return jwt.sign(params, SECRET_KEY, SIGN_OPTIONS);
  };
}
