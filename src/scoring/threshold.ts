export function getThresholdByType(type?: string): number {
  switch (type) {
    case "police":
      return 0.75;
    case "transport":
      return 0.7;
    case "news":
    default:
      return 0.62;
  }
}
