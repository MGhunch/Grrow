// app/quiz/GrrowQuiz.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Question = { id: string; text: string; questionOrder: 1 | 2 | 3 };
type StrengthBlock = {
  strength: "Critical Thinking" | "Creativity" | "Collaboration" | "Communication";
  strengthOrder: number;
  skillset: string;
  objective: string;
  questions: Question[];
};

type QuizData = {
  circle: "ESSENTIALS" | "EXPLORING" | "SUPPORTING" | "LEADING";
  version: string;
  strengths: StrengthBlock[];
};

type AnswerMap = Record<string, number>;

const ANCHORS = ["Not yet", "Sometimes", "Mostly", "Consistently"];
const CIRCLES: QuizData["circle"][] = ["ESSENTIALS", "EXPLORING", "SUPPORTING", "LEADING"];

function bucketColor(score: number) {
  if (score >= 75) return "text-[#5F259F]";      // Purple = Nailing
  if (score >= 50) return "text-[#3AAA89]";      // Green = Growing
  if (score >= 25) return "text-[#3AAA89]/50";   // Light Green = Learning
  return "text-gray-300";                         // Not yet
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
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
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

  function nextCircle() {
    const idx = CIRCLES.indexOf(circle);
    const next = CIRCLES[(idx + 1) % CIRCLES.length];
    setCircle(next);
  }

  if (loading || !data) {
    return <div className="p-6 text-gray-500">Loading…</div>;
  }

  // Circle summary when step is null
  if (!step) {
    const blocks = data.strengths.map((b) => {
      const ids = b.questions.map((q) => q.id);
      const nums = ids.map((id) => answers[id]).filter((n) => typeof n === "number");
      const avg = nums.length ? Math.round(nums.reduce((a, c) => a + c, 0) / nums.length) : 0;
      return { skillset: b.skillset, avg };
    });

    const idx = CIRCLES.indexOf(circle);
    const isLast = idx === CIRCLES.length - 1;

    return (
      <div className="grrow-wrap">
        {/* Summary heading now uses Playfair via .grrow-summary-title */}
        <h1 className="grrow-summary-title">{data.circle} — Summary</h1>
        <p className="text-gray-600 mb-6">Great work. Here’s your snapshot for this circle.</p>

        <ul className="space-y-3">
          {blocks.map(({ skillset, avg }) => (
            <li
              key={skillset}
              className="flex items-center justify-between rounded-xl border p-4 bg-white shadow-sm"
            >
              <span className="font-medium">{skillset}</span>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${bucketColor(avg)}`}
                style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
              >
                {avg} · {bucketLabel(avg)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Circle average: <b>{circleAvg}</b> ({bucketLabel(circleAvg)})
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline" onClick={() => setCircle("ESSENTIALS")}>Redo</button>
            <button className="btn btn-primary" onClick={nextCircle}>
              {isLast ? "Finish & Restart" : "Next circle"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render either intro card (qIndex=0) or question card (1..3)
  const { block, qIndex } = current!;
  const question = qIndex ? block.questions[qIndex - 1] : null;

  // Linear progress (12 questions per circle)
  const linearIndex = qIndex === 0 ? 0 : step!.s * 3 + (qIndex - 1) + 1;
  const total = data.strengths.length * 3; // 12
  const percent = (linearIndex / total) * 100;

  return (
    <div className="grrow-wrap">
      <div className="grrow-stage">
        {/* Top progress */}
        <div className="grrow-progress">
          <div className="bar" style={{ width: `${percent}%` }} />
        </div>

        {/* Breadcrumb */}
        <div className="grrow-breadcrumb">
          <span className="circle">{data.circle}</span>
          <span className="sep">›</span>
          <span className="strength">{block.strength.toUpperCase()}</span>
        </div>

        {qIndex === 0 ? (
          // Skillset intro
          <div className="card card-lg">
            <div className="inner">
              <h2 className="grrow-skillset-title">Skillset: {block.skillset}</h2>
              <p className="mt-3 text-gray-600">{block.objective}</p>
              <button onClick={next} className="btn btn-primary mt-6">Start questions</button>
            </div>
          </div>
        ) : (
          // Question card
          <div className="card card-lg">
            <div className="inner">
              <h2 className="grrow-skillset-title">Skillset: {block.skillset}</h2>
              <p className="grrow-question-sub">{question!.text}</p>

              {/* Slider */}
              <div className="mt-6">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={answers[question!.id] ?? 0}
                  onChange={(e) => setAnswer(question!.id, Number(e.target.value))}
                  className="grrow-range"
                />
                <div className="grrow-scale">
                  {ANCHORS.map((a) => <span key={a}>{a}</span>)}
                </div>
              </div>

              {/* Actions */}
              <div className="grrow-actions">
                <button className="tooltip-btn">?</button>
                <div className="right">
                  <button onClick={back} className="btn btn-outline">Back</button>
                  <button onClick={next} className="btn btn-green">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom progress */}
        <div className="grrow-progress">
          <div className="bar" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}

