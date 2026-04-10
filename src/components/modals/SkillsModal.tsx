"use client";

import { useEffect, useState, useRef } from "react";
import CloseButton from "../shared/CloseButton";
import CircleSimple from "../circle/CircleSimple";
import { COLORS } from "@/lib/colors";
import { TEXT } from "@/lib/typography";

// ── Strength data for the ladder ──────────────────────────────────────

const STRENGTHS = [
  {
    name: "Curiosity",
    family: "purple" as const,
    tagline: "Make it better",
    skillsets: [
      { ring: "Essentials",  name: "Question",  obj: "Do you stay curious about people and ideas beyond your immediate work?" },
      { ring: "Exploring",   name: "Challenge", obj: "Do you question how things are done and seek ways to make them better?" },
      { ring: "Influencing", name: "Create",    obj: "Do you identify ideas with potential and fight for the ones worth it?" },
      { ring: "Leading",     name: "Cultivate", obj: "Do you foster curiosity and champion the creativity it sparks?" },
    ],
  },
  {
    name: "Critical Thinking",
    family: "purple" as const,
    tagline: "Make it work",
    skillsets: [
      { ring: "Essentials",  name: "Clarify",  obj: "Do you take time to clarify the ask and summarise the job before starting?" },
      { ring: "Exploring",   name: "Simplify", obj: "Do you focus on what matters most and learn from what's worked before?" },
      { ring: "Influencing", name: "Solve",    obj: "Do you diagnose root causes, identify blockers, and find better solutions?" },
      { ring: "Leading",     name: "Innovate", obj: "Do you spot industry innovations, evaluate new ideas, and drive their adoption?" },
    ],
  },
  {
    name: "Communication",
    family: "teal" as const,
    tagline: "Make it clear",
    skillsets: [
      { ring: "Essentials",  name: "Update",   obj: "Do you respond promptly, share clear updates, and flag changes that impact others?" },
      { ring: "Exploring",   name: "Navigate", obj: "Do you read the room, anticipate needs, and keep the right people informed?" },
      { ring: "Influencing", name: "Persuade", obj: "Do you frame your thinking so your ideas land with different people?" },
      { ring: "Leading",     name: "Guide",    obj: "Do you set clear goals, assess progress fairly, and empower your teams to thrive?" },
    ],
  },
  {
    name: "Collaboration",
    family: "teal" as const,
    tagline: "Make it happen",
    skillsets: [
      { ring: "Essentials",  name: "Engage",  obj: "Do you consistently deliver and use feedback to be a safe pair of hands?" },
      { ring: "Exploring",   name: "Connect", obj: "Do you anticipate others' needs, juggle competing views, and reduce friction?" },
      { ring: "Influencing", name: "Unlock",  obj: "Do you remove barriers and create clarity so others can succeed?" },
      { ring: "Leading",     name: "Inspire", obj: "Do you lead with energy, coach consistently, and inspire your teams?" },
    ],
  },
];

// Hero blue from landing page
const HERO_BLUE = "#1E3A5F";

// Map STRENGTHS index → CircleSimple quadrant index
// CircleSimple order: [Collaboration, Curiosity, Critical Thinking, Communication]
// STRENGTHS order:    [Curiosity, Critical Thinking, Communication, Collaboration]
const TO_QUADRANT = [1, 2, 3, 0];
const FROM_QUADRANT = [3, 0, 1, 2];

// Swipe threshold in pixels
const SWIPE_THRESHOLD = 50;

// ── Component ─────────────────────────────────────────────────────────

interface SkillsModalProps {
  initialStrength?: number;
  onClose: () => void;
  dark: boolean;
}

