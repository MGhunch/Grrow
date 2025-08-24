import { NextResponse } from "next/server";

/**
 * Minimal server route:
 * - Reads query: circle (ESSENTIALS|EXPLORING|SUPPORTING|LEADING), version (default v1.0)
 * - Fetches Airtable (replace with your base + API key)
 * - Groups/sorts: CircleOrder → StrengthOrder → QuestionOrder
 * - Returns QuizCirclePayload
 */

const AIRTABLE_BASE = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE_NAME || "Questions";
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}`;

type Row = {
  id: string;
  fields: {
    ID: string;
    Circle: "ESSENTIALS" | "EXPLORING" | "SUPPORTING" | "LEADING";
    Strength: "Critical thinking" | "Creativity" | "Collaboration" | "Communication";
    Skillset: string;
    Objective?: string; // a.k.a. Goal
    Question: string;
    CircleOrder: number;
    StrengthOrder: number;
    QuestionOrder: number;
    Active?: boolean;
    Version?: string;
  };
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const circle = (searchParams.get("circle") || "ESSENTIALS").toUpperCase();
  const version = searchParams.get("version") || "v1.0";

  // Airtable filter: only Active, correct Circle + Version
  const filterByFormula = encodeURIComponent(
    `AND({Active}=TRUE(), {Circle}='${circle}', {Version}='${version}')`
  );

  // We fetch all rows for this circle/version
  const res = await fetch(`${AIRTABLE_URL}?filterByFormula=${filterByFormula}&pageSize=200`, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    // cache: "no-store"  // uncomment if you want fresh data every time
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch Airtable" }, { status: 500 });
  }

  const data = (await res.json()) as { records: Row[] };

  // group by Strength → then sort by QuestionOrder
  const byStrength = new Map<string, Row[]>();
  for (const r of data.records) {
    const k = r.fields.Strength;
    if (!byStrength.has(k)) byStrength.set(k, []);
    byStrength.get(k)!.push(r);
  }

  const strengths = Array.from(byStrength.entries())
    .map(([strength, rows]) => {
      // infer shared attributes from first row
      const first = rows[0].fields;
      // sort 1..3
      rows.sort((a, b) => (a.fields.QuestionOrder ?? 999) - (b.fields.QuestionOrder ?? 999));
      return {
        strength,
        strengthOrder: first.StrengthOrder ?? 999,
        skillset: first.Skillset,
        objective: first.Objective ?? "",
        questions: rows.map((r) => ({
          id: r.fields.ID || r.id,
          text: r.fields.Question,
          questionOrder: (r.fields.QuestionOrder as 1 | 2 | 3) ?? 3,
        })),
      };
    })
    // sort strengths within the circle
    .sort((a, b) => a.strengthOrder - b.strengthOrder);

  const payload = {
    circle,
    version,
    strengths,
  };

  return NextResponse.json(payload);
}
