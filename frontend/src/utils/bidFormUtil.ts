import { socket } from "../main";
import type { AuctionState } from "../models/AuctionState";

export const initBidForm = (state: AuctionState) => {
  const bidForm = document.createElement("form");
  const bidLabel = document.createElement("label");
  const bidInput = document.createElement("input");
  const bidBtn = document.createElement("button");

  bidLabel.textContent = "Ange budsumma:";
  bidInput.type = "number";
  bidInput.placeholder = "123";
  bidBtn.textContent = "Lägg bud";

  const userBid = (bidInput as HTMLInputElement).value;

  bidForm.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("newBid", { user: "", bid: userBid, time: new Date() }, state);
  });

  bidForm.appendChild(bidLabel);
  bidForm.appendChild(bidInput);
  bidForm.appendChild(bidBtn);

  return bidForm;
};
