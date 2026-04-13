import type { Socket } from "socket.io";
import Auction from "../models/auctionModel.mjs";

export const initJoinAuction = (socket: Socket) => {
  socket.on("joinAuction", async (auctionId: string) => {
    socket.join(auctionId);

    const foundAuction = await Auction.findOne({ _id: auctionId });

    if (foundAuction) {
      socket.emit("bidHistory", foundAuction.allBids);
    }
  });
};
