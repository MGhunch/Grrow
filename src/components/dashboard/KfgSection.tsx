"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Sparkles, Network, Waves, GitBranch, Check } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────

export interface KFGSelection {
  category: "keep" | "focus" | "grow";
  skillset: string;
  strength: string;
  circle: string;
  family: "purple" | "teal";
  score: number;
  objective: string;
}

interface KfgSectionProps {
  kfgSelections: KFGSelection[];
}

// ── Icon Lookup ───────────────────────────────────────────────────────

const STRENGTH_ICONS: Record<string, React.ComponentType<{ size: number; strokeWidth: number; className?: string }>> = {
  "Curiosity": Sparkles,
  "Collaboration": Network,
  "Communication": Waves,
  "Critical Thinking": GitBranch,
};

const CIRCLE_STAGE: Record<string, 1 | 2 | 3 | 4> = {
  "Essentials": 1,
  "Exploring": 2,
  "Influencing": 3,
  "Leading": 4,
};

// ── Circle Dot Icon ──────────────────────────────────────────────────

function CircleDotIcon({ stage, size = 20 }: { stage: 1 | 2 | 3 | 4; size?: number }) {
  const dotRadii = [3, 4, 5.5, 7];
  const dotRadius = dotRadii[stage - 1];
  const r = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={r} cy={r} r={r} fill="rgba(255,255,255,0.25)" />
      <circle cx={r} cy={r} r={dotRadius} fill="rgba(255,255,255,0.8)" />
    </svg>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────

function getScoreState(score: number): string {
  if (score >= 76) return "Nailing it";
  if (score >= 51) return "Growing";
  if (score >= 26) return "Learning";
  return "Not yet";
}

// Progress fill — lighter shades visible against hero bg (desktop only)
const FILL_COLORS = {
  purple: {
    "Nailing it": "#B8B0F0",
    "Growing": "#6558D4",
    "Learning": "#B8B0F0",
    "Not yet": "#D8D4F5",
  },
  teal: {
    "Nailing it": "#8DE8D8",
    "Growing": "#3DCFB8",
    "Learning": "#8DE8D8",
    "Not yet": "#C8F0EA",
  },
};

function getProgressFillColor(score: number, family: "purple" | "teal"): string {
  const state = getScoreState(score) as keyof typeof FILL_COLORS.purple;
  return FILL_COLORS[family][state];
}

function getCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

// ── Score Badge (Mobile) ──────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const state = getScoreState(score);
  const isNailingIt = state === "Nailing it";

  return (
    <div 
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl self-start"
      style={{ background: "rgba(255,255,255,0.15)" }}
    >
      {isNailingIt && (
        <Check size={12} strokeWidth={2.5} className="text-white" />
      )}
      <span 
        className="text-xs font-medium"
        style={{ color: isNailingIt ? "white" : "rgba(255,255,255,0.85)" }}
      >
        {state}
      </span>
    </div>
  );
}

// ── Card Component ────────────────────────────────────────────────────

