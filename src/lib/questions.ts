// ============================================================================
// QUESTIONS DATA LAYER
// ============================================================================
// Structured to match Supabase schema. Swap fetch for constants when ready.
// See BIBLE.md Section 10 for schema reference.
// ============================================================================

import type { StrengthName, Circle } from './types';

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

export type QuestionId = string; // e.g. 'C1-CRI-CLARIFY-1'

export interface Question {
  id: QuestionId;
  circle: Circle;
  strength: StrengthName;
  strengthOrder: number; // 1-4 within a circle
  skillset: string;
  objective: string;
  title: string; // Short handle for display (2-4 words)
  questionText: string;
  questionOrder: number; // 1-3 within a skillset
  version: string;
  active: boolean;
  // org_id omitted — null for Grrow defaults, handled at query layer
}

export interface Skillset {
  circle: Circle;
  strength: StrengthName;
  skillset: string;
  objective: string;
  family: 'purple' | 'teal';
  questions: Question[];
}

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------

export const STRENGTH_ORDER: Record<StrengthName, number> = {
  'Curiosity': 1,
  'Collaboration': 2,
  'Communication': 3,
  'Critical Thinking': 4,
};

export const STRENGTH_FAMILY: Record<StrengthName, 'purple' | 'teal'> = {
  'Curiosity': 'purple',
  'Critical Thinking': 'purple',
  'Collaboration': 'teal',
  'Communication': 'teal',
};

// ----------------------------------------------------------------------------
// Questions — All 48
// ----------------------------------------------------------------------------

