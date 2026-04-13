import type { Bid } from "../models/Bid";
import type { JoinAuctionProps } from "../models/JoinAuctionProps";

export const initBidForm = (props: JoinAuctionProps) => {
  const bidForm = document.createElement("form");
  const bidLabel = document.createElement("label");
  const bidInput = document.createElement("input");
  const bidBtn = document.createElement("button");

  bidLabel.textContent = "Ange budsumma:";
  bidInput.type = "number";
  bidInput.placeholder = "123";
  bidBtn.textContent = "Lägg bud";

  let userBid = "";

  bidForm.addEventListener("submit", (e) => {
    e.preventDefault();
    userBid = bidInput.value;

    console.log("placeBid submit", {
      selectedAuction: props.state.selectedAuction,
      bid: userBid,
    });

    props.socket.emit(
      "placeBid",
      { user: {username: "", email: ""}, bid: +userBid, time: new Date() } satisfies Bid,
      props.state.selectedAuction,
    );
    if (userBid) {
      bidInput.value = "";
    }
  });

  bidForm.appendChild(bidLabel);
  bidForm.appendChild(bidInput);
  bidForm.appendChild(bidBtn);

  return bidForm;
};
