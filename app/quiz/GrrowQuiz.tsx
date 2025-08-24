"use client";
import React, { useEffect, useMemo, useState } from "react";

// Types (match API)
type Circle = "Essentials" | "Exploring" | "Supporting" | "Leading";
type Question = {
  recordId: string;
  id: string;
  strength: string;
  circle: Circle;
  skill: string;
  goal: string;
  text: string;
};

// Fetch from our server route
async function fetchAllQuestions(): Promise<Question[]> {
  const res = await fetch("/api/questions", { cache: "no-store" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `Failed to load questions (${res.status})`);
  }
  const data = await res.json();
  return (data.questions || []) as Question[];
}

// Small helpers
function classNames(...xs: Array<string | false | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / Math.max(max, 1)) * 100);
  return (
    <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full transition-all" style={{ width: `${pct}%`, backgroundColor: "var(--brand-purple)" }} />
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>;
}

function RadioScale({
  name,
  value,
  onChange,
}: {
  name: string;
  value: number | null;
  onChange: (v: number) => void;
}) {
  const options = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-3 mt-4">
      {options.map((n) => (
        <label
          key={n}
          className={classNames(
            "cursor-pointer select-none grid place-items-center w-12 h-12 rounded-2xl border transition",
            value === n
              ? "border-[var(--brand-purple)] ring-2 ring-[color:var(--brand-green)]/40"
              : "border-gray-300 hover:border-gray-400"
          )}
        >
          <input
            type="radio"
            name={name}
            value={n}
            className="hidden"
            onChange={() => onChange(n)}
          />
          <span className="text-sm font-medium">{n}</span>
        </label>
      ))}
    </div>
  );
}

export default function GrrowQuiz() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      try {
        const qs = await fetchAllQuestions();
        setQuestions(qs);
      } catch (e: any) {
        setError(e?.message || "Failed to load questions");
      }
    })();
  }, []);

  const current = questions?.[index] ?? null;
  const total = questions?.length ?? 0;
  const progress = Object.keys(answers).length;

  const circleCounts = useMemo(() => {
    if (!questions) return {} as Record<string, number>;
    return questions.reduce((acc, q) => {
      acc[q.circle] = (acc[q.circle] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [questions]);

  function setAnswer(recordId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [recordId]: value }));
  }
  function next() {
    if (!questions) return;
    if (index < questions.length - 1) setIndex(index + 1);
  }
  function prev() {
    if (!questions) return;
    if (index > 0) setIndex(index - 1);
  }

  return (
    <main className="max-w-[720px] mx-auto p-6" style={{ fontFamily: "Open Sans, ui-sans-serif, system-ui" }}>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Grrow Quiz</h1>
        <p className="text-sm text-gray-600">
          Live questions from Airtable • Circles: <Pill>Essentials</Pill>{" "}
          <Pill>Exploring</Pill> <Pill>Supporting</Pill> <Pill>Leading</Pill>
        </p>
      </header>

      {!questions && !error && (
        <div className="animate-pulse text-gray-500">Loading questions…</div>
      )}

      {error && (
        <div className="text-red-600 border border-red-200 bg-red-50 p-3 rounded-2xl">
          {error}
        </div>
      )}

      {questions && questions.length === 0 && !error && (
        <div className="mt-4 text-orange-700 bg-orange-50 border border-orange-200 p-3 rounded-2xl">
          No questions found. Check env vars (BASE/TABLE), table name “Questions”,
          and that rows have both “Question” and “Circle”.
        </div>
      )}

      {current && (
        <section className="space-y-4">
          <ProgressBar value={progress} max={total || 1} />
          <div className="text-xs text-gray-500">{progress}/{total} answered</div>

          <div className="card p-5">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Pill>{current.circle}</Pill>
              {current.strength && <Pill>{current.strength}</Pill>}
              {current.skill && <Pill>{current.skill}</Pill>}
              {current.id && <Pill>{current.id}</Pill>}
            </div>

            {current.goal && <p className="text-sm text-gray-600 mb-2">{current.goal}</p>}
            <h2 className="text-lg font-medium text-gray-900">{current.text}</h2>

            <RadioScale
              name={current.recordId}
              value={answers[current.recordId] ?? null}
              onChange={(v) => setAnswer(current.recordId, v)}
            />

            <div className="flex justify-between mt-6">
              <button onClick={prev} disabled={index === 0} className="btn btn-outline">Back</button>
              <button onClick={next} className="btn btn-primary">
                {index < (total - 1) ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        </section>
      )}

      {questions && index >= questions.length && (
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Nice! You’re done.</h2>
          <p className="text-gray-600">
            We’ll soon turn this into <b>Keep / Focus / Grow</b> outputs. For now this is a local preview.
          </p>

          <div className="card p-5">
            <h3 className="font-medium mb-2">Your raw scores (preview)</h3>
            <pre className="text-xs bg-gray-50 p-3 rounded-2xl overflow-auto">
              {JSON.stringify(answers, null, 2)}
            </pre>
          </div>

          <div className="text-xs text-gray-500">
            Circle counts: {Object.entries(circleCounts).map(([k, v]) => `${k}: ${v}`).join(" • ")}
          </div>
        </section>
      )}

      <footer className="mt-12 text-xs text-gray-400">
        <div>Brand: Purple #5F259F • Green #3AAA89 • Font Open Sans</div>
      </footer>
    </main>
  );
}
