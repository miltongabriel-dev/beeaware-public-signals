import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchAllFeeds } from "../src/fetchRss.js";
import { normalizeItem } from "../src/normalize.js";
import { isIncident } from "../src/isIncident.js";
import { dedupe } from "../src/dedupe.js";
import { extractLocation } from "../src/extractLocation.js";
import { getTTL } from "../src/ttl.js";


export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const raw = await fetchAllFeeds();
    const normalized = raw.map(normalizeItem);

    const incidentsOnly = normalized.filter(isIncident);
    const unique = dedupe(incidentsOnly);

    const enriched = unique
  .map((signal) => {
    const location = extractLocation(
      `${signal.title} ${signal.description}`
    );

    if (!location) return null;

    return {
      ...signal,
      lat: location.lat,
      lng: location.lng,
      ttlSeconds: getTTL(signal),
    };
  })
  .filter(Boolean);


res.status(200).json({
  status: "ok",
  fetched: raw.length,
  normalized: normalized.length,
  incidentCandidates: unique.length,
  geolocated: enriched.length,
  sample: enriched.slice(0, 3),
});

  } catch (err) {
    console.error("CRON ERROR", err);
    res.status(500).json({ status: "error" });
  }
}
