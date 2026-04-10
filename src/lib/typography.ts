// ═══════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY — Text Styles
// ═══════════════════════════════════════════════════════════════════════════
//
// All text is Poppins (set at body level in globals.css).
// This file defines SIZE and WEIGHT combinations — not font family.
//
// Weight ladder:
//   300 — Light (body copy — Grrow's signature airy feel)
//   400 — Standard (secondary text, descriptions)
//   600 — Bold (headings, labels, buttons, UI chrome)
//   900 — Headline (display moments only)

// ── Size Scales ───────────────────────────────────────────────────────────
//
// hero:     56 / 52 / 44  — Marketing pages, big impact moments
// headline: 32 / 28 / 22  — App UI display moments
// bold:     18 / 15 / 13  — Headings and labels
// standard: 16 / 14 / 13  — Secondary text
// light:    16 / 14 / 13  — Body copy

export const TEXT = {
  // ── Hero — 900 weight, marketing pages ──────────────────────────────────
  hero: {
    l: { fontSize: 56, fontWeight: 900, lineHeight: 1.05 },  // Big marketing moments
    m: { fontSize: 52, fontWeight: 900, lineHeight: 1.1 },   // Primary hero
    s: { fontSize: 44, fontWeight: 900, lineHeight: 1.15 },  // SubHeaders, section headers
  },

  // ── Headline — 900 weight, app UI display moments ───────────────────────
  headline: {
    l: { fontSize: 32, fontWeight: 900, lineHeight: 1.1 },
    m: { fontSize: 28, fontWeight: 900, lineHeight: 1.1 },
    s: { fontSize: 22, fontWeight: 900, lineHeight: 1.15 },
  },

  // ── Bold — 600 weight, headings and labels ──────────────────────────────
  bold: {
    l: { fontSize: 18, fontWeight: 600, lineHeight: 1.3 },
    m: { fontSize: 15, fontWeight: 600, lineHeight: 1.4 },
    s: { fontSize: 13, fontWeight: 600, lineHeight: 1.4 },
  },

  // ── Standard — 400 weight, secondary text ───────────────────────────────
  standard: {
    l: { fontSize: 16, fontWeight: 400, lineHeight: 1.5 },
    m: { fontSize: 14, fontWeight: 400, lineHeight: 1.55 },
    s: { fontSize: 13, fontWeight: 400, lineHeight: 1.5 },
  },

  // ── Light — 300 weight, body copy ───────────────────────────────────────
  light: {
    l: { fontSize: 16, fontWeight: 300, lineHeight: 1.55 },
    m: { fontSize: 14, fontWeight: 300, lineHeight: 1.55 },
    s: { fontSize: 13, fontWeight: 300, lineHeight: 1.5 },
  },

  // ── Fixed tokens — no size variants ─────────────────────────────────────

  eyebrow: {
    fontSize: 11,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
  },

  button: {
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 1,
  },

  tooltip: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.4,
  },
} as const;
