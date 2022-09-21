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
exports.updateDate = exports.deleteDate = exports.updateItemName = exports.deleteItem = exports.addNewDateToItem = exports.getAllItems = exports.addNewItem = void 0;
const item_model_1 = __importDefault(require("../models/item.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const stock_model_1 = __importDefault(require("../models/stock.model"));
const addNewItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = req.body;
        // validate item
        const stock = yield stock_model_1.default.findById(item.stock.toString());
        if (!stock)
            throw new Error("No stock found for this id.");
        // check if item already exists
        const itemExist = yield item_model_1.default.findOne({
            name: item.name.toLowerCase().trim(),
        });
        if (!itemExist) {
            yield item_model_1.default.create({
                name: item.name,
                stock: item.stock,
                dates: [
                    {
                        date: item.date,
                        quantity: item.quantity,
                    },
                ],
            });
            res.status(201).json({ message: "Item added successfully." });
        }
        else {
            res.status(404).json({ message: "Item already exists." });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.addNewItem = addNewItem;
const getAllItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stock } = req.query;
        const queryObject = {};
        if (stock) {
            queryObject.stock = stock.toString();
        }
        const result = item_model_1.default.find(queryObject);
        result.sort("name");
        result.populate({ path: "stock" });
        const items = yield result;
        res.status(200).json({ data: items });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllItems = getAllItems;
const addNewDateToItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.itemId;
        if (!mongoose_1.default.Types.ObjectId.isValid(itemId))
            throw new Error("Please provide a valid id");
        const newDate = req.body;
        const item = yield item_model_1.default.findById(itemId);
        if (!item)
            throw new Error("Item not found");
        item.dates.push(newDate);
        yield item.save();
        res.status(200).json({ message: "New date added successfully." });
    }
    catch (error) {
        next(error);
    }
});
exports.addNewDateToItem = addNewDateToItem;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.itemId;
        if (!mongoose_1.default.Types.ObjectId.isValid(itemId))
            throw new Error("Please provide a valid id");
        if (!(yield item_model_1.default.findById(itemId)))
            throw new Error("Item not found");
        yield item_model_1.default.findByIdAndDelete(itemId);
        res.status(200).json({ message: "Item deleted successfully." });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteItem = deleteItem;
const updateItemName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const itemId = req.params.itemId;
        const newName = (_a = req.body) === null || _a === void 0 ? void 0 : _a.name;
        if (!mongoose_1.default.Types.ObjectId.isValid(itemId))
            throw new Error("Please provide a valid item id");
        const item = yield item_model_1.default.findById(itemId);
        if (!item)
            throw new Error("Item not found");
        item.name = newName;
        yield item.save();
        res.status(200).json({ message: "Item updated successfully." });
    }
    catch (error) {
        next(error);
    }
});
exports.updateItemName = updateItemName;
const deleteDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.itemId;
        const dateId = req.params.dateId;
        if (!mongoose_1.default.Types.ObjectId.isValid(itemId))
            throw new Error("Please provide a valid item id");
        if (!mongoose_1.default.Types.ObjectId.isValid(dateId))
            throw new Error("Please provide a valid date id");
        const item = yield item_model_1.default.findById(itemId);
        if (!item)
            throw new Error("Item not found");
        const dateIndex = item.dates.findIndex((date) => { var _a; return ((_a = date._id) === null || _a === void 0 ? void 0 : _a.toString()) === dateId; });
        if (dateIndex < 0)
            throw new Error("Date not found");
        item.dates = item.dates.filter((_date, index) => index !== dateIndex);
        yield item.save();
        res.status(200).json({ message: "Date deleted successfully." });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteDate = deleteDate;
const updateDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const itemId = req.params.itemId;
        const dateId = req.params.dateId;
        const newQuantity = (_b = req.body) === null || _b === void 0 ? void 0 : _b.quantity;
        if (!mongoose_1.default.Types.ObjectId.isValid(itemId))
            throw new Error("Please provide a valid item id");
        if (!mongoose_1.default.Types.ObjectId.isValid(dateId))
            throw new Error("Please provide a valid date id");
        if (!newQuantity || newQuantity < 1)
            throw new Error("Please provide a valid quantity");
        const item = yield item_model_1.default.findById(itemId);
        if (!item)
            throw new Error("Item not found");
        const dateIndex = item.dates.findIndex((date) => { var _a; return ((_a = date._id) === null || _a === void 0 ? void 0 : _a.toString()) === dateId; });
        if (dateIndex < 0)
            throw new Error("Date not found");
        item.dates[dateIndex].quantity = newQuantity;
        yield item.save();
        res.status(200).json({ message: "Date quantity updated successfully." });
    }
    catch (error) {
        next(error);
    }
});
exports.updateDate = updateDate;
