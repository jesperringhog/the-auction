import "./style.css";

export function updateCurrentBid(auctionId: string, bid: number) {
  const el = document.querySelector(`#auction-${auctionId} .current-bid`);

  if (!el) return;

  el.textContent = `Aktuellt bud: ${bid} kr`;
}

export function renderBidHistory(auctionId: string, bids: any[]) {
  const container = document.querySelector(`#auction-${auctionId} .bid-history`);

  if (!container) return;

  container.innerHTML = bids
    .map(
      (b) => `
      <div class="bid-row">
        <span>${b.userId}</span>
        <span>${b.amount} kr</span>
      </div>
    `,
    )
    .join("");
}
