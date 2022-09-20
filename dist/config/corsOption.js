"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whitelist = ["http://localhost:3000", "http://localhost:3001"];
const corsOption = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};
exports.default = corsOption;