function KfgCard({ 
  item, 
  isExpanded, 
  onToggle,
  isMobile = false,
}: { 
  item: KFGSelection;
  isExpanded: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}) {
  const scoreState = getScoreState(item.score);
  const fillColor = getProgressFillColor(item.score, item.family);
  const fillPercent = Math.min(100, Math.max(0, item.score));
  
  const bgClass = item.family === "teal" ? "bg-teal-hero" : "bg-purple-hero";
  const trackColor = item.family === "teal" ? "rgba(0, 80, 65, 0.4)" : "rgba(255, 255, 255, 0.25)";
  const iconBgColor = item.family === "teal" ? "rgba(0, 80, 65, 0.3)" : "rgba(0, 0, 0, 0.15)";
  
  const IconComponent = STRENGTH_ICONS[item.strength];
  const circleStage = CIRCLE_STAGE[item.circle] || 1;

  // Mobile card — pill badge below skillset, no progress bar
  if (isMobile) {
    return (
      <div className={`${bgClass} rounded-2xl px-5 py-5 h-full flex flex-col`}>
        {/* Header row */}
        <div className="flex items-start gap-3">
          {/* Icon container */}
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: iconBgColor }}
          >
            {IconComponent && (
              <IconComponent size={20} strokeWidth={1.75} className="text-white" />
            )}
          </div>
          
          {/* Category + Skillset + Badge */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <span className="text-eyebrow text-white/60 uppercase">
              {getCategoryLabel(item.category)}
            </span>
            <span className="text-xl font-semibold text-white leading-tight mb-2">
              {item.skillset}
            </span>
            <ScoreBadge score={item.score} />
          </div>
        </div>

        {/* Objective */}
        <p className="text-light-m text-white/85 mt-4 leading-relaxed flex-1">
          {item.objective}
        </p>
        
        {/* Metadata footer */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <CircleDotIcon stage={circleStage} size={18} />
            <span className="text-bold-s text-white/70">{item.circle}</span>
          </div>
          
          <div className="flex items-center gap-2">
            {IconComponent && (
              <IconComponent size={14} strokeWidth={2} className="text-white/70" />
            )}
            <span className="text-bold-s text-white/70">{item.strength}</span>
          </div>
        </div>
      </div>
    );
  }

  // Desktop card — expandable with progress bar
  return (
    <div
      onClick={onToggle}
      className={`${bgClass} rounded-2xl px-6 py-5 cursor-pointer transition-all duration-200`}
    >
      {/* Main row */}
      <div className="flex items-center gap-4">
        {/* Icon container */}
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
          style={{ background: iconBgColor }}
        >
          {IconComponent && (
            <IconComponent size={22} strokeWidth={1.75} className="text-white" />
          )}
        </div>
        
        {/* Category + Skillset */}
        <div className="flex flex-col gap-1 min-w-[140px]">
          <span className="text-eyebrow text-white/60 uppercase">
            {getCategoryLabel(item.category)}
          </span>
          <span className="text-[22px] font-semibold text-white leading-none">
            {item.skillset}
          </span>
        </div>

        {/* Progress bar */}
        <div 
          className="w-[200px] h-2 rounded overflow-hidden shrink-0"
          style={{ background: trackColor }}
        >
          <div 
            className="h-full rounded transition-[width] duration-300"
            style={{ width: `${fillPercent}%`, background: fillColor }}
          />
        </div>

        {/* Score state */}
        <div className="text-std-s text-white/85 whitespace-nowrap ml-auto min-w-[70px]">
          {scoreState}
        </div>

        {/* Chevron */}
        {isExpanded ? (
          <ChevronUp size={20} className="text-white/60 shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-white/60 shrink-0" />
        )}
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="mt-5 pt-5 pl-[72px] border-t border-white/20">
          {/* Objective */}
          <p className="text-light-l text-white/90 mb-4 leading-relaxed">
            {item.objective}
          </p>
          
          {/* Metadata */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <CircleDotIcon stage={circleStage} size={20} />
              <span className="text-bold-s text-white/70">{item.circle}</span>
            </div>
            
            <div className="flex items-center gap-2">
              {IconComponent && (
                <IconComponent size={16} strokeWidth={2} className="text-white/70" />
              )}
              <span className="text-bold-s text-white/70">{item.strength}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Dot Indicator ─────────────────────────────────────────────────────

function DotIndicator({ 
  count, 
  activeIndex,
  items,
}: { 
  count: number; 
  activeIndex: number;
  items: KFGSelection[];
}) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: count }).map((_, i) => {
        const family = items[i]?.family || "purple";
        const isActive = i === activeIndex;
        return (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              isActive ? "w-6" : "w-2"
            }`}
            style={{
              background: isActive 
                ? (family === "teal" ? "#18B99A" : "#4C3FA0")
                : "rgba(0, 0, 0, 0.15)",
            }}
          />
        );
      })}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────

export default function KfgSection({ kfgSelections }: KfgSectionProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const orderedItems = [
    kfgSelections.find(k => k.category === "keep"),
    kfgSelections.find(k => k.category === "focus"),
    kfgSelections.find(k => k.category === "grow"),
  ].filter(Boolean) as KFGSelection[];

  const toggleCard = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // Track scroll position for dot indicator
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.8; // 80vw cards
      const gap = 12; // gap-3 = 12px
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveCardIndex(Math.min(index, orderedItems.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [orderedItems.length]);

  return (
    <div>
      {/* ── Mobile Layout ─────────────────────────────────────────── */}
      <div className="md:hidden">
        {/* Headline */}
        <div className="mb-6">
          <h2 className="text-hero-xs text-hero-blue leading-tight">
            Your
          </h2>
          <h2 className="text-hero-xs text-hero-blue leading-tight">
            big three.
          </h2>
          <h2 className="text-hero-xs text-teal-hero leading-tight">
            Have at it.
          </h2>
          
          <p className="text-light-m text-ui-muted mt-4 leading-relaxed">
            Here's a strength, a stretch<br />
            and something to dig into.
          </p>
        </div>

        {/* Carousel — snap-stop: always for click-into-place */}
        <div 
          ref={scrollRef}
          className="overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-3">
            {orderedItems.map(item => (
              <div 
                key={item.category} 
                className="w-[80vw] shrink-0 snap-center"
                style={{ scrollSnapStop: "always" }}
              >
                <KfgCard
                  item={item}
                  isExpanded={false}
                  onToggle={() => {}}
                  isMobile={true}
                />
              </div>
            ))}
            {/* End padding for last card peek */}
            <div className="w-4 shrink-0" aria-hidden="true" />
          </div>
        </div>

        {/* Dot indicator */}
        <DotIndicator 
          count={orderedItems.length} 
          activeIndex={activeCardIndex}
          items={orderedItems}
        />
      </div>

      {/* ── Desktop Layout ────────────────────────────────────────── */}
      <div className="hidden md:grid grid-cols-[auto_1fr] gap-12 items-start">
        {/* Headline */}
        <div className="pt-2">
          <h2 className="text-hero-m text-hero-blue leading-tight">
            Your
          </h2>
          <h2 className="text-hero-m text-hero-blue leading-tight">
            big three.
          </h2>
          <h2 className="text-hero-m text-teal-hero leading-tight">
            Have at it.
          </h2>
          
          <p className="text-light-l text-ui-muted mt-5 leading-relaxed">
            Here's a strength, a stretch<br />
            and something to dig into.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3 max-w-[800px] ml-10">
          {orderedItems.map(item => (
            <KfgCard
              key={item.category}
              item={item}
              isExpanded={expandedCategory === item.category}
              onToggle={() => toggleCard(item.category)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
