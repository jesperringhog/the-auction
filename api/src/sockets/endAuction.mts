import { io } from "../index.mjs";
import Auction from "../models/auctionModel.mjs";

export const lookForEndedAuctions = () => {
  setInterval(async () => {
    const now = new Date();

    const auctionsToEnd = await Auction.find({
      isActive: true,
      endTime: { $lte: now },
    });

    for (const auction of auctionsToEnd) {
      const updatedAuction = await Auction.findOneAndUpdate(
        {
          _id: auction._id,
          isActive: true,
        },
        {
          isActive: false,
        },
        { new: true },
      ).populate("currentWinner", "username");

      if (!updatedAuction) continue;

      io.to(auction._id.toString()).emit("endAuction", {
        auctionId: updatedAuction._id,
        currentBid: updatedAuction.currentBid,
        winner: updatedAuction.currentWinner,
        ended: updatedAuction.isActive,
      });
    }
  }, 1000);
};
