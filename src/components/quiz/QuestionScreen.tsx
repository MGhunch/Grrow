'use client';

import { Sparkles, Network, Waves, GitBranch } from 'lucide-react';
import { COLORS, familyAlpha } from "@/lib/colors";
import { STRENGTH_FAMILY } from '@/lib/questions';
import CloseButton from '../shared/CloseButton';
import { ButtonPrimary, ButtonSecondary } from '../shared/Button';
import type { StrengthName, Circle } from '@/lib/types';
import type { QuizInput, ColourFamily } from '@/lib/scoring';

// ── Strength icons ────────────────────────────────────────────────────

const STRENGTH_ICONS: Record<StrengthName, React.ReactNode> = {
  'Curiosity':        <Sparkles  size={20} strokeWidth={1.75} />,
  'Collaboration':    <Network   size={20} strokeWidth={1.75} />,
  'Communication':    <Waves     size={20} strokeWidth={1.75} />,
  'Critical Thinking':<GitBranch size={20} strokeWidth={1.75} />,
};

// ── Quiz options ──────────────────────────────────────────────────────

const OPTIONS: { value: QuizInput; label: string; fill: number; tooltip: string }[] = [
  { value: 'not_really',  label: 'Not really',  fill: 10,  tooltip: 'New territory for you.' },
  { value: 'sometimes',   label: 'Sometimes',   fill: 40,  tooltip: 'You get it, but need a nudge.' },
  { value: 'mostly',      label: 'Mostly',      fill: 70,  tooltip: 'You do it when you think of it.' },
  { value: 'intuitively', label: 'Intuitively', fill: 100, tooltip: 'You do it without thinking.' },
];

// ── Props ─────────────────────────────────────────────────────────────

interface QuestionScreenProps {
  questionText: string;
  strength: StrengthName;
  skillset: string;
  circle: Circle;
  questionInSkillset: number;
  totalAnswered: number;
  totalQuestions: number;
  selectedAnswer: QuizInput | null;
  onSelectAnswer: (value: QuizInput) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  onClose: () => void;
}

// ── Component ─────────────────────────────────────────────────────────

export function QuestionScreen({
  questionText,
  strength,
  skillset,
  circle,
  questionInSkillset,
  totalAnswered,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onBack,
  canGoBack,
  onClose,
}: QuestionScreenProps) {
  const family: ColourFamily = STRENGTH_FAMILY[strength];

  // Family colours
  const accent     = family === 'purple' ? COLORS.purple.hero : COLORS.teal.hero;
  const accentDark = family === 'purple' ? COLORS.purple.dark : COLORS.teal.dark;
  const barTrack   = family === 'purple' ? COLORS.purple.notYet : COLORS.teal.notYet;

  // Contrasting family for icon and close button
  const contrastFamily: ColourFamily = family === 'purple' ? 'teal' : 'purple';
  const contrastAccent = contrastFamily === 'purple' ? COLORS.purple.hero : COLORS.teal.hero;

  // Progress ring dimensions
  const ringSize = 56;
  const sw = 4;
  const radius = (ringSize - sw) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - questionInSkillset / 3);

  // Overall footer progress
  const overallProgress = Math.max((totalAnswered + 1) / totalQuestions, 0.02);

  // Format circle name
  const circleDisplay = circle.charAt(0) + circle.slice(1).toLowerCase();

  return (
    <div className="flex flex-col flex-1">

      {/* Close button — CONTRASTING colour */}
      <div className="absolute top-5 right-5 z-10">
        <CloseButton onClose={onClose} accentColor={contrastAccent} size={28} />
      </div>

      {/* ── Header — progress circle left, title vertically centred ─── */}
      <div className="flex items-center gap-4 mb-5">
        {/* Progress ring with strength icon */}
        <div
          className="relative shrink-0"
          style={{ width: ringSize, height: ringSize }}
        >
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
              fill="none"
              stroke={COLORS.ui.lightBorder}
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
          {/* Icon — CONTRASTING colour */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: contrastAccent }}
          >
            {STRENGTH_ICONS[strength]}
          </div>
        </div>

        {/* Strength eyebrow + skillset name */}
        <div>
          <div
            className="text-eyebrow mb-0.5"
            style={{ color: accent }}
          >
            {strength.toUpperCase()}
          </div>
          <div
            className="text-headline-m"
            style={{ color: accent }}
          >
            {skillset}
          </div>
        </div>
      </div>

      {/* ── Hero colour block: question + answers ─────────────────── */}
      <div className="flex-1 flex flex-col justify-center">
        <div
          className="rounded-2xl px-5 py-6 md:px-7 md:pt-8 md:pb-9 mb-6"
          style={{ background: accent }}
        >

          {/* Question text */}
          <div className="text-[17px] md:text-[19px] font-semibold leading-[1.45] text-white/90 mb-6 pb-5 border-b border-white/20">
            {questionText}
          </div>

          {/* Answer rows */}
          <div className="flex flex-col gap-2.5">
            {OPTIONS.map((option) => {
              const isSelected = selectedAnswer === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onSelectAnswer(option.value)}
                  className="flex items-center gap-3 md:gap-3.5 px-4 py-3 md:px-[18px] md:py-3.5 rounded-[10px] cursor-pointer text-left transition-all duration-150"
                  style={{
                    background: isSelected ? contrastAccent : COLORS.ui.white,
                    border: '2px solid transparent',
                    boxShadow: isSelected
                      ? `0 4px 16px ${familyAlpha(contrastFamily, 'shadow2')}`
                      : 'none',
                    transform: isSelected ? 'translateY(-2px)' : 'none',
                  }}
                >
                  {/* Fill bar */}
                  <div
                    className="w-10 h-1.5 rounded-sm overflow-hidden shrink-0"
                    style={{ background: isSelected ? 'rgba(255,255,255,0.3)' : barTrack }}
                  >
                    <div
                      className="h-full rounded-sm"
                      style={{
                        width: `${option.fill}%`,
                        background: isSelected ? COLORS.ui.white : accent,
                      }}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className="text-bold-l flex-1"
                    style={{ color: isSelected ? COLORS.ui.white : accentDark }}
                  >
                    {option.label}
                  </span>

                  {/* Helper text — hidden on mobile */}
                  <span
                    className="text-tooltip hidden md:inline"
                    style={{
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected ? 'rgba(255,255,255,0.85)' : COLORS.ui.lightMuted,
                    }}
                  >
                    {option.tooltip}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <div>
        {/* Circle · N | 12 */}
        <div className="text-eyebrow tracking-[0.08em] text-ui-muted mb-2">
          {circleDisplay.toUpperCase()} · {totalAnswered + 1} | {totalQuestions}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray rounded-sm overflow-hidden mb-6">
          <div
            className="h-full rounded-sm transition-[width] duration-300 ease-out min-w-2"
            style={{
              width: `${overallProgress * 100}%`,
              background: accent,
            }}
          />
        </div>

        {/* Back / Next */}
        <div className="flex items-center justify-between gap-3">
          {canGoBack ? (
            <ButtonSecondary
              color={family}
              onClick={onBack}
              style={{ padding: '10px 28px' }}
            >
              Back
            </ButtonSecondary>
          ) : (
            <div />
          )}

          <ButtonPrimary
            color={family}
            onClick={onNext}
            style={{ padding: '11px 36px' }}
          >
            Next
          </ButtonPrimary>
        </div>
      </div>

    </div>
  );
}
