import express from "express";

export const logoutRouter = express.Router();

logoutRouter.post("/", async (_, res) => {
  res.clearCookie("login", {
    sameSite: "lax",
    secure: false,
    httpOnly: true,
  });

  res.status(200).json({ message: "Logged out successfully." });
});
