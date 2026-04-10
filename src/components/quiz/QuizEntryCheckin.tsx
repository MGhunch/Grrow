"use client";

import { useState, useCallback } from "react";
import { Check } from "lucide-react";
import { COLORS, familyAlpha } from "@/lib/colors";
import { getSkillsetByName, type Skillset } from "../../lib/questions";
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

// ── KFG Colours ───────────────────────────────────────────────────────

const KFG_COLORS = {
  keep:  COLORS.teal.hero,
  focus: COLORS.purple.hero,
  grow:  COLORS.purple.growing,
};

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

        {/* KFG cards */}
        <div className="flex flex-col gap-2.5 mb-8">
          {kfgSelections.map((k) => {
            const famColor = k.family === "teal" ? COLORS.teal.hero : COLORS.purple.hero;
            const cardBg = k.family === "teal"
              ? (dark ? familyAlpha("teal", "wash", "dark") : "#F0FBF8")
              : (dark ? familyAlpha("purple", "wash", "dark") : "#F5F3FF");

            return (
              <div
                key={k.category}
                className="flex items-center gap-4 px-5 py-4 rounded-xl"
                style={{
                  background: cardBg,
                  border: `1.5px solid ${famColor}`,
                }}
              >
                <StrengthIcon
                  strength={k.strength as StrengthName}
                  size="md"
                  variant="shaded"
                />

                <span
                  className="text-bold-l flex-1"
                  style={{ color: famColor }}
                >
                  {k.skillset}
                </span>

                <span
                  className="text-[10px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full shrink-0"
                  style={{
                    color: COLORS.ui.white,
                    background: KFG_COLORS[k.category],
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

      {/* Result cards */}
      <div className="flex flex-col gap-2.5 mb-8">
        {results?.map((r, i) => {
          const category = getKfgCategory(r.skillset.skillset);
          const isPurple = r.skillset.family === "purple";
          const accent = isPurple ? COLORS.purple.hero : COLORS.teal.hero;
          const cardBg = isPurple
            ? (dark ? familyAlpha("purple", "wash", "dark") : "#F5F3FF")
            : (dark ? familyAlpha("teal", "wash", "dark") : "#F0FBF8");
          const trackColor = isPurple ? COLORS.purple.notYet : COLORS.teal.notYet;

          const { label, fill } = getScoreState(r.score);

          const getBarColor = () => {
            const colors = isPurple ? COLORS.purple : COLORS.teal;
            if (r.score <= 25) return colors.notYet;
            if (r.score <= 50) return colors.learning;
            if (r.score <= 75) return colors.growing;
            return colors.hero;
          };

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
              className="flex items-center gap-4 px-5 py-4 rounded-xl"
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

              <span
                className="text-bold-l flex-1"
                style={{ color: accent }}
              >
                {r.skillset.skillset}
              </span>

              {/* Score bar */}
              <div
                className="w-[50px] h-1.5 rounded-sm overflow-hidden shrink-0"
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
              <span
                className="text-bold-s min-w-[65px] text-right"
                style={{ color: accent }}
              >
                {label}
              </span>

              {/* Delta */}
              {deltaText && (
                <span
                  className="text-tooltip font-semibold min-w-7 text-right"
                  style={{ color: deltaColor }}
                >
                  {deltaText}
                </span>
              )}

              {/* KFG pill */}
              {category && (
                <span
                  className="text-[10px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full shrink-0"
                  style={{
                    color: COLORS.ui.white,
                    background: KFG_COLORS[category],
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
