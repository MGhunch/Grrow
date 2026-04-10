// ═══════════════════════════════════════════════════════════════════════════
// Report Types — extends @/lib/types
// ═══════════════════════════════════════════════════════════════════════════

import type { StrengthFamily, CircleName, KfgCategory } from "@/lib/types";

export type VarianceLevel = "mixed" | "split" | null;

export interface ReportQuestion {
  id: string;
  title: string;       // Short label for display
  text: string;        // Full question text
  score: number;       // Learner's answer (0, 33, 66, or 100)
  leaderScore: number; // Leader's answer (0, 33, 66, or 100)
}

export interface ReportSkillset {
  id: string;
  name: string;
  strength: string;
  family: StrengthFamily;
  objective: string;
  questions: ReportQuestion[];
  kfg?: KfgCategory;
  leaderNote?: string | null;
}

export interface GrowTarget {
  name: string;
  strength: string;
  circle: CircleName;
  objective: string;
}

export interface SnapshotData {
  learner: string;
  leader: string;
  circle: CircleName;
  date: string;
  skillsets: ReportSkillset[];
  growTarget: GrowTarget;
}

// ═══════════════════════════════════════════════════════════════════════════
// Circle Descriptions
// ═══════════════════════════════════════════════════════════════════════════

export const CIRCLE_DESCRIPTIONS: Record<CircleName, string> = {
  ESSENTIALS: "You're working to build trust by showing up reliably and asking good questions up front.",
  EXPLORING: "Now you need to own the work and actively make it better. Your goal? A safe pair of hands.",
  INFLUENCING: "Delivery is second nature. Now you're bringing others with you and shaping things together.",
  LEADING: "Less about doing and all about opening doors and creating conditions for others to succeed.",
};

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

export function avgScore(questions: ReportQuestion[], useLeader = false): number {
  const sum = questions.reduce((acc, q) => acc + (useLeader ? q.leaderScore : q.score), 0);
  return Math.round(sum / questions.length);
}

export function getVariance(questions: ReportQuestion[]): VarianceLevel {
  // Variance between learner and leader scores
  let maxGap = 0;
  for (const q of questions) {
    const gap = Math.abs(q.score - q.leaderScore) / 33;
    if (gap > maxGap) maxGap = gap;
  }
  if (maxGap >= 3) return "split";
  if (maxGap >= 2) return "mixed";
  return null;
}

export function getFamily(strength: string): StrengthFamily {
  return strength === "Curiosity" || strength === "Critical Thinking" ? "purple" : "teal";
}
