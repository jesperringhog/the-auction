import type { Auction } from "../models/Auction";
import { createHtmlForBids } from "./bidHistoryUtil";

export const initAuctionDetails = (auction: Auction) => {
    const auctionDetails = document.createElement("div");
    const description = document.createElement("p");
    const startPrice = document.createElement("p");
    const bidBtn = document.createElement("button");
    const owner = document.createElement("p");
    const currentWinner = document.createElement("p");
    const endTime = document.createElement("p");
    const time = new Date(auction.endTime);

    description.textContent = auction.description;
    startPrice.textContent = `Startbud: ${auction.startPrice.toString()}kr`;
    bidBtn.textContent = "Lägg bud";
    owner.textContent = `Säljare: ${auction.owner.username}`;
    currentWinner.textContent = auction.currentWinner
      ? `Vinnare: ${auction.currentWinner.username}`
      : "Inga bud lagda";
    endTime.textContent = `Sluttid: ${time.toLocaleDateString()}${time.toLocaleTimeString()}`;

    const bidContainer = createHtmlForBids(auction.allBids);

    auctionDetails.appendChild(description);
    auctionDetails.appendChild(startPrice);
    auctionDetails.appendChild(bidBtn);
    auctionDetails.appendChild(owner);
    auctionDetails.appendChild(currentWinner);
    auctionDetails.appendChild(endTime);
    auctionDetails.appendChild(bidContainer);

    return auctionDetails;
}