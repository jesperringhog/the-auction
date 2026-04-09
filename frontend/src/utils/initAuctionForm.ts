import type { Auction } from "../models/Auction";
import { createAuction } from "../services/auctionService";
import { createHtmlForAuctions } from "./createHtmlForAuctions";

export const initAuctionForm = async () => {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLInputElement).value;
    const startPrice = +(document.getElementById("startPrice") as HTMLInputElement).value;
    const endTimeValue = (document.getElementById("endTime") as HTMLInputElement).value;

    const endTime = new Date(endTimeValue);

    const newAuction = await createAuction({title, description, startPrice, endTime});
    
    //följande är för att testa så att det funkar
    const auctions: Auction[] = [];

    auctions.push(newAuction);
    console.log(auctions);
    
    createHtmlForAuctions(auctions);
}