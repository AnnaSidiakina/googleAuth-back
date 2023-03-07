import express from "express";
import logger from "morgan";
import cors from "cors";
import passport from "passport";
const passportSetup = require("./passport");

import userRouter from "./routes/api/user.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
