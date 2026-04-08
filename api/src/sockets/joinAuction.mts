import type { Socket } from "socket.io";
import Auction from "../models/auctionModel.mjs";

export const initJoinAuction = (socket: Socket) => {
    socket.on("joinAuction", async (auction: string) => {
        socket.join(auction);

        const foundAuction = await Auction.findOne({ title: auction});

        if (foundAuction) {
            socket.emit("bidHistory", foundAuction.allBids);
        }
    });
};