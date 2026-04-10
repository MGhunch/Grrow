# HANDOVER v001 — 29 Mar 2026 — Skillsets Deepdive

## Project
Grrow — structured professional development platform mapping skills across four strengths and four career stages.

## Session Focus
No code written. Pure content and strategy session focused on the Skills section of the homepage and the architecture of The Science page. Key copy decisions made, WEF research gathered, science page hierarchy agreed.

---

## Work Log

### Skills Section — Homepage

**Headline**
"Build the skills people want to buy" — rejected. Too transactional. No replacement locked yet.
Direction: four things, they matter, research keeps proving it.
Candidates:
- "Research keeps landing on the same four."
- "The four skills that keep showing up"
- "Four capabilities. Every role. Every industry."

**Subline**
Section currently has no subline — agreed it needs one. Should connect all four cards.
Strongest candidate: "Curiosity finds better ideas. Collaboration lands them. Communication sells them. Critical Thinking makes them work."

**Modal**
- Intro cards → modal structure confirmed and solid
- Modal pre-loading agreed: render all four modals on page load, hidden, toggle visibility on click. No mount delay, instant feel.
- "Explore" CTA to be replaced with directional language — "See how it works" or similar. No arrows.

**Card hover**
Subtle lift + border glow to signal "there's more here" — agreed worth doing.

### Card Copy

| Strength | Current | Status |
|---|---|---|
| Curiosity | "Creativity is just joining dots. The secret is digging up dots." | KEEPER |
| Collaboration | "Getting stuff done is easy. Playing nice with humans is the hard bit." | KEEPER |
| Critical Thinking | "Answers are easy to come by. The secret is asking better questions." | STRONG CANDIDATE |
| Communication | Unresolved | NEEDS WORK |

**CT note:** "The secret is asking better questions" deliberately echoes Curiosity's "the secret is digging up dots." Intentional parallel — confirm before locking.

**Communication candidates explored:**
- "With more noise than ever, the skill is finding the signal." — close but structure differs from others
- "Everyone's talking. Far fewer people actually land." 
- "Anyone can fill a room with words. The skill is making them stick."
- "Communication is a two-way street. It's how you find the signal in the noise." — Michael's draft, unresolved
- Two-way street framing noted as too familiar — dulls the landing

**Brief locked for Communication:**
Both directions — understanding what matters AND making it land clearly. Most breakdowns aren't about effort, they're about people talking past each other.

---

### The Science Page

**Research gathered per strength:**

Curiosity
- Kashdan (George Mason) — curiosity as measurable behaviour, not fixed trait
- Loewenstein information gap theory (CMU, 1994) — curiosity triggered by awareness of knowledge gap
- WEF 2023 + 2025: curiosity and lifelong learning explicitly named as rising core skill

Collaboration
- Google Project Aristotle (2012) — team composition matters less than how teams behave
- Amy Edmondson, Harvard — psychological safety as strongest predictor of team performance
- WEF 2025: collaboration explicitly named as fastest-growing human skill through 2030

Critical Thinking
- Bloom's Taxonomy (1956) — analysis and evaluation at top of hierarchy deliberately
- Kahneman System 1/2 (Thinking Fast and Slow, 2011) — critical thinking as deliberate override of default fast thinking
- WEF: analytical thinking = #1 core skill every Future of Jobs report since 2016. 7/10 employers consider it essential (2025).

Communication
- Shannon-Weaver model (1948) — communication only complete when received as intended, not just sent
- Zenger & Folkman 360 feedback research — communication most commonly cited gap at every org level
- WEF: folded into "leadership and social influence" and "empathy and active listening" — both top 10 core skills

**KEY POSITIONING DECISION:**
Grrow goes one level deeper than WEF. WEF names outcomes (leadership, influence, collaboration as a result). Grrow identifies the underlying capabilities that produce those outcomes. You can't lead without Communication. You can't achieve leadership and social influence without Collaboration and Communication developed deliberately over time. This is Grrow's differentiation on the science page — not "we match the list" but "we go deeper than the list."

**Science page hierarchy agreed:**
1. The claim — lead with confidence. "These aren't the skills we chose. They're the ones research keeps coming back to."
2. The proof — WEF data, framed as validation not citation. Biggest employers in the world. Same cluster. Every time.
3. The building blocks — four skills get individual treatment. Brief, purposeful, connected. The Grrow-goes-deeper angle lives here.
4. The AI angle — the closer, not the opener. Skills AI is making more important are exactly the ones Grrow focuses on. Punchline, not introduction.

**Risk to avoid:** reads like a literature review. Every section needs a "so what" — why does this matter for you, right now, in your job.

---

## Files Changed
- WORKLOG.md — created (session log)

---

## Decisions Made
- Modal pre-loading: render hidden on page load, toggle visibility on click
- "Explore" CTA: replace with directional language across all four cards
- Curiosity and Collaboration card copy: locked
- CT card copy: strong candidate, confirm "secret" echo before locking
- Communication card copy: brief locked, copy still unresolved
- Science page: Grrow positions as going one level deeper than WEF
- Science page: AI angle is the closer, not the opener
- Science page hierarchy: Claim → Proof → Building blocks → AI

---

## Still Open
- Communication card copy — needs a line as sharp as the other three
- Skills section headline — no lock yet
- Skills section subline — strong candidate but not confirmed
- CT "secret" echo — intentional or too cute? Confirm before locking

---

## Next Session
- [ ] Lock Communication card copy
- [ ] Lock Skills section headline and subline
- [ ] Write Science page to the agreed hierarchy — Claim, Proof, Building blocks, AI closer
- [ ] Confirm CT "secret" echo decision
- [ ] Build: modal pre-loading in SkillsSection.tsx
- [ ] Build: updated CTA language across skill cards
- [ ] Build: card hover states (lift + border glow)

## Context for Next Time
Pure content session — no code touched. Start next session by locking the two open copy items (Communication card, Skills headline) before writing the Science page or touching any code. Science page hierarchy is solid and ready to write to. BIBLE.md and the WEF research gathered this session are the source material.
