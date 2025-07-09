import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Mongodb Connection Error: ", error);
    process.exit(1);
  }
};

export default connectDB;
