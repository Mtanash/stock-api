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

itemRouter.post(
  "/",
  validationMiddleware({ userRoles: ["user", "admin"] }),
  addNewItem
);
itemRouter.post(
  "/:itemId",
  validationMiddleware({ userRoles: ["user", "admin"] }),
  addNewDateToItem
);

itemRouter.delete(
  "/:itemId/date/:dateId",
  validationMiddleware({ userRoles: ["user", "admin"] }),
  deleteDate
);

itemRouter.delete(
  "/:stockId/:itemId",
  validationMiddleware({ userRoles: ["user", "admin"] }),
  deleteItem
);
itemRouter.patch(
  "/:itemId",
  validationMiddleware({ userRoles: ["user", "admin"] }),
  updateItemName
);
itemRouter.patch(
  "/:itemId/:dateId",
  validationMiddleware({ userRoles: ["user", "admin"] }),
  updateDate
);
