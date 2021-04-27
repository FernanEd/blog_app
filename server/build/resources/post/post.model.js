"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date() },
    isPublished: { type: Boolean, required: true, default: false },
});
exports.default = mongoose_1.model("Post", PostSchema);
