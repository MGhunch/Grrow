"use client";

import { useState } from "react";
import { Sparkles, Network, Waves, GitBranch } from "lucide-react";
import { COLORS, familyAlpha } from "@/lib/colors";
import GrrowCircle from "../circle/GrrowCircle";

interface SkillsScienceSectionProps {
  dark: boolean;
}

const CAPABILITIES = [
  {
    name: "Curiosity",
    tagline: "Make it better",
    why: "The engine of improvement and the spark of creativity. Curiosity is the restlessness that drives learning, adaptation, and innovation.",
    family: "purple" as const,
    icon: Sparkles,
  },
  {
    name: "Collaboration",
    tagline: "Make it happen",
    why: "Work is fundamentally social. The ability to work with, through, and alongside others is the meta-skill that multiplies everything else.",
    family: "teal" as const,
    icon: Network,
  },
  {
    name: "Communication",
    tagline: "Make it clear",
    why: "Ideas only have value when they land. Communication is not about talking — it's about understanding and being understood.",
    family: "teal" as const,
    icon: Waves,
  },
  {
    name: "Critical Thinking",
    tagline: "Make it work",
    why: "Asking better why unlocks the ability to clarify, simplify, solve, and innovate. Not just making things, but making things work.",
    family: "purple" as const,
    icon: GitBranch,
  },
];

export default function SkillsScienceSection({ dark }: SkillsScienceSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CAPABILITIES[activeIndex];

  // Dynamic colors
  const eyebrowColor = dark ? COLORS.ui.darkTxt : COLORS.purple.dark;
  const headingColor = dark ? COLORS.ui.darkTxt : COLORS.purple.hero;
  const bodyColor = dark ? COLORS.ui.darkBodyLift : COLORS.ui.nearBlack;

  // Gradient background
  const gradientBg = `linear-gradient(135deg, ${familyAlpha("purple", "wash")} 0%, ${familyAlpha("teal", "wash")} 100%)`;

  return (
    <section style={{ background: gradientBg }}>
      <div className="max-w-container mx-auto px-6 md:px-8 py-12 md:py-16">
        {/* Header */}
        <p 
          className="text-eyebrow uppercase mb-4"
          style={{ color: eyebrowColor }}
        >
          FOUR STRENGTHS
        </p>
        <h2 
          className="text-headline-l mb-2"
          style={{ color: headingColor }}
        >
          The skills that count
        </h2>
        <p 
          className="text-light-m max-w-[600px] mb-8 md:mb-10"
          style={{ color: bodyColor }}
        >
          From the World Economic Forum, the OECD, and every major future-of-work study.
        </p>

        {/* ═══ CONTENT AREA ═══ */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Circle — desktop only */}
          <div className="hidden lg:block shrink-0">
            <GrrowCircle
              size={380}
              dark={dark}
              animate={false}
            />
          </div>

          {/* Card with tabs at bottom */}
          <div 
            className="w-full lg:flex-1 rounded-2xl overflow-hidden flex flex-col"
            style={{ 
              background: COLORS.ui.white,
              boxShadow: `0 4px 24px ${familyAlpha("purple", "shadow1")}`,
            }}
          >
            {/* ═══ CONTENT ═══ */}
            <div className="p-6 sm:p-8 md:p-10 flex-1">
              {/* Tagline */}
              <p
                className="text-eyebrow uppercase mb-4"
                style={{ 
                  color: active.family === "purple" ? COLORS.teal.hero : COLORS.purple.hero 
                }}
              >
                {active.tagline}
              </p>

              {/* Big headline */}
              <h3
                className="text-hero-xs md:text-hero-s mb-4 md:mb-5"
                style={{ 
                  color: active.family === "purple" ? COLORS.purple.hero : COLORS.teal.hero 
                }}
              >
                {active.name}
              </h3>

              {/* Body */}
              <p
                className="text-light-m md:text-light-l leading-relaxed"
                style={{ color: COLORS.ui.lightCopy }}
              >
                {active.why}
              </p>
            </div>

            {/* ═══ TABS — at bottom ═══ */}
            <div className="flex gap-2 p-3 sm:p-4 bg-gray-50/50">
              {CAPABILITIES.map((cap, i) => {
                const isActive = activeIndex === i;
                const TabIcon = cap.icon;
                const heroColor = cap.family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;
                
                return (
                  <button
                    key={cap.name}
                    onClick={() => setActiveIndex(i)}
                    className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 rounded-xl transition-all duration-200 cursor-pointer"
                    style={{
                      background: isActive ? heroColor : familyAlpha(cap.family, "wash"),
                      color: isActive ? COLORS.ui.white : heroColor,
                    }}
                  >
                    <TabIcon size={16} strokeWidth={isActive ? 2 : 1.5} className="shrink-0" />
                    {/* Full name on sm+ */}
                    <span className="hidden sm:inline text-bold-s truncate">
                      {cap.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
