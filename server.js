import app from "./app.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const { DB_HOST } = process.env;
const { PORT } = process.env || 8080;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DB is working");
    app.listen(PORT);
  })
  .then(() => {
    console.log("Server running. Use our API on port: 3000");
  })
  .catch((err) => {
    console.log("err", err);
    process.exit(1);
  });
