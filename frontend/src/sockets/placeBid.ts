import type { Socket } from "socket.io-client";
import type { Bid } from "../models/Bid.ts";
import { createHtmlForBid } from "../utils/bidUtil.ts";
import type { AuctionState } from "../models/AuctionState.ts";
import { updateDetails } from "../utils/updateDetailsUtil.ts";

const handleNewBid = (state: AuctionState) => (newBid: Bid) => {
  console.log(`Nytt bud: ${newBid.bid}kr`);

  const auctionId = state.selectedAuction;
  if (!auctionId) return;

  createHtmlForBid(newBid, auctionId);
  updateDetails(auctionId, newBid);
};

const handleBidError = (message: string) => {
  console.log(message);
  alert(message);
};

export const initPlaceBid = (socket: Socket, state: AuctionState) => {
  socket.off("newBid");
  socket.off("bidError");

  socket.on("newBid", handleNewBid(state));
  socket.on("bidError", handleBidError);
};
