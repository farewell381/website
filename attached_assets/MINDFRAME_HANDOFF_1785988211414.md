# MINDFRAME — Project Handoff / Continue Here

Paste this whole message into a new chat with Claude to pick up exactly where we left off.

---

## Project Status

I have a working Next.js 14 + TypeScript + Tailwind + Zustand app called **MINDFRAME** — a noir detective game that teaches critical thinking by having players tag cognitive biases/logical fallacies in murder-case suspect statements.

**It currently runs successfully on my machine** at `http://localhost:3000` via:
```
cd [my mindframe folder]
npm install
npm run dev
```

## What's Already Built & Working

- Landing page (`app/page.tsx`)
- City hub with XP display (`app/city/page.tsx`)
- Cases list page (`app/cases/page.tsx`)
- Case investigation page (`app/cases/[id]/page.tsx`)
- ConspiracyBoard component — drag statements, tag fallacies/biases, accuse suspect (`components/game/ConspiracyBoard.tsx`)
- InvestigationSidebar component — case info + results (`components/game/InvestigationSidebar.tsx`)
- Zustand store with localStorage persistence — tracks XP + completed cases (`lib/store/useGameStore.ts`)
- Cognitive taxonomy — 8 fallacies + 6 biases (`lib/data/cognitiveData.ts`)
- 2 full murder cases with suspects/statements/clues (`lib/data/cases.ts`)
- Scoring engine (`lib/utils/caseScoring.ts`)

## Design Tokens (keep consistent)

- Background: `#0B0F14` (noir), Cards: `#11161D` (ink)
- Accent: `#F5B841` (amber) — primary highlight color
- Font: `font-mono` throughout, uppercase tracking-widest for headers
- Style: dark, noir-detective, minimal

## Tech Constraints

- **No 3D yet** (Three.js/@react-three/fiber intentionally deferred — was too risky to add early; the city hub is a simple 2D grid instead)
- Zero extra dependencies beyond: `next`, `react`, `zustand`, `tailwindcss`
- Windows machine, using Command Prompt + `npm`, not very experienced with terminal — please give exact copy-pasteable commands, one at a time, and explain where files/folders should go

## The Build Plan (10 sessions, pick up wherever we left off)

1. 🟢 More cases (2→5)
2. 🟢 Bias District (`/district/biases` grid + detail pages)
3. 🟢 Fallacy District (same pattern as biases)
4. 🟡 Detective Academy (lesson/dialogue + quiz flow)
5. 🟡 Decision Lab (branching dilemma scenarios)
6. 🟡 Argument Analyzer (paste-your-own-text tool)
7. 🟡 Mind Palace (spaced repetition notebook)
8. 🔵 Achievements (badge unlock system)
9. 🔵 3D City Scene (do LAST — highest risk of breaking)
10. 🔵 Polish (animations, mobile)

## What I Want To Do Next

**[Tell Claude which session number, e.g. "Session 1: add 3 more cases"]**

## How I Want This Delivered

- Build the feature fully wired to my existing file structure
- Zip only the new/changed files
- Give me exact terminal commands to extract and test
- Confirm what I should see when it works
