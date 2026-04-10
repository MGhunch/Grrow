# HANDOVER v010 — 29 Mar 2026 — Homepage Hero Polish

## Project
Grrow (grrow.co.nz) — structured professional development tool mapping skills across four strengths and four career stages.

## Session Focus
Homepage hero refinement — copy, layout, nav, and button polish. Mostly design decisions and small targeted edits across page.tsx, Nav.tsx, and SkillsSection.tsx.

## Work Log

## 29 Mar 11:00 — Chat
Catch: Subline locked as "Your story. Your strengths. Your move." — personal first framing wins over map/picture/gaps alternatives.

## 29 Mar — Code
page.tsx — updated (paddingTop 80→135 to align subline with circle centre)
page.tsx — updated (subline: "See where you're at. Work out what's next." → "Your strengths. Your focus. Your move.")
page.tsx — updated (removed arrow from "Try the quiz" button — hero and CTA band)
Nav.tsx — updated (added teal Sign in pill button, desktop + mobile)
Nav.tsx — updated (hamburger trimmed to How it works + The science only — Home and Log in removed)
Nav.tsx — updated (removed Home-specific bold styling from hamburger links)
page.tsx — updated (subline: gaps → focus)
SkillsSection.tsx — updated (Skills label and h2 centred to match How It Works section)
page.tsx — updated (subline: "Your strengths. Your focus. Your move." → "Your story. Your strengths. Your move.")
page.tsx — updated (circle size 420→480, grid column 420px→480px, paddingTop 135→160)
page.tsx — updated (transparent border added to filled Get started button to equalise height with outline button)

## Files Changed
- `src/app/page.tsx` — hero copy, circle size, padding, button alignment fix
- `src/components/Nav.tsx` — Sign in pill added, hamburger simplified
- `src/components/SkillsSection.tsx` — section header centred

## Decisions Made
- **Subline locked: "Your story. Your strengths. Your move."** — personal first framing. Story implies the product is ongoing and uniquely yours. Strengths in the middle gives it a peak.
- **No arrow on "Try the quiz"** — outline button is light enough already, arrow adds nothing
- **Sign in in nav, not just hamburger** — persistent teal pill, desktop + mobile
- **Hamburger = How it works + The science only** — logo handles Home, Sign in pill handles login
- **Skills section header centred** — matches How It Works, consistent marketing page rhythm
- **Circle 480px** — bigger feels right at desktop widths
- **Button height equaliser** — transparent 2px border on filled button matches the 2px solid border on the outline button; keeps text baselines level

## Subline evolution (for the record)
1. "See where you're at. Work out what's next." — original, generic
2. "Your strengths. Your gaps. Your move." — punchy, but "gaps" has deficit energy
3. "Your strengths. Your focus. Your move." — better, connects to KFG language
4. "Your story. Your strengths. Your move." — **locked** — personal first, story has motion

## Still to Look At
- Hero copy block sitting lower than ideal — circle labels push outside the 480px boundary making rendered height taller than expected; paddingTop may need pulling back to ~100
- How It Works section — three steps feel small in the white space; copy could work harder
- "Leading a team?" callout — very quiet as a footer stripe; may need more presence or folding into How It Works as a fourth beat
- Mobile layout — parked deliberately; circle needs different treatment (stacked, full width)

## Next Session
- [ ] Revisit paddingTop on hero copy block — pull back if subline still sitting too low
- [ ] How It Works section refresh — bigger numbers, more padding, stronger copy
- [ ] Leader callout — decide: more presence or fold into How It Works
- [ ] Mobile layout pass — hero, nav, sections

## Context for Next Time
All three files (page.tsx, Nav.tsx, SkillsSection.tsx) have been updated this session. Latest versions are in outputs. The homepage is visually close — hero is the priority to nail before moving to lower sections. ProcessSection.tsx not touched this session.
