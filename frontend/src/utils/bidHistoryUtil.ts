import type { Bid } from "../models/Bid";

export const createHtmlForBids = (bid: Bid) => {
  const bidContainer = document.getElementById("bidContainer");
  if (!bidContainer) return;

  const userTag = document.createElement("p");
  const bidTag = document.createElement("h4");
  const timeTag = document.createElement("p");

  const time = new Date(bid.time);

  userTag.textContent = bid.user;
  bidTag.textContent = bid.bid.toString();
  timeTag.textContent = `${time.toLocaleDateString()}${time.toLocaleTimeString()}`;

  bidContainer.appendChild(userTag);
  bidContainer.appendChild(bidTag);
  bidContainer.appendChild(timeTag);
};
