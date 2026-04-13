import type { Auction } from "../models/Auction";
import type { AuctionState } from "../models/AuctionState";
import { initBidForm } from "./bidFormUtil";
import { createHtmlForBids } from "./bidHistoryUtil";

export const initAuctionDetails = (auction: Auction, state: AuctionState) => {
    const auctionDetails = document.createElement("div");
    const description = document.createElement("p");
    const startPrice = document.createElement("p");
    const owner = document.createElement("p");
    const currentWinner = document.createElement("p");
    const endTime = document.createElement("p");
    const time = new Date(auction.endTime);

    const bidForm = initBidForm(state);

    const bidContainer = createHtmlForBids(auction.allBids);

    description.textContent = auction.description;
    startPrice.textContent = `Startbud: ${auction.startPrice.toString()}kr`;
    owner.textContent = `Säljare: ${auction.owner.username}`;
    currentWinner.textContent = auction.currentWinner
      ? `Vinnare: ${auction.currentWinner.username}`
      : "Inga bud lagda";
    endTime.textContent = `Sluttid: ${time.toLocaleDateString()}${time.toLocaleTimeString()}`;

    auctionDetails.appendChild(description);
    auctionDetails.appendChild(startPrice);
    auctionDetails.appendChild(bidForm);
    auctionDetails.appendChild(owner);
    auctionDetails.appendChild(currentWinner);
    auctionDetails.appendChild(endTime);
    auctionDetails.appendChild(bidContainer);

    return auctionDetails;
}