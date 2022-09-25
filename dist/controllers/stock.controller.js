"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStock = exports.getAllStocks = exports.addNewStock = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const item_model_1 = __importDefault(require("../models/item.model"));
const stock_model_1 = __importDefault(require("../models/stock.model"));
const addNewStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stock = req.body;
        yield stock_model_1.default.create(stock);
        res.status(201).json({ message: "Stock created successfully." });
    }
    catch (error) {
        next(error);
    }
});
exports.addNewStock = addNewStock;
const getAllStocks = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stocks = yield stock_model_1.default.find();
        res.status(200).json({ data: stocks });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllStocks = getAllStocks;
const deleteStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stockId = req.params.stockId;
        if (!mongoose_1.default.Types.ObjectId.isValid(stockId))
            throw new Error("Please provide a valid item id");
        if (!(yield stock_model_1.default.findById(stockId)))
            throw new Error("Stock not found");
        yield stock_model_1.default.findByIdAndDelete(stockId);
        yield item_model_1.default.deleteMany({ stock: stockId });
        res.status(200).json({ message: "Stock deleted successfully." });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteStock = deleteStock;
