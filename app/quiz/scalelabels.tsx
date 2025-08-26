"use client";

type Props = { labels: readonly string[] };

export default function ScaleLabels({ labels }: Props) {
  return (
    <div className="grrow-scale">
      {labels.map((a) => (
        <span key={a}>{a}</span>
      ))}
    </div>
  );
}