export const QUESTIONS: Question[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ESSENTIALS
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Curiosity · Question ───────────────────────────────────────────────────
  {
    id: 'C1-CUR-QUESTION-1',
    circle: 'ESSENTIALS',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Question',
    objective: 'Do you stay curious about people and ideas beyond your immediate work?',
    title: 'Tune into people',
    questionText: 'Are you interested in how people think and what that means for your work?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C1-CUR-QUESTION-2',
    circle: 'ESSENTIALS',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Question',
    objective: 'Do you stay curious about people and ideas beyond your immediate work?',
    title: 'Steal like a pirate',
    questionText: 'Do you actively seek ideas and inspiration from outside what you\'re doing?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C1-CUR-QUESTION-3',
    circle: 'ESSENTIALS',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Question',
    objective: 'Do you stay curious about people and ideas beyond your immediate work?',
    title: 'Ask why before how',
    questionText: 'Do you stop and ask why before you ask how?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Collaboration · Engage ─────────────────────────────────────────────────
  {
    id: 'C1-COL-ENGAGE-1',
    circle: 'ESSENTIALS',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Engage',
    objective: 'Do you consistently deliver and learn from feedback to be seen as a safe pair of hands?',
    title: 'Own your time',
    questionText: 'Do you manage your time proactively and reliably deliver on deadlines?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C1-COL-ENGAGE-2',
    circle: 'ESSENTIALS',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Engage',
    objective: 'Do you consistently deliver and learn from feedback to be seen as a safe pair of hands?',
    title: 'Sense check',
    questionText: 'Do you sense check thinking with others to make the work better?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C1-COL-ENGAGE-3',
    circle: 'ESSENTIALS',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Engage',
    objective: 'Do you consistently deliver and learn from feedback to be seen as a safe pair of hands?',
    title: 'Seek feedback',
    questionText: 'Do you actively seek feedback and use it to improve your work?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Communication · Update ─────────────────────────────────────────────────
  {
    id: 'C1-COM-UPDATE-1',
    circle: 'ESSENTIALS',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Update',
    objective: 'Do you respond promptly, share clear updates, and flag changes that impact others?',
    title: 'Close the loop',
    questionText: 'Do you respond promptly so people aren\'t left waiting?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C1-COM-UPDATE-2',
    circle: 'ESSENTIALS',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Update',
    objective: 'Do you respond promptly, share clear updates, and flag changes that impact others?',
    title: 'Keep it simple',
    questionText: 'Do you share clear, simple updates that others can easily understand?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C1-COM-UPDATE-3',
    circle: 'ESSENTIALS',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Update',
    objective: 'Do you respond promptly, share clear updates, and flag changes that impact others?',
    title: 'Raise good flags',
    questionText: 'Do you let people know quickly when plans change and might affect them?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Critical Thinking · Clarify ────────────────────────────────────────────
  {
    id: 'C1-CRI-CLARIFY-1',
    circle: 'ESSENTIALS',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Clarify',
    objective: 'Do you take time to clarify the ask and summarise the job before starting?',
    title: 'Clarify the ask',
    questionText: 'Do you clarify things people ask to make sure you\'ve understood it?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C1-CRI-CLARIFY-2',
    circle: 'ESSENTIALS',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Clarify',
    objective: 'Do you take time to clarify the ask and summarise the job before starting?',
    title: 'Spot the blockers',
    questionText: 'Can you recognise key challenges or constraints up front?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C1-CRI-CLARIFY-3',
    circle: 'ESSENTIALS',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Clarify',
    objective: 'Do you take time to clarify the ask and summarise the job before starting?',
    title: 'Play it back',
    questionText: 'Do you clearly summarise what and why before you get started?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EXPLORING
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Curiosity · Challenge ──────────────────────────────────────────────────
  {
    id: 'C2-CUR-CHALLENGE-1',
    circle: 'EXPLORING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Challenge',
    objective: 'Do you question how things are done and seek ways to make them better?',
    title: 'Challenge the process',
    questionText: 'Do you question how things are done and look for ways to improve them?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C2-CUR-CHALLENGE-2',
    circle: 'EXPLORING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Challenge',
    objective: 'Do you question how things are done and seek ways to make them better?',
    title: 'Give good feedback',
    questionText: 'Do you push back constructively when something could be better?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C2-CUR-CHALLENGE-3',
    circle: 'EXPLORING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Challenge',
    objective: 'Do you question how things are done and seek ways to make them better?',
    title: 'Build on ideas',
    questionText: 'Do you build on other people\'s thinking to create better ideas?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Collaboration · Connect ────────────────────────────────────────────────
  {
    id: 'C2-COL-CONNECT-1',
    circle: 'EXPLORING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Connect',
    objective: 'Do you juggle competing views, anticipate needs and work to reduce friction?',
    title: 'Own the outcome',
    questionText: 'Do you take ownership for delivery and influence others to meet deadlines?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C2-COL-CONNECT-2',
    circle: 'EXPLORING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Connect',
    objective: 'Do you juggle competing views, anticipate needs and work to reduce friction?',
    title: 'Balance the answer',
    questionText: 'Do you juggle different opinions to land the best answers for your project?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C2-COL-CONNECT-3',
    circle: 'EXPLORING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Connect',
    objective: 'Do you juggle competing views, anticipate needs and work to reduce friction?',
    title: 'Clear the path',
    questionText: 'Do you anticipate other people\'s needs and work to reduce wasted effort?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Communication · Navigate ───────────────────────────────────────────────
  {
    id: 'C2-COM-NAVIGATE-1',
    circle: 'EXPLORING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Navigate',
    objective: 'Do you read the room, anticipate needs, and keep the right people informed?',
    title: 'Flag your capacity',
    questionText: 'Do you actively manage priorities and signal your availability?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C2-COM-NAVIGATE-2',
    circle: 'EXPLORING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Navigate',
    objective: 'Do you read the room, anticipate needs, and keep the right people informed?',
    title: 'Manage up',
    questionText: 'Do you update stakeholders in a way that works best for them?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C2-COM-NAVIGATE-3',
    circle: 'EXPLORING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Navigate',
    objective: 'Do you read the room, anticipate needs, and keep the right people informed?',
    title: 'Adapt and flex',
    questionText: 'Do you flag issues early and adapt plans to keep things on track?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Critical Thinking · Simplify ───────────────────────────────────────────
  {
    id: 'C2-CRI-SIMPLIFY-1',
    circle: 'EXPLORING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Simplify',
    objective: 'Do you focus on what matters most and learn from what\'s worked before?',
    title: 'Sort news from noise',
    questionText: 'Can you spot what matters in amongst everything else?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C2-CRI-SIMPLIFY-2',
    circle: 'EXPLORING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Simplify',
    objective: 'Do you focus on what matters most and learn from what\'s worked before?',
    title: 'Manage constraints',
    questionText: 'Do you recognise constraints and clarify scope up front?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C2-CRI-SIMPLIFY-3',
    circle: 'EXPLORING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Simplify',
    objective: 'Do you focus on what matters most and learn from what\'s worked before?',
    title: 'Spot patterns',
    questionText: 'Do you compare and contrast similar projects to bring context and clarity?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INFLUENCING
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Curiosity · Create ─────────────────────────────────────────────────────
  {
    id: 'C3-CUR-CREATE-1',
    circle: 'INFLUENCING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Create',
    objective: 'Do you identify ideas with potential and fight for the ones that are worth it?',
    title: 'Spot the winners',
    questionText: 'Do you easily identify which ideas have the most potential to create value?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C3-CUR-CREATE-2',
    circle: 'INFLUENCING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Create',
    objective: 'Do you identify ideas with potential and fight for the ones that are worth it?',
    title: 'Pick your battles',
    questionText: 'Do you know when to fight for an idea and when to let it go?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C3-CUR-CREATE-3',
    circle: 'INFLUENCING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Create',
    objective: 'Do you identify ideas with potential and fight for the ones that are worth it?',
    title: 'Sell it in',
    questionText: 'Do you sell ideas you believe in with passion and energy?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Collaboration · Unlock ─────────────────────────────────────────────────
  {
    id: 'C3-COL-UNLOCK-1',
    circle: 'INFLUENCING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Unlock',
    objective: 'Do you remove barriers and create clarity so others can succeed?',
    title: 'Smooth the friction',
    questionText: 'Do you resolve people or process challenges to keep work flowing efficiently?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C3-COL-UNLOCK-2',
    circle: 'INFLUENCING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Unlock',
    objective: 'Do you remove barriers and create clarity so others can succeed?',
    title: 'Build trust',
    questionText: 'Do you adapt your approach to build trust and alignment across different people?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C3-COL-UNLOCK-3',
    circle: 'INFLUENCING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Unlock',
    objective: 'Do you remove barriers and create clarity so others can succeed?',
    title: 'Fix the blockers',
    questionText: 'Do you enable others to succeed by creating clarity and removing barriers?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Communication · Persuade ───────────────────────────────────────────────
  {
    id: 'C3-COM-PERSUADE-1',
    circle: 'INFLUENCING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Persuade',
    objective: 'Do you frame your thinking for different people to land your ideas?',
    title: 'Frame the sell',
    questionText: 'Do you frame your ideas in ways that connect and persuade others?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C3-COM-PERSUADE-2',
    circle: 'INFLUENCING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Persuade',
    objective: 'Do you frame your thinking for different people to land your ideas?',
    title: 'Build relationships',
    questionText: 'Do you take time to build relationships with people outside of the day to day?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C3-COM-PERSUADE-3',
    circle: 'INFLUENCING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Persuade',
    objective: 'Do you frame your thinking for different people to land your ideas?',
    title: 'Find their frequency',
    questionText: 'Do you adapt your communication style to suit different people and needs?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Critical Thinking · Solve ──────────────────────────────────────────────
  {
    id: 'C3-CRI-SOLVE-1',
    circle: 'INFLUENCING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Solve',
    objective: 'Do you dig beyond the noise to solve the problems that cause it?',
    title: 'See past the obvious',
    questionText: 'Can you spot when the visible problem is caused by something else?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C3-CRI-SOLVE-2',
    circle: 'INFLUENCING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Solve',
    objective: 'Do you dig beyond the noise to solve the problems that cause it?',
    title: 'Find where it lives',
    questionText: 'Do you trace things back to the root cause?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C3-CRI-SOLVE-3',
    circle: 'INFLUENCING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Solve',
    objective: 'Do you dig beyond the noise to solve the problems that cause it?',
    title: 'Fix what matters',
    questionText: 'Do you fix what\'s causing the issue vs shuffling things around?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEADING
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Curiosity · Cultivate ──────────────────────────────────────────────────
  {
    id: 'C4-CUR-CULTIVATE-1',
    circle: 'LEADING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Cultivate',
    objective: 'Do you foster curiosity and champion the creativity it sparks?',
    title: 'Champion the curious',
    questionText: 'Do you foster a culture of curiosity and back the people who bring it?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C4-CUR-CULTIVATE-2',
    circle: 'LEADING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Cultivate',
    objective: 'Do you foster curiosity and champion the creativity it sparks?',
    title: 'Protect the spark',
    questionText: 'Do you protect early ideas to give them time to reach their potential?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C4-CUR-CULTIVATE-3',
    circle: 'LEADING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Cultivate',
    objective: 'Do you foster curiosity and champion the creativity it sparks?',
    title: 'Trust the process',
    questionText: 'Do you give people freedom to explore ideas without a commercial objective in mind?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Collaboration · Inspire ────────────────────────────────────────────────
  {
    id: 'C4-COL-INSPIRE-1',
    circle: 'LEADING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Inspire',
    objective: 'Do you lead with energy, coach consistently, and inspire your teams to succeed?',
    title: 'Build strong teams',
    questionText: 'Do you build high performing teams with different strengths and perspectives?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C4-COL-INSPIRE-2',
    circle: 'LEADING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Inspire',
    objective: 'Do you lead with energy, coach consistently, and inspire your teams to succeed?',
    title: 'Coach on the go',
    questionText: 'Do you coach and course-correct to keep people and projects on track?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C4-COL-INSPIRE-3',
    circle: 'LEADING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Inspire',
    objective: 'Do you lead with energy, coach consistently, and inspire your teams to succeed?',
    title: 'Bring the energy',
    questionText: 'Do you inspire confidence with clarity, energy and support?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Communication · Guide ──────────────────────────────────────────────────
  {
    id: 'C4-COM-GUIDE-1',
    circle: 'LEADING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Guide',
    objective: 'Do you set clear goals, assess progress fairly, and empower your teams to thrive?',
    title: 'Set direction',
    questionText: 'Do you set clear goals and guidelines to give people confidence?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C4-COM-GUIDE-2',
    circle: 'LEADING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Guide',
    objective: 'Do you set clear goals, assess progress fairly, and empower your teams to thrive?',
    title: 'Call it fairly',
    questionText: 'Do you assess progress and course-correct with clarity and fairness?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C4-COM-GUIDE-3',
    circle: 'LEADING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Guide',
    objective: 'Do you set clear goals, assess progress fairly, and empower your teams to thrive?',
    title: 'Coach, don\'t crowd',
    questionText: 'Do you give direction and trust people to run with it?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Critical Thinking · Innovate ───────────────────────────────────────────
  {
    id: 'C4-CRI-INNOVATE-1',
    circle: 'LEADING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Innovate',
    objective: 'Do you spot industry innovations, evaluate new ideas, and drive their adoption?',
    title: 'Watch the horizon',
    questionText: 'Do you actively stay up to speed on industry and category innovations?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C4-CRI-INNOVATE-2',
    circle: 'LEADING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Innovate',
    objective: 'Do you spot industry innovations, evaluate new ideas, and drive their adoption?',
    title: 'Spot what\'s next',
    questionText: 'Can you recognise or concept new ideas or innovations that drive commercial value?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'C4-CRI-INNOVATE-3',
    circle: 'LEADING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Innovate',
    objective: 'Do you spot industry innovations, evaluate new ideas, and drive their adoption?',
    title: 'Make it real',
    questionText: 'Can you size, scope and sell new ideas and drive their adoption?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },
];

// ----------------------------------------------------------------------------
// Helper Functions
// ----------------------------------------------------------------------------

/**
 * Get all questions for a specific circle
 */
export function getQuestionsForCircle(circle: Circle): Question[] {
  return QUESTIONS.filter((q) => q.circle === circle && q.active);
}

/**
 * Get questions for two circles (for 24-question quiz)
 */
export function getQuestionsForCircles(circles: [Circle, Circle]): Question[] {
  return QUESTIONS.filter((q) => circles.includes(q.circle) && q.active);
}

/**
 * Get all questions for a specific skillset
 */
export function getQuestionsForSkillset(
  circle: Circle,
  strength: StrengthName
): Question[] {
  return QUESTIONS.filter(
    (q) => q.circle === circle && q.strength === strength && q.active
  ).sort((a, b) => a.questionOrder - b.questionOrder);
}

/**
 * Get the objective for a specific skillset
 */
export function getObjectiveForSkillset(
  circle: Circle,
  strength: StrengthName
): string | null {
  const question = QUESTIONS.find(
    (q) => q.circle === circle && q.strength === strength && q.active
  );
  return question?.objective ?? null;
}

/**
 * Get the skillset name for a circle/strength combo
 */
export function getSkillsetName(circle: Circle, strength: StrengthName): string | null {
  const question = QUESTIONS.find(
    (q) => q.circle === circle && q.strength === strength && q.active
  );
  return question?.skillset ?? null;
}

/**
 * Group questions into skillset blocks for quiz flow
 * Returns skillsets in strength order (1-4) for a given circle
 */
export function getSkillsetsForCircle(circle: Circle): Skillset[] {
  const circleQuestions = getQuestionsForCircle(circle);

  const grouped = circleQuestions.reduce<Record<string, Question[]>>(
    (acc, q) => {
      const key = q.strength;
      if (!acc[key]) acc[key] = [];
      acc[key].push(q);
      return acc;
    },
    {}
  );

  return Object.entries(grouped)
    .map(([strength, questions]) => ({
      circle,
      strength: strength as StrengthName,
      skillset: questions[0].skillset,
      objective: questions[0].objective,
      family: STRENGTH_FAMILY[strength as StrengthName],
      questions: questions.sort((a, b) => a.questionOrder - b.questionOrder),
    }))
    .sort((a, b) => STRENGTH_ORDER[a.strength] - STRENGTH_ORDER[b.strength]);
}

/**
 * Get skillsets for two circles (for 24-question quiz)
 * Returns all 8 skillsets in order: first circle (4) then second circle (4)
 */
export function getSkillsetsForQuiz(circles: [Circle, Circle]): Skillset[] {
  return [
    ...getSkillsetsForCircle(circles[0]),
    ...getSkillsetsForCircle(circles[1]),
  ];
}

/**
 * Get a single question by ID
 */
export function getQuestionById(id: QuestionId): Question | null {
  return QUESTIONS.find((q) => q.id === id) ?? null;
}

/**
 * Get a Skillset by name (e.g., "Clarify", "Navigate", "Cultivate")
 * Searches all circles to find the matching skillset.
 */
export function getSkillsetByName(name: string): Skillset | null {
  const circles: Circle[] = ['ESSENTIALS', 'EXPLORING', 'INFLUENCING', 'LEADING'];
  for (const circle of circles) {
    const skillsets = getSkillsetsForCircle(circle);
    const match = skillsets.find(s => s.skillset === name);
    if (match) return match;
  }
  return null;
}
