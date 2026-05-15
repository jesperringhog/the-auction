import { io } from "../index.mts";
import Auction from "../models/auctionModel.mts";
import type { AuctionRequest } from "../models/requests/auctionRequest.mts";
import { type UserDbType } from "../models/UserModel.mts";

export const createAuction = async (req: AuctionRequest, user: UserDbType) => {
  const newAuction = await Auction.create({
    title: req.title,
    description: req.description,
    startPrice: +req.startPrice,
    currentBid: 0,
    owner: user._id,
    currentWinner: null,
    endTime: new Date(req.endTime),
    isActive: true,
  });

  const populated = await newAuction.populate("owner", "username");

  io.emit("auctionCreated", populated);

  return populated;
};
