import mongoose, { Schema } from "mongoose";
import { UserSchemaInterface } from "./user-interface";
import { v4 as uuidV4 } from "uuid";

const UserSchema: Schema = new Schema<UserSchemaInterface>(
  {
    _id: { type: String, default: uuidV4 },
    email: { type: String, required: true },
    passwordHash: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<UserSchemaInterface>("User", UserSchema);
