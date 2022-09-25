import express from "express";
import {
  addNewStock,
  deleteStock,
  getAllStocks,
} from "../controllers/stock.controller";
import validateTokenMiddleware from "../middlewares/auth.middleware";

export const stockRouter = express.Router();

stockRouter.post("/", validateTokenMiddleware, addNewStock);
stockRouter.get("/", getAllStocks);
stockRouter.delete("/:stockId", validateTokenMiddleware, deleteStock);
