import type { Socket } from "socket.io-client";
import type { Auction } from "../models/Auction";
import { initAuctionDetails } from "./auctionDetailsUtil";
import type { AuctionState } from "../models/AuctionState";

export const rerenderAuction = (auction: Auction, socket: Socket, state: AuctionState) => {
  const oldAuctionDetails = document.querySelector(`[data-auction-id="${auction._id}"] .auctionDetails`);

  if (!oldAuctionDetails) return;

  const newAuctionDetails = initAuctionDetails(auction, { socket, state });
  oldAuctionDetails.replaceWith(newAuctionDetails);
};
