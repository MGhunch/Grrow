import { COLORS } from "@/lib/colors";

interface IconProps {
  size?: number;
}

// ── Take the Quiz (Grrow circles) ─────────────────────────────────────
export function IconTakeQuiz({ size = 64 }: IconProps) {
  const scale = size / 64;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="64"
        height="64"
        rx="14"
        fill={COLORS.teal.hero}
        fillOpacity="0.1"
      />
      <g transform="translate(32, 32)">
        <circle cx="0" cy="0" r="22" fill="none" stroke={COLORS.teal.hero} strokeWidth="1.75" />
        <circle cx="0" cy="0" r="14" fill="none" stroke={COLORS.teal.hero} strokeWidth="1.75" />
        <circle cx="0" cy="0" r="6" fill="none" stroke={COLORS.purple.hero} strokeWidth="1.75" />
        <circle cx="0" cy="0" r="2" fill={COLORS.purple.hero} />
        <line x1="-22" y1="0" x2="22" y2="0" stroke={COLORS.teal.hero} strokeWidth="1" opacity="0.35" />
        <line x1="0" y1="-22" x2="0" y2="22" stroke={COLORS.teal.hero} strokeWidth="1" opacity="0.35" />
      </g>
    </svg>
  );
}

// ── Next Check-in (Calendar + month) ──────────────────────────────────
export function IconNextCheckin({ size = 64 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="64"
        height="64"
        rx="14"
        fill={COLORS.teal.hero}
        fillOpacity="0.1"
      />
      <g transform="translate(16, 14)">
        {/* Calendar body */}
        <path
          d="M4 10 L4 30 Q4 34 8 34 L28 34 Q32 34 32 30 L32 10 Q32 6 28 6 L8 6 Q4 6 4 10 Z"
          fill="none"
          stroke={COLORS.teal.hero}
          strokeWidth="1.75"
        />
        <line x1="4" y1="14" x2="32" y2="14" stroke={COLORS.teal.hero} strokeWidth="1.75" />
        {/* Hangers */}
        <line x1="12" y1="2" x2="12" y2="9" stroke={COLORS.purple.hero} strokeWidth="2.25" strokeLinecap="round" />
        <line x1="24" y1="2" x2="24" y2="9" stroke={COLORS.purple.hero} strokeWidth="2.25" strokeLinecap="round" />
        {/* Month text */}
        <text
          x="18"
          y="27"
          textAnchor="middle"
          fill={COLORS.purple.hero}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="10"
          fontWeight="700"
        >
          MAY
        </text>
      </g>
    </svg>
  );
}

// ── Check-in Due (Calendar + purple badge) ────────────────────────────
export function IconCheckinDue({ size = 64 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="64"
        height="64"
        rx="14"
        fill={COLORS.teal.hero}
        fillOpacity="0.1"
      />
      <g transform="translate(16, 14)">
        {/* Calendar body */}
        <path
          d="M4 10 L4 30 Q4 34 8 34 L28 34 Q32 34 32 30 L32 10 Q32 6 28 6 L8 6 Q4 6 4 10 Z"
          fill="none"
          stroke={COLORS.teal.hero}
          strokeWidth="1.75"
        />
        <line x1="4" y1="14" x2="32" y2="14" stroke={COLORS.teal.hero} strokeWidth="1.75" />
        {/* Hangers */}
        <line x1="12" y1="2" x2="12" y2="9" stroke={COLORS.purple.hero} strokeWidth="2.25" strokeLinecap="round" />
        <line x1="24" y1="2" x2="24" y2="9" stroke={COLORS.purple.hero} strokeWidth="2.25" strokeLinecap="round" />
        {/* Alert badge - purple */}
        <circle cx="18" cy="25" r="8" fill={COLORS.purple.hero} />
        <line x1="18" y1="20" x2="18" y2="25" stroke="#fff" strokeWidth="2.25" strokeLinecap="round" />
        <circle cx="18" cy="29" r="1.25" fill="#fff" />
      </g>
    </svg>
  );
}

