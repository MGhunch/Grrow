"use client";

// ── Dashboard Icons ───────────────────────────────────────────────────
// Clean SVG icons for dashboard use.
// Design: White primary strokes, teal accents, no background.
// Container handles the circle background (purple-hero).
// ──────────────────────────────────────────────────────────────────────

interface IconProps {
  size?: number;
}

// ── Checkin Due ───────────────────────────────────────────────────────
// Calendar with alert badge

export function IconCheckinDue({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Calendar body */}
      <path 
        d="M4 9 L4 26 Q4 28 6 28 L26 28 Q28 28 28 26 L28 9 Q28 7 26 7 L6 7 Q4 7 4 9 Z" 
        fill="none" 
        stroke="white" 
        strokeWidth="1.75"
      />
      <line x1="4" y1="12" x2="28" y2="12" stroke="white" strokeWidth="1.75" />
      {/* Hangers */}
      <line x1="10" y1="4" x2="10" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="4" x2="22" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Alert badge - teal accent */}
      <circle cx="16" cy="20" r="5" fill="#18B99A" />
      <line x1="16" y1="17" x2="16" y2="20" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="16" cy="22.5" r="1" fill="white" />
    </svg>
  );
}

// ── Checkin Overdue ───────────────────────────────────────────────────
// Calendar with warning badge (orange for now)

export function IconCheckinOverdue({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Calendar body */}
      <path 
        d="M4 9 L4 26 Q4 28 6 28 L26 28 Q28 28 28 26 L28 9 Q28 7 26 7 L6 7 Q4 7 4 9 Z" 
        fill="none" 
        stroke="white" 
        strokeWidth="1.75"
      />
      <line x1="4" y1="12" x2="28" y2="12" stroke="white" strokeWidth="1.75" />
      {/* Hangers */}
      <line x1="10" y1="4" x2="10" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="4" x2="22" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Warning badge - orange (amber TBD) */}
      <circle cx="16" cy="20" r="5" fill="#EF9F27" />
      <line x1="16" y1="17" x2="16" y2="20" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="16" cy="22.5" r="1" fill="white" />
    </svg>
  );
}

// ── Quiz Review ───────────────────────────────────────────────────────
// Clipboard with checkmark

export function IconQuizReview({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Clipboard body */}
      <path 
        d="M6 8 L6 28 Q6 30 8 30 L24 30 Q26 30 26 28 L26 8 Q26 6 24 6 L8 6 Q6 6 6 8 Z" 
        fill="none" 
        stroke="white" 
        strokeWidth="1.75"
      />
      {/* Clip top */}
      <path 
        d="M11 3 L21 3 Q22 3 22 4 L22 7 L10 7 L10 4 Q10 3 11 3 Z" 
        fill="none" 
        stroke="white" 
        strokeWidth="1.75"
      />
      {/* Checkmark - teal accent */}
      <polyline 
        points="11,18 14,21 21,14" 
        fill="none" 
        stroke="#18B99A" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Next Checkin ──────────────────────────────────────────────────────
// Calendar with date indicator

export function IconNextCheckin({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Calendar body */}
      <path 
        d="M4 9 L4 26 Q4 28 6 28 L26 28 Q28 28 28 26 L28 9 Q28 7 26 7 L6 7 Q4 7 4 9 Z" 
        fill="none" 
        stroke="white" 
        strokeWidth="1.75"
      />
      <line x1="4" y1="12" x2="28" y2="12" stroke="white" strokeWidth="1.75" />
      {/* Hangers */}
      <line x1="10" y1="4" x2="10" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="4" x2="22" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Date dot - teal accent */}
      <circle cx="16" cy="20" r="4" fill="#18B99A" />
    </svg>
  );
}

// ── Notes File ────────────────────────────────────────────────────────
// Document with lines

export function IconNotesFile({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Document body */}
      <path 
        d="M6 4 L6 28 Q6 30 8 30 L24 30 Q26 30 26 28 L26 4 Q26 2 24 2 L8 2 Q6 2 6 4 Z" 
        fill="none" 
        stroke="white" 
        strokeWidth="1.75"
      />
      {/* Lines */}
      <line x1="10" y1="10" x2="22" y2="10" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="10" y1="16" x2="20" y2="16" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="10" y1="22" x2="17" y2="22" stroke="#18B99A" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

// ── Take Quiz ─────────────────────────────────────────────────────────
// Concentric circles (Grrow-style)

export function IconTakeQuiz({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Outer ring */}
      <circle cx="16" cy="16" r="13" fill="none" stroke="white" strokeWidth="1.75" />
      {/* Middle ring */}
      <circle cx="16" cy="16" r="8" fill="none" stroke="white" strokeWidth="1.75" />
      {/* Inner ring - teal accent */}
      <circle cx="16" cy="16" r="3.5" fill="none" stroke="#18B99A" strokeWidth="1.75" />
      {/* Center dot */}
      <circle cx="16" cy="16" r="1.5" fill="#18B99A" />
    </svg>
  );
}
