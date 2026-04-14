import type { Auction } from "../models/Auction";
import { createHtmlForAuctions } from "../utils/createHtmlForAuctions";
import type { Socket } from "socket.io-client";
import type { AuctionState } from "../models/AuctionState";

export const socketOnAuctions = (socket: Socket, state: AuctionState) => {
  //lyssnar efter alla auktioner som finns i databasen
  socket.on("auctionList", (auctions: Auction[]) => {
    state.auctions = auctions;

    //skapar html för alla auktioner som finns i databasen
    //skickar med socket och state för att kunna ansluta till vald auktion
    createHtmlForAuctions(auctions, { socket, state });
  });

  socket.on("auctionCreated", (newAuction: Auction) => {
    state.auctions = [newAuction, ...state.auctions];
    createHtmlForAuctions(state.auctions, { socket, state});
  })
};





