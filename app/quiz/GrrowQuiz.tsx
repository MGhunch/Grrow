'use client';

import { useEffect, useMemo, useState } from 'react';
import Progress from './quizprogress';
import Breadcrumb from './breadcrumb';
// Removed ScaleLabels + slider anchors
import { CIRCLES } from './constants';
import type { QuizData, AnswerMap } from './types';

// Status helpers (copy aligned to prototype tone)
function bucketLabel(score: number) {
  if (score >= 75) return 'Nailing it';
  if (score >= 50) return 'Growing';
  if (score >= 25) return 'Learning';
  return 'Not yet';
}
function statusClass(score: number) {
  const label = bucketLabel(score).toLowerCase();
  if (label.includes('nailing')) return 'is-nailing';
  if (label.includes('growing')) return 'is-growing';
  if (label.includes('learning')) return 'is-learning';
  return 'is-notyet';
}

// Discrete options for radio-card answers
const OPTIONS = [
  { label: 'Not yet', value: 0 },
  { label: 'Sometimes', value: 33 },
  { label: 'Mostly', value: 66 },
  { label: 'Consistently', value: 100 },
];

export default function GrrowQuiz() {
  const [circle, setCircle] = useState<QuizData['circle']>('ESSENTIALS');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<QuizData | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [step, setStep] = useState<{ s: number; q: number } | null>(null); // s=strength idx, q=0 intro or 1..3

  // Fetch questions for selected circle
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

  const current = useMemo(() => {
    if (!data || !step) return null;
    const block = data.strengths[step.s];
    return { block, qIndex: step.q };
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
    setStep(null); // show summary
  }
  function back() {
    if (!data || !step) return;
    const { s, q } = step;
    if (q > 0) return setStep({ s, q: (q - 1) as 0 | 1 | 2 });
    if (s > 0) return setStep({ s: s - 1, q: 3 });
  }
  function nextCircle() {
    const idx = CIRCLES.indexOf(circle);
    const nxt = CIRCLES[(idx + 1) % CIRCLES.length];
    setCircle(nxt);
  }

  if (loading || !data) return <div className="p-6 text-gray-500">Loading…</div>;

  // Summary screen (per circle)
  if (!step) {
    const blocks = data.strengths.map((b) => {
      const ids = b.questions.map((q) => q.id);
      const nums = ids
        .map((id) => answers[id])
        .filter((n): n is number => typeof n === 'number');
      const avg = nums.length ? Math.round(nums.reduce((a, c) => a + c, 0) / nums.length) : 0;
      return { skillset: b.skillset, avg };
    });
    const idx = CIRCLES.indexOf(circle);
    const isLast = idx === CIRCLES.length - 1;

    return (
      <div className="grrow-wrap">
        <div className="grrow-stage">
          <h1 className="grrow-skillset-title">{data.circle}</h1>
          <p className="text-gray-600 mb-6">Great work. Here’s your snapshot for this circle.</p>

          <ul className="space-y-3">
            {blocks.map(({ skillset, avg }) => (
              <li key={skillset} className="skill-row">
                <div className="top">
                  <span className="name">{skillset}</span>
                  <span className={`status-pill ${statusClass(avg)}`}>{bucketLabel(avg).toUpperCase()}</span>
                </div>
                <div className="mini-bar" aria-hidden>
                  <span className="fill" style={{ width: `${avg}%` }} />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Circle average: <b>{circleAvg}</b> ({bucketLabel(circleAvg)})
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline" onClick={() => setCircle('ESSENTIALS')}>Start Over</button>
              <button className="btn btn-accent" onClick={nextCircle}>
                {isLast ? 'Next Circle' /* loops back by design */ : 'Next Circle'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question / intro screens
  const { block, qIndex } = current!;
  const question = qIndex ? block.questions[qIndex - 1] : null;

  // 12-question progress within circle
  const linearIndex = qIndex === 0 ? 0 : step!.s * 3 + (qIndex - 1) + 1;
  const total = data.strengths.length * 3;

  return (
    <div className="grrow-wrap">
      <div className="grrow-stage">
        <Progress current={linearIndex} total={total} />

        <Breadcrumb circle={data.circle} strength={block.strength} />

        {qIndex === 0 ? (
          <>
            <h2 className="grrow-skillset-title">{block.skillset}</h2>
            <p className="grrow-question-sub text-gray-700">{block.objective}</p>

            <div className="grrow-actions">
              <button onClick={next} className="btn btn-accent">Start questions</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="grrow-skillset-title">{block.skillset}</h2>
            <p className="grrow-question-sub">{question!.text}</p>

            {/* Radio-card answers */}
            <div className="grrow-options" role="radiogroup" aria-label="Self-assessment">
              {OPTIONS.map((opt) => {
                const selected = (answers[question!.id] ?? null) === opt.value;
                return (
                  <label key={opt.label} className={`grrow-option ${selected ? 'is-selected' : ''}`}>
                    <input
                      type="radio"
                      name={question!.id}
                      value={opt.value}
                      checked={selected}
                      onChange={() => setAnswer(question!.id, opt.value)}
                      className="sr-only"
                    />
                    <span className="dot" aria-hidden />
                    <span className="text">{opt.label}</span>
                  </label>
                );
              })}
            </div>

            <div className="grrow-actions">
              <button className="tooltip-btn" aria-label="Help">?</button>
              <div className="right">
                <button onClick={back} className="btn btn-outline">Back</button>
                <button onClick={next} className="btn btn-accent">Next</button>
              </div>
            </div>
          </>
        )}

        <Progress current={linearIndex} total={total} />
      </div>
    </div>
  );
}
