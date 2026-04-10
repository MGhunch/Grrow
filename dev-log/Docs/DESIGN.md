# Grrow — Design System

*Version 2 · April 2026*

> Source of truth for all visual decisions. Hex values here must match `constants.ts` and `globals.css`. No hex values elsewhere in the app.

---

## 1. Typography

### Font Families

| Font | Used for |
|---|---|
| Poppins | Everything — set at body level, never declared inline |
| Fredoka | Dashboard greeting ("Hello [Name]") — the single exception |

Poppins is the sole UI font. Fredoka adds warmth for the personal name display only.
Contrast comes from weight, not style. Single family, three weights (300, 600, 900).

### TEXT Tokens

All typography is defined in `constants.ts` as the `TEXT` object. Use these instead of magic numbers.

```typescript
import { TEXT } from "@/lib/constants";

// Spread into style objects
<div style={{ ...TEXT.heading.lg, color: purple }}>Modal Title</div>
<p style={{ ...TEXT.body.sm, color: muted }}>Supporting copy here.</p>
```

### Eyebrow

Tiny all-caps labels above headings.

| Token | Size | Weight | Spacing | Usage |
|---|---|---|---|---|
| `TEXT.eyebrow` | 11 | 600 | 0.1em | Strength labels, circle labels, category tags |

### Headings

All Poppins Semibold (600). No fontFamily declaration needed.

| Token | Size | Weight | Usage |
|---|---|---|---|
| `TEXT.heading.xl` | 26 | 600 | Feature title — skillset name in quiz |
| `TEXT.heading.lg` | 22 | 600 | Page/modal title |
| `TEXT.heading.md` | 18 | 600 | Section heading |
| `TEXT.heading.sm` | 15 | 600 | Card heading |

### Body Copy

Poppins Light (300) — the lightness that makes the UI feel airy.

| Token | Size | Weight | Usage |
|---|---|---|---|
| `TEXT.body.base` | 14 | 300 | Standard body copy |
| `TEXT.body.sm` | 13 | 300 | Smaller body copy, descriptions |

### Labels

Poppins Semibold (600) — for UI chrome that needs to stand out.

| Token | Size | Weight | Usage |
|---|---|---|---|
| `TEXT.label.base` | 13 | 600 | UI labels, state labels |
| `TEXT.label.sm` | 11 | 600 | Small labels, progress indicators |

### Buttons & Tooltips

| Token | Size | Weight | Usage |
|---|---|---|---|
| `TEXT.button` | 15 | 600 | All buttons — single size for consistency |
| `TEXT.tooltip` | 12 | 400 | Tooltips on coloured backgrounds |

### Fredoka Exception

For the dashboard greeting only. Override inline:

```typescript
<h1 style={{ 
  fontSize: 56, 
  fontFamily: "var(--font-fredoka)", 
  fontWeight: 600,
}}>
  Sarah
</h1>
```

---

## 2. Colour Architecture

### Brand Colours

| Name | Hex | Constant | Usage |
|---|---|---|---|
| Teal | `#18B99A` | `COLORS.teal.hero` | Collaboration & Communication, CTAs |
| Deep Purple | `#4C3FA0` | `COLORS.purple.hero` | Curiosity & Critical Thinking, headings |
| Dark Teal | `#0D9A82` | `COLORS.teal.dark` | Teal text on light backgrounds (contrast) |
| Dark Purple | `#3C3289` | `COLORS.purple.dark` | Hover states, deep emphasis |

### Score State Ramps

Bars are fixed colour per strength family and never change.

**Purple family** (Curiosity + Critical Thinking)

| State | Hex | Constant | Role |
|---|---|---|---|
| Not yet | `#D8D4F5` | `COLORS.purple.notYet` | Ghostly pale — not yet engaged |
| Learning | `#B8B0F0` | `COLORS.purple.learning` | Soft — aware but still reactive |
| Growing | `#6558D4` | `COLORS.purple.growing` | Vibrant — proactive and developing |
| Nailing it | `#4C3FA0` | `COLORS.purple.hero` | Full brand colour — mastered |

