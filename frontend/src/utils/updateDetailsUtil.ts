import type { Bid } from "../models/Bid";

export const updateDetails = (auctionId: string, bid: Bid) => {
    const auctionDetails = document.querySelector(`[data-auction-id="${auctionId}"]`)
    if (!auctionDetails) return;

    const currentBid = auctionDetails.querySelector("h4");
    if (!currentBid) return;

    const currentWinner = auctionDetails.querySelector("h5");
    if (!currentWinner) return;
    
    currentBid.textContent = `Senaste bud: ${bid.bid}kr`;
    currentWinner.textContent = `Ledande budgivare: ${bid.user.username}`;
}