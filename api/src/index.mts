import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cookie from "cookie";
import { registerRouter } from "./routes/registerRouter.mjs";
import { loginRouter } from "./routes/loginRouter.mjs";

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
    origin: frontendUrl,
    credentials: true,
  }),
);

app.get("/ping", (_, res) => {
  res.status(200).json({ message: "App is alive" });
});

app.use("/register", registerRouter);
app.use("/login", loginRouter);

const server = createServer(app);

const io = new Server(server, {
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

  //Lägga dessa funktioner i en separat fil och bara anropa dem här:

  //Funktion 1 - skicka inloggningsstatus (och alla auktioner?) till frontend

  //Funktion 2 - lyssna efter nya bud på auktion, pusha till allBids, spara, emit:a tillbaks budet

  //Funktion 3 - lyssna efter joinAuction, gå med i auktionen, hitta budhistoriken i DB och emit:a tillbaks den
});

server.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error(error);
  }
  console.log(`Api is running on port: ${port}, connected to database: ${mongoose.connection.name}`);
});
