import type { Socket } from "socket.io-client";
import { createHtmlForBids } from "../utils/bidHistoryUtil";
import type { Bid } from "../models/Bid";

export const socketOnBidHistory = (socket: Socket) => {
  socket.on("bidHistory", (bids: Bid[]) => {
    bids.forEach((bid) => createHtmlForBids(bid));
  });
};
