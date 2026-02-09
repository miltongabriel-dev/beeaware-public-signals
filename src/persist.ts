import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function persistExternalIncidents(enriched: any[]) {
  if (!enriched.length) return { inserted: 0 };

  const rows = enriched.map((s) => ({
    lat: s.lat,
    lng: s.lng,
    category: s.category,
    subcategory: s.category,
    severity: s.severity,
    description: s.title,
    created_at: s.publishedAt,
    visible_at: s.publishedAt,

    origin: "external",
    source: s.source,
    source_url: s.link,
    confidence: s.confidence,
    location_precision: s.locationPrecision,

    expires_at: new Date(
      Date.now() + s.ttlSeconds * 1000
    ).toISOString(),

    status: "visible",
    hash_fingerprint: s.hash,
  }));

  const { error } = await supabase
    .from("incidents")
    .insert(rows, { ignoreDuplicates: true });

  if (error) {
    throw error;
  }

  return { inserted: rows.length };
}
