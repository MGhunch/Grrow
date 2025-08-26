// Shared quiz types

export type Question = {
  id: string;
  text: string;
  questionOrder: 1 | 2 | 3;
};

export type StrengthBlock = {
  strength: "Critical Thinking" | "Creativity" | "Collaboration" | "Communication";
  strengthOrder: number;
  skillset: string;   // e.g., "Clarify", "Simplify", "Question", etc. :contentReference[oaicite:0]{index=0}
  objective: string;  // one-line objective under each skillset :contentReference[oaicite:1]{index=1}
  questions: Question[]; // exactly 3 per skillset :contentReference[oaicite:2]{index=2}
};

export type Circle = "ESSENTIALS" | "EXPLORING" | "SUPPORTING" | "LEADING";

export type QuizData = {
  circle: Circle;
  version: string;
  strengths: StrengthBlock[]; // 4 strengths per circle :contentReference[oaicite:3]{index=3}
};

export type AnswerMap = Record<string, number>;
