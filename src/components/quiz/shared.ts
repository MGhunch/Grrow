// Quiz Shared Constants
// Single source of truth for modal sizing across all quiz screens

import { COLORS } from "@/lib/colors";
import type { StrengthName, Circle, ScoreState } from '@/lib/types';
import { scoreToState, type ColourFamily } from '@/lib/scoring';

// ── Modal Contract ────────────────────────────────────────────────────
// All quiz modals use these dimensions for consistency

export const MODAL = {
  maxWidth: 540,
  padding: "56px 40px 48px",
  minHeight: 560,
  borderRadius: 20,
};

// ── Circle Display Names ──────────────────────────────────────────────

export const CIRCLE_DISPLAY: Record<Circle, string> = {
  ESSENTIALS: "Essentials",
  EXPLORING: "Exploring",
  INFLUENCING: "Influencing",
  LEADING: "Leading",
};

export const CIRCLE_DESCRIPTION: Record<Circle, string> = {
  ESSENTIALS: "Start strong. Build trust.",
  EXPLORING: "Own it and improve it.",
  INFLUENCING: "Shape it and ship it.",
  LEADING: "Set the standard. Raise the bar.",
};

// ── Family Colours ────────────────────────────────────────────────────

export const FAMILY_ACCENT: Record<ColourFamily, string> = {
  purple: COLORS.purple.hero,
  teal: COLORS.teal.hero,
};

// ── CircleSimple Mapping ──────────────────────────────────────────────
// CircleSimple: ri=0 is Leading (center), ri=3 is Essentials (outer)

export const CIRCLE_TO_RING: Record<Circle, number> = {
  LEADING: 0,
  INFLUENCING: 1,
  EXPLORING: 2,
  ESSENTIALS: 3,
};

// CircleSimple: si=0 Collaboration, si=1 Curiosity, si=2 Critical Thinking, si=3 Communication
export const STRENGTH_TO_SEGMENT: Record<StrengthName, number> = {
  'Collaboration': 0,
  'Curiosity': 1,
  'Critical Thinking': 2,
  'Communication': 3,
};

// ── Score Helpers ─────────────────────────────────────────────────────
// Wraps scoreToState (the canonical state mapper in lib/scoring.ts) and
// pairs the state with a display fill percentage for progress bars.
// Thresholds live in lib/scoring.ts — don't duplicate them here.

const STATE_FILL: Record<ScoreState, number> = {
  "Not yet": 25,
  "Learning": 50,
  "Growing": 75,
  "Nailing it": 100,
};

export function getScoreState(score: number): { label: ScoreState; fill: number } {
  const label = scoreToState(score);
  return { label, fill: STATE_FILL[label] };
}

// ── Unique Key Generator ──────────────────────────────────────────────

export const segKey = (si: number, ri: number) => `${si}-${ri}`;
