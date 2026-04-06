import "./style.css";

//Lyssna klick på "Tillbaka till startsidan" leder till /
document.getElementById("backToStart")?.addEventListener("click", async (e) => {
  e.preventDefault();

  location.href = "/";
});
