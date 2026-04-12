"use client";

import React, { useState, useCallback } from "react";
import { Check, Sparkles, Network, Waves, GitBranch } from "lucide-react";
import { COLORS, familyAlpha } from "@/lib/colors";
import { getSkillsetByName, STRENGTH_FAMILY, type Skillset } from "../../lib/questions";
import CloseButton from "../shared/CloseButton";
import { ButtonPrimary } from "../shared/Button";
import StrengthIcon from "../shared/StrengthIcon";
import { QuizFlow, type PhaseInfo } from "./QuizFlow";
import { MODAL, FAMILY_ACCENT, getScoreState } from "./shared";
import type { StrengthName } from "@/lib/types";
import type { ColourFamily } from "@/lib/scoring";

// ── Types ─────────────────────────────────────────────────────────────

interface KFGSelection {
  category: "keep" | "focus" | "grow";
  skillset: string;
  strength: string;
  family: "purple" | "teal";
  baselineScore?: number;
}

interface SkillsetResult {
  skillset: Skillset;
  score: number;
  previousScore?: number;
  answers: string[];
}

type Phase = "confirming" | "quizzing" | "complete";

interface Props {
  dark: boolean;
  onClose: () => void;
  kfgSelections: KFGSelection[];
  monthsSinceReview?: number;
  onSwitchToReview?: () => void;
}

// ── KFG Labels ───────────────────────────────────────────────────────

const KFG_LABELS: Record<string, string> = {
  keep: "KEEP",
  focus: "FOCUS",
  grow: "GROW",
};

// ── Component ─────────────────────────────────────────────────────────

