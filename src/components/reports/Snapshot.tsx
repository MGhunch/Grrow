"use client";

import { useState } from "react";
import { UI, TEXT } from "./shared";
import { SnapshotData } from "./types";
import SnapshotPage1 from "./SnapshotPage1";
import SnapshotPage2 from "./SnapshotPage2";

// ═══════════════════════════════════════════════════════════════════════════
// Snapshot — Pagination Wrapper
// ═══════════════════════════════════════════════════════════════════════════

interface SnapshotProps {
  data: SnapshotData;
}

export default function Snapshot({ data }: SnapshotProps) {
  const [page, setPage] = useState(0);
  const totalPages = 2;

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setPage((p) => Math.max(p - 1, 0));
  const goToPage = (p: number) => setPage(p);

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: UI.pageBackground,
      }}
    >
      {/* Page content */}
      <div style={{ marginBottom: 20 }}>
        {page === 0 && <SnapshotPage1 data={data} />}
        {page === 1 && <SnapshotPage2 data={data} />}
      </div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Back button */}
        {page > 0 && (
          <button
            onClick={prevPage}
            style={{
              background: "#fff",
              color: UI.teal,
              border: `1px solid ${UI.teal}`,
              padding: "8px 20px",
              borderRadius: 8,
              fontFamily: "inherit",
              ...TEXT.bold.s,
              cursor: "pointer",
            }}
          >
            Back
          </button>
        )}

        {/* Dots */}
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1].map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: "none",
                background: page === p ? UI.deepPurple : UI.border,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              aria-label={`Page ${p + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        {page < totalPages - 1 && (
          <button
            onClick={nextPage}
            style={{
              background: UI.teal,
              color: "#fff",
              border: "none",
              padding: "8px 20px",
              borderRadius: 8,
              fontFamily: "inherit",
              ...TEXT.bold.s,
              cursor: "pointer",
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
