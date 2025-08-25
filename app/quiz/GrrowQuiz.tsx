'use client'

import { useMemo, useState, useEffect } from 'react';



/**
 * GrrowQuiz.tsx — single-file implementation matching the journey:
 *  Skillset Intro → 3× Skill Questions → Skill Summary (repeat 4×) → STRENGTH Summary
 *
 * Drop this entire file into: app/quiz/GrrowQuiz.tsx
 * Wire any real data (texts/objectives/questions) into QUIZ below or fetch on mount.
 */

// ────────────────────────────────────────────────────────────────────────────────
// Mock Data (replace with Airtable or your source)
// ────────────────────────────────────────────────────────────────────────────────
const QUIZ = {
  ESSENTIALS: {
    circle: "ESSENTIALS",
    strengths: [
      {
        skillset: "Clarify",
        objective:
          "Clarify meaning by restating and checking understanding.",
        questions: [
          { id: "clarify_q1", text: "Restate what you heard in your own words." },
          { id: "clarify_q2", text: "Ask for examples to check you understand." },
          { id: "clarify_q3", text: "Summarise the main point back to them." },
        ],
      },
      {
        skillset: "Question",
        objective: "Use open questions to explore ideas and reasons.",
        questions: [
          { id: "question_q1", text: "Ask why something matters to them." },
          { id: "question_q2", text: "Ask how they reached that view." },
          { id: "question_q3", text: "Ask what could change their mind." },
        ],
      },
      {
        skillset: "Engage",
        objective: "Invite others in and build on contributions.",
        questions: [
          { id: "engage_q1", text: "Bring a quiet person into the discussion." },
          { id: "engage_q2", text: "Add a ‘yes, and…’ to extend an idea." },
          { id: "engage_q3", text: "Acknowledge and connect two viewpoints." },
        ],
      },
      {
        skillset: "Connect",
        objective: "Link ideas across peers, texts, and experiences.",
        questions: [
          { id: "connect_q1", text: "Link today’s topic to prior learning." },
          { id: "connect_q2", text: "Relate a class idea to a lived example." },
          { id: "connect_q3", text: "Find a common thread across sources." },
        ],
      },
    ],
  },
} as const;

type CircleKey = keyof typeof QUIZ; // "ESSENTIALS" … add more circles if needed

// Derived types from data
export type SkillsetKey = (typeof QUIZ)[CircleKey]["strengths"][number]["skillset"];

// ────────────────────────────────────────────────────────────────────────────────
// State model
// ────────────────────────────────────────────────────────────────────────────────
type PageType = "intro" | "question" | "skill-summary" | "strength-summary";

type QuizState = {
  circle: CircleKey;
  skill: SkillsetKey;
  page: PageType;
  qIndex: 0 | 1 | 2; // three questions per skill
};

const SKILLS: SkillsetKey[] = ["Clarify", "Question", "Engage", "Connect"];
const QUESTIONS_PER_SKILL = 3 as const;

// ────────────────────────────────────────────────────────────────────────────────
// Helpers: labels, classes, scoring
// ────────────────────────────────────────────────────────────────────────────────
function bucketLabel(score: number) {
  if (score >= 75) return "Nailing it";
  if (score >= 50) return "Getting there";
  if (score >= 25) return "Growing";
  return "Not yet";
}

function strengthTagClass(score: number) {
  if (score >= 75) return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  if (score >= 50) return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
  if (score >= 25) return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  return "bg-gray-100 text-gray-700 ring-1 ring-gray-200";
}

function getStrength(circle: CircleKey, skill: SkillsetKey) {
  return QUIZ[circle].strengths.find((s) => s.skillset === skill)!;
}

function getSkillQuestionIds(circle: CircleKey, skill: SkillsetKey): string[] {
  return getStrength(circle, skill).questions.map((q) => q.id);
}

function getSkillAverage(
  circle: CircleKey,
  skill: SkillsetKey,
  answers: Record<string, number>
) {
  const ids = getSkillQuestionIds(circle, skill);
  const vals = ids.map((id) => answers[id]).filter((n) => typeof n === "number");
  return vals.length ? Math.round(vals.reduce((a, c) => a + c, 0) / vals.length) : 0;
}

function getCircleAverage(
  circle: CircleKey,
  answers: Record<string, number>
) {
  const ids = QUIZ[circle].strengths.flatMap((s) => s.questions.map((q) => q.id));
  const vals = ids.map((id) => answers[id]).filter((n) => typeof n === "number");
  return vals.length ? Math.round(vals.reduce((a, c) => a + c, 0) / vals.length) : 0;
}

