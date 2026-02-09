import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchAllFeeds } from "../src/fetchRss.js";
import { normalizeItem } from "../src/normalize.js";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const raw = await fetchAllFeeds();
    const normalized = raw.map(normalizeItem);

    res.status(200).json({
      status: "ok",
      fetched: raw.length,
      normalized: normalized.length,
      sample: normalized.slice(0, 3),
    });
  } catch (err) {
    console.error("CRON ERROR", err);
    res.status(500).json({ status: "error" });
  }
}
