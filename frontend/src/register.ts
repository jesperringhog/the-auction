import axios from "axios";
import "./style.css";

//Lyssna efter submit i registerForm
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  //Hitta användarens uppgifter i formuläret
  const userName = (document.getElementById("userName") as HTMLInputElement).value;
  const userEmail = (document.getElementById("userEmail") as HTMLInputElement).value;
  const userPassword = (document.getElementById("userPassword") as HTMLInputElement).value;

  //Gör en POST-request till servern
  try {
    const response = await axios.post(
      "http://localhost:3000/register",
      {
        username: userName,
        email: userEmail,
        password: userPassword,
      },
      {
        withCredentials: true,
      },
    );

    console.log(response.data);
    //Skicka tillbaka webbläsaren till startsidan där den kan logga in
    location.href = "/";
  } catch (error) {
    alert("Registreringen misslyckades. Försök igen!");
  }
});

//Lyssna klick på "Tillbaka till startsidan" leder till /
document.getElementById("backToStart")?.addEventListener("click", async (e) => {
  e.preventDefault();

  location.href = "/";
});
