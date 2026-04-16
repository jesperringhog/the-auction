import type { Socket } from "socket.io-client";
import type { Bid } from "../models/Bid.ts";
import { createHtmlForBid } from "../utils/bidUtil.ts";
import type { AuctionState } from "../models/AuctionState.ts";
<<<<<<< HEAD

// export function initPlaceBid(socket: Socket) {
//   socket.on("newBid", (data: any) => {
//     const { auctionId, bid, bids } = data;

//     updateCurrentBid(auctionId, bid);
//     renderBidHistory(auctionId, bids);
//   });
// }

//ORGINALVERSIONEN nedanför

// export function placeBid(auctionId: string, bidAmount: number, userId: string) {
//   socket.emit("placeBid", { auctionId, bidAmount, userId });
// }
=======
import { updateDetails } from "../utils/updateDetailsUtil.ts";
>>>>>>> 94fbc744332a28fc378257190a8b66e7e33a999b

// export const initPlaceBid = (socket: Socket, state: AuctionState) => {
 // socket.off("newBid");
 // socket.off("bidError");

 // socket.on("newBid", (newBid: Bid) => {
//  console.log(`Nytt bud: ${newBid.bid}kr`);
//    const auctionId = state.selectedAuction;
//    if (!auctionId) return;
//    createHtmlForBid(newBid, auctionId);
//  });
// };

<<<<<<< HEAD
const handleNewBid = (state: AuctionState) => (newBid: Bid) => {
  console.log(`Nytt bud: ${newBid.bid}kr`);

  const auctionId = state.selectedAuction;
  if (!auctionId) return;

  createHtmlForBid(newBid, auctionId);
=======
    createHtmlForBid(newBid, auctionId);
    updateDetails(auctionId, newBid); //
  });

  socket.on("bidError", (message) => {
    console.log(message);
    alert(message);
  });
>>>>>>> 94fbc744332a28fc378257190a8b66e7e33a999b
};

const handleBidError = (message: string) => {
  console.log(message);
  alert(message);
};

export const initPlaceBid = (socket: Socket, state: AuctionState) => {
socket.off("newBid");
socket.off("bidError");

socket.on("newBid", handleNewBid(state));
socket.on("bidError", handleBidError);
};