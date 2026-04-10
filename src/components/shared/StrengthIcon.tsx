"use client";

import { Sparkles, Network, Waves, GitBranch } from "lucide-react";
import { COLORS } from "@/lib/colors";
import type { StrengthName } from "@/lib/types";

// ── Private icon mapping ─────────────────────────────────────────────────
// Not exported — all access goes through the component

const ICONS = {
  "Curiosity": Sparkles,
  "Collaboration": Network,
  "Communication": Waves,
  "Critical Thinking": GitBranch,
} as const;

const FAMILIES: Record<StrengthName, "purple" | "teal"> = {
  "Curiosity": "purple",
  "Critical Thinking": "purple",
  "Collaboration": "teal",
  "Communication": "teal",
};

// ── Size specifications ──────────────────────────────────────────────────

const SIZES = {
  xs: { container: 24, icon: 12, strokeWidth: 2 },
  sm: { container: 28, icon: 14, strokeWidth: 1.75 },
  md: { container: 44, icon: 20, strokeWidth: 2 },
  lg: { container: 56, icon: 24, strokeWidth: 2 },
} as const;

// Progress ring geometry (md and lg only)
// Ring becomes the outer boundary; inner circle shrinks to make room
const PROGRESS_SIZES = {
  md: { outer: 44, ringStroke: 4, innerCircle: 32, whiteRing: 36 },
  lg: { outer: 56, ringStroke: 4, innerCircle: 44, whiteRing: 48 },
} as const;

// ── Props ────────────────────────────────────────────────────────────────

interface StrengthIconProps {
  strength: StrengthName;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "solid" | "shaded";
  progress?: number; // 0-1, only applies to md and lg
}

// ── Component ────────────────────────────────────────────────────────────

export default function StrengthIcon({
  strength,
  size = "md",
  variant = "shaded",
  progress,
}: StrengthIconProps) {
  const Icon = ICONS[strength];
  const family = FAMILIES[strength];
  const spec = SIZES[size];

  // Colours based on family
  const heroColor = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;
  const paleColor = family === "purple" ? COLORS.purple.notYet : COLORS.teal.notYet;
  const trackColor = COLORS.ui.lightBorder;

  // Determine if we're showing progress (md and lg only)
  const showProgress = progress !== undefined && (size === "md" || size === "lg");
  const progressSpec = showProgress ? PROGRESS_SIZES[size as "md" | "lg"] : null;

  // ── With progress ring ─────────────────────────────────────────────────

  if (showProgress && progressSpec) {
    const { outer, ringStroke, innerCircle, whiteRing } = progressSpec;
    const center = outer / 2;
    const ringRadius = (outer - ringStroke) / 2;
    const circumference = 2 * Math.PI * ringRadius;
    const strokeDasharray = `${circumference * progress!} ${circumference * (1 - progress!)}`;

    // Icon size scales with inner circle
    const iconSize = size === "lg" ? 24 : 20;
    const iconStroke = 2;

    return (
      <div
        style={{
          position: "relative",
          width: outer,
          height: outer,
          flexShrink: 0,
        }}
      >
        <svg
          width={outer}
          height={outer}
          viewBox={`0 0 ${outer} ${outer}`}
          style={{ display: "block" }}
        >
          {/* Track (full circle) */}
          <circle
            cx={center}
            cy={center}
            r={ringRadius}
            fill="none"
            stroke={trackColor}
            strokeWidth={ringStroke}
          />
          {/* Progress arc */}
          <circle
            cx={center}
            cy={center}
            r={ringRadius}
            fill="none"
            stroke={heroColor}
            strokeWidth={ringStroke}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
          />

          {variant === "solid" ? (
            <>
              {/* White ring separator (solid variant only) */}
              <circle
                cx={center}
                cy={center}
                r={whiteRing / 2}
                fill={COLORS.ui.white}
              />
              {/* Solid core */}
              <circle
                cx={center}
                cy={center}
                r={innerCircle / 2}
                fill={heroColor}
              />
            </>
          ) : (
            /* Shaded fill meets track directly */
            <circle
              cx={center}
              cy={center}
              r={ringRadius - ringStroke / 2}
              fill={paleColor}
            />
          )}
        </svg>

        {/* Icon centered */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: variant === "solid" ? COLORS.ui.white : heroColor,
          }}
        >
          <Icon size={iconSize} strokeWidth={iconStroke} />
        </div>
      </div>
    );
  }

  // ── Without progress ring ──────────────────────────────────────────────

  const containerFill = variant === "solid" ? heroColor : paleColor;
  const iconColor = variant === "solid" ? COLORS.ui.white : heroColor;

  return (
    <div
      style={{
        width: spec.container,
        height: spec.container,
        borderRadius: "50%",
        background: containerFill,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon
        size={spec.icon}
        strokeWidth={spec.strokeWidth}
        color={iconColor}
      />
    </div>
  );
}