**Teal family** (Collaboration + Communication)

| State | Hex | Constant | Role |
|---|---|---|---|
| Not yet | `#C8F0EA` | `COLORS.teal.notYet` | Ghostly pale — not yet engaged |
| Learning | `#8DE8D8` | `COLORS.teal.learning` | Soft — aware but still reactive |
| Growing | `#3DCFB8` | `COLORS.teal.growing` | Vibrant — proactive and developing |
| Nailing it | `#18B99A` | `COLORS.teal.hero` | Full brand colour — mastered |

The step-change between pale and vibrant is deliberate. It represents the leap from reactive to proactive — the same leap as moving from Exploring to Influencing.

### UI Palette — Neutrals

| Name | Hex | Constant | Usage |
|---|---|---|---|
| White | `#FFFFFF` | `COLORS.ui.white` | Pure white — cards, buttons |
| Black | `#000000` | `COLORS.ui.black` | Pure black — shadows in dark mode |
| Warm White | `#FFFDF9` | `COLORS.ui.warmWhite` | Slight cream |
| Gray | `#E8E8E8` | `COLORS.ui.gray` | Progress tracks, neutral borders |

### UI Palette — Light Mode

| Name | Hex | Constant | Usage |
|---|---|---|---|
| Near Black | `#1A1525` | `COLORS.ui.nearBlack` | Primary text |
| Light Muted | `#6B6390` | `COLORS.ui.lightMuted` | Muted text |
| Light Copy | `#3D3360` | `COLORS.ui.lightCopy` | Secondary copy |
| Light Border | `#E5E0F5` | `COLORS.ui.lightBorder` | Borders |
| Light Sep | `#DDD8F5` | `COLORS.ui.lightSep` | Separators |
| Light Hover | `#F4F1FF` | `COLORS.ui.lightHover` | Hover state, page background |

### UI Palette — Dark Mode

| Name | Hex | Constant | Usage |
|---|---|---|---|
| Deep Navy | `#0D0B16` | `COLORS.ui.deepNavy` | Page background |
| Dark Card | `#16122A` | `COLORS.ui.darkCard` | Card background |
| Dark Border | `#251E40` | `COLORS.ui.darkBorder` | Borders |
| Dark Sep | `#2E2550` | `COLORS.ui.darkSep` | Separators |
| Dark Text | `#EEE8FF` | `COLORS.ui.darkTxt` | Primary text |
| Dark Muted | `#5A4F7A` | `COLORS.ui.darkMuted` | Muted text |
| Dark Body | `#9B8FD4` | `COLORS.ui.darkBodyCopy` | Body copy |
| Dark Body Lift | `#C4BCDF` | `COLORS.ui.darkBodyLift` | Body copy (lifted) |
| Dark Hover | `#1C1640` | `COLORS.ui.darkHover` | Hover state |

### Overlays

| Name | Value | Constant | Usage |
|---|---|---|---|
| Light overlay | `rgba(20, 16, 48, 0.5)` | `COLORS.ui.overlay` | Modal backdrop (light mode) |
| Dark overlay | `rgba(10, 8, 22, 0.85)` | `COLORS.ui.overlayDark` | Modal backdrop (dark mode) |

---

## 3. Derived Colours — familyAlpha()

For washes, borders, and shadows, derive transparent colours from hero rather than hand-picking hex values. This keeps the palette tight and consistent.

### Usage

```typescript
import { familyAlpha } from "@/lib/constants";

// familyAlpha(family, token, mode)
const wash   = familyAlpha("teal", "wash", "light");   // rgba(24, 185, 154, 0.06)
const border = familyAlpha("purple", "border", "dark"); // rgba(76, 63, 160, 0.24)
const shadow = familyAlpha("teal", "shadow2", "light"); // rgba(24, 185, 154, 0.25)
```

### Opacity Tokens

