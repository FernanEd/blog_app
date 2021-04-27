"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var CONNECTION_URI = process.env.CONNECTION_URI || "";
var PORT = process.env.PORT || 4001;
var SECRETS = {
    jwt: process.env.JWT_SECRET || "secret",
    jwtExp: "6h",
};
exports.default = { CONNECTION_URI: CONNECTION_URI, PORT: PORT, SECRETS: SECRETS };
