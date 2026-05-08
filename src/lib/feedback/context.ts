// ═══════════════════════════════════════════════════════════════════════════
// Grrow Feedback — Context (the openers)
// ═══════════════════════════════════════════════════════════════════════════
//
// Rotation pools per score state. Cards on the results screen sample from
// these without replacement, so two cards at the same state never share an
// opener. Each pool has at least 4 unique variants — enough that even when
// all four cards land on the same state, every card gets a different opener.
//
// Substitution tokens used in some lines:
//   <Skillset>     — current skillset name, e.g. "Cultivate"
//   <Skillset up>  — same strength, one circle higher (filtered at Leading)
//
// Substitutions are applied in compose.ts at render time.
// ═══════════════════════════════════════════════════════════════════════════

import type { ScoreState } from "../types";

export const ROTATION_POOL: Record<ScoreState, string[]> = {
  "Not yet": [
    "Not yet means new territory for you.",
    "So this is a bit brand new for you.",
    "Something new. Let's get into it.",
    "Being new to stuff is the best place to start.",
    "Looks like you haven't met <Skillset> yet.",
  ],
  "Learning": [
    "You know how to do this, but still need a nudge on when.",
    "You've got the idea. All you need is practice.",
    "You're on it already. You just need more of it.",
    "You're picking up the tune. Now it's time to dance.",
    "It clicks when it clicks. Just keep on clicking.",
  ],
  "Growing": [
    "You've got this, no worries. How do we make it habit?",
    "You nail it when you think of it. Challenge is making it intuitive.",
    "Doing this is easy. Doing it without thinking\u2026 that's next.",
    "People trust you, now trust your gut.",
    "You've got the rhythm. Now go with it.",
  ],
  "Nailing it": [
    "You and <Skillset> are old friends.",
    "You're nailing this. Have you looked at <Skillset up>?",
    "Now's the time to nudge it a level.",
    "Nailing it is awesome. How do you share it?",
    "It's second nature for you. What about the team?",
    "You make this look easy. Can you teach it?",
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// Parked content
//
// These lines previously fired when all four cards landed on the same
// state. The all-same special case has been dropped in favour of larger
// rotation pools that always have enough variants for unique sampling.
// Keeping the lines here in case they earn a future home — e.g. as a
// summary banner above the cards when a four-of-a-kind pattern shows up.
//
// Not yet (Essentials): "Looks like everything is new, exciting times. Upwards and upwards from here."
// Not yet (other):      "It's all a bit new in <Circle>. Why not take a look at <Circle down>?"
// Learning:             "Lots of learning. Stacks of potential. This is when you grow the most."
// Growing:              "Look at you, you safe pair of hands. Let's talk next level."
// Nailing it (Leading): "Nailing it across the board. How do you share your smarts?"
// Nailing it (other):   "Nailing it everywhere. Time to step up to <Circle up>."
// ─────────────────────────────────────────────────────────────────────────
