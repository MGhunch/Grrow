"use client";

// ── Types ─────────────────────────────────────────────────────────────

export interface NoteItem {
  id: string;
  type: "snapshot" | "session";
  circle: string | null;
  date: string;
}

interface NoteRowProps {
  note: NoteItem;
  showBorder?: boolean;
}

// ── Icons ─────────────────────────────────────────────────────────────

function SnapshotIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" className="stroke-teal-hero" strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="10" r="5" className="stroke-teal-hero" strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="10" r="2" className="fill-teal-hero" />
    </svg>
  );
}

function SessionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" className="stroke-purple-learning" strokeWidth="1.5" fill="none" />
      <path d="M7 10 Q10 7, 13 10 Q10 13, 7 10" fill="none" className="stroke-purple-learning" strokeWidth="1.5" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────

export default function NoteRow({ note, showBorder = true }: NoteRowProps) {
  const isSnapshot = note.type === "snapshot";
  const label = isSnapshot ? `${note.circle} Snapshot` : "Connect session";

  return (
    <div className={`flex items-center gap-3 py-4 ${showBorder ? "border-b border-white/10" : ""}`}>
      {isSnapshot ? <SnapshotIcon /> : <SessionIcon />}
      <div className="flex-1">
        <span className="text-bold-s text-white">
          {label}
        </span>
        <span className="text-std-s text-white/50">
          {" "}· {note.date}
        </span>
      </div>
      <button className="px-3.5 py-1.5 bg-transparent border border-teal-hero rounded text-bold-s text-teal-hero cursor-pointer hover:bg-teal-hero/10 transition-colors">
        PDF
      </button>
    </div>
  );
}