export default function SkillsModal({ initialStrength = 0, onClose, dark }: SkillsModalProps) {
  const [active, setActive] = useState(initialStrength);
  const [fading, setFading] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const go = (i: number) => {
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 80);
  };

  const handleQuadrantClick = (quadrantIndex: number) => {
    go(FROM_QUADRANT[quadrantIndex]);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        // Swipe left → next
        go((active + 1) % STRENGTHS.length);
      } else {
        // Swipe right → previous
        go((active - 1 + STRENGTHS.length) % STRENGTHS.length);
      }
    }
    
    touchStartX.current = null;
  };

  const s   = STRENGTHS[active];
  const col = s.family === "purple" ? COLORS.purple.hero : COLORS.teal.hero;

  // Right panel colors (respects dark mode)
  const rightBg   = dark ? COLORS.ui.darkCard     : COLORS.ui.white;
  const nearBlack = dark ? COLORS.ui.darkTxt      : COLORS.ui.nearBlack;
  const mutedTxt  = dark ? COLORS.ui.darkBodyCopy : COLORS.ui.lightMuted;
  const labelTxt  = dark ? COLORS.ui.darkMuted    : COLORS.ui.lightMuted;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6"
      style={{ background: "rgba(13,11,22,0.75)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex flex-col md:flex-row rounded-2xl w-full max-w-[720px] max-h-[90vh] overflow-hidden relative"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}
      >
        {/* ─── Top/Left Panel: Blue with Circle ─── */}
        <div
          className="flex flex-col items-center justify-center p-6 md:p-10 shrink-0"
          style={{ background: HERO_BLUE, width: "auto" }}
        >
          {/* Circle — smaller on mobile */}
          <div className="md:hidden">
            <CircleSimple
              size={140}
              activeQuadrant={TO_QUADRANT[active]}
              onQuadrantClick={handleQuadrantClick}
            />
          </div>
          <div className="hidden md:block">
            <CircleSimple
              size={180}
              activeQuadrant={TO_QUADRANT[active]}
              onQuadrantClick={handleQuadrantClick}
            />
          </div>

          {/* Pagination dots */}
          <div className="flex gap-1.5 items-center mt-4 md:mt-5">
            {STRENGTHS.map((str, i) => (
              <div
                key={i}
                onClick={() => go(i)}
                style={{
                  height: 6,
                  width: i === active ? 22 : 6,
                  borderRadius: 3,
                  background: i === active
                    ? (str.family === "purple" ? COLORS.purple.hero : COLORS.teal.hero)
                    : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  transition: "all 0.22s",
                }}
              />
            ))}
          </div>
        </div>

        {/* ─── Bottom/Right Panel: Content ─── */}
        <div
          className="flex-1 relative overflow-y-auto p-6 md:p-9 md:pr-10"
          style={{ background: rightBg, minHeight: 0 }}
        >
          {/* Close button */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4">
            <CloseButton onClose={onClose} dark={dark} size={32} />
          </div>

          {/* Ladder content */}
          <div 
            className="pr-8 md:pr-0"
            style={{ opacity: fading ? 0 : 1, transition: "opacity 0.08s" }}
          >
            {/* Strength heading */}
            <div style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 24,
              fontWeight: 900,
              lineHeight: 1.2,
              color: col,
              marginBottom: 2,
            }}>
              {s.name}
            </div>
            <div style={{
              fontFamily: "Poppins, sans-serif",
              ...TEXT.eyebrow,
              color: labelTxt,
              marginBottom: 20,
            }}>
              {s.tagline}
            </div>

            {/* Timeline */}
            <div style={{ position: "relative" }}>
              {/* Timeline line */}
              <div style={{
                position: "absolute",
                left: 5,
                top: 12,
                bottom: 12,
                width: 2,
                background: col,
                borderRadius: 2,
                opacity: 0.25,
              }} />

              {s.skillsets.map((sk, i) => (
                <div
                  key={sk.name}
                  style={{ 
                    display: "flex", 
                    gap: 12, 
                    paddingBottom: i < 3 ? 16 : 0, 
                    alignItems: "flex-start" 
                  }}
                >
                  {/* Dot */}
                  <div style={{ 
                    width: 12, 
                    flexShrink: 0, 
                    display: "flex", 
                    justifyContent: "center", 
                    paddingTop: 3 
                  }}>
                    <div style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: col,
                      flexShrink: 0,
                    }} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: col,
                      opacity: 0.7,
                      marginBottom: 1,
                    }}>
                      {sk.ring}
                    </div>
                    <div style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      lineHeight: 1.4,
                      color: nearBlack,
                      marginBottom: 2,
                    }}>
                      {sk.name}
                    </div>
                    <div style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: 12,
                      fontWeight: 400,
                      color: mutedTxt,
                      lineHeight: 1.5,
                    }}>
                      {sk.obj}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
