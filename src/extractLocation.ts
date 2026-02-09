const BOROUGHS: Record<string, { lat: number; lng: number }> = {
  "camden": { lat: 51.5416, lng: -0.1432 },
  "westminster": { lat: 51.4975, lng: -0.1357 },
  "greenwich": { lat: 51.4934, lng: 0.0098 },
  "hackney": { lat: 51.5450, lng: -0.0553 },
  "tower hamlets": { lat: 51.5203, lng: -0.0293 },
  "lambeth": { lat: 51.4571, lng: -0.1231 },
  "southwark": { lat: 51.5035, lng: -0.0804 },
  "croydon": { lat: 51.3762, lng: -0.0982 },
  "newham": { lat: 51.5255, lng: 0.0352 }
};

export function extractLocation(
  text: string
): { lat: number; lng: number } | null {
  const lower = text.toLowerCase();

  for (const borough in BOROUGHS) {
    if (lower.includes(borough)) {
      return BOROUGHS[borough];
    }
  }

  return null;
}
