import express from "express";

export const logoutRouter = express.Router();

//Routern använder inte req, bara res
logoutRouter.post("/", async (_, res) => {
  //Tar bort login-cookien
  res.clearCookie("login", {
    sameSite: "lax",
    secure: false,
    httpOnly: true,
  });

  res.status(200).json({ message: "Logged out successfully." });
});
