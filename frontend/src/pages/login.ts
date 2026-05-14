import "/src/style.css";
import { loginUser } from "../services/loginService";

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userEmail = (document.getElementById("userEmail") as HTMLInputElement)
    .value;
  const userPassword = (
    document.getElementById("userPassword") as HTMLInputElement
  ).value;

  await loginUser(userEmail, userPassword);
});

document.getElementById("backToStart")?.addEventListener("click", async (e) => {
  e.preventDefault();
  location.href = "/";
});
