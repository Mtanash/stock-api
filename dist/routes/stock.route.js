"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockRouter = void 0;
const express_1 = __importDefault(require("express"));
const stock_controller_1 = require("../controllers/stock.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
exports.stockRouter = express_1.default.Router();
exports.stockRouter.post("/", auth_middleware_1.default, stock_controller_1.addNewStock);
exports.stockRouter.get("/", stock_controller_1.getAllStocks);
exports.stockRouter.delete("/:stockId", auth_middleware_1.default, stock_controller_1.deleteStock);
