import type { Socket } from "socket.io";
import Auction from "../models/auctionModel.mjs";

export const initJoinAuction = (socket: Socket) => {
  socket.on("joinAuction", async (auctionId: string) => {
    socket.join(auctionId);

    const foundAuction = await Auction.findOne({ _id: auctionId }).populate(
      "allBids.user",
      "username email",
    );

    socket.emit("joinedAuction", foundAuction);

    if (foundAuction) {
      socket.emit("bidHistory", foundAuction.allBids);
    }

    socket.on("leaveAuction", (auctionId: string) => {
      socket.leave(auctionId);
      socket.emit("leftAuction", foundAuction);
    })
  });
};