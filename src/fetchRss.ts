import Parser from "rss-parser";
import { FEEDS } from "./feeds.js";

const parser = new Parser();

export async function fetchAllFeeds() {
  const items: any[] = [];

  for (const feed of FEEDS) {
    try {
      const result = await parser.parseURL(feed.url);

      for (const item of result.items) {
        items.push({
          feed: feed.name,
          confidence: feed.defaultConfidence,
          title: item.title ?? "",
          content: item.contentSnippet ?? "",
          link: item.link ?? "",
          pubDate: item.pubDate ?? ""
        });
      }
    } catch (err) {
      console.error(`RSS error: ${feed.name}`, err);
    }
  }

  return items;
}
