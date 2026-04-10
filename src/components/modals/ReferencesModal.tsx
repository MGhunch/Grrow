"use client";

import { useState } from "react";
import { Sparkles, Network, Waves, GitBranch, Lightbulb, ExternalLink } from "lucide-react";
import { COLORS } from "@/lib/colors";
import { TEXT } from "@/lib/typography";
import CloseButton from "../shared/CloseButton";

// ═══════════════════════════════════════════════════════════════════════════
// REFERENCE DATA
// ═══════════════════════════════════════════════════════════════════════════
const SECTIONS = [
  {
    id: "curiosity",
    title: "Curiosity",
    icon: Sparkles,
    family: "purple" as const,
    oneLiner: "The engine behind learning, adaptation, and innovation.",
    links: [
      {
        label: "Loewenstein (1994) — The Psychology of Curiosity",
        url: "https://psycnet.apa.org/record/1994-41058-001",
        note: "The information gap theory",
      },
      {
        label: "Golman & Loewenstein — Curiosity, Information Gaps, and the Utility of Knowledge",
        url: "https://www.cmu.edu/dietrich/sds/docs/golman/golman_loewenstein_curiosity.pdf",
        note: "Carnegie Mellon",
      },
      {
        label: "Todd Kashdan — Well-Being Laboratory",
        url: "https://toddkashdan.com/",
        note: "George Mason University",
      },
    ],
  },
  {
    id: "collaboration",
    title: "Collaboration",
    icon: Network,
    family: "teal" as const,
    oneLiner: "What actually makes teams work.",
    links: [
      {
        label: "Google Project Aristotle — Understanding Team Effectiveness",
        url: "https://rework.withgoogle.com/guides/understanding-team-effectiveness",
        note: "re:Work",
      },
      {
        label: "Edmondson (1999) — Psychological Safety and Learning Behavior in Work Teams",
        url: "https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Group_Performance/Edmondson%20Psychological%20safety.pdf",
        note: "Harvard Business School",
      },
      {
        label: "The Fearless Organization — Amy Edmondson",
        url: "https://www.hbs.edu/faculty/Pages/item.aspx?num=54851",
        note: "Book, 2018",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication",
    icon: Waves,
    family: "teal" as const,
    oneLiner: "The bridge between intention and understanding.",
    links: [
      {
        label: "Shannon & Weaver (1949) — A Mathematical Theory of Communication",
        url: "https://pure.mpg.de/pubman/item/item_2383164_3/component/file_2383163/Shannon_Weaver_1949_Mathematical.pdf",
        note: "The original paper",
      },
      {
        label: "Zenger Folkman — Leadership Research",
        url: "https://zengerfolkman.com/leadership-studies/",
        note: "360 feedback data on 100,000+ leaders",
      },
    ],
  },
  {
    id: "critical-thinking",
    title: "Critical Thinking",
    icon: GitBranch,
    family: "purple" as const,
    oneLiner: "The deliberate override of default thinking.",
    links: [
      {
        label: "Bloom's Taxonomy (1956) — Taxonomy of Educational Objectives",
        url: "https://teaching.cornell.edu/resource/blooms-taxonomy",
        note: "Cornell overview",
      },
      {
        label: "Anderson & Krathwohl (2001) — Revised Bloom's Taxonomy",
        url: "https://quincycollege.edu/wp-content/uploads/Anderson-and-Krathwohl_Revised-Blooms-Taxonomy.pdf",
        note: "PDF summary",
      },
      {
        label: "Kahneman — Thinking, Fast and Slow",
        url: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow",
        note: "System 1 and System 2, 2011",
      },
    ],
  },
  {
    id: "wef",
    title: "21st Century Skills",
    icon: Lightbulb,
    family: "purple" as const,
    oneLiner: "What the research keeps coming back to.",
    links: [
      {
        label: "WEF Future of Jobs Report 2025",
        url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
        note: "World Economic Forum",
      },
      {
        label: "Future of Jobs 2025 — Skills Outlook",
        url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/",
        note: "Analytical thinking #1 core skill",
      },
      {
        label: "70:20:10 Learning Model — McCall, Lombardo & Eichinger",
        url: "https://trainingindustry.com/wiki/content-development/the-702010-model-for-learning-and-development/",
        note: "Center for Creative Leadership",
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// LINK COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
function ReferenceLink({
  label,
  url,
  note,
  dark,
  accentColor,
}: {
  label: string;
  url: string;
  note?: string;
  dark: boolean;
  accentColor: string;
}) {
  const borderColor = dark ? COLORS.ui.darkBorder : COLORS.ui.lightBorder;
  const labelColor = dark ? COLORS.ui.darkTxt : COLORS.ui.nearBlack;
  const noteColor = dark ? COLORS.ui.darkMuted : COLORS.ui.lightMuted;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        padding: "8px 0",
        textDecoration: "none",
        borderBottom: `1px solid ${borderColor}`,
        transition: "opacity 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      <ExternalLink
        size={12}
        color={accentColor}
        style={{ marginTop: 3, flexShrink: 0 }}
      />
      <div style={{ flex: 1 }}>
        <span
          style={{
            fontSize: TEXT.standard.m.fontSize,
            fontWeight: 400,
            color: labelColor,
            lineHeight: 1.4,
          }}
        >
          {label}
          {" "}
          <span style={{ color: accentColor }}>›</span>
        </span>
        {note && (
          <span
            style={{
              display: "block",
              fontSize: TEXT.standard.s.fontSize,
              fontWeight: 400,
              color: noteColor,
              marginTop: 2,
            }}
          >
            {note}
          </span>
        )}
      </div>
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
function Section({
  section,
  dark,
}: {
  section: (typeof SECTIONS)[number];
  dark: boolean;
}) {
  const Icon = section.icon;
  const isPurple = section.family === "purple";
  const accentColor = isPurple
    ? (dark ? COLORS.purple.growing : COLORS.purple.hero)
    : (dark ? COLORS.teal.hero : COLORS.teal.dark);
  const iconBg = isPurple
    ? (dark ? "rgba(76,63,160,0.2)" : "rgba(76,63,160,0.1)")
    : (dark ? "rgba(24,185,154,0.15)" : "rgba(24,185,154,0.12)");
  const oneLinerColor = dark ? COLORS.ui.darkMuted : COLORS.ui.lightMuted;

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 6,
        }}
      >
        {Icon && (
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={14} color={accentColor} strokeWidth={1.75} />
          </div>
        )}
        <h3
          style={{
            ...TEXT.bold.l,
            color: accentColor,
            margin: 0,
          }}
        >
          {section.title}
        </h3>
      </div>

      {/* One-liner */}
      <p
        style={{
          ...TEXT.tooltip,
          color: oneLinerColor,
          margin: "0 0 10px 0",
          paddingLeft: 38,
          fontStyle: "italic",
        }}
      >
        {section.oneLiner}
      </p>

      {/* Links */}
      <div style={{ paddingLeft: 38 }}>
        {section.links.map((link, i) => (
          <ReferenceLink key={i} {...link} dark={dark} accentColor={accentColor} />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODAL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function ReferencesModal({
  isOpen,
  onClose,
  dark,
}: {
  isOpen: boolean;
  onClose: () => void;
  dark: boolean;
}) {
  if (!isOpen) return null;

  const bg = dark ? COLORS.ui.darkCard : COLORS.ui.white;
  const border = dark ? COLORS.ui.darkBorder : COLORS.ui.lightBorder;
  const headlineColor = dark ? COLORS.ui.darkTxt : COLORS.purple.hero;
  const subColor = dark ? COLORS.ui.darkMuted : COLORS.ui.lightMuted;
  const overlay = dark ? "rgba(10,8,22,0.85)" : "rgba(20,16,48,0.5)";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: overlay,
        backdropFilter: "blur(6px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 560,
          maxHeight: "85vh",
          background: bg,
          border: `1px solid ${border}`,
          borderRadius: 20,
          boxShadow: dark
            ? "0 32px 80px rgba(0,0,0,0.7)"
            : "0 32px 80px rgba(76,63,160,0.18)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          animation: "slideUp 0.22s ease",
          position: "relative",
        }}
      >
        {/* Close button */}
        <div style={{ position: "absolute", top: 20, right: 20 }}>
          <CloseButton onClose={onClose} dark={dark} size={28} />
        </div>

        {/* Header */}
        <div
          style={{
            padding: "28px 40px 16px",
            borderBottom: `1px solid ${border}`,
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.25,
              color: headlineColor,
              margin: "0 0 4px",
            }}
          >
            Dig in for more
          </h2>
          <p
            style={{
              ...TEXT.light.s,
              color: subColor,
              margin: 0,
            }}
          >
            Grrow is built on research, not guesswork
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "20px 40px 28px",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {SECTIONS.map((section) => (
            <Section key={section.id} section={section} dark={dark} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TRIGGER LINK COMPONENT (for use elsewhere)
// ═══════════════════════════════════════════════════════════════════════════
export function ScienceLink({ dark }: { dark: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const linkColor = dark ? COLORS.purple.growing : COLORS.purple.hero;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          ...TEXT.standard.m,
          color: linkColor,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        See the science <span style={{ fontSize: 14 }}>›</span>
      </button>
      <ReferencesModal isOpen={isOpen} onClose={() => setIsOpen(false)} dark={dark} />
    </>
  );
}
