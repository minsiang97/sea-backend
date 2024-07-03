import * as bcrypt from "bcrypt";
export namespace UserHelper {
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
}
