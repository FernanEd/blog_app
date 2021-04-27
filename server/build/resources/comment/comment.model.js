"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date() },
    poster: { type: String, required: true },
    originalPost: { type: mongoose_1.Types.ObjectId, ref: "Post", required: true },
});
exports.default = mongoose_1.model("Comment", CommentSchema);
