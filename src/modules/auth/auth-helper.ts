import jwt, { SignOptions } from "jsonwebtoken";
import _ from "lodash";

export namespace AuthHelper {
  export const SIGN_OPTIONS: SignOptions = {
    expiresIn: "24h",
  };

  export const SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";

  export const generateJwt = async (params: { email: string; id: string }) => {
    return jwt.sign(params, SECRET_KEY, SIGN_OPTIONS);
  };

  export const getJwtTokenFromAuthToken = (authToken: string): string => {
    if (_.isEmpty(authToken)) {
      throw new Error("No authorization headers");
    }

    const authTokenArray = authToken.split(" ");

    if (authTokenArray.length != 2) {
      throw new Error("Bad authorization header value");
    }

    // * Check auth prefix
    const authPrefix = authTokenArray[0];
    if (_.isEmpty(authPrefix) || authPrefix !== "Bearer") {
      throw new Error("Bad authorization header value");
    }

    // * Check auth header value
    const jwtToken = authTokenArray[1] ?? "";
    if (_.isEmpty(jwtToken)) {
      throw new Error("Null token value");
    }

    return jwtToken;
  };
}
