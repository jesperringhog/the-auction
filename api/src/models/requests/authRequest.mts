import type { Request } from "express";
import type { UserDbType } from "../User.mjs";

export type AuthRequest = Request & {
    user?: UserDbType;
}