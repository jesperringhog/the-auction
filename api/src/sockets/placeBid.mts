import type { Socket } from "socket.io";
import { Server } from "socket.io";
import Auction from "../models/auctionModel.mjs";

interface PlaceBidData {
    auctionId: string;
    bid: number;
    userId: string;
}

export const initPlaceBid = (io: Server, socket: Socket) => {
    socket.on("placeBid", async (data: PlaceBidData) => {
        try {
            const { auctionId, bid, userId } = data;

            const auction = await Auction.findById(auctionId);
            if (!auction) return;

            if (!auction.isActive) return;
            if (bid <= auction.currentBid) return;
            if (auction.owner.toString() === userId) return;

            auction.currentBid = bid;
            auction.currentWinner = userId;
            auction.allBids.push({ user: userId, bid });

            await auction.save();

            const payload = {
                auctionId,
                bid,
                bids: auction.allBids.map(b => ({
                    userId: b.user.toString(),
                    amount: b.bid
                })),
            };
            io.to(`auction_${auctionId}`).emit("newBid", payload);
        } catch (error) {
            console.error("Error in placeBid:", error);
        }
    });
};