"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var post_controllers_1 = __importDefault(require("./post.controllers"));
var auth_1 = require("../../utils/auth");
var router = express_1.Router();
router.route("/").get(post_controllers_1.default.getMany).post(auth_1.protect, post_controllers_1.default.createOne);
router
    .route("/:id")
    .get(post_controllers_1.default.getOne)
    .put(auth_1.protect, post_controllers_1.default.updateOne)
    .delete(auth_1.protect, post_controllers_1.default.deleteOne);
exports.default = router;
