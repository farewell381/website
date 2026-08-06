import { ArrowLeft, ArrowRight, Check, CircleAlert, Lightbulb, RotateCcw, Target } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { Shell } from '@/components/Shell';
import { biasById, biases, type Bias } from '@/data/biases';

type QuizQuestion = { prompt: string; options: string[]; answer: string };

function buildQuiz(item: Bias): QuizQuestion[] {
  const otherOne = biases.find((bias) => bias.id !== item.id) || item;
  const otherTwo = biases.find((bias) => bias.id !== item.id && bias.id !== otherOne.id) || item;
  return [
    { prompt: 'Which description belongs in the archive?', options: [item.shortDefinition, otherOne.shortDefinition, otherTwo.shortDefinition], answer: item.shortDefinition },
    { prompt: 'Which field note demonstrates this pattern?', options: [item.detectiveExample, otherOne.detectiveExample, otherTwo.detectiveExample], answer: item.detectiveExample },
    { prompt: item.scenarioPrompt, options: item.scenarioChoices.map((choice) => choice.label), answer: item.scenarioChoices.find((choice) => choice.correct)?.label || item.scenarioChoices[0].label },
  ];
}

export default function BiasDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const item = biasById(params.id || '');
  const [scenarioChoice, setScenarioChoice] = useState<string | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<'correct' | 'wrong' | null>(null);
  const [complete, setComplete] = useState(false);
  const quiz = useMemo(() => buildQuiz(item), [item]);
  const completed: string[] = JSON.parse(localStorage.getItem('mindframe-bias-completed') || '[]');

  useEffect(() => {
    setComplete(completed.includes(item.id));
    setScenarioChoice(null);
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
  }, [item.id]);

  const answerQuiz = (answer: string) => {
    if (quizResult) return;
    const nextAnswers = [...quizAnswers, answer];
    setQuizAnswers(nextAnswers);
    setQuizResult(answer === quiz[quizStep].answer ? 'correct' : 'wrong');
  };

  const nextQuestion = () => {
    if (quizStep < quiz.length - 1) {
      setQuizStep((step) => step + 1);
      setQuizResult(null);
      return;
    }
    const score = quizAnswers.filter((answer, index) => answer === quiz[index].answer).length;
    if (score >= 2 && !completed.includes(item.id)) {
      const nextCompleted = [...completed, item.id];
      localStorage.setItem('mindframe-bias-completed', JSON.stringify(nextCompleted));
      localStorage.setItem('mindframe-xp', String(Number(localStorage.getItem('mindframe-xp') || 0) + 25));
      setComplete(true);
    }
    setLocation('/district/biases');
  };

  return <Shell><div className="mf-page mf-bias-detail">
    <Link href="/district/biases" className="mf-link" data-testid="link-back-biases"><ArrowLeft size={14} /> Bias archive</Link>
    <header className="mf-bias-detail-head"><div><div className="mf-eyebrow">Bias file / {item.id}</div><h1>{item.name}</h1><p>{item.shortDefinition}</p></div><div className={`mf-bias-file-mark ${complete ? 'complete' : ''}`}>{complete ? <><Check size={17} /> Filed</> : <>B/{String(biases.findIndex((bias) => bias.id === item.id) + 1).padStart(2, '0')}</>}</div></header>
    <div className="mf-bias-detail-grid"><main>
      <section className="mf-card mf-bias-reading"><div className="mf-reading-kicker">The pattern</div><h2>{item.definition}</h2><div className="mf-reading-columns"><div><span>In the field</span><p>{item.detectiveExample}</p></div><div><span>In ordinary life</span><p>{item.realWorldExample}</p></div></div></section>
      <section className="mf-card mf-scenario"><div className="mf-step-label"><Target size={14} /> Field exercise / 01</div><h2>Test the instinct.</h2><p className="mf-scenario-prompt">{item.scenarioPrompt}</p><div className="mf-choice-list">{item.scenarioChoices.map((choice) => <button className={`mf-choice ${scenarioChoice === choice.label ? choice.correct ? 'right' : 'wrong' : ''}`} onClick={() => setScenarioChoice(choice.label)} key={choice.label} data-testid={`button-scenario-${item.id}-${choice.label.slice(0, 8)}`}>{choice.label}{scenarioChoice === choice.label && (choice.correct ? <Check size={15} /> : <CircleAlert size={15} />)}</button>)}</div>{scenarioChoice && <div className={`mf-feedback ${item.scenarioChoices.find((choice) => choice.label === scenarioChoice)?.correct ? 'right' : 'wrong'}`}><strong>{item.scenarioChoices.find((choice) => choice.label === scenarioChoice)?.correct ? 'Good read.' : 'Look again.'}</strong><span>{item.scenarioChoices.find((choice) => choice.label === scenarioChoice)?.feedback}</span></div>}</section>
      <section className="mf-card mf-quiz"><div className="mf-step-label"><Lightbulb size={14} /> Archive check / 02</div><div className="mf-quiz-head"><div><span>Question {quizStep + 1} of {quiz.length}</span><h2>Can you spot it?</h2></div><div className="mf-quiz-dots">{quiz.map((_, index) => <i className={index <= quizStep ? 'active' : ''} key={index} />)}</div></div><p className="mf-quiz-prompt">{quiz[quizStep].prompt}</p><div className="mf-choice-list">{quiz[quizStep].options.map((option) => <button className={`mf-choice ${quizResult && option === quiz[quizStep].answer ? 'right' : quizResult && quizAnswers[quizAnswers.length - 1] === option ? 'wrong' : ''}`} onClick={() => answerQuiz(option)} disabled={Boolean(quizResult)} key={option} data-testid={`button-quiz-${quizStep}-${option.slice(0, 8)}`}>{option}{quizResult && option === quiz[quizStep].answer && <Check size={15} />}</button>)}</div>{quizResult && <div className={`mf-feedback ${quizResult}`}><strong>{quizResult === 'correct' ? 'Correct.' : 'Not quite.'}</strong><span>{quizResult === 'correct' ? 'The evidence supports that read.' : `The archive answer was: ${quiz[quizStep].answer}`}</span><button className="mf-button" onClick={nextQuestion}>{quizStep === quiz.length - 1 ? 'File lesson' : 'Next question'} <ArrowRight size={14} /></button></div>}</section>
    </main><aside className="mf-bias-side"><div className="mf-card mf-tool-card"><div className="mf-eyebrow">Field note</div><h2>Do not confuse a shortcut with a verdict.</h2><p>Biases are not proof that someone is foolish or dishonest. They are patterns to check in yourself, your team, and the story in front of you.</p><div className="mf-side-rule" /></div><div className="mf-card mf-tool-card"><div className="mf-eyebrow">Lesson status</div><strong className="mf-side-score">{complete ? '25 XP' : '25 XP'}</strong><p>{complete ? 'This pattern is already in your notebook.' : 'Score at least 2 of 3 questions to file this pattern.'}</p><Link href="/district/biases" className="mf-link">Return to archive <ArrowRight size={13} /></Link></div><button className="mf-reset-link" onClick={() => { setScenarioChoice(null); setQuizStep(0); setQuizAnswers([]); setQuizResult(null); }}><RotateCcw size={13} /> Reset lesson</button></aside></div>
  </div></Shell>;
}
