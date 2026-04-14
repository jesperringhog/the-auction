import type { Auction } from "../models/Auction";
import { initAuctionDetails } from "./auctionDetailsUtil";
import type { JoinAuctionProps } from "../models/JoinAuctionProps";
import { joinAuction } from "../sockets/showAuctions";

export const createHtmlForAuctions = (auctions: Auction[], props: JoinAuctionProps) => {
  const activeAuctions = document.getElementById("activeAuctions");
  const endedAuctions = document.getElementById("endedAuctions");

  if (!activeAuctions) return;
  if (!endedAuctions) return;

  activeAuctions.innerHTML = "";
  endedAuctions.innerHTML = "";

  auctions.forEach((a) => {
    const auction = document.createElement("div");
    const title = document.createElement("h4");
    const currentBid = document.createElement("p");
    const connectBtn = document.createElement("button");

    auction.className = "auction";
    title.textContent = a.title;
    if (a.isActive === false) {
      currentBid.textContent = `Vinnande bud: ${a.currentBid.toString()}kr`;
    } else {
      currentBid.textContent = `Senaste bud: ${a.currentBid.toString()}kr`;
    }

    const detailsContainer = document.createElement("div");
    detailsContainer.id = "details-container";

    const auctionDetails = initAuctionDetails(a, props);
    auctionDetails.classList.add("hide");

    connectBtn.addEventListener("click", () => {
      auctionDetails.classList.toggle("hide");
      if (a.isActive === true) {
        connectBtn.textContent = connectBtn.textContent === "Anslut" ? "Avbryt" : "Anslut";
        //genom loopen görs här en emit på titeln för auktionen som man klickar på -> för att ansluta till den

        joinAuction(props, a);
      } else {
        connectBtn.textContent = connectBtn.textContent === "Visa" ? "Dölj" : "Visa";
      }
    });

    auction.appendChild(title);
    auction.appendChild(currentBid);
    auction.appendChild(detailsContainer);
    detailsContainer.appendChild(auctionDetails);
    auction.appendChild(connectBtn);

    if (a.isActive === true) {
      connectBtn.textContent = "Anslut";
      auction.classList.add("active");
      activeAuctions.appendChild(auction);
    } else {
      connectBtn.textContent = "Visa";
      auction.classList.add("ended");
      endedAuctions.appendChild(auction);
    }
  });
};
