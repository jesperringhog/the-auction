import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    bid: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: "time", updatedAt: false } },
);

const auctionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startPrice: {
      type: Number,
      required: true,
    },
    currentBid: {
      type: Number,
    },
    allBids: {
      type: [bidSchema], //Historik för alla bud på en auktion
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentWinner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    endTime: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Auction = mongoose.model("Auction", auctionSchema);

export default Auction;
