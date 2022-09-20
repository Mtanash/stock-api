"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Whoops!! something went wrong";
    res.status(status).json({ message });
};
exports.default = errorMiddleware;
