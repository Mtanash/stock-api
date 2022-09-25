"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
const express_1 = __importDefault(require("express"));
const item_controller_1 = require("../controllers/item.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
exports.itemRouter = express_1.default.Router();
exports.itemRouter.get("/", item_controller_1.getAllItems);
exports.itemRouter.post("/", auth_middleware_1.default, item_controller_1.addNewItem);
exports.itemRouter.post("/:itemId", auth_middleware_1.default, item_controller_1.addNewDateToItem);
exports.itemRouter.delete("/:itemId", auth_middleware_1.default, item_controller_1.deleteItem);
exports.itemRouter.patch("/:itemId", auth_middleware_1.default, item_controller_1.updateItemName);
exports.itemRouter.patch("/:itemId/:dateId", auth_middleware_1.default, item_controller_1.updateDate);
exports.itemRouter.delete("/:itemId/:dateId", auth_middleware_1.default, item_controller_1.deleteDate);
