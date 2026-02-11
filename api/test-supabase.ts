import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("incidents")
      .select("id")
      .limit(1);

    if (error) {
      return res.status(500).json({ error });
    }

    res.status(200).json({
      ok: true,
      connected: true,
      rows: data?.length ?? 0,
    });
  } catch (err: any) {
    res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
}
