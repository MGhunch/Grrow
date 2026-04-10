'use client';

import { STRENGTH_FAMILY } from '@/lib/questions';
import CloseButton from '../shared/CloseButton';
import { ButtonPrimary } from '../shared/Button';
import CircleSimple from '../circle/CircleSimple';
import { 
  CIRCLE_DISPLAY, 
  CIRCLE_DESCRIPTION, 
  STRENGTH_TO_SEGMENT,
} from './shared';
import type { StrengthName, Circle } from '@/lib/types';
import type { ColourFamily } from '@/lib/scoring';

// ── Types ─────────────────────────────────────────────────────────────

export interface SkillsetMeta {
  skillset: string;
  strength: StrengthName;
  objective: string;
}

export interface CompletedScore {
  strength: StrengthName;
  score: number;
}

interface TransitionScreenProps {
  circle: Circle;
  skillsets: SkillsetMeta[];
  completedSkillsets: string[];
  completedScores: CompletedScore[];
  currentSkillset: string;
  isFirst: boolean;
  isEndOfCircle: boolean;
  nextCircle?: Circle;
  mode?: 'snapshot' | 'checkin';
  onStart: () => void;
  onJumpTo: (skillset: string) => void;
  onClose: () => void;
}

// ── Family colour values for button override ──────────────────────────
// Button needs these as inline style since Button.tsx isn't Tailwind yet

const ACCENT_COLORS: Record<ColourFamily, string> = {
  purple: '#4C3FA0',
  teal: '#18B99A',
};

// ── Component ──────────────────────────────────────────────────────────

export function TransitionScreen({
  circle,
  skillsets,
  currentSkillset,
  isEndOfCircle,
  nextCircle,
  onStart,
  onClose,
}: TransitionScreenProps) {

  // Resolve current skillset meta
  const currentMeta = isEndOfCircle
    ? null
    : skillsets.find(s => s.skillset === currentSkillset) ?? skillsets[0];

  // Family
  const family: ColourFamily = currentMeta
    ? STRENGTH_FAMILY[currentMeta.strength]
    : 'purple';

  // Build activeQuadrant for CircleSimple — dims the other three
  const activeQuadrant = currentMeta ? STRENGTH_TO_SEGMENT[currentMeta.strength] : null;

  // Hero text - no eyebrow, straight to skillset name
  const heroTitle = isEndOfCircle && nextCircle
    ? CIRCLE_DISPLAY[nextCircle]
    : (currentMeta?.skillset ?? '');
  const heroSub = isEndOfCircle && nextCircle
    ? CIRCLE_DESCRIPTION[nextCircle]
    : (currentMeta?.objective ?? '');

  // Dynamic background class based on family
  const bgClass = family === 'purple' ? 'bg-purple-hero' : 'bg-teal-hero';

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
      {/* Close button — white */}
      <div className="absolute top-5 right-5 z-10">
        <CloseButton onClose={onClose} accentColor="#FFFFFF" size={28} />
      </div>

      {/* ── Content — centered vertically ─────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center">
        
        {/* Circle — responsive sizing */}
        <div className="mb-7 md:mb-8 md:hidden">
          <CircleSimple size={140} activeQuadrant={activeQuadrant} />
        </div>
        <div className="mb-7 md:mb-8 hidden md:block">
          <CircleSimple size={180} activeQuadrant={activeQuadrant} />
        </div>

        {/* Skillset / circle name */}
        <h2 className="text-hero-xs text-white mb-4">
          {heroTitle}
        </h2>

        {/* Objective / circle description */}
        <p className="text-std-l text-white/85 leading-relaxed max-w-[340px] mx-auto mb-8">
          {heroSub}
        </p>

        {/* Button — white bg with family-coloured text */}
        <div className="flex justify-center">
          <ButtonPrimary 
            color={family} 
            onClick={onStart}
            style={{
              backgroundColor: '#FFFFFF',
              color: ACCENT_COLORS[family],
            }}
          >
            {isEndOfCircle && nextCircle
              ? `Start ${CIRCLE_DISPLAY[nextCircle]}`
              : "Let's go"}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}
