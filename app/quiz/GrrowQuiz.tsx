import React, { useState } from "react";

// === Dummy data shape ===
// Replace with Airtable fetch
const QUIZ = {
  ESSENTIALS: {
    circle: "ESSENTIALS",
    strengths: [
      { skillset: "Clarify", objective: "Clarify meaning by restating and checking understanding.", questions: [{ id: "q1" }] },
      { skillset: "Question", objective: "Use open questions to explore ideas and reasons.", questions: [{ id: "q2" }] },
      { skillset: "Engage", objective: "Invite others in and build on contributions.", questions: [{ id: "q3" }] },
      { skillset: "Connect", objective: "Link ideas across peers, texts, and experiences.", questions: [{ id: "q4" }] },
    ],
  },
};

const CIRCLES = Object.keys(QUIZ);

// === Helpers ===
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

// === Main component ===
export default function GrrowQuiz() {
  const [circle, setCircle] = useState("ESSENTIALS");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const data = QUIZ[circle];

  const allAnswers = Object.values(answers).filter((n) => typeof n === "number");
  const circleAvg = allAnswers.length
    ? Math.round(allAnswers.reduce((a, c) => a + c, 0) / allAnswers.length)
    : 0;

  function nextCircle() {
    const idx = CIRCLES.indexOf(circle);
    const next = CIRCLES[idx + 1];
    if (next) {
      setCircle(next);
      setStep(0);
    } else {
      setCircle(CIRCLES[0]);
      setStep(0);
      setAnswers({});
    }
  }

  // === Summary screen ===
  if (!step) {
    const blocks = data.strengths.map((b) => {
      const ids = b.questions.map((q) => q.id);
      const nums = ids.map((id) => answers[id]).filter((n) => typeof n === "number");
      const avg = nums.length ? Math.round(nums.reduce((a, c) => a + c, 0) / nums.length) : 0;
      return { skillset: b.skillset, objective: b.objective, avg };
    });

    const idx = CIRCLES.indexOf(circle);
    const isLast = idx === CIRCLES.length - 1;

    return (
      <div className="grrow-wrap">
        <div className="grrow-stage">
          <h1 className="grrow-summary-title">{data.circle}</h1>
          <p className="text-gray-600 mb-6">Great work. Here’s your snapshot for this circle.</p>

          <ul className="space-y-3">
            {blocks.map(({ skillset, objective, avg }) => (
              <li key={skillset} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-medium text-gray-900">{skillset}</div>
                    {objective && (
                      <div className="mt-1 text-sm text-gray-600">{objective}</div>
                    )}
                  </div>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${strengthTagClass(avg)}`}
                    aria-label={`Score ${avg}. ${bucketLabel(avg)}`}
                  >
                    <span className="tabular-nums">{avg}</span>
                    <span>· {bucketLabel(avg)}</span>
                  </span>
                </div>

                {/* Progress line */}
                <div className="mt-3" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={avg}>
                  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(0, Math.min(100, avg))}%`,
                        background: "linear-gradient(90deg,#7c3aed,#22c55e)",
                      }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Circle average: <b className="tabular-nums">{circleAvg}</b> ({bucketLabel(circleAvg)})
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-outline"
                onClick={() => setCircle("ESSENTIALS")}
              >
                Redo
              </button>
              <button className="btn btn-primary" onClick={nextCircle}>
                {isLast ? "Finish & Restart" : "Next circle"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === Question screen (placeholder) ===
  return (
    <div className="grrow-wrap">
      <div className="grrow-stage">
        <h1>{data.circle} Question {step}</h1>
        {/* Put your question UI here */}
        <button onClick={() => setStep(0)}>Finish Circle</button>
      </div>
    </div>
  );
}
