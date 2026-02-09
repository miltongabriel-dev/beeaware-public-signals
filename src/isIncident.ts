import { PublicSignal } from "./types/PublicSignal";

const HIGH_RISK_KEYWORDS = [
  "stab",
  "stabbing",
  "knife",
  "murder",
  "killed",
  "shoot",
  "gun",
  "robbery",
  "assault",
  "rape",
  "sexual",
  "groom",
  "drug",
  "arson",
  "fire",
  "attack",
];

export function isIncident(signal: PublicSignal): boolean {
  if (signal.category !== "crime") return false;
  if (signal.severity === "low") return false;

  const text = `${signal.title} ${signal.description}`.toLowerCase();

  return HIGH_RISK_KEYWORDS.some((k) => text.includes(k));
}
