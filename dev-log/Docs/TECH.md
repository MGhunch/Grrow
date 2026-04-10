# Grrow — Tech & Architecture

*Version 1 · April 2026*

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 App Router | Downgraded from 16 to avoid Turbopack memory crashes |
| Language | TypeScript | Type safety across components, API, and DB queries |
| Styling | Tailwind CSS | Utility-first, consistent with design token system |
| Database & Auth | Supabase | Postgres, built-in auth, Row Level Security |
| Client library | @supabase/ssr | Official replacement for deprecated auth-helpers |
| Deployment | Vercel | Native Next.js deployment, preview URLs per branch |
| PDF / Print | @media print + window.print() | No dependencies, works offline, good enough for MVP |

### Dev Note

Always start with `TURBOPACK=0 npm run dev`. This flag must be preserved in `package.json` — it is lost if the file is regenerated.

---

## 2. Architecture Decisions

| Decision | Choice | Why |
|---|---|---|
| Round unit | One circle × four strengths = 12 questions | The circle is the career stage |
| Check-in query | By skillset, not by circle | Grow often lives in the next circle up |
| Roles | In relationships, not on user record | One user can be leader in one team, learner in another |
| Organisation layer | Architected in Phase 1, features in v2 | Adds one table and four columns — retrofitting later is painful |
| Answer saving | Batch on completion | Avoids partial rounds in the database |
| Circle selector framing | "Where are you?" not "Pick a quiz" | Career stage identity, not difficulty selection |
| Quadrant naming | Curiosity not Creativity | Everyone believes they're curious |
| Circle 3 naming | Influencing not Shaping | More active — every skillset in that circle is about moving people and projects |
| Snapshot naming | [Circle] Snapshot not Big Review | Circle prefix carries the weight. Snapshot is the format, not a claim about depth |

### Check-in Crosses Circle Boundaries

KFG selections come from wherever scores land. Grow is aspirational — often points to the next circle up.

| Category | Example | Likely circle |
|---|---|---|
| Keep | Exploring / Collaboration / Connect | Current circle |
| Focus | Exploring / Critical Thinking / Simplify | Current circle |
| Grow | Influencing / Curiosity / Create | Next circle up |

---

## 3. Type Naming Conventions

| Type | Used for | Notes |
|---|---|---|
| `Circle` | The value type — `"ESSENTIALS" \| "EXPLORING" \| "INFLUENCING" \| "LEADING"` | Replaces `CircleName`. What you say out loud. |
| `CircleLayer` | SVG rendering spec — `name`, `innerR`, `outerR` | Replaces `Ring`. Technical structure, not a product concept. |
| `StrengthFamily` | `"purple" \| "teal"` | Colour family assignment |
| `ScoreState` | `"Not yet" \| "Learning" \| "Growing" \| "Nailing it"` | Calculated response state |
| `KfgCategory` | `"keep" \| "focus" \| "grow"` | KFG assignment |

**Pending code pass:** `CircleName` → `Circle`, `Ring` → `CircleLayer`, `RINGS` → `CIRCLE_LAYERS`, `RING_STAGES` → `CIRCLE_STAGES`, `getRingDisplayName()` → `getCircleDisplayName()`. The alias `Circle = CircleName` in `types-additions.ts` can be deleted once the rename is done.

---

## 4. Database Schema

Six tables. All created via a single SQL migration in Phase 1.

### organisations

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| name | TEXT | Organisation display name |
| slug | TEXT | URL-safe identifier |
| created_at | TIMESTAMPTZ | Auto-set |

### profiles

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | References auth.users(id) |
| email | TEXT | |
| full_name | TEXT | |
| org_id | UUID FK | FK to organisations(id). NULL = no org. |
| leader_id | UUID FK | FK to profiles(id). Role implied by this relationship. |
| created_at | TIMESTAMPTZ | Auto-set |

### questions

| Column | Type | Notes |
|---|---|---|
| id | TEXT PK | e.g. CT-CLA-01 |
| org_id | UUID FK | NULL = Grrow default. Set = org-specific. |
| circle | TEXT | ESSENTIALS / EXPLORING / INFLUENCING / LEADING |
| strength | TEXT | Curiosity / Collaboration / Communication / Critical Thinking |
| strength_order | INT | 1–4 within a circle |
| skillset | TEXT | e.g. Clarify |
| objective | TEXT | Skillset goal description |
| title | TEXT | 2-4 word question handle (e.g. "Steal like a pirate") |
| question_text | TEXT | |
| question_order | INT | 1–3 within a skillset |
| version | TEXT | Default v1.0 |
| active | BOOLEAN | Default TRUE |

### review_rounds

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| org_id | UUID FK | Inherited from the learner's profile |
| learner_id | UUID FK | |
| leader_id | UUID FK | Nullable |
| round_type | TEXT | `'snapshot'` or `'check_in'` |
| circle | TEXT | Set for snapshot. Informational for check_in. |
| status | TEXT | in_progress → learner_complete → leader_complete → finalized |
| created_at | TIMESTAMPTZ | |
| finalized_at | TIMESTAMPTZ | |

### answers

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| round_id | UUID FK | |
| question_id | TEXT FK | |
| respondent_id | UUID FK | |
| respondent_role | TEXT | `'learner'` or `'leader'` |
| score | INT | 0, 33, 66, or 100 |
| created_at | TIMESTAMPTZ | |

