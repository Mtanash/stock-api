import express from "express";
import {
  addNewStock,
  deleteStock,
  getAllStocks,
  getStock,
  getStockItems,
} from "../controllers/stock.controller";
import validationMiddleware from "../middlewares/auth.middleware";

export const stockRouter = express.Router();

stockRouter.post(
  "/",
  validationMiddleware({ userRoles: ["admin"] }),
  addNewStock
);
stockRouter.get("/", getAllStocks);
stockRouter.get("/:stockId", getStock);
stockRouter.get("/:stockId/items", getStockItems);
stockRouter.delete(
  "/:stockId",
  validationMiddleware({ userRoles: ["admin"] }),
  deleteStock
);
