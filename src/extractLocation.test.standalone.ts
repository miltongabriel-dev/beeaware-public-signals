// =====================
// extractLocation (copiado exatamente do código real)
// =====================

type LocationEntry = {
  lat: number;
  lng: number;
  aliases: string[];
};

const LOCATIONS: LocationEntry[] = [
  {
    lat: 51.5416,
    lng: -0.1432,
    aliases: ["camden", "camden town", "camden area"],
  },
  {
    lat: 51.4975,
    lng: -0.1357,
    aliases: ["westminster"],
  },
  {
    lat: 51.4934,
    lng: 0.0098,
    aliases: ["greenwich"],
  },
  {
    lat: 51.5450,
    lng: -0.0553,
    aliases: ["hackney"],
  },
  {
    lat: 51.5203,
    lng: -0.0293,
    aliases: ["tower hamlets"],
  },
  {
    lat: 51.4571,
    lng: -0.1231,
    aliases: ["lambeth"],
  },
  {
    lat: 51.5035,
    lng: -0.0804,
    aliases: ["southwark"],
  },
  {
    lat: 51.3762,
    lng: -0.0982,
    aliases: ["croydon"],
  },
  {
    lat: 51.5255,
    lng: 0.0352,
    aliases: ["newham"],
  },
  {
    lat: 51.5308,
    lng: -0.1238,
    aliases: ["king's cross", "kings cross"],
  },
  {
    lat: 51.4626,
    lng: -0.1146,
    aliases: ["brixton"],
  },
  {
    lat: 51.5055,
    lng: -0.0235,
    aliases: ["canary wharf"],
  },
];

function extractLocation(
  text: string
): { lat: number; lng: number; precision: "area" } | null {
  const lower = text.toLowerCase();

  for (const loc of LOCATIONS) {
    for (const alias of loc.aliases) {
      const pattern = new RegExp(`\\b${alias}\\b`, "i");
      if (pattern.test(lower)) {
        return {
          lat: loc.lat,
          lng: loc.lng,
          precision: "area",
        };
      }
    }
  }

  return null;
}

// =====================
// MINI TEST
// =====================

type TestCase = {
  text: string;
  expect: "FOUND" | "NULL";
};

const TESTS: TestCase[] = [
  { text: "Stabbing in Camden Town last night", expect: "FOUND" },
  { text: "Incident near King's Cross station", expect: "FOUND" },
  { text: "Robbery reported in Brixton area", expect: "FOUND" },
  { text: "Attack in Canary Wharf this morning", expect: "FOUND" },

  { text: "Crime in London rises again", expect: "NULL" },
  { text: "Incident in Manchester", expect: "NULL" },
  { text: "UK crime statistics released today", expect: "NULL" },
  { text: "Violence across England sparks debate", expect: "NULL" },
];

console.log("🔎 Running extractLocation mini-tests\n");

let passed = 0;

for (const test of TESTS) {
  const result = extractLocation(test.text);

  const ok =
    (result && test.expect === "FOUND") ||
    (!result && test.expect === "NULL");

  if (ok) {
    console.log(`✅ PASS | ${test.text}`);
    passed++;
  } else {
    console.log(`❌ FAIL | ${test.text}`);
    console.log("   → result:", result);
  }
}

console.log(`\n📊 Result: ${passed}/${TESTS.length} tests passed`);

if (passed !== TESTS.length) {
  process.exit(1);
}
