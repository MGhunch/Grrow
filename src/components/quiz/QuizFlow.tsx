'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Circle } from '@/lib/types';
import type { QuizInput, ColourFamily } from '@/lib/scoring';
import { getSkillsetsForQuiz, type Skillset, STRENGTH_FAMILY } from '@/lib/questions';
import { calculateSkillsetScore } from '@/lib/scoring';
import { TransitionScreen, type SkillsetMeta, type CompletedScore } from './TransitionScreen';
import { QuestionScreen } from './QuestionScreen';

// ── Types ─────────────────────────────────────────────────────────────

type QuizPhase = 'transition' | 'question';

// Exported for parent components to track quiz state
export interface PhaseInfo {
  phase: QuizPhase;
  family: ColourFamily;
}

interface QuizState {
  phase: QuizPhase;
  currentSkillsetIndex: number;
  currentQuestionIndex: number;
  answers: Record<string, QuizInput>;
  isEndOfCircle: boolean;
}

export interface SkillsetResult {
  skillset: Skillset;
  score: number;
  previousScore?: number;
  answers: QuizInput[];
}

type QuizMode = 'snapshot' | 'checkin';
type PreviousScores = Record<string, number>;

interface QuizFlowProps {
  initialCircle?: Circle;
  skillsets?: Skillset[];
  previousScores?: PreviousScores;
  mode?: QuizMode;
  onPhaseChange?: (info: PhaseInfo) => void;
  onComplete: (results: SkillsetResult[]) => void;
  onClose: () => void;
}

// ── Component ─────────────────────────────────────────────────────────

