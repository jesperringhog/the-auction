import type { Socket } from "socket.io-client";
import type { Bid } from "../models/Bid.ts";
import { createHtmlForBid } from "../utils/bidUtil.ts";
import type { AuctionState } from "../models/AuctionState.ts";
import { updateDetails } from "../utils/updateDetailsUtil.ts";

export const initPlaceBid = (socket: Socket, state: AuctionState) => {
  socket.on("newBid", (newBid: Bid) => {
    console.log(`Nytt bud: ${newBid.bid}kr`);

    const auctionId = state.selectedAuction;
    if (!auctionId) return;

    createHtmlForBid(newBid, auctionId);
    updateDetails(auctionId, newBid); //
  });

  socket.on("bidError", (message) => {
    console.log(message);
    alert(message);
  });
};
