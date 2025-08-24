// app/api/questions/route.ts
import { NextResponse } from "next/server";

const TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN!;
const BASE  = process.env.NEXT_PUBLIC_AIRTABLE_BASE!;
const TABLE = process.env.NEXT_PUBLIC_AIRTABLE_TABLE || "Questions";

export async function GET() {
  if (!TOKEN || !BASE || !TABLE) {
    return NextResponse.json(
      { error: "Missing Airtable environment variables." },
      { status: 500 }
    );
  }

  try {
    const headers = { Authorization: `Bearer ${TOKEN}` };
    const circleOrder = ["Essentials", "Exploring", "Supporting", "Leading"] as const;

    let offset: string | undefined;
    const records: any[] = [];

    do {
      const url = new URL(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent(TABLE)}`);
      url.searchParams.set("sort[0][field]", "ID");
      url.searchParams.set("sort[0][direction]", "asc");
      if (offset) url.searchParams.set("offset", offset);

      const res = await fetch(url, { headers, cache: "no-store" });
      const text = await res.text();

      if (!res.ok) {
        return NextResponse.json(
          { error: "Airtable request failed", status: res.status, body: safeJson(text) },
          { status: 502 }
        );
      }

      const json = safeJson(text) as any;
      records.push(...(json.records || []));
      offset = json.offset;
    } while (offset);

    const questions = records
      .filter((r: any) => r?.fields?.Question && r?.fields?.Circle)
      .map((r: any) => ({
        recordId: r.id,
        id: r.fields.ID ?? r.id,
        circle: r.fields.Circle,
        skill: r.fields.Skillset ?? "",
        goal: r.fields.Goal ?? "",
        text: r.fields.Question,
      }))
      .sort((a: any, b: any) => {
        const cd = circleOrder.indexOf(a.circle) - circleOrder.indexOf(b.circle);
        return cd !== 0 ? cd : String(a.id).localeCompare(String(b.id));
      });

    return NextResponse.json({ count: questions.length, questions });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unexpected server error", message: String(err?.message || err) },
      { status: 500 }
    );
  }
}

function safeJson(input: string) {
  try { return JSON.parse(input); } catch { return { raw: input }; }
}
