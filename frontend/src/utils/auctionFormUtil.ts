import { createAuction } from "../services/auctionService";

export const initAuctionForm = async () => {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLInputElement).value;
    const startPrice = +(document.getElementById("startPrice") as HTMLInputElement).value;
    const endTimeValue = (document.getElementById("endTime") as HTMLInputElement).value;

    const endTime = new Date(endTimeValue);

    await createAuction({title, description, startPrice, endTime}); 
}