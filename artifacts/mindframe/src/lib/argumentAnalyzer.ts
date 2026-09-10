import { fallacies, type Fallacy } from '@/data/fallacies';

export type Match = {
  fallacyId: string;
  fallacyName: string;
  shortDefinition: string;
  definition: string;
  snippet: string;
  start: number;
  end: number;
  explanation: string;
};

type Rule = {
  fallacyId: string;
  patterns: RegExp[];
  explanation: (match: string) => string;
};

const rules: Rule[] = [
  {
    fallacyId: 'ad-hominem',
    patterns: [
      /\b(you'?re (just )?(stupid|dumb|an idiot|a liar|crazy|insane|ignorant|naive))\b/gi,
      /\b(don'?t listen to (him|her|them), (he|she|they)('?s| is| are) (just )?(a|an) (liar|fool|fraud))\b/gi,
      /\b(what would (you|he|she|they) know, (you|he|she|they)('?s| is| are) (just )?(a|an) \w+)/gi,
      /\b((he|she|they)('?s| is| are) (just )?(a|an) (crook|liar|fraud|cheat), so)\b/gi,
    ],
    explanation: () => 'Attacking the person instead of addressing their claim.',
  },
  {
    fallacyId: 'straw-man',
    patterns: [
      /\b(so you'?re saying (we should )?(just )?(ignore|abandon|destroy|eliminate|ban) (everything|all|every))\b/gi,
      /\b(so you (want|think) (we should )?(just )?(get rid of|destroy|eliminate) (all|every|everything))\b/gi,
      /\b(you'?re (basically )?(saying|arguing) (that )?(nobody|no one|everyone|all))\b/gi,
      /\b(so (your|you'?re) (argument is|saying) (that )?(we should )?(just )?(ban|eliminate|destroy))\b/gi,
    ],
    explanation: () => 'Distorting the argument into a weaker version that is easier to attack.',
  },
  {
    fallacyId: 'false-dilemma',
    patterns: [
      /\b(either (you|we) .{1,40} or (you|we) .{1,40}( and that'?s it|,? (there'?s|there is) nothing else))\b/gi,
      /\b(there (are|'?re) only two (options|choices|possibilities))\b/gi,
      /\b(it'?s (either|all or nothing))\b/gi,
      /\b(you'?re (either )?(with us or against us)\b)/gi,
      /\b(if you don'?t .{1,30} then you (must|clearly) .{1,30})/gi,
    ],
    explanation: () => 'Presenting only two options when more exist.',
  },
  {
    fallacyId: 'appeal-to-authority',
    patterns: [
      /\b((my|the) (doctor|professor|boss|expert|scientist|lawyer) (said|told me|says) .{1,50})\b/gi,
      /\b(according to (dr\.?|professor|expert|scientist|the chief|the boss))\b/gi,
      /\b(if (the|an) (expert|authority|scientist|professor) (said|says) (so|it),? (then )?it (must be|'?s) (true|right))\b/gi,
      /\b((well-)?known (expert|authority|scientist) .{1,40} (confirmed|proved|says))\b/gi,
    ],
    explanation: () => 'Accepting a claim because an authority figure said it, without examining the evidence.',
  },
  {
    fallacyId: 'hasty-generalization',
    patterns: [
      /\b(every (one|single) \w+ (is|does|always) .{1,30})\b/gi,
      /\b(all \w+ (are|always|do) .{1,30})\b/gi,
      /\b(I (once|met|saw) (a|one|this) \w+ .{1,30},? so (they|all|every) (all )?(must be|are|do))\b/gi,
      /\b(I (met|saw|know) (two|three|a few|some) \w+ .{1,25},? so (all|every|everyone) (must be|are|do))\b/gi,
    ],
    explanation: () => 'Drawing a broad conclusion from too small a sample.',
  },
  {
    fallacyId: 'slippery-slope',
    patterns: [
      /\b(if (we|you) (allow|start|let) .{1,30},? (then )?(soon|eventually|before you know it) .{1,50})\b/gi,
      /\b(next thing you know,? .{1,50})\b/gi,
      /\b(it (won'?t|will not) stop (there|at .{1,20}),? (it'?ll|it will) (lead to|end up) .{1,40})\b/gi,
      /\b(one (thing|step) leads to another,? and (soon|eventually) .{1,40})\b/gi,
    ],
    explanation: () => 'Claiming one step will inevitably lead to extreme outcomes without showing the chain.',
  },
  {
    fallacyId: 'red-herring',
    patterns: [
      /\b(but what about .{1,40}\?)/gi,
      /\b(that'?s (not the point|irrelevant),? the (real|actual) (issue|problem|question) is .{1,40})\b/gi,
      /\b(sure,? but .{1,30},? (which is|that is) (way )?(more )?important)\b/gi,
      /\b(anyway,? (the (real|actual) (point|issue) is|what (really|actually) matters is) .{1,40})\b/gi,
    ],
    explanation: () => 'Distracting from the claim with an irrelevant point.',
  },
  {
    fallacyId: 'circular-reasoning',
    patterns: [
      /\b(it'?s (true|right|correct) because (it'?s|it is) (true|right|correct))\b/gi,
      /\b(\w+ is \w+ because \w+ is \w+)/gi,
      /\b(the (reason )?it'?s (true|right) is because (it'?s|it is) (true|right))\b/gi,
      /\b(it (is|'?s) (good|right|true) because (it (is|'?s) (good|right|true)))\b/gi,
    ],
    explanation: () => 'Using the conclusion as its own support.',
  },
  {
    fallacyId: 'post-hoc-ergo-propter-hoc',
    patterns: [
      /\b(after .{1,30},? (then )?.{1,30} (happened|occurred),? so (it|that) (must have|clearly) (caused|led to))\b/gi,
      /\b(I (did|wore|ate|used) .{1,20} and (then )?(I )?(won|got better|passed|succeeded),? so (it|that) (must have|clearly) (caused|worked))\b/gi,
      /\b(it (happened|occurred) right after .{1,30},? so .{1,20} (caused|must have caused) (it|that))\b/gi,
      /\b(every time .{1,30},? .{1,30} (happens|occurs),? so (one|it) (causes|must cause) the other)\b/gi,
    ],
    explanation: () => 'Assuming that because B followed A, A caused B.',
  },
  {
    fallacyId: 'appeal-to-emotion',
    patterns: [
      /\b(think (about|of) the (children|victims|families|poor|helpless))\b/gi,
      /\b(if you (really )?(cared|care) (about|for) .{1,30},? (you|you'?d|you would) .{1,30})\b/gi,
      /\b(it'?s (so )?(sad|tragic|heartbreaking|outrageous|disgusting) (that|how) .{1,40})\b/gi,
      /\b(anyone (with a heart|who cares|with any decency) (would|should|must) .{1,30})\b/gi,
      /\b(are you (going to|really going to) (let|allow|stand by and) .{1,40}\?)/gi,
    ],
    explanation: () => 'Using emotion instead of evidence to persuade.',
  },
  {
    fallacyId: 'bandwagon',
    patterns: [
      /\b(everyone (else )?(is|does|believes|thinks|knows) .{1,30},? so (it|that) (must be|'?s) (true|right|correct))\b/gi,
      /\b(millions of (people|users|customers) (can'?t|cannot) be wrong)\b/gi,
      /\b(everybody'?s doing it,? so)\b/gi,
      /\b(the (majority|vast majority) (believes|thinks|agrees),? so (it|that) (must be|'?s) (true|right))\b/gi,
    ],
    explanation: () => 'Treating popularity as proof of truth.',
  },
  {
    fallacyId: 'appeal-to-ignorance',
    patterns: [
      /\b(nobody (has (ever )?(proven|shown|demonstrated) (that )?it (isn'?t|is not|doesn'?t|does not) .{1,30},? so (it must be|it'?s)) .{1,30})\b/gi,
      /\b(no one (has (ever )?disproven .{1,30},? so (it must be|it'?s) .{1,30}))\b/gi,
      /\b(you can'?t (prove|show) (that )?(it (isn'?t|is not)|it didn'?t) .{1,30},? so (it must be|it'?s) .{1,30})\b/gi,
      /\b(since (no one|nobody) (has (ever )?(proven|shown) (otherwise|the contrary),? (it must be|it'?s) .{1,30}))\b/gi,
    ],
    explanation: () => 'Claiming something is true because it has not been disproven.',
  },
  {
    fallacyId: 'equivocation',
    patterns: [
      /\b(if \w+ (is|are) \w+,? and \w+ (is|are) \w+,? then \w+ (is|are) \w+)/gi,
      /\b(the (word|sign) says \w+,? so (it|that) (must mean|means) \w+)/gi,
      /\b(\w+ (means|can mean) .{1,20},? (and|but) (it|that) (also )?(means|can mean) .{1,20},? so)/gi,
    ],
    explanation: () => 'Sliding between different meanings of a word.',
  },
  {
    fallacyId: 'loaded-question',
    patterns: [
      /\b(when (did|will) you stop (lying|cheating|stealing|hurting|abusing))\b/gi,
      /\b(why (do|did) you (always|keep) (lie|lying|cheat|cheating|fail|failing)\?)/gi,
      /\b(have you (finally )?stopped (lying|cheating|stealing|hurting)\?)/gi,
      /\b(why (do|did) you (hate|dislike|fear|ignore) .{1,30} (so much|so badly)\?)/gi,
    ],
    explanation: () => 'Hiding an unsupported assumption inside a question.',
  },
  {
    fallacyId: 'no-true-scotsman',
    patterns: [
      /\b(no (true|real) \w+ (would|could|ever) .{1,30})\b/gi,
      /\b(if (he|she|they|you) (did|does|would do) that,? (he|she|they|you) (wasn'?t|isn'?t|aren'?t|was never|is never) a (real|true) \w+)/gi,
      /\b(anyone who (does|would do|did) that (isn'?t|is not|wasn'?t) a (real|true) \w+)/gi,
    ],
    explanation: () => 'Redefining a group to exclude a counterexample.',
  },
  {
    fallacyId: 'tu-quoque',
    patterns: [
      /\b(but you (did|do|have done) (the same thing|it too),? so)\b/gi,
      /\b(you (can'?t|cannot) (talk|criticize|judge),? (you|you'?ve|you have) .{1,30} (too|as well|yourself))\b/gi,
      /\b(look who'?s talking,? you .{1,30})\b/gi,
      /\b(well,? you (did|do) (the same|exactly that|it too),? so (you can'?t|you cannot) (say|complain|judge))\b/gi,
    ],
    explanation: () => 'Dismissing criticism by accusing the critic of hypocrisy.',
  },
  {
    fallacyId: 'genetic-fallacy',
    patterns: [
      /\b(that (came|comes) from (the|a) (rival|competitor|enemy|biased|corrupt) .{1,30},? so (it'?s|it is) (wrong|false|worthless))\b/gi,
      /\b(don'?t trust (that|it),? (it|that) (came|comes) from .{1,30})\b/gi,
      /\b((it|that) (can'?t|cannot) be (true|right|good) because (it|that) (came|comes) from .{1,30})\b/gi,
    ],
    explanation: () => 'Judging a claim by its origin instead of its evidence.',
  },
  {
    fallacyId: 'composition',
    patterns: [
      /\b(each (part|member|piece|one) (is|has) .{1,25},? so the (whole|group|team|entire) (must be|is) .{1,25})\b/gi,
      /\b(every (part|member|piece) (is|has) .{1,25},? therefore (the|all) (of them together|whole) (is|are) .{1,25})\b/gi,
      /\b(if each \w+ (is|has) .{1,20},? then (all|the whole) (must be|is) .{1,20})\b/gi,
    ],
    explanation: () => 'Assuming what is true of the parts is true of the whole.',
  },
  {
    fallacyId: 'division',
    patterns: [
      /\b(the (whole|group|team|company|department) (is|has) .{1,25},? so (each|every) (member|part|one|person) (must be|is) .{1,25})\b/gi,
      /\b(since (the|all) \w+ (is|are) .{1,20},? (each|every) (single )?\w+ (must be|is) .{1,20})\b/gi,
      /\b(the \w+ (is|are) .{1,20},? therefore (each|every) \w+ (is|must be) .{1,20})\b/gi,
    ],
    explanation: () => 'Assuming what is true of the whole is true of each part.',
  },
  {
    fallacyId: 'false-cause',
    patterns: [
      /\b(the (new|recent) \w+ (was|came) (right )?before .{1,30},? so (it|that) (caused|must have caused) .{1,30})\b/gi,
      /\b(\w+ (happened|occurred) (right )?after .{1,25},? so .{1,15} (caused|must have caused) (it|that))\b/gi,
      /\b(ever since .{1,25},? .{1,25} (started|began|happened),? so (one|the former) (caused|must have caused) (it|the latter))\b/gi,
    ],
    explanation: () => 'Assigning a cause without enough evidence for the link.',
  },
  {
    fallacyId: 'anecdotal-evidence',
    patterns: [
      /\b(my (friend|uncle|cousin|neighbor|mom|dad|brother|sister) (tried|used|took|did) .{1,30} and (it|they) (worked|got better|was fine),? so)\b/gi,
      /\b(I (know|heard about) (a|this|one) (guy|person|woman|case) who .{1,30},? so (it|that) (must work|works|is safe|is true))\b/gi,
      /\b(in my (experience|case),? .{1,30} (worked|helped|cured|fixed) (me|it),? so (it|that) (will|must) (work|help) for (everyone|all|you))\b/gi,
    ],
    explanation: () => 'Using a personal story as broad proof.',
  },
  {
    fallacyId: 'texas-sharpshooter',
    patterns: [
      /\b(look at (these|the) (three|four|five|few|some) (dates|cases|examples|numbers|times) .{1,30},? they (all|clearly) (show|prove) .{1,30})\b/gi,
      /\b(if you (just|only) (look at|count|consider) (the|these) .{1,25},? (you'?ll|you will) see (a clear )?pattern)\b/gi,
      /\b(three out of (four|five|these) (times|cases|examples) (show|prove|confirm) .{1,30})\b/gi,
    ],
    explanation: () => 'Choosing the pattern after seeing the data.',
  },
  {
    fallacyId: 'moving-goalposts',
    patterns: [
      /\b(that'?s (still )?not (good|enough|sufficient),? (I|we) (need|want|require) (more|another|further) .{1,30})\b/gi,
      /\b(okay,? but (now|that'?s|that is) (not|isn'?t) (enough|sufficient) (anymore|either),? (I|we) (also )?need .{1,30})\b/gi,
      /\b(so what if .{1,25}\?? (that'?s|that is) (still )?not (enough|proof|evidence),? (you|we) (still )?need .{1,30})\b/gi,
    ],
    explanation: () => 'Changing the standard after it has been met.',
  },
  {
    fallacyId: 'begging-the-question',
    patterns: [
      /\b(it'?s (obvious|clear|self-evident|a fact) that .{1,30} because (it'?s|it is) (obvious|clear|self-evident|a fact))\b/gi,
      /\b(the (reason )?\w+ is (true|right|correct) is because (it'?s|it is) (true|right|correct))\b/gi,
      /\b(of course .{1,25} (is|'?s) (true|right|the case),? (everybody|everyone) (knows|agrees) (it'?s|it is) (true|right))\b/gi,
    ],
    explanation: () => 'Assuming the conclusion inside the premise.',
  },
  {
    fallacyId: 'cherry-picking',
    patterns: [
      /\b(just (look at|consider) (these|the) (two|three|few) (examples|cases|studies|results) .{1,30},? they (show|prove) .{1,30})\b/gi,
      /\b(the (studies|data|evidence) (clearly )?(show|prove|support) .{1,25},? (if you|when you) (only|just) (look at|count|consider) .{1,25})\b/gi,
      /\b(all the (successful|positive|good) (examples|cases|results) (show|prove) .{1,30})\b/gi,
    ],
    explanation: () => 'Selecting only the evidence that supports your case.',
  },
  {
    fallacyId: 'appeal-to-nature',
    patterns: [
      /\b(it'?s (natural|organic|all-natural),? so (it'?s|it is) (safe|good|healthy|better))\b/gi,
      /\b(if (it'?s|it is) (natural|organic),? (then )?it (must be|'?s) (safe|good|better for you))\b/gi,
      /\b(chemicals? (are )?(bad|dangerous|toxic),? (and|because) (this|that) (is|'?s) (natural|organic))\b/gi,
    ],
    explanation: () => 'Treating "natural" as automatically good or safe.',
  },
  {
    fallacyId: 'appeal-to-tradition',
    patterns: [
      /\b(we'?ve (always|always been) (done it|done) this way,? so (it'?s|it is) (right|correct|best|the way))\b/gi,
      /\b(this (is|has been) (the way|how) (we'?ve|we have) (always )?(done it|done things|worked),? so)\b/gi,
      /\b(if it (wasn'?t|was not) (broken|wrong|bad),? (why|don'?t) (fix|change) (it|things)\??)/gi,
      /\b(tradition (says|dictates) (that )?(we should|we must) .{1,30})\b/gi,
    ],
    explanation: () => 'Defending a practice simply because it is old or customary.',
  },
  {
    fallacyId: 'false-analogy',
    patterns: [
      /\b(\w+ is (just )?like \w+,? so (it|that) (must|should|will) .{1,25})\b/gi,
      /\b(if \w+ (works|does|is) .{1,20},? then \w+ (will|must|should) (work|do|be) (the same|similarly))\b/gi,
      /\b(comparing \w+ to \w+,? (it'?s|it is) (obvious|clear) that .{1,30})\b/gi,
    ],
    explanation: () => 'Assuming two things match in relevant ways when they may not.',
  },
  {
    fallacyId: 'middle-ground',
    patterns: [
      /\b(the (truth|answer) (must be|'?s) (somewhere )?in (the middle|between (them|that)))\b/gi,
      /\b(let'?s (just )?(split (the )?difference|meet (in the middle|halfway)),? so)\b/gi,
      /\b((well|so) the (right|real) (answer|truth) (is|must be) (halfway|in between|a compromise) between .{1,30})\b/gi,
    ],
    explanation: () => 'Assuming the compromise between two positions is automatically correct.',
  },
  {
    fallacyId: 'personal-incredulity',
    patterns: [
      /\b(I (can'?t|cannot|don'?t) (see|understand|imagine|figure out) how .{1,30},? so (it (can'?t|cannot) be|it'?s (not|impossible)) .{1,30})\b/gi,
      /\b(that (doesn'?t|does not) (make sense|sound right) to me,? so (it (can'?t|cannot) be|it'?s (not|wrong)) .{1,30})\b/gi,
      /\b(I (don'?t|do not) (get|understand) (how|why) .{1,30},? so (it (must be|'?s) (wrong|false|impossible)))/gi,
    ],
    explanation: () => 'Rejecting a claim because it feels hard to imagine or understand.',
  },
];

export function analyzeArgument(text: string): Match[] {
  const matches: Match[] = [];
  const seen = new Set<string>();

  for (const rule of rules) {
    const fallacy = fallacies.find((f) => f.id === rule.fallacyId);
    if (!fallacy) continue;

    for (const pattern of rule.patterns) {
      let m: RegExpExecArray | null;
      pattern.lastIndex = 0;
      while ((m = pattern.exec(text)) !== null) {
        const snippet = m[0];
        const start = m.index;
        const end = start + snippet.length;
        const key = `${rule.fallacyId}:${start}`;
        if (seen.has(key)) continue;
        seen.add(key);
        matches.push({
          fallacyId: fallacy.id,
          fallacyName: fallacy.name,
          shortDefinition: fallacy.shortDefinition,
          definition: fallacy.definition,
          snippet,
          start,
          end,
          explanation: rule.explanation(snippet),
        });
      }
    }
  }

  matches.sort((a, b) => a.start - b.start);
  return matches;
}

export function getFallacyById(id: string): Fallacy | undefined {
  return fallacies.find((f) => f.id === id);
}

export const sampleArguments: { label: string; text: string }[] = [
  {
    label: 'The suspicious expert',
    text: "Don't listen to her, she's just a liar and always has been, so her account is worthless. Besides, my professor said this method is unreliable, so it must be. And if we start questioning experts, soon nobody will trust any report from this station, and then the whole department will collapse.",
  },
  {
    label: 'The emotional appeal',
    text: "If you really cared about this family, you would arrest the obvious suspect tonight. Think about the children! Everyone at the station knows it was Lyle, so the case is settled. You can't prove he didn't do it, so he must be guilty.",
  },
  {
    label: 'The hasty conclusion',
    text: "I met two careless contractors and they both messed up, so all contractors are unreliable. My cousin tried this new method and it worked for him, so it will work for everyone. Either we ban all contractors or we accept that nothing will ever get done right.",
  },
];
