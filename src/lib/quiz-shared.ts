// ═══════════════════════════════════════════════════════════════════════════
// QUIZ SHARED — Constants shared across quiz components
// ═══════════════════════════════════════════════════════════════════════════

import { Sparkles, Network, Waves, GitBranch } from "lucide-react";
import type { Circle, StrengthName } from "@/lib/types";

// ── Modal Contract ────────────────────────────────────────────────────────
// Shared dimensions for quiz modals

export const MODAL = {
  maxWidth: 540,
  padding: "48px 40px 40px",
  minHeight: 560,
} as const;

// ── Circle Display Names ──────────────────────────────────────────────────

export const CIRCLE_DISPLAY: Record<Circle, string> = {
  ESSENTIALS:  "Essentials",
  EXPLORING:   "Exploring",
  INFLUENCING: "Influencing",
  LEADING:     "Leading",
};

// ── Circle Descriptions ───────────────────────────────────────────────────

export const CIRCLE_DESCRIPTION: Record<Circle, string> = {
  ESSENTIALS:  "Start strong. Build trust.",
  EXPLORING:   "Own it and improve it.",
  INFLUENCING: "Shape it and ship it.",
  LEADING:     "Set the standard. Raise the bar.",
};

// ── Circle to Ring Index ──────────────────────────────────────────────────
// For CircleSimple: ri=0 is Leading (center), ri=3 is Essentials (outer)

export const CIRCLE_TO_RING: Record<Circle, number> = {
  LEADING:     0,
  INFLUENCING: 1,
  EXPLORING:   2,
  ESSENTIALS:  3,
};

// ── Strength to Segment Index ─────────────────────────────────────────────
// For CircleSimple quadrant mapping

export const STRENGTH_TO_SEGMENT: Record<StrengthName, number> = {
  "Collaboration":     0,
  "Curiosity":         1,
  "Critical Thinking": 2,
  "Communication":     3,
};

// ── Strength Icon Components ──────────────────────────────────────────────
// The icon component for each strength (size/weight applied at usage)

export const STRENGTH_ICON = {
  "Curiosity":         Sparkles,
  "Collaboration":     Network,
  "Communication":     Waves,
  "Critical Thinking": GitBranch,
} as const;

// ── Segment Key Helper ────────────────────────────────────────────────────
// Generate unique key for circle segment (strength index, ring index)

export const segKey = (si: number, ri: number): string => `${si}-${ri}`;
