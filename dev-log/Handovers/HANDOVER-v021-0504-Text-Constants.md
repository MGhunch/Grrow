# HANDOVER v021 — 05 Apr 2026 — Text Constants

## Project
Grrow — structured professional development platform with circle-based skill mapping.

## Session Focus
Design system refactor: created TEXT tokens in constants.ts and systematically updated all 19 components (136 instances) to use centralised typography tokens instead of inline fontSize/fontWeight declarations.

## Files Changed

### New/Updated in constants.ts
- Added `TEXT` token system with display, eyebrow, heading, question, body, secondary, label, button, tooltip scales

### Quiz (5 files, 71 instances)
- LeaderCalibration.tsx — 30 instances
- QuizEntryAll.tsx — 14 instances
- QuizEntryCheckin.tsx — 14 instances
- QuestionScreen.tsx — 8 instances
- TransitionScreen.tsx — 5 instances

### Reports (4 files, 27 instances)
- SnapshotPage1.tsx — 14 instances
- SnapshotPage2.tsx — 8 instances
- shared.tsx — 3 instances (also re-exports TEXT)
- Snapshot.tsx — 2 instances

### Shared/Nav (5 files, 11 instances)
- Label.tsx — 1 instance
- Nav.tsx — 2 instances
- Footer.tsx — 4 instances
- SubpageHeader.tsx — 2 instances
- GrrowCircle.tsx — 2 instances

### Homepage (3 files, 14 instances)
- SkillsSection.tsx — 6 instances
- ProcessSection.tsx — 5 instances
- QuizTrialSection.tsx — 3 instances

### Modals (2 files, 13 instances)
- ReferencesModal.tsx — 8 instances
- SkillsModal.tsx — 5 instances

## Decisions Made

### Weight Ladder (locked)
| Weight | Role |
|--------|------|
| 300 | Body copy (light, airy) |
| 400 | Secondary text, tooltips, descriptions |
| 600 | Labels, headings, buttons, UI chrome |
| 900 | display.hero only (report cover) |

- **No 500, no 700** — weight 500 eliminated everywhere
- **Button size locked at 15px** universally
- **Eyebrow weight locked at 600** — uppercase + letter-spacing carries the weight

### TEXT Token Structure
```typescript
TEXT.display: hero (56/900), lg (48/600), md (32/600), sm (28/600)
TEXT.eyebrow: 11/600 + uppercase + 0.1em spacing
TEXT.heading: xl (26), lg (22), md (18), sm (15) — all 600
TEXT.question: 16/600
TEXT.body: base (14/300), sm (13/300)
TEXT.secondary: base (14/400), sm (13/400)
TEXT.label: base (13/600), sm (11/600), xs (10/600)
TEXT.button: 15/600
TEXT.tooltip: 12/400
```

### Intentional Inline Overrides
- Modal headlines at 20px (between heading.md 18 and heading.lg 22)
- Report step titles at 20px, taglines at 24px — print-scale choices
- QuizTrialSection headline at 24px (slightly smaller than heading.xl 26)

## Still Broken / Known Issues
- Files delivered to /mnt/user-data/outputs/ — need to be copied into repo
- No visual regression testing done yet
- shared.tsx now re-exports TEXT — components importing from shared.tsx get it automatically

## Next Session
- [ ] Copy all 19 updated files into repo
- [ ] Run dev server and visually check all screens
- [ ] Verify no TypeScript errors from TEXT imports
- [ ] Check print styles on Snapshot report

## Context for Next Time
All files are in /mnt/user-data/outputs/. The constants.ts with TEXT tokens was delivered in a previous batch — make sure that's in place first before updating components, or imports will fail.

File locations in repo:
- constants.ts → src/lib/constants.ts
- Quiz files → src/components/quiz/
- Report files → src/components/reports/
- Shared files → src/components/shared/ (Label, CloseButton) and src/components/ (Nav, Footer, GrrowCircle)
- Homepage files → src/components/ (SkillsSection, ProcessSection, QuizTrialSection)
- Modal files → src/components/ (ReferencesModal, SkillsModal)
- SubpageHeader → src/components/subpages/
