import type { Socket } from "socket.io-client"
import type { AuctionState } from "./AuctionState"

export type JoinAuctionProps = {
    socket: Socket,
    state: AuctionState
}