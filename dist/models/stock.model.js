"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const stockSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please provide a valid name"],
        lowercase: true,
        trim: true,
    },
});
const Stock = mongoose_1.default.model("stock", stockSchema);
exports.default = Stock;
