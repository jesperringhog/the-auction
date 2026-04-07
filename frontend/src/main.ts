import { io } from "socket.io-client";
import "./style.css";
import { createAuction, fetchAuctions, placeBid } from "./auction.ts";

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
const socket = io("http://localhost:3000", { withCredentials: true });
