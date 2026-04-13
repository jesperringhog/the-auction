import type { Socket } from "socket.io";
import Auction from "../models/auctionModel.mjs";

export const initJoinAuction = (socket: Socket) => {
  socket.on("joinAuction", async (auctionId: string) => {
    socket.join(auctionId);

    const foundAuction = await Auction.findOne({ _id: auctionId });

    //KOLLA IGENOM - från senaste commit - Jesper
    // socket.emit("joinedAuction", auction);

    // const foundAuction = await Auction.findOne({ title: auction }).populate(
    //   "allBids.user",
    //   "username email",
    // );

    if (foundAuction) {
      socket.emit("bidHistory", foundAuction.allBids);
    }
  });
};
