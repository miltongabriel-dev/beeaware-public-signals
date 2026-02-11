import { PublicSignal } from "./types/PublicSignal";

export function dedupe(signals: PublicSignal[]): PublicSignal[] {
  const seen = new Set<string>();
  const result: PublicSignal[] = [];

  for (const s of signals) {
    if (seen.has(s.hash)) continue;
    seen.add(s.hash);
    result.push(s);
  }

  return result;
}
