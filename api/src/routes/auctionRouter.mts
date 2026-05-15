import express from "express";
import { createAuction } from "../controllers/auctionController.mts";
import type { AuctionRequest } from "../models/requests/auctionRequest.mts";
import type { AuthRequest } from "../models/requests/authRequest.mts";

export const auctionRouter = express.Router();

auctionRouter.post("/", async (req, res) => {
  const authReq = req as AuthRequest;

  const { title, description, startPrice, endTime }: AuctionRequest = authReq.body;

  const user = authReq.user;

  if (!title) return res.status(400).json({ message: "Title is missing" });
  if (!description)
    return res.status(400).json({ message: "Description is missing" });
  if (!startPrice)
    return res.status(400).json({ message: "Start price is missing" });
  if (!endTime) return res.status(400).json({ message: "End time is missing" });

  try {
    const newAuction = await createAuction({
      title,
      description,
      startPrice,
      endTime,
    }, user!);

    res.status(201).json(newAuction);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
