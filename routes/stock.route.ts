import express from "express";
import { addNewStock, getAllStocks } from "../controllers/stock.controller";

export const stockRouter = express.Router();

stockRouter.post("/", addNewStock);
stockRouter.get("/", getAllStocks);
