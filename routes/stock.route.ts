import express from "express";
import {
  addNewStock,
  deleteStock,
  getAllStocks,
} from "../controllers/stock.controller";
import validationMiddleware from "../middlewares/auth.middleware";

export const stockRouter = express.Router();

stockRouter.post(
  "/",
  validationMiddleware({ userRoles: ["admin"] }),
  addNewStock
);
stockRouter.get("/", getAllStocks);
stockRouter.delete(
  "/:stockId",
  validationMiddleware({ userRoles: ["admin"] }),
  deleteStock
);
