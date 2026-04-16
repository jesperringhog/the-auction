import type { Bid } from "../models/Bid";

export const createHtmlForBid = (bid: Bid, auctionId: string | null) => {
  const bidContainer = document.getElementById(`bidContainer-${auctionId}`);

  const bidRow = document.createElement("div");
  const userTag = document.createElement("p");
  const bidTag = document.createElement("p");
  const timeTag = document.createElement("p");

  const time = new Date(bid.time);
  const loggedIn = sessionStorage.getItem("loggedInUsersName");

  bidRow.className = "bidRow";
  userTag.textContent = `Budgivare: ${bid.user.username}`;
  bidTag.textContent = `Bud: ${bid.bid.toString()}kr`;
  timeTag.textContent = `${time.toLocaleDateString()}${time.toLocaleTimeString()}`;

  if (loggedIn === bid.user.username) {
    userTag.textContent = `Budgivare: ${bid.user.username} (Ditt bud)`;
    userTag.className = "bold-text";
  }

  bidRow.appendChild(userTag);
  bidRow.appendChild(bidTag);
  bidRow.appendChild(timeTag);
  bidContainer?.appendChild(bidRow);
};
