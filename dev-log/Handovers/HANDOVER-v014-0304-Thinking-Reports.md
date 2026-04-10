# HANDOVER v014 — 03 Apr 2026 — Thinking Reports

## Project
Grrow — a structured professional development platform mapping skills across four strengths and four career stages.

## Session Focus
Designed the post-quiz report flow: what leaders see when moderating, what both parties receive as the conversation piece for their 1:1.

---

## Key Decisions

### Report Flow
```
Learner completes quiz
        ↓
Leader gets notification
        ↓
Leader opens moderation screen
  → Sees learner's scores (circle + skillset breakdown)
  → Can drill into any skillset to see the 3 question titles
  → Adds notes where useful (per skillset, not per question)
  → Hits "Done"
        ↓
PDF generated — same artifact for both
        ↓
Emailed to learner + leader
Stored in DB (linked to round)
Printable for the 1:1
```

### Leader Moderation — Not Blind
Leader sees learner's scores *before* adding their view. The sell is "no admin" — doing 8 blind assessments for different people is a ball ache. Leader's job is to spot variance, add notes, and prepare for the conversation.

### Variance Tiers
The viz does the work. Eye goes to interesting stuff first.

| Tier | Border | Indicator | Meaning |
|------|--------|-----------|---------|
| Consistent | Grey | None | All 3 questions within 1 step |
| Mixed | Yellow | Small dot | 2-step gap (e.g. Sometimes + Intuitively) |
| Split | Amber | Large dot | 3-step gap (Not really + Intuitively) |

### Notes
- Per skillset (not per question, not per round)
- Shared with learner (not private)
- Appear in the PDF report

### Report Structure — 2 Pages

**Page 1 — Overview**
- Purple header with logo
- Name, circle, date
- Big circle with segments filled
- Keep / Focus / Grow cards
- Variance callout pointing to page 2

**Page 2 — Detail**
- Compact header
- Four skillset cards (2×2 grid)
  - Skillset name + state pill
  - Three question titles with mini bars + score labels
  - KFG badges where applicable
  - Variance flags carry through
  - Leader notes (yellow background)
- Grow target card (from next ring, not yet assessed)
- Blank conversation notes section (lined paper effect)

---

## Question Titles — All 48 Locked

Added `title` field to Question interface. Short handle (2-4 words) for each question. Used in moderation screen and report.

### ESSENTIALS
| ID | Skillset | Title |
|----|----------|-------|
| CR-QUE-13 | Question | Tune into people |
| CR-QUE-14 | Question | Steal like a pirate |
| CR-QUE-15 | Question | Ask why before how |
| CL-ENG-25 | Engage | Own your time |
| CL-ENG-26 | Engage | Bounce ideas |
| CL-ENG-27 | Engage | Seek feedback |
| CO-CON-37 | Update | Close the loop |
| CO-CON-38 | Update | Keep it simple |
| CO-CON-39 | Update | Raise good flags |
| CT-CLA-01 | Clarify | Clarify the ask |
| CT-CLA-02 | Clarify | Spot the blockers |
| CT-CLA-03 | Clarify | Play it back |

### EXPLORING
| ID | Skillset | Title |
|----|----------|-------|
| CR-IMP-16 | Challenge | Challenge the process |
| CR-IMP-17 | Challenge | Give good feedback |
| CR-IMP-18 | Challenge | Build on ideas |
| CL-OPO-28 | Connect | Own the outcome |
| CL-OPO-29 | Connect | Navigate the room |
| CL-OPO-30 | Connect | Clear the path |
| CO-MUM-40 | Navigate | Flag your capacity |
| CO-MUM-41 | Navigate | Manage up |
| CO-MUM-42 | Navigate | Adapt and flex |
| CT-SIM-04 | Simplify | Sort news from noise |
| CT-SIM-05 | Simplify | Manage constraints |
| CT-SIM-06 | Simplify | Spot patterns |

### INFLUENCING
| ID | Skillset | Title |
|----|----------|-------|
| CR-GVG-19 | Create | Spot the winners |
| CR-GVG-20 | Create | Pick your battles |
| CR-GVG-21 | Create | Sell it in |
| CL-EMP-31 | Unlock | Smooth the friction |
| CL-EMP-32 | Unlock | Build trust |
| CL-EMP-33 | Unlock | Fix the blockers |
| CO-INF-43 | Persuade | Frame the sell |
| CO-INF-44 | Persuade | Build relationships |
| CO-INF-45 | Persuade | Read the room |
| CT-SOL-07 | Solve | Pinpoint the problem |
| CT-SOL-08 | Solve | Find the root cause |
| CT-SOL-09 | Solve | Find a better way |

### LEADING
| ID | Skillset | Title |
|----|----------|-------|
| CR-INN-22 | Cultivate | Champion the curious |
| CR-INN-23 | Cultivate | Protect the spark |
| CR-INN-24 | Cultivate | Trust the process |
| CL-INS-34 | Inspire | Build strong teams |
| CL-INS-35 | Inspire | Coach on the go |
| CL-INS-36 | Inspire | Bring the energy |
| CO-GUI-46 | Guide | Set direction |
| CO-GUI-47 | Guide | Call it fairly |
| CO-GUI-48 | Guide | Direct, don't control |
| CT-INN-10 | Innovate | Watch the horizon |
| CT-INN-11 | Innovate | Spot what's next |
| CT-INN-12 | Innovate | Make it real |

---

## Question Text Changes

### CR-INN-23 (Cultivate / Curiosity)
- **Was:** "Can you recognise potential in different ideas that drive commercial value?"
- **Now:** "Do you protect early ideas to give them time to reach their potential?"
- **Why:** Old version overlapped with Critical Thinking (commercial value). New version is distinctly about fostering creativity at a leadership level.

### CL-INS-34 (Inspire / Collaboration)
- **Was:** "Do you clearly communicate goals and objectives to give people direction?"
- **Now:** "Do you build high performing teams with different strengths and perspectives?"
- **Why:** Old version duplicated CO-GUI-46 (Guide). New version is about team composition — a collaboration behaviour.

---

## Files Changed
- `questions.ts` — added `title` field to interface, all 48 titles, fixed CR-INN-23 and CL-INS-34 question text

---

## Still To Build

### Moderation Screen
- Circle as anchor
- Four skillset cards with variance indicators
- Drill-down shows question titles (not full questions)
- Notes field per skillset
- Single "Done" button

### Report PDF
- Page 1: overview (meta, circle, KFG, variance callout)
- Page 2: detail (skillset cards with notes, grow target, conversation notes section)
- Generated on "Done"
- Emailed to both parties
- Stored in DB

---

## Design Principles (Reinforced)

- **The viz does the work** — variance is visible at a glance, questions are the receipts
- **Titles are the signal** — short handles (2-4 words) tell the story, full question text is a drill-down
- **Clarity over cleverness** — "Challenge the process" echoes the skillset name, but that's fine because people are on their own with the report

---

## Context for Next Time

This session was about *thinking through* the report, not building it. The scamps exist as SVG mockups in the chat. Next step is workshopping the layout together, then building the actual components.

Key files to touch:
- New: `ReportPage1.tsx`, `ReportPage2.tsx` (or combined `BigReviewReport.tsx`)
- New: `LeaderModerationScreen.tsx`
- Update: `questions.ts` is ready — just needs to be dropped into `src/lib/`
