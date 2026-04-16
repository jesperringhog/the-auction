import Auction, { type Bid } from "../models/auctionModel.mjs";
import type { SocketFunctionProps } from "../models/socketFunctionProps.mjs";
import jwt from "jsonwebtoken";
import type { UserDto } from "../models/UserDto.mjs";
import User from "../models/User.mjs";

export const initPlaceBid = (props: SocketFunctionProps) => {
  props.socket.on("placeBid", async (bid: Bid, auction: string) => {
    const foundAuction = await Auction.findOne({ _id: auction });

    if (foundAuction && props.loginCookie) {
      const UserDto = jwt.decode(props.loginCookie) as UserDto;

      const foundUser = await User.findOne({ username: UserDto.username });

      if (!foundUser) return console.error(`User: ${UserDto.username} not found`);

      bid.user = foundUser._id;

      if (!foundAuction.isActive) {
        props.io.to(auction).emit("bidError", "Auktionen är redan avslutad!");
        return;
      }
      if (bid.bid <= foundAuction.currentBid) {
        props.io.to(auction).emit("bidError", "Budet måste vara högre än ledande bud!");
        return;
      }
      if (foundAuction.owner.toString() === foundUser._id.toString()) {
        props.io.to(auction).emit("bidError", "Du kan inte buda på din egen auktion!");
        return;
      }

      foundAuction.currentBid = bid.bid;
      foundAuction.currentWinner = foundUser._id;
      foundAuction.allBids.push(bid);

      await foundAuction.save();

      const bidToEmit = {
        user: { username: foundUser.username, email: foundUser.email },
        bid: bid.bid,
        time: bid.time,
      };

      props.io.to(auction).emit("newBid", bidToEmit);
    } else {
      console.error(`Could not find auction: ${auction}`);
    }
  });
};
