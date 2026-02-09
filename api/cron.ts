import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchAllFeeds } from "../src/fetchRss.js";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const items = await fetchAllFeeds();

    res.status(200).json({
      status: "ok",
      fetched: items.length,
      sample: items.slice(0, 3),
    });
  } catch (err) {
    console.error("CRON ERROR", err);

    res.status(500).json({
      status: "error",
      message: "fetch failed",
    });
  }
}
