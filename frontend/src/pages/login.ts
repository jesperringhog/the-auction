import "/src/style.css";
import { loginUser } from "../services/loginService";

//Lyssna efter submit på "logga in"-formuläret
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  //Hämta användarnamn och lösenord från login-formuläret
  const userEmail = (document.getElementById("userEmail") as HTMLInputElement)
    .value;
  const userPassword = (
    document.getElementById("userPassword") as HTMLInputElement
  ).value;

  //POST-request för inloggning
  await loginUser(userEmail, userPassword);
});

//Lyssna efter klick på "Tillbaka till startsidan" som leder till startsidan /
document.getElementById("backToStart")?.addEventListener("click", async (e) => {
  e.preventDefault();
  location.href = "/";
});
