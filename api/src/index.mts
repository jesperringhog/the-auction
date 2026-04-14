import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { registerRouter } from "./routes/registerRouter.mjs";
import { loginRouter } from "./routes/loginRouter.mjs";
import { auctionRouter } from "./routes/auctionRouter.mjs";
import { auth } from "./middleware/auth.mjs";
import cookie from "cookie";
import { lookForEndedAuctions } from "./sockets/endAuction.mjs";
import { initJoinAuction } from "./sockets/joinAuction.mjs";
import { sendAllAuctions } from "./sockets/sendAllAuctions.mjs";
import { initPlaceBid } from "./sockets/placeBid.mjs";
import { logoutRouter } from "./routes/logoutRouter.mjs";

config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
const frontendUrl = process.env.FRONTEND_URL;

if (!port) throw new Error("PORT does not exist in .env, or it's value is invalid");
if (!mongoUri) throw new Error("MONGO_URI does not exist in .env, or it's value is invalid");
if (!frontendUrl) throw new Error("FRONTEND_URL does not exist in .env, or it's value is invalid");

const app = express();

app.use(json());
app.use(cookieParser());
app.use(
  cors({
    origin: frontendUrl || "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/auctions", auth, auctionRouter);
app.use("/logout", logoutRouter);

app.get("/ping", (_, res) => {
  res.status(200).json({ message: "App is alive" });
});

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: frontendUrl,
    credentials: true,
  },
  cookie: true,
});

//WEBSOCKETS:
//Lyssna efter connections
io.on("connection", async (socket) => {
  console.log("A user connected: ", socket.id);

  //Hittar alla cookies i klienten
  const cookies = cookie.parse(socket.handshake.headers.cookie || "");
  //Hittar vår login-cookie
  const loginCookie = cookies.login;

  //Bara test
  if (loginCookie) {
    console.log("Du är nu inloggad, här är din cookie: ", loginCookie);
  }

  //Lägga dessa funktioner i en separat fil och bara anropa dem här:

  // sockets/sendAllAuctions.mts - Hämtar alla auktioner och skickar de till frontend
  sendAllAuctions(socket);

  // sockets/endAuction.mts - Hitta auktioner nära sluttid och ändra status till avslutad:
  lookForEndedAuctions();

  //Funktion 2 - lyssna efter nya bud på auktion, pusha till allBids, spara, emit:a tillbaks budet

  //EJ KLAR - under utveckling
  initPlaceBid({ io, socket, loginCookie });

  // sockets/joinAuction.mts - lyssna efter joinAuction, gå med i auktionen, hitta budhistoriken i DB och emit:a tillbaks den
  initJoinAuction(socket);
});

server.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error(error);
  }
  console.log(`Server is running on port: ${port}, connected to database: ${mongoose.connection.name}`);
});
