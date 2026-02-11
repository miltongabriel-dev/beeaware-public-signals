import crypto from "crypto";
import { PublicSignal } from "./types/PublicSignal";

/* ======================
   HELPERS
====================== */

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function normalizeDescription(text?: string): string {
  if (!text) return "";

  return text
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 220);
}

function normalizeTitle(title?: string): string {
  if (!title) return "";

  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\b(man|woman|person|suspect)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* ======================
   CONFIDENCE SCORING
====================== */

const STRONG_KEYWORDS = [
  "murder",
  "killed",
  "fatal",
  "shooting",
  "shot",
  "stabbing",
  "stabbed",
  "knife",
  "armed robbery",
];

const MEDIUM_KEYWORDS = [
  "attack",
  "assault",
  "burglary",
  "drugs",
  "arrest",
];

function keywordBoost(text: string): number {
  if (STRONG_KEYWORDS.some((k) => text.includes(k))) return 0.12;
  if (MEDIUM_KEYWORDS.some((k) => text.includes(k))) return 0.06;
  return 0;
}

function typeBase(type?: string): number {
  switch (type) {
    case "police":
      return 0.85;
    case "transport":
      return 0.75;
    case "news":
    default:
      return 0.65;
  }
}

function noisePenalty(title: string, description: string): number {
  if (title.length < 18) return 0.05;

  const generic = ["live", "updates", "breaking", "latest"];
  if (generic.some((g) => title.toLowerCase().includes(g))) return 0.04;

  if (description.length < 25) return 0.03;

  return 0;
}

function calculateConfidence(raw: any, title: string, description: string): number {
  const text = `${title} ${description}`.toLowerCase();

  const base =
    raw.feedDefaultConfidence != null
      ? (raw.feedDefaultConfidence + typeBase(raw.feedType)) / 2
      : typeBase(raw.feedType);

  let score = base;

  score += keywordBoost(text);

  if (raw.locationPrecision === "exact") score += 0.08;
  if (raw.locationPrecision === "area") score += 0.04;

  score -= noisePenalty(title, description);

  return clamp01(score);
}

/* ======================
   NORMALIZE ITEM
====================== */

export function normalizeItem(raw: any): PublicSignal {
  const title = raw.title ?? "";
  const content = raw.content ?? raw.description ?? "";
  const publishedRaw =
    raw.pubDate ?? raw.publishedAt ?? new Date().toISOString();

  const description = normalizeDescription(content);
  const text = `${title} ${description}`.toLowerCase();

  /* ---------- CATEGORY ---------- */

  const category =
    text.includes("knife") ||
    text.includes("stab") ||
    text.includes("drug") ||
    text.includes("attack") ||
    text.includes("robbery") ||
    text.includes("burglary")
      ? "crime"
      : text.includes("scam") || text.includes("fraud")
      ? "safety"
      : "other";

  /* ---------- SEVERITY ---------- */

  const severity =
    text.includes("killed") ||
    text.includes("murder") ||
    text.includes("fatal")
      ? "high"
      : text.includes("arrest") ||
        text.includes("attack") ||
        text.includes("robbery")
      ? "medium"
      : "low";

  /* ---------- SMART FINGERPRINT ---------- */

  const normalizedTitle = normalizeTitle(title);

  const datePart =
    typeof publishedRaw === "string"
      ? publishedRaw.slice(0, 10)
      : new Date(publishedRaw).toISOString().slice(0, 10);

  const hash = crypto
    .createHash("sha1")
    .update(`${normalizedTitle}|${datePart}`)
    .digest("hex");

  /* ---------- CONFIDENCE ---------- */

  const confidence = calculateConfidence(raw, title, description);

  /* ---------- RETURN ---------- */

  return {
    source: raw.feedName ?? raw.feed ?? "unknown",
    feedType: raw.feedType,
    title,
    description,
    link: raw.link ?? "",
    publishedAt: new Date(publishedRaw),

    category,
    severity,

    confidence,
    hash,
  };
}
