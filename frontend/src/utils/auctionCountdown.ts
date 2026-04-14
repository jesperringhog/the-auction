//Nedräkning till auktionens sluttid

//Map sparar varje intervall till varje auktion, så att rätt timer stoppas senare
let intervals = new Map<string, any>();

export const startCountdown = (auctionId: string, endTime: Date, element: HTMLElement) => {
  //Hämta auktionens endTime som millisekunder
  const end = endTime.getTime();

  //Rensa ev gammal intervall på auktionen, stoppar dubbla intervaller
  if (intervals.has(auctionId)) {
    clearInterval(intervals.get(auctionId));
  }

  //Skapa en intervall
  const interval = setInterval(() => {
    //Nuvarande tid i millisekunder
    const now = Date.now();

    //Tidsskillnaden
    const diff = end - now;

    //Om skillnaden är mindre än eller lika med 0
    if (diff <= 0) {
      element.textContent = "Sluttiden har passerat.";
      clearInterval(interval); //Stoppa timern
      intervals.delete(auctionId); //Ta bort auktionens intervall från mapen
      return;
    }

    //Räkna ut antal timmar kvar
    const hours = Math.floor(diff / (1000 * 60 * 60));

    //Räkna ut antal minuter kvar
    const min = Math.floor((diff / (1000 * 60)) % 60);

    //Räkna ut antal sekunder kvar
    const sec = Math.floor((diff / 1000) % 60);

    element.textContent = `Slutar om: ${hours}h ${min}m ${sec}s`;
  }, 1000);

  intervals.set(auctionId, interval); //Sparar auktionens intervall i map
};
