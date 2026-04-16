import { Socket } from "socket.io";
import Auction from "../models/AuctionModel.mjs";

export const sendAllAuctions = async (socket: Socket) => {
  const allAuctions = await Auction.find().populate("owner", "username").populate("currentWinner", "username");

  if (allAuctions) {
    socket.emit("auctionList", allAuctions);
  }
};
