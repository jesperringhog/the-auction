import type { Socket } from "socket.io-client";
import { initAuctionDetails } from "../utils/auctionDetailsUtil";
import type { AuctionState } from "../models/AuctionState";
import type { Auction } from "../models/Auction";

//Funktion som lyssnar efter avslutade auktioner från backend
export const endingAuctionsListener = (socket: Socket, state: AuctionState) => {
  //Lyssnar efter endAuction, skickas endast till den auktion/det rum det gäller
  socket.on("endAuction", (data: { auctionId: string; currentBid: number; winner: { _id: string; username: string }; ended: boolean }) => {
    //För test
    console.log("Auktionen avslutad!", data);

    const auction = state.auctions.find((a) => a._id === data.auctionId);

    if (!auction) return;

    auction.isActive = data.ended;
    auction.currentBid = data.currentBid;

    rerenderAuction(auction, state);
  });
};

//Funktion som triggar igång omrendering av auktionsdetaljer efter avslutad auktion
export const rerenderAuction = (auction: Auction, state: AuctionState) => {
  const oldAuctionDetails = document.querySelector(`[data-auction-id="${auction._id}"]`);

  if (!oldAuctionDetails) return;

  const newAuctionDetails = initAuctionDetails(auction, state);
  oldAuctionDetails.replaceWith(newAuctionDetails);
};
