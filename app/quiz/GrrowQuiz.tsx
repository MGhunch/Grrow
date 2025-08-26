'use client'

import { useEffect, useMemo, useState } from 'react';
import Progress from './progress';
import Breadcrumb from './breadcrumb';
import ScaleLabels from './scalelabels';
import { ANCHORS, CIRCLES } from './constants';
import type { QuizData, AnswerMap } from './types';

function bucketLabel(score: number) {
  if (score >= 75) return 'Nailing it';
  if (score >= 50) return 'Growing';
  if (score >= 25) return 'Learning';
  return 'Not yet';
}

// Map score → chip class (matches your globals.css .chip-* styles)
function chipClass(score: number) {
  if (score >= 75) return 'chip chip-nailing';  // purple
  if (score > 0)   return 'chip chip-growing';  // green (learning/growing)
  return 'chip chip-notyet';                    // grey
}

export default function GrrowQuiz() {
  const [circle, setCircle] = useState<QuizData['circle']>('ESSENTIALS');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<QuizData | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  // step: s=strength index, q=0 intro or 1..3 question index
  const [step, setStep] = useState<{ s: number; q: number } | null>(null);

  // Fetch questions when circle changes
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const res = await fetch(`/api/questions?circle=${circle}&version=v1.0`, { cache: 'no-store' });
      const payload = (await res.json()) as QuizData;
      setData(payload);
      setAnswers({});
      setStep({ s: 0, q: 0 });
      setLoading(false);
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    fetcher();
  }, [circle]);

  // Current block + whether intro or question
  const current = useMemo(() => {
    if (!data || !step) return null;
    const block = data.strengths[step.s];
    return { block, qIndex: step.q };
  }, [data, step]);

  // Overall average (for “Overall you’re …”)
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
    setStep(null); // end of circle → show summary
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

  if (loading || !data) return <div className="p-6 text-gray-500">Loading…</div>;

  // =========================
  // SUMMARY SCREEN (no step)
  // =========================
  if (!step) {
    // Build per-skillset averages for rows
    const blocks = data.strengths.map((b) => {
      const ids = b.questions.map((q) => q.id);
      const nums = ids.map((id) => answers[id]).filter((n) => typeof n === 'number');
      const avg = nums.length ? Math.round(nums.reduce((a, c) => a + c, 0) / nums.length) : 0;
      return { skillset: b.skillset, avg };
    });

    // Progress calc for the summary bars
    const totalQs = data.strengths.length * 3;
    const answeredQs = Object.values(answers).filter((n) => typeof n === 'number').length;

    const idx = CIRCLES.indexOf(circle);
    const isLast = idx === CIRCLES.length - 1;

    // Sentence-case the circle name
    const circleTitle = data.circle.charAt(0) + data.circle.slice(1).toLowerCase();

    return (
      <div className="grrow-wrap">
        <div className="grrow-stage">
          {/* TOP progress bar (continuous feel) */}
          <Progress current={answeredQs} total={totalQs} className="mb-6" />

          {/* Title + subhead */}
          <h1 className="grrow-summary-title">{circleTitle}</h1>
          <p className="text-[var(--brand-purple)] mb-6">Here’s your snapshot for this circle</p>

          {/* Skill rows */}
          <ul className="space-y-3">
            {blocks.map(({ skillset, avg }) => (
              <li
                key={skillset}
                className="flex flex-col gap-2 rounded-xl border p-4 bg-white shadow-sm"
              >
                {/* Skillset name in brand green */}
                <span className="font-semibold text-[var(--brand-green)]">{skillset}</span>

                {/* Bar + Chip inline */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="grrow-meter" role="img" aria-label={`${skillset} progress`}>
                      <span className="done" style={{ width: `${avg}%` }} />
                    </div>
                  </div>
                  <span className={chipClass(avg)}>{bucketLabel(avg)}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Overall you’re <b>{bucketLabel(circleAvg)}</b>.
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline" onClick={() => setCircle('ESSENTIALS')}>
                Redo
              </button>
              <button className="btn btn-primary" onClick={nextCircle}>
                {isLast ? 'Finish & Restart' : 'Next circle'}
              </button>
            </div>
          </div>

          {/* BOTTOM progress bar */}
          <Progress current={answeredQs} total={totalQs} className="mt-6" />
        </div>
      </div>
    );
  }

  // =========================
  // INTRO / QUESTION SCREENS
  // =========================
  const { block, qIndex } = current!;
  const question = qIndex ? block.questions[qIndex - 1] : null;

  // 12-question linear index (includes intros as step 0 per skillset)
  const linearIndex = qIndex === 0 ? 0 : step!.s * 3 + (qIndex - 1) + 1;
  const total = data.strengths.length * 3;

  return (
    <div className="grrow-wrap">
      <div className="grrow-stage">
        {/* Spaced top progress bar */}
        <Progress current={linearIndex} total={total} className="mb-6" />

        <Breadcrumb circle={data.circle} strength={block.strength} />

        {qIndex === 0 ? (
          <>
            <h2 className="grrow-skillset-title">{block.skillset}</h2>
            <p className="grrow-question-sub text-gray-700">{block.objective}</p>
            <div className="mt-4">
  <p className="grrow-question-sub text-gray-600">
    Here’s three questions to help you{" "}
    <span className="font-semibold text-[var(--brand-green)]">
      {block.skillset}
    </span>.
  </p>
</div>

            
            <div className="grrow-actions justify-end">
              <button onClick={next} className="btn btn-green">Let's Grrow</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="grrow-skillset-title">{block.skillset}</h2>
            <p className="grrow-question-sub">{question!.text}</p>

            <div className="grrow-slider-block">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={answers[question!.id] ?? 0}
                onChange={(e) => setAnswer(question!.id, Number(e.target.value))}
                className="grrow-range"
                aria-label="Self-assessment"
              />
              <ScaleLabels labels={ANCHORS} />
            </div>

            <div className="grrow-actions">
              <button className="tooltip-btn" aria-label="Help">?</button>
              <div className="right">
                <button onClick={back} className="btn btn-outline">Back</button>
                <button onClick={next} className="btn btn-green">Next</button>
              </div>
            </div>
          </>
        )}

        {/* Spaced bottom progress bar */}
        <Progress current={linearIndex} total={total} className="mt-6" />
      </div>
    </div>
  );
}
