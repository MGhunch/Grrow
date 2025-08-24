// Grrow Quiz – React component for Next.js (App Router)
// Save this as: app/quiz/GrrowQuiz.tsx

import React, { useMemo, useState, useEffect } from "react";

const BRAND = {
  purple: "#5F259F",
  green: "#3AAA89",
};

// --- DATA --------------------------------------------------------------
const CIRCLES = ["Essentials", "Exploring", "Supporting", "Leading"] as const;
const STRENGTHS = [
  "Creativity",
  "Collaboration",
  "Communication",
  "Critical Thinking",
] as const;

type Circle = typeof CIRCLES[number];
type Strength = typeof STRENGTHS[number];

type Question = {
  id: string;
  strength: Strength;
  circle: Circle;
  skill: string;
  text: string;
};

// Only a few shown here for brevity – in your real file include all 48
const QUESTIONS: Question[] = [
  { id: "ct-essential-clarify-1", strength: "Critical Thinking", circle: "Essentials", skill: "Clarify", text: "Do you take time to clarify any requests, briefs or feedback?" },
  { id: "ct-essential-clarify-2", strength: "Critical Thinking", circle: "Essentials", skill: "Clarify", text: "Can you recognise key challenges or constraints up front?" },
  { id: "ct-essential-clarify-3", strength: "Critical Thinking", circle: "Essentials", skill: "Clarify", text: "Do you clearly summarise what and why before you get started?" },
  // ... add the rest of the 48 from your question list
];

function groupBy<T extends Record<string, any>>(arr: T[], by: keyof T) {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = String(item[by]);
    (acc[k] ||= []).push(item);
    return acc;
  }, {});
}

