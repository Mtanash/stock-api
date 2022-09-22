"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const limiter_1 = __importDefault(require("./config/limiter"));
const connect_1 = require("./db/connect");
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const item_route_1 = require("./routes/item.route");
const stock_route_1 = require("./routes/stock.route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(limiter_1.default);
(0, connect_1.connectDB)(process.env.MONGODB_CONNECTION_URL);
exports.app.get("/", (_, res) => {
    res.send("<h1>Stock API Working 🚀🚀</h1>");
});
exports.app.use("/items", item_route_1.itemRouter);
exports.app.use("/stocks", stock_route_1.stockRouter);
exports.app.use(error_middleware_1.default);
exports.app.use((_, res) => {
    res.status(404).json({
        message: "Ohh you are lost, read the API documentation to find your way back home 😂",
    });
});
