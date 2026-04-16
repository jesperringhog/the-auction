import type { Auction } from "../models/Auction";
import type { Bid } from "../models/Bid";
import type { JoinAuctionProps } from "../models/JoinAuctionProps";

export const initBidForm = (props: JoinAuctionProps, auction: Auction) => {
  const bidForm = document.createElement("form");
  const bidLabel = document.createElement("label");
  const bidInput = document.createElement("input");
  const bidBtn = document.createElement("button");

  bidForm.id = "bidForm";
  bidLabel.textContent = "Bud:";
  bidInput.type = "number";
  bidInput.placeholder = `*Minst ${auction.currentBid + 1}kr`;
  bidBtn.textContent = "Lägg bud";

  if (auction.currentBid === 0) {
    bidInput.placeholder = `*Minst ${auction.startPrice + 1}kr`;
  } else {
    bidInput.placeholder = `*Minst ${auction.currentBid + 1}kr`;
  }

  let userBid = "";

  bidForm.addEventListener("submit", (e) => {
    e.preventDefault();
    userBid = bidInput.value;

    console.log("placeBid submit", {
      selectedAuction: props.state.selectedAuction,
      bid: userBid,
    });

    props.socket.emit("placeBid", { user: { username: "", email: "" }, bid: +userBid, time: new Date() } satisfies Bid, props.state.selectedAuction);
    if (userBid) {
      bidInput.value = "";
    }
  });

  bidForm.appendChild(bidLabel);
  bidForm.appendChild(bidInput);
  bidForm.appendChild(bidBtn);

  return bidForm;
};
