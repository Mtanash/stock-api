"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
    stock: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "stock",
    },
    name: {
        type: String,
        required: [true, "Please provide a valid name"],
        lowercase: true,
        trim: true,
    },
    dates: [
        {
            date: {
                month: {
                    type: Number,
                    required: [true, "Please provide a valid month"],
                    min: [1, "Month date must be between 1 and 12"],
                    max: [12, "Month date must be between 1 and 12"],
                },
                year: {
                    type: Number,
                    required: [true, "Please provide a valid year"],
                },
            },
            quantity: {
                type: Number,
                required: [true, "Please provide a valid quantity"],
                min: [1, "Quantity can not be less than 1"],
            },
        },
    ],
}, {
    timestamps: true,
});
const Item = mongoose_1.default.model("item", itemSchema);
exports.default = Item;
