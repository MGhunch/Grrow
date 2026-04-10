# HANDOVER v009 — 28 Mar 2026 — Homepage Skills and Modal

## Project
Grrow — a structured professional development tool that maps skills across strengths and career stages.

## Session Focus
Built out the homepage content hierarchy, locked all copy, and built two new components: SkillsSection (four strength cards) and SkillsModal (interactive circle + skillset ladder). Also fixed pre-existing import errors in GrrowCircle and dashboard/page.tsx.

---

## Work Log

## 28 Mar — Chat
- Reviewed existing homepage screenshots — hero copy weak, "smart conversations" flagged as corporate jargon
- Locked homepage content hierarchy: Hero → Skills Section → How It Works → Leader callout → CTA band
- Decided: unified page, learner-first framing, one leader callout moment (not a full section)
- Hero headline locked: "Where to next?"
- Hero subhead direction: "See where you're at. Work out what's next."
- Section headline locked: "Build the skills people want to buy" (you as subject, not Grrow)
- Locked four world-view lines for strength cards:
  - Curiosity: "Creativity is just joining dots. The secret is digging up dots."
  - Collaboration: "Getting stuff done is easy. Playing nice with humans is the hard bit."
  - Critical Thinking: "In a world of infinite answers, the win is in asking better questions."
  - Communication: "We've never had more ways to communicate. Most of it's noise."
- Locked explore lines (for modal, not shown on cards):
  - Curiosity: "Explore how to question, challenge and chase ideas worth fighting for."
  - Collaboration: "Explore how to engage, connect and inspire people to make stuff happen."
  - Critical Thinking: "Explore how to clarify, simplify and find the right problems to solve."
  - Communication: "Explore how to update, navigate and guide with clarity and confidence."
- "Discover" → "Explore" throughout — less infomercial, more peer mentor
- Card structure decision: no taglines, icons alongside name, world-view copy, "Explore" CTA
- Modal structure: circle as nav, dot nav below, ladder with growing dots, objectives visible by default
- No panel layer — card triggers modal directly (two layers not three)
- Nav: Sign in visible in nav bar, hamburger for the rest
- CTA band copy: "Do the quiz. Get a free report. No sign up."
- How It Works copy rewritten: peer mentor tone, "smart conversations" removed
- "THE SKILLS" → "SKILLS" label
- Headline weight issue noted (rendering too heavy — Poppins 900 vs 600)

## 28 Mar — Code
- page.tsx (landing) — updated: new hero copy, SkillsSection imported, How It Works rewritten, leader callout added, CTA band updated
- SkillsSection.tsx — created: four horizontal strength cards, icons alongside names, world-view copy, Explore CTA triggers modal
- SkillsModal.tsx — created: overlay modal, interactive circle nav, dot nav, skillset ladder with growing dots and objectives
- GrrowCircle.tsx — fixed: STRENGTHS and RINGS moved from constants import to skillsets import
- dashboard/page.tsx — fixed: RING_STAGES, getObjective, getRingDisplayName, getStrengthByName moved from constants to skillsets import
- SkillsSection.tsx — updated: deeper card backgrounds, icon alongside name, SKILLS label, Explore arrow removed
- SkillsModal.tsx — updated: minHeight 440 on ladder area (prevents modal jumping between strengths), alignItems center (dead centre of viewport)

---

## Files Changed

- `src/app/page.tsx` — full homepage rewrite: new copy, SkillsSection added, How It Works rewritten
- `src/components/SkillsSection.tsx` — new component: four strength cards
- `src/components/SkillsModal.tsx` — new component: overlay modal with circle + ladder
- `src/components/circle/GrrowCircle.tsx` — import fix: STRENGTHS/RINGS from skillsets not constants
- `src/app/(app)/dashboard/page.tsx` — import fix: skillset helpers from skillsets not constants

---

## Decisions Made

- **Homepage structure locked:** Hero → SkillsSection → How It Works → Leader callout strip → CTA band
- **Unified page:** Learner-first, one leader callout line before CTA band. No split journey.
- **Cards show world-view copy only** — no explore lines on cards. Explore lines live in modal.
- **No panel layer** — card → modal directly. Two layers not three.
- **Icons alongside names** — not stacked. Tighter, more confident.
- **No taglines on cards** — world-view lines are stronger. Taglines redundant.
- **Modal centres in viewport** — `position: fixed`, `alignItems: center`. Always mid-screen regardless of scroll.
- **minHeight not fixed height** on ladder — prevents modal jump, allows growth for large text
- **"Explore" not "Explore →"** — arrow was ugly. Word alone does the job.
- **No chevron before Explore** — convention is after not before. Trust the word.
- **SKILLS not THE SKILLS** — cleaner, more direct
- **Sign in in nav bar** — visible always, not buried in hamburger

## Still Broken / Known Issues

- Headline fontWeight on "Build the skills people want to buy" rendering too heavy — likely Poppins 900, should be 600
- Teal cards slightly more visually prominent than purple cards — worth monitoring
- Leader callout links to `/leaders` which doesn't exist yet
- How It Works copy is placeholder-quality — needs another pass before launch
- `ExplainerSection.tsx` still confirmed dead code, not yet deleted

---

## Next Session

- [ ] Fix headline fontWeight on SkillsSection (600 not 900)
- [ ] Review How It Works copy — peer mentor pass
- [ ] Build `/leaders` page or decide where leader callout links
- [ ] Hero subhead — still open. "See where you're at. Work out what's next." is placeholder direction
- [ ] Wire hero CTAs properly (Get started → signup, Try the quiz → /quiz)
- [ ] Delete ExplainerSection.tsx (confirmed dead)
- [ ] Review full homepage on mobile
- [ ] Consider dark mode pass on SkillsSection cards

---

## Context for Next Time

Homepage is structurally complete and rendering in browser. SkillsSection and SkillsModal are both live and working — modal opens from card, circle nav works, ladder shows objectives, closes on backdrop click or Escape.

Main things still open: hero subhead copy not fully locked, How It Works needs a tone pass, leader callout destination doesn't exist. Start next session by looking at the full page in browser and doing a copy pass on How It Works.

Explore lines for each strength are locked and saved in this handover — not on the cards but worth keeping for the modal or /how-it-works page.
