# Grrow — Content & Questions

*Version 2 · April 2026*

---

## 1. Quiz Mechanics

### The Two Quiz Types

| Type | Questions | Trigger |
|---|---|---|
| Snapshot | 12 (one circle × four strengths × 3 questions) | Any time. Named by circle: Essentials Snapshot, Exploring Snapshot, etc. |
| Check-in | 9 (three KFG skillsets × 3 questions) | Only available after a finalised Snapshot with KFG selections |

### The Four Bars

The question prompt is always: **"What's your take?"**

| Label | Score | Tooltip |
|---|---|---|
| Not really | 0 | New territory for you. |
| Sometimes | 33 | You get it, but need a nudge. |
| Mostly | 66 | You do it when you think of it. |
| Intuitively | 100 | You do it without thinking. |

### Score → Response State

| Score range | State | Description |
|---|---|---|
| 0–25 | Not yet | This is new territory. |
| 26–50 | Learning | You can do it when prompted. |
| 51–75 | Growing | You're building a habit. |
| 76–100 | Nailing it | You do it without thinking. |

Scores are averaged across the 3 questions in a skillset to produce the response state.

---

## 2. The Skillset Grid

| Circle | Curiosity | Critical Thinking | Communication | Collaboration |
|---|---|---|---|---|
| Essentials | Question | Clarify | Update | Engage |
| Exploring | Challenge | Simplify | Navigate | Connect |
| Influencing | Create | Solve | Persuade | Unlock |
| Leading | Cultivate | Innovate | Guide | Inspire |

**Colour families:**
- Purple: Curiosity + Critical Thinking
- Teal: Collaboration + Communication

---

## 3. Circle Stage Copy

Used on dashboard and circle selector. "Where are you right now?"

| Circle | Dashboard label | Tagline |
|---|---|---|
| Essentials | You're starting out | Start strong. Build trust |
| Exploring | You're Exploring | Own it and improve it |
| Influencing | You're Influencing | Shape it and ship it |
| Leading | You're Leading | Set the standard. Raise the bar |

---

## 4. Strength Taglines

| Strength | Tagline |
|---|---|
| Curiosity | Make it better |
| Collaboration | Make it happen |
| Communication | Make it clear |
| Critical Thinking | Make it work |

---

## 5. Question Bank

All 48 questions. Source of truth: `lib/questions.ts`.

Each question has: ID · circle · strength · skillset · objective · title (2-4 word handle) · question text.

---

### ESSENTIALS

#### Curiosity — Question
*Do you stay curious about people and ideas beyond your immediate work?*

| ID | Title | Question |
|---|---|---|
| CR-QUE-13 | Tune into people | Are you interested in how people think and what that means for your work? |
| CR-QUE-14 | Steal like a pirate | Do you actively seek ideas and inspiration from outside what you're doing? |
| CR-QUE-15 | Ask why before how | Do you stop and ask why before you ask how? |

#### Collaboration — Engage
*Do you consistently deliver and use feedback to be a safe pair of hands?*

| ID | Title | Question |
|---|---|---|
| CL-ENG-25 | Own your time | Do you manage your time proactively and reliably deliver on deadlines? |
| CL-ENG-26 | Bounce ideas | Do you share your ideas and bounce off others to improve the thinking? |
| CL-ENG-27 | Seek feedback | Do you actively seek feedback and use it to improve your work? |

#### Communication — Update
*Do you respond promptly, share clear updates, and flag changes that impact others?*

| ID | Title | Question |
|---|---|---|
| CO-CON-37 | Close the loop | Do you respond to requests and updates in a timely way? |
| CO-CON-38 | Keep it simple | Do you share clear, simple updates that others can easily understand? |
| CO-CON-39 | Raise good flags | Do you let people know quickly when plans change and might affect them? |

#### Critical Thinking — Clarify
*Do you take time to clarify the ask and summarise the job before starting?*

| ID | Title | Question |
|---|---|---|
| CT-CLA-01 | Clarify the ask | Do you take time to clarify any requests, briefs or feedback? |
| CT-CLA-02 | Spot the blockers | Can you recognise key challenges or constraints up front? |
| CT-CLA-03 | Play it back | Do you clearly summarise what and why before you get started? |

---

### EXPLORING

#### Curiosity — Challenge
*Do you question how things are done and seek ways to make them better?*

| ID | Title | Question |
|---|---|---|
| CR-IMP-16 | Challenge the process | Do you question how things are done and look for ways to improve them? |
| CR-IMP-17 | Give good feedback | Do you push back constructively when something could be better? |
| CR-IMP-18 | Build on ideas | Do you build on other people's thinking to create better ideas? |

#### Collaboration — Connect
*Do you anticipate others' needs, juggle competing views, and reduce friction?*

| ID | Title | Question |
|---|---|---|
| CL-OPO-28 | Own the outcome | Do you take ownership for delivery and influence others to meet deadlines? |
| CL-OPO-29 | Navigate the room | Do you juggle different opinions and land the best answers for the project? |
| CL-OPO-30 | Clear the path | Do you anticipate other people's needs and work to reduce wasted effort? |

#### Communication — Navigate
*Do you read the room, anticipate needs, and keep the right people informed?*

| ID | Title | Question |
|---|---|---|
| CO-MUM-40 | Flag your capacity | Do you actively manage and share your availability and priorities? |
| CO-MUM-41 | Manage up | Do you update stakeholders in a way that works best for them? |
| CO-MUM-42 | Adapt and flex | Do you flag issues early and adapt plans to keep things on track? |

#### Critical Thinking — Simplify
*Do you focus on what matters most and learn from what's worked before?*

