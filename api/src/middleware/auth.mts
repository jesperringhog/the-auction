import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { type dbUser } from "../models/User.mjs";
import type { userDto } from "../models/userDto.mjs";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginToken = req.cookies["login"];
    if (!loginToken) return res.status(401).send("You are not logged in");

    const user = jwt.decode(loginToken);
    if (!user) return res.status(401).send("You are not logged in");

    const foundUser = await User.findOne({ email: (user as userDto).email });
    if (!foundUser) return res.status(401).send("Logged in but unauthorized");

    (req as any).user = foundUser;

    next();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
