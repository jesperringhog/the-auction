import type { Auction } from "./Auction";

export type AuctionState = {
  selectedAuction: string | null;
  auctions: Auction[];
};
