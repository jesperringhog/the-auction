import type { Socket } from "socket.io-client";
import type { AuctionState } from "../models/AuctionState";

export const socketOnAuctions = (socket: Socket, state: AuctionState) => {
  //lyssnar efter alla auktioner som finns i databasen
  //socket.emit("auctionList") ska skickas från backend efter att loginCookie är hämtad
  socket.on("auctionList", (auctions: string[]) => {
    const auctionList = document.getElementById("auctionList");
    if (!auctionList) return;

    auctions.forEach((auction) => {
      //här kan vi lägga till ytterligare html beroende på om vi vill visa alla auktionsdetaljer direkt i index/annars på ny sida
      const auctionBtn = document.createElement("button");
      auctionBtn.textContent = auction;

      auctionBtn.addEventListener("click", () => {
        //lyssnar efter händelse att ansluta till en auktion
        socket.emit("joinAuction", auction);
        state.selectedAuction = auction;
      });
      
      auctionList.appendChild(auctionBtn);
    });
  });
};
