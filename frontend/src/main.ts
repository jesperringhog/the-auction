import { io } from "socket.io-client";
import "./style.css";
import { endingAuctionsListener } from "./sockets/endAuction.ts";
import { hideAuctionForm } from "./services/showAuctionForm.ts";
import { socketOnAuctions } from "./sockets/showAuctions.ts";
import type { AuctionState } from "./models/AuctionState.ts";
import { socketOnBidHistory } from "./sockets/bidHistory.ts";
import { initPlaceBid } from "./sockets/placeBid.ts";
import { initAuctionForm } from "./utils/auctionFormUtil.ts";
import { updateAuthUI } from "./utils/updateAuthUI.ts";
import "./services/logoutService.ts";
import { initUserStatus } from "./utils/userStatusUtil.ts";

initUserStatus();

document.getElementById("toRegisterPageBtn")?.addEventListener("click", (e) => {
  e.preventDefault();

  location.href = "/register";
});

document.getElementById("toLoginPageBtn")?.addEventListener("click", (e) => {
  e.preventDefault();

  location.href = "/login";
});

window.addEventListener("DOMContentLoaded", () => {
  hideAuctionForm();
});

document
  .getElementById("createAuctionForm")
  ?.addEventListener("submit", (e) => {
    e.preventDefault();

    initAuctionForm();
  });

updateAuthUI();

export const socket = io("http://localhost:3000", { withCredentials: true });

const auctionState: AuctionState = { selectedAuction: "", auctions: [] };

socket.on("connect", () => {
  console.log("Socket connected: ", socket.connected);

  socketOnAuctions(socket, auctionState);
  socketOnBidHistory(socket, auctionState);
  endingAuctionsListener(socket, auctionState);
  initPlaceBid(socket, auctionState);
});
