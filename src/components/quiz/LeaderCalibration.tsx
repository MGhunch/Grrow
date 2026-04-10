"use client";

import { useState, useEffect } from "react";
import { Sparkles, Network, Waves, GitBranch, Check } from "lucide-react";
import { segKey } from "@/lib/skillsets";
import { scoreToState } from "@/lib/scoring";
import { STRENGTH_FAMILY } from "@/lib/questions";
import CloseButton from "../shared/CloseButton";
import { ButtonPrimary, ButtonSecondary } from "../shared/Button";
import CircleSimple from "../circle/CircleSimple";
import type { Circle, StrengthName, ScoreState } from "@/lib/types";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

type Phase = "intro" | "calibrating" | "complete";
type ColourFamily = "purple" | "teal";

interface Question {
  id: string;
  title: string;
  learnerAnswer: string;
}

interface SkillsetWithAnswers {
  id: string;
  name: string;
  strength: StrengthName;
  family: ColourFamily;
  objective: string;
  questions: Question[];
}

interface Adjustment {
  questionId: string;
  skillsetId: string;
  learnerAnswer: string;
  leaderAnswer: string;
}

interface Props {
  dark: boolean;
  onClose: () => void;
  onComplete: (adjustments: Adjustment[], notes: Record<string, string>) => void;
  learner: { name: string };
  circle: Circle;
  skillsets: SkillsetWithAnswers[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════════════════

const OPTIONS = ["Not really", "Sometimes", "Mostly", "Intuitively"];

const ANSWER_TO_SCORE: Record<string, number> = {
  "Not really": 0,
  "Sometimes": 33,
  "Mostly": 66,
  "Intuitively": 100,
};

const STRENGTH_TO_SI: Record<StrengthName, number> = {
  "Collaboration": 0,
  "Curiosity": 1,
  "Critical Thinking": 2,
  "Communication": 3,
};

const NOTE_PROMPTS = [
  { display: "You're great at...", insert: "You're great at " },
  { display: "Worth exploring...", insert: "Worth exploring " },
  { display: "For example...", insert: "For example " },
];

const CIRCLE_DISPLAY: Record<Circle, string> = {
  ESSENTIALS: "Essentials",
  EXPLORING: "Exploring",
  INFLUENCING: "Influencing",
  LEADING: "Leading",
};

const STRENGTH_ICONS: Record<StrengthName, typeof Sparkles> = {
  "Curiosity": Sparkles,
  "Collaboration": Network,
  "Communication": Waves,
  "Critical Thinking": GitBranch,
};

const CIRCLE_TO_RING: Record<Circle, number> = {
  LEADING: 0,
  INFLUENCING: 1,
  EXPLORING: 2,
  ESSENTIALS: 3,
};

// Color values for dynamic styling
const COLORS = {
  purple: { hero: "#4C3FA0", dark: "#3C3289" },
  teal: { hero: "#18B99A", dark: "#0D9A82" },
  notes: "#FAFAFD",
  white: "#FFFFFF",
  muted: "#6B6390",
  border: "#E5E0F5",
  nearBlack: "#1A1525",
};

// ═══════════════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════════════

export default function LeaderCalibration({
  dark,
  onClose,
  onComplete,
  learner,
  circle,
  skillsets,
}: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [noteOpen, setNoteOpen] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Current skillset
  const skillset = skillsets[currentIndex];
  const family = skillset?.family ?? "purple";
  const accent = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;
  const navAccent = family === "purple" ? COLORS.teal.hero : COLORS.purple.hero;

  // Check for diffs in current skillset
  const hasDiff = skillset?.questions.some(q => {
    const leaderAnswer = answers[q.id];
    return leaderAnswer && leaderAnswer !== q.learnerAnswer;
  }) ?? false;

  // Check if leader has interacted with any question
  const hasInteracted = skillset?.questions.some(q => answers[q.id] !== undefined) ?? false;

  // Auto-open notes when a diff is detected
  useEffect(() => {
    if (hasDiff && skillset) {
      setNoteOpen(skillset.id);
    }
  }, [hasDiff, skillset]);

  // Reset confirm popup when skillset changes
  useEffect(() => {
    setShowConfirm(false);
  }, [currentIndex]);

  // Collect all adjustments
  const getAdjustments = (): Adjustment[] => {
    const adjustments: Adjustment[] = [];
    skillsets.forEach(s => {
      s.questions.forEach(q => {
        const leaderAnswer = answers[q.id];
        if (leaderAnswer && leaderAnswer !== q.learnerAnswer) {
          adjustments.push({
            questionId: q.id,
            skillsetId: s.id,
            learnerAnswer: q.learnerAnswer,
            leaderAnswer,
          });
        }
      });
    });
    return adjustments;
  };

  // Handlers
  const handleSelect = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    setShowConfirm(false);
  };

  const handleNote = (note: string) => {
    setNotes(prev => ({ ...prev, [skillset.id]: note }));
  };

  const goNext = () => {
    if (!hasInteracted) {
      setShowConfirm(true);
      return;
    }
    proceedNext();
  };

  const proceedNext = () => {
    setShowConfirm(false);
    setNoteOpen(null);
    if (currentIndex < skillsets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPhase("complete");
    }
  };

  const goBack = () => {
    setShowConfirm(false);
    setNoteOpen(null);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleComplete = () => {
    onComplete(getAdjustments(), notes);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Intro Phase
  // ─────────────────────────────────────────────────────────────────────────

  const renderIntro = () => {
    const learnerScores: Record<string, ScoreState> = {};
    const ri = CIRCLE_TO_RING[circle];
    
    skillsets.forEach(s => {
      const si = STRENGTH_TO_SI[s.strength];
      const questionScores = s.questions.map(q => ANSWER_TO_SCORE[q.learnerAnswer] ?? 0);
      const avgScore = questionScores.reduce((a, b) => a + b, 0) / questionScores.length;
      learnerScores[segKey(si, ri)] = scoreToState(avgScore);
    });

    return (
      <div className="flex flex-col items-center min-h-[464px]">
        {/* Close */}
        <div className="absolute top-5 right-5 z-10">
          <CloseButton onClose={onClose} accentColor={COLORS.purple.hero} size={28} />
        </div>

        {/* Circle */}
        <div className="mt-5 mb-8">
          <CircleSimple size={240} activeRing={CIRCLE_TO_RING[circle]} scores={learnerScores} />
        </div>

        {/* Circle label */}
        <div className="text-eyebrow text-purple-hero mb-1.5">
          {CIRCLE_DISPLAY[circle]}
        </div>

        {/* Headline */}
        <h2 className="text-headline-l text-purple-hero mb-3">
          {learner.name}&apos;s take
        </h2>

        {/* Subtext */}
        <p className="text-std-m text-ui-muted text-center max-w-[320px] mb-10">
          Review {learner.name}&apos;s answers and nudge them up or down based on your perspective.
        </p>

        {/* CTA */}
        <ButtonPrimary color="teal" onClick={() => setPhase("calibrating")}>
          Review Snapshot
        </ButtonPrimary>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Calibrating Phase
  // ─────────────────────────────────────────────────────────────────────────

  const renderCalibrating = () => {
    const Icon = STRENGTH_ICONS[skillset.strength];
    const isLastSkillset = currentIndex === skillsets.length - 1;
    const isFirstSkillset = currentIndex === 0;
    const isNoteOpen = noteOpen === skillset.id;
    const currentNote = notes[skillset.id] || "";

    // Progress ring calculations
    const progressPercent = (currentIndex + 1) / skillsets.length;
    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${circumference * progressPercent} ${circumference * (1 - progressPercent)}`;

    // Background class for hero cards
    const cardBgClass = family === "purple" ? "bg-purple-hero" : "bg-teal-hero";

    return (
      <div className="flex flex-col min-h-[500px]">
        {/* Close */}
        <div className="absolute top-5 right-5 z-10">
          <CloseButton onClose={onClose} accentColor={COLORS.teal.hero} size={28} />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {/* Progress ring + icon */}
          <div className="relative w-10 h-10 md:w-14 md:h-14 shrink-0">
            <svg className="absolute inset-0 w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="40%"
                fill="none"
                stroke="#E8E8E8"
                strokeWidth="3"
              />
              <circle
                cx="50%"
                cy="50%"
                r="40%"
                fill="none"
                stroke={navAccent}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
              />
            </svg>
            <div 
              className="absolute inset-0 flex items-center justify-center rounded-full"
              style={{ 
                background: family === "purple" ? "#D8D4F5" : "#C8F0EA",
                margin: "15%",
              }}
            >
              <Icon size={16} strokeWidth={1.75} color={accent} />
            </div>
          </div>

          {/* Eyebrow + skillset name */}
          <div>
            <div className="text-eyebrow mb-0.5" style={{ color: accent }}>
              {skillset.strength.toUpperCase()}
            </div>
            <h3 className="text-headline-s md:text-headline-m" style={{ color: accent }}>
              {skillset.name}
            </h3>
          </div>
        </div>

        {/* Objective */}
        <p className="text-bold-m text-ui-muted mb-4">
          {skillset.objective}
        </p>

        {/* Question cards — BOLD treatment */}
        <div className="flex flex-col gap-3 mb-4 flex-1">
          {skillset.questions.map((q) => {
            const leaderAnswer = answers[q.id];

            return (
              <div
                key={q.id}
                className={`${cardBgClass} rounded-xl p-4 md:p-5`}
              >
                {/* Question title */}
                <div className="text-bold-m md:text-bold-l font-semibold text-white mb-3 md:mb-4">
                  {q.title}
                </div>

                {/* Options — vertical on mobile, horizontal pill on desktop */}
                {/* Mobile: vertical stack */}
                <div className="flex flex-col gap-1.5 md:hidden">
                  {OPTIONS.map((opt) => {
                    const isLearnerPick = opt === q.learnerAnswer;
                    const isLeaderPick = opt === leaderAnswer;
                    const isAligned = isLearnerPick && isLeaderPick;

                    // Colors: learner = accent fill + white border, leader = navAccent fill
                    let background = COLORS.white;
                    let textColor = COLORS.muted;
                    let borderStyle = "none";
                    let fontWeight = "400";

                    if (isLearnerPick && !isLeaderPick) {
                      // Learner only: purple fill, white text, white border (separates from card)
                      background = accent;
                      textColor = COLORS.white;
                      fontWeight = "600";
                      borderStyle = `2px solid ${COLORS.white}`;
                    } else if (isLeaderPick && !isLearnerPick) {
                      // Leader only: navAccent fill, white text, white border
                      background = navAccent;
                      textColor = COLORS.white;
                      fontWeight = "600";
                      borderStyle = `2px solid ${COLORS.white}`;
                    } else if (isAligned) {
                      // Aligned: 50/50 split purple|teal, white border
                      background = `linear-gradient(to right, ${accent} 50%, ${navAccent} 50%)`;
                      textColor = COLORS.white;
                      fontWeight = "600";
                      borderStyle = `2px solid ${COLORS.white}`;
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(q.id, opt)}
                        className="py-2.5 px-3 text-sm rounded-lg text-left transition-all"
                        style={{
                          background,
                          color: textColor,
                          border: borderStyle,
                          fontWeight,
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Desktop: horizontal pill */}
                <div 
                  className="hidden md:flex rounded-full overflow-hidden"
                  style={{ 
                    background: COLORS.white,
                    border: `2px solid ${COLORS.white}`,
                  }}
                >
                  {OPTIONS.map((opt, optIndex) => {
                    const isLearnerPick = opt === q.learnerAnswer;
                    const isLeaderPick = opt === leaderAnswer;
                    const isAligned = isLearnerPick && isLeaderPick;
                    const isLast = optIndex === OPTIONS.length - 1;

                    // All selected states: colored fill + white text
                    let background = "transparent";
                    let textColor = COLORS.muted;
                    let borderRadius = "0";
                    let zIndex = 1;
                    let fontWeight = "400";

                    if (isLearnerPick && !isLeaderPick) {
                      // Learner only: purple fill, white text
                      background = accent;
                      textColor = COLORS.white;
                      fontWeight = "600";
                      borderRadius = "4px";
                      zIndex = 2;
                    } else if (isLeaderPick && !isLearnerPick) {
                      // Leader only: teal fill, white text
                      background = navAccent;
                      textColor = COLORS.white;
                      fontWeight = "600";
                      borderRadius = "4px";
                      zIndex = 2;
                    } else if (isAligned) {
                      // Aligned: 50/50 split purple|teal
                      background = `linear-gradient(to right, ${accent} 50%, ${navAccent} 50%)`;
                      textColor = COLORS.white;
                      fontWeight = "600";
                      borderRadius = "4px";
                      zIndex = 2;
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(q.id, opt)}
                        className="flex-1 py-2.5 px-2 text-sm transition-all relative"
                        style={{
                          background,
                          color: textColor,
                          borderRight: !isLast ? `1px solid ${COLORS.border}` : "none",
                          borderRadius,
                          zIndex,
                          fontWeight,
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes area */}
        {isNoteOpen && (
          <div 
            className="rounded-xl p-3 md:p-4 mb-4"
            style={{ background: COLORS.notes }}
          >
            <div className="text-bold-s text-near-black mb-2.5">Notes</div>
            
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {NOTE_PROMPTS.map(prompt => (
                <button
                  key={prompt.display}
                  onClick={() => handleNote(currentNote + (currentNote ? " " : "") + prompt.insert)}
                  className="px-3 py-1.5 text-xs bg-white border border-ui-bdr rounded-full text-ui-muted hover:bg-ui-hover transition-colors"
                >
                  {prompt.display}
                </button>
              ))}
            </div>

            <textarea
              value={currentNote}
              onChange={(e) => handleNote(e.target.value)}
              placeholder="Short notes to explain the difference and prompt a good conversation."
              className="w-full min-h-[70px] p-3 text-std-s border border-ui-bdr rounded-lg resize-y bg-white text-near-black placeholder:text-ui-copy"
            />
          </div>
        )}

        {/* Confirmation prompt */}
        {showConfirm && (
          <div 
            className="p-4 md:p-5 rounded-xl mb-4 border"
            style={{ 
              background: family === "purple" ? "#F5F3FF" : "#F0FBF8",
              borderColor: accent,
            }}
          >
            <div className="text-bold-m text-near-black mb-1.5">
              All good with {learner.name}&apos;s answers?
            </div>
            <p className="text-std-s text-ui-muted mb-4">
              Just click something different if anything needs a nudge.
            </p>
            <div className="flex gap-2.5">
              <ButtonSecondary
                color={family}
                onClick={() => setShowConfirm(false)}
                shadow={false}
                style={{ padding: "10px 20px" }}
              >
                Go back
              </ButtonSecondary>
              <ButtonPrimary
                color={family}
                onClick={proceedNext}
                shadow={false}
                style={{ padding: "10px 20px" }}
              >
                Looks good
              </ButtonPrimary>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mt-auto pt-4">
          {/* Legend */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-1.5">
              <div 
                className="w-4 h-2.5 md:w-6 md:h-3.5 rounded-sm"
                style={{ background: accent }}
              />
              <span className="text-xs text-ui-muted">{learner.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div 
                className="w-4 h-2.5 md:w-6 md:h-3.5 rounded-sm"
                style={{ background: navAccent }}
              />
              <span className="text-xs text-ui-muted">You</span>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2">
            {!isFirstSkillset && (
              <ButtonSecondary
                color={family}
                onClick={goBack}
                shadow={false}
                style={{ padding: "10px 20px" }}
              >
                Back
              </ButtonSecondary>
            )}
            <ButtonPrimary
              color={family}
              onClick={goNext}
              style={{ padding: "11px 28px" }}
            >
              {isLastSkillset ? "Done" : "Next"}
            </ButtonPrimary>
          </div>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Complete Phase
  // ─────────────────────────────────────────────────────────────────────────

  const renderComplete = () => {
    const adjustments = getAdjustments();
    const hasAdjustments = adjustments.length > 0;
    const notesWithContent = Object.entries(notes).filter(([_, v]) => v.trim());

    return (
      <div className="flex flex-col min-h-[464px]">
        {/* Close */}
        <div className="absolute top-5 right-5 z-10">
          <CloseButton onClose={onClose} accentColor={COLORS.purple.hero} size={28} />
        </div>

        {/* Badge */}
        <div 
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full mb-5 self-start"
          style={{ background: "#E1F5EE" }}
        >
          <Check size={14} strokeWidth={2.5} color={COLORS.teal.hero} />
          <span className="text-bold-m text-teal-hero">Review complete</span>
        </div>

        {/* Headline */}
        <h2 className="text-headline-l text-purple-hero mb-2">
          {hasAdjustments
            ? `${adjustments.length} to explore with ${learner.name}`
            : `You're aligned with ${learner.name}`
          }
        </h2>

        {/* Subtext */}
        <p className="text-std-m text-ui-muted mb-6">
          {hasAdjustments
            ? "These will be highlighted in your Connect conversation."
            : "No adjustments — you see things the same way."
          }
        </p>

        {/* Adjustments list */}
        {hasAdjustments && (
          <div className="mb-6">
            {adjustments.map((adj, i) => {
              const adjSkillset = skillsets.find(s => s.id === adj.skillsetId);
              const question = adjSkillset?.questions.find(q => q.id === adj.questionId);
              const adjFamily = adjSkillset?.family ?? "purple";
              const adjAccent = adjFamily === "purple" ? COLORS.purple.hero : COLORS.teal.hero;
              const adjNav = adjFamily === "purple" ? COLORS.teal.hero : COLORS.purple.hero;

              return (
                <div
                  key={i}
                  className="p-3 md:p-4 rounded-xl mb-2"
                  style={{ 
                    background: adjFamily === "purple" ? "#F5F3FF" : "#F0FBF8",
                  }}
                >
                  <div className="text-bold-s text-near-black mb-1">
                    {question?.title}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span style={{ color: adjAccent }}>{adj.learnerAnswer}</span>
                    <span className="text-ui-muted">→</span>
                    <span style={{ color: adjNav }}>{adj.leaderAnswer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Notes summary */}
        {notesWithContent.length > 0 && (
          <div className="mb-6">
            <div className="text-bold-s text-ui-muted mb-2">Your notes</div>
            {notesWithContent.map(([skillsetId, note]) => {
              const noteSkillset = skillsets.find(s => s.id === skillsetId);
              return (
                <div
                  key={skillsetId}
                  className="p-3 rounded-lg mb-2"
                  style={{ background: COLORS.notes }}
                >
                  <div className="text-bold-s text-near-black mb-0.5">
                    {noteSkillset?.name}
                  </div>
                  <div className="text-std-s text-ui-muted">
                    {note}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto flex justify-center">
          <ButtonPrimary color="teal" onClick={handleComplete}>
            Ready for Connect
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Modal
  // ─────────────────────────────────────────────────────────────────────────

  const overlayClass = dark 
    ? "bg-[rgba(10,8,22,0.85)]" 
    : "bg-[rgba(20,16,48,0.5)]";

  const modalBg = dark ? "#0D0B16" : "#FFFFFF";
  const modalBorder = dark ? "#251E40" : "#E5E0F5";

  return (
    <div
      className={`fixed inset-0 z-[100] ${overlayClass} backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-y-auto animate-[fadeIn_0.2s_ease]`}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[540px] min-h-[560px] max-h-[90vh] overflow-y-auto rounded-2xl relative animate-[slideUp_0.22s_ease] p-5 md:p-10 md:pt-12"
        style={{
          background: modalBg,
          border: `1px solid ${modalBorder}`,
          boxShadow: dark
            ? "0 32px 80px rgba(76, 63, 160, 0.3)"
            : "0 32px 80px rgba(76, 63, 160, 0.15)",
        }}
      >
        {phase === "intro" && renderIntro()}
        {phase === "calibrating" && renderCalibrating()}
        {phase === "complete" && renderComplete()}
      </div>
    </div>
  );
}
