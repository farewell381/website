# MINDFRAME

MINDFRAME is a noir-themed detective game that teaches critical thinking through murder investigations. Players inspect suspect statements, identify cognitive biases and logical fallacies, review clues, accuse a suspect, and earn XP.

## Current status

### Phase 1 — Core investigation loop

Complete.

- Landing page and city desk
- XP and case progress persisted in local storage
- Crime Scene case list
- Five murder cases
- Case overview, victim details, suspects, alibis, statements, and clues
- Red-herring clue indicators
- Statement selection and fallacy/bias tagging
- Accusation and scoring flow
- Results with accuracy, XP earned, missed concepts, and solution explanation
- Responsive 2D noir interface

## Roadmap

Build one phase at a time. Do not start a later phase until it is explicitly requested.

### Phase 2 — Bias District

Complete.

- Bias district grid with 30 cognitive-bias buildings
- Bias detail pages with definitions and detective-context examples
- Interactive scenario with choices and feedback
- Three-question quiz
- Completion tracking and XP rewards
- City hub unlock

### Phase 3 — Fallacy District

- Fallacy district grid with 30 logical-fallacy buildings
- Reuse the Bias District detail and quiz patterns
- Completion tracking and XP rewards
- City hub unlock

### Phase 4 — Detective Academy

- Ordered lesson list
- Lesson runner with dialogue steps
- Typewriter-style dialogue reveal
- Short quiz and XP reward

### Phase 5 — Decision Laboratory

- Scenario list
- Branching moral and practical dilemmas
- Decision outcomes linked to related biases
- Running decision score

### Phase 6 — Argument Analyzer

- Text input for player-provided arguments
- Keyword and pattern heuristic engine
- Highlighted likely fallacies
- Explanatory tooltips

### Phase 7 — Mind Palace

- Personal notebook
- Notes linked to biases, fallacies, or cases
- Daily review queue
- Lightweight spaced repetition scheduling

### Phase 8 — Achievements

- Achievement definitions and unlock conditions
- Unlock toast notifications
- Profile page with earned and locked achievements
- Streak tracking

### Phase 9 — 3D City Scene

Build last because it carries the highest technical risk.

- Procedural low-poly city using Three.js
- District clusters with locked and unlocked states
- Mobile-safe fallback to the Phase 1 2D grid

### Phase 10 — Polish Pass

- Hover lift and scale interactions
- Full keyboard navigation
- Screen-reader labels
- Optional subtle UI sounds, off by default
- Final responsive and accessibility pass

## Development

```bash
pnpm --filter @workspace/mindframe run dev
pnpm --filter @workspace/mindframe run typecheck
```
