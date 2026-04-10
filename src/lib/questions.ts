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

export type QuestionId = string; // e.g. 'CT-CLA-01'

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
    id: 'CR-QUE-13',
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
    id: 'CR-QUE-14',
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
    id: 'CR-QUE-15',
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
    id: 'CL-ENG-25',
    circle: 'ESSENTIALS',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Engage',
    objective: 'Do you consistently deliver and use feedback to be a safe pair of hands?',
    title: 'Own your time',
    questionText: 'Do you manage your time proactively and reliably deliver on deadlines?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CL-ENG-26',
    circle: 'ESSENTIALS',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Engage',
    objective: 'Do you consistently deliver and use feedback to be a safe pair of hands?',
    title: 'Bounce ideas',
    questionText: 'Do you share your ideas and bounce off others to improve the thinking?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CL-ENG-27',
    circle: 'ESSENTIALS',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Engage',
    objective: 'Do you consistently deliver and use feedback to be a safe pair of hands?',
    title: 'Seek feedback',
    questionText: 'Do you actively seek feedback and use it to improve your work?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Communication · Update ─────────────────────────────────────────────────
  {
    id: 'CO-CON-37',
    circle: 'ESSENTIALS',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Update',
    objective: 'Do you respond promptly, share clear updates, and flag changes that impact others?',
    title: 'Close the loop',
    questionText: 'Do you respond to requests and updates in a timely way?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CO-CON-38',
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
    id: 'CO-CON-39',
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
    id: 'CT-CLA-01',
    circle: 'ESSENTIALS',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Clarify',
    objective: 'Do you take time to clarify the ask and summarise the job before starting?',
    title: 'Clarify the ask',
    questionText: 'Do you take time to clarify any requests, briefs or feedback?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CT-CLA-02',
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
    id: 'CT-CLA-03',
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
    id: 'CR-IMP-16',
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
    id: 'CR-IMP-17',
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
    id: 'CR-IMP-18',
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
    id: 'CL-OPO-28',
    circle: 'EXPLORING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Connect',
    objective: 'Do you anticipate others\' needs, juggle competing views, and reduce friction?',
    title: 'Own the outcome',
    questionText: 'Do you take ownership for delivery and influence others to meet deadlines?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CL-OPO-29',
    circle: 'EXPLORING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Connect',
    objective: 'Do you anticipate others\' needs, juggle competing views, and reduce friction?',
    title: 'Navigate the room',
    questionText: 'Do you juggle different opinions and land the best answers for the project?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CL-OPO-30',
    circle: 'EXPLORING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Connect',
    objective: 'Do you anticipate others\' needs, juggle competing views, and reduce friction?',
    title: 'Clear the path',
    questionText: 'Do you anticipate other people\'s needs and work to reduce wasted effort?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Communication · Navigate ───────────────────────────────────────────────
  {
    id: 'CO-MUM-40',
    circle: 'EXPLORING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Navigate',
    objective: 'Do you read the room, anticipate needs, and keep the right people informed?',
    title: 'Flag your capacity',
    questionText: 'Do you actively manage and share your availability and priorities?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CO-MUM-41',
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
    id: 'CO-MUM-42',
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
    id: 'CT-SIM-04',
    circle: 'EXPLORING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Simplify',
    objective: 'Do you focus on what matters most and learn from what\'s worked before?',
    title: 'Sort news from noise',
    questionText: 'Do you consider all relevant information and identify what matters most?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CT-SIM-05',
    circle: 'EXPLORING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Simplify',
    objective: 'Do you focus on what matters most and learn from what\'s worked before?',
    title: 'Manage constraints',
    questionText: 'Do you recognise constraints and clarify scope and boundaries?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CT-SIM-06',
    circle: 'EXPLORING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Simplify',
    objective: 'Do you focus on what matters most and learn from what\'s worked before?',
    title: 'Spot patterns',
    questionText: 'Do you compare and contrast similar projects or ideas to clarify understanding?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INFLUENCING
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Curiosity · Create ─────────────────────────────────────────────────────
  {
    id: 'CR-GVG-19',
    circle: 'INFLUENCING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Create',
    objective: 'Do you identify ideas with potential and fight for the ones worth it?',
    title: 'Spot the winners',
    questionText: 'Do you easily identify which ideas have the most potential to create value?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CR-GVG-20',
    circle: 'INFLUENCING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Create',
    objective: 'Do you identify ideas with potential and fight for the ones worth it?',
    title: 'Pick your battles',
    questionText: 'Do you know how to pick your battles and fight for the ideas worth fighting for?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CR-GVG-21',
    circle: 'INFLUENCING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Create',
    objective: 'Do you identify ideas with potential and fight for the ones worth it?',
    title: 'Sell it in',
    questionText: 'Do you know how to sell the ideas you believe in?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Collaboration · Unlock ─────────────────────────────────────────────────
  {
    id: 'CL-EMP-31',
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
    id: 'CL-EMP-32',
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
    id: 'CL-EMP-33',
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
    id: 'CO-INF-43',
    circle: 'INFLUENCING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Persuade',
    objective: 'Do you frame your thinking so your ideas land with different people?',
    title: 'Frame the sell',
    questionText: 'Do you frame your ideas in ways that connect and persuade others?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CO-INF-44',
    circle: 'INFLUENCING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Persuade',
    objective: 'Do you frame your thinking so your ideas land with different people?',
    title: 'Build relationships',
    questionText: 'Do you take time to build relationships with people outside of the day to day?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CO-INF-45',
    circle: 'INFLUENCING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Persuade',
    objective: 'Do you frame your thinking so your ideas land with different people?',
    title: 'Read the room',
    questionText: 'Do you adapt your communication style to suit different people and needs?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Critical Thinking · Solve ──────────────────────────────────────────────
  {
    id: 'CT-SOL-07',
    circle: 'INFLUENCING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Solve',
    objective: 'Do you diagnose root causes, identify blockers, and find better solutions?',
    title: 'Pinpoint the problem',
    questionText: 'Can you easily identify specific challenges within a wider context?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CT-SOL-08',
    circle: 'INFLUENCING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Solve',
    objective: 'Do you diagnose root causes, identify blockers, and find better solutions?',
    title: 'Find the root cause',
    questionText: 'Can you analyse challenges at root cause to identify the core problem?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CT-SOL-09',
    circle: 'INFLUENCING',
    strength: 'Critical Thinking',
    strengthOrder: 4,
    skillset: 'Solve',
    objective: 'Do you diagnose root causes, identify blockers, and find better solutions?',
    title: 'Find a better way',
    questionText: 'Can you identify alternative solutions that deliver better outcomes?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEADING
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Curiosity · Cultivate ──────────────────────────────────────────────────
  {
    id: 'CR-INN-22',
    circle: 'LEADING',
    strength: 'Curiosity',
    strengthOrder: 1,
    skillset: 'Cultivate',
    objective: 'Do you foster curiosity and champion the creativity it sparks?',
    title: 'Champion the curious',
    questionText: 'Do you foster a curious environment and celebrate curious people?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CR-INN-23',
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
    id: 'CR-INN-24',
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
    id: 'CL-INS-34',
    circle: 'LEADING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Inspire',
    objective: 'Do you lead with energy, coach consistently, and inspire your teams?',
    title: 'Build strong teams',
    questionText: 'Do you build high performing teams with different strengths and perspectives?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CL-INS-35',
    circle: 'LEADING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Inspire',
    objective: 'Do you lead with energy, coach consistently, and inspire your teams?',
    title: 'Coach on the go',
    questionText: 'Do you coach and course-correct to keep people and projects on track?',
    questionOrder: 2,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CL-INS-36',
    circle: 'LEADING',
    strength: 'Collaboration',
    strengthOrder: 2,
    skillset: 'Inspire',
    objective: 'Do you lead with energy, coach consistently, and inspire your teams?',
    title: 'Bring the energy',
    questionText: 'Do you inspire confidence with clarity, energy and support?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Communication · Guide ──────────────────────────────────────────────────
  {
    id: 'CO-GUI-46',
    circle: 'LEADING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Guide',
    objective: 'Do you set clear goals, assess progress fairly, and empower your teams to thrive?',
    title: 'Set direction',
    questionText: 'Do you set clear goals and objectives to give people confidence?',
    questionOrder: 1,
    version: 'v1.0',
    active: true,
  },
  {
    id: 'CO-GUI-47',
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
    id: 'CO-GUI-48',
    circle: 'LEADING',
    strength: 'Communication',
    strengthOrder: 3,
    skillset: 'Guide',
    objective: 'Do you set clear goals, assess progress fairly, and empower your teams to thrive?',
    title: 'Direct, don\'t control',
    questionText: 'Do you empower others by giving direction without over-controlling?',
    questionOrder: 3,
    version: 'v1.0',
    active: true,
  },

  // ── Critical Thinking · Innovate ───────────────────────────────────────────
  {
    id: 'CT-INN-10',
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
    id: 'CT-INN-11',
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
    id: 'CT-INN-12',
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
