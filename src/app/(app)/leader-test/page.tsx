"use client";

import { useState } from "react";
import LeaderCalibration from "@/components/quiz/LeaderCalibration";
import { COLORS, familyAlpha } from "@/lib/colors";
import type { Circle, StrengthName } from "@/lib/types";

// ═══════════════════════════════════════════════════════════════════════════
// Sample Data
// ═══════════════════════════════════════════════════════════════════════════

const SAMPLE_SKILLSETS = [
  { 
    id: "clarify", 
    name: "Clarify", 
    strength: "Critical Thinking" as StrengthName, 
    family: "purple" as const,
    objective: "Do you take time to clarify the ask and summarise the job before starting?",
    questions: [
      { id: "C1-CRI-CLARIFY-1", title: "Clarify the ask", learnerAnswer: "Mostly" },
      { id: "C1-CRI-CLARIFY-2", title: "Spot the blockers", learnerAnswer: "Sometimes" },
      { id: "C1-CRI-CLARIFY-3", title: "Play it back", learnerAnswer: "Mostly" },
    ],
  },
  { 
    id: "engage", 
    name: "Engage", 
    strength: "Collaboration" as StrengthName, 
    family: "teal" as const,
    objective: "Do you consistently deliver and use feedback to be a safe pair of hands?",
    questions: [
      { id: "C1-COL-ENGAGE-1", title: "Own your time", learnerAnswer: "Sometimes" },
      { id: "C1-COL-ENGAGE-2", title: "Bounce ideas", learnerAnswer: "Mostly" },
      { id: "C1-COL-ENGAGE-3", title: "Seek feedback", learnerAnswer: "Sometimes" },
    ],
  },
  { 
    id: "update", 
    name: "Update", 
    strength: "Communication" as StrengthName, 
    family: "teal" as const,
    objective: "Do you respond promptly, share clear updates, and flag changes that impact others?",
    questions: [
      { id: "C1-COM-UPDATE-1", title: "Close the loop", learnerAnswer: "Sometimes" },
      { id: "C1-COM-UPDATE-2", title: "Keep it simple", learnerAnswer: "Mostly" },
      { id: "C1-COM-UPDATE-3", title: "Raise good flags", learnerAnswer: "Sometimes" },
    ],
  },
  { 
    id: "question", 
    name: "Question", 
    strength: "Curiosity" as StrengthName, 
    family: "purple" as const,
    objective: "Do you stay curious about people and ideas beyond your immediate work?",
    questions: [
      { id: "C1-CUR-QUESTION-1", title: "Tune into people", learnerAnswer: "Intuitively" },
      { id: "C1-CUR-QUESTION-2", title: "Steal like a pirate", learnerAnswer: "Mostly" },
      { id: "C1-CUR-QUESTION-3", title: "Ask why before how", learnerAnswer: "Intuitively" },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function LeaderTestPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.ui.lightHover,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Poppins', sans-serif",
    }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: "16px 40px",
          fontSize: 16,
          fontWeight: 600,
          color: COLORS.ui.white,
          background: COLORS.teal.hero,
          border: "none",
          borderRadius: 100,
          cursor: "pointer",
          boxShadow: `0 4px 24px ${familyAlpha("teal", "shadow3")}`,
        }}
      >
        Review Sam's Snapshot
      </button>

      {isOpen && (
        <LeaderCalibration
          dark={false}
          onClose={() => setIsOpen(false)}
          onComplete={(adjustments, notes) => {
            console.log("Adjustments:", adjustments);
            console.log("Notes:", notes);
            setIsOpen(false);
          }}
          learner={{ name: "Sam" }}
          circle={"ESSENTIALS" as Circle}
          skillsets={SAMPLE_SKILLSETS}
        />
      )}
    </div>
  );
}
