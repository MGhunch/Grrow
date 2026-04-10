"use client";

import { COLORS, whiteAlpha } from "@/lib/colors";
import { SCORE_COLORS } from "@/lib/scoring";
import { segKey } from "@/lib/skillsets";
import type { ScoreState, StrengthFamily } from "@/lib/types";

// ── Types ─────────────────────────────────────────────────────────────

type ScoreMap = Record<string, ScoreState>;

interface Quadrant {
  name: string;
  family: StrengthFamily;
  startDeg: number;
}

interface CircleSimpleProps {
  size?: number;
  dark?: boolean;
  variant?: "default" | "ghost";        // ghost = white on coloured bg
  activeQuadrant?: number | null;       // 0-3: lights up one quadrant with full ramp
  activeRing?: number | null;           // 0-3: lights up one ring across all quadrants
  scores?: ScoreMap | null;             // Score-based fills per segment
  highlight?: { si: number; ri: number } | null;  // Pulse highlight on one segment
  onQuadrantClick?: (index: number) => void;
}

// ── Constants ─────────────────────────────────────────────────────────

const QUADRANTS: Quadrant[] = [
  { name: "Collaboration",     family: "teal",   startDeg: -180 },  // top-left
  { name: "Curiosity",         family: "purple", startDeg: -90  },  // top-right
  { name: "Critical Thinking", family: "purple", startDeg: 0    },  // bottom-right
  { name: "Communication",     family: "teal",   startDeg: 90   },  // bottom-left
];

// Ring radii (normalised to 100-unit viewBox)
// Gap of 2 units between rings in ghost mode
const RINGS = [
  { inner: 0,  outer: 30 },   // Leading (center)
  { inner: 30, outer: 52 },   // Influencing
  { inner: 52, outer: 75 },   // Exploring
  { inner: 75, outer: 100 },  // Essentials (outer)
];

const RINGS_GHOST = [
  { inner: 0,  outer: 28 },   // Leading (center) - 2px gap
  { inner: 30, outer: 50 },   // Influencing - 2px gap
  { inner: 52, outer: 73 },   // Exploring - 2px gap
  { inner: 75, outer: 98 },   // Essentials (outer) - 2px gap
];

// Ramp order: inner ring = hero, outer ring = notYet
const RAMP_KEYS: (keyof typeof COLORS.purple)[] = ["hero", "growing", "learning", "notYet"];

// Shadow config per ring (scaled for CircleSimple size)
const RING_SHADOW = [
  { dy: 8,  blur: 4, opacity: 0.20 },  // Leading (innermost)
  { dy: 6,  blur: 3, opacity: 0.16 },  // Influencing
  { dy: 4,  blur: 2.5, opacity: 0.12 },  // Exploring
  { dy: 2,  blur: 2, opacity: 0.08 },  // Essentials (outermost)
];

// ── Geometry ──────────────────────────────────────────────────────────

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startDeg: number,
  endDeg: number
): string {
  const start1 = polarToCartesian(cx, cy, outerR, startDeg);
  const end1 = polarToCartesian(cx, cy, outerR, endDeg);
  const start2 = polarToCartesian(cx, cy, innerR, endDeg);
  const end2 = polarToCartesian(cx, cy, innerR, startDeg);

  const largeArc = endDeg - startDeg > 180 ? 1 : 0;

  // For innermost ring (pie slice to center)
  if (innerR === 0) {
    return `M ${cx} ${cy} L ${start1.x} ${start1.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${end1.x} ${end1.y} Z`;
  }

  return `M ${start1.x} ${start1.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${end1.x} ${end1.y} L ${start2.x} ${start2.y} A ${innerR} ${innerR} 0 ${largeArc} 0 ${end2.x} ${end2.y} Z`;
}

