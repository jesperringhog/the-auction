let intervals = new Map<string, any>();

export const startCountdown = (
  auctionId: string,
  endTime: Date,
  element: HTMLElement,
) => {
  const end = endTime.getTime();

  if (intervals.has(auctionId)) {
    clearInterval(intervals.get(auctionId));
  }

  const interval = setInterval(() => {
    const now = Date.now();

    const diff = end - now;

    if (diff <= 0) {
      element.textContent = "Sluttiden har passerat.";
      clearInterval(interval);
      intervals.delete(auctionId);
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));

    const min = Math.floor((diff / (1000 * 60)) % 60);

    const sec = Math.floor((diff / 1000) % 60);

    element.textContent = `Slutar om: ${hours}h ${min}m ${sec}s`;
  }, 1000);

  intervals.set(auctionId, interval);
};
