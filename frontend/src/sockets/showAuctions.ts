import type { Auction } from "../models/Auction";
import { createHtmlForAuctions } from "../utils/createHtmlForAuctions";
import type { Socket } from "socket.io-client";
import type { AuctionState } from "../models/AuctionState";
import type { JoinAuctionProps } from "../models/JoinAuctionProps";

export const socketOnAuctions = (socket: Socket, state: AuctionState) => {
  //lyssnar efter alla auktioner som finns i databasen
  socket.on("auctionList", (auctions: Auction[]) => {
    state.auctions = auctions;

    //skapar html för alla auktioner som finns i databasen
    //skickar med socket och state för att kunna ansluta till vald auktion
    createHtmlForAuctions(auctions, { socket, state });
  });
};

//KOLLA IGENOM - från senaste commit - Jesper
export const joinAuction = (props: JoinAuctionProps, auction: Auction) => {
  props.socket.emit("joinAuction", auction._id);
  props.state.selectedAuction = auction._id;

  props.socket.on("joinedAuction", (auction) => {
    console.log("Ansluten till auktion: ", auction);
  })
};




