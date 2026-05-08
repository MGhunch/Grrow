// ═══════════════════════════════════════════════════════════════════════════
// Grrow Feedback — Context (the openers)
// ═══════════════════════════════════════════════════════════════════════════
//
// The opener portion of each feedback blurb. The system rotates randomly
// through 3–4 variants per state. When all four cards on a screen share a
// state, a dedicated position-4 line fires instead — with boundary overrides
// for Essentials+NotYet (no circle below) and Leading+NailingIt (no above).
//
// Substitution tokens used in some lines:
//   (CIRCLE)        — user's current circle, e.g. "Exploring"
//   (CIRCLE DOWN)   — circle below current
//   <CIRCLE UP>     — circle above current
//   <Skillset>      — current skillset name, e.g. "Cultivate"
//   <Skillset up>   — same strength, one circle higher
//
// Substitutions are applied in compose.ts at render time.
// ═══════════════════════════════════════════════════════════════════════════

import type { ScoreState, Circle } from "../types";

// ── Rotation pool — used when count of cards at this state is 1, 2, or 3 ──

export const ROTATION_POOL: Record<ScoreState, string[]> = {
  "Not yet": [
    "Not yet means new territory for you.",
    "So this is a bit brand new for you.",
    "Something new. Let's get into it.",
  ],
  "Learning": [
    "You know how to do this, but still need a nudge on when.",
    "You've got the idea. All you need is practice.",
    "You're on it already. You just need more of it.",
  ],
  "Growing": [
    "You've got this, no worries. How do we make it habit?",
    "You nail it when you think of it. Challenge is making it intuitive.",
    "Doing this is easy. Doing it without thinking… that's next.",
  ],
  "Nailing it": [
    "You and <Skillset> are old friends.",
    "You're nailing this. Have you looked at <Skillset up>?",
    "Now's the time to nudge it a level.",
    "Nailing it is awesome. How do you share it?",
  ],
};

// ── Position 4 — fires when ALL four cards share this state ──────────────

export type Position4Spec =
  | { kind: "single"; line: string }
  | { kind: "boundary"; boundary: Circle; line: string; otherLine: string };

export const POSITION_4: Record<ScoreState, Position4Spec> = {
  "Not yet": {
    kind: "boundary",
    boundary: "ESSENTIALS",
    line: "Looks like everything is new, exciting times. Upwards and upwards from here.",
    otherLine: "It's all a bit new in (CIRCLE). Why not take a look at (CIRCLE DOWN)?",
  },
  "Learning": {
    kind: "single",
    line: "Lots of learning. Stacks of potential. This is when you grow the most.",
  },
  "Growing": {
    kind: "single",
    line: "Look at you, you safe pair of hands. Let's talk next level.",
  },
  "Nailing it": {
    kind: "boundary",
    boundary: "LEADING",
    line: "Nailing it across the board. How do you share your smarts?",
    otherLine: "Nailing it everywhere. Time to step up to <CIRCLE UP>.",
  },
};
