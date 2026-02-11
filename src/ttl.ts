import { PublicSignal } from "./types/PublicSignal";

export function getTTL(signal: PublicSignal): number {
  if (signal.severity === "high") {
    return 7 * 24 * 60 * 60; // 7 dias
  }

  if (signal.severity === "medium") {
    return 3 * 24 * 60 * 60; // 3 dias
  }

  return 24 * 60 * 60; // 1 dia
}
