"use client";

import { useState } from "react";
import HeroZone from "./HeroZone";
import RemindersBar from "./RemindersBar";
import TeamList, { TeamMember } from "./TeamList";
import { ButtonPrimary } from "../shared/Button";
import { useTheme } from "../../lib/ThemeContext";
import { COLORS, familyAlpha, whiteAlpha } from "@/lib/colors";
import { TEXT } from "@/lib/typography";

// ── Constants ─────────────────────────────────────────────────────────

const CONTAINER_MAX = 1200;
const HERO_BLUE = "#1E3A5F";

// ── Mock Data ─────────────────────────────────────────────────────────

const MOCK_LEADER = {
  name: "Jamie",
};

const MOCK_TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Sarah",
    circle: "Exploring",
    state: "Growing",
    pendingAction: "checkin",
    kfg: [
      { category: "keep",  skillset: "Cultivate", strength: "Curiosity",         circle: "Leading",     family: "purple", score: 88, objective: "Do you foster curiosity and champion the creativity it sparks?" },
      { category: "focus", skillset: "Innovate",  strength: "Critical Thinking", circle: "Leading",     family: "purple", score: 44, objective: "Do you spot industry innovations, evaluate new ideas, and drive their adoption?" },
      { category: "grow",  skillset: "Persuade",  strength: "Communication",     circle: "Influencing", family: "teal",   score: 66, objective: "Do you frame your thinking so your ideas land with different people?" },
    ],
  },
  {
    id: "2",
    name: "Marcus",
    circle: "Influencing",
    state: "Nailing it",
    pendingAction: null,
    kfg: [
      { category: "keep",  skillset: "Connect",  strength: "Collaboration",    circle: "Exploring",   family: "teal",   score: 92, objective: "Do you anticipate others' needs, juggle competing views, and reduce friction?" },
      { category: "focus", skillset: "Solve",    strength: "Critical Thinking", circle: "Influencing", family: "purple", score: 58, objective: "Do you diagnose root causes, identify blockers, and find better solutions?" },
      { category: "grow",  skillset: "Guide",    strength: "Communication",     circle: "Leading",     family: "teal",   score: 41, objective: "Do you set clear goals, assess progress fairly, and empower your teams to thrive?" },
    ],
  },
  {
    id: "3",
    name: "Priya",
    circle: "Essentials",
    state: "Learning",
    pendingAction: "review",
    kfg: [
      { category: "keep",  skillset: "Engage",   strength: "Collaboration",    circle: "Essentials", family: "teal",   score: 78, objective: "Do you consistently deliver and use feedback to be a safe pair of hands?" },
      { category: "focus", skillset: "Clarify",  strength: "Critical Thinking", circle: "Essentials", family: "purple", score: 33, objective: "Do you take time to clarify the ask and summarise the job before starting?" },
      { category: "grow",  skillset: "Navigate", strength: "Communication",     circle: "Exploring",  family: "teal",   score: 45, objective: "Do you read the room, anticipate needs, and keep the right people informed?" },
    ],
  },
  {
    id: "4",
    name: "Tom",
    circle: "Exploring",
    state: "Growing",
    pendingAction: null,
    kfg: [
      { category: "keep",  skillset: "Challenge", strength: "Curiosity",         circle: "Exploring",   family: "purple", score: 85, objective: "Do you question how things are done and seek ways to make them better?" },
      { category: "focus", skillset: "Connect",   strength: "Collaboration",     circle: "Exploring",   family: "teal",   score: 52, objective: "Do you anticipate others' needs, juggle competing views, and reduce friction?" },
      { category: "grow",  skillset: "Create",    strength: "Curiosity",         circle: "Influencing", family: "purple", score: 38, objective: "Do you identify ideas with potential and fight for the ones worth it?" },
    ],
  },
];

// Count pending actions
const pendingCount = MOCK_TEAM.filter(m => m.pendingAction).length;

// Mock recent activity
const MOCK_ACTIVITY = [
  { id: "1", label: "Sarah completed Exploring Snapshot", date: "2 days ago" },
  { id: "2", label: "Connect session with Marcus", date: "1 week ago" },
  { id: "3", label: "Priya started Essentials Snapshot", date: "1 week ago" },
];

// ── Component ─────────────────────────────────────────────────────────

export default function LeaderDashboard() {
  const { dark } = useTheme();

  // Gradient wash
  const gradientWash = `linear-gradient(135deg, ${familyAlpha("purple", "wash", "light")} 0%, ${familyAlpha("teal", "wash", "light")} 100%)`;

  const handleReview = (memberId: string) => {
    console.log("Review:", memberId);
  };

  const handleRemind = (memberId: string) => {
    console.log("Remind:", memberId);
  };

  const handleNotes = (memberId: string) => {
    console.log("Notes:", memberId);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* HERO ZONE */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <HeroZone
        name={MOCK_LEADER.name}
        intro="Here's your team. Strengths, growth areas and who's ready for a chat. Better conversations, less guesswork."
        actions={
          <ButtonPrimary onClick={() => console.log("Add person")}>
            Add someone
          </ButtonPrimary>
        }
      />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* REMINDERS */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <RemindersBar reminder={null} />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* TEAM ZONE — Gradient wash */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section style={{ background: gradientWash }}>
        <div style={{
          maxWidth: CONTAINER_MAX,
          margin: "0 auto",
          padding: "48px 32px",
        }}>
          <TeamList 
            members={MOCK_TEAM}
            onReview={handleReview}
            onRemind={handleRemind}
            onNotes={handleNotes}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ACTIVITY ZONE — Dark navy band */}
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
            Recent
          </h2>

          <div>
            {MOCK_ACTIVITY.map((item, index) => (
              <div 
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 0",
                  borderBottom: index < MOCK_ACTIVITY.length - 1 
                    ? `1px solid ${whiteAlpha(0.1)}` 
                    : "none",
                }}
              >
                <span style={{ 
                  ...TEXT.bold.s, 
                  color: COLORS.ui.white,
                }}>
                  {item.label}
                </span>
                <span style={{ 
                  ...TEXT.standard.s, 
                  color: whiteAlpha(0.5),
                }}>
                  {item.date}
                </span>
              </div>
            ))}
          </div>

          {/* View all link */}
          <div style={{ marginTop: 24 }}>
            <button
              style={{
                background: "none",
                border: "none",
                padding: 0,
                ...TEXT.bold.s,
                color: COLORS.teal.hero,
                cursor: "pointer",
              }}
            >
              View all activity ›
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
