import { updatCurrentBid, renderBidHistory } from "../ui.ts";
import { socket } from "./main.ts";

export function initPlaceBid() {
    socket.on("newBid", (data: any) => {
        const { auctionId, bid, bids } = data;

        updateCurrentBid(auctionId, bid);
        renderBidHistory(auctionId, bids);
    });
}

export function placeBid(auctionId: string, bidAmount: number, userId: string) {
    socket.emit("placeBid", { auctionId, bidAmount, userId });
}