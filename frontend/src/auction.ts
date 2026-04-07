const auctionsSection = document.getElementById("auctions") as HTMLElement;

// 1. Skapa WebSocket-anslutning
const socket = new WebSocket("ws://localhost:8080");

// 2. Lyssna på uppdateringar från servern
socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case "updateBid":
      updateAuctionBid(data.auctionId, data.bid, data.userId);
      break;
    case "newAuction":
      addAuctionToDOM(data.auction);
      break;
  }
});

// --- Hämta alla auktioner (initial rendering) ---
export async function fetchAuctions() {
  const res = await fetch("/api/auctions");
  const data = await res.json();

  auctionsSection.innerHTML = "";
  data.forEach(addAuctionToDOM);
}

// --- Lägg till en auktion i DOM ---
function addAuctionToDOM(auction: any) {
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
}

// --- Uppdatera bud i DOM när servern skickar nya värden ---
function updateAuctionBid(auctionId: string, bid: number, userId: string) {
  const auctionDiv = document.querySelector(
    `button[onclick="placeBid('${auctionId}')"]`
  )?.parentElement;

  if (!auctionDiv) return;

  const currentBidP = auctionDiv.querySelector("p:nth-of-type(2)");
  if (currentBidP) currentBidP.textContent = `Aktuellt bud: ${bid} kr`;
}

// --- Skapa auktion via fetch (kan fortfarande användas) ---
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
    const newAuction = await res.json();
    // Skicka via WebSocket till alla clients
    socket.send(JSON.stringify({ type: "newAuction", auction: newAuction }));
  } else {
    const data = await res.json();
    alert("Fel: " + data.message);
  }
}

// --- Lägg bud via WebSocket istället för fetch ---
export function placeBid(auctionId: string) {
  const bidAmount = parseFloat(prompt("Ange ditt bud:") || "0");
  if (!bidAmount || bidAmount <= 0) return;

  // Skicka bud via socket till servern
  socket.send(JSON.stringify({
    type: "placeBid",
    auctionId,
    bid: bidAmount,
    userId: "dinUserId" // hämtas från cookie/jwt
  }));
}