import { io } from "../index.mjs";
import Auction from "../models/AuctionModel.mjs";

//Funktion som letar efter auktioner påväg att avslutas
export const lookForEndedAuctions = () => {
  //setInterval = en polling-loop = körs varje sekund
  setInterval(async () => {
    //Kollar nuvarande tid
    const now = new Date();

    //Hämtar alla auktioner vars endTime är mindre än eller likamed nu
    const auctionsToEnd = await Auction.find({
      isActive: true,
      endTime: { $lte: now },
    });

    //Loopar igenom auktionerna vi fick fram och uppdaterar dem
    for (const auction of auctionsToEnd) {
      const updatedAuction = await Auction.findOneAndUpdate(
        {
          _id: auction._id, //Hitta objekt med detta id
          isActive: true, //Som fortfarande är aktiv
        },
        {
          isActive: false, //Ändra till inaktiv (avslutad auktion)
        },
        { new: true }, //Returnera den uppdaterade versionen
      ).populate("currentWinner", "username"); //Hämtar vinnarens användarnamn

      if (!updatedAuction) continue; //Om auktionen redan är avslutad, gå vidare till att loopa nästa auktion i listan

      //Emit till auktionen i frontend, skickar med ett objekt med lite info
      io.to(auction._id.toString()).emit("endAuction", {
        auctionId: updatedAuction._id,
        currentBid: updatedAuction.currentBid,
        winner: updatedAuction.currentWinner,
        ended: updatedAuction.isActive,
      });
    }
  }, 1000);
};
