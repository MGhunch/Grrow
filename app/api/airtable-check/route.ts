// app/api/airtable-check/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    return Response.json(
      { ok: false, error: "Missing AIRTABLE_* env vars" },
      { status: 500 }
    );
  }

  const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`);
  url.searchParams.set("maxRecords", "5");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    // Vercel edge/runtime handles TLS; no need for extra opts
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return Response.json({ ok: false, status: res.status, error: text }, { status: 500 });
  }

  const json = await res.json();
  return Response.json({ ok: true, sample: json });
}
