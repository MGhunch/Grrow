'use client';

// ── QuizTestWelcome ───────────────────────────────────────────────────────
// Explorer-only locate flow. Four steps inside one modal frame:
//   0) Welcome    — TransitionScreen pattern (purple hero, circle, hello)
//   1) Question 1 — How long have you been at it?
//   2) Question 2 — Who do you look after?
//   3) Reveal     — TransitionScreen pattern (purple hero, circle, your tier)
//
// Logged-in users skip this entirely. Wires into the marketing entry point
// in a second pass — for now it's reachable via /quiz-test under "Welcome".
// ──────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { COLORS, familyAlpha } from '@/lib/colors';
import CloseButton from '../shared/CloseButton';
import { ButtonPrimary, ButtonSecondary } from '../shared/Button';
import CircleSimple from '../circle/CircleSimple';
import { CIRCLE_DISPLAY, CIRCLE_DESCRIPTION } from './shared';
import type { Circle } from '@/lib/types';

// ── Types ─────────────────────────────────────────────────────────────────

type Step = 'welcome' | 'q1' | 'q2' | 'reveal';
type Years = 'new' | 'middle' | 'veteran';
type People = 'just_me' | 'crew' | 'army';

interface QuizTestWelcomeProps {
  onClose?: () => void;
  onStartQuiz?: (circle: Circle) => void;
}

// ── Question options ──────────────────────────────────────────────────────

const Q1_OPTIONS: { value: Years; label: string }[] = [
  { value: 'new',     label: 'Learning the ropes' },
  { value: 'middle',  label: 'A good few years' },
  { value: 'veteran', label: 'Since Adam was a boy' },
];

const Q2_OPTIONS: { value: People; label: string }[] = [
  { value: 'just_me', label: 'Just me' },
  { value: 'crew',    label: 'A scrappy crew' },
  { value: 'army',    label: 'A small army' },
];

// ── Circle reflections ────────────────────────────────────────────────────
// Short descriptions of what each stage is like — surfaced on the reveal
// alongside the tagline (which is the circle's mission). Reflection
// describes the user's current vibe; tagline describes the circle's purpose.

const CIRCLE_REFLECTION: Record<Circle, string> = {
  ESSENTIALS:  'Still learning the tricks of the trade.',
  EXPLORING:   'Nailing the daily and stepping up.',
  INFLUENCING: 'Sharing your smarts with others.',
  LEADING:     'Shining a light on where to next.',
};

// ── Result ring mapping ───────────────────────────────────────────────────
// ResultCircle draws rings 0=innermost to 3=outermost. For the reveal
// showcase we want Leading at the outer edge (expanded peak) and Essentials
// at the centre (foundation core) — the natural "growing outward" metaphor.
//
// Note: this is the INVERSE of shared.ts CIRCLE_TO_RING (which serves
// CircleSimple's center=Leading orientation). Kept local so we don't disturb
// the rest of the codebase that depends on CircleSimple's existing mapping.

const RESULT_RING: Record<Circle, number> = {
  ESSENTIALS:  0,
  EXPLORING:   1,
  INFLUENCING: 2,
  LEADING:     3,
};

// ── Locate mapping ────────────────────────────────────────────────────────
// Years sets tier, people sets position within tier.
// (veteran + just_me = senior IC = Influencing.)
// (new + army is unlikely; falls to Exploring as a graceful default.)

function locate(years: Years, people: People): Circle {
  const map: Record<Years, Record<People, Circle>> = {
    new:     { just_me: 'ESSENTIALS',  crew: 'EXPLORING',   army: 'EXPLORING'   },
    middle:  { just_me: 'EXPLORING',   crew: 'INFLUENCING', army: 'INFLUENCING' },
    veteran: { just_me: 'INFLUENCING', crew: 'LEADING',     army: 'LEADING'     },
  };
  return map[years][people];
}

// ── Component ─────────────────────────────────────────────────────────────

