import { Socket } from "socket.io";
import Auction from "../models/auctionModel.mjs";

export const sendAllAuctions = async (socket: Socket) => {
  const allAuctions = await Auction.find();

  if (allAuctions) {
    socket.emit("auctionList", allAuctions);
  }
};
