import axios from "axios";
import "/src/style.css";
import { updateAuthUI } from "../utils/updateAuthUI";

//Lyssna efter submit på "logga in"-formuläret
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  //Hämta användarnamn och lösenord från login-formuläret
  const userEmail = (document.getElementById("userEmail") as HTMLInputElement).value;
  const userPassword = (document.getElementById("userPassword") as HTMLInputElement).value;

  //POST-request för inloggning
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
});

//Lyssna efter klick på "Tillbaka till startsidan" som leder till startsidan /
document.getElementById("backToStart")?.addEventListener("click", async (e) => {
  e.preventDefault();
  location.href = "/";
});
