import express from "express";
import { createUser } from "../src/controllers/registerController.mjs";
import type { RegisterRequest } from "../src/models/requests/registerRequest.mjs";

//Skapar routern med express
export const registerRouter = express.Router();

//POST-request för att registrera användare
registerRouter.post("/", async (req, res) => {
  try {
    const { username, email, password }: RegisterRequest = req.body;

    //Enkel validering, vi kan avancera mer senare om vi har tid
    if (!username) {
      return res.status(400).json({ message: "Missing username in body" });
    }

    if (!email) {
      return res.status(400).json({ message: "Missing email in body" });
    }

    if (!password) {
      return res.status(400).json({ message: "Missing password in body" });
    }

    //Skapar användaren med registerController
    const userDto = await createUser({ username, email, password });

    //Skicka tillbaka nya användaren
    res.status(200).json(userDto);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});
