import type { VercelRequest, VercelResponse } from "@vercel/node";

import { fetchAllFeeds } from "../src/fetchRss.js";
import { normalizeItem } from "../src/normalize.js";
import { isIncident } from "../src/isIncident.js";
import { dedupe } from "../src/dedupe.js";
import { extractLocation } from "../src/extractLocation.js";
import { fallbackLocation } from "../src/locationFallback.js";
import { getTTL } from "../src/ttl.js";
import { getThresholdByType } from "../src/scoring/threshold.js";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const DRY_RUN = process.env.DRY_RUN === "true";

    const raw = await fetchAllFeeds();
    const normalized = raw.map(normalizeItem);
    const incidentsOnly = normalized.filter(isIncident);
    

    const thresholdFiltered = incidentsOnly.filter((signal: any) => {
      const threshold = getThresholdByType(signal.feedType);
      return signal.confidence >= threshold;
    });

    const unique = dedupe(thresholdFiltered);


    const enriched = unique
      .map((signal) => {
        const text = `${signal.title} ${signal.description}`;
        const precise = extractLocation(text);
        const fallback = precise ? null : fallbackLocation(text);
        const location = precise ?? fallback;
        if (!location) return null;

        return {
          ...signal,
          lat: location.lat,
          lng: location.lng,
          ttlSeconds: getTTL(signal),
          locationPrecision: precise ? "approximate" : "contextual",
        };
      })
      .filter(Boolean);

    if (DRY_RUN) {
      return res.status(200).json({
        status: "ok",
        dryRun: true,
        fetched: raw.length,
        normalized: normalized.length,
        incidentCandidates: unique.length,
        geolocated: enriched.length,
        sample: enriched.slice(0, 3),
      });
    }

    const { persistExternalIncidents } = await import("../src/persist.js");
    const result = await persistExternalIncidents(enriched);

    res.status(200).json({
      status: "ok",
      persisted: result.inserted,
    });
  } catch (err: any) {
    console.error("CRON ERROR", err);
    res.status(500).json({
      status: "error",
      message: err?.message ?? "cron execution failed",
    });
  }
}
