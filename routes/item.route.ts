import express from "express";
import {
  addNewDateToItem,
  addNewItem,
  deleteDate,
  deleteItem,
  updateDate,
  updateItemName,
} from "../controllers/item.controller";
import validationMiddleware from "../middlewares/auth.middleware";

export const itemRouter = express.Router();

itemRouter.post("/", validationMiddleware({ userRole: "user" }), addNewItem);
itemRouter.post(
  "/:stockId/:itemId",
  validationMiddleware({ userRole: "user" }),
  addNewDateToItem
);
itemRouter.delete(
  "/:stockId/:itemId",
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
