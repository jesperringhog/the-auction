import { io } from "socket.io-client";
import "./style.css";

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

//Skapa socket
const socket = io("http://localhost:3000", { withCredentials: true });
