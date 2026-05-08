// ═══════════════════════════════════════════════════════════════════════════
// Grrow Feedback — Compose
// ═══════════════════════════════════════════════════════════════════════════
//
// Combines an opener (from context.ts) with a core (from feedback.ts) into
// a renderable blurb. Returns context and body separately so the UI can
// italicise the opener independently.
//
// Position is derived from the user's pattern: how many of their four cards
// share this state. If 4, fires the dedicated position-4 line (with boundary
// override where applicable). Otherwise picks randomly from the rotation pool.
//
// Substitution tokens are resolved at compose time. The Nailing It variant
// that uses <Skillset up> is filtered from the rotation pool when the user
// is in Leading (no skillset above).
// ═══════════════════════════════════════════════════════════════════════════

import type { Circle, ScoreState } from "../types";
import { STRENGTHS } from "../skillsets";
import { ROTATION_POOL, POSITION_4 } from "./context";
import { FEEDBACK } from "./feedback";

// ── Types ────────────────────────────────────────────────────────────────

export interface ComposedFeedback {
  context: string;  // the opener — render in italic
  body: string;     // diagnostic + next move — render plain
}

export interface ComposeArgs {
  circle: Circle;
  skillset: string;
  state: ScoreState;
  /** All four states across the user's cards, in any order. Used to detect position 4. */
  allStates: ScoreState[];
}

// ── Substitution helpers ────────────────────────────────────────────────

const CIRCLE_DISPLAY: Record<Circle, string> = {
  ESSENTIALS: "Essentials",
  EXPLORING: "Exploring",
  INFLUENCING: "Influencing",
  LEADING: "Leading",
};

const CIRCLE_ORDER: Circle[] = ["ESSENTIALS", "EXPLORING", "INFLUENCING", "LEADING"];

function getCircleDown(circle: Circle): Circle | null {
  const i = CIRCLE_ORDER.indexOf(circle);
  return i > 0 ? CIRCLE_ORDER[i - 1] : null;
}

function getCircleUp(circle: Circle): Circle | null {
  const i = CIRCLE_ORDER.indexOf(circle);
  return i >= 0 && i < CIRCLE_ORDER.length - 1 ? CIRCLE_ORDER[i + 1] : null;
}

/** Same strength, one circle higher. Null at Leading. */
function getSkillsetUp(skillset: string, currentCircle: Circle): string | null {
  const circleIdx = CIRCLE_ORDER.indexOf(currentCircle);
  if (circleIdx < 0 || circleIdx === CIRCLE_ORDER.length - 1) return null;

  for (const strength of STRENGTHS) {
    const skIdx = strength.skillsets.findIndex(s => s.name === skillset);
    if (skIdx === circleIdx) {
      return strength.skillsets[circleIdx + 1]?.name ?? null;
    }
  }
  return null;
}

function applySubstitutions(
  text: string,
  circle: Circle,
  skillset: string
): string {
  const circleDown = getCircleDown(circle);
  const circleUp = getCircleUp(circle);
  const skillsetUp = getSkillsetUp(skillset, circle);

  return text
    .replaceAll("(CIRCLE)", CIRCLE_DISPLAY[circle])
    .replaceAll("(CIRCLE DOWN)", circleDown ? CIRCLE_DISPLAY[circleDown] : "")
    .replaceAll("<CIRCLE UP>", circleUp ? CIRCLE_DISPLAY[circleUp] : "")
    .replaceAll("<Skillset up>", skillsetUp ?? "")
    .replaceAll("<Skillset>", skillset);
}

// ── Opener picking ──────────────────────────────────────────────────────

function pickRotationOpener(
  state: ScoreState,
  circle: Circle
): string {
  const pool = ROTATION_POOL[state];

  // At Leading, filter out any opener that needs <Skillset up> — there's no
  // skillset above. This currently affects Nailing It V2.
  const usable = circle === "LEADING"
    ? pool.filter(line => !line.includes("<Skillset up>"))
    : pool;

  return usable[Math.floor(Math.random() * usable.length)];
}

function pickPosition4Opener(
  state: ScoreState,
  circle: Circle
): string {
  const spec = POSITION_4[state];

  if (spec.kind === "single") {
    return spec.line;
  }

  // Boundary case
  return circle === spec.boundary ? spec.line : spec.otherLine;
}

// ── Public API ──────────────────────────────────────────────────────────

export function composeFeedback(args: ComposeArgs): ComposedFeedback {
  const { circle, skillset, state, allStates } = args;

  const matchCount = allStates.filter(s => s === state).length;
  const isPosition4 = matchCount === 4;

  const rawOpener = isPosition4
    ? pickPosition4Opener(state, circle)
    : pickRotationOpener(state, circle);

  const context = applySubstitutions(rawOpener, circle, skillset);

  const fb = FEEDBACK[skillset]?.[state];
  const body = fb ? `${fb.diagnostic} ${fb.nextMove}` : "";

  return { context, body };
}
