"use client";

import { Compass, MessageCircle, Target, Sparkles } from "lucide-react";
import GrrowCircle from "@/components/circle/GrrowCircle";
import { COLORS, familyAlpha } from "@/lib/colors";
import { TEXT } from "@/lib/typography";

import {
  A4,
  MARGIN,
  UI,
  STRENGTH_ICONS,
  Header,
  getCircleIndex,
  buildScoreMap,
  buildKfgMap,
  scoreToState,
  RING_STAGES,
} from "./shared";
import type { CircleName } from "./shared";
import {
  SnapshotData,
  ReportSkillset,
  CIRCLE_DESCRIPTIONS,
  avgScore,
  getFamily,
} from "./types";

// ═══════════════════════════════════════════════════════════════════════════
// KFG CARD (clean white + colored left border)
// ═══════════════════════════════════════════════════════════════════════════

interface KfgCardProps {
  type: "keep" | "focus" | "grow";
  skillset?: ReportSkillset;
  growTarget?: SnapshotData["growTarget"];
  circle: CircleName;
}

function KfgCard({ type, skillset, growTarget, circle }: KfgCardProps) {
  const family = skillset?.family || getFamily(growTarget?.strength || "Curiosity");
  
  const colors = family === "teal" ? {
    border: UI.teal,
    accent: UI.teal,
    text: COLORS.teal.dark,
    badgeBg: COLORS.teal.notYet,
  } : {
    border: UI.deepPurple,
    accent: UI.deepPurple,
    text: COLORS.purple.dark,
    badgeBg: COLORS.purple.notYet,
  };
  
  const skillsetName = skillset?.name || growTarget?.name || "—";
  const strengthName = skillset?.strength || growTarget?.strength || "—";
  const Icon = STRENGTH_ICONS[strengthName] || Sparkles;
  const isGrow = type === "grow";
  
  const cardCircle = isGrow && growTarget?.circle ? growTarget.circle : circle;
  const circleDisplay = cardCircle.charAt(0) + cardCircle.slice(1).toLowerCase();
  
  const currentScore = skillset?.questions ? avgScore(skillset.questions) : null;
  const state = currentScore !== null ? scoreToState(currentScore) : (isGrow ? "Not yet" : null);
  const displayScore = currentScore !== null ? currentScore : 0;
  
  const barColor = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;
  const stateColor = family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;

  return (
    <div
      style={{
        background: COLORS.ui.white,
        border: `2px solid ${UI.border}`,
        borderLeft: `8px solid ${colors.border}`,
        borderRadius: 12,
        padding: "20px 28px",
        marginBottom: 20,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: colors.badgeBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            <Icon size={26} color={colors.accent} strokeWidth={2} />
          </div>
          <div>
            <div style={{
              fontFamily: "Poppins, sans-serif",
              ...TEXT.headline.s,
              color: colors.accent,
              marginBottom: 6,
            }}>
              {skillsetName}
            </div>
            <div style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: TEXT.bold.m.fontSize,
              fontWeight: 400,
              color: UI.muted,
            }}>
              {circleDisplay} · {strengthName}
            </div>
          </div>
        </div>
        
        <div
          style={{
            fontFamily: "Poppins, sans-serif",
            ...TEXT.eyebrow,
            letterSpacing: "0.08em", // Slightly tighter than default eyebrow
            color: colors.text,
            background: colors.badgeBg,
            padding: "8px 20px",
            borderRadius: 100,
          }}
        >
          {type}
        </div>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            flex: 1,
            height: 12,
            borderRadius: 6,
            background: UI.border,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: isGrow && currentScore === null ? "8%" : `${displayScore}%`,
              background: barColor,
              borderRadius: 6,
              minWidth: isGrow && currentScore === null ? 16 : 0,
            }}
          />
        </div>
        {state && (
          <div style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: TEXT.bold.m.fontSize,
            fontWeight: 400,
            color: stateColor,
          }}>
            {state}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// KFG SECTION
// ═══════════════════════════════════════════════════════════════════════════

