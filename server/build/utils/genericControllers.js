"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.getOne = exports.createOne = exports.getMany = void 0;
// These controllers are based on Scott Moss´s API Design in Node.js, v3 course.
// Link here https://frontendmasters.com/courses/api-design-nodejs-v3/
var getMany = function (model, populateFields) { return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var docs, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, model.find().lean().populate(populateFields).exec()];
            case 1:
                docs = _a.sent();
                res.status(200).json(docs);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(400).json({ message: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
exports.getMany = getMany;
var createOne = function (model, populateFields) { return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var created, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, model.create(__assign({}, req.body))];
            case 1:
                created = _a.sent();
                if (!populateFields) return [3 /*break*/, 3];
                return [4 /*yield*/, created.populate(populateFields).execPopulate()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                res.status(200).json(created);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(400).json({ message: error_2.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); }; };
exports.createOne = createOne;
var getOne = function (model, populateFields) { return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, doc, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, model.findById(id).lean().populate(populateFields).exec()];
            case 2:
                doc = _a.sent();
                if (!doc) {
                    return [2 /*return*/, res.status(404).end()];
                }
                res.status(200).json(doc);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(400).json({ message: error_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }; };
exports.getOne = getOne;
var updateOne = function (model, populateFields) { return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updated, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, model
                        .findByIdAndUpdate(id, __assign({}, req.body), { new: true })
                        .lean()
                        .populate(populateFields)
                        .exec()];
            case 2:
                updated = _a.sent();
                if (!updated) {
                    return [2 /*return*/, res.status(404).end()];
                }
                res.status(200).json(updated);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(400).json({ message: error_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }; };
exports.updateOne = updateOne;
var deleteOne = function (model, populateFields) { return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, removed, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, model.findByIdAndRemove(id).lean().exec()];
            case 2:
                removed = _a.sent();
                if (!removed) {
                    return [2 /*return*/, res.status(404).end()];
                }
                res.status(200).json(removed);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(400).json({ message: error_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }; };
exports.deleteOne = deleteOne;
exports.default = (function (useWithModel, populateFields) { return ({
    getMany: exports.getMany(useWithModel, populateFields),
    createOne: exports.createOne(useWithModel, populateFields),
    getOne: exports.getOne(useWithModel, populateFields),
    updateOne: exports.updateOne(useWithModel, populateFields),
    deleteOne: exports.deleteOne(useWithModel, populateFields),
}); });