// Full quadrant path (all rings combined) for click area
function describeQuadrant(cx: number, cy: number, startDeg: number): string {
  const endDeg = startDeg + 90;
  const outerR = 100;
  const start = polarToCartesian(cx, cy, outerR, startDeg);
  const end = polarToCartesian(cx, cy, outerR, endDeg);
  
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${outerR} ${outerR} 0 0 1 ${end.x} ${end.y} Z`;
}

// ── Component ─────────────────────────────────────────────────────────

export default function CircleSimple({
  size = 160,
  dark = false,
  variant = "default",
  activeQuadrant = null,
  activeRing = null,
  scores = null,
  highlight = null,
  onQuadrantClick,
}: CircleSimpleProps) {
  const cx = 100;
  const cy = 100;
  const viewBoxPadding = 10;
  const viewBox = `${-viewBoxPadding} ${-viewBoxPadding} ${200 + viewBoxPadding * 2} ${200 + viewBoxPadding * 2}`;
  
  // Unique ID for this instance's filters
  const filterId = `cs-${Math.random().toString(36).slice(2, 8)}`;
  const shadowColor = dark ? COLORS.ui.black : COLORS.purple.dark;

  const isGhost = variant === "ghost";
  const isClickable = !!onQuadrantClick;

  // Ghost variant colours
  const ghostBase = whiteAlpha(0.18);
  const ghostHighlight = whiteAlpha(0.55);
  const ghostLine = whiteAlpha(0.15);

  // Determine fill for a segment
  function getFill(si: number, ri: number): string {
    // Ghost variant: all segments are faint white, highlight is brighter
    if (isGhost) {
      if (highlight && highlight.si === si && highlight.ri === ri) {
        return ghostHighlight;
      }
      return ghostBase;
    }

    const quad = QUADRANTS[si];
    const family = quad.family;
    const colorSet = family === "purple" ? COLORS.purple : COLORS.teal;

    // Priority 1: Score-based fill (completed skillsets)
    if (scores) {
      const key = segKey(si, ri);
      const state = scores[key];
      if (state) {
        return SCORE_COLORS[family][state];
      }
    }

    // Priority 2: Active ring only — hero colour for that ring
    if (activeRing !== null) {
      if (activeRing === ri) {
        return colorSet.hero;
      }
    }

    // Default: show full ramp (inner = hero, outer = notYet)
    const rampKey = RAMP_KEYS[ri];
    return colorSet[rampKey];
  }

  // Determine opacity for inactive quadrants
  function getOpacity(si: number): number {
    if (isGhost) return 1; // Ghost variant doesn't dim quadrants
    if (activeQuadrant === null) return 1;
    return activeQuadrant === si ? 1 : 0.5;
  }

  // Render a single segment
  const renderSegment = (si: number, ri: number) => {
    const startDeg = QUADRANTS[si].startDeg;
    const endDeg = startDeg + 90;
    const fill = getFill(si, ri);
    const rings = isGhost ? RINGS_GHOST : RINGS;
    const path = describeArc(cx, cy, rings[ri].inner, rings[ri].outer, startDeg, endDeg);
    
    const isHighlighted = highlight && highlight.si === si && highlight.ri === ri;

    return (
      <g key={`${si}-${ri}`}>
        <path
          d={path}
          fill={fill}
          style={{ transition: "fill 0.25s ease" }}
        />
        {/* White stroke highlight — static, confident */}
        {isHighlighted && (
          <path
            d={path}
            fill="none"
            stroke={COLORS.ui.white}
            strokeWidth={3}
            style={{ pointerEvents: "none" }}
          />
        )}
      </g>
    );
  };

  // Render order for proper shadow casting:
  // Back to front: bottom-right → bottom-left → top-right → top-left
  // Shadows cast DOWN and RIGHT (top sits above bottom, left sits above right)
  const RENDER_ORDER = [
    { si: 2, shadow: "none" },      // Critical Thinking (bottom-right) - back
    { si: 3, shadow: "right" },     // Communication (bottom-left) - casts shadow right
    { si: 1, shadow: "down" },      // Curiosity (top-right) - casts shadow down
    { si: 0, shadow: "downright" }, // Collaboration (top-left) - casts shadow both
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      style={{ display: "block", overflow: "visible" }}
    >
      {/* Filters only needed for default variant */}
      {!isGhost && (
        <defs>
          {/* Shadow filters per ring */}
          {RING_SHADOW.map((cfg, ri) => (
            <filter key={ri} id={`${filterId}-rs-${ri}`} x="-30%" y="-30%" width="160%" height="180%">
              <feDropShadow
                dx="0"
                dy={cfg.dy}
                stdDeviation={cfg.blur}
                floodColor={shadowColor}
                floodOpacity={cfg.opacity}
              />
            </filter>
          ))}

          {/* Quadrant position shadows - cast DOWN and RIGHT */}
          <filter id={`${filterId}-shadow-right`} x="-10%" y="-10%" width="140%" height="120%">
            <feDropShadow dx="6" dy="0" stdDeviation="3" floodColor={shadowColor} floodOpacity={dark ? 0.25 : 0.12} />
          </filter>
          <filter id={`${filterId}-shadow-down`} x="-10%" y="-10%" width="120%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="3" floodColor={shadowColor} floodOpacity={dark ? 0.25 : 0.12} />
          </filter>
          <filter id={`${filterId}-shadow-downright`} x="-10%" y="-10%" width="140%" height="150%">
            <feDropShadow dx="4" dy="4" stdDeviation="3" floodColor={shadowColor} floodOpacity={dark ? 0.30 : 0.15} />
          </filter>
        </defs>
      )}

      {/* Render rings from outer to inner */}
      {[3, 2, 1, 0].map((ri) => {
        // Ghost variant: no shadows
        const ringFilter = isGhost ? undefined : `url(#${filterId}-rs-${ri})`;
        
        return (
          <g key={ri} filter={ringFilter}>
            {RENDER_ORDER.map(({ si, shadow }) => {
              const quadShadowFilter = (!isGhost && shadow !== "none") 
                ? `url(#${filterId}-shadow-${shadow})` 
                : undefined;
              return (
                <g key={si} filter={quadShadowFilter} style={{ opacity: getOpacity(si) }}>
                  {renderSegment(si, ri)}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Cross lines — ghost variant only */}
      {isGhost && (
        <>
          <line x1={cx} y1={5} x2={cx} y2={195} stroke={ghostLine} strokeWidth={1} />
          <line x1={5} y1={cy} x2={195} y2={cy} stroke={ghostLine} strokeWidth={1} />
        </>
      )}

      {/* Invisible click targets for quadrants */}
      {isClickable && QUADRANTS.map((quad, si) => (
        <path
          key={`click-${si}`}
          d={describeQuadrant(cx, cy, quad.startDeg)}
          fill="transparent"
          style={{ cursor: "pointer" }}
          onClick={() => onQuadrantClick?.(si)}
        />
      ))}
    </svg>
  );
}
