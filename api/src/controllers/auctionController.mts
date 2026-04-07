import Auction from "../models/auctionModel.mjs";
import type { AuctionRequest } from "../models/requests/auctionRequest.mjs";

export const createAuction = (req: AuctionRequest) =>
  Auction.create({
    title: req.title,
    description: req.description,
    startPrice: +req.startPrice,
    currentBid: 0,
    owner: { username: "test", email: "test@test.com", password: "test" }, //skicka med inloggad användare från auth
    currentWinner: null,
    endTime: req.endTime,
    isActive: true,
  });
