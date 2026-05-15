import type { Request } from "express";
import type { UserDbType } from "../UserModel.mjs";

export type AuthRequest = Request & {
  user?: UserDbType;
};
