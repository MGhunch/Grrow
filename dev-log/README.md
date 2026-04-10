# Snapshot Report Files

Integrated with existing `@/lib/constants`, `@/lib/skillsets`, and `@/lib/types`.

## File placement

```
src/
├── components/
│   └── reports/
│       ├── Snapshot.tsx      ← Main component (2 pages)
│       ├── types.ts          ← Report-specific types only
│       └── sampleData.ts     ← Test data (remove in prod)
│
└── app/(app)/
    └── snapshot/
        └── [roundId]/
            └── page.tsx      ← Route page
```

## Add print styles

Paste contents of `snapshot-print.css` into `globals.css`.

## Imports

Snapshot.tsx pulls from:
- `@/lib/constants` — COLORS, scoreToState
- `@/lib/skillsets` — RING_STAGES
- `@/lib/types` — CircleName, StrengthFamily, KfgCategory

## Test it

1. Drop files into place
2. Run `npm run dev`
3. Visit `/snapshot/test`
4. Click "Download PDF"

## Flags for later

- [ ] Rename `RING_STAGES` → `CIRCLE_STAGES` in skillsets.ts
- [ ] Add `description` field to CIRCLE_STAGES (currently hardcoded in reports/types.ts)
- [ ] Wire up Supabase fetch in page.tsx
