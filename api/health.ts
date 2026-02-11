import type { VercelRequest, VercelResponse } from "@vercel/node";

import { fetchAllFeeds } from "../src/fetchRss.js";
import { normalizeItem } from "../src/normalize.js";
import { isIncident } from "../src/isIncident.js";
import { dedupe } from "../src/dedupe.js";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const raw = await fetchAllFeeds();

    const normalized = raw.map(normalizeItem);
    const incidentsOnly = normalized.filter(isIncident);
    const unique = dedupe(incidentsOnly);

    /* ===== stats por feed ===== */

    const feedStats: Record<string, any> = {};

    for (const item of normalized) {
      if (!feedStats[item.source]) {
        feedStats[item.source] = {
          totalFetched: 0,
          incidentsDetected: 0,
          avgConfidence: 0,
          confidenceSum: 0,
        };
      }

      feedStats[item.source].totalFetched++;
      feedStats[item.source].confidenceSum += item.confidence;
    }

    for (const item of incidentsOnly) {
      feedStats[item.source].incidentsDetected++;
    }

    for (const key of Object.keys(feedStats)) {
      const stats = feedStats[key];
      stats.avgConfidence =
        stats.totalFetched > 0
          ? Number((stats.confidenceSum / stats.totalFetched).toFixed(3))
          : 0;
      delete stats.confidenceSum;
    }

    return res.status(200).json({
      status: "ok",
      totals: {
        fetched: raw.length,
        normalized: normalized.length,
        incidentsDetected: incidentsOnly.length,
        afterDedupe: unique.length,
        discardRate: Number(
          (
            1 -
            unique.length / (incidentsOnly.length || 1)
          ).toFixed(3)
        ),
      },
      feeds: feedStats,
    });
  } catch (err: any) {
    console.error("HEALTH CHECK ERROR", err);
    return res.status(500).json({
      status: "error",
      message: err?.message ?? "health check failed",
    });
  }
}