### kfg_selections

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| round_id | UUID FK | |
| skillset | TEXT | |
| circle | TEXT | May differ from round's primary circle for Grow selections |
| category | TEXT | `'keep'`, `'focus'`, or `'grow'` |

### Row Level Security

RLS policies are written and tested in Phase 1 — not bolted on at the end.

- organisations: read by members only
- questions: public read for default (org_id = null). Org members read their org's questions.
- profiles: users read their own row; leaders read their learners' profiles
- review_rounds: learners see their own rounds; leaders see their learners' rounds
- answers: visible only to participants of the round
- kfg_selections: visible only to participants of the round

### Organisation Layer — v1 Architecture, v2 Features

The Organisation entity is architected in from day one.

- `organisations` table and `org_id` columns exist from Phase 1
- Default Grrow questions have `org_id = null` — available to all
- Org-specific questions have an `org_id` — shown only to that org's users
- Fetch logic: give me questions for this org, fall back to Grrow defaults
- CMS interface to create custom questions is v2

---

## 5. File Structure

| File | Purpose |
|---|---|
| `app/page.tsx` | Landing page (redirect if authed) |
| `app/layout.tsx` | Supabase context |
| `app/globals.css` | Full design token system, print styles, animations |
| `app/(auth)/login/page.tsx` | Email/password login |
| `app/(auth)/signup/page.tsx` | Signup + optional leader link |
| `app/(app)/layout.tsx` | Shared nav, user menu, logout |
| `app/(app)/dashboard/page.tsx` | Role-based dashboard |
| `app/(app)/snapshot/[roundId]/page.tsx` | Learner quiz flow |
| `app/(app)/snapshot/[roundId]/leader/page.tsx` | Leader overlay assessment |
| `app/(app)/snapshot/[roundId]/kfg/page.tsx` | Keep/Focus/Grow selection |
| `app/(app)/snapshot/[roundId]/report/page.tsx` | Printable Snapshot report |
| `app/(app)/check-in/[roundId]/page.tsx` | Learner 9-question re-assessment |
| `app/(app)/check-in/[roundId]/leader/page.tsx` | Leader check-in overlay |
| `app/(app)/check-in/[roundId]/report/page.tsx` | Progress report vs baseline |
| `app/(app)/history/page.tsx` | All past rounds |
| `app/(app)/settings/page.tsx` | Profile, leader-learner linking |
| `app/quiz/` | Anonymous demo — ported as-is |
| `app/api/questions/route.ts` | Queries Supabase with org fallback |
| `app/api/auth/callback/route.ts` | Supabase auth callback |
| `lib/supabase/client.ts` | Browser Supabase client |
| `lib/supabase/server.ts` | Server Supabase client |
| `lib/types.ts` | All shared type definitions |
| `lib/types-additions.ts` | Aliases for quiz components (pending merge into types.ts) |
| `lib/skillsets.ts` | STRENGTHS, CIRCLE_LAYERS, CIRCLE_STAGES, helper functions |
| `lib/constants.ts` | UI tokens, colours, quiz options, score helpers only |
| `lib/scoring.ts` | Score calculation, response states, quiz input mapping |
| `lib/questions.ts` | All 48 questions, skillset helpers, query functions |
| `components/GrrowCircle.tsx` | The circle |
| `components/GrrowIcon.tsx` | Concentric circle icon with filled layers |
| `components/Progress.tsx` | Progress bar |
| `components/Breadcrumb.tsx` | Breadcrumb nav |
| `components/QuestionCard.tsx` | Question + four-bar radio cards + tooltips |
| `components/AssessmentFlow.tsx` | Quiz engine — Snapshot and Check-in |
| `components/QuizEntryAll.tsx` | Entry modal for Snapshot / circle selector |
| `components/QuizEntryCheckin.tsx` | Entry modal for Check-in / KFG skillsets |
| `components/shared/CloseButton.tsx` | Shared close button (teal — always use this) |
| `components/StrengthSummary.tsx` | Strength score display row |
| `components/ScoreComparison.tsx` | Learner vs leader side-by-side bars |
| `components/KfgPicker.tsx` | Keep/Focus/Grow assignment UI |
| `components/ReportLayout.tsx` | Print-optimised wrapper |
| `contexts/ThemeContext.tsx` | Dark mode provider — `useTheme()` |
| `middleware.ts` | Supabase session refresh on every request |

---

## 6. Phase Plan

| Phase | Name | What it delivers |
|---|---|---|
| 0 | UI & Design | Fresh repo, design system, landing page, circle prototype, light/dark mode |
| 1 | Supabase Foundation | All 6 tables including org layer, question seeding, RLS, Airtable retired |
| 2 | Auth & Infrastructure | Login, signup, nav, dashboard shell, shared component library |
| 3 | Snapshot — Learner | Circle selection, full quiz, persisted answers, resume handling |
| 4 | Snapshot — Leader + KFG | Leader overlay, score comparison, Keep/Focus/Grow picker |
| 5 | Reports | Printable Snapshot report with comparison and KFG summary |
| 6 | Check-in Flow | 3-skillset cross-circle re-assessment, leader overlay, progress report |
| 7 | History & Polish | All past rounds, settings, error states, mobile refinement |

---

## 7. Open Questions

- `getQuestionsForCircles([Circle, Circle])` in `questions.ts` supports a 24-question two-circle quiz. This flow is not currently documented — clarify whether it's a planned feature or dead code.
- `types-additions.ts` (`Circle = CircleName` alias, `StrengthName` union) should be merged into `types.ts` and deleted once the Circle/CircleLayer rename pass is done.
