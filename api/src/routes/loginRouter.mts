import express from "express";
import jwt from "jsonwebtoken";
import type { LoginRequest } from "../models/requests/loginRequest.mjs";
import { loginUser } from "../controllers/loginController.mjs";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password }: LoginRequest = req.body;

  try {
    //Enkel validering, kan ändras om vi har tid
    if (!email) {
      return res.status(400).json({ message: "Missing email in body" });
    }

    if (!password) {
      return res.status(400).json({ message: "Missing password in body" });
    }

    //Logga in med controllern
    const userDto = await loginUser({ email, password });

    //Om inloggningen gick bra
    if (userDto) {
      //Sätt en cookie som gäller 1h vid namn "login"
      const token = jwt.sign(userDto, "login");
      const expires = new Date();
      expires.setHours(expires.getHours() + 1);

      res.cookie("login", token, {
        expires,
        sameSite: "none", //tillåter cross-origin (frontend och backend på olika portar)
        secure: false, //tillåter http
        httpOnly: true,
      });

      return res.status(200).json(userDto);
    }

    res.status(400).json({ message: "Unable to log in" });
  } catch (error) {
    console.error(error);
    res.status(500).json(JSON.stringify(error));
  }
});