export function QuizFlow({ 
  initialCircle, 
  skillsets: providedSkillsets,
  previousScores = {},
  mode: providedMode,
  onPhaseChange,
  onComplete, 
  onClose 
}: QuizFlowProps) {

  const mode: QuizMode = providedMode ?? (providedSkillsets ? 'checkin' : 'snapshot');

  const skillsets: Skillset[] = useMemo(() => {
    if (providedSkillsets && providedSkillsets.length > 0) {
      return providedSkillsets;
    }
    if (!initialCircle) {
      console.warn('QuizFlow: neither skillsets nor initialCircle provided');
      return [];
    }
    const all = getSkillsetsForQuiz([initialCircle, initialCircle]);
    return all.filter((s, i, arr) => arr.findIndex(x => x.skillset === s.skillset) === i);
  }, [initialCircle, providedSkillsets]);

  const displayCircle: Circle = initialCircle ?? skillsets[0]?.circle ?? 'ESSENTIALS';
  const initialPhase: QuizPhase = mode === 'checkin' ? 'question' : 'transition';

  const [state, setState] = useState<QuizState>({
    phase: initialPhase,
    currentSkillsetIndex: 0,
    currentQuestionIndex: 0,
    answers: {},
    isEndOfCircle: false,
  });

  // ── Report phase changes to parent ───────────────────────────────────

  const currentSkillset = skillsets[state.currentSkillsetIndex];
  
  const currentFamily: ColourFamily = currentSkillset
    ? STRENGTH_FAMILY[currentSkillset.strength]
    : 'purple';

  useEffect(() => {
    if (onPhaseChange) {
      onPhaseChange({
        phase: state.phase,
        family: currentFamily,
      });
    }
  }, [state.phase, currentFamily, onPhaseChange]);

  // ── Derived values ───────────────────────────────────────────────────

  const currentQuestion = currentSkillset?.questions[state.currentQuestionIndex];
  const totalQuestions = skillsets.length * 3;
  const totalAnswered = state.currentSkillsetIndex * 3 + state.currentQuestionIndex;

  const completedSkillsets: string[] = useMemo(() =>
    skillsets
      .filter(s => s.questions.every(q => state.answers[q.id] != null))
      .map(s => s.skillset),
    [skillsets, state.answers]
  );

  const completedScores: CompletedScore[] = useMemo(() =>
    skillsets
      .filter(s => s.questions.every(q => state.answers[q.id] != null))
      .map(s => ({
        strength: s.strength,
        score: calculateSkillsetScore(s.questions.map(q => state.answers[q.id] || 'not_really')),
      })),
    [skillsets, state.answers]
  );

  const skillsetMetas: SkillsetMeta[] = useMemo(() =>
    skillsets.map(s => ({
      skillset: s.skillset,
      strength: s.strength,
      objective: s.objective,
    })),
    [skillsets]
  );

  // ── Helpers ──────────────────────────────────────────────────────────

  const calculateResults = (): SkillsetResult[] =>
    skillsets.map(s => ({
      skillset: s,
      score: calculateSkillsetScore(s.questions.map(q => state.answers[q.id] || 'not_really')),
      previousScore: previousScores[s.skillset],
      answers: s.questions.map(q => state.answers[q.id] || 'not_really'),
    }));

  // ── Handlers ─────────────────────────────────────────────────────────

  const handleStart = () => {
    if (state.isEndOfCircle) {
      onComplete(calculateResults());
    } else {
      setState(s => ({ ...s, phase: 'question' }));
    }
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    const isLastQ = state.currentQuestionIndex === 2;
    const isLastSkillset = state.currentSkillsetIndex === skillsets.length - 1;

    if (!isLastQ) {
      setState(s => ({ ...s, currentQuestionIndex: s.currentQuestionIndex + 1 }));
      return;
    }

    if (isLastSkillset) {
      onComplete(calculateResults());
    } else {
      setState(s => ({
        ...s,
        currentSkillsetIndex: s.currentSkillsetIndex + 1,
        currentQuestionIndex: 0,
        phase: mode === 'checkin' ? 'question' : 'transition',
      }));
    }
  };

  const handleBack = () => {
    if (state.currentQuestionIndex > 0) {
      setState(s => ({ ...s, currentQuestionIndex: s.currentQuestionIndex - 1 }));
    } else if (state.currentSkillsetIndex > 0) {
      setState(s => ({
        ...s,
        currentSkillsetIndex: s.currentSkillsetIndex - 1,
        currentQuestionIndex: 2,
        phase: 'question',
      }));
    } else if (mode === 'checkin') {
      onClose();
    } else {
      setState(s => ({ ...s, phase: 'transition', isEndOfCircle: false }));
    }
  };

  const handleSelectAnswer = (value: QuizInput) => {
    if (!currentQuestion) return;
    setState(s => ({
      ...s,
      answers: { ...s.answers, [currentQuestion.id]: value },
    }));
  };

  const handleJumpTo = (skillset: string) => {
    const index = skillsets.findIndex(s => s.skillset === skillset);
    if (index < 0) return;
    setState(s => ({
      ...s,
      currentSkillsetIndex: index,
      currentQuestionIndex: 0,
      phase: 'question',
      isEndOfCircle: false,
    }));
  };

  // ── Render ────────────────────────────────────────────────────────────

  if (state.phase === 'transition' && currentSkillset) {
    return (
      <TransitionScreen
        circle={displayCircle}
        skillsets={skillsetMetas}
        completedSkillsets={completedSkillsets}
        completedScores={completedScores}
        currentSkillset={currentSkillset.skillset}
        isFirst={state.currentSkillsetIndex === 0 && !state.isEndOfCircle}
        isEndOfCircle={state.isEndOfCircle}
        mode={mode}
        onStart={handleStart}
        onJumpTo={handleJumpTo}
        onClose={onClose}
      />
    );
  }

  if (state.phase === 'question' && currentSkillset && currentQuestion) {
    const canGoBack = state.currentSkillsetIndex > 0 || state.currentQuestionIndex > 0;
    return (
      <QuestionScreen
        questionText={currentQuestion.questionText}
        strength={currentSkillset.strength}
        skillset={currentSkillset.skillset}
        circle={currentSkillset.circle}
        questionInSkillset={state.currentQuestionIndex + 1}
        totalAnswered={totalAnswered}
        totalQuestions={totalQuestions}
        selectedAnswer={state.answers[currentQuestion.id] ?? null}
        onSelectAnswer={handleSelectAnswer}
        onNext={handleNext}
        onBack={handleBack}
        canGoBack={canGoBack}
        onClose={onClose}
      />
    );
  }

  return null;
}
