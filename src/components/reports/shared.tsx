"use client";

import { Sparkles, Network, Waves, GitBranch } from "lucide-react";
import { COLORS, whiteAlpha } from "@/lib/colors";
import { TEXT } from "@/lib/typography";
import { scoreToState } from "@/lib/scoring";
import { segKey } from "@/lib/skillsets";
import { RING_STAGES, STRENGTHS } from "@/lib/skillsets";
import type { CircleName, ScoreMap, KfgMap, ScoreState } from "@/lib/types";
import type { ReportSkillset } from "./types";
import { avgScore } from "./types";

// ═══════════════════════════════════════════════════════════════════════════
// A4 dimensions at 150dpi
// ═══════════════════════════════════════════════════════════════════════════

export const A4 = { width: 1240, height: 1754 };
export const MARGIN = 60;
export const CONTENT_WIDTH = A4.width - (MARGIN * 2); // 1120px

// ═══════════════════════════════════════════════════════════════════════════
// UI Tokens — report-specific
// ═══════════════════════════════════════════════════════════════════════════

export const UI = {
  // Brand
  deepPurple: COLORS.purple.hero,
  midPurple: COLORS.purple.growing,
  teal: COLORS.teal.hero,
  // Text
  nearBlack: COLORS.ui.nearBlack,
  muted: COLORS.ui.lightMuted,
  subtle: COLORS.purple.learning,
  // Backgrounds
  pageBackground: COLORS.ui.lightHover,
  border: COLORS.ui.lightBorder,
  paleLilac: COLORS.purple.notYet,
  paleMint: COLORS.teal.notYet,
  lightPurple: COLORS.purple.notYet,
  lightTeal: COLORS.teal.notYet,
  pillDefault: COLORS.ui.lightHover,
  // Warning (amber) — parked, kept inline for now
  warningBg: "#FFF7E6",
  warningText: "#92400E",
  warningDark: "#78350F",
  noteBg: "#FFFBEB",
};

