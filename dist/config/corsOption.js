"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whitelist = [
    "http://localhost:3000",
    "https://stock-app-gold.vercel.app/",
    "https://stock-lrobth1t0-mtanash.vercel.app/",
    "https://stock-app-git-main-mtanash.vercel.app/",
    "https://main.d3k7987c8gyk0m.amplifyapp.com/",
];
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