interface KfgSectionProps {
  keepSkillset?: ReportSkillset;
  focusSkillset?: ReportSkillset;
  growTarget?: SnapshotData["growTarget"];
  circle: CircleName;
}

function KfgSection({ keepSkillset, focusSkillset, growTarget, circle }: KfgSectionProps) {
  return (
    <div>
      <div
        style={{
          fontFamily: "Poppins, sans-serif",
          ...TEXT.eyebrow,
          color: UI.subtle,
          marginBottom: 20,
        }}
      >
        YOUR FOCUS AREAS
      </div>
      <KfgCard type="keep" skillset={keepSkillset} circle={circle} />
      <KfgCard type="focus" skillset={focusSkillset} circle={circle} />
      <KfgCard type="grow" growTarget={growTarget} circle={circle} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PROCESS FOOTER
// ═══════════════════════════════════════════════════════════════════════════

const PROCESS_STEPS = [
  {
    icon: Compass,
    title: "Reflect",
    copy: "You've done the quiz. Here's your snapshot.",
    status: "done" as const,
  },
  {
    icon: MessageCircle,
    title: "Connect",
    copy: "Now it's time to line up your thinking.",
    status: "current" as const,
  },
  {
    icon: Target,
    title: "Focus",
    copy: "Agree a simple plan to Keep, Focus, Grow.",
    status: "next" as const,
  },
  {
    icon: MessageCircle,
    title: "Check-in",
    copy: "Make a time to check in on progress.",
    status: "next" as const,
  },
];

function ProcessFooter() {
  return (
    <div>
      <div
        style={{
          fontFamily: "Poppins, sans-serif",
          ...TEXT.eyebrow,
          color: UI.subtle,
          marginBottom: 20,
        }}
      >
        WHERE TO NEXT?
      </div>
      
      <div
        style={{
          background: UI.pageBackground,
          borderRadius: 16,
          padding: "28px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 62,
            left: "10%",
            right: "10%",
            height: 4,
            borderTop: `4px dashed ${UI.teal}`,
            opacity: 0.4,
            zIndex: 0,
          }}
        />

        {PROCESS_STEPS.map((step) => {
          const Icon = step.icon;
          const isDone = step.status === "done";
          const isCurrent = step.status === "current";

          const nodeBg = isDone ? UI.paleMint : UI.teal;
          const nodeStroke = UI.teal;
          const iconColor = isDone ? UI.teal : COLORS.ui.white;
          const titleColor = isDone ? COLORS.teal.dark : UI.teal;
          const copyColor = UI.muted;

          return (
            <div
              key={step.title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: nodeBg,
                  border: `4px solid ${nodeStroke}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                {isDone ? (
                  <svg width="28" height="28" viewBox="0 0 16 16">
                    <path d="M3 8l4 4 6-6" stroke={iconColor} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <Icon size={32} color={iconColor} strokeWidth={1.75} />
                )}
              </div>

              <div style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 20, // Report-specific: between heading.md (18) and heading.lg (22)
                fontWeight: 600,
                color: titleColor,
                marginBottom: 6,
              }}>
                {step.title}
              </div>

              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  ...TEXT.light.m,
                  color: copyColor,
                  textAlign: "center",
                  maxWidth: 200,
                }}
              >
                {step.copy}
              </div>
              
              {isCurrent && (
                <div style={{
                  fontFamily: "Poppins, sans-serif",
                  ...TEXT.light.s,
                  color: UI.teal,
                  marginTop: 8,
                }}>
                  You are here
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Page Footer with Legend
// ═══════════════════════════════════════════════════════════════════════════

function PageFooter({ learnerName, leaderName, pageNumber }: { learnerName: string; leaderName: string; pageNumber: number }) {
  const firstName = (name: string) => name.split(" ")[0];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
        borderTop: `1px solid ${UI.border}`,
        marginTop: 20,
      }}
    >
      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <LegendItem type="learner" name={firstName(learnerName)} />
        <LegendItem type="leader" name={firstName(leaderName)} />
        <LegendItem type="both" name="Both" />
      </div>

      {/* Page number */}
      <div style={{
        fontFamily: "Poppins, sans-serif",
        ...TEXT.light.s,
        color: UI.muted,
      }}>
        Page {pageNumber}
      </div>
    </div>
  );
}

function LegendItem({ type, name }: { type: "learner" | "leader" | "both"; name: string }) {
  const accentColor = UI.deepPurple;
  const lightColor = UI.paleLilac;
  const midColor = COLORS.purple.learning;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        {type === "learner" && (
          <circle cx="12" cy="12" r="8" fill={lightColor} stroke={accentColor} strokeWidth="2" />
        )}
        {type === "leader" && (
          <circle cx="12" cy="12" r="8" fill={accentColor} />
        )}
        {type === "both" && (
          <>
            <circle cx="12" cy="12" r="10" fill="none" stroke={midColor} strokeWidth="2.5" />
            <circle cx="12" cy="12" r="5" fill={accentColor} />
          </>
        )}
      </svg>
      <span style={{
        fontFamily: "Poppins, sans-serif",
        fontSize: TEXT.bold.m.fontSize,
        fontWeight: 400,
        color: UI.muted,
      }}>
        {name}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 1
// ═══════════════════════════════════════════════════════════════════════════

export default function SnapshotPage1({ data }: { data: SnapshotData }) {
  const keepSkillset = data.skillsets.find((s) => s.kfg === "keep");
  const focusSkillset = data.skillsets.find((s) => s.kfg === "focus");

  const idx = getCircleIndex(data.circle);
  const stage = RING_STAGES[idx];
  const tagline = stage?.tagline || "";
  const description = CIRCLE_DESCRIPTIONS[data.circle];

  const firstName = data.learner.split(" ")[0];
  const circleDisplay = data.circle.charAt(0) + data.circle.slice(1).toLowerCase();

  const scores = buildScoreMap(data.skillsets, data.circle);
  const kfg = buildKfgMap(data.skillsets, data.circle);

  return (
    <div
      className="snapshot-page"
      style={{
        background: COLORS.ui.white,
        borderRadius: 16,
        border: `2px solid ${UI.border}`,
        width: A4.width,
        minHeight: A4.height,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: `0 8px 48px ${familyAlpha('purple', 'shadow1')}`,
      }}
    >
      <Header learner={data.learner} circle={data.circle} date={data.date} />

      <div style={{ flex: 1, padding: `32px ${MARGIN}px 40px`, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 56, marginBottom: 48, alignItems: "center" }}>
          <div style={{ flexShrink: 0 }}>
            <GrrowCircle scores={scores} kfg={kfg} size={520} animate={false} dark={false} />
          </div>

          <div style={{ flex: 1, paddingRight: 80 }}>
            <h1 style={{
              fontFamily: "Poppins, sans-serif",
              ...TEXT.headline.l,
              // Report hero — consider custom size if 32px isn't big enough
              color: UI.deepPurple,
              margin: 0,
              marginBottom: 8,
            }}>
              <span style={{ display: "block" }}>{firstName}</span>
              <span style={{ display: "block" }}>{circleDisplay}</span>
            </h1>
            <p style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: TEXT.bold.l.fontSize,
              fontWeight: 300,
              lineHeight: 1.5,
              color: UI.muted,
              margin: 0,
              marginBottom: 16,
            }}>
              {description}
            </p>
            <p style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 24, // Report-specific: between heading.xl (26) and heading.lg (22)
              fontWeight: 600,
              lineHeight: 1.4,
              color: UI.teal,
              margin: 0,
            }}>
              {tagline}
            </p>
          </div>
        </div>

        <KfgSection 
          keepSkillset={keepSkillset} 
          focusSkillset={focusSkillset} 
          growTarget={data.growTarget}
          circle={data.circle}
        />

        <div style={{ marginTop: "auto" }}>
          <ProcessFooter />
          <PageFooter learnerName={data.learner} leaderName={data.leader} pageNumber={1} />
        </div>
      </div>
    </div>
  );
}
