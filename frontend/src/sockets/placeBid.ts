import type { Socket } from "socket.io-client";
import type { Bid } from "../models/Bid.ts";
import { createHtmlForBid } from "../utils/bidUtil.ts";
import type { AuctionState } from "../models/AuctionState.ts";

export const initPlaceBid = (socket: Socket, state: AuctionState) => {
  socket.on("newBid", (newBid: Bid) => {
    console.log(`Nytt bud: ${newBid.bid}kr`);

    const auctionId = state.selectedAuction;
    if (!auctionId) return;

    createHtmlForBid(newBid, auctionId);
  });
};
