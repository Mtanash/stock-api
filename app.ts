import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import limiter from "./config/limiter";
import { connectDB } from "./db/connect";
import errorMiddleware from "./middlewares/error.middleware";
import { itemRouter } from "./routes/item.route";
import { stockRouter } from "./routes/stock.route";

export const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

connectDB(process.env.MONGODB_CONNECTION_URL as string);

app.get("/", (_: Request, res: Response) => {
  res.send("<h1>Stock API Working 🚀🚀</h1>");
});

app.use("/items", itemRouter);
app.use("/stocks", stockRouter);

app.use(errorMiddleware);

app.use((_: Request, res: Response) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home 😂",
  });
});
