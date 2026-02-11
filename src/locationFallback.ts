const INSTITUTION_LOCATIONS: Record<string, { lat: number; lng: number }> = {
  "maidstone crown court": { lat: 51.2699, lng: 0.5236 },
  "woolwich": { lat: 51.4910, lng: 0.0648 },
  "chatham": { lat: 51.3800, lng: 0.5270 },
  "old bailey": { lat: 51.5155, lng: -0.0994 }
};

export function fallbackLocation(
  text: string
): { lat: number; lng: number } | null {
  const lower = text.toLowerCase();

  for (const key in INSTITUTION_LOCATIONS) {
    if (lower.includes(key)) {
      return INSTITUTION_LOCATIONS[key];
    }
  }

  return null;
}
