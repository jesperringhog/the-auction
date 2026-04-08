import { io } from "socket.io-client";
import "./style.css";
import { createAuction, fetchAuctions, placeBid, updateCurrentBid, renderBidHistory } from "./ui.ts";
import { endingAuctionsListener } from "./sockets/endAuction.ts";

//Lyssna klick på "bli medlem"-knappen leder till /register-sidan
document.getElementById("toRegisterPageBtn")?.addEventListener("click", async (e) => {
  e.preventDefault();

  location.href = "/register";
});

//Lyssna klick på "logga in"-knappen leder till /login-sidan
document.getElementById("toLoginPageBtn")?.addEventListener("click", async (e) => {
  e.preventDefault();

  location.href = "/login";
});

// Hämta formulär
const createForm = document.getElementById("createAuctionForm") as HTMLFormElement;
createForm.addEventListener("submit", createAuction);

// Hämta auktioner när sidan laddas
fetchAuctions();

// Lägg placeBid globalt om knappar genereras dynamiskt
(window as any).placeBid = placeBid;

//Skapa socket
export const socket = io("http://localhost:3000", { withCredentials: true });

//Lyssna efter connections
socket.on("connect", () => {
  console.log("Socket connected: ", socket.connected);

  //Socket-funktioner här

  //Funktion som lyssnar efter endAuctions
  endingAuctionsListener();
});

socket.on("newBid", (data: any) => {
  const { auctionId, bid, bids } = data;

  // 1. Uppdatera current bid
  updateCurrentBid(auctionId, bid);

  // 2. Rendera om budhistoriken
  renderBidHistory(auctionId, bids);
});
