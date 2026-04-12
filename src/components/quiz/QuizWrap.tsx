"use client";

import React, { useState, useCallback } from "react";
import { Check, Sparkles, Network, Waves, GitBranch } from "lucide-react";
import { COLORS, familyAlpha } from "@/lib/colors";
import { STRENGTH_FAMILY, getSkillsetsForQuiz } from "@/lib/questions";
import {
  findGapStrength,
  findStretchStrength,
  calculateStrengthScores,
  suggestKFG,
  type SkillsetScore,
  type KFGSuggestion,
  type GapStretchResult,
} from "@/lib/gapStretch";
import CloseButton from "../shared/CloseButton";
import { ButtonPrimary } from "../shared/Button";
import { QuizFlow, type PhaseInfo } from "./QuizFlow";
import { MODAL, FAMILY_ACCENT, CIRCLE_DISPLAY, getScoreState } from "./shared";
import type { Circle, StrengthName } from "@/lib/types";
import type { ColourFamily } from "@/lib/scoring";

// ── Strength Icons ─────────────────────────────────────────────────────

const STRENGTH_ICONS: Record<StrengthName, React.ReactNode> = {
  Curiosity: <Sparkles size={20} strokeWidth={1.75} />,
  Collaboration: <Network size={20} strokeWidth={1.75} />,
  Communication: <Waves size={20} strokeWidth={1.75} />,
  "Critical Thinking": <GitBranch size={20} strokeWidth={1.75} />,
};

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

type Phase = 
  | "selecting" 
  | "quizzing" 
  | "circleResults" 
  | "gapTransition"
  | "gapQuiz" 
  | "stretchTransition"
  | "stretchQuiz" 
  | "kfg";

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

