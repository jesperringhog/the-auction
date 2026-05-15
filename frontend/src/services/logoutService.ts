import axios from "axios";

document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  console.log("clicked logout");
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/logout`,
      {},
      {
        withCredentials: true,
      },
    );

    sessionStorage.removeItem("loggedInUsersName");

    location.href = "/";
  } catch (error) {
    console.error("Logout failed: ", error);
  }
});
