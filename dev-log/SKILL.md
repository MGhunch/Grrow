---
name: vibe-code-handover
description: Generate a session handover document for vibe coding projects. Use this skill whenever the user says "handover", "wrap up", "session summary", "end session", or "vibe code handover". Scrapes the conversation for changes, decisions, issues, and next actions, then outputs a versioned markdown file ready for download. Essential for maintaining continuity across coding sessions.
---

# Vibe Code Handover

A session continuity system with three commands and auto-logging.

## The System

| Component | Location | Purpose |
|-----------|----------|---------|
| WORKLOG.md | `/dev-log/WORKLOG.md` | Running log across sessions |
| HANDOVER-vXXX-... | `/dev-log/` | Versioned session summaries |

## Commands

### 1. "Catch this"

Triggers: "catch this", "log this", "note this", "capture this"

Appends a manual entry to the worklog. Use for decisions, context, and things the auto-log won't catch.

**Format:**
```markdown
## DD Mon HH:MM — [Chat/Code]
Catch: [user's note]
```

**Example:**
```markdown
## 27 Mar 14:45 — Chat
Catch: Bounce It name locked — casual framing, serves the 1:1 not replaces it
```

### 2. Auto-logging (no command needed)

Every `create_file` and `str_replace` automatically appends to the log.

**Format:**
```markdown
## DD Mon HH:MM — Code
filename.ext — created (description from tool call)
filename.ext — updated (description from tool call)
```

**Example:**
```markdown
## 27 Mar 15:32 — Code
constants.ts — updated (fixed score ramp values)
QuizEntryModal.tsx — updated (grouped dropdown by strength)
```

### 3. "Merge logs"

Triggers: "merge logs", "merge the logs", "combine logs", "consolidate logs"

When user drags in multiple WORKLOG files from parallel sessions:
1. Read all provided WORKLOG files
2. Combine entries chronologically by timestamp
3. Remove duplicates (same timestamp + same content)
4. Output merged WORKLOG.md

Use when bouncing between parallel sessions on different topics.

### 4. "Handover"

Triggers: "handover", "wrap up", "session summary", "end session"

Synthesizes everything since the last handover into a versioned document.

**Workflow:**
1. Read WORKLOG.md (from project files or user-provided)
2. Read conversation for additional context
3. Extract: focus, files changed, decisions, issues, next actions
4. Ask user for short descriptor (2-4 words) for filename
5. Generate versioned handover file
6. Output both HANDOVER and cleared WORKLOG

## Handover Template

```markdown
# HANDOVER vXXX — DD Mon YYYY — [Short Descriptor]

## Project
[One-liner describing the project]

## Session Focus
[1-2 lines on what this session/series of sessions covered]

## Work Log
[Paste relevant entries from WORKLOG — the raw material]

## Files Changed
- filename.ext — [what/why]

## Decisions Made
- [Decision and brief rationale]

## Still Broken / Known Issues
- [Issue or limitation]

## Next Session
- [ ] [Next action]
- [ ] [Next action]

## Context for Next Time
[Where to pick up — which file, what's stubbed, what to look at first]
```

## Filename Format

```
HANDOVER-v007-2703-AI-Discussion.md
         │    │    └── Short descriptor (slugified)
         │    └────── Date: DDMM
         └─────────── Version: increments from last handover
```

## Session Start

When user starts a session (or says "read the log", "where are we", "continue"):

1. Check for WORKLOG.md in project files
2. Display the last 5-10 entries
3. Summarise: "Last activity was [X]. Ready to continue."

If no WORKLOG found:
- Check for most recent HANDOVER in project files
- Summarise that instead
- Create fresh WORKLOG.md

## What Gets Logged

| Source | What | Maps to |
|--------|------|---------|
| Auto | create_file calls | `filename — created (description)` |
| Auto | str_replace calls | `filename — updated (description)` |
| Manual | "Catch this: X" | `Catch: X` |
| Manual | Decisions in conversation | User should "catch this" or handover captures |

## The Bounce Workflow

```
Session A (topic 1):
  ├── Reads WORKLOG from repo
  ├── Auto-logs file changes
  ├── User: "catch this" for decisions
  └── Outputs updated WORKLOG

User drags WORKLOG back to repo

Session B (topic 2):
  ├── Reads WORKLOG from repo
  ├── Auto-logs file changes
  ├── User: "catch this" for decisions
  └── Outputs updated WORKLOG

User drags WORKLOG back to repo

Any session:
  └── "Handover" → versioned summary, clears log
```

## Parallel Sessions

If user runs parallel sessions on different topics:

```
Session A:  WORKLOG with entries A1, A2, A3
Session B:  WORKLOG with entries B1, B2, B3

User drags both into one session:
"Merge logs" → Combined WORKLOG (A1, B1, A2, B2, A3, B3 by timestamp)
```

## Clearing the Log

After handover, WORKLOG.md resets to:

```markdown
# WORKLOG

> Last handover: HANDOVER-v007-2703-AI-Discussion.md

---
```

This keeps the thread — you can always find the previous handover.

## Output Location

All outputs go to `/mnt/user-data/outputs/`:
- `WORKLOG.md` (updated version)
- `HANDOVER-vXXX-DDMM-Descriptor.md`

User drags these to `/dev-log/` in the repo.

## If Information is Missing

- **No WORKLOG found:** Check for recent HANDOVER, summarise that, start fresh log
- **No previous handover:** Ask for project one-liner, start at v001
- **Unclear descriptor:** Ask "What should we call this handover? (2-4 words)"
- **Empty log:** Note "No logged activity since last handover" — might be discussion-only session
