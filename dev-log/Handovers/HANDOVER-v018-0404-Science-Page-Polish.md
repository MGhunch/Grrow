# HANDOVER v018 — 04 Apr 2026 — Science-Page-Polish

## Project
Grrow — structured professional development platform

## Session Focus
Wiring up quiz modals from homepage, design system pass on ReferencesModal, and bringing the Science page to life with expandable capability cards.

## Files Changed

- **app/page.tsx** — "Try the quiz" button now opens QuizEntryAll modal instead of linking to /quiz. Added useState, QuizEntryAll import, modal state and render.

- **components/ReferencesModal.tsx** — Full design system alignment:
  - Shared CloseButton (teal)
  - Correct icons: Network (Collaboration), Waves (Communication), Lightbulb (21st Century Skills)
  - Imported COLORS from lib/constants
  - Dark mode support via `dark` prop
  - Smaller text: labels 13px, notes 11px, icon 12px
  - External link icons coloured by section family (teal/purple)
  - Chevrons on links
  - Title 20px/600, subtitle 13px/300

- **app/the-science/page.tsx** — 21st Century Skills section upgraded:
  - Real icons (Sparkles, Network, Waves, GitBranch)
  - Taglines ("Make it better" etc.) with rotating chevron
  - Expandable "why it matters" content on click/tap
  - "See the science" links added (opens ReferencesModal)
  - Link margins tightened from 40px to 24px
  - Shadow lift on capability icons

## Decisions Made

- **Expandable over hover** for capability cards — works on mobile, no forgotten update needed
- **Keep 4-across layout** for capabilities — page was working, didn't need 2×2
- **Lightbulb icon** for 21st Century Skills section — generic enough
- **Title weight 600** for modal headlines (not 500) — matches subhead standard from DESIGN.md
- **24px margin** on "See the science" links — tighter, less floaty

## Still Broken / Known Issues

- Onboarding carousel showing quadrants filled solid — should show full rings with highlighted segment (screenshot shared, not addressed this session)

## Next Session

- [ ] Fix onboarding carousel ring display
- [ ] Mobile layout pass (parked — desktop first)
- [ ] Resolve CT-INN-10/11/12 near-duplicate questions
- [ ] Complete question review for Collaboration, Communication, Critical Thinking

## Context for Next Time

Science page is MVP-ready. ReferencesModal is design-system aligned. Homepage "Try the quiz" wired up. The onboarding carousel ring rendering issue was flagged at session end — that's the next visual fix if picking up UI work.
