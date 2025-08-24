import { NextResponse } from "next/server";

// Env (kept NEXT_PUBLIC so you don't need to change Vercel names)
const TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN ?? "";
const BASE  = process.env.NEXT_PUBLIC_AIRTABLE_BASE ?? "";
const TABLE = process.env.NEXT_PUBLIC_AIRTABLE_TABLE ?? "Questions";

// Normalisation + sort order
const STRENGTH_ORDER = [
  "Creativity",
  "Collaboration",
  "Communication",
  "Critical Thinking",
] as const;

const CIRCLE_ORDER = ["Essentials", "Exploring", "Supporting", "Leading"] as const;

function toTitle(s: string) {
  const lower = String(s || "").toLowerCase();
  // exact circles
  if (lower === "essentials") return "Essentials";
  if (lower === "exploring")  return "Exploring";
  if (lower === "supporting") return "Supporting";
  if (lower === "leading")    return "Leading";
  // generic title-case fallback
  return lower.replace(/\b\w/g, c => c.toUpperCase());
}
function normStrength(s: string) {
  const t = toTitle(s);
  return STRENGTH_ORDER.find(x => x.toLowerCase() === t.toLowerCase()) ?? t;
}
function normCircle(s: string) {
  const t = toTitle(s);
  return (CIRCLE_ORDER.find(x => x.toLowerCase() === t.toLowerCase()) ?? t) as (typeof CIRCLE_ORDER)[number];
}

export async function GET() {
  const missing = [
    !TOKEN && "NEXT_PUBLIC_AIRTABLE_TOKEN",
    !BASE && "NEXT_PUBLIC_AIRTABLE_BASE",
    !TABLE && "NEXT_PUBLIC_AIRTABLE_TABLE",
  ].filter(Boolean);

  if (missing.length) {
    return NextResponse.json(
      { error: "Missing Airtable environment variables.", missing },
      { status: 500 },
    );
  }

  try {
    const headers = { Authorization: `Bearer ${TOKEN}` };

    let offset: string | undefined;
    const records: any[] = [];

    do {
      const url = new URL(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent(String(TABLE))}`);
      // If you create a view named "API" (sorted in Airtable), uncomment the next line:
      // url.searchParams.set("view", "API");
      url.searchParams.set("sort[0][field]", "ID");
      url.searchParams.set("sort[0][direction]", "asc");
      if (offset) url.searchParams.set("offset", offset);

      const res = await fetch(url, { headers, cache: "no-store" });
      const text = await res.text();

      if (!res.ok) {
        return NextResponse.json(
          { error: "Airtable request failed", status: res.status, body: safeJson(text) },
          { status: 502 },
        );
      }

      const json = safeJson(text) as any;
      records.push(...(json.records || []));
      offset = json.offset;
    } while (offset);

    const questions = records
      .filter((r: any) => r?.fields?.Question && r?.fields?.Circle)
      .map((r: any) => {
        const strength = normStrength(r.fields.Strength || "");
        const circle   = normCircle(r.fields.Circle || "");
        return {
          recordId: r.id,
          id: r.fields.ID ?? r.id,
          strength,
          circle,
          skill: r.fields.Skillset ?? "",
          goal: r.fields.Goal ?? "",
          text: r.fields.Question,
        };
      })
      .sort((a: any, b: any) => {
        const s = STRENGTH_ORDER.indexOf(a.strength) - STRENGTH_ORDER.indexOf(b.strength);
        if (s !== 0) return s;
        const c = CIRCLE_ORDER.indexOf(a.circle) - CIRCLE_ORDER.indexOf(b.circle);
        if (c !== 0) return c;
        return String(a.id).localeCompare(String(b.id));
      });

    return NextResponse.json({ count: questions.length, questions });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unexpected server error", message: String(err?.message || err) },
      { status: 500 },
    );
  }
}

function safeJson(input: string) {
  try { return JSON.parse(input); } catch { return { raw: input }; }
}
