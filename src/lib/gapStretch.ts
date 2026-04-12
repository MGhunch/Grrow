// Gap & Stretch Helpers
// Detect gaps (<51%) and stretches (≥76%), navigate circles, suggest KFG

import type { Circle, StrengthName } from './types';

// ── Circle Navigation ─────────────────────────────────────────────────

const CIRCLE_ORDER: Circle[] = ['ESSENTIALS', 'EXPLORING', 'INFLUENCING', 'LEADING'];

export function getCircleAbove(circle: Circle): Circle | null {
  const index = CIRCLE_ORDER.indexOf(circle);
  if (index === -1 || index === 3) return null; // Already at Leading
  return CIRCLE_ORDER[index + 1];
}

export function getCircleBelow(circle: Circle): Circle | null {
  const index = CIRCLE_ORDER.indexOf(circle);
  if (index === -1 || index === 0) return null; // Already at Essentials
  return CIRCLE_ORDER[index - 1];
}

// ── Gap & Stretch Detection ───────────────────────────────────────────

export type StrengthScores = Record<StrengthName, number>;

export interface GapStretchResult {
  strength: StrengthName;
  score: number;
  targetCircle: Circle;
}

/**
 * Find the gap strength — lowest scoring <51%
 * Returns null if at Essentials (can't go down) or no gaps exist
 */
export function findGapStrength(
  scores: StrengthScores,
  currentCircle: Circle
): GapStretchResult | null {
  const circleBelow = getCircleBelow(currentCircle);
  if (!circleBelow) return null; // At Essentials, can't gap

  // Find all strengths below 51%
  const gaps = (Object.entries(scores) as [StrengthName, number][])
    .filter(([, score]) => score < 51)
    .sort((a, b) => a[1] - b[1]); // Sort ascending (lowest first)

  if (gaps.length === 0) return null;

  const [strength, score] = gaps[0];
  return { strength, score, targetCircle: circleBelow };
}

/**
 * Find the stretch strength — highest scoring ≥76%
 * Returns null if at Leading (can't go up) or no stretches exist
 */
export function findStretchStrength(
  scores: StrengthScores,
  currentCircle: Circle
): GapStretchResult | null {
  const circleAbove = getCircleAbove(currentCircle);
  if (!circleAbove) return null; // At Leading, can't stretch

  // Find all strengths at 76% or above
  const stretches = (Object.entries(scores) as [StrengthName, number][])
    .filter(([, score]) => score >= 76)
    .sort((a, b) => b[1] - a[1]); // Sort descending (highest first)

  if (stretches.length === 0) return null;

  const [strength, score] = stretches[0];
  return { strength, score, targetCircle: circleAbove };
}

// ── KFG Suggestion ────────────────────────────────────────────────────

export interface SkillsetScore {
  skillset: string;
  strength: StrengthName;
  circle: Circle;
  score: number;
}

export interface KFGSuggestion {
  keep: SkillsetScore;
  focus: SkillsetScore;
  grow: SkillsetScore;
}

/**
 * Suggest Keep/Focus/Grow based on all skillset scores
 * - Focus = lowest scoring (rank #4)
 * - Keep = second-highest (rank #2)
 * - Grow = highest scoring (rank #1)
 * 
 * For ties, picks randomly
 */
export function suggestKFG(skillsetScores: SkillsetScore[]): KFGSuggestion | null {
  if (skillsetScores.length < 4) return null;

  // Sort by score descending
  const sorted = [...skillsetScores].sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    // Tie-breaker: random
    return Math.random() - 0.5;
  });

  return {
    grow: sorted[0],  // Highest — ready to stretch
    keep: sorted[1],  // Second-highest — genuine strength
    focus: sorted[sorted.length - 1], // Lowest — needs attention
  };
}

// ── Strength Score Calculator ─────────────────────────────────────────

/**
 * Calculate average score per strength from skillset results
 * Used after base quiz to check for gaps/stretches
 */
export function calculateStrengthScores(
  skillsetScores: SkillsetScore[]
): StrengthScores {
  const strengths: StrengthName[] = [
    'Curiosity',
    'Collaboration', 
    'Communication',
    'Critical Thinking',
  ];

  const result = {} as StrengthScores;

  for (const strength of strengths) {
    const matching = skillsetScores.filter(s => s.strength === strength);
    if (matching.length > 0) {
      const avg = matching.reduce((sum, s) => sum + s.score, 0) / matching.length;
      result[strength] = avg;
    } else {
      result[strength] = 0;
    }
  }

  return result;
}
