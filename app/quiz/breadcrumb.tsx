"use client";

type Props = {
  circle: string;    // "ESSENTIALS" | "EXPLORING" | ...
  strength: string;  // e.g., "Critical Thinking"
  className?: string;
};

export default function Breadcrumb({ circle, strength, className }: Props) {
  return (
    <div className={`grrow-breadcrumb ${className ?? ""}`}>
      <span className="circle">{circle}</span>
      <span className="sep">›</span>
      <span className="strength">{strength.toUpperCase()}</span>
    </div>
  );
}