export const FAMILY_COLORS = {
  purple: {
    bg: UI.paleLilac,
    border: UI.deepPurple,
    text: COLORS.purple.dark,
    accent: UI.deepPurple,
  },
  teal: {
    bg: UI.paleMint,
    border: UI.teal,
    text: COLORS.teal.dark,
    accent: UI.teal,
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// Strength Icons
// ═══════════════════════════════════════════════════════════════════════════

export const STRENGTH_ICONS: Record<string, typeof Sparkles> = {
  "Curiosity": Sparkles,
  "Collaboration": Network,
  "Communication": Waves,
  "Critical Thinking": GitBranch,
};

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

export function getStrengthIndex(strengthName: string): number {
  return STRENGTHS.findIndex((s) => s.name === strengthName);
}

export function getCircleIndex(circle: CircleName): number {
  const map: Record<CircleName, number> = {
    ESSENTIALS: 0,
    EXPLORING: 1,
    INFLUENCING: 2,
    LEADING: 3,
  };
  return map[circle];
}

export function buildScoreMap(skillsets: ReportSkillset[], circle: CircleName): ScoreMap {
  const scores: ScoreMap = {};
  const ri = getCircleIndex(circle);

  skillsets.forEach((skillset) => {
    const si = getStrengthIndex(skillset.strength);
    if (si === -1) return;
    const avg = avgScore(skillset.questions);
    const state = scoreToState(avg) as ScoreState;
    scores[segKey(si, ri)] = state;
  });

  return scores;
}

export function buildKfgMap(skillsets: ReportSkillset[], circle: CircleName): KfgMap {
  const kfg: KfgMap = {};
  const ri = getCircleIndex(circle);

  skillsets.forEach((skillset) => {
    if (!skillset.kfg) return;
    const si = getStrengthIndex(skillset.strength);
    if (si === -1) return;
    kfg[segKey(si, ri)] = skillset.kfg;
  });

  return kfg;
}

export function getScoreColor(score: number, family: "purple" | "teal"): string {
  const state = scoreToState(score);
  if (family === "purple") {
    if (state === "Not yet") return COLORS.purple.notYet;
    if (state === "Learning") return COLORS.purple.learning;
    if (state === "Growing") return COLORS.purple.growing;
    return COLORS.purple.hero;
  } else {
    if (state === "Not yet") return COLORS.teal.notYet;
    if (state === "Learning") return COLORS.teal.learning;
    if (state === "Growing") return COLORS.teal.growing;
    return COLORS.teal.hero;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Logo
// ═══════════════════════════════════════════════════════════════════════════

export function Logo({ color = COLORS.teal.hero, height = 20 }: { color?: string; height?: number }) {
  const aspectRatio = 325 / 104;
  const width = height * aspectRatio;
  
  return (
    <svg width={width} height={height} viewBox="0 0 325 104" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M190.238 8.72021C172.645 8.72021 158.328 22.7834 158.328 40.0632C158.328 57.3429 172.645 71.4061 190.238 71.4061C207.831 71.4061 222.147 57.3429 222.147 40.0632C222.147 22.7834 207.831 8.72021 190.238 8.72021ZM190.238 55.0556C181.967 55.0556 175.414 47.8096 175.414 39.8845C175.414 31.9594 181.967 25.0439 190.238 25.0439C198.509 25.0439 204.884 31.4322 204.884 39.3573C204.884 47.2824 198.5 55.0556 190.238 55.0556Z" fill={color}/>
      <path d="M31.9096 8.72021C14.3166 8.72021 0 22.7834 0 40.0632C0 57.3429 14.3166 71.4061 31.9096 71.4061C49.5026 71.4061 63.8192 57.3429 63.8192 40.0632C63.8192 22.7834 49.5026 8.72021 31.9096 8.72021ZM31.9096 55.0556C23.6384 55.0556 17.0855 47.8096 17.0855 39.8845C17.0855 31.9594 23.6384 25.0439 31.9096 25.0439C40.1808 25.0439 46.5556 31.4322 46.5556 39.3573C46.5556 47.2824 40.1719 55.0556 31.9096 55.0556Z" fill={color}/>
      <path d="M52.0224 76.0522C49.1288 76.0522 46.3955 77.5622 44.9888 80.1086C42.4068 84.7725 37.6257 87.9175 31.8919 87.9175C26.1582 87.9175 21.4928 84.8083 18.9287 80.198C17.4952 77.6248 14.7619 76.0522 11.8238 76.0522C5.44011 76.0522 1.54044 83.0302 4.80797 88.534C10.3102 97.7904 20.3888 104 31.8919 104C43.3951 104 53.5093 97.7636 59.0115 88.4715C62.2524 82.9945 58.3794 76.0522 52.0313 76.0522H52.0224Z" fill={color}/>
      <path d="M316.658 0C313.114 0 310.042 2.45704 309.268 5.93265L298.228 55.6632L289.636 20.8893C288.639 14.1704 282.682 8.99725 275.488 8.99725C268.873 8.99725 263.3 13.3842 261.671 19.3168H261.635L252.5 55.8866L245.653 26.6612C244.843 23.2034 241.763 20.7643 238.228 20.7732C233.322 20.7821 229.707 25.3835 230.838 30.1814L238.086 60.7203L238.157 60.7024C239.679 66.778 245.324 71.3168 252.055 71.3168C258.786 71.3168 264.333 66.8584 265.908 60.8543H265.944L275.373 23.123L275.524 23.1409L284.632 59.9966C285.879 66.4296 291.701 71.3168 298.691 71.3168C305.68 71.3168 311.146 66.7155 312.624 60.5773H312.66L324.03 9.23849C325.071 4.49416 321.483 0 316.658 0Z" fill={color}/>
      <path d="M104.73 8.9438C104.285 8.92593 103.84 8.91699 103.394 8.91699C86.2376 8.91699 71.832 22.8283 71.832 39.9294V60.7562C71.832 65.4916 75.6516 69.3246 80.3703 69.3246C85.0891 69.3246 88.9087 65.4916 88.9087 60.7562V39.9294C88.9087 31.7005 95.0787 24.9995 103.403 24.9995C103.608 24.9995 103.804 24.9995 104.009 25.0084C107.57 25.1424 110.775 22.8551 111.87 19.451C113.482 14.4565 109.974 9.16716 104.739 8.9438H104.730Z" fill={color}/>
      <path d="M148.65 8.9438C148.205 8.92593 147.76 8.91699 147.315 8.91699C130.158 8.91699 115.752 22.8283 115.752 39.9294V60.7562C115.752 65.4916 119.572 69.3246 124.291 69.3246C129.01 69.3246 132.829 65.4916 132.829 60.7562V39.9294C132.829 31.7005 138.999 24.9995 147.324 24.9995C147.528 24.9995 147.724 24.9995 147.929 25.0084C151.49 25.1424 154.696 22.8551 155.791 19.451C157.402 14.4565 153.894 9.16716 148.659 8.9438H148.650Z" fill={color}/>
    </svg>
  );
}

export function LogoWhite({ height = 20 }: { height?: number }) {
  const aspectRatio = 325 / 104;
  const width = height * aspectRatio;
  
  return (
    <svg width={width} height={height} viewBox="0 0 325 104" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* First o */}
      <path d="M190.238 8.72021C172.645 8.72021 158.328 22.7834 158.328 40.0632C158.328 57.3429 172.645 71.4061 190.238 71.4061C207.831 71.4061 222.147 57.3429 222.147 40.0632C222.147 22.7834 207.831 8.72021 190.238 8.72021ZM190.238 55.0556C181.967 55.0556 175.414 47.8096 175.414 39.8845C175.414 31.9594 181.967 25.0439 190.238 25.0439C198.509 25.0439 204.884 31.4322 204.884 39.3573C204.884 47.2824 198.5 55.0556 190.238 55.0556Z" fill={COLORS.ui.white}/>
      {/* g body */}
      <path d="M31.9096 8.72021C14.3166 8.72021 0 22.7834 0 40.0632C0 57.3429 14.3166 71.4061 31.9096 71.4061C49.5026 71.4061 63.8192 57.3429 63.8192 40.0632C63.8192 22.7834 49.5026 8.72021 31.9096 8.72021ZM31.9096 55.0556C23.6384 55.0556 17.0855 47.8096 17.0855 39.8845C17.0855 31.9594 23.6384 25.0439 31.9096 25.0439C40.1808 25.0439 46.5556 31.4322 46.5556 39.3573C46.5556 47.2824 40.1719 55.0556 31.9096 55.0556Z" fill={COLORS.ui.white}/>
      {/* g tail */}
      <path d="M52.0224 76.0522C49.1288 76.0522 46.3955 77.5622 44.9888 80.1086C42.4068 84.7725 37.6257 87.9175 31.8919 87.9175C26.1582 87.9175 21.4928 84.8083 18.9287 80.198C17.4952 77.6248 14.7619 76.0522 11.8238 76.0522C5.44011 76.0522 1.54044 83.0302 4.80797 88.534C10.3102 97.7904 20.3888 104 31.8919 104C43.3951 104 53.5093 97.7636 59.0115 88.4715C62.2524 82.9945 58.3794 76.0522 52.0313 76.0522H52.0224Z" fill={COLORS.ui.white}/>
      {/* w */}
      <path d="M316.658 0C313.114 0 310.042 2.45704 309.268 5.93265L298.228 55.6632L289.636 20.8893C288.639 14.1704 282.682 8.99725 275.488 8.99725C268.873 8.99725 263.3 13.3842 261.671 19.3168H261.635L252.5 55.8866L245.653 26.6612C244.843 23.2034 241.763 20.7643 238.228 20.7732C233.322 20.7821 229.707 25.3835 230.838 30.1814L238.086 60.7203L238.157 60.7024C239.679 66.778 245.324 71.3168 252.055 71.3168C258.786 71.3168 264.333 66.8584 265.908 60.8543H265.944L275.373 23.123L275.524 23.1409L284.632 59.9966C285.879 66.4296 291.701 71.3168 298.691 71.3168C305.68 71.3168 311.146 66.7155 312.624 60.5773H312.66L324.03 9.23849C325.071 4.49416 321.483 0 316.658 0Z" fill={COLORS.ui.white}/>
      {/* First r */}
      <path d="M104.73 8.9438C104.285 8.92593 103.84 8.91699 103.394 8.91699C86.2376 8.91699 71.832 22.8283 71.832 39.9294V60.7562C71.832 65.4916 75.6516 69.3246 80.3703 69.3246C85.0891 69.3246 88.9087 65.4916 88.9087 60.7562V39.9294C88.9087 31.7005 95.0787 24.9995 103.403 24.9995C103.608 24.9995 103.804 24.9995 104.009 25.0084C107.57 25.1424 110.775 22.8551 111.87 19.451C113.482 14.4565 109.974 9.16716 104.739 8.9438H104.730Z" fill={COLORS.ui.white}/>
      {/* Second r — TEAL */}
      <path d="M148.65 8.9438C148.205 8.92593 147.76 8.91699 147.315 8.91699C130.158 8.91699 115.752 22.8283 115.752 39.9294V60.7562C115.752 65.4916 119.572 69.3246 124.291 69.3246C129.01 69.3246 132.829 65.4916 132.829 60.7562V39.9294C132.829 31.7005 138.999 24.9995 147.324 24.9995C147.528 24.9995 147.724 24.9995 147.929 25.0084C151.49 25.1424 154.696 22.8551 155.791 19.451C157.402 14.4565 153.894 9.16716 148.659 8.9438H148.650Z" fill={COLORS.teal.hero}/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Headers
// ═══════════════════════════════════════════════════════════════════════════

export function Header({ learner, circle, date }: { learner: string; circle: CircleName; date: string }) {
  const idx = getCircleIndex(circle);
  const displayName = RING_STAGES[idx]?.label.replace("You're ", "").replace("starting out", "Essentials") || circle;

  return (
    <div
      style={{
        background: UI.deepPurple,
        padding: "24px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "16px 16px 0 0",
      }}
    >
      <LogoWhite height={44} />
      <div style={{
        textAlign: "right",
        color: whiteAlpha(0.85),
        fontFamily: "Poppins, sans-serif",
        fontSize: TEXT.bold.l.fontSize,
        fontWeight: 300,
      }}>
        <strong style={{
          fontWeight: 600,
          display: "block",
          fontSize: TEXT.headline.s.fontSize,
          color: COLORS.ui.white,
        }}>
          {learner}
        </strong>
        {displayName} · {date}
      </div>
    </div>
  );
}

export function HeaderCompact({ learner, circle, date }: { learner: string; circle: CircleName; date: string }) {
  const idx = getCircleIndex(circle);
  const displayName = RING_STAGES[idx]?.label.replace("You're ", "").replace("starting out", "Essentials") || circle;

  return (
    <div
      style={{
        background: UI.deepPurple,
        padding: "20px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "16px 16px 0 0",
      }}
    >
      <LogoWhite height={36} />
      <div style={{
        fontFamily: "Poppins, sans-serif",
        fontSize: 20, // Report-specific: between heading.md (18) and heading.lg (22)
        fontWeight: 300,
        color: whiteAlpha(0.85),
      }}>
        {learner} · {displayName} · {date}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Re-exports for convenience
// ═══════════════════════════════════════════════════════════════════════════

export { COLORS } from "@/lib/colors";
export { TEXT } from "@/lib/typography";
export { scoreToState } from "@/lib/scoring";
export { RING_STAGES } from "@/lib/skillsets";
export type { CircleName, ScoreState } from "@/lib/types";
