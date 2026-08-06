# 🗺️ MINDFRAME — Build-Out Plan

## Where You Are Right Now

✅ **Working foundation** — landing page, city hub, cases list, full investigation loop (drag/tag/accuse/score), XP persistence. This runs on your machine today.

---

## The Plan: One Feature Per Session

Each session = **I build a fully-wired feature → zip it → you drop it in → test → move to next.**
No big-bang builds. No "why won't it run" surprises.

---

## 🟢 Session 1 — More Cases (do this first, easiest win)

**Goal:** Go from 2 cases → 5 cases, matching your original spec.

- [ ] I write 3 more `CaseFile` entries in `lib/data/cases.ts`
- [ ] You replace one file, restart `npm run dev`
- [ ] Test: all 5 cases show on `/cases`, all playable

**Time:** ~15 min build, ~10 min test

---

## 🟢 Session 2 — Bias District

**Goal:** `/district/biases` grid + `/district/biases/[biasId]` detail pages.

- [ ] I build the grid page + detail page + wire to your uploaded bias data
- [ ] Unlock this district on the City hub
- [ ] You drop in 3-4 new files, test navigation

**Time:** ~25 min build, ~10 min test

---

## 🟢 Session 3 — Fallacy District

**Goal:** Same pattern as biases, applied to fallacies.

- [ ] Reuses the exact same components from Session 2 (fast, low risk)
- [ ] Unlock this district on the City hub

**Time:** ~20 min build, ~10 min test

---

## 🟡 Session 4 — Detective Academy

**Goal:** Guided lessons — dialogue steps + quizzes, no branching.

- [ ] Lesson list page + lesson runner page
- [ ] Typewriter-style dialogue delivery
- [ ] Quiz component with XP rewards

**Time:** ~20 min build, ~10 min test

---

## 🟡 Session 5 — Decision Lab

**Goal:** Branching dilemma scenarios tied to biases.

- [ ] Scenario list + scenario runner with branching outcomes
- [ ] Score tracking per decision

**Time:** ~20 min build, ~10 min test

---

## 🟡 Session 6 — Argument Analyzer

**Goal:** Paste-your-own-text tool that flags fallacies/biases via keyword heuristics.

- [ ] Text input + heuristic engine + highlighted output

**Time:** ~20 min build, ~10 min test

---

## 🟡 Session 7 — Mind Palace

**Goal:** Personal notebook with spaced repetition (SM-2 lite).

- [ ] Note-taking UI + review scheduling logic

**Time:** ~20 min build, ~10 min test

---

## 🔵 Session 8 — Achievements

**Goal:** Badge unlock system with toast notifications.

- [ ] Achievement definitions + unlock triggers + toast UI

**Time:** ~15 min build, ~5 min test

---

## 🔵 Session 9 — 3D City Scene (Optional, Higher Risk)

**Goal:** Replace the simple 2D city hub with the full Three.js visual city.

⚠️ **Note:** This is the riskiest piece — 3D deps (`@react-three/fiber`, `three`) add real install/build risk versus the rest of the app, which has zero extra dependencies. Recommend doing this **last**, after everything else works, so a 3D issue never blocks the rest of the game.

**Time:** ~30 min build, ~15-20 min test (more likely to need a fix-it round)

---

## 🔵 Session 10 — Polish

**Goal:** Animations, hover states, mobile responsiveness pass.

**Time:** ~20 min build, ~10 min test

---

## Suggested Pacing

| Pace | Timeline |
|---|---|
| **All in one day** | ~3 hrs total (back-to-back sessions) |
| **A few sessions a day** | 2-3 days |
| **One a day, relaxed** | ~10 days |

There's no wrong pace — each session leaves you with a **more complete, still-working** app. Nothing is ever half-broken between sessions.

---

## How Each Session Actually Works

1. You say which session number (or feature name)
2. I write the code, wire it into your existing project structure
3. I zip just the new/changed files (small, fast download)
4. You unzip into your `mindframe` folder (overwrite when asked)
5. Restart `npm run dev` if it's running
6. Refresh browser, test
7. Report back — if something's off, I fix it same session

---

## Ready?

**Just say "Session 1"** (or name any feature) and I'll start building. 🚀
