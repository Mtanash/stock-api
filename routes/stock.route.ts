import express from "express";
import {
  addNewStock,
  getAllStocks,
  deleteStock,
} from "../controllers/stock.controller";

export const stockRouter = express.Router();

stockRouter.post("/", addNewStock);
stockRouter.get("/", getAllStocks);
stockRouter.delete("/:stockId", deleteStock);
