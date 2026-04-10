import { Sparkles, Network, Waves, GitBranch } from "lucide-react";
import type { Strength, Ring, Circle, StrengthName } from "./types";

// ── Strengths ─────────────────────────────────────────────────────────
// Skillset names locked March 2026:
// Curiosity:         Question → Challenge → Create → Cultivate
// Critical Thinking: Clarify → Simplify → Solve → Innovate
// Communication:     Update → Navigate → Persuade → Guide
// Collaboration:     Engage → Connect → Unlock → Inspire

export const STRENGTHS: Strength[] = [
  {
    name: "Curiosity",
    family: "purple",
    icon: Sparkles,
    start: 0,
    labelReversed: false,
    skillsets: [
      { name: "Question",  objective: "Do you stay curious about people and ideas beyond your immediate work?" },
      { name: "Challenge", objective: "Do you question how things are done and seek ways to make them better?" },
      { name: "Create",    objective: "Do you identify ideas with potential and fight for the ones that are worth it?" },
      { name: "Cultivate", objective: "Do you foster curiosity and champion the creativity it sparks?" },
    ],
  },
  {
    name: "Critical Thinking",
    family: "purple",
    icon: GitBranch,
    start: 90,
    labelReversed: true,
    skillsets: [
      { name: "Clarify",  objective: "Do you take time to clarify the ask and summarise the job before starting?" },
      { name: "Simplify", objective: "Do you focus on what matters most and learn from what's worked before?" },
      { name: "Solve",    objective: "Do you diagnose root causes, identify blockers, and seek better solutions?" },
      { name: "Innovate", objective: "Do you spot industry innovations, evaluate new ideas, and drive their adoption?" },
    ],
  },
  {
    name: "Communication",
    family: "teal",
    icon: Waves,
    start: 180,
    labelReversed: true,
    skillsets: [
      { name: "Update",   objective: "Do you respond promptly, share clear updates, and flag changes that impact others?" },
      { name: "Navigate", objective: "Do you read the room, anticipate needs, and keep the right people informed?" },
      { name: "Persuade", objective: "Do you frame your thinking and adapt your style so your ideas land with different people?" },
      { name: "Guide",    objective: "Do you set clear goals, assess progress fairly, and empower your teams to thrive?" },
    ],
  },
  {
    name: "Collaboration",
    family: "teal",
    icon: Network,
    start: 270,
    labelReversed: false,
    skillsets: [
      { name: "Engage",  objective: "Do you consistently deliver and learn from feedback to be seen as a safe pair of hands?" },
      { name: "Connect", objective: "Do you anticipate others' needs, juggle competing views, and reduce friction?" },
      { name: "Unlock",  objective: "Do you remove barriers and create clarity so others can succeed?" },
      { name: "Inspire", objective: "Do you lead with energy, coach consistently, and inspire your teams to succeed?" },
    ],
  },
];

// ── Rings ─────────────────────────────────────────────────────────────

export const RINGS: Ring[] = [
  { name: "ESSENTIALS",  innerR: 58,  outerR: 98  },
  { name: "EXPLORING",   innerR: 98,  outerR: 138 },
  { name: "INFLUENCING", innerR: 138, outerR: 178 },
  { name: "LEADING",     innerR: 178, outerR: 218 },
];

// ── Circle Display ───────────────────────────────────────────────────
// Maps Circle enum to display name and tagline

export const CIRCLE_DISPLAY: Record<Circle, string> = {
  ESSENTIALS:  "Essentials",
  EXPLORING:   "Exploring",
  INFLUENCING: "Influencing",
  LEADING:     "Leading",
};

export const CIRCLE_TAGLINE: Record<Circle, string> = {
  ESSENTIALS:  "Start strong. Build trust.",
  EXPLORING:   "Own it and improve it.",
  INFLUENCING: "Shape it and ship it.",
  LEADING:     "Set the standard. Raise the bar.",
};

// ── Ring Stages (dashboard copy) ─────────────────────────────────────
// Personalised labels for dashboard: "You're starting out" for Essentials

export const RING_STAGES = [
  { label: "You're starting out", tagline: "Start strong. Build trust" },
  { label: "You're Exploring",    tagline: "Own it and improve it" },
  { label: "You're Influencing",  tagline: "Shape it and ship it" },
  { label: "You're Leading",      tagline: "Set the standard. Raise the bar" },
];

// ── Strength Taglines ────────────────────────────────────────────────

export const STRENGTH_TAGLINES: Record<string, string> = {
  "Curiosity": "Make it better",
  "Collaboration": "Make it happen",
  "Communication": "Make it clear",
  "Critical Thinking": "Make it work",
};

// ── Circle/Segment Mappings ──────────────────────────────────────────
// For CircleSimple SVG rendering

// Circle to ring index: ri=0 is Leading (center), ri=3 is Essentials (outer)
export const CIRCLE_TO_RING: Record<Circle, number> = {
  LEADING:     0,
  INFLUENCING: 1,
  EXPLORING:   2,
  ESSENTIALS:  3,
};

// Strength to segment index: quadrant position in circle
export const STRENGTH_TO_SEGMENT: Record<StrengthName, number> = {
  "Collaboration":     0,
  "Curiosity":         1,
  "Critical Thinking": 2,
  "Communication":     3,
};

// Generate unique key for circle segment
export const segKey = (si: number, ri: number): string => `${si}-${ri}`;

// ── Helpers ───────────────────────────────────────────────────────────

export function getStrengthByName(name: string) {
  return STRENGTHS.find(s => s.name === name);
}

export function getObjective(skillsetName: string): string {
  for (const s of STRENGTHS) {
    const sk = s.skillsets.find(sk => sk.name === skillsetName);
    if (sk) return sk.objective;
  }
  return "";
}

export function getRingDisplayName(ringIndex: number): string {
  // Returns sentence case for UI display
  const name = RINGS[ringIndex]?.name ?? "";
  return name.charAt(0) + name.slice(1).toLowerCase();
}

export function getCircleDisplayName(circle: Circle): string {
  return CIRCLE_DISPLAY[circle];
}