export function QuizTestWelcome({ onClose, onStartQuiz }: QuizTestWelcomeProps) {
  const [step, setStep] = useState<Step>('welcome');
  const [years, setYears] = useState<Years | null>(null);
  const [people, setPeople] = useState<People | null>(null);

  const handleClose = () => onClose?.();

  if (step === 'welcome') {
    return (
      <HeroScreen
        onClose={handleClose}
        title="Hello"
        body={[
          "Here's twelve questions to see where you're at. Plus two to get started.",
        ]}
        buttonLabel="Dig in"
        onButton={() => setStep('q1')}
      />
    );
  }

  if (step === 'q1') {
    return (
      <QuestionStep
        onClose={handleClose}
        stepNumber={1}
        eyebrow="Let's start with you."
        title="How long have you been at it?"
        options={Q1_OPTIONS}
        selected={years}
        onSelect={setYears}
        onNext={() => setStep('q2')}
        canGoBack={false}
      />
    );
  }

  if (step === 'q2') {
    return (
      <QuestionStep
        onClose={handleClose}
        stepNumber={2}
        eyebrow="And your team."
        title="Who do you look after?"
        options={Q2_OPTIONS}
        selected={people}
        onSelect={setPeople}
        onNext={() => setStep('reveal')}
        onBack={() => setStep('q1')}
        canGoBack={true}
      />
    );
  }

  // step === 'reveal'
  const circle: Circle = years && people ? locate(years, people) : 'INFLUENCING';
  return (
    <ResultScreen
      onClose={handleClose}
      circle={circle}
      onStart={() => onStartQuiz?.(circle)}
    />
  );
}

export default QuizTestWelcome;

// ── HeroScreen — welcome and reveal ───────────────────────────────────────
// Mirrors TransitionScreen's visual pattern: purple hero, circle, big white
// display title, body, white pill button with purple text.

interface HeroScreenProps {
  onClose: () => void;
  title: string;
  body: string[];
  circleActiveRing?: number;
  buttonLabel: string;
  onButton: () => void;
}

