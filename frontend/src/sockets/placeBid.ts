import type { Socket } from "socket.io-client";
// import { updateCurrentBid, renderBidHistory } from "../ui.ts";
// import { socket } from "../main.ts";
import type { Bid } from "../models/Bid.ts";
import { createHtmlForBid } from "../utils/bidUtil.ts";
import type { AuctionState } from "../models/AuctionState.ts";

// export function initPlaceBid(socket: Socket) {
//   socket.on("newBid", (data: any) => {
//     const { auctionId, bid, bids } = data;

//     updateCurrentBid(auctionId, bid);
//     renderBidHistory(auctionId, bids);
//   });
// }

// export function placeBid(auctionId: string, bidAmount: number, userId: string) {
//   socket.emit("placeBid", { auctionId, bidAmount, userId });
// }

export const initPlaceBid = (socket: Socket, state: AuctionState) => {
  socket.on("newBid", (newBid: Bid) => {
    console.log(`Nytt bud: ${newBid.bid}kr`);

    const auctionId = state.selectedAuction;
    if (!auctionId) return;

    createHtmlForBid(newBid, auctionId);
  });
};
