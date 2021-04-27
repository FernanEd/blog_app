import { Handler } from "express";
import { IUser } from "../resources/user/user.model";
export declare const newToken: (usuario: IUser) => string;
export declare const verifyToken: (token: string) => Promise<unknown>;
export declare const signin: Handler;
export declare const protect: Handler;
export declare const verify: Handler;
