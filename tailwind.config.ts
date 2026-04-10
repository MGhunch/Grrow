import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ── Colors ─────────────────────────────────────────────────────────
      colors: {
        // Teal family — Collaboration + Communication
        teal: {
          hero:     "var(--teal-hero)",
          dark:     "var(--teal-dark)",
          "not-yet":  "var(--teal-not-yet)",
          learning: "var(--teal-learning)",
          growing:  "var(--teal-growing)",
          nailing:  "var(--teal-nailing)",
        },
        // Purple family — Curiosity + Critical Thinking
        purple: {
          hero:     "var(--purple-hero)",
          dark:     "var(--purple-dark)",
          "not-yet":  "var(--purple-not-yet)",
          learning: "var(--purple-learning)",
          growing:  "var(--purple-growing)",
          nailing:  "var(--purple-nailing)",
        },
        // Brand
        "hero-blue": "var(--hero-blue)",
        // UI — contextual (swap in dark mode via CSS)
        ui: {
          bg:     "var(--bg)",
          card:   "var(--card)",
          bdr:    "var(--bdr)",
          sep:    "var(--sep)",
          txt:    "var(--txt)",
          muted:  "var(--muted)",
          copy:   "var(--copy)",
          hover:  "var(--hover)",
        },
        // Direct access
        "near-black":  "var(--txt)",
        "warm-white":  "var(--warm-white)",
        "gray":        "var(--gray)",
        // Dark mode direct access
        "dark-bg":        "var(--dark-bg)",
        "dark-card":      "var(--dark-card)",
        "dark-txt":       "var(--dark-txt)",
        "dark-muted":     "var(--dark-muted)",
        "dark-copy":      "var(--dark-copy)",
        "dark-copy-lift": "var(--dark-copy-lift)",
      },

      // ── Typography ─────────────────────────────────────────────────────
      // Custom font sizes matching TEXT tokens from typography.ts
      // Usage: text-hero-l, text-bold-m, etc.
      fontSize: {
        // Hero — 900 weight, marketing pages
        "hero-l": ["56px", { lineHeight: "1.05", fontWeight: "900" }],
        "hero-m": ["52px", { lineHeight: "1.1", fontWeight: "900" }],
        "hero-s": ["44px", { lineHeight: "1.15", fontWeight: "900" }],
        "hero-xs": ["36px", { lineHeight: "1.15", fontWeight: "900" }],

        // Headline — 900 weight, app UI display
        "headline-l": ["32px", { lineHeight: "1.1", fontWeight: "900" }],
        "headline-m": ["28px", { lineHeight: "1.1", fontWeight: "900" }],
        "headline-s": ["22px", { lineHeight: "1.15", fontWeight: "900" }],

        // Bold — 600 weight, headings and labels
        "bold-l": ["18px", { lineHeight: "1.3", fontWeight: "600" }],
        "bold-m": ["15px", { lineHeight: "1.4", fontWeight: "600" }],
        "bold-s": ["13px", { lineHeight: "1.4", fontWeight: "600" }],

        // Standard — 400 weight, secondary text
        "std-l": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "std-m": ["14px", { lineHeight: "1.55", fontWeight: "400" }],
        "std-s": ["13px", { lineHeight: "1.5", fontWeight: "400" }],

        // Light — 300 weight, body copy
        "light-l": ["16px", { lineHeight: "1.55", fontWeight: "300" }],
        "light-m": ["14px", { lineHeight: "1.55", fontWeight: "300" }],
        "light-s": ["13px", { lineHeight: "1.5", fontWeight: "300" }],

        // Fixed tokens
        "eyebrow": ["11px", { lineHeight: "1.2", fontWeight: "600", letterSpacing: "0.1em" }],
        "button":  ["15px", { lineHeight: "1", fontWeight: "600" }],
        "tooltip": ["12px", { lineHeight: "1.4", fontWeight: "400" }],

        // Extras
        "2xs": "0.625rem", // 10px
        "17": "17px",      // Used in home page body
      },

      // ── Font Family ────────────────────────────────────────────────────
      fontFamily: {
        sans:    ["var(--font-poppins)", "Poppins", "sans-serif"],
        display: ["var(--font-fredoka)", "Fredoka", "sans-serif"],
      },

      // ── Spacing ────────────────────────────────────────────────────────
      // Custom values used in the design
      spacing: {
        "18": "4.5rem",   // 72px
        "22": "5.5rem",   // 88px
        "30": "7.5rem",   // 120px
      },

      // ── Max Width ──────────────────────────────────────────────────────
      maxWidth: {
        "container": "1200px",
        "content":   "720px",
        "narrow":    "480px",
      },

      // ── Border Radius ──────────────────────────────────────────────────
      borderRadius: {
        "xl":  "16px",
        "2xl": "20px",
        "3xl": "24px",
      },

      // ── Box Shadow ─────────────────────────────────────────────────────
      boxShadow: {
        "card":     "0 4px 20px rgba(0, 0, 0, 0.08)",
        "card-lg":  "0 8px 32px rgba(0, 0, 0, 0.12)",
        "elevated": "0 12px 40px rgba(0, 0, 0, 0.15)",
        "float":    "0 16px 48px rgba(0, 0, 0, 0.20)",
      },
    },
  },
  plugins: [],
};

export default config;
