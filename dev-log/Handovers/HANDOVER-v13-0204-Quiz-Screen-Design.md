# HANDOVER v003 — 02 Apr 2026 — Quiz Screen Design

## Project
Grrow — structured professional development platform. Quiz flow is the core product interaction.

## Session Focus
Full design pass on the quiz modal — entry screens, question screen, and a new transition/objective screen architecture. Lots of decisions locked. Ready to build TransitionScreen next session.

---

## Files Changed

- `QuizEntryAll.tsx` — ring titles → Deep Purple when unselected, subtitle removed, button constrained + centred, "Start your quiz", tooltip backgrounds → teal, ? buttons → teal, headline spacing, headline copy → "Where are you at?"
- `QuizEntryCheckin.tsx` — subtitle restored ("Here's what you're working on right now"), KFG pills → family colour (not KFG category colour), button constrained + centred, headline spacing, removed unused KFG_PILL_COLORS constant
- `QuestionScreen.tsx` — major restructure across multiple passes:
  - Skillset label 26px / weight 600
  - "Your goal:" label + objective full width below header
  - Question in pale family-colour box
  - Options free-standing below question box, no border-left
  - Tooltip helper text on all four options ("New territory for you." etc.)
  - Next → pill button, Back → outline pill (consistent pair)
  - Progress label "Exploring · 4 / 24" above progress bar
  - More air throughout (header, card padding, option padding, gap, footer)
  - Ring icon removed from question screen (was creating misaligned left-starts)

---

## Decisions Made

**Quiz modal — one modal, all phases**
Single modal, fixed width (~540px), fixed padding. Phase state switches content. Transition animation = fade + slight translateY on inner content, modal stays put.

**QuestionScreen layout (locked)**
- Header: skillset name only (no ring icon) — left-aligned, 26px/600
- "Your goal:" label + objective inline, full width
- Question text in pale family-colour box (purple or teal wash)
- Four option rows free-standing below, white cards
- Progress label above bar, bar above nav buttons
- Back (outline pill) ← → Next (filled pill), both family-colour

**ObjectiveScreen → replaced by TransitionScreen**
The separate ObjectiveScreen is scrapped. Its job is done better by the new TransitionScreen which shows between skillsets. BreathScreen also scrapped — result is shown on TransitionScreen instead (but without score, just the tick).

**TransitionScreen — design locked, not yet built**
- "Essentials" eyebrow (circle name, uppercase, muted)
- 2×2 checklist of 4 skillsets in circle order (purple pair / teal pair)
  - Done = ticked, family colour background, clickable to jump back
  - Current = open circle, live border, family colour
  - Not yet = open circle, muted, locked
  - Answers remembered when jumping back
- Big concentric rings centre (correct fill for current circle)
- Strength icon centred inside rings, white
- "First up" on skillset 1, "Next up" on skillsets 2–4
- Skillset name 32px/900, family accent colour
- One-liner objective, muted, 300 weight
- "3 quick questions" small caps below
- Let's go button, centred, family colour
- No progress bar (checklist IS the progress)
- Purple X for purple context, teal X for teal context (CloseButton needs family prop)

**TransitionScreen — end of circle variant (same component)**
All 4 ticked. "Next circle" replaces "Next up". Shows next circle name (e.g. Exploring) + teaser line ("Step up. Own your work."). Let's go takes user into next circle.

**Objective placement**
Objective lives on TransitionScreen only — not on every question. Question screen shows it via "Your goal:" inline below skillset name. This gives context without repeating it 3 times per skillset.

**Results philosophy**
Light touch on TransitionScreen — tick only, no score shown. The score reveal happens on the end screen where all results can be seen together. Individual scores mid-quiz inflate the importance of single data points.

**Colour system rules (locked)**
- Purple context → purple X, purple pills, purple accents
- Teal context → teal X, teal pills, teal accents
- KFG pills → family colour, NOT KFG category colour
- CloseButton needs `accentColor` prop to support family-aware X

**Quiz progress labelling**
"Essentials · 4 / 12" not "4 / 24" — circle-anchored, more human. The full 24 can be shown elsewhere if needed.

**Button system (locked)**
- No full-width buttons anywhere
- CTAs are centred pills
- Back = outline pill (accent colour border + text)
- Next/Let's go = filled pill (accent colour)
- No arrows on buttons ever

---

## Still To Do / Known Issues

- `CloseButton` needs `accentColor` prop — currently always teal, should be family-aware during quiz
- `ObjectiveScreen.tsx` — still uses Tailwind classes, needs converting to inline styles (or scrapping in favour of TransitionScreen)
- `BreathScreen.tsx` — scrapped in principle, needs removing from `QuizFlow` phase logic
- `QuizFlow.tsx` — needs new `transition` phase wired in, plus jump-back navigation from checklist
- Modal width not yet locked — currently 520px selecting / 580px quizzing, needs to be one fixed value
- Phase transition animation not yet built
- "First up" / "Next up" label logic not yet built (isFirst prop)
- End-of-circle variant of TransitionScreen not yet built

---

## Next Session — Build Order

- [ ] Build `TransitionScreen.tsx` — all states (mid-circle, end-of-circle)
- [ ] Wire into `QuizFlow.tsx` — replace `objective` + `breath` phases with `transition`
- [ ] Add jump-back navigation from checklist ticks
- [ ] Fix `CloseButton` — add `accentColor` prop, use in QuizEntryAll during quizzing phase
- [ ] Lock modal width to single value + add phase transition animation in QuizEntryAll
- [ ] Remove or convert `ObjectiveScreen.tsx`
- [ ] Test full flow: entry → transition → Q1/Q2/Q3 → transition → ... → end screen

## Context for Next Time

Start with `TransitionScreen.tsx` — it's the biggest missing piece and unlocks the full quiz flow. The mockup is locked (see artifact `transition_screen_v2`). Needs these props:

```ts
interface TransitionScreenProps {
  circle: Circle                    // "ESSENTIALS" etc
  skillsets: SkillsetMeta[]         // all 4 for this circle
  completedSkillsets: string[]      // skillset names done
  currentSkillset: string           // the one we're about to start
  isFirst: boolean                  // "First up" vs "Next up"
  isEndOfCircle: boolean            // show next circle variant
  nextCircle?: Circle               // if end of circle
  onStart: () => void
  onJumpTo: (skillset: string) => void
  onClose: () => void
}
```

QuizFlow currently has phases: `select_circle → objective → question → breath → complete`
New flow: `select_circle → transition → question → transition → question → ... → complete`
