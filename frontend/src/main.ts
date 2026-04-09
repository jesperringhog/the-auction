import { io } from "socket.io-client";
import "./style.css";
import { /* createAuction, fetchAuctions, placeBid,*/ updateCurrentBid, renderBidHistory } from "./ui.ts";
import { endingAuctionsListener } from "./sockets/endAuction.ts";
import { hideAuctionForm } from "./services/showAuctionForm.ts";
import { socketOnAuctions } from "./sockets/joinAuction.ts";
import type { AuctionState } from "./models/AuctionState.ts";
import { socketOnBidHistory } from "./sockets/bidHistory.ts";
import { initAuctionForm } from "./utils/initAuctionForm.ts";

//Lyssna klick på "bli medlem"-knappen leder till /register-sidan
document.getElementById("toRegisterPageBtn")?.addEventListener("click", (e) => {
  e.preventDefault();

  location.href = "/register";
});

//Lyssna klick på "logga in"-knappen leder till /login-sidan
document.getElementById("toLoginPageBtn")?.addEventListener("click", (e) => {
  e.preventDefault();

  location.href = "/login";
});

//Om användaren är inloggad, visas "skapa auktion"-sektionen
window.addEventListener("DOMContentLoaded", () => {
  hideAuctionForm();
});

document.getElementById("createAuctionForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  initAuctionForm();
})

/*
// Hämta formulär
const createForm = document.getElementById("createAuctionForm") as HTMLFormElement;
createForm.addEventListener("submit", createAuction);

// Hämta auktioner när sidan laddas
fetchAuctions();

// Lägg placeBid globalt om knappar genereras dynamiskt
(window as any).placeBid = placeBid;
*/

//Skapa socket
export const socket = io("http://localhost:3000", { withCredentials: true });

//Variabel som behövs för att kommunicera mellan funktioner -> vilken auktion som är vald 
const auctionState: AuctionState = { selectedAuction: ""};

//Lyssna efter connections
socket.on("connect", () => {
  console.log("Socket connected: ", socket.connected);

  //Socket-funktioner här
  
  //Funktion som lyssnar efter vilka auktioner som finns och vilken auktion man vill ansluta till
  socketOnAuctions(socket, auctionState);

  //Lyssnar efter existerande bud och skapar html för att visa dessa
  socketOnBidHistory(socket);

  //Funktion som lyssnar efter endAuctions
  endingAuctionsListener(socket);
});

socket.on("newBid", (data: any) => {
  const { auctionId, bid, bids } = data;

  // 1. Uppdatera current bid
  updateCurrentBid(auctionId, bid);

  // 2. Rendera om budhistoriken
  renderBidHistory(auctionId, bids);
});
