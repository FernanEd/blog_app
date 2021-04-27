import mongoose from "mongoose";
import { Request, Response } from "express";
declare type Model = mongoose.Model<any>;
export interface Handler {
    (req: Request, res: Response): void;
}
export declare const getMany: (model: Model, populateFields?: string | undefined) => Handler;
export declare const createOne: (model: Model, populateFields?: string | undefined) => Handler;
export declare const getOne: (model: Model, populateFields?: string | undefined) => Handler;
export declare const updateOne: (model: Model, populateFields?: string | undefined) => Handler;
export declare const deleteOne: (model: Model, populateFields?: string | undefined) => Handler;
declare const _default: (useWithModel: Model, populateFields?: string | undefined) => {
    getMany: Handler;
    createOne: Handler;
    getOne: Handler;
    updateOne: Handler;
    deleteOne: Handler;
};
export default _default;
