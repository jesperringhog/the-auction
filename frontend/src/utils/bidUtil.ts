import type { Bid } from "../models/Bid";

export const createHtmlForBid = (bid: Bid, auctionId: string) => {
  const bidContainer = document.getElementById(`bidContainer-${auctionId}`);

  const userTag = document.createElement("p");
  const bidTag = document.createElement("p");
  const timeTag = document.createElement("p");

  const time = new Date(bid.time);

  userTag.textContent = `Budgivare: ${bid.user.username}`;
  bidTag.textContent = `Bud: ${bid.bid.toString()}kr`;
  timeTag.textContent = `${time.toLocaleDateString()}${time.toLocaleTimeString()}`;

  bidContainer?.appendChild(userTag);
  bidContainer?.appendChild(bidTag);
  bidContainer?.appendChild(timeTag);
};
