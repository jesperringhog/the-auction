import axios from "axios";
import { updateAuthUI } from "../utils/updateAuthUI";

export const loginUser = async (userEmail: string, userPassword: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      {
        email: userEmail,
        password: userPassword,
      },
      {
        withCredentials: true,
      },
    );

    //Om det gick bra att logga in, statuskod 200-299 = lyckade anrop
    if (response.status >= 200 && response.status < 300) {
      sessionStorage.setItem("loggedInUsersName", response.data.username); //Lagra den inloggade användarens namn i sessionStorage
      updateAuthUI(); //Byt ut logga in + registrera-knappar till logga ut-knapp
      location.href = "/"; //Gå tillbaka till startsidan (eller om vi vill till nån annan sida?)
    }
  } catch (error) {
    console.error(error);
    alert("Inloggningen misslyckades. Försök igen!");
  }
};
