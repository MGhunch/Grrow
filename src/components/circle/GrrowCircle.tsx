"use client";

import { useState, useEffect, useRef } from "react";
import { STRENGTHS, RINGS } from "../../lib/skillsets";
import { COLORS } from "@/lib/colors";
import { TEXT } from "@/lib/typography";
import { SCORE_COLORS } from "@/lib/scoring";
import { segKey } from "@/lib/skillsets";
import type { ScoreMap, KfgMap, ScoreState } from "../../lib/types";

// ── SVG helpers ───────────────────────────────────────────────────────

const SVG_SIZE = 520;
const CX = 260, CY = 260;
const OUTER_R = RINGS[RINGS.length - 1].outerR;
const INNER_R = RINGS[0].innerR;
const LABEL_R = OUTER_R + 20;

void INNER_R;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, ir: number, or_: number, s: number, e: number) {
  const a = polar(cx, cy, or_, s), b = polar(cx, cy, or_, e);
  const c = polar(cx, cy, ir,  e), d = polar(cx, cy, ir,  s);
  const lg = e - s > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${or_} ${or_} 0 ${lg} 1 ${b.x} ${b.y} L ${c.x} ${c.y} A ${ir} ${ir} 0 ${lg} 0 ${d.x} ${d.y} Z`;
}

function discPath(cx: number, cy: number, r: number, s: number, e: number) {
  const a = polar(cx, cy, r, s), b = polar(cx, cy, r, e);
  return `M ${cx} ${cy} L ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y} Z`;
}

function labelArcPath(cx: number, cy: number, r: number, s: number, e: number, rev: boolean) {
  if (rev) {
    const a = polar(cx, cy, r, e), b = polar(cx, cy, r, s);
    return `M ${a.x} ${a.y} A ${r} ${r} 0 0 0 ${b.x} ${b.y}`;
  }
  const a = polar(cx, cy, r, s), b = polar(cx, cy, r, e);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`;
}

function initScores(): ScoreMap {
  const o: ScoreMap = {};
  STRENGTHS.forEach((_, si) => RINGS.forEach((__, ri) => { o[segKey(si, ri)] = "Not yet"; }));
  return o;
}

const DEMO_SCORES: ScoreMap = {
  "0-0": "Nailing it", "0-1": "Nailing it", "0-2": "Growing",  "0-3": "Learning",
  "1-0": "Growing",    "1-1": "Growing",    "1-2": "Learning", "1-3": "Not yet",
  "2-0": "Nailing it", "2-1": "Growing",    "2-2": "Growing",  "2-3": "Learning",
  "3-0": "Growing",    "3-1": "Learning",   "3-2": "Not yet",  "3-3": "Not yet",
};

const BOTTOM_HALF = [1, 2];
const TOP_HALF    = [0, 3];

// Shadow colour: black for dark mode, purple-tinted for light
const SHADOW_COLOR = {
  dark:  COLORS.ui.black,
  light: COLORS.purple.dark,
} as const;

interface GrrowCircleProps {
  scores?:  ScoreMap;
  kfg?:     KfgMap;
  size?:    number;
  animate?: boolean;
  dark?:    boolean;
  id?:      string;  // Unique prefix for SVG filter/path IDs
}

