import express from "express";
import {
  addNewDateToItem,
  addNewItem,
  deleteDate,
  deleteItem,
  getAllItems,
  updateDate,
  updateItemName,
} from "../controllers/item.controller";
import validateTokenMiddleware from "../middlewares/auth.middleware";

export const itemRouter = express.Router();

itemRouter.get("/", getAllItems);
itemRouter.post("/", validateTokenMiddleware, addNewItem);
itemRouter.post("/:itemId", validateTokenMiddleware, addNewDateToItem);
itemRouter.delete("/:itemId", validateTokenMiddleware, deleteItem);
itemRouter.patch("/:itemId", validateTokenMiddleware, updateItemName);
itemRouter.patch("/:itemId/:dateId", validateTokenMiddleware, updateDate);
itemRouter.delete("/:itemId/:dateId", validateTokenMiddleware, deleteDate);
