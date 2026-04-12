'use client';

import { useState } from 'react';
import { COLORS, familyAlpha } from "@/lib/colors";
import { STRENGTH_FAMILY } from '@/lib/questions';
import CloseButton from '../shared/CloseButton';
import { ButtonPrimary, ButtonSecondary } from '../shared/Button';
import type { StrengthName, Circle } from '@/lib/types';
import type { QuizInput, ColourFamily } from '@/lib/scoring';

// ── Quiz options ──────────────────────────────────────────────────────

const OPTIONS: { value: QuizInput; label: string; tooltip: string }[] = [
  { value: 'not_really',  label: 'Not really',  tooltip: 'New territory for you.' },
  { value: 'sometimes',   label: 'Sometimes',   tooltip: 'You get it, but need a nudge.' },
  { value: 'mostly',      label: 'Mostly',      tooltip: 'You do it when you think of it.' },
  { value: 'intuitively', label: 'Intuitively', tooltip: 'You do it without thinking.' },
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
  totalAnswered,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onBack,
  canGoBack,
  onClose,
}: QuestionScreenProps) {
  const [showNudge, setShowNudge] = useState(false);
  
  const family: ColourFamily = STRENGTH_FAMILY[strength];

  // Family colours — same family throughout
  const accent     = family === 'purple' ? COLORS.purple.hero : COLORS.teal.hero;
  const accentDark = family === 'purple' ? COLORS.purple.dark : COLORS.teal.dark;

  // Overall footer progress
  const overallProgress = Math.max((totalAnswered + 1) / totalQuestions, 0.02);

  // Format circle name
  const circleDisplay = circle.charAt(0) + circle.slice(1).toLowerCase();

  // Row background
  const cardBg = "#F9F8FC";

  // Handle next with validation
  const handleNextClick = () => {
    if (selectedAnswer === null) {
      setShowNudge(true);
      setTimeout(() => setShowNudge(false), 600);
      return;
    }
    onNext();
  };

  return (
    <div className="flex flex-col flex-1">

      {/* Close button — same family */}
      <div className="absolute top-5 right-5 z-10">
        <CloseButton onClose={onClose} accentColor={accent} size={28} />
      </div>

      {/* ── Header — just skillset name ─────────────────────────────── */}
      <div className="mb-6 mt-4">
        <h2 className="text-headline-m" style={{ color: accent }}>
          {skillset}
        </h2>
      </div>

      {/* ── Question + answers ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col">
        {/* Question text — standard weight, family dark */}
        <p 
          className="text-std-l leading-relaxed mb-6" 
          style={{ color: accentDark }}
        >
          {questionText}
        </p>

        {/* Answer rows — with wobble animation */}
        <div className={`flex flex-col gap-2.5 mb-8 ${showNudge ? 'animate-nudge' : ''}`}>
          {OPTIONS.map((option) => {
            const isSelected = selectedAnswer === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelectAnswer(option.value)}
                className="flex items-center gap-4 px-5 py-4 rounded-xl w-full text-left cursor-pointer transition-all duration-150"
                style={{
                  background: isSelected ? accent : cardBg,
                  border: isSelected ? `2px solid ${accent}` : '2px solid transparent',
                  boxShadow: isSelected
                    ? `0 4px 16px ${familyAlpha(family, 'shadow2')}`
                    : 'none',
                  transform: isSelected ? 'translateY(-2px)' : 'none',
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

      {/* ── Footer ───────────────────────────────────────────────────── */}
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
            onClick={handleNextClick}
            style={{ padding: '11px 36px' }}
          >
            Next
          </ButtonPrimary>
        </div>
      </div>

    </div>
  );
}
