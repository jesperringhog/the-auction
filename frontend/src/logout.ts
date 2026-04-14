import axios from "axios";

//Vid klick på logga ut-knappen
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    console.log("clicked logout");
    try {
      //Skickar req med cookie till backend för att ta bort cookie
      await axios.post(
        "http://localhost:3000/logout",
        {},
        {
          withCredentials: true,
        },
      );

      //Ta bort inloggade användaren från sessionStorage
      sessionStorage.removeItem("loggedInUsersName");

      //Uppdatera sidan
      location.href = "/";
    } catch (error) {
      console.error(error);
    }
  });
});
