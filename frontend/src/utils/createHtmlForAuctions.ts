import type { Auction } from "../models/Auction";
import { initAuctionDetails } from "./auctionDetailsUtil";

export const createHtmlForAuctions = (auctions: Auction[]) => {
  const activeAuctions = document.getElementById("activeAuctions");
  const endedAuctions = document.getElementById("endedAuctions");

  if (!activeAuctions) return;
  if (!endedAuctions) return;

  auctions.forEach((a) => {
    const auction = document.createElement("div");
    const title = document.createElement("h4");
    const currentBid = document.createElement("p");
    const toggleDetailsBtn = document.createElement("button");

    auction.className = "auction";
    title.textContent = a.title;
    currentBid.textContent = `Senaste bud: ${a.currentBid.toString()}kr`;
    toggleDetailsBtn.textContent = "Visa";

    const auctionDetails = initAuctionDetails(a);
    auctionDetails.classList.add("hide");

    toggleDetailsBtn.addEventListener("click", () => {
      auctionDetails.classList.toggle("hide");
      toggleDetailsBtn.textContent =
        toggleDetailsBtn.textContent === "Visa" ? "Dölj" : "Visa";
    });

    auction.appendChild(title);
    auction.appendChild(currentBid);
    auction.appendChild(auctionDetails);
    auction.appendChild(toggleDetailsBtn);

    if (a.isActive === true) {
      auction.classList.add("active");
      activeAuctions.appendChild(auction);
    } else {
      auction.classList.add("ended");
      endedAuctions.appendChild(auction);
    }
  });
};
