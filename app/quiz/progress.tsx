// app/quiz/progress.tsx
"use client";

type Props = {
  current: number;   // 0..total
  total: number;     // e.g., 12
  className?: string;
};

export default function Progress({ current, total, className }: Props) {
  const pct = total === 0 ? 0 : Math.max(0, Math.min(100, (current / total) * 100));
  return (
    <div className={`grrow-progress ${className ?? ""}`}>
      <div className="bar" style={{ width: `${pct}%` }} />
    </div>
  );
}
