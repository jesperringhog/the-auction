import axios from "axios";
import { updateAuthUI } from "../utils/updateAuthUI";

export const loginUser = async (userEmail: string, userPassword: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      {
        email: userEmail,
        password: userPassword,
      },
      {
        withCredentials: true,
      },
    );

    if (response.status >= 200 && response.status < 300) {
      sessionStorage.setItem("loggedInUsersName", response.data.username);
      updateAuthUI();
      location.href = "/";
    }
  } catch (error) {
    console.error(error);
    alert("Inloggningen misslyckades. Försök igen!");
  }
};
