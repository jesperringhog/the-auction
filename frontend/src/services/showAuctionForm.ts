export const hideAuctionForm = () => {
  const createAuctionSection = document.getElementById("createAuctionSection");

  if (!createAuctionSection) throw new Error("Section not found");

  const loggedInUser = sessionStorage.getItem("loggedInUsersName");

  if (loggedInUser) {
    createAuctionSection.classList.remove("hide");
  } else {
    createAuctionSection.classList.add("hide");
  }
};
