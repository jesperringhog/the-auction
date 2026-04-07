const auctionsSection = document.getElementById("auctions") as HTMLElement;

// Skapa auktion
export async function createAuction(e: Event) {
  e.preventDefault();

  const title = (document.getElementById("title") as HTMLInputElement).value;
  const description = (document.getElementById("description") as HTMLTextAreaElement).value;
  const startPrice = parseFloat((document.getElementById("startPrice") as HTMLInputElement).value);
  const endTime = (document.getElementById("endTime") as HTMLInputElement).value;

  const res = await fetch("/api/auctions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, startPrice, endTime })
  });

  if (res.ok) {
    alert("Auktion skapad!");
    (e.target as HTMLFormElement).reset();
    fetchAuctions();
  } else {
    const data = await res.json();
    alert("Fel: " + data.message);
  }
}

// Hämta alla auktioner
export async function fetchAuctions() {
  const res = await fetch("/api/auctions");
  const data = await res.json();

  auctionsSection.innerHTML = "";

  data.forEach((auction: any) => {
    const div = document.createElement("div");
    div.className = "auction-card";
    div.innerHTML = `
      <h4>${auction.title}</h4>
      <p>${auction.description || ""}</p>
      <p>Startpris: ${auction.startPrice} kr</p>
      <p>Aktuellt bud: ${auction.currentBid || 0} kr</p>
      <button onclick="placeBid('${auction._id}')">Lägg bud</button>
    `;
    auctionsSection.appendChild(div);
  });
}

// Lägga bud
export async function placeBid(auctionId: string) {
  const bidAmount = parseFloat(prompt("Ange ditt bud:") || "0");
  if (!bidAmount || bidAmount <= 0) return;

  const res = await fetch(`/api/auctions/${auctionId}/bid`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bid: bidAmount })
  });

  if (res.ok) {
    alert("Bud lagt!");
    fetchAuctions();
  } else {
    const data = await res.json();
    alert("Fel: " + data.message);
  }
}