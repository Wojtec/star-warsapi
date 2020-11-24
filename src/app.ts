import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import mongoose from "mongoose";
import config from "./config";
const app: Application = express();

import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";

// settings
app.set("port", config.PORT);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);

// database connection
mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database is connected!"))
  .catch((err) => console.log(err));

export default app;
