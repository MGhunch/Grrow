"use client";

import { COLORS, familyAlpha, whiteAlpha } from "@/lib/colors";

interface LearningStageSectionProps {
  dark: boolean;
}

const STAGES = [
  { name: "Not yet", description: "You don't know what you don't know", label: "New territory", quarters: 0 },
  { name: "Learning", description: "You can do it when prompted", label: "New concept", quarters: 1 },
  { name: "Growing", description: "You can do it when you think about it", label: "New skillset", quarters: 3 },
  { name: "Nailing it", description: "You do it without thinking", label: "New habit", quarters: 4 },
];

export default function LearningStagesSection({ dark }: LearningStageSectionProps) {
  // Dynamic colors
  const eyebrowColor = dark ? whiteAlpha(0.4) : familyAlpha("purple", "soft", "light");
  const headingColor = dark ? COLORS.ui.darkTxt : COLORS.purple.hero;
  const bodyColor = dark ? whiteAlpha(0.6) : COLORS.ui.lightMuted;
  const stageNameColor = dark ? whiteAlpha(0.9) : COLORS.purple.dark;
  const connectorColor = dark ? familyAlpha("purple", "subtle", "dark") : familyAlpha("purple", "border", "light");

  const cx = 28, cy = 28, r = 24;
  const teal = COLORS.teal.notYet;
  const purple = COLORS.purple.hero;

  const renderCircle = (quarters: number) => {
    if (quarters === 0) return (
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle cx={cx} cy={cy} r={r} fill={teal} stroke={purple} strokeWidth="2" />
      </svg>
    );
    if (quarters === 4) return (
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle cx={cx} cy={cy} r={r} fill={purple} stroke={purple} strokeWidth="2" />
      </svg>
    );
    const angle = (quarters / 4) * 360;
    const rad = (angle - 90) * Math.PI / 180;
    const x = (cx + r * Math.cos(rad)).toFixed(2);
    const y = (cy + r * Math.sin(rad)).toFixed(2);
    const largeArc = quarters >= 2 ? 1 : 0;
    return (
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle cx={cx} cy={cy} r={r} fill={teal} stroke={purple} strokeWidth="2" />
        <path d={`M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${largeArc} 1 ${x} ${y} Z`} fill={purple} />
      </svg>
    );
  };

  return (
    <section className="bg-white">
      <div className="max-w-container mx-auto px-6 md:px-8 py-12 md:py-16">
        {/* Header */}
        <p 
          className="text-eyebrow uppercase mb-4"
          style={{ color: eyebrowColor }}
        >
          FOUR STAGES OF COMPETENCE
        </p>
        <h2 
          className="text-headline-l mb-2"
          style={{ color: headingColor }}
        >
          How learning works
        </h2>
        <p 
          className="text-light-m max-w-[600px] mb-10 md:mb-12"
          style={{ color: bodyColor }}
        >
          A learning model from educational psychology.
        </p>

        {/* ═══ MOBILE: Vertical linear layout ═══ */}
        <div className="md:hidden relative">
          {/* Vertical connector line */}
          <div 
            className="absolute left-7 top-7 bottom-7 w-0.5"
            style={{ background: connectorColor }}
          />

          {STAGES.map((stage, i) => (
            <div key={i} className="flex gap-5 mb-8 last:mb-0">
              {/* Circle */}
              <div className="relative z-10 shrink-0">
                {renderCircle(stage.quarters)}
              </div>
              
              {/* Text */}
              <div className="pt-2">
                <p 
                  className="text-bold-l mb-1"
                  style={{ color: stageNameColor }}
                >
                  {stage.name}
                </p>
                <p 
                  className="text-light-s mb-1"
                  style={{ color: bodyColor }}
                >
                  {stage.description}
                </p>
                <p className="text-bold-s text-teal-hero">
                  {stage.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ DESKTOP: Horizontal 4-column grid ═══ */}
        <div className="hidden md:grid grid-cols-4 gap-0 items-start">
          {STAGES.map((stage, i) => (
            <div key={i} className="flex flex-col items-center relative">
              {/* Horizontal connector line */}
              {i < 3 && (
                <div 
                  className="absolute top-7 left-1/2 -right-1/2 h-0.5 z-0"
                  style={{ background: connectorColor }}
                />
              )}
              
              {/* Circle */}
              <div className="relative z-10 mb-5">
                {renderCircle(stage.quarters)}
              </div>
              
              {/* Text */}
              <div className="text-center px-3">
                <p 
                  className="text-bold-l mb-2"
                  style={{ color: stageNameColor }}
                >
                  {stage.name}
                </p>
                <p 
                  className="text-light-s mb-1.5 min-h-[40px]"
                  style={{ color: bodyColor }}
                >
                  {stage.description}
                </p>
                <p className="text-bold-s text-teal-hero">
                  {stage.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
