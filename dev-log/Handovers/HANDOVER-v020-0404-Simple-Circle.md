# HANDOVER v020 — 04 Apr 2026 — Simple Circle

## Project
Grrow — structured professional development platform with circle-based skill visualisation.

## Session Focus
Built reusable CircleSimple component and integrated it into three consumer components, replacing ~160 lines of inline SVG code.

## Files Changed
- `components/circle/CircleSimple.tsx` — **NEW** reusable circle component with shadow separation, multiple render modes
- `components/SkillsModal.tsx` — replaced inline SVG with CircleSimple, added quadrant index mapping
- `components/quiz/LeaderCalibration.tsx` — removed IntroCircle inline SVG (~50 lines), now uses CircleSimple with activeRing
- `components/quiz/TransitionScreen.tsx` — removed GrrowCircle inline SVG (~90 lines), now uses CircleSimple with scores + highlight
- `components/circle/SkillsetCard.tsx` — **DELETE** orphaned legacy file, not imported anywhere

## Decisions Made

### CircleSimple Design
- **Center:** Quadrants meet in the middle (no center dot)
- **Separation:** Drop shadow on each quadrant group (dx:0, dy:1.5, stdDeviation:2.5, opacity:0.2, color:#1A1525)
- **Dark mode:** Same hex values as light mode — dark background makes colours glow naturally
- **No divider lines:** Shadows provide visual separation

### CircleSimple Props
| Prop | Type | Usage |
|------|------|-------|
| `size` | number | Default 160 |
| `dark` | boolean | Theme (currently unused — colours same both modes) |
| `activeQuadrant` | 0-3 \| null | Full ramp on one quadrant, others 50% opacity |
| `activeRing` | 0-3 \| null | Hero colour on one ring, others notYet |
| `scores` | ScoreMap \| null | Score-based fills per segment |
| `highlight` | {si, ri} \| null | Stroke highlight on one segment |
| `onQuadrantClick` | (index) => void | Click handler |

### Fill Priority
1. `scores` — if provided, segments not in map default to notYet
2. `activeRing` — hero on that ring, notYet elsewhere
3. Default — all quadrants show full ramp

### Quadrant Geometry (200×200 viewBox)
| Index | Strength | Family | startDeg |
|-------|----------|--------|----------|
| 0 | Collaboration | teal | -180 (top-left) |
| 1 | Curiosity | purple | -90 (top-right) |
| 2 | Critical Thinking | purple | 0 (bottom-right) |
| 3 | Communication | teal | 90 (bottom-left) |

### Ring Radii
| ri | Circle | Inner | Outer |
|----|--------|-------|-------|
| 0 | Leading | 0 | 30 |
| 1 | Influencing | 30 | 52 |
| 2 | Exploring | 52 | 75 |
| 3 | Essentials | 75 | 100 |

### Stacking Order
Back to front: Critical Thinking → Communication → Curiosity → Collaboration

## Usage Patterns
```tsx
// SkillsModal — full ramps, opacity on inactive quadrants
<CircleSimple activeQuadrant={2} onQuadrantClick={go} />

// LeaderCalibration — one ring lit (hero color)
<CircleSimple activeRing={3} />

// TransitionScreen — score-based fills + stroke highlight
<CircleSimple scores={scoreMap} highlight={{si:2, ri:3}} />
```

## Still Broken / Known Issues
- `dark` prop not yet used (colours identical in both modes — may need adjustment)
- Staggered animation for TransitionScreen now controlled by scores map timing, not internal animation phases

## Next Session
- [ ] Delete orphaned `components/circle/SkillsetCard.tsx`
- [ ] Test all three integrations (SkillsModal, LeaderCalibration, TransitionScreen)
- [ ] Verify shadow rendering looks good across light/dark modes
- [ ] Consider if any other inline circles should use CircleSimple

## Context for Next Time
CircleSimple is in `components/circle/`. The three consumer files are updated and output. Drop all four files in, delete SkillsetCard.tsx, test the modals and quiz flow.
