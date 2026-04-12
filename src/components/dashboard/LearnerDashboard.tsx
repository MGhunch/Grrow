"use client";

import { useState } from "react";
import HeroZone from "./HeroZone";
import RemindersBar, { Reminder } from "./RemindersBar";
import KfgSection, { KFGSelection } from "./KfgSection";
import NoteRow, { NoteItem } from "./NoteRow";
import { ButtonPrimary, ButtonSecondary } from "../shared/Button";
import QuizWrap from "../quiz/QuizWrap";
import QuizEntryCheckin from "../quiz/QuizEntryCheckin";
import SkillsModal from "../modals/SkillsModal";
import { useTheme } from "../../lib/ThemeContext";
import { COLORS, familyAlpha, whiteAlpha } from "@/lib/colors";
import { TEXT } from "@/lib/typography";

// ── Constants ─────────────────────────────────────────────────────────

const CONTAINER_MAX = 1200;
const HERO_BLUE = "#1E3A5F";

// ── Mock Data ─────────────────────────────────────────────────────────

const MOCK_USER = {
  name: "Sarah",
};

const MOCK_KFG: KFGSelection[] = [
  { 
    category: "keep",  
    skillset: "Cultivate", 
    strength: "Curiosity",         
    circle: "Leading",     
    family: "purple", 
    score: 88,
    objective: "Do you foster curiosity and champion the creativity it sparks?",
  },
  { 
    category: "focus", 
    skillset: "Innovate",  
    strength: "Critical Thinking", 
    circle: "Leading",     
    family: "purple", 
    score: 44,
    objective: "Do you spot industry innovations, evaluate new ideas, and drive their adoption?",
  },
  { 
    category: "grow",  
    skillset: "Persuade",  
    strength: "Communication",     
    circle: "Influencing", 
    family: "teal",   
    score: 66,
    objective: "Do you frame your thinking so your ideas land with different people?",
  },
];

const MOCK_REMINDER: Reminder | null = {
  type: "checkin",
};

const MOCK_NOTES: NoteItem[] = [
  { id: "1", type: "snapshot", circle: "Essentials", date: "March 2026" },
  { id: "2", type: "session",  circle: null,         date: "March 2026" },
];

// ── Component ─────────────────────────────────────────────────────────

export default function LearnerDashboard() {
  const { dark } = useTheme();
  const [modal, setModal] = useState<"checkin" | "review" | "skillsets" | null>(null);

  // Gradient wash — matches homepage "How it works" section
  const gradientWash = `linear-gradient(135deg, ${familyAlpha("purple", "wash", "light")} 0%, ${familyAlpha("teal", "wash", "light")} 100%)`;

  return (
    <div style={{ minHeight: "100vh" }}>
      
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* HERO ZONE */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <HeroZone
        name={MOCK_USER.name}
        intro="Here's your map. See where you're strong, where you're growing and what to work on next."
        actions={
          <>
            <ButtonSecondary onClick={() => setModal("review")}>
              Do the quiz
            </ButtonSecondary>
            <ButtonPrimary onClick={() => setModal("checkin")}>
              Check in
            </ButtonPrimary>
          </>
        }
      />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* REMINDERS */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <RemindersBar reminder={MOCK_REMINDER} />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* KFG ZONE — Gradient wash */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section style={{ background: gradientWash }}>
        <div style={{
          maxWidth: CONTAINER_MAX,
          margin: "0 auto",
          padding: "48px 32px",
        }}>
          <KfgSection kfgSelections={MOCK_KFG} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* NOTES ZONE — Dark navy band */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section style={{ background: HERO_BLUE }}>
        <div style={{
          maxWidth: CONTAINER_MAX,
          margin: "0 auto",
          padding: "48px 32px",
        }}>
          <h2 style={{
            fontSize: 32,
            fontWeight: 900,
            color: COLORS.teal.hero,
            margin: "0 0 24px",
          }}>
            Notes
          </h2>

          <div>
            {MOCK_NOTES.map((note, index) => (
              <NoteRow 
                key={note.id} 
                note={note} 
                showBorder={index < MOCK_NOTES.length - 1}
              />
            ))}
          </div>

          {/* View all link */}
          <div style={{ marginTop: 24 }}>
            <button
              onClick={() => setModal("skillsets")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                ...TEXT.bold.s,
                color: COLORS.teal.hero,
                cursor: "pointer",
              }}
            >
              View all the skillsets ›
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MODALS */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {modal === "review" && (
        <QuizWrap
          dark={dark}
          onClose={() => setModal(null)}
        />
      )}

      {modal === "checkin" && (
        <QuizEntryCheckin
          dark={dark}
          onClose={() => setModal(null)}
          kfgSelections={MOCK_KFG}
          monthsSinceReview={2}
          onSwitchToReview={() => setModal("review")}
        />
      )}

      {modal === "skillsets" && (
        <SkillsModal
          dark={dark}
          onClose={() => setModal(null)}
          initialStrength={0}
        />
      )}
    </div>
  );
}