export default function QuizEntryCheckin({
  dark,
  onClose,
  kfgSelections,
  monthsSinceReview = 0,
  onSwitchToReview,
}: Props) {
  const [phase, setPhase] = useState<Phase>("confirming");
  const [results, setResults] = useState<SkillsetResult[] | null>(null);
  const [quizPhaseInfo, setQuizPhaseInfo] = useState<PhaseInfo | null>(null);

  // ── Mode-aware colours (kept for dynamic/computed values) ──────────
  const mode = dark ? "dark" : "light";
  const muted = dark ? COLORS.ui.darkMuted : COLORS.ui.lightMuted;

  // ── Full bleed modal when in transition phase ──────────────────────
  const isFullBleed = phase === "quizzing" && quizPhaseInfo?.phase === "transition";
  const fullBleedBg = quizPhaseInfo ? FAMILY_ACCENT[quizPhaseInfo.family] : COLORS.purple.hero;

  // Show nudge if 6+ months since last review
  const showNudge = monthsSinceReview >= 6 && onSwitchToReview;

  // ── Convert KFG selections to Skillset objects for QuizFlow ─────────
  const quizSkillsets: Skillset[] = kfgSelections
    .map(k => getSkillsetByName(k.skillset))
    .filter((s): s is Skillset => s !== null);

  // Build previousScores map from KFG baseline scores
  const previousScores: Record<string, number> = {};
  kfgSelections.forEach(k => {
    if (k.baselineScore !== undefined) {
      previousScores[k.skillset] = k.baselineScore;
    }
  });

  // ── Handlers ────────────────────────────────────────────────────────

  const handleStartQuiz = () => {
    if (quizSkillsets.length === 0) {
      console.warn("No valid skillsets found for KFG selections");
      return;
    }
    setPhase("quizzing");
  };

  const handleQuizComplete = (data: SkillsetResult[]) => {
    setResults(data);
    setQuizPhaseInfo(null);
    setPhase("complete");
  };

  const handleQuizPhaseChange = useCallback((info: PhaseInfo) => {
    setQuizPhaseInfo(info);
  }, []);

  // Get KFG category for a skillset (for results display)
  const getKfgCategory = (skillsetName: string): "keep" | "focus" | "grow" | null => {
    const match = kfgSelections.find(k => k.skillset === skillsetName);
    return match?.category ?? null;
  };

  // ── Confirming Phase ────────────────────────────────────────────────

  const renderConfirming = () => {
    return (
      <>
        {/* Nudge banner */}
        {showNudge && (
          <div
            className="rounded-[10px] px-3.5 py-2.5 mb-5 text-tooltip"
            style={{
              background: familyAlpha("purple", "wash", mode),
              border: `1px solid ${dark ? COLORS.ui.darkBorder : COLORS.ui.lightBorder}`,
              color: muted,
            }}
          >
            It&apos;s been {monthsSinceReview} months since your last full review.{" "}
            <button
              onClick={onSwitchToReview}
              className="bg-transparent border-none cursor-pointer p-0 text-tooltip font-semibold text-purple-growing"
            >
              A fresh look might help
            </button>
          </div>
        )}

        {/* Headline */}
        <h2 className="text-headline-m text-purple-hero mt-2 mb-8">
          Check in
        </h2>

        {/* KFG rows — gray background, family pills */}
        <div className="flex flex-col gap-2.5 mb-8">
          {kfgSelections.map((k) => {
            const accent = k.family === "teal" ? COLORS.teal.hero : COLORS.purple.hero;
            const paleBg = k.family === "teal" ? COLORS.teal.notYet : COLORS.purple.notYet;

            return (
              <div
                key={k.category}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                style={{ background: "#F9F8FC" }}
              >
                {/* Icon in pale family circle */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: paleBg }}
                >
                  <StrengthIcon
                    strength={k.strength as StrengthName}
                    size="sm"
                    variant="shaded"
                  />
                </div>

                {/* Skillset name */}
                <span
                  className="text-bold-m md:text-bold-l flex-1"
                  style={{ color: accent }}
                >
                  {k.skillset}
                </span>

                {/* Category pill in family color */}
                <span
                  className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full shrink-0"
                  style={{
                    color: COLORS.ui.white,
                    background: accent,
                  }}
                >
                  {KFG_LABELS[k.category]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <ButtonPrimary color="teal" onClick={handleStartQuiz}>
            Let&apos;s go
          </ButtonPrimary>
        </div>
      </>
    );
  };

  // ── Quizzing Phase ──────────────────────────────────────────────────

  const renderQuizzing = () => (
    <QuizFlow
      skillsets={quizSkillsets}
      previousScores={previousScores}
      mode="checkin"
      onPhaseChange={handleQuizPhaseChange}
      onComplete={handleQuizComplete}
      onClose={onClose}
    />
  );

  // ── Complete Phase ──────────────────────────────────────────────────

  const STRENGTH_ICONS: Record<StrengthName, React.ReactNode> = {
    Curiosity: <Sparkles size={20} strokeWidth={2} />,
    Collaboration: <Network size={20} strokeWidth={2} />,
    Communication: <Waves size={20} strokeWidth={2} />,
    "Critical Thinking": <GitBranch size={20} strokeWidth={2} />,
  };

  const renderComplete = () => (
    <div>
      {/* Header with tick */}
      <div className="flex items-center gap-3.5 mb-7">
        <div className="w-11 h-11 rounded-full bg-teal-hero flex items-center justify-center shrink-0">
          <Check size={24} strokeWidth={3} color={COLORS.ui.white} />
        </div>
        <h2 className="text-headline-m text-teal-hero m-0">
          Nice work
        </h2>
      </div>

      {/* Result cards — gray rows with progress rings */}
      <div className="flex flex-col gap-2.5 mb-8">
        {results?.map((r, i) => {
          const category = getKfgCategory(r.skillset.skillset);
          const family = STRENGTH_FAMILY[r.skillset.strength as StrengthName];
          const isPurple = family === "purple";
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

          const delta = r.previousScore !== undefined ? r.score - r.previousScore : null;
          const deltaText = delta !== null
            ? (delta > 0 ? `+${delta}` : delta === 0 ? "—" : `${delta}`)
            : null;
          const deltaColor = delta !== null
            ? (delta > 0 ? COLORS.teal.hero : delta < 0 ? COLORS.purple.growing : muted)
            : muted;

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
                  {/* Progress fill */}
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
                {/* Icon */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: accent }}
                >
                  {STRENGTH_ICONS[r.skillset.strength as StrengthName]}
                </div>
              </div>

              {/* Skillset name */}
              <span
                className="text-bold-m md:text-bold-l flex-1"
                style={{ color: accent }}
              >
                {r.skillset.skillset}
              </span>

              {/* Score label */}
              <span
                className="text-bold-s shrink-0"
                style={{ color: accent }}
              >
                {label}
              </span>

              {/* Delta */}
              {deltaText && (
                <span
                  className="text-tooltip font-semibold min-w-7 text-right shrink-0"
                  style={{ color: deltaColor }}
                >
                  {deltaText}
                </span>
              )}

              {/* KFG pill in family color */}
              {category && (
                <span
                  className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full shrink-0"
                  style={{
                    color: COLORS.ui.white,
                    background: accent,
                  }}
                >
                  {KFG_LABELS[category]}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <ButtonPrimary color="teal" onClick={onClose}>
          Done
        </ButtonPrimary>
      </div>
    </div>
  );

  // ── Modal ───────────────────────────────────────────────────────────

  // Dynamic classes based on dark mode
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

        {phase === "confirming" && renderConfirming()}
        {phase === "quizzing" && renderQuizzing()}
        {phase === "complete" && renderComplete()}
      </div>
    </div>
  );
}
