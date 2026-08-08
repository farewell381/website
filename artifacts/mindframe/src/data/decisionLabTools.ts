export type DecisionTool = {
  id: string;
  name: string;
  unlockRequirement: number;
  hook: string;
  description: string;
  caseExample: string;
  xp: number;
};

export const decisionLabTools: DecisionTool[] = [
  {
    id: 'expected-value',
    name: 'Expected Value',
    unlockRequirement: 0,
    hook: 'Measure a choice by what it gives you over time, not how it feels in the moment.',
    description:
      'Not every plausible path is worth taking. Expected value helps you compare outcomes by combining probability and payoff so you choose what actually improves the case.',
    caseExample:
      'A witness appears unreliable, but her testimony creates a lead that is twice as likely to expose a real culprit. Which path is the better one?',
    xp: 40,
  },
  {
    id: 'opportunity-cost',
    name: 'Opportunity Cost',
    unlockRequirement: 2,
    hook: 'Every choice closes another door. Know what you are giving up.',
    description:
      'Opportunity cost forces you to account for the best option you did not take. It keeps you from treating every decision like an isolated win or loss.',
    caseExample:
      'Spending half a day checking a low-probability clue may cost you the time needed to interview a stronger suspect.',
    xp: 50,
  },
  {
    id: 'decision-tree',
    name: 'Decision Tree',
    unlockRequirement: 4,
    hook: 'Map the choices, then follow the branches with logic instead of instinct.',
    description:
      'Decision trees make complicated cases visible. When a choice splits into several outcomes, this tool helps you see which branch leads to the most reliable answer.',
    caseExample:
      'Should you confront a suspect now or wait for forensic confirmation? Draw the branches and compare the likely results.',
    xp: 50,
  },
  {
    id: 'sunk-cost',
    name: 'Sunk Cost',
    unlockRequirement: 6,
    hook: 'Past effort is not evidence. The work you already did should not force your next move.',
    description:
      'Detectives often cling to a case because they are invested in it. This tool reminds you to judge the choice in front of you, not the hours already spent.',
    caseExample:
      'A line of inquiry has consumed days, but new evidence points elsewhere. Do you persist or pivot?',
    xp: 60,
  },
  {
    id: 'confirmation-test',
    name: 'Confirmation Test',
    unlockRequirement: 8,
    hook: 'A good decision tries to break the conclusion, not just defend it.',
    description:
      'This tool flips your current assumption into a testable alternative. Strong decisions are the ones that survive deliberate challenges.',
    caseExample:
      'You suspect the assistant, but a confirmation test asks whether the evidence could equally support an honest mistake.',
    xp: 55,
  },
  {
    id: 'regret-minimization',
    name: 'Regret Minimization',
    unlockRequirement: 10,
    hook: 'Choose the action you will regret least in the long run.',
    description:
      'Regret minimization helps when outcomes are uncertain. It is especially useful on decisions where the safest path is more valuable than the flashy one.',
    caseExample:
      'Back a suspect now and risk missing the real culprit, or hold and risk losing critical evidence.',
    xp: 65,
  },
  {
    id: 'exit-strategy',
    name: 'Exit Strategy',
    unlockRequirement: 12,
    hook: 'Every decision needs an escape route if the facts change.',
    description:
      'An exit strategy prepares you for when a choice starts going wrong. It keeps you from doubling down on a bad direction because you feel committed.',
    caseExample:
      'The lead turns out to be a red herring; what is your plan to stop and regroup?',
    xp: 55,
  },
  {
    id: 'risk-adjustment',
    name: 'Risk Adjustment',
    unlockRequirement: 14,
    hook: 'Not every risk is worth the reward. Tune the choice to the stakes.',
    description:
      'Risk adjustment helps you calibrate decisions when the cost of being wrong changes. It is the difference between reckless and reasonable risk.',
    caseExample:
      'A low-reward theory is cheaper to test than a high-reward theory with serious consequences if it fails.',
    xp: 60,
  },
  {
    id: 'bias-check',
    name: 'Bias Check',
    unlockRequirement: 16,
    hook: 'Find the internal shortcut before it finds the wrong answer.',
    description:
      'This tool uses the archive lessons to inspect your own thinking. It helps you avoid choosing the one story your mind already wants to believe.',
    caseExample:
      'You prefer the neat suspect story because it matches a familiar bias. Is that preference influencing the choice?',
    xp: 60,
  },
  {
    id: 'contingency-plan',
    name: 'Contingency Plan',
    unlockRequirement: 18,
    hook: 'Good decisions include the next move when things do not go to plan.',
    description:
      'Contingency planning makes choices resilient. It ensures you are not locked in if a clue falls apart or a witness goes silent.',
    caseExample:
      'If the promised forensic report is delayed, what is your backup move to keep the investigation moving?',
    xp: 70,
  },
];
