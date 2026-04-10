"use client";

import { COLORS } from "@/lib/colors";

interface Props {
  stage: 1 | 2 | 3 | 4;
  size?: number;
  dark?: boolean;
}

/**
 * RingIcon — Career stage indicator
 * 
 * Concentric filled circles showing progression:
 * - Teal = active ring (where you're working)
 * - Purple = completed rings (what you've built)
 * - Ghost = future rings (what's ahead)
 */
export default function RingIcon({ stage, size = 40, dark = false }: Props) {
  const teal = COLORS.teal.hero;
  const purple = COLORS.purple.hero;
  const ghost = dark ? "rgba(76,63,160,0.12)" : "rgba(76,63,160,0.06)";

  // Ring radii as percentages of half the viewBox (20 units)
  // Outermost to innermost: r=20, r=15, r=10, r=5
  const rings = [
    { r: 20, index: 4 }, // Leading (outermost)
    { r: 15, index: 3 }, // Influencing
    { r: 10, index: 2 }, // Exploring
    { r: 5,  index: 1 }, // Essentials (core)
  ];

  const getFill = (ringIndex: number): string => {
    if (ringIndex > stage) {
      // Future ring — ghost
      return ghost;
    } else if (ringIndex === stage) {
      // Active ring — teal
      return teal;
    } else {
      // Completed ring — purple with opacity based on depth
      return purple;
    }
  };

  const getOpacity = (ringIndex: number): number => {
    if (ringIndex > stage) {
      // Ghost rings
      return 1;
    } else if (ringIndex === stage) {
      // Active ring — stronger presence
      return 0.4;
    } else {
      // Completed rings — deeper = more opaque
      // Stage 4: indices 1,2,3 completed → opacities 0.65, 0.45, 0.30
      const depth = stage - ringIndex;
      const baseOpacity = 0.65;
      const decrement = 0.15;
      return Math.max(0.25, baseOpacity - (depth - 1) * decrement);
    }
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40"
      style={{ flexShrink: 0 }}
    >
      {rings.map(({ r, index }) => (
        <circle
          key={index}
          cx="20"
          cy="20"
          r={r}
          fill={getFill(index)}
          opacity={getOpacity(index)}
        />
      ))}
    </svg>
  );
}
