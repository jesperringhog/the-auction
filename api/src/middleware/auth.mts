import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { UserDto } from "../models/UserDto.mts";
import User from "../models/UserModel.mts";
import type { AuthRequest } from "../models/requests/authRequest.mts";
import { config } from "dotenv";

config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret)
  throw new Error("JWT_SECRET does not exist in .env, or it's value is invalid");

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const loginToken = req.cookies["login"];
    if (!loginToken) return res.status(401).send("You are not logged in");

    const user = jwt.verify(loginToken, jwtSecret);
    if (!user) return res.status(401).send("You are not logged in");

    const foundUser = await User.findOne({ email: (user as UserDto).email });
    if (!foundUser) return res.status(401).send("Logged in but unauthorized");

    req.user = foundUser;

    next();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
