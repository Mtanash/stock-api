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
import validationMiddleware from "../middlewares/auth.middleware";

export const itemRouter = express.Router();

itemRouter.get("/", getAllItems);
itemRouter.post("/", validationMiddleware({ userRole: "user" }), addNewItem);
itemRouter.post(
  "/:itemId",
  validationMiddleware({ userRole: "user" }),
  addNewDateToItem
);
itemRouter.delete(
  "/:itemId",
  validationMiddleware({ userRole: "user" }),
  deleteItem
);
itemRouter.patch(
  "/:itemId",
  validationMiddleware({ userRole: "user" }),
  updateItemName
);
itemRouter.patch(
  "/:itemId/:dateId",
  validationMiddleware({ userRole: "user" }),
  updateDate
);
itemRouter.delete(
  "/:itemId/:dateId",
  validationMiddleware({ userRole: "user" }),
  deleteDate
);
