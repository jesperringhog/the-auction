import type { Bid } from "../models/Bid";

export const createHtmlForBids = (bids: Bid[]) => {
  const bidContainer = document.createElement("div");

  bids.forEach((bid) => {
    const userTag = document.createElement("p");
    const bidTag = document.createElement("h4");
    const timeTag = document.createElement("p");

    const time = new Date(bid.time);

    userTag.textContent = bid.user.username;
    bidTag.textContent = bid.bid.toString();
    timeTag.textContent = `${time.toLocaleDateString()}${time.toLocaleTimeString()}`;

    bidContainer.appendChild(userTag);
    bidContainer.appendChild(bidTag);
    bidContainer.appendChild(timeTag);
  });
  return bidContainer;
};
