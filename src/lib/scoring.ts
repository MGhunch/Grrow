// ═══════════════════════════════════════════════════════════════════════════
// SCORING — Quiz Input, Score Calculation, Response States
// ═══════════════════════════════════════════════════════════════════════════

import { COLORS } from "./colors";
import type { ScoreState } from "./types";

// ── Quiz Input Type ───────────────────────────────────────────────────────

export type QuizInput = "not_really" | "sometimes" | "mostly" | "intuitively";
export type ColourFamily = "purple" | "teal";

// ── Quiz Options ──────────────────────────────────────────────────────────
// Canonical definition — used for rendering quiz inputs and mapping to scores.

export const QUIZ_OPTIONS = [
  { value: "not_really"  as const, label: "Not really",  score: 0,   fill: 10,  tooltip: "New territory for you." },
  { value: "sometimes"   as const, label: "Sometimes",   score: 33,  fill: 40,  tooltip: "You get it, but need a nudge." },
  { value: "mostly"      as const, label: "Mostly",      score: 66,  fill: 70,  tooltip: "You do it when you think of it." },
  { value: "intuitively" as const, label: "Intuitively", score: 100, fill: 100, tooltip: "You do it without thinking." },
] as const;

// ── Score States ──────────────────────────────────────────────────────────

export const SCORE_STATES: ScoreState[] = [
  "Not yet", "Learning", "Growing", "Nailing it",
];

// ── Score → State Mapping ─────────────────────────────────────────────────
// Thresholds derived from rank-sum logic on three answers scored 1-4
// (Not really=1, Sometimes=2, Mostly=3, Intuitively=4).
// Sum 3-4 → Not yet · 5-7 → Learning · 8-10 → Growing · 11-12 → Nailing it.
// Equivalent on the 0-100 average scale: ≤11 / 12-54 / 55-88 / 89+.
// Boundaries sit in the gaps between achievable averages, so every result
// lands cleanly in one band. To reach Nailing it, you need at least two
// "Intuitively" answers — one peak isn't enough. Mirror at the bottom:
// to stay in Not yet, you need at least two "Not really" answers.

export function scoreToState(score: number): ScoreState {
  if (score <= 11) return "Not yet";
  if (score <= 54) return "Learning";
  if (score <= 88) return "Growing";
  return "Nailing it";
}

// ── Score Colours by Family ───────────────────────────────────────────────
// teal   = Collaboration + Communication
// purple = Curiosity + Critical Thinking

export const SCORE_COLORS: Record<ColourFamily, Record<ScoreState, string>> = {
  teal: {
    "Not yet":    COLORS.teal.notYet,
    "Learning":   COLORS.teal.learning,
    "Growing":    COLORS.teal.growing,
    "Nailing it": COLORS.teal.hero,
  },
  purple: {
    "Not yet":    COLORS.purple.notYet,
    "Learning":   COLORS.purple.learning,
    "Growing":    COLORS.purple.growing,
    "Nailing it": COLORS.purple.hero,
  },
};

// ── Quiz Input → Score ────────────────────────────────────────────────────

const INPUT_TO_SCORE: Record<QuizInput, number> = {
  not_really: 0,
  sometimes: 33,
  mostly: 66,
  intuitively: 100,
};

export function inputToScore(input: QuizInput): number {
  return INPUT_TO_SCORE[input];
}

// ── Calculate Skillset Score ──────────────────────────────────────────────
// Average of 3 question scores

export function calculateSkillsetScore(answers: QuizInput[]): number {
  if (answers.length === 0) return 0;
  const total = answers.reduce((sum, answer) => sum + inputToScore(answer), 0);
  return Math.round(total / answers.length);
}
