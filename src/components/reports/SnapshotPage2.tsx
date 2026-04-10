"use client";

import { COLORS, familyAlpha } from "@/lib/colors";
import { TEXT } from "@/lib/typography";
import {
  A4,
  MARGIN,
  UI,
  STRENGTH_ICONS,
  HeaderCompact,
  scoreToState,
} from "./shared";
import type { ScoreState } from "./shared";
import {
  SnapshotData,
  ReportSkillset,
  ReportQuestion,
  avgScore,
} from "./types";

// ═══════════════════════════════════════════════════════════════════════════
// Layout Constants (150dpi)
// ═══════════════════════════════════════════════════════════════════════════

const LAYOUT = {
  titleWidth: 200,
  scaleWidth: 700,
  scalePadding: 16, // padding for circle markers at edges
  cardPadding: 28,
};

// ═══════════════════════════════════════════════════════════════════════════
// Score Scale
// ═══════════════════════════════════════════════════════════════════════════

const SCALE = {
  labels: ["Not really", "Sometimes", "Mostly", "Intuitively"],
  scores: [0, 33, 66, 100],
};

function scoreToX(score: number): number {
  const usableWidth = LAYOUT.scaleWidth - LAYOUT.scalePadding * 2;
  const idx = SCALE.scores.indexOf(score);
  if (idx !== -1) {
    return LAYOUT.scalePadding + (idx / 3) * usableWidth;
  }
  const pct = score / 100;
  return LAYOUT.scalePadding + pct * usableWidth;
}

function getTickPositions(): number[] {
  return SCALE.scores.map((s) => scoreToX(s));
}

// ═══════════════════════════════════════════════════════════════════════════
// Variance Marker Colors (consistent across all skillsets)
// ═══════════════════════════════════════════════════════════════════════════

const MARKER = {
  learner: COLORS.purple.hero,    // Purple dot
  leader: COLORS.teal.hero,       // Teal ring
};

// ═══════════════════════════════════════════════════════════════════════════
// Skillset Card
// ═══════════════════════════════════════════════════════════════════════════

interface SkillsetCardProps {
  skillset: ReportSkillset;
}

function SkillsetCard({ skillset }: SkillsetCardProps) {
  const leaderAvg = avgScore(skillset.questions, true);
  const state = scoreToState(leaderAvg);
  const isPurple = skillset.family === "purple";
  const accentColor = isPurple ? UI.deepPurple : UI.teal;
  const lightColor = isPurple ? UI.lightPurple : UI.lightTeal;

  // Family-matched note colors
  const noteColors = isPurple
    ? { bg: COLORS.ui.lightHover, text: COLORS.purple.dark }
    : { bg: COLORS.teal.notYet, text: COLORS.teal.dark };

  const Icon = STRENGTH_ICONS[skillset.strength];

  return (
    <div
      style={{
        border: `2px solid ${UI.border}`,
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        background: COLORS.ui.white,
        marginBottom: 20,
      }}
    >
      {/* Left accent bar */}
      <div style={{ width: 6, background: accentColor, flexShrink: 0 }} />

      <div style={{ flex: 1, padding: "20px 28px" }}>
        {/* Header: Icon + Skillset name + State badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: lightColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {Icon && <Icon size={20} color={accentColor} strokeWidth={2} />}
            </div>
            <div style={{
              fontFamily: "Poppins, sans-serif",
              ...TEXT.headline.s,
              color: accentColor,
            }}>
              {skillset.name}
            </div>
          </div>
          <StateBadge state={state} family={skillset.family} />
        </div>

        {/* Scale labels header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: LAYOUT.titleWidth + 16,
            marginBottom: 4,
          }}
        >
          <div style={{ width: LAYOUT.scaleWidth, display: "flex", justifyContent: "space-between", paddingLeft: 8, paddingRight: 8 }}>
            {SCALE.labels.map((label) => (
              <div
                key={label}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  ...TEXT.standard.s,
                  color: UI.subtle,
                  textAlign: "center",
                  width: 120,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Question rows */}
        {skillset.questions.map((q, i) => (
          <QuestionRow
            key={q.id}
            question={q}
            family={skillset.family}
            isLast={i === skillset.questions.length - 1}
          />
        ))}

        {/* Notes section - always present, family-matched colors */}
        <div
          style={{
            background: noteColors.bg,
            borderRadius: 8,
            padding: "12px 16px",
            marginTop: 12,
            minHeight: 44,
          }}
        >
          {skillset.leaderNote ? (
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                ...TEXT.standard.m,
                color: noteColors.text,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              <span style={{ marginRight: 8, opacity: 0.6 }}>✎</span>
              {skillset.leaderNote}
            </div>
          ) : (
            <div style={{
              fontFamily: "Poppins, sans-serif",
              ...TEXT.standard.m,
              color: noteColors.text,
              opacity: 0.4,
              fontStyle: "italic",
            }}>
              Notes...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Question Row
// ═══════════════════════════════════════════════════════════════════════════

function QuestionRow({
  question,
  family,
  isLast,
}: {
  question: ReportQuestion;
  family: "purple" | "teal";
  isLast: boolean;
}) {
  const isPurple = family === "purple";
  const trackColor = isPurple ? COLORS.ui.lightBorder : COLORS.teal.notYet;
  const tickColor = isPurple ? COLORS.purple.notYet : COLORS.teal.notYet;

  const learnerX = scoreToX(question.score);
  const leaderX = scoreToX(question.leaderScore);
  const isAligned = question.score === question.leaderScore;
  const ticks = getTickPositions();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "8px 0",
        borderBottom: isLast ? "none" : `1px solid ${UI.border}`,
      }}
    >
      {/* Question title */}
      <div
        style={{
          width: LAYOUT.titleWidth,
          fontFamily: "Poppins, sans-serif",
          ...TEXT.standard.m,
          color: UI.nearBlack,
          flexShrink: 0,
        }}
      >
        {question.title}
      </div>

      {/* Scale line with markers */}
      <svg
        width={LAYOUT.scaleWidth}
        height="26"
        viewBox={`0 0 ${LAYOUT.scaleWidth} 26`}
        style={{ display: "block", flexShrink: 0 }}
      >
        {/* Track */}
        <line
          x1={LAYOUT.scalePadding}
          y1="13"
          x2={LAYOUT.scaleWidth - LAYOUT.scalePadding}
          y2="13"
          stroke={trackColor}
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Tick marks */}
        {ticks.map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="8"
            x2={x}
            y2="18"
            stroke={tickColor}
            strokeWidth="2"
          />
        ))}

        {/* Markers: purple dot = learner, teal ring = leader */}
        {isAligned ? (
          // Aligned: bullseye — teal ring around purple dot
          <>
            <circle cx={learnerX} cy="13" r="10" fill="none" stroke={MARKER.leader} strokeWidth="2.5" />
            <circle cx={learnerX} cy="13" r="5" fill={MARKER.learner} />
          </>
        ) : (
          // Different: separate markers
          <>
            <circle cx={learnerX} cy="13" r="5" fill={MARKER.learner} />
            <circle cx={leaderX} cy="13" r="10" fill="none" stroke={MARKER.leader} strokeWidth="2.5" />
          </>
        )}
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Supporting Components
// ═══════════════════════════════════════════════════════════════════════════

