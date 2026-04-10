# HANDOVER v019 — 04 Apr 2026 — Colour Chat

## Project
Grrow — structured professional development platform with circle-based skill visualisation.

## Session Focus
Colour system audit and decisions. Reviewed Stu's proposed 4-ramp palette, decided to keep the two-family system. Audited inline hex colours across codebase. Planned constants.ts restructure.

## Files Changed
No file changes — discussion/planning session.

## Decisions Made

### Stu's Ramps (Rejected)
- Proposed: 4 separate ramps (Plum, Lilac, Jade, Seafoam)
- Rejected because: loses "two families" strategic narrative (purple = robots/ideas, teal = people/relationships); Lilac as Curiosity "Nailing it" dilutes brand anchor; even progressions lose deliberate Learning→Growing step-change; Seafoam too close to Jade at small sizes

### Current System (Kept)
- **Purple family** (Curiosity + Critical Thinking — shared ramp): Nailing it `#4C3FA0`, Growing `#6558D4`, Learning `#B8B0F0`, Not yet `#D8D4F5`
- **Teal family** (Collaboration + Communication — shared ramp): Nailing it `#18B99A`, Growing `#3DCFB8`, Learning `#8DE8D8`, Not yet `#C8F0EA`

### Tighter Palette (Proposed, Pending)
Drop 3 marginal colours: Mid Purple (use Growing `#6558D4` for Grow cards), Light Copy `#3D3360`, Body Lift `#C4BCDF` dark mode. 24 → 20 colours.

### Proposed Constants Structure
```
COLORS.purple.circle   → 4 stops (same in both modes)
COLORS.purple.bg       → light: 2 stops, dark: 2 stops
COLORS.purple.accent   → light: 3 stops, dark: 3 stops
COLORS.teal            → same structure
COLORS.ui              → light: 4 stops, dark: 4 stops
```

### Inline Colour Audit Results
- 181 inline hex colours across 34 files
- Worst offenders: the-science/page.tsx (23), LeaderCalibration.tsx (16), reports/shared.tsx (15)
- 80% chaos (multiple near-identical pale purples/teals doing same job), 20% signal
- Missing from constants: `#9B90BE` label purple, `#3C3489` dark purple text, `#EAE6F8` pale lilac border, various bg/accent shades

### GrrowCircle3D Gradient Stops
- `#F0FDFB` (teal "Not yet" outer edge) — add as `teal.bg.lightest`
- `#F5F3FF` (purple "Not yet" outer edge) — add as `purple.bg.lightest`

## Still Broken / Known Issues
- 181 inline hex colours need cleanup
- constants.ts structure not yet updated
- DESIGN.md not yet updated with new structure

## Next Session
- [ ] Lock tighter palette (drop Mid Purple, Light Copy, Body Lift)
- [ ] Add missing bg/accent/label colours to constants.ts
- [ ] Full inline colour cleanup across 34 files
- [ ] Update DESIGN.md with new constants structure

## Context for Next Time
Start with constants.ts — restructure to new COLORS shape, then grep/replace inline colours file by file. Worst offenders first: the-science/page.tsx, LeaderCalibration.tsx, reports/shared.tsx.
