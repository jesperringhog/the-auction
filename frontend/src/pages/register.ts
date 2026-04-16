import "/src/style.css";
import { registerUser } from "../services/registerService";
import { loginUser } from "../services/loginService";

//Lyssna efter submit i registerForm
document
  .getElementById("registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    //Hitta användarens uppgifter i formuläret
    const username = (document.getElementById("userName") as HTMLInputElement)
      .value;
    const email = (document.getElementById("userEmail") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("userPassword") as HTMLInputElement
    ).value;

    const registered = await registerUser({ username, email, password });

    if (registered) {
      loginUser(email, password);
    }
  });

//Lyssna klick på "Tillbaka till startsidan" leder till /
document.getElementById("backToStart")?.addEventListener("click", async (e) => {
  e.preventDefault();
  location.href = "/";
});
