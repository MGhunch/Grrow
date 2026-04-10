"use client";

import { useState } from "react";
import { COLORS } from "@/lib/colors";
import { ButtonPrimary } from "../shared/Button";
import ReferencesModal from "../modals/ReferencesModal";

interface SeventyTwentyTenSectionProps {
  dark: boolean;
}

// Donut segments for mobile
const SEGMENTS = [
  { percent: 70, color: COLORS.purple.hero, label: "On the job" },
  { percent: 20, color: COLORS.teal.hero, label: "Coaching" },
  { percent: 10, color: COLORS.ui.gray, label: "Formal" },
];

export default function SeventyTwentyTenSection({ dark }: SeventyTwentyTenSectionProps) {
  const [showReferences, setShowReferences] = useState(false);

  // Dynamic colors
  const eyebrowColor = dark ? COLORS.ui.darkTxt : COLORS.purple.dark;
  const headingColor = dark ? COLORS.ui.darkTxt : COLORS.purple.hero;
  const bodyColor = dark ? COLORS.ui.darkBodyLift : COLORS.ui.nearBlack;
  const labelColor = dark ? COLORS.ui.darkBodyCopy : COLORS.ui.lightCopy;

  // Donut chart math (mobile)
  const size = 120;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const segmentData = SEGMENTS.map((seg) => {
    const offset = (cumulativePercent / 100) * circumference;
    const length = (seg.percent / 100) * circumference;
    cumulativePercent += seg.percent;
    return { ...seg, offset, length };
  });

  return (
    <>
      <section className="bg-white">
        <div className="max-w-container mx-auto px-6 md:px-8 py-12 md:py-16">
          {/* Header */}
          <p 
            className="text-eyebrow uppercase mb-4"
            style={{ color: eyebrowColor }}
          >
            THE 70:20:10 MODEL
          </p>
          <h2 
            className="text-headline-l mb-2"
            style={{ color: headingColor }}
          >
            Most learning doesn't get noticed
          </h2>
          <p 
            className="text-light-m max-w-[600px] mb-8"
            style={{ color: bodyColor }}
          >
            Research by McCall, Lombardo and Eichinger at the Centre for Creative Leadership.
          </p>

          {/* ═══ MOBILE: Donut + Key ═══ */}
          <div className="md:hidden">
            <div className="flex items-center justify-center gap-6 mb-6">
              {/* Donut */}
              <div className="shrink-0">
                <svg 
                  width={size} 
                  height={size} 
                  viewBox={`0 0 ${size} ${size}`}
                  className="-rotate-90"
                >
                  {segmentData.map((seg, i) => (
                    <circle
                      key={i}
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke={seg.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={`${seg.length} ${circumference - seg.length}`}
                      strokeDashoffset={-seg.offset}
                      strokeLinecap="butt"
                    />
                  ))}
                </svg>
              </div>

              {/* Key */}
              <div className="flex flex-col gap-2">
                {SEGMENTS.map((seg, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div 
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: seg.color }}
                    />
                    <span 
                      className="text-bold-s"
                      style={{ color: labelColor }}
                    >
                      {seg.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tagline — body copy, left aligned */}
            <p 
              className="text-light-m"
              style={{ color: bodyColor }}
            >
              Grrow makes on-the-job learning count.
            </p>
          </div>

          {/* ═══ DESKTOP: Bar chart ═══ */}
          <div className="hidden md:block">
            <div className="flex gap-1 mb-3">
              <div 
                className="h-12 rounded-lg flex items-center justify-center text-bold-s text-white"
                style={{ flex: 70, background: COLORS.purple.hero }}
              >
                Most learning happens on the job
              </div>
              <div 
                className="h-12 rounded-lg flex items-center justify-center text-bold-s text-white"
                style={{ flex: 20, background: COLORS.teal.hero }}
              >
                Coaching
              </div>
              <div 
                className="h-12 rounded-lg flex items-center justify-center text-bold-s"
                style={{ 
                  flex: 10, 
                  background: dark ? "rgba(255,255,255,0.1)" : COLORS.ui.gray,
                  color: dark ? COLORS.ui.darkMuted : COLORS.ui.lightMuted,
                }}
              >
                Formal
              </div>
            </div>

            {/* Bracket */}
            <div className="flex items-start h-9 mt-2">
              <div className="flex" style={{ flex: 90 }}>
                <div 
                  className="w-0.5 h-3 rounded-sm"
                  style={{ background: COLORS.purple.hero }}
                />
                <div 
                  className="flex-1 h-0.5 mt-2.5"
                  style={{ background: COLORS.purple.hero }}
                />
                <div 
                  className="text-bold-s px-4 whitespace-nowrap"
                  style={{ color: COLORS.purple.hero }}
                >
                  Grrow makes it count
                </div>
                <div 
                  className="flex-1 h-0.5 mt-2.5"
                  style={{ background: COLORS.purple.hero }}
                />
                <div 
                  className="w-0.5 h-3 rounded-sm"
                  style={{ background: COLORS.purple.hero }}
                />
              </div>
              <div style={{ flex: 10 }} />
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-10 md:mt-12">
            <ButtonPrimary
              color="teal"
              onClick={() => setShowReferences(true)}
            >
              See all the science
            </ButtonPrimary>
          </div>
        </div>
      </section>

      <ReferencesModal
        isOpen={showReferences}
        onClose={() => setShowReferences(false)}
        dark={dark}
      />
    </>
  );
}
