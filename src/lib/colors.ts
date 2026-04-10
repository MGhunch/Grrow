// ═══════════════════════════════════════════════════════════════════════════
// COLORS — Brand Palette & Colour Helpers
// ═══════════════════════════════════════════════════════════════════════════
//
// Single source of truth for all colour values.
// No hex values elsewhere in the app — reference COLORS.* or use helpers.

// ── Brand Colours ─────────────────────────────────────────────────────────

export const COLORS = {
  teal: {
    hero:     "#18B99A",  // Brand + Nailing it
    dark:     "#0D9A82",  // Hover states, text on light bg (contrast)
    nailing:  "#18B99A",  // Score state alias
    growing:  "#3DCFB8",  // Growing score state
    learning: "#8DE8D8",  // Learning score state
    notYet:   "#C8F0EA",  // Not yet score state — pale but present
  },
  purple: {
    hero:     "#4C3FA0",  // Brand + Nailing it
    dark:     "#3C3289",  // Hover states, deep emphasis
    nailing:  "#4C3FA0",  // Score state alias
    growing:  "#6558D4",  // Growing score state
    learning: "#B8B0F0",  // Learning score state
    notYet:   "#D8D4F5",  // Not yet score state — pale but present
  },
  ui: {
    // Dark mode
    deepNavy:     "#0D0B16",  // Page background
    darkCard:     "#16122A",  // Card background
    darkBorder:   "#251E40",  // Borders
    darkSep:      "#2E2550",  // Separators
    darkTxt:      "#EEE8FF",  // Primary text
    darkMuted:    "#5A4F7A",  // Muted text
    darkBodyCopy: "#9B8FD4",  // Body copy
    darkBodyLift: "#C4BCDF",  // Body copy (lifted)
    darkHover:    "#1C1640",  // Hover state
    // Light mode
    nearBlack:    "#1A1525",  // Primary text
    lightMuted:   "#6B6390",  // Muted text
    lightBorder:  "#E5E0F5",  // Borders
    lightSep:     "#DDD8F5",  // Separators
    lightHover:   "#F4F1FF",  // Hover state
    lightCopy:    "#3D3360",  // Secondary copy
    // Neutral
    white:        "#FFFFFF",  // Pure white
    black:        "#000000",  // Pure black — shadows in dark mode
    warmWhite:    "#FFFDF9",  // Slight cream
    gray:         "#E8E8E8",  // Progress tracks, neutral borders
    // Overlays
    overlay:      "rgba(20, 16, 48, 0.5)",   // Modal backdrop (light mode)
    overlayDark:  "rgba(10, 8, 22, 0.85)",   // Modal backdrop (dark mode)
  },
} as const;

// ── On-Hero Tokens ────────────────────────────────────────────────────────
// For white text/chrome on solid hero backgrounds (purple or teal).
// Used in quiz question blocks, strength cards, anywhere hero bg appears.

export const ON_HERO = {
  text:   "#FFFFFF",                      // Primary text on hero
  muted:  "rgba(255, 255, 255, 0.70)",    // Tooltips, secondary info
  border: "rgba(255, 255, 255, 0.25)",    // Dividers, ring tracks
  wash:   "rgba(255, 255, 255, 0.15)",    // Unselected button backgrounds
} as const;

// ── Types ─────────────────────────────────────────────────────────────────

export type ColorFamily = "purple" | "teal";
export type OpacityToken = "wash" | "border" | "subtle" | "muted" | "soft" | "shadow1" | "shadow2" | "shadow3";

// ── Internal: RGB values for alpha calculations ───────────────────────────
// Using "growing" colours as base — punchier, more vibrant washes

const RGB = {
  purple: "101, 88, 212",  // #6558D4 (growing)
  teal:   "61, 207, 184",  // #3DCFB8 (growing)
} as const;

// ── Internal: Opacity scales ──────────────────────────────────────────────

const OPACITY = {
  light: {
    wash:       0.20,
    washPurple: 0.25,  // Purple needs more weight
    border:     0.16,
    subtle:     0.25,
    muted:      0.45,
    soft:       0.60,
    shadow1:    0.15,
    shadow2:    0.25,
    shadow3:    0.35,
  },
  dark: {
    wash:       0.12,
    washPurple: 0.18,
    border:     0.24,
    subtle:     0.35,
    muted:      0.55,
    soft:       0.70,
    shadow1:    0.25,
    shadow2:    0.35,
    shadow3:    0.45,
  },
} as const;

// ── Helpers ───────────────────────────────────────────────────────────────

/**
 * Derive transparent colours from growing.
 * Purple uses heavier wash (washPurple) to hold its weight against teal.
 *
 * @example familyAlpha('purple', 'wash') → 'rgba(101, 88, 212, 0.25)'
 * @example familyAlpha('teal', 'border', 'dark') → 'rgba(61, 207, 184, 0.24)'
 */
export function familyAlpha(
  family: ColorFamily,
  token: OpacityToken,
  mode: "light" | "dark" = "light"
): string {
  const rgb = RGB[family];
  const actualToken = (family === "purple" && token === "wash") ? "washPurple" : token;
  const opacity = OPACITY[mode][actualToken as keyof typeof OPACITY.light];
  return `rgba(${rgb}, ${opacity})`;
}

/**
 * White at any opacity. For translucent overlays, unselected states.
 *
 * @example whiteAlpha(0.55) → 'rgba(255, 255, 255, 0.55)'
 */
export function whiteAlpha(opacity: number): string {
  return `rgba(255, 255, 255, ${opacity})`;
}

/**
 * Converts hex colour to RGB string for rgba() usage.
 *
 * @example hexToRgb("#3C3289") → "60, 50, 137"
 */
export function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
