export type DialogueLine = {
  speaker: "VERA" | "ROOKIE";
  text: string;
};

export const speakers = {
  VERA: { name: "V. QUINN", color: "#F5B841" },
  ROOKIE: { name: "J. PRICE — ROOKIE", color: "#4DE1C1" },
} as const;

export const decisionLabIntroScript: DialogueLine[] = [
  {
    speaker: "ROOKIE",
    text: "So this is the Lab. Feels different from the Bias District. Quieter.",
  },
  {
    speaker: "VERA",
    text: "That's because we're not hunting mistakes in here. We're building the thing that comes after you've already spotted one.",
  },
  {
    speaker: "ROOKIE",
    text: "I don't follow. If I know the bias, I know the answer.",
  },
  {
    speaker: "VERA",
    text: "Knowing you're being fooled doesn't tell you what to do next. That's a different skill. This room is where you learn it.",
  },
  {
    speaker: "ROOKIE",
    text: "Give me an example.",
  },
  {
    speaker: "VERA",
    text: "You've spent three weeks on a suspect. New lead says you're wrong. Spotting your own sunk-cost thinking is one thing — actually walking away from three weeks of work is another.",
  },
  {
    speaker: "ROOKIE",
    text: "...Yeah. That part's harder.",
  },
  {
    speaker: "VERA",
    text: "Every case file in here is a tool, not a trap. Expected value, opportunity cost, decision trees — pick them up, use them on the next case, and they get sharper every time.",
  },
  {
    speaker: "ROOKIE",
    text: "And if I master all ten?",
  },
  {
    speaker: "VERA",
    text: "Then you stop reacting to cases, Detective. You start deciding them. Go on — the first file's open.",
  },
];
