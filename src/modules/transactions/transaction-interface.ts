export interface TransactionSchemaInterface {
  _id: string;
  amount: number;
  description: string;
  type: string;
  user_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TransactionRequest {
  amount: number;
  description: string;
  type: string;
}

export interface GetTransactionRequest {
  _id: string;
}

export interface GetTransactionQuery {
  page?: number;
  limit?: number;
}
