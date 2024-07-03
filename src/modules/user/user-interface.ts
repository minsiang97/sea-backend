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

export interface LoginResponse {
  email: string;
  token: string;
}
