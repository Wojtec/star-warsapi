import dotenv from "dotenv"; // Import dotenv package
dotenv.config();
import express, { Application, Request, Response, NextFunction } from "express"; // Import express and interface Application
import mongoose from "mongoose"; // Import mongoose
import config from "./config"; // Import config with process environments.

const app: Application = express();

// Import routes
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

//Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ error: err.message });
});

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
