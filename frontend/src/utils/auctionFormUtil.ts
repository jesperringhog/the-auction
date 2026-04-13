import { createAuction } from "../services/auctionService";

let title = "";
let description = "";
let startPrice = 0;
let userEndTime = "";

export const initAuctionForm = async () => {
  const titleInput = document.getElementById("title") as HTMLInputElement;
  const descriptionInput = document.getElementById(
    "description",
  ) as HTMLInputElement;
  const startPriceInput = document.getElementById("startPrice") as HTMLInputElement;
  const endTimeInput = document.getElementById("endTime") as HTMLInputElement;

  title = titleInput.value;
  description = descriptionInput.value;
  startPrice = +startPriceInput.value;
  userEndTime = endTimeInput.value;

  const endTime = new Date(userEndTime);
  
  await createAuction({ title, description, startPrice, endTime });

  if (title && description && startPrice && userEndTime) {
    titleInput.value = "";
    descriptionInput.value = "";
    startPriceInput.value = "";
    endTimeInput.value = "";
  }
};
