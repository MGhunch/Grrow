"use client";

import React, { useState, useCallback } from "react";
import { Check } from "lucide-react";
import { COLORS, familyAlpha } from "@/lib/colors";
import CloseButton from "../shared/CloseButton";
import { ButtonPrimary } from "../shared/Button";
import StrengthIcon from "../shared/StrengthIcon";
import { QuizFlow, type PhaseInfo } from "./QuizFlow";
import { MODAL, FAMILY_ACCENT, CIRCLE_DISPLAY, getScoreState } from "./shared";
import type { Circle, StrengthName } from "@/lib/types";
import type { ColourFamily } from "@/lib/scoring";

// ── Circle Dot Icon ─────────────────────────────────────────────────────

function CircleDotIcon({ stage, size = 44 }: { stage: 1 | 2 | 3 | 4; size?: number }) {
  const dotRadii = [5, 8, 12, 16];
  const dotRadius = dotRadii[stage - 1];
  const circleRadius = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={circleRadius} cy={circleRadius} r={circleRadius} fill={COLORS.purple.hero} />
      <circle cx={circleRadius} cy={circleRadius} r={dotRadius} fill={COLORS.teal.hero} />
    </svg>
  );
}

// ── Types ────────────────────────────────────────────────────────────────

type Phase = "selecting" | "quizzing" | "complete";

interface SkillsetResult {
  skillset: {
    circle: string;
    strength: string;
    skillset: string;
  };
  score: number;
  answers: string[];
}

interface Props {
  dark: boolean;
  onClose: () => void;
}

// ── Ring data ────────────────────────────────────────────────────────────

const RING_DESCRIPTIONS: {
  name: string;
  circle: Circle;
  tagline: string;
  hint: string;
  stage: 1 | 2 | 3 | 4;
}[] = [
  {
    name: "Essentials",
    circle: "ESSENTIALS",
    tagline: "Start strong. Build trust.",
    hint: "First year or so in your career.",
    stage: 1,
  },
  {
    name: "Exploring",
    circle: "EXPLORING",
    tagline: "Own it and improve it.",
    hint: "A few years in, owning your own work.",
    stage: 2,
  },
  {
    name: "Influencing",
    circle: "INFLUENCING",
    tagline: "Shape it and ship it.",
    hint: "Leading a team or major projects.",
    stage: 3,
  },
  {
    name: "Leading",
    circle: "LEADING",
    tagline: "Set the standard. Raise the bar.",
    hint: "Leading leaders. Shaping the business.",
    stage: 4,
  },
];

// ── Component ────────────────────────────────────────────────────────────

