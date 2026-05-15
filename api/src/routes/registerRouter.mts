import express from "express";
import { createUser } from "../controllers/registerController.mjs";
import type { RegisterRequest } from "../models/requests/registerRequest.mjs";

export const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  try {
    const { username, email, password }: RegisterRequest = req.body;

    if (!username) {
      return res.status(400).json({ message: "Missing username in body" });
    }

    if (!email) {
      return res.status(400).json({ message: "Missing email in body" });
    }

    if (!password) {
      return res.status(400).json({ message: "Missing password in body" });
    }

    const userDto = await createUser({ username, email, password });

    res.status(200).json(userDto);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});
