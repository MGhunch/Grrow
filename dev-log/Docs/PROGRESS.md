# PROGRESS.md

*Last updated: 6 April 2026*

---

## Milestones

| Phase | Name | Status |
|-------|------|--------|
| 0 | UI & Design | ◐ In progress |
| 1 | Go Live Migration | ○ Not started |
| 2 | Supabase Foundation | ○ Not started |
| 3 | Auth & Infrastructure | ○ Not started |
| 4 | Snapshot — Wiring | ○ Not started |
| 5 | Snapshot — Leader + KFG | ○ Not started |
| 6 | Reports — Wiring | ○ Not started |
| 7 | Check-in Flow | ○ Not started |
| 8 | History & Polish | ○ Not started |

---

## Phase 0 — UI & Design

| Page | Content | Design | Redesign | Polish |
|------|---------|--------|----------|--------|
| Home page | ✓ | ✓ | ✓ | ✓ |
| Dashboard — Learner | ✓ | ✓ | | |
| Dashboard — Leader | ✓ | ✓ | | |
| Science page | ✓ | ✓ | | |
| How to page | ✓ | ✓ | | |
| Quiz — Entry modal | ✓ | ✓ | ◐ | ◐ |
| Quiz — Question screen | ✓ | ✓ | ◐ | ◐ |
| Quiz — Transition screen | ✓ | ✓ | ◐ | ◐ |
| Quiz — Calibration | ✓ | ✓ | ◐ | ◐ |
| Snapshot — Page 1 | ✓ | ✓ | | |
| Snapshot — Page 2 | ✓ | ✓ | | |

## Phase 1 — Go Live Migration

- [ ] Deploy to Railway
- [ ] Domain setup (grrow.co.nz)
- [ ] Environment config

## Phase 2 — Supabase Foundation

- [ ] All 6 tables including org layer
- [ ] Question seeding
- [ ] Row Level Security
- [ ] Airtable retired

## Phase 3 — Auth & Infrastructure

- [ ] Login / signup
- [ ] Nav and user menu
- [ ] Dashboard shell
- [ ] Shared component library

## Phase 4 — Snapshot — Wiring

- [ ] Circle selection
- [ ] Full quiz with persistence
- [ ] Resume handling

## Phase 5 — Snapshot — Leader + KFG

- [ ] Leader overlay assessment
- [ ] Score comparison
- [ ] Keep/Focus/Grow picker

## Phase 6 — Reports — Wiring

- [ ] Printable Snapshot report with comparison
- [ ] KFG summary

## Phase 7 — Check-in Flow

- [ ] 3-skillset cross-circle re-assessment
- [ ] Leader overlay
- [ ] Progress report vs baseline

## Phase 8 — History & Polish

- [ ] All past rounds view
- [ ] Settings
- [ ] Error states
- [ ] Mobile refinement

---

## Current Focus

- [ ] Complete questions review (Collaboration, Communication, Critical Thinking)
- [ ] Resolve CT-INN-10/11/12 near-duplicate questions
- [ ] Snapshot Page 2 — skillset cards with variance indicators
- [ ] Codebase cleanup pass (dead files, console.logs, .gitignore)

---

## Known Issues

- CT-INN-10/11/12 (Leading Critical Thinking) have near-duplicate questions
- Codebase rated 7/10 — cleanup needed before launch
- 14 `.DS_Store` files need .gitignore rule
- Hardcoded placeholder name in dashboard
- 4 TODO comments scattered in codebase
- "Ring" → "Circle" language pass still pending
- TypeScript type rename pending: `CircleName` → `Circle`, `Ring` → `CircleLayer`

---

## Parked

- Bounce It AI reflection (needs authored content per skillset first)
- Mobile layout pass (desktop must be locked first)
- `getQuestionsForCircles()` two-circle quiz — decision needed: live or dead code

---

## Completed (recent)

- [x] Typography refactor — TEXT tokens, 136 instances, 19 files
- [x] Quiz flow — single modal, TransitionScreen, animated progress circle
- [x] Leader calibration — family colour zones, auto-open notes on diff
- [x] All 12 Curiosity questions rewritten and locked
- [x] 48 question titles added to questions.ts
- [x] Snapshot report split into Page 1 / Page 2 architecture
- [x] Variance indicator system locked (solid dot = learner, ring = leader)