| Token | Light | Dark | Usage |
|---|---|---|---|
| `wash` | 0.06 | 0.12 | Content block backgrounds, section tints |
| `border` | 0.16 | 0.24 | Card edges, dividers, input borders |
| `subtle` | 0.25 | 0.35 | Disabled states, placeholder text |
| `muted` | 0.45 | 0.55 | Eyebrows, labels, secondary info |
| `soft` | 0.60 | 0.70 | Supporting copy, tooltips, helper text |
| `shadow1` | 0.15 | 0.25 | Subtle lift — cards |
| `shadow2` | 0.25 | 0.35 | Default — buttons, raised elements |
| `shadow3` | 0.35 | 0.45 | Elevated — modals, dropdowns |

### whiteAlpha()

For white overlays and translucent states:

```typescript
import { whiteAlpha } from "@/lib/constants";

const sublineText = whiteAlpha(0.7);  // rgba(255, 255, 255, 0.7)
```

---

## 4. Light Mode & Dark Mode

Dark mode is not an afterthought — it's where the circle really sings. Teal and purple glow against the dark.

- Implement with Tailwind's `dark:` variant + a `data-theme` attribute on `<html>`
- CSS variables for all colour tokens — one swap covers the entire UI
- Components self-contain dark mode via `useTheme()` from `ThemeContext`
- Components do not accept dark mode as a prop

---

## 5. Icons

| Strength | Icon | Library |
|---|---|---|
| Curiosity | `Sparkles` | lucide-react |
| Collaboration | `Network` | lucide-react |
| Communication | `Waves` | lucide-react |
| Critical Thinking | `GitBranch` | lucide-react |

### Icon Rules

- **Colour:** Always the strength's family colour. Teal (`COLORS.teal.hero`) for Collaboration and Communication. Purple (`COLORS.purple.hero`) for Curiosity and Critical Thinking.
- **Container:** Icons sit inside a circular container with a slightly darker background than the surrounding surface.
- **Size:** 14px icon inside a 28px container for chips and compact rows. 20px icon inside a 40px container for cards and modals. `strokeWidth` 1.75–2.
- **Inactive state:** Icon colour drops to muted. Container background drops to transparent.

Icons are defined in `lib/constants.ts` alongside the `STRENGTHS` array.

---

## 6. The Grrow Icon

`GrrowIcon.tsx` — four concentric layers + quadrant cross. Mirrors the circle UI.

| Prop | Default | Notes |
|---|---|---|
| `filled` | 4 | 0–4. Filled layers = solid, unfilled = ghost |
| `size` | 40 | px. Height and width |
| `darkBg` | false | true = teal solid + white cross on dark background |

Convenience exports: `GrrowIconEssentials` (filled=1), `GrrowIconExploring` (filled=2), `GrrowIconInfluencing` (filled=3), `GrrowIconLeading` (filled=4).

Filled layers fill from the innermost outward. Active layer = teal. Filled layers = purple.

---

## 7. Standing Design Rules

These are non-negotiable. Apply to every component, every screen.

### Colour Rules

- **No inline hex values.** Reference `COLORS.x.y` or use `familyAlpha()`. Single source of truth is `constants.ts`.
- **Score ramps are hand-picked.** The four-step ramps (notYet → Learning → Growing → Nailing it) are intentional — never derive these.
- **Washes and shadows are derived.** Use `familyAlpha(family, token, mode)` for consistency.

### Typography Rules

- **No fontFamily declarations.** Poppins is set at body level. The only exception is Fredoka for the dashboard name.
- **Use TEXT tokens.** No magic numbers for font size or weight — use `TEXT.heading.lg`, `TEXT.body.sm`, etc.
- **Body copy is 300.** The lightness is intentional. Don't drift to 400.
- **Buttons are 15px.** Single size for consistency.

### Layout Rules

- **No arrows** on links or buttons, ever. Chevrons are acceptable as directional affordances on weblinks only.
- **No full stops in headlines**, ever.
- **Lots of air.** Remove elements that don't earn their place.
- **Minimal and purposeful** — consistently remove decoration that doesn't carry meaning.

### Components

- **Always use `CloseButton`** from `./shared/CloseButton`. Never build inline close buttons. Teal is the correct close button colour.
- **The circle is the hero.** All UI decisions should serve the circle, not compete with it.
