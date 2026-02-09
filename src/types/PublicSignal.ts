export type PublicSignal = {
  source: string;            // "BBC London"
  title: string;
  description: string;
  link: string;

  publishedAt: Date;

  // enriquecimento progressivo
  category: "crime" | "safety" | "transport" | "other";
  severity: "low" | "medium" | "high";

  // geoloc (opcional por enquanto)
  lat?: number;
  lng?: number;

  // dedupe
  hash: string;

  // confiança editorial (ex: BBC = 0.7)
  confidence: number;
};
