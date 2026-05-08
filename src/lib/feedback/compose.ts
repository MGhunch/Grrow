// ═══════════════════════════════════════════════════════════════════════════
// Grrow Feedback — Compose
// ═══════════════════════════════════════════════════════════════════════════
//
// Combines openers (from context.ts) with cores (from feedback.ts) into the
// four blurbs that render on the results screen. Returns context and body
// separately so the UI can render them however it likes.
//
// Picks are sampled without replacement within each state group, so two
// cards at the same state never share an opener. Pools are large enough
// that this always succeeds.
//
// At Leading, the variant that uses <Skillset up> is filtered out — there's
// no skillset above. Pool sizes are set so 4 unique picks remain available
// even with that filter applied.
// ═══════════════════════════════════════════════════════════════════════════

import type { Circle, ScoreState } from "../types";
import { STRENGTHS } from "../skillsets";
import { ROTATION_POOL } from "./context";
import { FEEDBACK } from "./feedback";

// ── Types ────────────────────────────────────────────────────────────────

export interface ComposedFeedback {
  context: string;
  body: string;
}

export interface ComposeAllArgs {
  circle: Circle;
  cards: Array<{ skillset: string; state: ScoreState }>;
}

// ── Substitution helpers ────────────────────────────────────────────────

const CIRCLE_ORDER: Circle[] = ["ESSENTIALS", "EXPLORING", "INFLUENCING", "LEADING"];

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
  const skillsetUp = getSkillsetUp(skillset, circle);
  return text
    .replaceAll("<Skillset up>", skillsetUp ?? "")
    .replaceAll("<Skillset>", skillset);
}

// ── Sampling ────────────────────────────────────────────────────────────

/** Fisher-Yates shuffle, in-place. Returns the same array for chaining. */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Pool for a state, with the <Skillset up> variant filtered out at Leading. */
function getUsablePool(state: ScoreState, circle: Circle): string[] {
  const pool = ROTATION_POOL[state];
  return circle === "LEADING"
    ? pool.filter(line => !line.includes("<Skillset up>"))
    : pool;
}

// ── Public API ──────────────────────────────────────────────────────────

/**
 * Composes all blurbs for the four results cards in one pass.
 * Cards sharing a state get unique openers (sampled without replacement);
 * cards at different states pick independently.
 */
export function composeAllFeedback({ circle, cards }: ComposeAllArgs): ComposedFeedback[] {
  // Group card indices by state
  const groups = new Map<ScoreState, number[]>();
  cards.forEach((c, i) => {
    const arr = groups.get(c.state) ?? [];
    arr.push(i);
    groups.set(c.state, arr);
  });

  // Pick a raw opener for each card — unique within each state group
  const rawOpeners: string[] = new Array(cards.length);

  for (const [state, indices] of groups) {
    const pool = getUsablePool(state, circle);
    const shuffled = shuffle([...pool]);

    indices.forEach((cardIdx, i) => {
      // Modulo guards against an unexpectedly small pool — pools are sized
      // so this never wraps in practice.
      rawOpeners[cardIdx] = shuffled[i % shuffled.length];
    });
  }

  // Apply substitutions and assemble bodies
  return cards.map((card, i) => {
    const context = applySubstitutions(rawOpeners[i], circle, card.skillset);
    const fb = FEEDBACK[card.skillset]?.[card.state];
    const body = fb ? `${fb.diagnostic} ${fb.nextMove}` : "";
    return { context, body };
  });
}
