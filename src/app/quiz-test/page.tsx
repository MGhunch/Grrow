"use client";

import { useState } from "react";
import { Check, Sparkles, Network, Waves, GitBranch } from "lucide-react";
import { COLORS, familyAlpha } from "@/lib/colors";
import { STRENGTH_FAMILY } from "@/lib/questions";
import CloseButton from "../../components/shared/CloseButton";
import { ButtonPrimary, ButtonSecondary } from "../../components/shared/Button";
import CircleSimple from "../../components/circle/CircleSimple";
import type { Circle, StrengthName } from "@/lib/types";
import type { ColourFamily } from "@/lib/scoring";

// ── Test Page ─────────────────────────────────────────────────────────────

type TestPhase = 
  | "selecting"
  | "transition"
  | "question"
  | "circleResults" 
  | "gapTransition" 
  | "stretchTransition" 
  | "kfg";

const PHASE_GROUPS = [
  { label: "Entry", phases: ["selecting"] },
  { label: "Quiz", phases: ["transition", "question"] },
  { label: "Results", phases: ["circleResults", "gapTransition", "stretchTransition", "kfg"] },
];

const PHASE_LABELS: Record<TestPhase, string> = {
  selecting: "Circle Selection",
  transition: "Transition",
  question: "Question",
  circleResults: "Circle Results",
  gapTransition: "Gap Transition",
  stretchTransition: "Stretch Transition",
  kfg: "KFG",
};

