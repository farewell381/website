// Detective Academy — linear lesson content.
// Each lesson: a short typewriter dialogue teaching a concept, then a
// quiz that awards XP. No branching — lessons unlock strictly in order.

export type DialogueLine = {
  speaker: 'VERA' | 'ROOKIE';
  text: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  order: number;
  title: string;
  teaser: string;
  dialogue: DialogueLine[];
  quiz: QuizQuestion[];
  xp: number;
};

export const speakers = {
  VERA: { name: 'V. QUINN', color: '#F5B841' },
  ROOKIE: { name: 'J. PRICE — ROOKIE', color: '#4DE1C1' },
} as const;

export const academyLessons: Lesson[] = [
  {
    id: 'welcome-to-the-academy',
    order: 1,
    title: 'Welcome to the Academy',
    teaser: 'Before the streets, the classroom. What Vantage City actually trains you to see.',
    xp: 80,
    dialogue: [
      { speaker: 'ROOKIE', text: 'So this is it. The famous Detective Academy.' },
      { speaker: 'VERA', text: "Famous for what — the coffee's terrible and the chairs are worse. But yes. This is where it starts." },
      { speaker: 'ROOKIE', text: 'I thought detective work was about clues. Footprints, fingerprints, that kind of thing.' },
      { speaker: 'VERA', text: "It is. But most cases don't fall apart because a detective missed a clue. They fall apart because a detective's own mind filled in the gaps wrong." },
      { speaker: 'ROOKIE', text: 'My own mind is the suspect?' },
      { speaker: 'VERA', text: 'Every day, Detective. That is what we train here. Ready?' },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'According to Vera, what most often causes a case to fall apart?',
        options: ['Missing physical evidence', "The detective's own mind filling in gaps incorrectly", 'Uncooperative witnesses', 'Bad luck'],
        correctIndex: 1,
        explanation: "Vera's point: physical evidence matters, but flawed thinking is what most often derails a case.",
      },
    ],
  },
  {
    id: 'what-is-a-bias',
    order: 2,
    title: 'What Is a Bias, Really?',
    teaser: "Not a character flaw. A shortcut your brain takes without asking permission.",
    xp: 100,
    dialogue: [
      { speaker: 'VERA', text: "People hear 'bias' and think it means someone's a bad person. That's not it." },
      { speaker: 'ROOKIE', text: 'Then what is it?' },
      { speaker: 'VERA', text: "A shortcut. Your brain can't fully analyze every decision, so it uses patterns — usually useful ones. A bias is just a pattern misfiring." },
      { speaker: 'ROOKIE', text: 'So everyone has them.' },
      { speaker: 'VERA', text: "Everyone. Including me, including you, including whoever taught you that biases only happen to other people." },
      { speaker: 'ROOKIE', text: 'Fair.' },
      { speaker: 'VERA', text: "The job isn't eliminating bias. It's catching it before it writes your report for you." },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What does Vera say a cognitive bias actually is?',
        options: ['A moral failing', "A mental shortcut that's misfiring", 'A rare condition only some people have', 'A lie a suspect tells'],
        correctIndex: 1,
        explanation: 'A bias is a normally-useful mental shortcut applied in a situation where it leads you astray.',
      },
      {
        id: 'q2',
        question: "Per this lesson, what's the actual goal of training?",
        options: ['Eliminate bias completely', 'Catch bias before it shapes your conclusions', 'Avoid working with biased people', 'Memorize a list of biases'],
        correctIndex: 1,
        explanation: "You can't switch bias off — the skill is noticing it in time to correct course.",
      },
    ],
  },
  {
    id: 'evidence-vs-instinct',
    order: 3,
    title: 'Evidence vs. Instinct',
    teaser: "Your gut got you this far. It also gets a lot of detectives fired.",
    xp: 100,
    dialogue: [
      { speaker: 'ROOKIE', text: 'I had a feeling about a suspect on my last ride-along. Turned out I was right.' },
      { speaker: 'VERA', text: 'Once. Write down every time your gut was right, and every time it was not. Then tell me the ratio.' },
      { speaker: 'ROOKIE', text: '...I do not track the misses.' },
      { speaker: 'VERA', text: "Nobody does. That's why instinct feels more reliable than it is — we remember the hits and quietly forget the misses." },
      { speaker: 'ROOKIE', text: "So instinct's useless?" },
      { speaker: 'VERA', text: 'No — it is a starting point, not a verdict. Use it to decide where to look. Let the evidence decide what you conclude.' },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why does instinct feel more reliable than it actually is?',
        options: ['It genuinely is always reliable', 'We tend to remember the hits and forget the misses', 'Instinct is a myth', 'Evidence is usually wrong'],
        correctIndex: 1,
        explanation: 'Selective memory for successful hunches makes instinct feel more accurate in hindsight than it was in the moment.',
      },
      {
        id: 'q2',
        question: 'What role does Vera say instinct SHOULD play?',
        options: ['None — ignore it entirely', 'It should override evidence when strong enough', 'A starting point for where to look, not the final conclusion', 'It should only be used by senior detectives'],
        correctIndex: 2,
        explanation: 'Instinct is useful for direction. Conclusions should rest on evidence.',
      },
    ],
  },
  {
    id: 'confirmation-bias',
    order: 4,
    title: 'The Case You Already Solved',
    teaser: 'Once you have picked a suspect, watch how fast the evidence starts agreeing with you.',
    xp: 110,
    dialogue: [
      { speaker: 'VERA', text: 'Tell me about your suspect from the Ashford case.' },
      { speaker: 'ROOKIE', text: "Guy's clearly guilty. He was near the scene, he's got a record, and he got nervous when I questioned him." },
      { speaker: 'VERA', text: 'How many other people were near that scene?' },
      { speaker: 'ROOKIE', text: '...I did not check.' },
      { speaker: 'VERA', text: 'Once you decide someone is guilty, every detail starts looking like proof — even the ones that mean nothing. Nervousness during questioning happens to innocent people too.' },
      { speaker: 'ROOKIE', text: 'So how do I stop doing that?' },
      { speaker: 'VERA', text: 'You do not stop it. You build the habit of asking: what evidence would change my mind? If you cannot answer that, you are not investigating anymore. You are confirming.' },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What happened to the rookie’s judgment once he decided a suspect was guilty?',
        options: ['He became more skeptical of all evidence', 'Neutral or ambiguous details started to look like proof of guilt', 'He stopped investigating the case', 'Nothing changed'],
        correctIndex: 1,
        explanation: 'This is confirmation bias: once a conclusion is picked, ambiguous evidence gets reinterpreted as support for it.',
      },
      {
        id: 'q2',
        question: 'What question does Vera suggest asking to guard against this?',
        options: ['"Am I 100% sure?"', '"What evidence would change my mind?"', '"Would my captain agree?"', '"Is the suspect nervous?"'],
        correctIndex: 1,
        explanation: 'If nothing could change your mind, you have stopped investigating and started defending a conclusion.',
      },
    ],
  },
  {
    id: 'anchoring',
    order: 5,
    title: 'The First Number You Hear',
    teaser: 'An estimate with no evidence behind it can still steer every guess that follows.',
    xp: 110,
    dialogue: [
      { speaker: 'ROOKIE', text: "Captain says the burglary ring's probably five or six guys. Everyone's been working off that." },
      { speaker: 'VERA', text: 'Where did that number come from?' },
      { speaker: 'ROOKIE', text: 'I... actually do not know. He just said it in a briefing three weeks ago.' },
      { speaker: 'VERA', text: 'That is an anchor. A number gets said out loud — sometimes as a total guess — and it quietly becomes the frame everyone else estimates around.' },
      { speaker: 'ROOKIE', text: 'But it might be right.' },
      { speaker: 'VERA', text: 'Might be. The problem is not the number, it is that nobody re-checks it against anything real since. Anchors are fine as a starting guess. They are dangerous left unexamined.' },
    ],
    quiz: [
      {
        id: 'q1',
        question: "What is an 'anchor' in this lesson's sense?",
        options: ['A piece of physical evidence', 'An early number or estimate that quietly shapes later judgments', 'A type of alibi', 'A senior detective's final ruling'],
        correctIndex: 1,
        explanation: 'Anchoring is when an initial figure — even an arbitrary one — sets the frame for subsequent estimates.',
      },
      {
        id: 'q2',
        question: 'What does Vera say is the actual danger of an anchor?',
        options: ['Anchors are always wrong', 'Leaving it unexamined instead of re-checking it against real evidence', 'Using any numbers at all', 'Captains should not give estimates'],
        correctIndex: 1,
        explanation: 'An anchor is not inherently bad — the risk is treating it as settled instead of periodically testing it.',
      },
    ],
  },
  {
    id: 'availability-heuristic',
    order: 6,
    title: 'What Comes to Mind First',
    teaser: "The easiest example to remember isn't always the most common one.",
    xp: 120,
    dialogue: [
      { speaker: 'VERA', text: 'Quick — what is more dangerous, this precinct's warehouse district or its finance district?' },
      { speaker: 'ROOKIE', text: 'Warehouse district, easily. I can think of three violent cases there this year alone.' },
      { speaker: 'VERA', text: 'Now check the actual numbers with me.' },
      { speaker: 'ROOKIE', text: '...Huh. Finance district’s fraud caseload is triple the warehouse district’s violent caseload.' },
      { speaker: 'VERA', text: 'Vivid cases stick in memory harder than common ones. Three violent incidents are more memorable than three hundred paperwork frauds — so your gut ranks them wrong.' },
      { speaker: 'ROOKIE', text: "So 'what I can recall fastest' isn't the same as 'what's most likely.'" },
      { speaker: 'VERA', text: 'Now you are thinking like a detective instead of a witness.' },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why did the rookie initially rank the warehouse district as more dangerous?',
        options: ['It actually had more total cases', 'Vivid, memorable cases came to mind faster than common but less dramatic ones', 'He had personal experience there', 'The finance district has no crime'],
        correctIndex: 1,
        explanation: 'The availability heuristic: how easily examples come to mind gets mistaken for how frequent they actually are.',
      },
      {
        id: 'q2',
        question: 'What is the core lesson Vera is teaching here?',
        options: ['Violent crime is always worse than fraud', 'What comes to mind easily is not necessarily what is most common', 'Warehouse districts should be avoided', 'Memory is always accurate'],
        correctIndex: 1,
        explanation: "Ease of recall (vividness, recency, emotional weight) is a poor substitute for actual frequency.",
      },
    ],
  },
];