// ── Check-in Overdue (Calendar + orange badge) ────────────────────────
// Amber colour for warning state
const AMBER = "#EF9F27";

export function IconCheckinOverdue({ size = 64 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="64"
        height="64"
        rx="14"
        fill={COLORS.teal.hero}
        fillOpacity="0.1"
      />
      <g transform="translate(16, 14)">
        {/* Calendar body - stays teal */}
        <path
          d="M4 10 L4 30 Q4 34 8 34 L28 34 Q32 34 32 30 L32 10 Q32 6 28 6 L8 6 Q4 6 4 10 Z"
          fill="none"
          stroke={COLORS.teal.hero}
          strokeWidth="1.75"
        />
        <line x1="4" y1="14" x2="32" y2="14" stroke={COLORS.teal.hero} strokeWidth="1.75" />
        {/* Hangers - stays purple */}
        <line x1="12" y1="2" x2="12" y2="9" stroke={COLORS.purple.hero} strokeWidth="2.25" strokeLinecap="round" />
        <line x1="24" y1="2" x2="24" y2="9" stroke={COLORS.purple.hero} strokeWidth="2.25" strokeLinecap="round" />
        {/* Alert badge - ORANGE for overdue */}
        <circle cx="18" cy="25" r="8" fill={AMBER} />
        <line x1="18" y1="20" x2="18" y2="25" stroke="#fff" strokeWidth="2.25" strokeLinecap="round" />
        <circle cx="18" cy="29" r="1.25" fill="#fff" />
      </g>
    </svg>
  );
}

// ── Quiz to Review (Clipboard + checkmark) ────────────────────────────
export function IconQuizReview({ size = 64 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="64"
        height="64"
        rx="14"
        fill={COLORS.purple.hero}
        fillOpacity="0.1"
      />
      <g transform="translate(16, 12)">
        {/* Clipboard body */}
        <path
          d="M4 12 L4 38 Q4 42 8 42 L28 42 Q32 42 32 38 L32 12 Q32 8 28 8 L8 8 Q4 8 4 12 Z"
          fill="none"
          stroke={COLORS.purple.hero}
          strokeWidth="1.75"
        />
        {/* Clip top */}
        <path
          d="M12 4 L24 4 Q26 4 26 6 L26 10 L10 10 L10 6 Q10 4 12 4 Z"
          fill="none"
          stroke={COLORS.purple.hero}
          strokeWidth="1.75"
        />
        {/* Checkmark - teal */}
        <polyline
          points="12,26 16,30 26,20"
          fill="none"
          stroke={COLORS.teal.hero}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

// ── Notes to File (Card + upload badge) ───────────────────────────────
export function IconNotesFile({ size = 64 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="64"
        height="64"
        rx="14"
        fill={COLORS.purple.hero}
        fillOpacity="0.1"
      />
      <g transform="translate(10, 12)">
        {/* Note card */}
        <path
          d="M4 6 L4 38 Q4 42 8 42 L30 42 Q34 42 34 38 L34 6 Q34 2 30 2 L8 2 Q4 2 4 6 Z"
          fill="none"
          stroke={COLORS.purple.hero}
          strokeWidth="1.75"
        />
        {/* Lines inside */}
        <line x1="10" y1="12" x2="28" y2="12" stroke={COLORS.purple.hero} strokeWidth="1.75" strokeLinecap="round" />
        <line x1="10" y1="20" x2="24" y2="20" stroke={COLORS.purple.hero} strokeWidth="1.75" strokeLinecap="round" />
        <line x1="10" y1="28" x2="20" y2="28" stroke={COLORS.purple.hero} strokeWidth="1.75" strokeLinecap="round" />
        {/* Upload badge - teal */}
        <circle cx="34" cy="28" r="11" fill={COLORS.teal.hero} />
        <line x1="34" y1="33" x2="34" y2="24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        <polyline
          points="29,28 34,23 39,28"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
