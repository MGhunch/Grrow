"use client";

import { useState } from "react";
import LearnerDashboard from "../../../components/dashboard/LearnerDashboard";
import LeaderDashboard from "../../../components/dashboard/LeaderDashboard";
import { COLORS } from "@/lib/colors";

// ── Page Component ────────────────────────────────────────────────────

export default function DashboardPage() {
  const [isLeader, setIsLeader] = useState(false);

  return (
    <>
      {/* Temporary toggle — remove before launch */}
      <div style={{
        position: "fixed",
        top: 12,
        right: 120,
        zIndex: 9999,
        display: "flex",
        gap: 0,
        background: COLORS.ui.white,
        borderRadius: 100,
        padding: 4,
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      }}>
        <button
          onClick={() => setIsLeader(false)}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            background: !isLeader ? COLORS.teal.hero : "transparent",
            color: !isLeader ? COLORS.ui.white : COLORS.ui.lightMuted,
          }}
        >
          Learner
        </button>
        <button
          onClick={() => setIsLeader(true)}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            background: isLeader ? COLORS.purple.hero : "transparent",
            color: isLeader ? COLORS.ui.white : COLORS.ui.lightMuted,
          }}
        >
          Leader
        </button>
      </div>

      {isLeader ? <LeaderDashboard /> : <LearnerDashboard />}
    </>
  );
}
