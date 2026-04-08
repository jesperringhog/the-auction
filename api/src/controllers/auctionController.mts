import Auction from "../models/auctionModel.mjs";
import type { AuctionRequest } from "../models/requests/auctionRequest.mjs";
import { convertToDto, type UserDbType } from "../models/User.mjs";
import type { UserDto } from "../models/UserDto.mjs";

export const createAuction = (req: AuctionRequest, user: UserDbType) =>
  Auction.create({
    title: req.title,
    description: req.description,
    startPrice: +req.startPrice,
    currentBid: 0,
    owner: convertToDto(user),
    currentWinner: null,
    endTime: req.endTime,
    isActive: true,
  });
