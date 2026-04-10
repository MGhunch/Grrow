# HANDOVER v021 — 04 Apr 2026 — Colours Cleanup #2

## Project
Grrow — structured professional development platform with circle-based skill visualisation.

## Session Focus
Completed the inline hex cleanup across all components. Established `constants.ts` as single source of truth for all colours. Added `familyAlpha()` pattern for derived washes, borders, and shadows.

## Files Changed

### constants.ts
- Added `COLORS.ui.black` for dark mode shadows

### Quiz (3 files)
- `quiz/QuizEntryAll.tsx` — 10 hex → 0. Washes via familyAlpha(), overlays via constants
- `quiz/QuizEntryCheckin.tsx` — 9 hex → 0. Card backgrounds via familyAlpha()
- `quiz/TransitionScreen.tsx` — 4 hex → 0. Muted eyebrow text via familyAlpha()

### Sections (2 files)
- `ProcessSection.tsx` — 12 hex → 0. Teal timeline using score ramp colours
- `SkillsSection.tsx` — 8 hex → 0. Refactored to getCardColors() function

### UI Components (5 files)
- `toolbar/DashboardToolbar.tsx` — 3 hex → 0. ICON_STRUCT → COLORS.ui.darkBodyCopy
- `shared/Card.tsx` — 3 hex → 0. Variant backgrounds via familyAlpha()
- `circle/GrrowCircle.tsx` — 3 hex → 0. Shadow colour uses COLORS.ui.black / purple.dark
- `Nav.tsx` — 3 hex → 0. All #FFFFFF → COLORS.ui.white
- `QuizTrialSection.tsx` — 2 hex → 0. whiteAlpha() for subline text

### Small Fixes (10 files)
- `toolbar/NotesModal.tsx` — ICON_STRUCT → COLORS.ui.darkBodyCopy
- `toolbar/CheckInModal.tsx` — #FFFFFF → COLORS.ui.white
- `subpages/SubpageHeader.tsx` — teal wash via familyAlpha()
- `shared/CloseButton.tsx` — default prop → COLORS.teal.hero
- `circle/CircleSimple.tsx` — floodColor → COLORS.ui.nearBlack
- `SkillsModal.tsx` — #FFFFFF → COLORS.ui.white
- `Shell.tsx` — #FAFAFA → COLORS.ui.lightHover
- `ReferencesModal.tsx` — #FFFFFF → COLORS.ui.white
- `Footer.tsx` — #FFFFFF → COLORS.ui.white
- `ExplainerSection.tsx` — #FFFFFF → COLORS.ui.white

## Decisions Made
- **familyAlpha() for all washes** — derived from hero colour at consistent opacity, not hand-picked hex per component
- **COLORS.ui.black added** — symmetry with white, single place to tweak dark mode shadows
- **Shell page bg** — #FAFAFA → lightHover (accepts subtle purple tint for brand consistency)
- **Amber/warning colours parked** — 4 values remain inline in reports/shared.tsx until warning palette is needed elsewhere

## Still Broken / Known Issues
- `reports/shared.tsx` has 4 amber/warning hex values — not part of purple/teal system, parked for now
- No amber palette in constants yet

## Next Session
- [ ] Decide on amber/warning palette when reports are actively worked on
- [ ] Test all cleaned components visually (esp. washes may be slightly different from hand-picked values)
- [ ] Continue with other Grrow work

## Context for Next Time
All outputs are in `/mnt/user-data/outputs/`. File structure mirrors repo:
- `constants.ts` → `lib/`
- `quiz/*.tsx` → `components/quiz/`
- `toolbar/*.tsx` → `components/toolbar/`
- `shared/*.tsx` → `components/shared/`
- `circle/*.tsx` → `components/circle/`
- `subpages/*.tsx` → `components/subpages/`
- Root .tsx files → `components/`

The colour system is now:
- `COLORS.purple.*` / `COLORS.teal.*` — score ramps + hero
- `COLORS.ui.*` — neutrals + light/dark mode tokens
- `familyAlpha(family, token, mode)` — derived washes/borders/shadows
- `whiteAlpha(opacity)` — white overlays

67 inline hex values cleaned. 4 amber values remain (parked).