function average(nums: number[]) {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function clamp(n: number, min = 1, max = 5) {
  return Math.max(min, Math.min(max, n));
}

export default function GrrowQuiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [step, setStep] = useState<"quiz" | "results">("quiz");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("grrow-quiz-answers");
      if (saved) setAnswers(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("grrow-quiz-answers", JSON.stringify(answers)); } catch {}
  }, [answers]);

  const total = QUESTIONS.length;
  const completed = Object.keys(answers).length;
  const progress = Math.round((completed / total) * 100);

  const byStrength = useMemo(() => groupBy(QUESTIONS, "strength"), []);
  const byCircle = useMemo(() => groupBy(QUESTIONS, "circle"), []);

  const canSubmit = completed === total;

  function onChange(id: string, value: number) {
    setAnswers((prev) => ({ ...prev, [id]: clamp(value) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStep("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (step === "results") {
    return <ResultsScreen answers={answers} byStrength={byStrength} byCircle={byCircle} onReset={() => setStep("quiz")} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Grrow Skillsets Quiz</h1>
        <p className="text-sm text-gray-600">48 questions. Rate each statement from 1 (Rarely) to 5 (Always).</p>
      </header>

      {/* Progress */}
      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden mb-6">
        <div className="h-full transition-all" style={{ width: `${progress}%`, background: BRAND.purple }} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {STRENGTHS.map((strength) => (
          <section key={strength} className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: BRAND.green }} />
              <h2 className="text-lg font-semibold">{strength}</h2>
            </div>

            <div className="divide-y">
              {CIRCLES.map((circle) => (
                <div key={`${strength}-${circle}`} className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block w-2 h-2 rounded-full" style={{ background: BRAND.purple }} />
                    <h3 className="font-medium">{circle}</h3>
                  </div>

                  {QUESTIONS.filter(q => q.strength === strength && q.circle === circle).map((q) => (
                    <QuestionRow key={q.id} q={q} value={answers[q.id]} onChange={onChange} />
                  ))}
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-gray-600">Please answer all questions to continue.</div>
          <button
            type="submit"
            disabled={!canSubmit}
            className={`px-4 py-2 rounded-xl text-white transition ${canSubmit ? "" : "opacity-50 cursor-not-allowed"}`}
            style={{ background: BRAND.purple }}
          >
            View My Results
          </button>
        </div>
      </form>
    </div>
  );
}

function QuestionRow({ q, value, onChange }: { q: Question; value?: number; onChange: (id: string, value: number) => void }) {
  return (
    <div className="py-3">
      <div className="mb-2">{q.text}</div>
      <div className="flex items-center gap-3 text-sm">
        {[1,2,3,4,5].map((n) => (
          <label key={n} className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${value === n ? "ring-2" : ""}`} style={{ borderColor: value === n ? BRAND.purple : "#e5e7eb" }}>
            <input type="radio" name={q.id} value={n} checked={value === n} onChange={() => onChange(q.id, n)} className="hidden" />
            <span className="font-medium">{n}</span>
          </label>
        ))}
        <span className="ml-2 text-gray-500">1 = Rarely, 5 = Always</span>
      </div>
    </div>
  );
}

function ResultsScreen({ answers, byStrength, byCircle, onReset }: {
  answers: Record<string, number>;
  byStrength: Record<string, Question[]>;
  byCircle: Record<string, Question[]>;
  onReset: () => void;
}) {
  const strengthScores = Object.entries(byStrength).map(([strength, qs]) => {
    const vals = qs.map(q => answers[q.id] ?? 0);
    return { label: strength, avg: Number(average(vals).toFixed(2)) };
  });

  const circleScores = Object.entries(byCircle).map(([circle, qs]) => {
    const vals = qs.map(q => answers[q.id] ?? 0);
    return { label: circle, avg: Number(average(vals).toFixed(2)) };
  });

  const sorted = [...strengthScores].sort((a,b) => b.avg - a.avg);
  const keep = sorted[0];
  const focus = sorted[sorted.length - 1];
  const grow = sorted[Math.max(1, sorted.length - 2)];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-2">Your Results</h2>
      <p className="text-sm text-gray-600 mb-6">Averages by strength and circle. Use picks to guide your Keep / Focus / Grow discussion.</p>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: BRAND.purple }} />
          <h3 className="text-lg font-semibold">By Strength</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          {strengthScores.map(s => (
            <StatBar key={s.label} label={s.label} value={s.avg} color={BRAND.purple} />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: BRAND.green }} />
          <h3 className="text-lg font-semibold">By Circle</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          {circleScores.map(s => (
            <StatBar key={s.label} label={s.label} value={s.avg} color={BRAND.green} />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: BRAND.purple }} />
          <h3 className="text-lg font-semibold">Keep / Focus / Grow</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <PickCard label="Keep" item={keep} color={BRAND.green} subtitle="Going well — keep it up" />
          <PickCard label="Focus" item={focus} color={BRAND.purple} subtitle="Needs attention now" />
          <PickCard label="Grow" item={grow} color="#111827" subtitle="Look for opportunities" />
        </div>
      </section>

      <div className="flex items-center gap-3 mt-6">
        <button onClick={onReset} className="px-4 py-2 rounded-xl border" style={{ borderColor: "#e5e7eb" }}>Back to quiz</button>
      </div>
    </div>
  );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  const pct = Math.round((value / 5) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-medium">{label}</span>
        <span className="text-gray-600">{value.toFixed(2)} / 5</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function PickCard({ label, item, subtitle, color }: { label: string; item: { label: string; avg: number } | undefined; subtitle: string; color: string }) {
  if (!item) return null;
  return (
    <div className="p-4 rounded-2xl border bg-white" style={{ borderColor: "#e5e7eb" }}>
      <div className="text-xs uppercase tracking-wide mb-1" style={{ color }}>{label}</div>
      <div className="text-lg font-semibold mb-1">{item.label}</div>
      <div className="text-sm text-gray-600 mb-3">{subtitle}</div>
      <div className="text-sm">Average score: <strong>{item.avg.toFixed(2)}</strong></div>
    </div>
  );
}

