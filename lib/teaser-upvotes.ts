const PRE_LAUNCH_STATUSES = ["In Progress", "Recording", "Coming Soon"] as const;
const STORAGE_COUNTS_KEY = "cajun-teaser-vote-counts";
const STORAGE_VOTED_KEY = "cajun-teaser-voted";

type VoteCounts = Record<string, number>;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function readCounts(): VoteCounts {
  try {
    const raw = localStorage.getItem(STORAGE_COUNTS_KEY);
    return raw ? (JSON.parse(raw) as VoteCounts) : {};
  } catch {
    return {};
  }
}

function writeCounts(counts: VoteCounts): void {
  localStorage.setItem(STORAGE_COUNTS_KEY, JSON.stringify(counts));
}

function readVoted(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_VOTED_KEY);
    const list = raw ? (JSON.parse(raw) as string[]) : [];
    return new Set(list);
  } catch {
    return new Set();
  }
}

function writeVoted(voted: Set<string>): void {
  localStorage.setItem(STORAGE_VOTED_KEY, JSON.stringify([...voted]));
}

function isPreLaunchStatus(status: string): boolean {
  if (status === "Live") return false;
  return PRE_LAUNCH_STATUSES.includes(status as (typeof PRE_LAUNCH_STATUSES)[number]);
}

function updateButtonState(
  button: HTMLButtonElement,
  count: number,
  hasVoted: boolean,
): void {
  if (hasVoted) {
    button.disabled = true;
    button.classList.add("voted");
    button.textContent = "🔥 Voted!";
    return;
  }

  button.disabled = false;
  button.classList.remove("voted");
  button.innerHTML = `🔥 <span class="vote-count">${count}</span> Upvotes`;
}

function createVoteButton(seriesId: string, count: number, hasVoted: boolean): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "vote-btn";
  button.dataset.series = seriesId;
  updateButtonState(button, count, hasVoted);

  if (!hasVoted) {
    button.addEventListener("click", () => {
      if (button.disabled) return;

      const counts = readCounts();
      const voted = readVoted();
      const nextCount = (counts[seriesId] ?? 0) + 1;

      counts[seriesId] = nextCount;
      voted.add(seriesId);
      writeCounts(counts);
      writeVoted(voted);
      updateButtonState(button, nextCount, true);
    });
  }

  return button;
}

function findVoteSlot(card: Element): Element | null {
  return card.querySelector("[data-teaser-vote-slot]");
}

/**
 * Scans pre-launch teaser cards and injects interactive upvote buttons.
 * Safe to call on every client navigation — skips cards that already have a button.
 */
export function initTeaserUpvotes(): void {
  if (typeof window === "undefined") return;

  const counts = readCounts();
  const voted = readVoted();

  document.querySelectorAll("[data-channel-status]").forEach((badgeEl) => {
    const status =
      badgeEl.getAttribute("data-channel-status")?.trim() ??
      badgeEl.textContent?.trim() ??
      "";

    if (!isPreLaunchStatus(status)) return;

    const card = badgeEl.closest("[data-teaser-card]");
    if (!card) return;
    if (card.querySelector(".vote-btn")) return;

    const titleEl = card.querySelector("h3");
    if (!titleEl?.textContent?.trim()) return;

    const seriesId = slugify(titleEl.textContent);
    if (!seriesId) return;

    const slot = findVoteSlot(card);
    if (!slot) return;

    const count = counts[seriesId] ?? 0;
    const hasVoted = voted.has(seriesId);
    slot.appendChild(createVoteButton(seriesId, count, hasVoted));
  });
}