function StateBadge({ state, family }: { state: ScoreState; family: "purple" | "teal" }) {
  const isPale = state === "Not yet" || state === "Learning";
  const isPurple = family === "purple";

  const bgColor = isPurple
    ? (state === "Nailing it" ? UI.deepPurple : state === "Growing" ? UI.midPurple : UI.lightPurple)
    : (state === "Nailing it" ? UI.teal : state === "Growing" ? COLORS.teal.growing : UI.lightTeal);

  const textColor = isPale
    ? (isPurple ? COLORS.purple.dark : COLORS.teal.dark)
    : COLORS.ui.white;

  return (
    <span
      style={{
        fontFamily: "Poppins, sans-serif",
        fontSize: TEXT.bold.m.fontSize,
        fontWeight: 600,
        padding: "8px 20px",
        borderRadius: 100,
        background: bgColor,
        color: textColor,
      }}
    >
      {state}
    </span>
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
        marginTop: "auto",
      }}
    >
      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <LegendItem type="learner" name={firstName(learnerName)} />
        <LegendItem type="leader" name={firstName(leaderName)} />
        <LegendItem type="both" name="Aligned" />
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
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        {type === "learner" && (
          <circle cx="12" cy="12" r="5" fill={MARKER.learner} />
        )}
        {type === "leader" && (
          <circle cx="12" cy="12" r="10" fill="none" stroke={MARKER.leader} strokeWidth="2.5" />
        )}
        {type === "both" && (
          <>
            <circle cx="12" cy="12" r="10" fill="none" stroke={MARKER.leader} strokeWidth="2.5" />
            <circle cx="12" cy="12" r="5" fill={MARKER.learner} />
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
// PAGE 2
// ═══════════════════════════════════════════════════════════════════════════

export default function SnapshotPage2({ data }: { data: SnapshotData }) {
  return (
    <div
      className="snapshot-page"
      style={{
        background: COLORS.ui.white,
        borderRadius: 16,
        border: `2px solid ${UI.border}`,
        width: A4.width,
        minHeight: A4.height,
        overflow: "hidden",
        boxShadow: `0 8px 48px ${familyAlpha('purple', 'shadow1')}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderCompact learner={data.learner} circle={data.circle} date={data.date} />

      <div style={{ flex: 1, padding: `24px ${MARGIN}px`, display: "flex", flexDirection: "column" }}>
        {/* Skillset cards */}
        <div style={{ flex: 1 }}>
          {data.skillsets.map((s) => (
            <SkillsetCard key={s.id} skillset={s} />
          ))}
        </div>

        {/* Page Footer */}
        <PageFooter learnerName={data.learner} leaderName={data.leader} pageNumber={2} />
      </div>
    </div>
  );
}
