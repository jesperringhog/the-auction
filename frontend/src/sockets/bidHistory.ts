import type { Socket } from "socket.io-client";
import type { Bid } from "../models/Bid";
import { createHtmlForBid } from "../utils/bidUtil";

export const socketOnBidHistory = (socket: Socket) => {
  socket.on("bidHistory", (bids: Bid[]) => {
    bids.forEach((bid) => {
      createHtmlForBid(bid);
    });
  });
};
