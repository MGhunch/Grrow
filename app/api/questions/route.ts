// app/api/questions/route.ts
// Next.js App Router API that reads Airtable and returns QuizData for your GrrowQuiz.tsx

import { NextRequest } from "next/server";

export const runtime = "nodejs"; // we call Airtable REST from the server

type Question = { id: string; text: string; questionOrder: 1 | 2 | 3 };
type StrengthBlock = {
  strength: "Critical thinking" | "Creativity" | "Collaboration" | "Communication";
  strengthOrder: number;
  skillset: string;
  objective: string;
  questions: Question[]; // len = 3
};

type QuizData = {
  circle: "ESSENTIALS" | "EXPLORING" | "SUPPORTING" | "LEADING";
  version: string;
  strengths: StrengthBlock[];
};

const STRENGTH_ORDER: Record<string, number> = {
  "Critical Thinking": 1,
  "Creativity": 2,
  "Collaboration": 3,
  "Communication": 4,
};

export async function GET(req: NextRequest) {
  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    return Response.json(
      { ok: false, error: "Missing AIRTABLE_API_KEY, AIRTABLE_BASE_ID or AIRTABLE_TABLE_NAME" },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const circle =
    (url.searchParams.get("circle") as QuizData["circle"]) || "ESSENTIALS";
  const version = url.searchParams.get("version") || "v1.0";

  try {
    // 1) Pull all matching rows from Airtable (handles pagination)
    const records = await fetchAllFromAirtable({
      apiKey: AIRTABLE_API_KEY,
      baseId: AIRTABLE_BASE_ID,
      table: AIRTABLE_TABLE_NAME,
      filterByFormula: buildFormula({ circle, version }),
    });

    // 2) Map Airtable → QuizData
    const blocksMap = new Map<string, StrengthBlock>();

    for (const r of records) {
      const f = r.fields as any;

      const strength: string = f["Strength"];           // e.g. "Critical Thinking"
      const skillset: string = f["Skillset"];            // e.g. "Clarify"
      const objective: string = f["Goal"];               // objective text
      const qText: string = f["Question"];
      const qOrder: number = Number(f["Question Order"]); // 1..3
      const id: string = f["ID"];                        // e.g. "CT-CLA-01"

      if (!strength || !skillset || !qText || !qOrder || !id) continue;

      const key = `${strength}::${skillset}`;
      if (!blocksMap.has(key)) {
        blocksMap.set(key, {
          strength: (toTitle(strength) as StrengthBlock["strength"]),
          strengthOrder: STRENGTH_ORDER[toTitle(strength)] ?? 999,
          skillset,
          objective,
          questions: [],
        });
      }

      const block = blocksMap.get(key)!;
      block.questions.push({
        id,
        text: qText,
        questionOrder: (qOrder as 1 | 2 | 3),
      });
    }

    // 3) Sort questions inside each block and sort blocks by strength order
    const strengths = Array.from(blocksMap.values())
      .map((b) => ({
        ...b,
        questions: b.questions.sort((a, b) => a.questionOrder - b.questionOrder),
      }))
      .sort((a, b) => a.strengthOrder - b.strengthOrder);

    const payload: QuizData = { circle, version, strengths };
    return Response.json(payload);
  } catch (e: any) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

// ---- helpers ----

function toTitle(s: string): string {
  // normalise "Critical thinking" vs "Critical Thinking"
  return s?.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

function buildFormula({ circle, version }: { circle: string; version: string }) {
  // Airtable formula: AND({Active}=TRUE(), {Circle}='ESSENTIALS', {Version}='v1.0')
  const esc = (v: string) => `'${String(v).replace(/'/g, "\\'")}'`;
  return `AND({Active}=TRUE(), {Circle}=${esc(circle)}, {Version}=${esc(version)})`;
}

async function fetchAllFromAirtable(opts: {
  apiKey: string;
  baseId: string;
  table: string;
  filterByFormula: string;
}) {
  const { apiKey, baseId, table, filterByFormula } = opts;
  let url = new URL(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`);
  url.searchParams.set("pageSize", "100");
  url.searchParams.set("filterByFormula", filterByFormula);
  // We can also sort by Circle Order then Question Order if you like:
  // url.searchParams.set("sort[0][field]", "Circle Order");
  // url.searchParams.set("sort[0][direction]", "asc");
  // url.searchParams.set("sort[1][field]", "Question Order");
  // url.searchParams.set("sort[1][direction]", "asc");

  const all: any[] = [];
  let offset: string | undefined;

  do {
    if (offset) {
      url.searchParams.set("offset", offset);
    }

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Airtable error ${res.status}: ${await res.text()}`);
    }
    const json = await res.json();
    all.push(...(json.records || []));
    offset = json.offset;
  } while (offset);

  return all;
}
