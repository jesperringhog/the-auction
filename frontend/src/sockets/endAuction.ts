import type { Socket } from "socket.io-client";

export const endingAuctionsListener = (socket: Socket) => {
  //Lyssnar efter endAuction, skickas endast till den auktion/det rum det gäller
  socket.on("endAuction", (data: { auctionId: string; currentBid: number; winner: { _id: string; username: string }; ended: boolean }) => {
    //För test
    console.log("Auktionen avslutad!", data);

    //Här ändras UI för auktionen:
    // (dubbelkolla alla id:n mot createHtml senare)
    const bidBtn = document.getElementById("bid-btn") as HTMLButtonElement;
    bidBtn.disabled = true; //Budknappen ska ej fungera längre

    //Röd text, auktionen avslutad
    const closingText = document.createElement("h4");
    closingText.innerText = "Auktionen avslutad!";
    closingText.className = "endedAuctionText";

    //Vilken användare som vann auktionen
    const auctionWinner = document.createElement("h4");
    ((auctionWinner.innerText = "Vinnare: "), data.winner);

    //Slutpriset
    const finalPrice = document.createElement("h4");
    ((finalPrice.innerText = "Slutpris: "), data.currentBid);

    //Append alla element på auktionskortet? kolla id:t mot createHtml senare
    const auctionCard = document.getElementById("auction-123");
    auctionCard?.appendChild(closingText);
    auctionCard?.appendChild(auctionWinner);
    auctionCard?.appendChild(finalPrice);
  });
};
