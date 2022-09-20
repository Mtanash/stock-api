"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockRouter = void 0;
const express_1 = __importDefault(require("express"));
const stock_controller_1 = require("../controllers/stock.controller");
exports.stockRouter = express_1.default.Router();
exports.stockRouter.post("/", stock_controller_1.addNewStock);
exports.stockRouter.get("/", stock_controller_1.getAllStocks);
