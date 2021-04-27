"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var comment_controllers_1 = __importDefault(require("./comment.controllers"));
var auth_1 = require("../../utils/auth");
var router = express_1.Router();
router.route("/post/:id").get(comment_controllers_1.default.getCommentsOfPost);
router.route("/").get(comment_controllers_1.default.getMany).post(comment_controllers_1.default.createOne);
router
    .route("/:id")
    .get(comment_controllers_1.default.getOne)
    .put(auth_1.protect, comment_controllers_1.default.updateOne)
    .delete(auth_1.protect, comment_controllers_1.default.deleteOne);
exports.default = router;
