import type { Socket } from "socket.io-client";

export const endingAuctionsListener = (socket: Socket) => {
  //Lyssnar efter endAuction, skickas endast till den auktion/det rum det gäller
  socket.on("endAuction", (data: { auctionId: string; currentBid: number; winner: { _id: string; username: string }; ended: boolean }) => {
    //För test
    console.log("Auktionen avslutad!", data);

    //Här ändras UI för auktionen
    //Hitta rätt auktion, disable "lägga bud"-knappen, visa vinnaren och slutpriset
  });
};
