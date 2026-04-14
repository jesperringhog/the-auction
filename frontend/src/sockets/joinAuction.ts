import type { Auction } from "../models/Auction";
import type { JoinAuctionProps } from "../models/JoinAuctionProps";

export const joinAuction = (props: JoinAuctionProps, auction: Auction) => {
  props.socket.emit("joinAuction", auction._id);
  props.state.selectedAuction = auction._id;

  props.socket.off("joinedAuction");

  props.socket.on("joinedAuction", (auction) => {
    console.log("Ansluten till auktion: ", auction);
  })
};

export const leaveAuction = (props: JoinAuctionProps, auction: Auction) => {
  props.socket.emit("leaveAuction", auction._id);
  props.state.selectedAuction = auction._id;

  props.socket.off("leftAuction");

  props.socket.on("leftAuction", (auction) => {
    console.log("Du lämnade auktionen: ", auction);
  })
};