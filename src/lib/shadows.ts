import { COLORS, hexToRgb } from "./colors";
import type { ColorFamily } from "./colors";

// ── Shadow Geometry ───────────────────────────────────────────────────
// Defines shape of shadows. Colour comes from family.dark.

export const SHADOW = {
  card:           { y: 2,  blur: 8,  spread: 0 },
  cardHover:      { y: 8,  blur: 24, spread: 0 },
  button:         { y: 4,  blur: 16, spread: 0 },
  modal:          { y: 16, blur: 48, spread: 0 },
  sectionTop:     { y: 12,  blur: 20, spread: -4, inset: true },
  sectionBot:     { y: -12, blur: 20, spread: -4, inset: true },
  sectionTopOnly: { y: 12,  blur: 20, spread: -4, inset: true },
} as const;

export type ShadowType = keyof typeof SHADOW;

// ── Shadow Helper ─────────────────────────────────────────────────────
// Builds shadow string from geometry + family dark colour.
// Usage: shadow("card", "purple") → "0 2px 8px 0px rgba(60, 50, 137, 0.12)"

const DEFAULT_OPACITY: Record<ShadowType, number> = {
  card:           0.08,
  cardHover:      0.15,
  button:         0.20,
  modal:          0.25,
  sectionTop:     0.12,
  sectionBot:     0.18,
  sectionTopOnly: 0.12,
};

export function shadow(
  type: ShadowType,
  family: ColorFamily,
  opacity?: number
): string {
  const geo = SHADOW[type];
  const rgb = hexToRgb(COLORS[family].dark);
  const op = opacity ?? DEFAULT_OPACITY[type];
  const inset = "inset" in geo && geo.inset ? "inset " : "";
  return `${inset}0 ${geo.y}px ${geo.blur}px ${geo.spread}px rgba(${rgb}, ${op})`;
}

// ── Section Inset Helper ──────────────────────────────────────────────
// Combines top + bottom inset for recessed sections.
// Usage: sectionInset("purple") → "inset 0 8px... , inset 0 -8px..."

export function sectionInset(family: ColorFamily): string {
  return `${shadow("sectionTop", family)}, ${shadow("sectionBot", family)}`;
}

// ── Section Inset Top Only ────────────────────────────────────────────
// Single top inset for section tucking under what's above.
// Usage: sectionInsetTop("purple") → "inset 0 12px..."

export function sectionInsetTop(family: ColorFamily): string {
  return shadow("sectionTopOnly", family);
}

// ── Section Inset Bottom Only ─────────────────────────────────────────
// Single bottom inset for section tucking under what's below.
// Usage: sectionInsetBottom("purple") → "inset 0 -12px..."

export function sectionInsetBottom(family: ColorFamily): string {
  return shadow("sectionBot", family);
}
