// ═══════════════════════════════════════════════════════════════════════════
// Grrow Feedback — Cores (diagnostic + next move per skillset × state)
// ═══════════════════════════════════════════════════════════════════════════
//
// 64 entries: 16 skillsets × 4 score states.
// Each entry has a diagnostic (skillset-specific observation) and a nextMove
// (concrete action calibrated to the stage of competence).
//
// The body of each rendered blurb is `${diagnostic} ${nextMove}` joined.
//
// This is the editable content. Tone is currently slightly didactic in places
// — open to a relaxation pass.
// ═══════════════════════════════════════════════════════════════════════════

import type { ScoreState } from "../types";

export interface Feedback {
  diagnostic: string;
  nextMove: string;
}

export type SkillsetFeedback = Record<ScoreState, Feedback>;

export const FEEDBACK: Record<string, SkillsetFeedback> = {
  // ── ESSENTIALS ─────────────────────────────────────────────────────────

  "Question": {
    "Not yet": {
      diagnostic: "Asking why before how isn't a default — the brief tends to get taken at face value.",
      nextMove: "Start by asking \u201Cwhy are we doing this?\u201D on your next task.",
    },
    "Learning": {
      diagnostic: "Tuning into people isn't yet a default mode — it comes and goes.",
      nextMove: "An easy win is one curious question about someone's thinking on your next call.",
    },
    "Growing": {
      diagnostic: "You're already asking why and reading people — when you make space for it.",
      nextMove: "Maybe try one curious question that doesn't go straight to the work.",
    },
    "Nailing it": {
      diagnostic: "Why questions, people-reading and outside ideas all run as one motion.",
      nextMove: "Bonus points for thinking about how this curiosity rubs off on the people around you.",
    },
  },

  "Engage": {
    "Not yet": {
      diagnostic: "Reliable delivery isn't yet locked in — the ripple of late work tends to be hard to see from inside.",
      nextMove: "Start by asking the person waiting on you what your timing means for them.",
    },
    "Learning": {
      diagnostic: "Actively seeking feedback isn't yet routine — it comes up when remembered, not as a default.",
      nextMove: "An easy win is asking \u201Chow could this be better?\u201D before calling it done.",
    },
    "Growing": {
      diagnostic: "You're already delivering on time and sharing ideas — though sometimes one comes at the cost of the other.",
      nextMove: "Maybe try bouncing one idea early, when the cost of changing is still low.",
    },
    "Nailing it": {
      diagnostic: "Deadlines, ideas, and feedback all run as one motion.",
      nextMove: "Bonus points for thinking about what engagement looks like at the next level, with the people around you.",
    },
  },

  "Update": {
    "Not yet": {
      diagnostic: "Timely replies haven't become routine — they tend to slip behind whatever you're already on.",
      nextMove: "Start by setting one window each day for replies.",
    },
    "Learning": {
      diagnostic: "Flagging changes shows up — though not always before they land.",
      nextMove: "Try flagging the change before it lands, not after.",
    },
    "Growing": {
      diagnostic: "You're already responding promptly and flagging changes — though not always before they land.",
      nextMove: "Next step is a heads-up the moment something shifts, before you have the full answer.",
    },
    "Nailing it": {
      diagnostic: "Replies are sharp, updates are clean, flags go up early.",
      nextMove: "From here, the lift is sharing this rhythm with your wider team.",
    },
  },

  "Clarify": {
    "Not yet": {
      diagnostic: "Taking time to clarify is still new ground — briefs tend to get taken at face value.",
      nextMove: "Start by asking one clarifying question before the next thing you start.",
    },
    "Learning": {
      diagnostic: "Playback comes up — though not always before the work begins.",
      nextMove: "An easy win is a quick \u201Cso what we're doing is\u2026\u201D before you start.",
    },
    "Growing": {
      diagnostic: "You're already clarifying the ask and playing it back — though not always before the work begins.",
      nextMove: "Maybe try a quick recap email after every brief.",
    },
    "Nailing it": {
      diagnostic: "You ask, spot blockers and play it back as one move — every time.",
      nextMove: "Bonus points for teaching this habit to someone who's still winging it.",
    },
  },

  // ── EXPLORING ──────────────────────────────────────────────────────────

  "Challenge": {
    "Not yet": {
      diagnostic: "Questioning how things are done isn't a default — the way it's done tends to go unchallenged.",
      nextMove: "Start by asking \u201Cwhy this way?\u201D on one task this week.",
    },
    "Learning": {
      diagnostic: "Constructive pushback shows up — though more often after a problem than before one.",
      nextMove: "An easy win is naming one thing that could be better while it's still small.",
    },
    "Growing": {
      diagnostic: "You're already challenging process and giving feedback — though it tends to come and go.",
      nextMove: "From here, try doing it on a calm day, when the issue is still small.",
    },
    "Nailing it": {
      diagnostic: "You challenge, push back and build on ideas as one continuous move.",
      nextMove: "From here, the next layer is making space for others to challenge too.",
    },
  },

  "Connect": {
    "Not yet": {
      diagnostic: "Owning the wider outcome doesn't yet click — your bit gets done, but the whole picture sits with someone else.",
      nextMove: "Start by asking what \u201Cdone\u201D looks like for the whole project.",
    },
    "Learning": {
      diagnostic: "Anticipating needs is in the rotation — though it tends to come after the friction, not before.",
      nextMove: "Try asking \u201Cwhat'll make this hard?\u201D before you start.",
    },
    "Growing": {
      diagnostic: "You're already owning outcomes and reducing friction — though sometimes after it's already cost a beat.",
      nextMove: "Next step is a quick risk-spot at the start of the next project.",
    },
    "Nailing it": {
      diagnostic: "Outcomes, opinions and friction all get handled as one motion.",
      nextMove: "Bonus points for thinking about how to teach this anticipation to someone else.",
    },
  },

  "Navigate": {
    "Not yet": {
      diagnostic: "Sharing capacity and priorities isn't yet routine — they tend to stay private.",
      nextMove: "Start by sharing your top three priorities each week.",
    },
    "Learning": {
      diagnostic: "Flagging issues early isn't yet the default — adaptations tend to come after the shift, not before.",
      nextMove: "An easy win is naming one risk before you commit to a deadline.",
    },
    "Growing": {
      diagnostic: "You're already flagging capacity and flexing when needed — though sometimes the heads-up comes a beat too late.",
      nextMove: "Maybe try sharing one early signal each week.",
    },
    "Nailing it": {
      diagnostic: "Capacity, stakeholders and risks are all in one rolling read.",
      nextMove: "From here, the lift is making this read visible to others.",
    },
  },

  "Simplify": {
    "Not yet": {
      diagnostic: "Spotting what matters most isn't a habit — everything tends to feel equally important.",
      nextMove: "Start by asking \u201Cif I cut half of this, what stays?\u201D",
    },
    "Learning": {
      diagnostic: "Recognising constraints kicks in mid-job — not yet at the start.",
      nextMove: "An easy win is naming the top constraint up front, before you start.",
    },
    "Growing": {
      diagnostic: "You're already cutting noise and managing constraints — when you take the time to step back.",
      nextMove: "From here, try a five-minute scope check before each new project.",
    },
    "Nailing it": {
      diagnostic: "Noise, constraints and patterns all come into focus on first read.",
      nextMove: "Bonus points for teaching this clarity to someone newer.",
    },
  },

  // ── INFLUENCING ────────────────────────────────────────────────────────

  "Create": {
    "Not yet": {
      diagnostic: "Spotting strong ideas isn't yet a strength — the ones with potential don't yet stand out.",
      nextMove: "Start by picking one idea and asking \u201Cwhat makes this worth pursuing?\u201D",
    },
    "Learning": {
      diagnostic: "Picking battles comes up — though usually reactively, not strategically.",
      nextMove: "An easy win is naming the one you'd fight hardest for, up front.",
    },
    "Growing": {
      diagnostic: "You're already spotting winners and picking battles — though the fight tends to come a beat after the threat.",
      nextMove: "Maybe try staking your flag earlier, before pressure builds.",
    },
    "Nailing it": {
      diagnostic: "You spot, defend and sell ideas as one fluid motion.",
      nextMove: "From here, the next layer is coaching this instinct in someone newer.",
    },
  },

  "Unlock": {
    "Not yet": {
      diagnostic: "Adapting your approach to build trust isn't a default — trust tends to come from delivery alone.",
      nextMove: "Start by asking one teammate what working with you is like.",
    },
    "Learning": {
      diagnostic: "Resolving friction kicks in — though usually once it's slowed things, not ahead of it.",
      nextMove: "An easy win is one \u201Chow can I help here?\u201D check on your next project.",
    },
    "Growing": {
      diagnostic: "You're already building trust and smoothing friction — when you spot it.",
      nextMove: "Next step is walking the project from someone else's chair before you start.",
    },
    "Nailing it": {
      diagnostic: "Trust, friction and blockers all get handled as one continuous read.",
      nextMove: "Bonus points for thinking about how to scale this care across more teams.",
    },
  },

  "Persuade": {
    "Not yet": {
      diagnostic: "Building relationships outside the work isn't yet a habit — interactions tend to stay inside the day-to-day.",
      nextMove: "Start by booking one coffee with someone outside your immediate project.",
    },
    "Learning": {
      diagnostic: "Adapting your communication style happens — though it tends to follow the moment, not lead it.",
      nextMove: "Try a quick \u201Cwho's in this meeting?\u201D check before you walk in.",
    },
    "Growing": {
      diagnostic: "You're already building relationships and reading rooms — when the stakes are high enough to remember.",
      nextMove: "Maybe try treating low-stakes meetings the same way.",
    },
    "Nailing it": {
      diagnostic: "Framing, relationships and room-reading all run together as one motion.",
      nextMove: "Bonus points for passing this read on to someone less practised.",
    },
  },

  "Solve": {
    "Not yet": {
      diagnostic: "Pinpointing the specific issue inside a wider problem is still new ground — challenges tend to land as one big thing.",
      nextMove: "Start by naming the blocker on your next stuck task.",
    },
    "Learning": {
      diagnostic: "Root-cause thinking shows up — though it tends to follow the symptom rather than precede it.",
      nextMove: "An easy win is asking \u201Cwhy is this happening?\u201D twice in a row.",
    },
    "Growing": {
      diagnostic: "You're already pinpointing problems and digging into causes — when there's space to think.",
      nextMove: "From here, try blocking ten minutes for diagnosis before reaching for the fix.",
    },
    "Nailing it": {
      diagnostic: "Pinpoint, root-cause and alternative all show up in one move.",
      nextMove: "From here, the next layer is slowing others down enough to do the same.",
    },
  },

  // ── LEADING ────────────────────────────────────────────────────────────

  "Cultivate": {
    "Not yet": {
      diagnostic: "Fostering curiosity isn't yet a habit — output tends to crowd it out when there's work to ship.",
      nextMove: "Start by asking one curious person what they're chasing.",
    },
    "Learning": {
      diagnostic: "Protecting early ideas comes up — though usually when they arrive in front of you, not while they're still forming.",
      nextMove: "Try asking \u201Cwhat's puzzling you?\u201D in your next 1:1.",
    },
    "Growing": {
      diagnostic: "You're already championing curious people and protecting early ideas — when they cross your path.",
      nextMove: "Maybe try going looking for them, not waiting.",
    },
    "Nailing it": {
      diagnostic: "Curiosity gets championed, sparks get protected, and exploration gets trusted.",
      nextMove: "Bonus points for thinking about how this curiosity culture spreads beyond your team.",
    },
  },

  "Inspire": {
    "Not yet": {
      diagnostic: "Building the team for different strengths isn't a default — focus falls on the work, not on who's growing.",
      nextMove: "Start by asking one person what they want to be better at this month.",
    },
    "Learning": {
      diagnostic: "Coaching shows up — though usually when something needs correcting, not as a default rhythm.",
      nextMove: "An easy win is a coaching moment in every 1:1.",
    },
    "Growing": {
      diagnostic: "You're already shaping the team and lifting people — when you make time for it.",
      nextMove: "Maybe try naming the stretch you're asking each person to take on.",
    },
    "Nailing it": {
      diagnostic: "Teams form around you, people lift, the energy follows you in.",
      nextMove: "Bonus points for thinking about how this lift travels beyond your immediate team.",
    },
  },

  "Guide": {
    "Not yet": {
      diagnostic: "Setting clear goals isn't yet routine — direction tends to live in your head more than on the page.",
      nextMove: "Start by writing \u201Chere's what good looks like\u201D for your next project.",
    },
    "Learning": {
      diagnostic: "Assessing progress and course-correcting kicks in — though usually when things drift, not as a default rhythm.",
      nextMove: "Try a one-minute \u201Chere's what good looks like\u201D at the start of every project.",
    },
    "Growing": {
      diagnostic: "You're already setting direction and calling progress — when the moment forces it.",
      nextMove: "Next step is doing it before the project, not just during.",
    },
    "Nailing it": {
      diagnostic: "Direction, progress and freedom all live in one consistent move.",
      nextMove: "Bonus points for thinking about how to coach other leaders to lead the same way.",
    },
  },

  "Innovate": {
    "Not yet": {
      diagnostic: "Staying up to speed on industry innovations isn't yet a habit — what's new tends to land as background noise rather than signal.",
      nextMove: "Start by following one trade source weekly.",
    },
    "Learning": {
      diagnostic: "Recognising new ideas comes up — though usually when called on, not as a constant scan.",
      nextMove: "An easy win is taking one initiative this month and shipping it.",
    },
    "Growing": {
      diagnostic: "You're already watching the horizon and spotting what's next — though shipping still takes a nudge.",
      nextMove: "Maybe try a quarterly \u201Cpick one and try\u201D check.",
    },
    "Nailing it": {
      diagnostic: "You scan, spot and ship innovations as one continuous loop.",
      nextMove: "From here, the lift is making this rhythm a team capability, not just yours.",
    },
  },
};
