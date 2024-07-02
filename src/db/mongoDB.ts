import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

mongoose.set("debug", true);
const dbMongo = mongoose.connection;
dbMongo.on("error", console.error.bind(console, "db mongo connection error: "));
dbMongo.once("open", function () {
  console.log("DB Mongo Connected successfully...");
});
