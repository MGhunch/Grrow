import { COLORS } from "./colors";

// ── Grrow Circle Icon ─────────────────────────────────────────────────
// Four concentric rings + quadrant cross. Mirrors the circle UI.
// Filled rings = solid, unfilled = ghost.
// Rings map to progression: Essentials → Exploring → Influencing → Leading.
//
// Usage:
//   <GrrowIcon filled={2} size={40} />
//   <GrrowIconExploring size={40} />
//   On dark bg: <GrrowIcon filled={2} size={40} darkBg />

const RINGS   = [6, 12, 18, 24];   // ring radii — tighter void
const STROKE  = 4.5;               // ring stroke weight
const VIEWBOX = 60;                 // SVG viewBox size
const CX      = VIEWBOX / 2;
const CY      = VIEWBOX / 2;
const INNER_R = RINGS[0] - STROKE / 2;
const OUTER_R = RINGS[RINGS.length - 1] + STROKE / 2;

// Cross lines run only between inner and outer ring edges
const CROSS_LINES = [
  { x1: CX,          y1: CY - OUTER_R, x2: CX,          y2: CY - INNER_R },
  { x1: CX,          y1: CY + INNER_R, x2: CX,          y2: CY + OUTER_R },
  { x1: CX - OUTER_R, y1: CY,          x2: CX - INNER_R, y2: CY          },
  { x1: CX + INNER_R, y1: CY,          x2: CX + OUTER_R, y2: CY          },
];

interface GrrowIconProps {
  filled?:  number;   // 0–4, default 4
  size?:    number;   // px height (width scales proportionally), default 40
  darkBg?:  boolean;  // true = teal solid + white cross on dark background
}

export function GrrowIcon({
  filled = 4,
  size   = 40,
  darkBg = false,
}: GrrowIconProps) {
  const solid = darkBg ? COLORS.teal.hero : COLORS.purple.hero;
  const ghost = darkBg ? "rgba(76,63,160,0.30)" : "rgba(76,63,160,0.22)";
  const cross = darkBg ? "#FFFFFF" : COLORS.purple.hero;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      aria-hidden="true"
    >
      {RINGS.map((r, i) => (
        <circle
          key={i}
          cx={CX} cy={CY} r={r}
          fill="none"
          stroke={i < filled ? solid : ghost}
          strokeWidth={STROKE}
        />
      ))}
      {CROSS_LINES.map((l, i) => (
        <line
          key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={cross}
          strokeWidth={1.0}
          strokeOpacity={0.45}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export default GrrowIcon;

// Convenience exports — one per ring level
export const GrrowIconEssentials  = (p: Omit<GrrowIconProps, "filled">) => <GrrowIcon {...p} filled={1} />;
export const GrrowIconExploring   = (p: Omit<GrrowIconProps, "filled">) => <GrrowIcon {...p} filled={2} />;
export const GrrowIconInfluencing = (p: Omit<GrrowIconProps, "filled">) => <GrrowIcon {...p} filled={3} />;
export const GrrowIconLeading     = (p: Omit<GrrowIconProps, "filled">) => <GrrowIcon {...p} filled={4} />;
