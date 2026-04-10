"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Network, Waves, GitBranch, Compass, MessageCircle, Target, TrendingUp } from "lucide-react";
import GrrowCircle from "../components/circle/GrrowCircle";
import QuizEntryAll from "../components/quiz/QuizEntryAll";
import QuizTrialSection from "../components/layout/QuizTrialSection";
import SkillsModal from "../components/modals/SkillsModal";
import { ButtonPrimary, ButtonSecondary } from "../components/shared/Button";
import { useTheme } from "../lib/ThemeContext";
import { familyAlpha } from "@/lib/colors";

// ─────────────────────────────────────────────────────────────────────────────
// GRROW HOMEPAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const { dark } = useTheme();
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [initialStrength, setInitialStrength] = useState(0);

  const openSkillsModal = (strengthIndex: number) => {
    setInitialStrength(strengthIndex);
    setShowSkillsModal(true);
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CASCADING STRENGTH CARDS — Desktop only, absolute positioned */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block absolute inset-0 h-full pointer-events-none z-20">
        <div className="max-w-[1200px] mx-auto relative h-full">
          {STRENGTHS.map((strength, index) => (
            <StrengthCard
              key={strength.name}
              strength={strength}
              index={index}
              onClick={() => openSkillsModal(index)}
            />
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO — Blue section with circle */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-hero-blue relative min-h-[500px] md:min-h-[700px] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 md:pl-12 py-12 md:py-0 md:min-h-[700px] grid grid-cols-1 md:grid-cols-[500px_1fr] items-center relative">
          
          {/* The Circle */}
          <div className="relative h-[320px] md:h-[600px] flex items-center justify-center md:block">
            <div className="md:absolute md:-left-10 md:top-1/2 md:-translate-y-1/2">
              {/* Mobile circle */}
              <div className="md:hidden">
                <GrrowCircle id="mobile" size={300} dark={true} animate={true} />
              </div>
              {/* Desktop circle */}
              <div className="hidden md:block">
                <GrrowCircle id="desktop" size={600} dark={true} animate={true} />
              </div>
            </div>
          </div>

          {/* Hero Copy */}
          <div className="max-w-[460px] relative z-10 text-center md:text-left mx-auto md:mx-0 md:ml-16">
            <h1 className="text-hero-xs md:text-hero-m mb-6 text-white">
              You're already
              <br />
              <span className="text-teal-hero">growing.</span>
            </h1>

            <p className="text-[17px] leading-[1.7] mb-3 text-dark-copy-lift">
              Most learning happens on the job. Figuring stuff out, making
              mistakes, getting feedback and trying again.
            </p>

            <p className="text-[17px] font-semibold mb-10 text-white">
              Let's make it count.
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              <ButtonPrimary onClick={() => setShowQuizModal(true)}>
                Try the quiz
              </ButtonPrimary>
              <ButtonSecondary href="/howto">
                How it works
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BUILD YOUR SKILLSETS — White section */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white relative py-16 md:py-20 md:pb-16 md:min-h-[360px]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 md:pl-12">
          <div className="max-w-[480px]">
            <h2 className="text-hero-xs md:text-hero-l text-near-black">
              Build your
              <br />
              skillsets.
            </h2>
            <h2 className="text-hero-xs md:text-hero-l text-purple-hero mt-4 mb-8 md:mb-10">
              Play to your
              <br />
              strengths.
            </h2>
          </div>

          {/* Mobile: 2×2 Strength Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8 md:hidden">
            {STRENGTHS.map((strength, index) => (
              <StrengthTile
                key={strength.name}
                strength={strength}
                onClick={() => openSkillsModal(index)}
              />
            ))}
          </div>

          <button
            onClick={() => openSkillsModal(0)}
            className="text-[17px] font-semibold text-teal-hero inline-flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
          >
            Explore the strengths
            <span className="text-xl">›</span>
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section 
        className="py-16 md:py-24 md:pb-[72px]"
        style={{
          background: `linear-gradient(135deg, ${familyAlpha("purple", "wash")} 0%, ${familyAlpha("teal", "wash")} 100%)`,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 md:pl-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ui-muted mb-4">
              How it works
            </p>
            <h2 className="text-hero-xs md:text-hero-s text-near-black mb-2">
              Better
              <br />
              conversations.
            </h2>
            <h2 className="text-hero-xs md:text-hero-s text-teal-hero mb-6">
              Less paperwork.
            </h2>
            <p className="text-base leading-[1.7] text-ui-copy mb-6 max-w-[400px]">
              Reflect, connect and chat stuff through. It's not a formal
              review, just a set of tools to help leaders
              and learners have better conversations.
            </p>
            <Link
              href="/howto"
              className="text-[17px] font-semibold text-teal-hero no-underline inline-flex items-center gap-2"
            >
              See how it works
              <span className="text-xl">›</span>
            </Link>
          </div>

          <div>
            {STEPS.map((step, i) => (
              <StepRow key={step.title} step={step} isLast={i === STEPS.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LEADER BANNER */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-teal-hero py-7 px-8 text-center">
        <Link
          href="/howto"
          className="text-[17px] text-white no-underline"
        >
          <span className="font-semibold">Leading a team?</span>{" "}
          <span className="font-light">
            Make every conversation count.
          </span>
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* QUIZ TRIAL */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <QuizTrialSection />

      {/* Quiz Modal */}
      {showQuizModal && (
        <QuizEntryAll dark={dark} onClose={() => setShowQuizModal(false)} />
      )}

      {/* Skills Modal */}
      {showSkillsModal && (
        <SkillsModal
          dark={dark}
          initialStrength={initialStrength}
          onClose={() => setShowSkillsModal(false)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const STRENGTHS = [
  {
    name: "Curiosity",
    tagline: "Make it better",
    icon: Sparkles,
    family: "purple" as const,
    fill: 70,
  },
  {
    name: "Collaboration",
    tagline: "Make it happen",
    icon: Network,
    family: "teal" as const,
    fill: 45,
  },
  {
    name: "Critical Thinking",
    tagline: "Make it work",
    icon: GitBranch,
    family: "purple" as const,
    fill: 55,
  },
  {
    name: "Communication",
    tagline: "Make it clear",
    icon: Waves,
    family: "teal" as const,
    fill: 80,
  },
];

const CARD_POSITIONS = [
  { top: 660, right: 120, rotate: -5 },
  { top: 790, right: 60, rotate: -3 },
  { top: 920, right: 140, rotate: -4 },
  { top: 1050, right: 80, rotate: -2 },
];

const STEPS = [
  {
    title: "Reflect",
    description: "5 minutes. 12 questions. See where you actually are.",
    icon: Compass,
    family: "purple" as const,
  },
  {
    title: "Connect",
    description: "Get together to compare notes and line up your thinking.",
    icon: MessageCircle,
    family: "teal" as const,
  },
  {
    title: "Focus",
    description: "Keep one. Focus on one. Grow into one. That's it.",
    icon: Target,
    family: "purple" as const,
  },
  {
    title: "Check in",
    description: "See what stuck. Refresh the plan. Repeat.",
    icon: TrendingUp,
    family: "teal" as const,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/** Desktop cascading card — absolute positioned with rotation */
function StrengthCard({
  strength,
  index,
  onClick,
}: {
  strength: (typeof STRENGTHS)[0];
  index: number;
  onClick: () => void;
}) {
  const pos = CARD_POSITIONS[index];
  const bgClass = strength.family === "purple" ? "bg-purple-hero" : "bg-teal-hero";
  const Icon = strength.icon;

  const circumference = 201;
  const strokeDashoffset = circumference * (1 - strength.fill / 100);

  return (
    <div
      onClick={onClick}
      className={`absolute w-[340px] py-[34px] px-7 rounded-2xl ${bgClass} shadow-[0_12px_40px_rgba(0,0,0,0.25)] pointer-events-auto cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]`}
      style={{
        top: pos.top,
        right: pos.right,
        transform: `rotate(${pos.rotate}deg)`,
      }}
    >
      <div className="flex items-center gap-5">
        {/* Icon with ring progress */}
        <div className="relative w-[72px] h-[72px] shrink-0">
          <svg className="absolute top-0 left-0 w-[72px] h-[72px] -rotate-90">
            <circle
              cx={36}
              cy={36}
              r={32}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={4}
            />
            <circle
              cx={36}
              cy={36}
              r={32}
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth={4}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute top-2 left-2 w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
            <Icon size={28} strokeWidth={1.5} color="white" />
          </div>
        </div>

        {/* Text */}
        <div>
          <h3 className="text-[22px] font-semibold text-white mb-1">
            {strength.name}
          </h3>
          <p className="text-[17px] text-white/75">
            {strength.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Mobile strength tile — 2×2 grid, icon ring above text */
function StrengthTile({
  strength,
  onClick,
}: {
  strength: (typeof STRENGTHS)[0];
  onClick: () => void;
}) {
  const bgClass = strength.family === "purple" ? "bg-purple-hero" : "bg-teal-hero";
  const Icon = strength.icon;

  const circumference = 126;
  const strokeDashoffset = circumference * (1 - strength.fill / 100);

  return (
    <button
      onClick={onClick}
      className={`${bgClass} rounded-2xl p-4 pt-5 flex flex-col items-center text-center cursor-pointer border-none`}
    >
      {/* Ring with icon */}
      <div className="relative w-11 h-11 mb-3">
        <svg className="absolute top-0 left-0 w-11 h-11 -rotate-90">
          <circle
            cx={22}
            cy={22}
            r={20}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={3}
          />
          <circle
            cx={22}
            cy={22}
            r={20}
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={3}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={20} strokeWidth={1.75} color="white" />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-bold-m text-white mb-0.5">
        {strength.name}
      </h3>
      <p className="text-std-s text-white/70">
        {strength.tagline}
      </p>
    </button>
  );
}

/** Step row for "How it works" section */
function StepRow({
  step,
  isLast,
}: {
  step: (typeof STEPS)[0];
  isLast: boolean;
}) {
  const colorClass = step.family === "purple" ? "text-purple-hero" : "text-teal-hero";
  const bgColor = step.family === "purple"
    ? familyAlpha("purple", "wash")
    : familyAlpha("teal", "wash");
  const Icon = step.icon;

  return (
    <div
      className={`flex items-start gap-5 py-5 ${isLast ? "" : "border-b border-ui-bdr"}`}
    >
      <div
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        <Icon size={28} strokeWidth={1.75} className={colorClass} />
      </div>
      <div className="pt-1">
        <h4 className={`text-bold-l mb-1 ${colorClass}`}>
          {step.title}
        </h4>
        <p className="text-std-m text-ui-copy">
          {step.description}
        </p>
      </div>
    </div>
  );
}
