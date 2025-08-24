"use client";

import { useEffect, useMemo, useState } from "react";

type Question = { id: string; text: string; questionOrder: 1|2|3 };
type StrengthBlock = {
  strength: "Critical thinking" | "Creativity" | "Collaboration" | "Communication";
  strengthOrder: number;
  skillset: string;       // e.g., Clarify / Simplify / Solve / Innovate ...
  objective: string;      // show once at start of block
  questions: Question[];  // length = 3
};

type QuizData = {
  circle: "ESSENTIALS" | "EXPLORING" | "SUPPORTING" | "LEADING";
  version: string;
  strengths: StrengthBlock[];
};

type AnswerMap = Record<string, number>; // questionId -> 0..100

const ANCHORS = ["Not yet", "Sometimes", "Mostly", "Consistently"];

function bucketColor(score: number) {
  if (score >= 75) return "text-[#5F259F]";      // Purple = Nailing
  if (score >= 50) return "text-[#3AAA89]";      // Green = Growing
  if (score >= 25) return "text-[#3AAA89]/50";   // Light Green = Learning
  return "text-gray-300";                         // White = Not yet
}

function bucketLabel(score: number) {
  if (score >= 75) return "Nailing it";
  if (score >= 50) return "Growing";
  if (score >= 25) return "Learning";
  return "Not yet";
}

export default function GrrowQuiz() {
  const [circle, setCircle] = useState<QuizData["circle"]>("ESSENTIALS");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<QuizData | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [step, setStep] = useState<{ s: number; q: number } | null>(null); // s=strength idx, q=0=intro or 1..3

  // fetch circle data
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const res = await fetch(`/api/questions?circle=${circle}&version=v1.0`, { cache: "no-store" });
      const payload = (await res.json()) as QuizData;
      setData(payload);
      setAnswers({});
      setStep({ s: 0, q: 0 }); // start at first strength intro
      setLoading(false);
    };
    fetcher();
  }, [circle]);

  const current = useMemo(() => {
    if (!data || !step) return null;
    const block = data.strengths[step.s];
    return { block, qIndex: step.q }; // qIndex: 0=intro, 1..3=question idx
  }, [data, step]);

  const circleAvg = useMemo(() => {
    const vals = Object.values(answers);
    if (!vals.length) return 0;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [answers]);

  function setAnswer(id: string, val: number) {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  }

  function next() {
    if (!data || !step) return;
    const { s, q } = step;
    // 0=intro → go to first question; 1..2 → next; 3 → next strength intro or finish
    if (q === 0) return setStep({ s, q: 1 });
    if (q < 3) return setStep({ s, q: (q + 1) as 1 | 2 | 3 });
    if (s < data.strengths.length - 1) return setStep({ s: s + 1, q: 0 });
    // end of circle
    setStep(null);
  }

  function back() {
    if (!data || !step) return;
    const { s, q } = step;
    if (q > 0) return setStep({ s, q: (q - 1) as 0 | 1 | 2 });
    if (s > 0) return setStep({ s: s - 1, q: 3 });
  }

  if (loading || !data) {
    return <div className="p-6 text-gray-500">Loading…</div>;
  }

  // Circle summary when step is null
  if (!step) {
    // compute per-skillset averages
    const blocks = data.strengths.map((b) => {
      const ids = b.questions.map((q) => q.id);
      const nums = ids.map((id) => answers[id]).filter((n) => typeof n === "number");
      const avg = nums.length ? Math.round(nums.reduce((a, c) => a + c, 0) / nums.length) : 0;
      return { skillset: b.skillset, avg };
    });

    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-2">{data.circle} — Summary</h1>
        <p className="text-gray-600 mb-6">Great work. Here’s your snapshot for this circle.</p>

        <ul className="space-y-3">
          {blocks.map(({ skillset, avg }) => (
            <li key={skillset} className="flex items-center justify-between rounded-xl border p-4">
              <span className="font-medium">{skillset}</span>
              <span className={`font-semibold ${bucketColor(avg)}`}>{avg} · {bucketLabel(avg)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">Circle average: <b>{circleAvg}</b> ({bucketLabel(circleAvg)})</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl border" onClick={() => setCircle("EXPLORING")}>Next circle</button>
            <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={() => setCircle("ESSENTIALS")}>Redo</button>
          </div>
        </div>
      </div>
    );
  }

  // Render either intro card (qIndex=0) or question card (1..3)
  const { block, qIndex } = current!;
  const question = qIndex ? block.questions[qIndex - 1] : null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="mb-3">
        <span className="inline-block text-xs tracking-wide rounded-full bg-gray-100 px-3 py-1">{data.circle}</span>
      </div>

      {qIndex === 0 ? (
        // Skillset intro
        <div className="rounded-2xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold">{block.skillset}</h2>
          <p className="mt-2 text-gray-600">{block.objective}</p>
          <button onClick={next} className="mt-5 px-4 py-2 rounded-xl bg-[#5F259F] text-white">
            Start questions
          </button>
        </div>
      ) : (
        // Question card
        <div className="rounded-2xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold">{block.skillset}</h2>
          <p className="mt-2 text-gray-800">{question!.text}</p>

          {/* Slider */}
          <div className="mt-5">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={answers[question!.id] ?? 0}
              onChange={(e) => setAnswer(question!.id, Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              {ANCHORS.map((a) => <span key={a}>{a}</span>)}
            </div>
            <div className="mt-2 text-sm text-gray-600">Score: <b>{answers[question!.id] ?? 0}</b></div>
          </div>

          <div className="mt-6 flex justify-between">
            <button onClick={back} className="px-4 py-2 rounded-xl border">Back</button>
            <button onClick={next} className="px-4 py-2 rounded-xl bg-black text-white">Next</button>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            {block.strength} — question {qIndex} of 3
          </div>
        </div>
      )}
    </div>
  );
}
