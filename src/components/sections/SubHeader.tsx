"use client";

import { COLORS } from "@/lib/colors";

// ── Types ─────────────────────────────────────────────────────────────

interface SubHeaderProps {
  eyebrow: string;
  headline: string;           // First white line
  headlineLine2?: string;     // Second line - white portion (e.g., "Focus.")
  headlineAccent: string;     // Teal portion (e.g., "Repeat.")
  accentInline?: boolean | "desktop"; // true = always inline, "desktop" = inline on md+ only
}

// ── Component ─────────────────────────────────────────────────────────

export default function SubHeader({ 
  eyebrow, 
  headline, 
  headlineLine2, 
  headlineAccent,
  accentInline = false,
}: SubHeaderProps) {
  const isResponsive = accentInline === "desktop";
  const isAlwaysInline = accentInline === true;

  return (
    <div className="relative overflow-hidden bg-hero-blue">
      <div className="max-w-container mx-auto px-6 md:px-8 py-20 md:py-24 relative z-10">
        {/* Eyebrow */}
        <p className="text-eyebrow uppercase text-white/40 mb-4">
          {eyebrow}
        </p>

        {/* First headline line - always white */}
        <h1 className="text-hero-s text-white">
          {headline}
        </h1>

        {/* Second line handling */}
        {isResponsive && headlineLine2 ? (
          // Responsive: stacked on mobile, inline on desktop
          <>
            {/* Mobile: stacked */}
            <div className="md:hidden">
              <h1 className="text-hero-s text-white">
                {headlineLine2}
              </h1>
              <h1 className="text-hero-s text-teal-hero">
                {headlineAccent}
              </h1>
            </div>
            {/* Desktop: inline */}
            <h1 className="hidden md:block text-hero-s">
              <span className="text-white">{headlineLine2} </span>
              <span className="text-teal-hero">{headlineAccent}</span>
            </h1>
          </>
        ) : isAlwaysInline && headlineLine2 ? (
          // Always inline
          <h1 className="text-hero-s">
            <span className="text-white">{headlineLine2} </span>
            <span className="text-teal-hero">{headlineAccent}</span>
          </h1>
        ) : (
          // Always stacked (default)
          <>
            {headlineLine2 && (
              <h1 className="text-hero-s text-white">
                {headlineLine2}
              </h1>
            )}
            <h1 className="text-hero-s text-teal-hero">
              {headlineAccent}
            </h1>
          </>
        )}
      </div>

      {/* Ghosted circle decoration */}
      <svg
        className="absolute -top-20 -right-20 md:-top-24 md:-right-24 w-64 h-64 md:w-96 md:h-96 opacity-30"
        viewBox="0 0 320 320"
      >
        <circle cx="160" cy="160" r="145" fill="none" stroke={COLORS.teal.hero} strokeWidth="20" />
        <circle cx="160" cy="160" r="105" fill="none" stroke={COLORS.purple.growing} strokeWidth="15" />
        <circle cx="160" cy="160" r="70" fill="none" stroke={COLORS.teal.hero} strokeWidth="12" />
        <circle cx="160" cy="160" r="42" fill="none" stroke={COLORS.purple.growing} strokeWidth="10" />
        <circle cx="160" cy="160" r="20" fill={COLORS.purple.growing} />
      </svg>
    </div>
  );
}