| ID | Title | Question |
|---|---|---|
| CT-SIM-04 | Sort news from noise | Do you consider all relevant information and identify what matters most? |
| CT-SIM-05 | Manage constraints | Do you recognise constraints and clarify scope and boundaries? |
| CT-SIM-06 | Spot patterns | Do you compare and contrast similar projects or ideas to clarify understanding? |

---

### INFLUENCING

#### Curiosity — Create
*Do you identify ideas with potential and fight for the ones worth it?*

| ID | Title | Question |
|---|---|---|
| CR-GVG-19 | Spot the winners | Do you easily identify which ideas have the most potential to create value? |
| CR-GVG-20 | Pick your battles | Do you know how to pick your battles and fight for the ideas worth fighting for? |
| CR-GVG-21 | Sell it in | Do you know how to sell the ideas you believe in? |

#### Collaboration — Unlock
*Do you remove barriers and create clarity so others can succeed?*

| ID | Title | Question |
|---|---|---|
| CL-EMP-31 | Smooth the friction | Do you resolve people or process challenges to keep work flowing efficiently? |
| CL-EMP-32 | Build trust | Do you adapt your approach to build trust and alignment across different people? |
| CL-EMP-33 | Fix the blockers | Do you enable others to succeed by creating clarity and removing barriers? |

#### Communication — Persuade
*Do you frame your thinking so your ideas land with different people?*

| ID | Title | Question |
|---|---|---|
| CO-INF-43 | Frame the sell | Do you frame your ideas in ways that connect and persuade others? |
| CO-INF-44 | Build relationships | Do you take time to build relationships with people outside of the day to day? |
| CO-INF-45 | Read the room | Do you adapt your communication style to suit different people and needs? |

#### Critical Thinking — Solve
*Do you diagnose root causes, identify blockers, and find better solutions?*

| ID | Title | Question |
|---|---|---|
| CT-SOL-07 | Pinpoint the problem | Can you easily identify specific challenges within a wider context? |
| CT-SOL-08 | Find the root cause | Can you analyse challenges at root cause to identify the core problem? |
| CT-SOL-09 | Find a better way | Can you identify alternative solutions that deliver better outcomes? |

---

### LEADING

#### Curiosity — Cultivate
*Do you foster curiosity and champion the creativity it sparks?*

| ID | Title | Question |
|---|---|---|
| CR-INN-22 | Champion the curious | Do you foster a curious environment and celebrate curious people? |
| CR-INN-23 | Protect the spark | Do you protect early ideas to give them time to reach their potential? |
| CR-INN-24 | Trust the process | Do you give people freedom to explore ideas without a commercial objective in mind? |

#### Collaboration — Inspire
*Do you lead with energy, coach consistently, and inspire your teams?*

| ID | Title | Question |
|---|---|---|
| CL-INS-34 | Build strong teams | Do you build high performing teams with different strengths and perspectives? |
| CL-INS-35 | Coach on the go | Do you coach and course-correct to keep people and projects on track? |
| CL-INS-36 | Bring the energy | Do you inspire confidence with clarity, energy and support? |

#### Communication — Guide
*Do you set clear goals, assess progress fairly, and empower your teams to thrive?*

| ID | Title | Question |
|---|---|---|
| CO-GUI-46 | Set direction | Do you set clear goals and objectives to give people confidence? |
| CO-GUI-47 | Call it fairly | Do you assess progress and course-correct with clarity and fairness? |
| CO-GUI-48 | Direct, don't control | Do you empower others by giving direction without over-controlling? |

#### Critical Thinking — Innovate
*Do you spot industry innovations, evaluate new ideas, and drive their adoption?*

| ID | Title | Question |
|---|---|---|
| CT-INN-10 | Watch the horizon | Do you actively stay up to speed on industry and category innovations? |
| CT-INN-11 | Spot what's next | Can you recognise or concept new ideas or innovations that drive commercial value? |
| CT-INN-12 | Make it real | Can you size, scope and sell new ideas and drive their adoption? |

---

## 6. Authored Content (Stub)

Each skillset needs authored content to power the "Bounce It" AI reflection feature and post-quiz contextual notes. This content gives the AI a real point of view — generic prompts have no value.

**Structure per skillset:**

```
### [Skillset Name] — [Circle] / [Strength]

**What good looks like**
[2-3 sentences describing someone who genuinely nails this.]

**Common traps**
[2-3 pitfalls people fall into at this stage.]

**The principle**
[One sentence. The core idea behind the skillset.]

**Score-specific notes**
- Not yet: [What this means and what to do next.]
- Learning: [What this means and what to do next.]
- Growing: [What this means and what to do next.]
- Nailing it: [What this means and what to do next.]
```

**Status:** Not yet authored. All 16 skillsets to complete. Priority order TBD.

| Circle | Strength | Skillset | Status |
|---|---|---|---|
| Essentials | Curiosity | Question | — |
| Essentials | Collaboration | Engage | — |
| Essentials | Communication | Update | — |
| Essentials | Critical Thinking | Clarify | — |
| Exploring | Curiosity | Challenge | — |
| Exploring | Collaboration | Connect | — |
| Exploring | Communication | Navigate | — |
| Exploring | Critical Thinking | Simplify | — |
| Influencing | Curiosity | Create | — |
| Influencing | Collaboration | Unlock | — |
| Influencing | Communication | Persuade | — |
| Influencing | Critical Thinking | Solve | — |
| Leading | Curiosity | Cultivate | — |
| Leading | Collaboration | Inspire | — |
| Leading | Communication | Guide | — |
| Leading | Critical Thinking | Innovate | — |