// ────────────────────────────────────────────────────────────────────────────────
// Navigation reducer helpers
// ────────────────────────────────────────────────────────────────────────────────
function nextState(s: QuizState): QuizState {
  if (s.page === "intro") return { ...s, page: "question", qIndex: 0 };

  if (s.page === "question") {
    if (s.qIndex < (QUESTIONS_PER_SKILL - 1)) return { ...s, qIndex: ((s.qIndex + 1) as 0 | 1 | 2) };
    return { ...s, page: "skill-summary" };
  }

  if (s.page === "skill-summary") {
    const i = SKILLS.indexOf(s.skill);
    const hasNext = i < SKILLS.length - 1;
    if (hasNext) return { ...s, skill: SKILLS[i + 1], page: "intro", qIndex: 0 };
    return { ...s, page: "strength-summary" };
  }

  // strength-summary → end of journey; keep state
  return s;
}

function prevState(s: QuizState): QuizState {
  if (s.page === "intro") {
    const i = SKILLS.indexOf(s.skill);
    if (i > 0) return { ...s, skill: SKILLS[i - 1], page: "skill-summary", qIndex: 0 };
    return s;
  }

  if (s.page === "question") {
    if (s.qIndex > 0) return { ...s, qIndex: ((s.qIndex - 1) as 0 | 1 | 2) };
    return { ...s, page: "intro" };
  }

  if (s.page === "skill-summary") return { ...s, page: "question", qIndex: 2 };

  if (s.page === "strength-summary") return { ...s, skill: SKILLS[SKILLS.length - 1], page: "skill-summary", qIndex: 0 };

  return s;
}

