import type { Socket } from "socket.io-client";
import type { Bid } from "../models/Bid";
import { createHtmlForBid } from "../utils/bidUtil";
import type { AuctionState } from "../models/AuctionState";

export const socketOnBidHistory = (socket: Socket, state: AuctionState) => {
  socket.off("bidHistory");
  socket.on("bidHistory", (bids: Bid[]) => {
    const auctionId = state.selectedAuction;
    if (!auctionId) return;

    const bidContainer = document.getElementById(`bidContainer-${auctionId}`);
    if (bidContainer) {
      bidContainer.innerHTML = "";  
    bids.forEach((bid) => {
      createHtmlForBid(bid, auctionId);
    });
  }
});
};
