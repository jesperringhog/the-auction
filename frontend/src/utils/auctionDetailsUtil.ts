import type { Auction } from "../models/Auction";
import { startCountdown } from "./auctionCountdown";
import type { JoinAuctionProps } from "../models/JoinAuctionProps";
import { initBidForm } from "./bidFormUtil";

export const initAuctionDetails = (auction: Auction, props: JoinAuctionProps) => {
  const auctionDetails = document.createElement("div");
  const description = document.createElement("p");
  const startPrice = document.createElement("p");
  const owner = document.createElement("p");
  const currentWinner = document.createElement("p");
  const endTime = document.createElement("p");
  const time = new Date(auction.endTime);
  const countdown = document.createElement("p");
  const bidHistoryHeading = document.createElement("h4");
  const bidContainer = document.createElement("div");

  const bidForm = initBidForm(props);

  auctionDetails.dataset.auctionId = auction._id;
  description.textContent = auction.description;
  startPrice.textContent = `Utgångspris: ${auction.startPrice.toString()}kr`;
  owner.textContent = `Säljare: ${auction.owner.username}`;
  currentWinner.textContent = auction.currentWinner ? `Vinnare: ${auction.currentWinner.username}` : "Inga bud lagda";
  endTime.textContent = `Sluttid: ${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
  countdown.className = "bold-text";
  bidHistoryHeading.textContent = "Budhistorik";
  bidContainer.id = "bidContainer";

  if (auction.isActive) {
    startCountdown(time, countdown);
  } else {
    countdown.textContent = "Sluttiden har passerat.";
    const endedText = document.createElement("h4");
    endedText.innerText = "Auktionen avslutad!";
    endedText.className = "endedAuctionText";
    auctionDetails.appendChild(endedText);

    bidForm.querySelector("input")!.disabled = true;
    bidForm.querySelector("button")!.disabled = true;
  }

  auctionDetails.appendChild(description);
  auctionDetails.appendChild(startPrice);
  auctionDetails.appendChild(bidForm);
  auctionDetails.appendChild(owner);
  auctionDetails.appendChild(currentWinner);
  auctionDetails.appendChild(endTime);
  auctionDetails.appendChild(countdown);
  auctionDetails.appendChild(bidHistoryHeading);
  auctionDetails.appendChild(bidContainer);

  return auctionDetails;
};