function HeroScreen({
  onClose,
  title,
  body,
  circleActiveRing,
  buttonLabel,
  onButton,
}: HeroScreenProps) {
  return (
    <div
      className={`
        bg-purple-hero
        flex flex-col items-center
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

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Circle — responsive sizing, mirrors TransitionScreen */}
        <div className="mb-7 md:mb-8 md:hidden">
          <CircleSimple size={140} activeRing={circleActiveRing ?? null} />
        </div>
        <div className="mb-7 md:mb-8 hidden md:block">
          <CircleSimple size={180} activeRing={circleActiveRing ?? null} />
        </div>

        {/* Title (e.g. "Hello" or "Influencing") */}
        <h2 className="text-hero-xs text-white mb-4">{title}</h2>

        {/* Body — one or two lines, white at 85% */}
        <div className="text-std-l text-white/85 leading-relaxed max-w-[340px] mx-auto mb-8">
          {body.map((line, i) => (
            <p key={i} className={i > 0 ? 'mt-1' : ''}>
              {line}
            </p>
          ))}
        </div>

        {/* White pill button with purple text */}
        <div className="flex justify-center">
          <ButtonPrimary
            color="purple"
            onClick={onButton}
            style={{
              backgroundColor: '#FFFFFF',
              color: COLORS.purple.hero,
            }}
          >
            {buttonLabel}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

// ── ResultScreen — reveal (replaces purple HeroScreen for reveal step) ────
// White card. Circle visual with the user's ring punched up — solid purple
// on a ghosted backdrop, white cross splitting the active ring into the four
// strengths the quiz is about to test. Below: name, tagline, reflection on
// the stage, and the lead-in couplet. Breaks the purple-to-purple chain that
// would otherwise blur the seam between locate and the quiz proper.

interface ResultScreenProps {
  onClose: () => void;
  circle: Circle;
  onStart: () => void;
}

function ResultScreen({ onClose, circle, onStart }: ResultScreenProps) {
  const activeRing = RESULT_RING[circle];
  const accent = COLORS.purple.hero;
  const muted = COLORS.ui.lightMuted;

  return (
    <div
      className={`
        bg-white
        flex flex-col flex-1
        min-h-[560px]
        text-center
        p-6 md:px-10 md:pt-14 md:pb-12
        rounded-2xl
        relative
      `}
    >
      <div className="absolute top-5 right-5 z-10">
        <CloseButton onClose={onClose} accentColor={accent} size={28} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Circle — bold active ring, others ghosted, mobile/desktop sizes */}
        <div className="mb-7 md:mb-8 md:hidden">
          <ResultCircle size={160} activeRing={activeRing} />
        </div>
        <div className="mb-7 md:mb-8 hidden md:block">
          <ResultCircle size={200} activeRing={activeRing} />
        </div>

        {/* Circle name */}
        <h2
          className="text-headline-l mb-2"
          style={{ color: accent }}
        >
          {CIRCLE_DISPLAY[circle]}
        </h2>

        {/* Tagline — circle's mission */}
        <p className="text-std-l mb-6" style={{ color: muted }}>
          {CIRCLE_DESCRIPTION[circle]}
        </p>

        {/* Couplet — reflection + lead-in, same register, sits as one block */}
        <div className="max-w-[340px] mx-auto mb-8" style={{ color: muted }}>
          <p className="text-light-l">{CIRCLE_REFLECTION[circle]}</p>
          <p className="text-light-l mt-1">We reckon start here. Ready?</p>
        </div>

        {/* CTA — pairs with "Ready?" as Q/A */}
        <div className="flex justify-center">
          <ButtonPrimary color="purple" onClick={onStart}>
            Let&apos;s go
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

// ── ResultCircle — inline SVG circle for the reveal showcase ──────────────
// Four concentric rings + cross. Active ring solid purple hero, others
// ghosted to notYet pale. Cross is white — barely visible against pale rings,
// pops on the active ring (showing the four strengths quadrant inside it).
// Sized 160 mobile / 200 desktop. Ring index follows local RESULT_RING:
// 0 innermost (Essentials) → 3 outermost (Leading).

function ResultCircle({
  size,
  activeRing,
}: {
  size: number;
  activeRing: number;
}) {
  const c = size / 2;
  const ringWidth = size / 8;
  const ringRadii = [
    ringWidth * 0.5,  // ri=0 innermost (Essentials)
    ringWidth * 1.5,  // ri=1 (Exploring)
    ringWidth * 2.5,  // ri=2 (Influencing)
    ringWidth * 3.5,  // ri=3 outermost (Leading)
  ];
  const activeColor = COLORS.purple.hero;
  const ghostColor = COLORS.purple.notYet;
  const crossWidth = Math.max(2, size / 80);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {ringRadii.map((r, i) => (
        <circle
          key={i}
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke={i === activeRing ? activeColor : ghostColor}
          strokeWidth={ringWidth}
        />
      ))}
      <line
        x1={0}
        y1={c}
        x2={size}
        y2={c}
        stroke="#FFFFFF"
        strokeWidth={crossWidth}
      />
      <line
        x1={c}
        y1={0}
        x2={c}
        y2={size}
        stroke="#FFFFFF"
        strokeWidth={crossWidth}
      />
    </svg>
  );
}

// ── QuestionStep — Q1 and Q2 ──────────────────────────────────────────────
// Mirrors QuestionScreen's visual pattern but stripped for locate:
//   - Progress dial top (no skillset name beside it — locate has no skillset)
//   - Question text as the headline (the question IS the title)
//   - 3 answer rows (no tooltips — labels carry their own meaning)
//   - Footer is just back/next (no eyebrow + progress bar — too much for 3 steps)
//   - Button copy "Got it" not "Next" — peer-mentor warmth on the locate
// Locate is purple-family always.

interface QuestionStepProps<T extends string> {
  onClose: () => void;
  stepNumber: 1 | 2;
  eyebrow: string;
  title: string;
  options: { value: T; label: string }[];
  selected: T | null;
  onSelect: (value: T) => void;
  onNext: () => void;
  onBack?: () => void;
  canGoBack: boolean;
}

function QuestionStep<T extends string>({
  onClose,
  stepNumber,
  eyebrow,
  title,
  options,
  selected,
  onSelect,
  onNext,
  onBack,
  canGoBack,
}: QuestionStepProps<T>) {
  const [showNudge, setShowNudge] = useState(false);

  const accent = COLORS.purple.hero;
  const cardBg = '#F9F8FC';

  const handleNext = () => {
    if (selected === null) {
      setShowNudge(true);
      setTimeout(() => setShowNudge(false), 600);
      return;
    }
    onNext();
  };

  return (
    <div
      className={`
        bg-white
        flex flex-col flex-1
        min-h-[560px]
        p-6 md:px-10 md:pt-14 md:pb-12
        rounded-2xl
        relative
      `}
    >
      <div className="absolute top-5 right-5 z-10">
        <CloseButton onClose={onClose} accentColor={accent} size={28} />
      </div>

      {/* Header — progress dial alone (no skillset name on locate) */}
      <div className="flex items-center mb-6 mt-4">
        <ProgressDial current={stepNumber} />
      </div>

      {/* Question + answers */}
      <div className="flex-1 flex flex-col">
        {/* Eyebrow — sentence case, soft conversational lead-in */}
        <div
          className="mb-2"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: accent,
          }}
        >
          {eyebrow}
        </div>

        {/* Question text — display weight, doing the work of the title */}
        <h2 className="text-headline-m mb-8" style={{ color: accent }}>
          {title}
        </h2>

        <div
          className={`flex flex-col gap-2.5 mb-8 ${
            showNudge ? 'animate-nudge' : ''
          }`}
        >
          {options.map((option) => {
            const isSelected = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelect(option.value)}
                className="flex items-center gap-4 px-5 py-4 rounded-xl w-full text-left cursor-pointer transition-all duration-150"
                style={{
                  background: isSelected ? accent : cardBg,
                  border: isSelected
                    ? `2px solid ${accent}`
                    : '2px solid transparent',
                  boxShadow: isSelected
                    ? `0 4px 16px ${familyAlpha('purple', 'shadow2')}`
                    : 'none',
                  transform: isSelected ? 'translateY(-2px)' : 'none',
                }}
              >
                <span
                  className="text-bold-m"
                  style={{ color: isSelected ? COLORS.ui.white : accent }}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer — back + got it (no eyebrow, no progress bar for 3-step flow) */}
      <div className="flex items-center justify-between gap-3">
        {canGoBack && onBack ? (
          <ButtonSecondary
            color="purple"
            onClick={onBack}
            style={{ padding: '10px 28px' }}
          >
            Back
          </ButtonSecondary>
        ) : (
          <div />
        )}

        <ButtonPrimary
          color="purple"
          onClick={handleNext}
          style={{ padding: '11px 36px' }}
        >
          Got it
        </ButtonPrimary>
      </div>
    </div>
  );
}

// ── ProgressDial — 3 segments, fills as user advances ─────────────────────
// Mirrors the dial in QuestionScreen so the locate steps feel structurally
// identical to a quiz question. For the locate flow it ranges 1-2 (the
// reveal step is a hero, no dial needed).

interface ProgressDialProps {
  current: 1 | 2;
}

function ProgressDial({ current }: ProgressDialProps) {
  const size = 32;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const accent = COLORS.purple.hero;
  const track = COLORS.purple.notYet;

  const segmentAngle = 100;
  const gapAngle = 20;
  const segments = [0, 1, 2];

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcPath = (startAngle: number, endAngle: number) => {
    const startRad = toRad(startAngle - 90);
    const endRad = toRad(endAngle - 90);

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((i) => {
          const startAngle = i * (segmentAngle + gapAngle);
          const endAngle = startAngle + segmentAngle;
          const isFilled = i < current;
          return (
            <path
              key={i}
              d={arcPath(startAngle, endAngle)}
              fill="none"
              stroke={isFilled ? accent : track}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div
        className="absolute inset-0 flex items-center justify-center text-bold-s"
        style={{ color: accent }}
      >
        {current}
      </div>
    </div>
  );
}
