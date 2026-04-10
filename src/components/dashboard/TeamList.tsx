"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Users, Sparkles, Network, Waves, GitBranch } from "lucide-react";
import { KFGSelection } from "./KfgSection";

// ── Icon Lookup ───────────────────────────────────────────────────────

const STRENGTH_ICONS: Record<string, React.ComponentType<{ size: number; strokeWidth: number; className?: string }>> = {
  "Curiosity": Sparkles,
  "Collaboration": Network,
  "Communication": Waves,
  "Critical Thinking": GitBranch,
};

// ── Types ─────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  circle: string;
  state: string;
  kfg: KFGSelection[];
  pendingAction?: "checkin" | "review" | null;
}

interface TeamListProps {
  members: TeamMember[];
  onReview?: (memberId: string) => void;
  onRemind?: (memberId: string) => void;
  onNotes?: (memberId: string) => void;
}

// ── KFG Row ───────────────────────────────────────────────────────────

function KfgRow({ 
  item, 
  label,
}: { 
  item: KFGSelection; 
  label: string;
}) {
  const IconComponent = STRENGTH_ICONS[item.strength];
  
  return (
    <div className="flex items-center gap-3 py-2 text-white/80">
      {/* Label — left */}
      <span className="w-12 text-xs font-semibold uppercase tracking-wider text-white/50">
        {label}
      </span>
      
      {/* Skillset + Icon — right aligned on mobile */}
      <div className="flex items-center gap-2 ml-auto md:ml-0 md:w-32">
        {IconComponent && (
          <IconComponent size={16} strokeWidth={2} className="text-white/60" />
        )}
        <span className="font-semibold text-white">
          {item.skillset}
        </span>
      </div>
      
      {/* Objective — desktop only */}
      <span className="hidden md:block text-sm text-white/70 ml-auto">
        {item.objective}
      </span>
    </div>
  );
}

// ── Person Card ───────────────────────────────────────────────────────

function PersonCard({ 
  member, 
  isExpanded, 
  onToggle,
  colorIndex,
  onReview,
  onRemind,
  onNotes,
}: { 
  member: TeamMember;
  isExpanded: boolean;
  onToggle: () => void;
  colorIndex: number;
  onReview?: () => void;
  onRemind?: () => void;
  onNotes?: () => void;
}) {
  // Alternate colors
  const family = colorIndex % 2 === 0 ? "purple" : "teal";
  const bgClass = family === "purple" ? "bg-purple-hero" : "bg-teal-hero";

  const focusItem = member.kfg.find(k => k.category === "focus");
  const keepItem = member.kfg.find(k => k.category === "keep");
  const growItem = member.kfg.find(k => k.category === "grow");

  return (
    <div
      onClick={onToggle}
      className={`${bgClass} rounded-2xl px-5 py-4 md:px-6 md:py-5 cursor-pointer transition-all duration-200`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Person icon */}
          <div 
            className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: family === "teal" ? "rgba(0, 80, 65, 0.3)" : "rgba(0, 0, 0, 0.15)" }}
          >
            <Users size={20} strokeWidth={1.75} className="text-white" />
          </div>
          <div>
            <div className="text-lg md:text-[22px] font-semibold text-white mb-1">
              {member.name}
            </div>
            <div className="text-sm font-medium text-white/70">
              {member.circle}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Status button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (member.pendingAction === "review") onReview?.();
              else if (member.pendingAction === "checkin") onRemind?.();
              else onNotes?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-xs font-semibold text-white transition-colors"
          >
            {!member.pendingAction && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {member.pendingAction === "checkin" 
              ? "Check-in due" 
              : member.pendingAction === "review" 
                ? "Review ready" 
                : "On track"}
          </button>
          {isExpanded ? (
            <ChevronUp size={20} className="text-white/60" />
          ) : (
            <ChevronDown size={20} className="text-white/60" />
          )}
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="mt-5 pt-5 border-t border-white/20"
        >
          {/* KFG List */}
          <div className="flex flex-col">
            {keepItem && (
              <KfgRow item={keepItem} label="Keep" />
            )}
            {focusItem && (
              <KfgRow item={focusItem} label="Focus" />
            )}
            {growItem && (
              <KfgRow item={growItem} label="Grow" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────

export default function TeamList({ 
  members, 
  onReview, 
  onRemind, 
  onNotes 
}: TeamListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8 md:grid md:grid-cols-[auto_1fr] md:gap-16 md:items-start">
      {/* Headline */}
      <div className="md:pt-4">
        <h2 className="text-hero-xs md:text-hero-l text-hero-blue leading-tight">
          Check in
        </h2>
        <h2 className="text-hero-xs md:text-hero-l text-hero-blue leading-tight">
          with the
        </h2>
        <h2 className="text-hero-xs md:text-hero-l text-teal-hero leading-tight">
          crew.
        </h2>
      </div>

      {/* Team cards */}
      <div className="flex flex-col gap-3">
        {members.map((member, index) => (
          <PersonCard
            key={member.id}
            member={member}
            isExpanded={expandedId === member.id}
            onToggle={() => setExpandedId(expandedId === member.id ? null : member.id)}
            colorIndex={index}
            onReview={() => onReview?.(member.id)}
            onRemind={() => onRemind?.(member.id)}
            onNotes={() => onNotes?.(member.id)}
          />
        ))}
      </div>
    </div>
  );
}
