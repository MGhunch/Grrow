"use client";

import { IconCheckinDue, IconQuizReview } from "./DashboardIcons";

// ── Types ─────────────────────────────────────────────────────────────

export interface Reminder {
  type: "checkin" | "review";
  count?: number;
}

interface RemindersBarProps {
  reminder: Reminder | null;
}

// ── Number Words ──────────────────────────────────────────────────────

const NUMBER_WORDS: Record<number, string> = {
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
};

function getCountWord(n: number): string {
  return NUMBER_WORDS[n] || String(n);
}

// ── Component ─────────────────────────────────────────────────────────

export default function RemindersBar({ reminder }: RemindersBarProps) {
  if (!reminder) return null;

  const isReview = reminder.type === "review";
  const count = reminder.count || 1;
  const hasMultiple = isReview && count > 1;

  // Copy per type
  const message = isReview
    ? hasMultiple
      ? `${getCountWord(count)} check-ins ready for review.`
      : "Check-in ready for review."
    : "About time for a check in.";

  return (
    <section className="bg-white border-b border-ui-bdr">
      <div className="max-w-container mx-auto px-6 md:px-8 py-4 flex items-center justify-center md:justify-start gap-3">
        {/* Icon */}
        <div className="w-11 h-11 rounded-full bg-purple-hero flex items-center justify-center shrink-0">
          {isReview ? (
            <IconQuizReview size={24} />
          ) : (
            <IconCheckinDue size={24} />
          )}
        </div>
        {/* Message */}
        <span className="text-bold-m md:text-bold-l text-hero-blue">
          {message}
        </span>
      </div>
    </section>
  );
}