export default function GrrowCircle({
  scores,
  kfg = {},
  size = 400,
  animate = true,
  dark = true,
  id = "circle",
}: GrrowCircleProps) {
  const [display, setDisplay] = useState<ScoreMap>(initScores);
  const [hovered, setHovered] = useState<{ si: number; ri: number } | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  void kfg;

  useEffect(() => {
    const target = scores ?? DEMO_SCORES;
    if (!animate) { setDisplay(target); return; }

    const STATES: ScoreState[] = ["Not yet", "Learning", "Growing", "Nailing it"];
    const sequence: Array<{ key: string; state: ScoreState }> = [];

    RINGS.forEach((_, ri) => {
      const shuffled = [...STRENGTHS.keys()].sort(() => Math.random() - 0.5);
      shuffled.forEach((si) => {
        const key = segKey(si, ri);
        const targetState = target[key] ?? "Not yet";
        const targetIndex = STATES.indexOf(targetState);
        for (let step = 1; step <= targetIndex; step++) {
          sequence.push({ key, state: STATES[step] });
        }
      });
    });

    const timers: ReturnType<typeof setTimeout>[] = [];
    sequence.forEach((item, i) => {
      timers.push(setTimeout(() => {
        setDisplay(p => ({ ...p, [item.key]: item.state }));
      }, i * 120));
    });
    return () => timers.forEach(clearTimeout);
  }, [scores, animate]);

  // Handle hover enter with delay
  const handleSegmentEnter = (si: number, ri: number) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setHovered({ si, ri });
    hoverTimerRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 100);
  };

  // Handle hover leave — immediate
  const handleSegmentLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setHovered(null);
    setShowTooltip(false);
  };

  // Track cursor position within container
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left + 12,
      y: e.clientY - rect.top + 12,
    });
  };

  const shadowColor = dark ? SHADOW_COLOR.dark : SHADOW_COLOR.light;

  const ringShadow = [
    { dy: 14, blur: 5, opacity: dark ? 0.60 : 0.24 },
    { dy: 9,  blur: 4, opacity: dark ? 0.44 : 0.18 },
    { dy: 5,  blur: 3, opacity: dark ? 0.28 : 0.12 },
    { dy: 2,  blur: 2, opacity: dark ? 0.14 : 0.07 },
  ];

  const renderSegments = (siList: number[], ri: number) =>
    siList.map(si => {
      const s        = STRENGTHS[si];
      const ring     = RINGS[ri];
      const key      = segKey(si, ri);
      const state    = display[key] ?? "Not yet";
      const isHovered = hovered?.si === si && hovered?.ri === ri;
      
      // Hover = jump to full brand colour
      const fill = isHovered 
        ? SCORE_COLORS[s.family]["Nailing it"]
        : SCORE_COLORS[s.family][state];
      
      const path = ri === 0
        ? discPath(CX, CY, ring.outerR, s.start, s.start + 90)
        : arcPath(CX, CY, ring.innerR, ring.outerR, s.start, s.start + 90);
      
      return (
        <path
          key={key}
          d={path}
          fill={fill}
          style={{ transition: "fill 0.15s ease" }}
          onMouseEnter={() => handleSegmentEnter(si, ri)}
          onMouseLeave={handleSegmentLeave}
        />
      );
    });

  // Get tooltip text
  const tooltipText = hovered 
    ? STRENGTHS[hovered.si].skillsets[hovered.ri].name 
    : "";

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ 
        position: "relative", 
        width: size, 
        height: size,
        display: "inline-block",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        style={{ display: "block", overflow: "visible" }}
        aria-label="Grrow skills circle"
      >
        <defs>
          {STRENGTHS.map((s, si) => (
            <path
              key={`${id}-lp-${si}`}
              id={`${id}-lp-${si}`}
              d={labelArcPath(CX, CY, s.labelReversed ? LABEL_R + 14 : LABEL_R, s.start + 2, s.start + 88, s.labelReversed)}
            />
          ))}

          {ringShadow.map((cfg, ri) => (
            <filter key={ri} id={`${id}-rs-${ri}`} x="-30%" y="-30%" width="160%" height="180%">
              <feDropShadow dx="0" dy={cfg.dy} stdDeviation={cfg.blur}
                floodColor={shadowColor} floodOpacity={cfg.opacity} />
            </filter>
          ))}

          <filter id={`${id}-top-shadow`} x="-5%" y="-5%" width="110%" height="160%">
            <feDropShadow dx="0" dy="16" stdDeviation="5"
              floodColor={shadowColor}
              floodOpacity={dark ? 0.50 : 0.20} />
          </filter>
        </defs>

        {[3, 2, 1, 0].map(ri => (
          <g key={ri} filter={`url(#${id}-rs-${ri})`}>
            {renderSegments(BOTTOM_HALF, ri)}
            <g filter={`url(#${id}-top-shadow)`}>
              {renderSegments(TOP_HALF, ri)}
            </g>
          </g>
        ))}

        {STRENGTHS.map((s, si) => {
          const col = s.family === "purple"
            ? (dark ? COLORS.purple.learning : COLORS.purple.hero)
            : (dark ? COLORS.teal.hero : COLORS.teal.dark);
          return (
            <text
              key={si}
              fontFamily="Poppins, sans-serif"
              fontSize={TEXT.tooltip.fontSize}
              fontWeight={600}
              fill={col}
              letterSpacing="0.13em"
            >
              <textPath href={`#${id}-lp-${si}`} startOffset="50%" textAnchor="middle">
                {s.name.toUpperCase()}
              </textPath>
            </text>
          );
        })}
      </svg>

      {/* Tooltip */}
      {showTooltip && hovered && (
        <div
          style={{
            position: "absolute",
            left: tooltipPos.x,
            top: tooltipPos.y,
            backgroundColor: STRENGTHS[hovered.si].family === "purple" 
              ? COLORS.teal.hero 
              : COLORS.purple.hero,
            color: COLORS.ui.white,
            fontFamily: "Poppins, sans-serif",
            fontSize: TEXT.tooltip.fontSize,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 6,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          {tooltipText}
        </div>
      )}

      {/* Mobile: disable hover interactions */}
      <style>{`
        @media (max-width: 768px) {
          svg path {
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
}
