import type { VercelRequest, VercelResponse } from "@vercel/node";

import { fetchAllFeeds } from "../src/fetchRss.js";
import { normalizeItem } from "../src/normalize.js";
import { isIncident } from "../src/isIncident.js";
import { dedupe } from "../src/dedupe.js";
import { extractLocation } from "../src/extractLocation.js";
import { fallbackLocation } from "../src/locationFallback.js";
import { getTTL } from "../src/ttl.js";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    // 1️⃣ Fetch bruto
    const raw = await fetchAllFeeds();

    // 2️⃣ Normalização
    const normalized = raw.map(normalizeItem);

    // 3️⃣ Gate Classe A
    const incidentsOnly = normalized.filter(isIncident);

    // 4️⃣ Dedupe
    const unique = dedupe(incidentsOnly);

    // 5️⃣ Enriquecimento (geo + ttl)
    const enriched = unique
      .map((signal) => {
        const text = `${signal.title} ${signal.description}`;

        // tentativa explícita
        const precise = extractLocation(text);

        // fallback contextual
        const fallback = precise ? null : fallbackLocation(text);

        const location = precise ?? fallback;
        if (!location) return null;

        return {
          ...signal,
          lat: location.lat,
          lng: location.lng,
          ttlSeconds: getTTL(signal),
          locationPrecision: precise ? "borough" : "contextual",
        };
      })
      .filter(
        (item): item is NonNullable<typeof item> => item !== null
      );

    // 6️⃣ Resposta (dry-run)
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
    res.status(500).json({
      status: "error",
      message: "cron execution failed",
    });
  }
}
