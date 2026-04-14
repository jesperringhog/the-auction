import type { Socket } from "socket.io-client";
import type { Bid } from "../models/Bid";
import { createHtmlForBid } from "../utils/bidUtil";
import type { AuctionState } from "../models/AuctionState";

export const socketOnBidHistory = (socket: Socket, state: AuctionState) => {
  socket.on("bidHistory", (bids: Bid[]) => {
    const auctionId = state.selectedAuction;
    if (!auctionId) return;

    bids.forEach((bid) => {
      createHtmlForBid(bid, auctionId);
    });
  });
};
