// ═══════════════════════════════════════════════════════════════════════════
// Grrow Type Definitions
// ═══════════════════════════════════════════════════════════════════════════

// ── Base Types ────────────────────────────────────────────────────────────

export type Circle = "ESSENTIALS" | "EXPLORING" | "INFLUENCING" | "LEADING";
export type CircleName = Circle;
export type StrengthName = "Curiosity" | "Collaboration" | "Communication" | "Critical Thinking";
export type StrengthFamily = "purple" | "teal";
export type KfgCategory = "keep" | "focus" | "grow";
export type ScoreState = "Not yet" | "Learning" | "Growing" | "Nailing it";

// ── Circle Component Types ────────────────────────────────────────────────

export type ScoreMap = Record<string, ScoreState>;
export type KfgMap = Record<string, KfgCategory>;

// ═══════════════════════════════════════════════════════════════════════════
// Report Types
// ═══════════════════════════════════════════════════════════════════════════

export type VarianceLevel = "mixed" | "split" | null;

export interface ReportQuestion {
  id: string;
  title: string;       // Short label for display
  text: string;        // Full question text
  score: number;
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
  circle: CircleName;
  date: string;
  skillsets: ReportSkillset[];
  growTarget: GrowTarget;
}

// ═══════════════════════════════════════════════════════════════════════════
// Circle Descriptions — TODO: Move to RING_STAGES in skillsets.ts
// ═══════════════════════════════════════════════════════════════════════════

export const CIRCLE_DESCRIPTIONS: Record<CircleName, string> = {
  ESSENTIALS: "Right now, you're working to build trust by showing up reliably and asking good questions up front.",
  EXPLORING: "Right now, you're owning the work and actively making it better. Your goal? A safe pair of hands.",
  INFLUENCING: "Right now, delivery is second nature. You're bringing others with you and shaping things together.",
  LEADING: "Right now, it's less about doing and all about opening doors for others to succeed.",
};

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

export function avgScore(questions: ReportQuestion[]): number {
  const sum = questions.reduce((acc, q) => acc + q.score, 0);
  return Math.round(sum / questions.length);
}

export function getVariance(questions: ReportQuestion[]): VarianceLevel {
  const scores = questions.map((q) => q.score);
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  const gap = (max - min) / 33;
  if (gap >= 3) return "split";
  if (gap >= 2) return "mixed";
  return null;
}

export function getFamily(strength: string): StrengthFamily {
  return strength === "Curiosity" || strength === "Critical Thinking" ? "purple" : "teal";
}
