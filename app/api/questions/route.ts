// GET /api/questions?circle=ESSENTIALS&version=v1.0
type QuizCirclePayload = {
  circle: "ESSENTIALS" | "EXPLORING" | "SUPPORTING" | "LEADING";
  version: string;
  strengths: Array<{
    strength: "Critical thinking" | "Creativity" | "Collaboration" | "Communication";
    strengthOrder: number;           // 1..4
    skillset: string;                // e.g., Clarify, Simplify, Solve, Innovate...
    objective: string;               // shown once at the start of the 3 questions
    questions: Array<{ id: string; text: string; questionOrder: 1|2|3 }>;
  }>;
};
