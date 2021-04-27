"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var genericControllers_1 = __importDefault(require("../../utils/genericControllers"));
var post_model_1 = __importDefault(require("./post.model"));
var controller = genericControllers_1.default(post_model_1.default, "author");
exports.default = controller;
