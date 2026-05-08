'use client';

// ── ExplorerEntry ─────────────────────────────────────────────────────────
// The full explorer journey in one mount. Replaces the bare <QuizWrap> on
// the home page and the QuizTrialSection.
//
//   1. Locate flow (QuizTestWelcome) — welcome → Q1 → Q2 → reveal
//   2. On the reveal's "Take the quiz", capture the determined circle and
//      hand off to QuizWrap with initialCircle set, which skips
//      "Choose your circle" and drops the explorer straight into questions.
//
// Logged-in users will skip this entirely once Supabase is wired up.
// ──────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { familyAlpha } from '@/lib/colors';
import { QuizTestWelcome } from './QuizTestWelcome';
import QuizWrap from './QuizWrap';
import type { Circle } from '@/lib/types';

interface ExplorerEntryProps {
  dark: boolean;
  onClose: () => void;
}

export default function ExplorerEntry({ dark, onClose }: ExplorerEntryProps) {
  const [locateComplete, setLocateComplete] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<Circle>('ESSENTIALS');

  // Once locate's reveal fires, hand off to QuizWrap with the circle preset.
  // QuizWrap handles its own modal frame from this point.
  // testMode={true} caps the flow at the results screen with a "Try a different
  // circle" CTA — the full gap/stretch/KFG journey is reserved for signed-in users.
  if (locateComplete) {
    return (
      <QuizWrap
        dark={dark}
        onClose={onClose}
        initialCircle={selectedCircle}
        testMode
      />
    );
  }

  // Locate flow — wrap QuizTestWelcome in the same modal frame QuizWrap uses,
  // so the visual transition into the quiz is seamless.
  const mode = dark ? 'dark' : 'light';
  const backdropBg = dark ? 'bg-black/85' : 'bg-[rgba(20,16,48,0.5)]';
  const modalShadow = dark
    ? '0 32px 80px rgba(0,0,0,0.7)'
    : `0 32px 80px ${familyAlpha('purple', 'shadow2', mode)}`;

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
        className="w-full max-w-[540px] h-[620px] overflow-y-auto rounded-2xl relative animate-slide-up"
        style={{
          background: 'transparent',
          boxShadow: modalShadow,
        }}
      >
        <QuizTestWelcome
          onClose={onClose}
          onStartQuiz={(circle) => {
            setSelectedCircle(circle);
            setLocateComplete(true);
          }}
        />
      </div>
    </div>
  );
}
