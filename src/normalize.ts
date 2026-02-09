import crypto from "crypto";
import { PublicSignal } from "./types/PublicSignal";

export function normalizeItem(raw: any): PublicSignal {
  const text = `${raw.title} ${raw.content}`.toLowerCase();

  const category =
    text.includes("knife") ||
    text.includes("stab") ||
    text.includes("drug") ||
    text.includes("attack")
      ? "crime"
      : text.includes("scam") ||
        text.includes("fraud")
      ? "safety"
      : "other";

  const severity =
    text.includes("killed") ||
    text.includes("murder")
      ? "high"
      : text.includes("arrest") ||
        text.includes("attack")
      ? "medium"
      : "low";

  const hash = crypto
    .createHash("sha1")
    .update(`${raw.feed}|${raw.title}|${raw.pubDate}`)
    .digest("hex");

  return {
    source: raw.feed,
    title: raw.title,
    description: raw.content,
    link: raw.link,
    publishedAt: new Date(raw.pubDate),

    category,
    severity,

    confidence: raw.confidence ?? 0.5,
    hash,
  };
}