// ────────────────────────────────────────────────────────────────────────────────
// UI Components (inline for single-file drop-in)
// ────────────────────────────────────────────────────────────────────────────────
function Pill({ score }: { score: number }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${strengthTagClass(score)}`}
      aria-label={`Score ${score}. ${bucketLabel(score)}`}
    >
      <span className="tabular-nums">{score}</span>
      <span>· {bucketLabel(score)}</span>
    </span>
  );
}

function ProgressLine({ value }: { value: number }) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safe}>
      <div className="h-full rounded-full" style={{ width: `${safe}%`, background: "linear-gradient(90deg,#7c3aed,#22c55e)" }} />
    </div>
  );
}

function SkillIntro({
  circle,
  skill,
  onStart,
  onBack,
}: {
  circle: CircleKey;
  skill: SkillsetKey;
  onStart: () => void;
  onBack: () => void;
}) {
  const s = getStrength(circle, skill);
  return (
    <div className="grrow-wrap">
      <div className="grrow-stage">
        <h1 className="text-sm font-semibold tracking-wide text-gray-900">{circle}</h1>
        <div className="mt-2 text-2xl font-semibold text-gray-900">{skill}</div>
        <p className="mt-2 text-gray-600 max-w-prose">{s.objective}</p>
        <div className="mt-6 flex gap-3">
          <button className="btn btn-outline" onClick={onBack}>Back</button>
          <button className="btn btn-primary" onClick={onStart}>Start</button>
        </div>
      </div>
    </div>
  );
}

function SkillQuestion({
  circle,
  skill,
  index,
  value,
  onChange,
  onNext,
  onBack,
}: {
  circle: CircleKey;
  skill: SkillsetKey;
  index: 0 | 1 | 2;
  value: number | undefined;
  onChange: (n: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const s = getStrength(circle, skill);
  const q = s.questions[index];

  return (
    <div className="grrow-wrap">
      <div className="grrow-stage">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-semibold tracking-wide text-gray-900">{circle}</h1>
          <div className="text-xs text-gray-500">{skill} · Q{index + 1} of {QUESTIONS_PER_SKILL}</div>
        </div>
        <div className="mt-4 text-lg font-medium text-gray-900">{q.text}</div>

        {/* Slider */}
        <div className="mt-6">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={value ?? 0}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            className="w-full"
            aria-label="Score"
          />
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>Not yet</span>
            <span>Consistently</span>
          </div>
        </div>

        {/* Live label */}
        <div className="mt-3 text-sm text-gray-700">
          Current: <b className="tabular-nums">{value ?? 0}</b> ({bucketLabel(value ?? 0)})
        </div>

        <div className="mt-6 flex justify-between">
          <button className="btn btn-outline" onClick={onBack}>Back</button>
          <button className="btn btn-primary" onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

function SkillSummary({
  circle,
  skill,
  answers,
  onNext,
  onBack,
}: {
  circle: CircleKey;
  skill: SkillsetKey;
  answers: Record<string, number>;
  onNext: () => void;
  onBack: () => void;
}) {
  const avg = getSkillAverage(circle, skill, answers);
  const objective = getStrength(circle, skill).objective;
  return (
    <div className="grrow-wrap">
      <div className="grrow-stage">
        <h1 className="text-sm font-semibold tracking-wide text-gray-900">{circle}</h1>
        <div className="mt-2 flex items-start justify-between gap-3">
          <div>
            <div className="text-xl font-semibold text-gray-900">{skill}</div>
            <div className="mt-1 text-sm text-gray-600 max-w-prose">{objective}</div>
          </div>
          <Pill score={avg} />
        </div>
        <div className="mt-4">
          <ProgressLine value={avg} />
        </div>
        <div className="mt-6 flex justify-between">
          <button className="btn btn-outline" onClick={onBack}>Back</button>
          <button className="btn btn-primary" onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

function StrengthSummary({
  circle,
  answers,
  onRedo,
  onNextCircle,
}: {
  circle: CircleKey;
  answers: Record<string, number>;
  onRedo: () => void;
  onNextCircle: () => void;
}) {
  const rows = useMemo(
    () =>
      SKILLS.map((name) => ({
        name,
        objective: getStrength(circle, name).objective,
        avg: getSkillAverage(circle, name, answers),
      })),
    [answers, circle]
  );

  const circleAvg = useMemo(() => getCircleAverage(circle, answers), [answers, circle]);

  return (
    <div className="grrow-wrap">
      <div className="grrow-stage">
        <h1 className="text-sm font-semibold tracking-wide text-gray-900">{circle}</h1>
        <p className="mt-1 text-gray-600">Great work. Here’s your snapshot for this circle.</p>

        <ul className="mt-5 space-y-3">
          {rows.map((r) => (
            <li key={r.name} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-medium text-gray-900">{r.name}</div>
                  <div className="mt-1 text-sm text-gray-600">{r.objective}</div>
                </div>
                <Pill score={r.avg} />
              </div>
              <div className="mt-3">
                <ProgressLine value={r.avg} />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Circle average: <b className="tabular-nums">{circleAvg}</b> ({bucketLabel(circleAvg)})
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline" onClick={onRedo}>Redo</button>
            <button className="btn btn-primary" onClick={onNextCircle}>Next circle</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// Main export
// ────────────────────────────────────────────────────────────────────────────────
export default function GrrowQuiz() {
  const [st, setSt] = useState<QuizState>({ circle: "ESSENTIALS", skill: "Clarify", page: "intro", qIndex: 0 });
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const s = getStrength(st.circle, st.skill);
  const currentQ = st.page === "question" ? s.questions[st.qIndex] : undefined;

  const handleAnswer = (value: number) => {
    if (!currentQ) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
  };

  const value = currentQ ? answers[currentQ.id] : undefined;

  const goNext = () => setSt((old) => nextState(old));
  const goBack = () => setSt((old) => prevState(old));

  // Router
  if (st.page === "intro") {
    return (
      <SkillIntro circle={st.circle} skill={st.skill} onStart={goNext} onBack={goBack} />
    );
  }

  if (st.page === "question") {
    return (
      <SkillQuestion
        circle={st.circle}
        skill={st.skill}
        index={st.qIndex}
        value={value}
        onChange={handleAnswer}
        onNext={goNext}
        onBack={goBack}
      />
    );
  }

  if (st.page === "skill-summary") {
    return (
      <SkillSummary
        circle={st.circle}
        skill={st.skill}
        answers={answers}
        onNext={goNext}
        onBack={goBack}
      />
    );
  }

  // Final STRENGTH summary (all four skills)
  return (
    <StrengthSummary
      circle={st.circle}
      answers={answers}
      onRedo={() => setSt({ circle: st.circle, skill: "Clarify", page: "intro", qIndex: 0 })}
      onNextCircle={() => {
        // TODO: advance to next circle if you add more circles
        setSt({ circle: st.circle, skill: "Clarify", page: "intro", qIndex: 0 });
        setAnswers({});
      }}
    />
  );
}
