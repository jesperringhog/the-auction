import type { Request } from "express";
import type { UserDbType } from "../UserModel.mts";

export type AuthRequest = Request & {
  user?: UserDbType;
};
