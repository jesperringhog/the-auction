import type { Socket } from "socket.io-client";
import type { AuctionState } from "../models/AuctionState";
import { rerenderAuction } from "../utils/rerenderAuctionUtil";

export const endingAuctionsListener = (socket: Socket, state: AuctionState) => {
  socket.on(
    "endAuction",
    (data: {
      auctionId: string;
      currentBid: number;
      winner: { _id: string; username: string };
      ended: boolean;
    }) => {
      console.log("Auktionen avslutad!", data);

      const auction = state.auctions.find((a) => a._id === data.auctionId);

      if (!auction) return;

      auction.isActive = data.ended;
      auction.currentBid = data.currentBid;

      rerenderAuction(auction, socket, state);
    },
  );
};
