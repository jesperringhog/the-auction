//Nedräkning till auktionens sluttid

//Spara intervallens id
let intervalId: any;

export const startCountdown = (endTime: Date, element: HTMLElement) => {
  //Rensa ev gammal intervall
  if (intervalId) clearInterval(intervalId);

  //Hämta auktionens endTime som millisekunder
  const end = endTime.getTime();

  //Skapa en intervall
  intervalId = setInterval(() => {
    //Nuvarande tid i millisekunder
    const now = Date.now();

    //Tidsskillnaden
    const diff = end - now;

    //Om skillnaden är mindre än eller lika med 0
    if (diff <= 0) {
      element.textContent = "Sluttiden har passerat.";
      clearInterval(intervalId);
      return;
    }

    //Räkna ut antal timmar kvar
    const hours = Math.floor(diff / (1000 * 60 * 60));

    //Räkna ut antal minuter kvar
    const min = Math.floor((diff / (1000 / 60)) % 60);

    //Räkna ut antal sekunder kvar
    const sec = Math.floor((diff / 1000) % 60);

    element.textContent = `Slutar om: ${hours}h ${min}m ${sec}s`;
  }, 1000);
};
