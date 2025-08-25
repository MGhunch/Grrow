HOUSEKEEPING JOBS TO DO:

Here’s a tidy **housekeeping checklist** you can drop into your repo as `HOUSEKEEPING.md` (or paste into an issue). It’s organized so you can pick things off in small bites.

# Grrow — Housekeeping Checklist

## 1) Structure & Files

* [ ] Create `app/quiz/types.ts` and move `Question`, `StrengthBlock`, `QuizData`, `AnswerMap` there.
* [ ] Create tiny UI components in `app/quiz/components/`:

  * [ ] `Progress.tsx` (accepts `current`, `total`)
  * [ ] `Breadcrumb.tsx` (accepts `circle`, `strength`)
  * [ ] `ScaleLabels.tsx` (renders the four anchors)
* [ ] Keep `GrrowQuiz.tsx` focused on flow/state (import the above components).

## 2) Styling

* [ ] Split quiz‑specific styles into `app/quiz/quiz.css` (imported in `app/layout.tsx` or inside `GrrowQuiz` with `import './quiz.css'` if global is acceptable).
* [ ] Keep brand/base tokens in `app/globals.css` only.
* [ ] Adopt a naming pattern and stick to it (`.grrow-[component]-[element]`).
* [ ] Document allowed brand colors and font usage at the top of the CSS.

## 3) Fonts

* [ ] Ensure Google Font `@import`s are at the very top of `globals.css`.
* [ ] Optionally migrate to Next.js `next/font/google` for Playfair/Open Sans to avoid FOUC and CSP issues.
* [ ] Add a short section in README explaining where fonts are set and how to change them.

## 4) Linting & Formatting

* [ ] Add ESLint + Prettier config if missing (airbnb or next defaults are fine).
* [ ] Add `format` and `lint` scripts to `package.json`.
* [ ] Run a one‑time `prettier --write "app/**/*.{ts,tsx,css}"`.

## 5) State & Data

* [ ] Centralize quiz constants (anchors, circles) in `app/quiz/constants.ts`.
* [ ] Add simple runtime guards (e.g., ensure API payload includes `objective`, `questions.length === 3`).
* [ ] Consider Zod (or TypeScript runtime checks) for `/api/questions` response.

## 6) Accessibility (quick wins)

* [ ] Add `aria-label` to the range input (e.g., “Progress toward consistency”).
* [ ] Ensure buttons have discernible text (the `?` has `aria-label="Help"`).
* [ ] Keyboard: confirm range is focusable and operable with arrows; visible focus rings retained.

## 7) Reusability & Theming

* [ ] Extract button variants to a small helper or utility classes (`.btn`, `.btn--green`, `.btn--outline`) and document usage.
* [ ] Extract progress-bar styles into a reusable class and use on both top/bottom bars.

## 8) Performance & Build

* [ ] Ensure `tailwind.config.ts` `content` globs include `app/**/*.{ts,tsx}` (already good).
* [ ] Remove any dead files (e.g., older `GrrowQuiz (1).tsx`).
* [ ] Verify images/assets are under `public/` and referenced with absolute paths.

## 9) Documentation

* [ ] Add a short `README.md` section:

  * [ ] How to run locally.
  * [ ] Where quiz styles live and how to tweak them.
  * [ ] Where to edit the question flow / data shapes.
  * [ ] Brand tokens (colors, fonts).
* [ ] Add `HOUSEKEEPING.md` (this list!) and link it from README.

## 10) Testing & QA (lightweight)

* [ ] Manual test script in the repo (bullet list): start quiz, navigate Back/Next, complete circle, view summary, switch circle.
* [ ] Optional: add a Playwright smoke test for the quiz flow (load page, click through, assert progress updates).

---

Want me to generate the starter files for **`types.ts`**, **`constants.ts`**, and minimal **`Progress.tsx`/`Breadcrumb.tsx`** so you can paste them in when you’re ready?
