"use client";

import Snapshot from "@/components/reports/Snapshot";
import { SAMPLE_DATA } from "@/components/reports/sampleData";

// ═══════════════════════════════════════════════════════════════════════════
// Snapshot Route — /snapshot/[roundId]/page.tsx
// TODO: Replace SAMPLE_DATA with real data fetched from Supabase
// ═══════════════════════════════════════════════════════════════════════════

export default function SnapshotPage() {
  return <Snapshot data={SAMPLE_DATA} />;
}
