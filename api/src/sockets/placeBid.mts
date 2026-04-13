import type { Socket } from "socket.io";
import { Server } from "socket.io";
import Auction, { type Bid } from "../models/auctionModel.mjs";
import type { SocketFunctionProps } from "../models/socketFunctionProps.mjs";
import jwt from "jsonwebtoken";
import type { UserDto } from "../models/UserDto.mjs";
import type { UserDbType } from "../models/User.mjs";
import { io } from "../index.mjs";
import User from "../models/User.mjs";

//EJ KLAR - under utveckling

// interface PlaceBidData {
//     auctionId: string;
//     bid: number;
//     userId: string;
// }

// export const initPlaceBid = (io: Server, socket: Socket) => {
//     socket.on("placeBid", async (data: PlaceBidData) => {
//         try {
//             const { auctionId, bid, userId } = data;

//             const auction = await Auction.findById(auctionId);
//             if (!auction) return;

//             if (!auction.isActive) return;
//             if (bid <= auction.currentBid) return;
//             if (auction.owner.toString() === userId) return;

//             auction.currentBid = bid;
//             auction.currentWinner = userId;
//             auction.allBids.push({ user: userId, bid });

//             await auction.save();

//             const payload = {
//                 auctionId,
//                 bid,
//                 bids: auction.allBids.map(b => ({
//                     userId: b.user.toString(),
//                     amount: b.bid
//                 })),
//             };
//             io.to(`auction_${auctionId}`).emit("newBid", payload);
//         } catch (error) {
//             console.error("Error in placeBid:", error);
//         }
//     });
// };

export const initPlaceBid = (props: SocketFunctionProps) => {
    // props.socket.on("placeBid", async (bid: Bid, auction: string) => {
    //     // const foundAuction = await Auction.findOne({ title: auction});

    //     // if (foundAuction && props.loginCookie) {
    //     //     const UserDto = jwt.decode(props.loginCookie) as UserDto;

    //     //     const foundUser = await User.findOne({ username: UserDto.username});
    //     //     if (!foundUser) return console.error(`User: ${UserDto.username} not found`);

    //     //     bid.user = foundUser._id;

    //     //     if (!foundAuction.isActive) return;
    //     //     if (bid.bid <= foundAuction.currentBid) return;
    //     //     if (foundAuction.owner.toString() === foundUser._id.toString()) return;

    //     //     foundAuction.currentBid = bid.bid;
    //     //     foundAuction.currentWinner = foundUser._id;
    //     //     foundAuction.allBids.push(bid);

    //     //     await foundAuction.save();
            
    //     //     props.io.to(auction).emit("bid", bid);
    //     // } else {
    //     //     console.error(`Could not find auction: ${auction}`);
    //     // }
    // })
}