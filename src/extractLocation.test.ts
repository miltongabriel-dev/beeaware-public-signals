import { extractLocation } from "./extractLocation.js";


type TestCase = {
  text: string;
  expect: "FOUND" | "NULL";
};

const TESTS: TestCase[] = [
  // ✅ Deve encontrar
  { text: "Stabbing in Camden Town last night", expect: "FOUND" },
  { text: "Incident near King's Cross station", expect: "FOUND" },
  { text: "Robbery reported in Brixton area", expect: "FOUND" },
  { text: "Attack in Canary Wharf this morning", expect: "FOUND" },

  // ❌ NÃO deve encontrar
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

console.log(
  `\n📊 Result: ${passed}/${TESTS.length} tests passed`
);

if (passed !== TESTS.length) {
  process.exit(1);
}
