import "dotenv/config";
import express from "express";
import connectDB from "./db/db.js";
const app = express();


app.listen(3000, () => {
  console.log("Server is running at port", process.env.PORT);
});
