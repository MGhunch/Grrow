// app/quiz/debug/page.tsx
import Progress from "../progress";

export default function DebugProgress() {
  return (
    <main style={{ padding: 24, maxWidth: 480, margin: "0 auto" }}>
      <h1>Progress Debug</h1>
      <Progress current={6} total={12} />
    </main>
  );
}
