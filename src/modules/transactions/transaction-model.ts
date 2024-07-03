import mongoose, { Schema } from "mongoose";
import { v4 as uuidV4 } from "uuid";
import { TransactionSchemaInterface } from "./transaction-interface";

const TransactionSchema: Schema = new Schema<TransactionSchemaInterface>(
  {
    _id: { type: String, default: uuidV4 },
    type: { type: String },
    description: { type: String },
    amount: { type: Number },
    user_id: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<TransactionSchemaInterface>(
  "Transaction",
  TransactionSchema
);
