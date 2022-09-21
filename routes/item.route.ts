import express from "express";
import {
  addNewItem,
  getAllItems,
  addNewDateToItem,
  deleteItem,
  updateItemName,
  deleteDate,
  updateDate,
} from "../controllers/item.controller";

export const itemRouter = express.Router();

itemRouter.get("/", getAllItems);
itemRouter.post("/", addNewItem);
itemRouter.post("/:itemId", addNewDateToItem);
itemRouter.delete("/:itemId", deleteItem);
itemRouter.patch("/:itemId", updateItemName);
itemRouter.patch("/:itemId/:dateId", updateDate);
itemRouter.delete("/:itemId/:dateId", deleteDate);
