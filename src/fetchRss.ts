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
          // 🔎 Feed metadata (novo)
          feedName: feed.name,
          feedType: feed.type,
          feedRegion: feed.region,
          feedDefaultConfidence: feed.defaultConfidence,

          // 📄 Conteúdo
          title: item.title ?? "",
          content: item.contentSnippet ?? item.content ?? "",
          link: item.link ?? "",
          pubDate: item.pubDate ?? new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error(`RSS error: ${feed.name}`, err);
    }
  }

  return items;
}
