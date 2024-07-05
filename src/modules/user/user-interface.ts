export interface UserSchemaInterface {
  _id: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserRequest {
  email: string;
  password: string;
}

export interface RefreshTokenResponse {
  email: string;
  token: string;
}

export interface LoginResponse extends RefreshTokenResponse {
  refreshToken: string;
}
