"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var genericControllers_1 = __importDefault(require("../../utils/genericControllers"));
var user_model_1 = __importDefault(require("./user.model"));
var controller = genericControllers_1.default(user_model_1.default);
exports.default = controller;
