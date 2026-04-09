import type { Bid } from "./Bid"
import type { User } from "./User"

export type Auction = {
    title: string,
    description: string,
    startPrice: number,
    currentBid: number,
    allBids: Bid[],
    owner: User,
    currentWinner: User | null,
    endTime: Date,
    isActive: boolean
}