export default function QuizTestPage() {
  const [phase, setPhase] = useState<TestPhase>("selecting");

  // Full bleed phases (coloured backgrounds)
  const isFullBleed = ["transition", "gapTransition", "stretchTransition"].includes(phase);

  const renderPhase = (viewport: "mobile" | "desktop") => {
    const key = `${phase}-${viewport}`;
    switch (phase) {
      case "selecting": return <MockSelecting key={key} />;
      case "transition": return <MockTransition key={key} />;
      case "question": return <MockQuestion key={key} />;
      case "circleResults": return <MockCircleResults key={key} />;
      case "gapTransition": return <MockGapTransition key={key} />;
      case "stretchTransition": return <MockStretchTransition key={key} />;
      case "kfg": return <MockKFG key={key} />;
    }
  };

  const modalStyle = {
    background: isFullBleed ? "transparent" : COLORS.ui.white,
    border: isFullBleed ? "none" : `1px solid ${COLORS.ui.lightBorder}`,
    boxShadow: `0 24px 60px ${familyAlpha("purple", "shadow2")}`,
  };

  return (
    <div className="min-h-screen bg-ui-hover p-6 pb-16">
      {/* Phase selector */}
      <div className="max-w-[1100px] mx-auto mb-8">
        <h1 className="text-headline-m text-purple-hero mb-4">Quiz Phase Tester</h1>
        
        {PHASE_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="text-eyebrow text-ui-muted mb-2">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.phases.map((p) => (
                <PhaseButton
                  key={p}
                  label={PHASE_LABELS[p as TestPhase]}
                  active={phase === p}
                  onClick={() => setPhase(p as TestPhase)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Side by side previews */}
      <div className="max-w-[1100px] mx-auto flex gap-8 items-start justify-center flex-wrap">
        {/* Mobile */}
        <div className="flex flex-col items-center">
          <p className="text-eyebrow text-ui-muted mb-3">MOBILE · 375px</p>
          <div
            className="rounded-2xl relative overflow-hidden"
            style={{ width: 375, minHeight: 560, ...modalStyle }}
          >
            {renderPhase("mobile")}
          </div>
        </div>

        {/* Desktop */}
        <div className="flex flex-col items-center">
          <p className="text-eyebrow text-ui-muted mb-3">DESKTOP · 540px</p>
          <div
            className="rounded-2xl relative overflow-hidden"
            style={{ width: 540, minHeight: 560, ...modalStyle }}
          >
            {renderPhase("desktop")}
          </div>
        </div>
      </div>
    </div>
  );
}

function PhaseButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-std-m font-medium transition-all"
      style={{
        background: active ? COLORS.purple.hero : COLORS.ui.white,
        color: active ? COLORS.ui.white : COLORS.purple.hero,
        border: `1.5px solid ${COLORS.purple.hero}`,
      }}
    >
      {label}
    </button>
  );
}

// ── Shared ────────────────────────────────────────────────────────────────

const STRENGTH_ICONS: Record<StrengthName, React.ReactNode> = {
  Curiosity: <Sparkles size={20} strokeWidth={1.75} />,
  Collaboration: <Network size={20} strokeWidth={1.75} />,
  Communication: <Waves size={20} strokeWidth={1.75} />,
  "Critical Thinking": <GitBranch size={20} strokeWidth={1.75} />,
};

const CIRCLE_DISPLAY: Record<Circle, string> = {
  ESSENTIALS: "Essentials",
  EXPLORING: "Exploring",
  INFLUENCING: "Influencing",
  LEADING: "Leading",
};

const STRENGTH_TO_SEGMENT: Record<StrengthName, number> = {
  Collaboration: 0,
  Curiosity: 1,
  "Critical Thinking": 2,
  Communication: 3,
};

function getScoreState(score: number): string {
  if (score <= 25) return "Not yet";
  if (score <= 50) return "Learning";
  if (score <= 75) return "Growing";
  return "Nailing it";
}

// ── Mock Data ─────────────────────────────────────────────────────────────

const MOCK_RESULTS = [
  { skillset: "Challenge", strength: "Curiosity" as StrengthName, circle: "EXPLORING" as Circle, score: 44 },
  { skillset: "Connect", strength: "Collaboration" as StrengthName, circle: "EXPLORING" as Circle, score: 66 },
  { skillset: "Navigate", strength: "Communication" as StrengthName, circle: "EXPLORING" as Circle, score: 88 },
  { skillset: "Simplify", strength: "Critical Thinking" as StrengthName, circle: "EXPLORING" as Circle, score: 55 },
];

const MOCK_GAP = {
  strength: "Curiosity" as StrengthName,
  skillset: "Question",
  targetCircle: "ESSENTIALS" as Circle,
};

const MOCK_STRETCH = {
  strength: "Communication" as StrengthName,
  skillset: "Persuade",
  targetCircle: "INFLUENCING" as Circle,
};

const MOCK_KFG = {
  keep: { skillset: "Navigate", strength: "Communication" as StrengthName, circle: "EXPLORING" as Circle, score: 88 },
  focus: { skillset: "Challenge", strength: "Curiosity" as StrengthName, circle: "EXPLORING" as Circle, score: 44 },
  grow: { skillset: "Persuade", strength: "Communication" as StrengthName, circle: "INFLUENCING" as Circle, score: 66 },
};

const RING_DESCRIPTIONS = [
  { name: "Essentials", circle: "ESSENTIALS" as Circle, tagline: "Start strong. Build trust.", hint: "First year or so in your career.", stage: 1 as const },
  { name: "Exploring", circle: "EXPLORING" as Circle, tagline: "Own it and improve it.", hint: "A few years in, owning your own work.", stage: 2 as const },
  { name: "Influencing", circle: "INFLUENCING" as Circle, tagline: "Shape it and ship it.", hint: "Leading a team or major projects.", stage: 3 as const },
  { name: "Leading", circle: "LEADING" as Circle, tagline: "Set the standard. Raise the bar.", hint: "Leading leaders. Shaping the business.", stage: 4 as const },
];

// ── Circle Dot Icon ───────────────────────────────────────────────────────

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

// ── Mock Selecting ────────────────────────────────────────────────────────

function MockSelecting() {
  const [selectedRing, setSelectedRing] = useState<number | null>(1);

  return (
    <div className="p-6 md:px-10 md:pt-14 md:pb-12">
      {/* Close button */}
      <div className="absolute top-5 right-5 z-10">
        <CloseButton onClose={() => {}} accentColor={COLORS.teal.hero} size={28} />
      </div>

      {/* Headline */}
      <h2 className="text-headline-m text-purple-hero mt-2 mb-8">Choose your circle</h2>

      {/* Circle cards */}
      <div className="flex flex-col gap-2.5 mb-8">
        {RING_DESCRIPTIONS.map((ring, i) => {
          const isSelected = selectedRing === i;
          const cardBg = "#F9F8FC";

          return (
            <button
              key={ring.name}
              type="button"
              onClick={() => setSelectedRing(i)}
              className="flex items-center gap-4 px-5 py-4 rounded-xl w-full text-left cursor-pointer transition-all duration-150"
              style={{
                background: cardBg,
                border: isSelected ? `2px solid ${COLORS.purple.hero}` : "2px solid transparent",
                boxShadow: isSelected ? `0 4px 16px ${familyAlpha("purple", "shadow2")}` : "none",
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
              <div
                className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0"
                style={{ border: `1.5px solid ${COLORS.purple.learning}` }}
              >
                <span className="text-[12px] font-semibold text-purple-growing">?</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <ButtonPrimary color="teal" onClick={() => {}}>
          Start your quiz
        </ButtonPrimary>
      </div>
    </div>
  );
}

// ── Mock Transition ───────────────────────────────────────────────────────

function MockTransition() {
  const currentSkillset = { skillset: "Challenge", strength: "Curiosity" as StrengthName, objective: "Do you question how things are done and seek ways to make them better?" };
  const family: ColourFamily = STRENGTH_FAMILY[currentSkillset.strength];
  const bgClass = family === "purple" ? "bg-purple-hero" : "bg-teal-hero";
  const accentColor = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;
  const activeQuadrant = STRENGTH_TO_SEGMENT[currentSkillset.strength];

  return (
    <div
      className={`
        ${bgClass}
        flex flex-col items-center
        min-h-[560px]
        text-center
        p-6 md:px-10 md:pt-14 md:pb-12
        rounded-2xl
        relative
      `}
    >
      {/* Close button */}
      <div className="absolute top-5 right-5 z-10">
        <CloseButton onClose={() => {}} accentColor="#FFFFFF" size={28} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Circle — matches real TransitionScreen */}
        <div className="mb-7 md:mb-8 md:hidden">
          <CircleSimple size={140} activeQuadrant={activeQuadrant} />
        </div>
        <div className="mb-7 md:mb-8 hidden md:block">
          <CircleSimple size={180} activeQuadrant={activeQuadrant} />
        </div>

        {/* Skillset name */}
        <h2 className="text-hero-xs text-white mb-4">{currentSkillset.skillset}</h2>

        {/* Objective */}
        <p className="text-std-l text-white/85 leading-relaxed max-w-[340px] mx-auto mb-8">
          {currentSkillset.objective}
        </p>

        {/* Button */}
        <ButtonPrimary
          color={family}
          onClick={() => {}}
          style={{ backgroundColor: "#FFFFFF", color: accentColor }}
        >
          Let's go
        </ButtonPrimary>
      </div>
    </div>
  );
}

// ── Mock Question ─────────────────────────────────────────────────────────

function MockQuestion() {
  const [selected, setSelected] = useState<string | null>("mostly");
  const [useTeal, setUseTeal] = useState(false);
  
  const strength: StrengthName = useTeal ? "Collaboration" : "Curiosity";
  const skillset = useTeal ? "Connect" : "Challenge";
  const questionText = useTeal 
    ? "Do you anticipate other people's needs and work to reduce wasted effort?"
    : "Do you question how things are done and look for ways to improve them?";
  const family: ColourFamily = STRENGTH_FAMILY[strength];
  
  const accent = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;
  const contrastFamily: ColourFamily = family === "purple" ? "teal" : "purple";
  const contrastAccent = contrastFamily === "purple" ? COLORS.purple.hero : COLORS.teal.hero;

  const OPTIONS = [
    { value: "not_really", label: "Not really", tooltip: "New territory for you." },
    { value: "sometimes", label: "Sometimes", tooltip: "You get it, but need a nudge." },
    { value: "mostly", label: "Mostly", tooltip: "You do it when you think of it." },
    { value: "intuitively", label: "Intuitively", tooltip: "You do it without thinking." },
  ];

  const cardBg = "#F9F8FC";

  return (
    <div className="flex flex-col flex-1 p-6 md:px-10 md:pt-14 md:pb-12 min-h-[560px]">
      {/* Close button — same family */}
      <div className="absolute top-5 right-5 z-10">
        <CloseButton onClose={() => {}} accentColor={accent} size={28} />
      </div>

      {/* Toggle for testing */}
      <button
        onClick={() => setUseTeal(!useTeal)}
        className="absolute top-5 left-5 px-2 py-1 rounded text-[10px] font-semibold z-10"
        style={{ 
          background: useTeal ? COLORS.teal.hero : COLORS.purple.hero,
          color: COLORS.ui.white 
        }}
      >
        {useTeal ? "TEAL" : "PURPLE"}
      </button>

      {/* Header — just skillset, no eyebrow */}
      <div className="mb-6 mt-4">
        <h2 className="text-headline-m" style={{ color: accent }}>
          {skillset}
        </h2>
      </div>

      {/* Question + options */}
      <div className="flex-1 flex flex-col">
        {/* Question text — lighter weight to match family */}
        <p className="text-std-l leading-relaxed mb-6" style={{ color: family === "purple" ? COLORS.purple.dark : COLORS.teal.dark }}>
          {questionText}
        </p>

        {/* Answer options — same family selection */}
        <div className="flex flex-col gap-2.5 mb-8">
          {OPTIONS.map((option) => {
            const isSelected = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelected(option.value)}
                className="flex items-center gap-4 px-5 py-4 rounded-xl w-full text-left cursor-pointer transition-all duration-150"
                style={{
                  background: isSelected ? accent : cardBg,
                  border: isSelected ? `2px solid ${accent}` : "2px solid transparent",
                  boxShadow: isSelected ? `0 4px 16px ${familyAlpha(family, "shadow2")}` : "none",
                  transform: isSelected ? "translateY(-2px)" : "none",
                }}
              >
                {/* Label + tooltip (tooltip only when selected) */}
                <div className="flex-1">
                  <span 
                    className="text-bold-m block"
                    style={{ color: isSelected ? COLORS.ui.white : accent }}
                  >
                    {option.label}
                  </span>
                  {isSelected && (
                    <span className="text-std-s mt-0.5 block text-white/80">
                      {option.tooltip}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div>
        <div className="text-eyebrow tracking-[0.08em] text-ui-muted mb-2">EXPLORING · 5 | 12</div>
        <div className="h-1.5 bg-gray rounded-sm overflow-hidden mb-6">
          <div className="h-full rounded-sm min-w-2" style={{ width: "42%", background: accent }} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <ButtonSecondary color={family} onClick={() => {}} style={{ padding: "10px 28px" }}>
            Back
          </ButtonSecondary>
          <ButtonPrimary color={family} onClick={() => {}} style={{ padding: "11px 36px" }}>
            Next
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

// ── Circle Results ────────────────────────────────────────────────────────

function MockCircleResults() {
  const selectedCircle: Circle = "EXPLORING";
  const hasGapOrStretch = true;
  const buttonCopy = hasGapOrStretch ? "Let's dig deeper" : "See your results";
  const cardBg = "#F9F8FC";

  return (
    <div className="p-6 md:px-10 md:pt-14 md:pb-12">
      {/* Close button */}
      <div className="absolute top-5 right-5 z-10">
        <CloseButton onClose={() => {}} accentColor={COLORS.teal.hero} size={28} />
      </div>

      {/* Header with tick */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-teal-hero flex items-center justify-center shrink-0">
          <Check size={22} strokeWidth={3} color={COLORS.ui.white} />
        </div>
        <h2 className="text-headline-m text-purple-hero">
          {CIRCLE_DISPLAY[selectedCircle]}
        </h2>
      </div>

      {/* Result rows — with progress rings */}
      <div className="flex flex-col gap-2.5 mb-8">
        {MOCK_RESULTS.map((r, i) => {
          const family: ColourFamily = STRENGTH_FAMILY[r.strength];
          const accent = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;
          const paleBg = family === "purple" ? COLORS.purple.notYet : COLORS.teal.notYet;
          const label = getScoreState(r.score);

          // Progress ring
          const ringSize = 44;
          const sw = 4;
          const radius = (ringSize - sw) / 2;
          const circumference = 2 * Math.PI * radius;
          const progress = r.score / 100;
          const strokeDashoffset = circumference * (1 - progress);

          return (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 md:px-5 md:py-4 rounded-xl"
              style={{ background: cardBg }}
            >
              {/* Icon with progress ring */}
              <div className="relative shrink-0" style={{ width: ringSize, height: ringSize }}>
                <svg
                  width={ringSize}
                  height={ringSize}
                  viewBox={`0 0 ${ringSize} ${ringSize}`}
                  className="-rotate-90"
                >
                  {/* Track */}
                  <circle
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                    r={radius}
                    fill={paleBg}
                    stroke={COLORS.ui.gray}
                    strokeWidth={sw}
                  />
                  {/* Progress */}
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
                  />
                </svg>
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: accent }}
                >
                  {STRENGTH_ICONS[r.strength]}
                </div>
              </div>

              {/* Skillset + strength */}
              <div className="flex-1 min-w-0">
                <span className="text-bold-m md:text-bold-l block truncate" style={{ color: accent }}>
                  {r.skillset}
                </span>
                <span className="text-std-s text-ui-muted truncate block">
                  {r.strength}
                </span>
              </div>

              {/* Score state */}
              <span className="text-bold-s md:text-bold-m shrink-0" style={{ color: accent }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <ButtonPrimary color="teal" onClick={() => {}}>
          {buttonCopy}
        </ButtonPrimary>
      </div>
    </div>
  );
}

// ── Gap Transition ────────────────────────────────────────────────────────

function MockGapTransition() {
  const family = STRENGTH_FAMILY[MOCK_GAP.strength];
  const bgClass = family === "purple" ? "bg-purple-hero" : "bg-teal-hero";
  const accentColor = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;

  // Bigger icon for this context
  const IconComponent = {
    Curiosity: <Sparkles size={32} strokeWidth={1.75} />,
    Collaboration: <Network size={32} strokeWidth={1.75} />,
    Communication: <Waves size={32} strokeWidth={1.75} />,
    "Critical Thinking": <GitBranch size={32} strokeWidth={1.75} />,
  }[MOCK_GAP.strength];

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
        <CloseButton onClose={() => {}} accentColor="#FFFFFF" size={28} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-[340px]">
        {/* Icon — bigger */}
        <div
          className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6"
          style={{ color: COLORS.ui.white }}
        >
          {IconComponent}
        </div>

        <h2 className="text-headline-m text-white mb-4">{MOCK_GAP.skillset}</h2>

        <p className="text-std-l text-white/85 leading-relaxed mb-8">
          You're still building <span className="font-semibold text-white">{MOCK_GAP.skillset}</span>, so let's check in on{" "}
          <span className="font-semibold text-white">{CIRCLE_DISPLAY[MOCK_GAP.targetCircle]}</span>.
        </p>

        <ButtonPrimary
          color={family}
          onClick={() => {}}
          style={{ backgroundColor: "#FFFFFF", color: accentColor }}
        >
          Let's go
        </ButtonPrimary>
      </div>
    </div>
  );
}

// ── Stretch Transition ────────────────────────────────────────────────────

function MockStretchTransition() {
  const family = STRENGTH_FAMILY[MOCK_STRETCH.strength];
  const bgClass = family === "purple" ? "bg-purple-hero" : "bg-teal-hero";
  const accentColor = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;

  // Bigger icon for this context
  const IconComponent = {
    Curiosity: <Sparkles size={32} strokeWidth={1.75} />,
    Collaboration: <Network size={32} strokeWidth={1.75} />,
    Communication: <Waves size={32} strokeWidth={1.75} />,
    "Critical Thinking": <GitBranch size={32} strokeWidth={1.75} />,
  }[MOCK_STRETCH.strength];

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
        <CloseButton onClose={() => {}} accentColor="#FFFFFF" size={28} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-[340px]">
        {/* Icon — bigger */}
        <div
          className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6"
          style={{ color: COLORS.ui.white }}
        >
          {IconComponent}
        </div>

        <h2 className="text-headline-m text-white mb-4">{MOCK_STRETCH.skillset}</h2>

        <p className="text-std-l text-white/85 leading-relaxed mb-8">
          You're nailing <span className="font-semibold text-white">{MOCK_STRETCH.skillset}</span> — ready to try{" "}
          <span className="font-semibold text-white">{CIRCLE_DISPLAY[MOCK_STRETCH.targetCircle]}</span>?
        </p>

        <ButtonPrimary
          color={family}
          onClick={() => {}}
          style={{ backgroundColor: "#FFFFFF", color: accentColor }}
        >
          Let's go
        </ButtonPrimary>
      </div>
    </div>
  );
}

// ── KFG ───────────────────────────────────────────────────────────────────

function MockKFG() {
  const renderKFGRow = (
    category: "keep" | "focus" | "grow",
    data: typeof MOCK_KFG.keep,
    tooltip: string
  ) => {
    const family = STRENGTH_FAMILY[data.strength];
    const accent = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;
    const paleBg = family === "purple" ? COLORS.purple.notYet : COLORS.teal.notYet;
    
    // Icon for this strength
    const IconComponent = {
      Curiosity: <Sparkles size={20} strokeWidth={2} />,
      Collaboration: <Network size={20} strokeWidth={2} />,
      Communication: <Waves size={20} strokeWidth={2} />,
      "Critical Thinking": <GitBranch size={20} strokeWidth={2} />,
    }[data.strength];

    // Category labels
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
          {IconComponent}
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
    <div className="p-6 md:px-10 md:pt-14 md:pb-12">
      {/* Close button */}
      <div className="absolute top-5 right-5 z-10">
        <CloseButton onClose={() => {}} accentColor={COLORS.teal.hero} size={28} />
      </div>

      {/* Header */}
      <h2 className="text-headline-m text-purple-hero mb-3">What's next?</h2>
      <p className="text-std-m text-ui-muted mb-6 leading-relaxed">
        Next up, compare notes and choose three focus areas. Here's a starter for ten.
      </p>

      {/* KFG Rows */}
      <div className="flex flex-col gap-2.5 mb-7">
        {renderKFGRow("keep", MOCK_KFG.keep, "A genuine strength. Keep growing it.")}
        {renderKFGRow("focus", MOCK_KFG.focus, "The most important area to focus on right now.")}
        {renderKFGRow("grow", MOCK_KFG.grow, "Clear potential, look for opportunities here.")}
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <ButtonPrimary color="teal" onClick={() => {}}>
          Time to chat
        </ButtonPrimary>
      </div>
    </div>
  );
}
