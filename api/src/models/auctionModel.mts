import { Schema, model, Types, type InferSchemaType } from 'mongoose';
import { userSchema } from './User.mjs';

const bidSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    bid: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: "time", updatedAt: false } },
);

const auctionSchema = new Schema(
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
      default: 0,
    },
    allBids: {
      type: [bidSchema],
      default: [],
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentWinner: {
      type: Types.ObjectId,
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

const Auction = model("Auction", auctionSchema);

export default Auction;