export default function QuizWrap({ dark, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("selecting");
  const [selectedCircle, setSelectedCircle] = useState<Circle>("ESSENTIALS");
  const [baseResults, setBaseResults] = useState<SkillsetResult[] | null>(null);
  const [gapResults, setGapResults] = useState<SkillsetResult[] | null>(null);
  const [stretchResults, setStretchResults] = useState<SkillsetResult[] | null>(null);
  const [selectedRing, setSelectedRing] = useState<number | null>(null);
  const [hoveredHelp, setHoveredHelp] = useState<number | null>(null);
  const [quizPhaseInfo, setQuizPhaseInfo] = useState<PhaseInfo | null>(null);
  const [showNudge, setShowNudge] = useState(false);
  
  // Gap/stretch tracking
  const [gapInfo, setGapInfo] = useState<GapStretchResult | null>(null);
  const [stretchInfo, setStretchInfo] = useState<GapStretchResult | null>(null);
  const [kfgSuggestion, setKfgSuggestion] = useState<KFGSuggestion | null>(null);

  // ── Mode-aware colours ─────────────────────────────────────────────────
  const mode = dark ? "dark" : "light";

  // ── Full bleed modal when in transition phase ──────────────────────────
  const isFullBleed = 
    (phase === "quizzing" || phase === "gapQuiz" || phase === "stretchQuiz") && 
    quizPhaseInfo?.phase === "transition";
  const fullBleedBg = quizPhaseInfo ? FAMILY_ACCENT[quizPhaseInfo.family] : COLORS.purple.hero;

  // ── Handlers ───────────────────────────────────────────────────────────

  const handleStartQuiz = () => {
    if (selectedRing === null) {
      setShowNudge(true);
      setTimeout(() => setShowNudge(false), 600);
      return;
    }
    setSelectedCircle(RING_DESCRIPTIONS[selectedRing].circle);
    setPhase("quizzing");
  };

  const handleBaseQuizComplete = (data: SkillsetResult[]) => {
    setBaseResults(data);
    setQuizPhaseInfo(null);
    
    // Calculate strength scores for gap/stretch detection
    const skillsetScores: SkillsetScore[] = data.map(r => ({
      skillset: r.skillset.skillset,
      strength: r.skillset.strength as StrengthName,
      circle: r.skillset.circle as Circle,
      score: r.score,
    }));
    
    const strengthScores = calculateStrengthScores(skillsetScores);
    const gap = findGapStrength(strengthScores, selectedCircle);
    const stretch = findStretchStrength(strengthScores, selectedCircle);
    
    setGapInfo(gap);
    setStretchInfo(stretch);
    
    setPhase("circleResults");
  };

  const handleGapQuizComplete = (data: SkillsetResult[]) => {
    setGapResults(data);
    setQuizPhaseInfo(null);
    
    // Check if there's a stretch to do
    if (stretchInfo) {
      setPhase("stretchTransition");
    } else {
      calculateAndShowKFG();
    }
  };

  const handleStretchQuizComplete = (data: SkillsetResult[]) => {
    setStretchResults(data);
    setQuizPhaseInfo(null);
    calculateAndShowKFG();
  };

  const calculateAndShowKFG = () => {
    // Combine all results
    const allResults = [
      ...(baseResults || []),
      ...(gapResults || []),
      ...(stretchResults || []),
    ];
    
    const skillsetScores: SkillsetScore[] = allResults.map(r => ({
      skillset: r.skillset.skillset,
      strength: r.skillset.strength as StrengthName,
      circle: r.skillset.circle as Circle,
      score: r.score,
    }));
    
    const suggestion = suggestKFG(skillsetScores);
    setKfgSuggestion(suggestion);
    setPhase("kfg");
  };

  const handleCircleResultsContinue = () => {
    if (gapInfo) {
      setPhase("gapTransition");
    } else if (stretchInfo) {
      setPhase("stretchTransition");
    } else {
      calculateAndShowKFG();
    }
  };

  const handleGapTransitionContinue = () => {
    setPhase("gapQuiz");
  };

  const handleStretchTransitionContinue = () => {
    setPhase("stretchQuiz");
  };

  const handleQuizPhaseChange = useCallback((info: PhaseInfo) => {
    setQuizPhaseInfo(info);
  }, []);

  const handleShareResults = () => {
    // TODO: Send results to leader
    onClose();
  };

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

  // ── Quizzing Phases ─────────────────────────────────────────────────────

  const renderQuizzing = () => (
    <QuizFlow
      initialCircle={selectedCircle}
      onPhaseChange={handleQuizPhaseChange}
      onComplete={handleBaseQuizComplete}
      onClose={onClose}
    />
  );

  const renderGapQuiz = () => {
    if (!gapInfo) return null;
    
    // Get skillsets for the gap circle, filter to just the gap strength
    const allSkillsets = getSkillsetsForQuiz([gapInfo.targetCircle, gapInfo.targetCircle]);
    const skillsets = allSkillsets.filter(s => s.strength === gapInfo.strength);
    
    return (
      <QuizFlow
        skillsets={skillsets}
        onPhaseChange={handleQuizPhaseChange}
        onComplete={handleGapQuizComplete}
        onClose={onClose}
      />
    );
  };

  const renderStretchQuiz = () => {
    if (!stretchInfo) return null;
    
    // Get skillsets for the stretch circle, filter to just the stretch strength
    const allSkillsets = getSkillsetsForQuiz([stretchInfo.targetCircle, stretchInfo.targetCircle]);
    const skillsets = allSkillsets.filter(s => s.strength === stretchInfo.strength);
    
    return (
      <QuizFlow
        skillsets={skillsets}
        onPhaseChange={handleQuizPhaseChange}
        onComplete={handleStretchQuizComplete}
        onClose={onClose}
      />
    );
  };

  // ── Circle Results Phase ────────────────────────────────────────────────

  const renderCircleResults = () => {
    if (!baseResults) return null;

    // Determine button copy
    const hasGapOrStretch = gapInfo || stretchInfo;
    const buttonCopy = hasGapOrStretch ? "Let's dig deeper" : "See your results";

    return (
      <div>
        {/* Header with tick */}
        <div className="flex items-center gap-4 mb-7">
          <div className="w-10 h-10 rounded-full bg-teal-hero flex items-center justify-center shrink-0">
            <Check size={22} strokeWidth={3} color={COLORS.ui.white} />
          </div>
          <h2 className="text-headline-l text-teal-hero m-0">
            {CIRCLE_DISPLAY[selectedCircle]}
          </h2>
        </div>

        {/* Result cards — gray rows, same-family progress rings */}
        <div className="flex flex-col gap-2.5 mb-7">
          {baseResults.map((r, i) => {
            const strength = r.skillset.strength as StrengthName;
            const family: ColourFamily = STRENGTH_FAMILY[strength];
            const isPurple = family === "purple";
            
            // Family colours
            const accent = isPurple ? COLORS.purple.hero : COLORS.teal.hero;
            const paleBg = isPurple ? COLORS.purple.notYet : COLORS.teal.notYet;
            
            const { label } = getScoreState(r.score);
            
            // Ring progress calculation
            const ringSize = 44;
            const sw = 4;
            const radius = (ringSize - sw) / 2;
            const circumference = 2 * Math.PI * radius;
            const progress = r.score / 100;
            const strokeDashoffset = circumference * (1 - progress);

            return (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                style={{ background: "#F9F8FC" }}
              >
                {/* Icon with progress ring */}
                <div
                  className="relative shrink-0"
                  style={{ width: ringSize, height: ringSize }}
                >
                  {/* Pale family background circle */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{ background: paleBg }}
                  />
                  {/* Progress ring */}
                  <svg
                    width={ringSize}
                    height={ringSize}
                    viewBox={`0 0 ${ringSize} ${ringSize}`}
                    className="-rotate-90 relative"
                  >
                    {/* Track */}
                    <circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={radius}
                      fill="none"
                      stroke={COLORS.ui.gray}
                      strokeWidth={sw}
                    />
                    {/* Progress fill — family hero */}
                    <circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={radius}
                      fill="none"
                      stroke={accent}
                      strokeWidth={sw}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-[stroke-dashoffset] duration-300 ease-out"
                    />
                  </svg>
                  {/* Icon — family hero */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ color: accent }}
                  >
                    {STRENGTH_ICONS[strength]}
                  </div>
                </div>

                {/* Skillset name + strength */}
                <div className="flex-1 min-w-0">
                  <span className="text-bold-m md:text-bold-l block truncate" style={{ color: accent }}>
                    {r.skillset.skillset}
                  </span>
                  <span className="text-std-s text-ui-muted truncate block">
                    {r.skillset.strength}
                  </span>
                </div>

                {/* State label */}
                <span className="text-bold-s md:text-bold-m shrink-0" style={{ color: accent }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <ButtonPrimary color="teal" onClick={handleCircleResultsContinue}>
            {buttonCopy}
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  // ── Gap Transition ──────────────────────────────────────────────────────

  const renderGapTransition = () => {
    if (!gapInfo) return null;

    const family = STRENGTH_FAMILY[gapInfo.strength];
    const bgClass = family === "purple" ? "bg-purple-hero" : "bg-teal-hero";
    const accentColor = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;

    // Bigger icon for transition screens
    const IconComponent = {
      Curiosity: <Sparkles size={32} strokeWidth={1.75} />,
      Collaboration: <Network size={32} strokeWidth={1.75} />,
      Communication: <Waves size={32} strokeWidth={1.75} />,
      "Critical Thinking": <GitBranch size={32} strokeWidth={1.75} />,
    }[gapInfo.strength];

    return (
      <div
        className={`
          ${bgClass}
          flex flex-col items-center justify-center
          min-h-[560px]
          text-center
          p-6 md:px-10 md:pt-14 md:pb-12
          rounded-2xl
          relative
        `}
      >
        <div className="absolute top-5 right-5 z-10">
          <CloseButton onClose={onClose} accentColor="#FFFFFF" size={28} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center max-w-[340px]">
          {/* Icon — bigger */}
          <div 
            className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6"
            style={{ color: COLORS.ui.white }}
          >
            {IconComponent}
          </div>

          <h2 className="text-headline-m text-white mb-4">
            {gapInfo.strength}
          </h2>

          <p className="text-std-l text-white/85 leading-relaxed mb-8">
            You're still building <span className="font-semibold text-white">{gapInfo.strength}</span>, so let's check in on{" "}
            <span className="font-semibold text-white">{CIRCLE_DISPLAY[gapInfo.targetCircle]}</span>.
          </p>

          <ButtonPrimary
            color={family}
            onClick={handleGapTransitionContinue}
            style={{
              backgroundColor: "#FFFFFF",
              color: accentColor,
            }}
          >
            Let's go
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  // ── Stretch Transition ──────────────────────────────────────────────────

  const renderStretchTransition = () => {
    if (!stretchInfo) return null;

    const family = STRENGTH_FAMILY[stretchInfo.strength];
    const bgClass = family === "purple" ? "bg-purple-hero" : "bg-teal-hero";
    const accentColor = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;

    // Bigger icon for transition screens
    const IconComponent = {
      Curiosity: <Sparkles size={32} strokeWidth={1.75} />,
      Collaboration: <Network size={32} strokeWidth={1.75} />,
      Communication: <Waves size={32} strokeWidth={1.75} />,
      "Critical Thinking": <GitBranch size={32} strokeWidth={1.75} />,
    }[stretchInfo.strength];

    return (
      <div
        className={`
          ${bgClass}
          flex flex-col items-center justify-center
          min-h-[560px]
          text-center
          p-6 md:px-10 md:pt-14 md:pb-12
          rounded-2xl
          relative
        `}
      >
        <div className="absolute top-5 right-5 z-10">
          <CloseButton onClose={onClose} accentColor="#FFFFFF" size={28} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center max-w-[340px]">
          {/* Icon — bigger */}
          <div 
            className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6"
            style={{ color: COLORS.ui.white }}
          >
            {IconComponent}
          </div>

          <h2 className="text-headline-m text-white mb-4">
            {stretchInfo.strength}
          </h2>

          <p className="text-std-l text-white/85 leading-relaxed mb-8">
            You're nailing <span className="font-semibold text-white">{stretchInfo.strength}</span> — ready to try{" "}
            <span className="font-semibold text-white">{CIRCLE_DISPLAY[stretchInfo.targetCircle]}</span>?
          </p>

          <ButtonPrimary
            color={family}
            onClick={handleStretchTransitionContinue}
            style={{
              backgroundColor: "#FFFFFF",
              color: accentColor,
            }}
          >
            Let's go
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  // ── KFG Phase ───────────────────────────────────────────────────────────

  const renderKFG = () => {
    if (!kfgSuggestion) return null;

    const renderKFGRow = (
      category: "keep" | "focus" | "grow",
      data: SkillsetScore,
      tooltip: string
    ) => {
      const family = STRENGTH_FAMILY[data.strength];
      const accent = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;
      const paleBg = family === "purple" ? COLORS.purple.notYet : COLORS.teal.notYet;

      const categoryLabels: Record<string, string> = {
        keep: "KEEP",
        focus: "FOCUS",
        grow: "GROW",
      };

      return (
        <div
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
          style={{ background: "#F9F8FC" }}
        >
          {/* Left: Icon in pale family circle */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{ background: paleBg, color: accent }}
          >
            {STRENGTH_ICONS[data.strength]}
          </div>

          {/* Middle: Skillset + Circle */}
          <div className="flex-1 min-w-0">
            <span className="text-bold-m md:text-bold-l block truncate" style={{ color: accent }}>
              {data.skillset}
            </span>
            <span className="text-std-s text-ui-muted truncate block">
              {CIRCLE_DISPLAY[data.circle]}
            </span>
          </div>

          {/* Right: Category pill with tooltip */}
          <span 
            className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full cursor-help shrink-0"
            style={{ background: accent, color: COLORS.ui.white }}
            title={tooltip}
          >
            {categoryLabels[category]}
          </span>
        </div>
      );
    };

    return (
      <div>
        {/* Header */}
        <h2 className="text-headline-m text-purple-hero mb-3">
          What's next?
        </h2>
        <p className="text-std-m text-ui-muted mb-6 leading-relaxed">
          Next up, compare notes and choose three focus areas. Here's a starter for ten.
        </p>

        {/* KFG Rows */}
        <div className="flex flex-col gap-2.5 mb-7">
          {renderKFGRow("keep", kfgSuggestion.keep, "A genuine strength. Keep growing it.")}
          {renderKFGRow("focus", kfgSuggestion.focus, "The most important area to focus on right now.")}
          {renderKFGRow("grow", kfgSuggestion.grow, "Clear potential, look for opportunities here.")}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <ButtonPrimary color="teal" onClick={handleShareResults}>
            Time to chat
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

  // Full bleed for transition screens
  const isTransitionPhase = 
    phase === "gapTransition" || 
    phase === "stretchTransition" ||
    isFullBleed;

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
          ${isTransitionPhase ? "" : "p-6 md:px-10 md:pt-14 md:pb-12"}
        `}
        style={{
          background: isTransitionPhase ? (isFullBleed ? fullBleedBg : "transparent") : modalBg,
          border: isTransitionPhase ? "none" : `1px solid ${modalBorder}`,
          boxShadow: modalShadow,
        }}
      >
        {/* Close button — only show for non-quiz, non-transition phases */}
        {phase !== "quizzing" && 
         phase !== "gapQuiz" && 
         phase !== "stretchQuiz" && 
         phase !== "gapTransition" && 
         phase !== "stretchTransition" && (
          <div className="absolute top-5 right-5 z-10">
            <CloseButton onClose={onClose} accentColor={COLORS.teal.hero} size={28} />
          </div>
        )}

        {phase === "selecting" && renderSelecting()}
        {phase === "quizzing" && renderQuizzing()}
        {phase === "circleResults" && renderCircleResults()}
        {phase === "gapTransition" && renderGapTransition()}
        {phase === "gapQuiz" && renderGapQuiz()}
        {phase === "stretchTransition" && renderStretchTransition()}
        {phase === "stretchQuiz" && renderStretchQuiz()}
        {phase === "kfg" && renderKFG()}
      </div>
    </div>
  );
}