export default function QuizEntryAll({ dark, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("selecting");
  const [selectedCircle, setSelectedCircle] = useState<Circle>("ESSENTIALS");
  const [results, setResults] = useState<SkillsetResult[] | null>(null);
  const [selectedRing, setSelectedRing] = useState<number | null>(null);
  const [hoveredHelp, setHoveredHelp] = useState<number | null>(null);
  const [completedCircles, setCompletedCircles] = useState<Circle[]>([]);
  const [quizPhaseInfo, setQuizPhaseInfo] = useState<PhaseInfo | null>(null);
  const [showNudge, setShowNudge] = useState(false);

  const CIRCLE_ORDER: Circle[] = ["ESSENTIALS", "EXPLORING", "INFLUENCING", "LEADING"];
  const currentIndex = CIRCLE_ORDER.indexOf(selectedCircle);

  const averageScore = results
    ? results.reduce((sum, r) => sum + r.score, 0) / results.length
    : 0;
  const isGrowing = averageScore >= 51;

  const getNextCircle = (): { circle: Circle | null; direction: "up" | "down" | "done" } => {
    if (isGrowing) {
      if (currentIndex < 3) {
        return { circle: CIRCLE_ORDER[currentIndex + 1], direction: "up" };
      }
      return { circle: null, direction: "done" };
    } else {
      if (currentIndex > 0) {
        return { circle: CIRCLE_ORDER[currentIndex - 1], direction: "down" };
      }
      return { circle: "ESSENTIALS", direction: "down" };
    }
  };

  const { circle: targetCircle, direction } = getNextCircle();

  // ── Mode-aware colours ─────────────────────────────────────────────────
  const mode = dark ? "dark" : "light";

  // ── Full bleed modal when in transition phase ──────────────────────────
  const isFullBleed = phase === "quizzing" && quizPhaseInfo?.phase === "transition";
  const fullBleedBg = quizPhaseInfo ? FAMILY_ACCENT[quizPhaseInfo.family] : COLORS.purple.hero;

  const handleStartQuiz = () => {
    if (selectedRing === null) {
      setShowNudge(true);
      setTimeout(() => setShowNudge(false), 600);
      return;
    }
    setSelectedCircle(RING_DESCRIPTIONS[selectedRing].circle);
    setPhase("quizzing");
  };

  const handleQuizComplete = (data: SkillsetResult[]) => {
    setResults(data);
    setCompletedCircles((prev) => [...prev, selectedCircle]);
    setQuizPhaseInfo(null);
    setPhase("complete");
  };

  const handleNextCircle = () => {
    if (!targetCircle || direction === "done") return;
    setSelectedCircle(targetCircle);
    setResults(null);
    setPhase("quizzing");
  };

  const handleQuizPhaseChange = useCallback((info: PhaseInfo) => {
    setQuizPhaseInfo(info);
  }, []);

  // ── Selecting Phase ────────────────────────────────────────────────────

  const renderSelecting = () => (
    <>
      {/* Headline */}
      <h2 className="text-headline-m text-purple-hero mt-2 mb-8">
        Choose your circle
      </h2>

      {/* Circle cards */}
      <div className={`flex flex-col gap-2.5 mb-8 ${showNudge ? "animate-nudge" : ""}`}>
        {RING_DESCRIPTIONS.map((ring, i) => {
          const isSelected = selectedRing === i;
          const isHelpHovered = hoveredHelp === i;
          const cardBg = dark ? COLORS.ui.darkCard : "#F9F8FC";

          return (
            <div key={ring.name} className="relative">
              <button
                type="button"
                onClick={() => setSelectedRing(i)}
                className="flex items-center gap-4 px-5 py-4 rounded-xl w-full text-left cursor-pointer transition-all duration-150"
                style={{
                  background: cardBg,
                  border: isSelected
                    ? `2px solid ${COLORS.purple.hero}`
                    : "2px solid transparent",
                  boxShadow: isSelected
                    ? `0 4px 16px ${familyAlpha("purple", "shadow2", mode)}`
                    : "none",
                  transform: isSelected ? "translateY(-2px)" : "none",
                }}
              >
                <CircleDotIcon stage={ring.stage} size={44} />

                <span
                  className="text-bold-l flex-1"
                  style={{ color: isSelected ? COLORS.purple.dark : COLORS.purple.hero }}
                >
                  {ring.name}
                </span>

                {/* Help icon */}
                <div
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setHoveredHelp(i);
                  }}
                  onMouseLeave={() => setHoveredHelp(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoveredHelp(hoveredHelp === i ? null : i);
                  }}
                  className="w-[22px] h-[22px] rounded-full flex items-center justify-center cursor-pointer shrink-0"
                  style={{ border: `1.5px solid ${COLORS.purple.learning}` }}
                >
                  <span className="text-[12px] font-semibold text-purple-growing">?</span>
                </div>
              </button>

              {/* Tooltip */}
              {isHelpHovered && (
                <div
                  className="absolute right-5 top-full mt-1.5 p-3.5 rounded-lg w-[200px] z-10"
                  style={{
                    background: COLORS.purple.hero,
                    color: COLORS.ui.white,
                    boxShadow: `0 4px 12px ${familyAlpha("purple", "shadow2", mode)}`,
                  }}
                >
                  <div className="text-bold-s mb-1">{ring.tagline}</div>
                  <div className="text-std-s opacity-85">{ring.hint}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-4 md:mt-0">
        <ButtonPrimary color="teal" onClick={handleStartQuiz}>
          Start your quiz
        </ButtonPrimary>
      </div>
    </>
  );

  // ── Quizzing Phase ─────────────────────────────────────────────────────

  const renderQuizzing = () => (
    <QuizFlow
      initialCircle={selectedCircle}
      onPhaseChange={handleQuizPhaseChange}
      onComplete={handleQuizComplete}
      onClose={onClose}
    />
  );

  // ── Complete Phase ─────────────────────────────────────────────────────

  const renderComplete = () => {
    const timesCompleted = completedCircles.filter((c) => c === selectedCircle).length;
    const isSecondTime = timesCompleted > 1;
    const showKFG = isSecondTime || direction === "done";

    return (
      <div>
        {/* Header with tick */}
        <div className="flex items-center gap-4 mb-9">
          <div className="w-12 h-12 rounded-full bg-purple-hero flex items-center justify-center shrink-0">
            <Check size={26} strokeWidth={3} color={COLORS.ui.white} />
          </div>
          <h2 className="text-headline-l text-purple-hero m-0">
            {CIRCLE_DISPLAY[selectedCircle]}
          </h2>
        </div>

        {/* Result cards */}
        <div className="flex flex-col gap-3 mb-9">
          {results?.map((r, i) => {
            const isPurple =
              r.skillset.strength === "Curiosity" || r.skillset.strength === "Critical Thinking";
            const accent = isPurple ? COLORS.purple.hero : COLORS.teal.hero;
            const cardBg = isPurple
              ? dark
                ? familyAlpha("purple", "wash", "dark")
                : "#F5F3FF"
              : dark
                ? familyAlpha("teal", "wash", "dark")
                : "#F0FBF8";
            const trackColor = isPurple ? COLORS.purple.notYet : COLORS.teal.notYet;

            const { label, fill } = getScoreState(r.score);

            const getBarColor = () => {
              const colors = isPurple ? COLORS.purple : COLORS.teal;
              if (r.score <= 25) return colors.notYet;
              if (r.score <= 50) return colors.learning;
              if (r.score <= 75) return colors.growing;
              return colors.hero;
            };

            return (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-[18px] rounded-xl"
                style={{
                  background: cardBg,
                  border: `1.5px solid ${accent}`,
                }}
              >
                <StrengthIcon
                  strength={r.skillset.strength as StrengthName}
                  size="md"
                  variant="shaded"
                />

                <span className="text-bold-l flex-1" style={{ color: accent }}>
                  {r.skillset.skillset}
                </span>

                {/* Score bar */}
                <div
                  className="w-[60px] h-1.5 rounded-sm overflow-hidden shrink-0"
                  style={{ background: trackColor }}
                >
                  <div
                    className="h-full rounded-sm transition-[width] duration-300 ease-out"
                    style={{
                      width: `${fill}%`,
                      background: getBarColor(),
                    }}
                  />
                </div>

                {/* Score label */}
                <span className="text-std-m font-semibold min-w-[70px] text-right" style={{ color: accent }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <ButtonPrimary color="teal" onClick={showKFG ? onClose : handleNextCircle}>
            {showKFG
              ? "Keep. Focus. Grow."
              : direction === "up"
                ? `Let's look at ${RING_DESCRIPTIONS.find((r) => r.circle === targetCircle)?.name}`
                : `Check in on ${RING_DESCRIPTIONS.find((r) => r.circle === targetCircle)?.name}`}
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  // ── Modal ──────────────────────────────────────────────────────────────

  const backdropBg = dark ? "bg-black/85" : "bg-[rgba(20,16,48,0.5)]";
  const modalBg = dark ? COLORS.ui.deepNavy : COLORS.ui.white;
  const modalBorder = dark ? COLORS.ui.darkBorder : COLORS.ui.lightBorder;
  const modalShadow = dark
    ? "0 32px 80px rgba(0,0,0,0.7)"
    : `0 32px 80px ${familyAlpha("purple", "shadow2", mode)}`;

  return (
    <div
      className={`
        fixed inset-0 z-[100]
        ${backdropBg} backdrop-blur-sm
        flex items-center justify-center
        p-6 overflow-y-auto
        animate-fade-in
      `}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full max-w-[540px] min-h-[560px] max-h-[90vh]
          overflow-y-auto rounded-2xl relative
          animate-slide-up
          ${isFullBleed ? "" : "p-6 md:px-10 md:pt-14 md:pb-12"}
        `}
        style={{
          background: isFullBleed ? fullBleedBg : modalBg,
          border: isFullBleed ? "none" : `1px solid ${modalBorder}`,
          boxShadow: modalShadow,
        }}
      >
        {phase !== "quizzing" && (
          <div className="absolute top-5 right-5 z-10">
            <CloseButton onClose={onClose} accentColor={COLORS.teal.hero} size={28} />
          </div>
        )}

        {phase === "selecting" && renderSelecting()}
        {phase === "quizzing" && renderQuizzing()}
        {phase === "complete" && renderComplete()}
      </div>
    </div>
  );
}
