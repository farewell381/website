import { ArrowLeft, ArrowRight, Check, Lightbulb, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { Shell } from '@/components/Shell';
import { academyLessons, speakers, type Lesson } from '@/data/academyLessons';
import { fallacies } from '@/data/fallacies';

function loadCompletedLessons() {
  if (typeof window === 'undefined') return [] as string[];
  try {
    return JSON.parse(localStorage.getItem('mindframe-academy-completed') || '[]') as string[];
  } catch {
    return [] as string[];
  }
}

function saveCompletedLessons(completedLessons: string[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mindframe-academy-completed', JSON.stringify(completedLessons));
}

function addAcademyXp(xp: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mindframe-xp', String(Number(localStorage.getItem('mindframe-xp') || '0') + xp));
}

function isLessonUnlocked(lesson: Lesson, completedLessons: string[]) {
  if (lesson.order === 1) return true;
  const previous = academyLessons.find((item) => item.order === lesson.order - 1);
  return Boolean(previous && completedLessons.includes(previous.id));
}

export default function DetectiveAcademy() {
  const [completedLessons, setCompletedLessons] = useState<string[]>(loadCompletedLessons);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const completedFallacies = useMemo(() => {
    if (typeof window === 'undefined') return [] as string[];
    return JSON.parse(localStorage.getItem('mindframe-fallacy-completed') || '[]') as string[];
  }, []);

  const academyUnlocked = completedFallacies.length === fallacies.length;
  const selectedLesson = academyLessons.find((lesson) => lesson.id === selectedLessonId) ?? null;
  const filteredLessons = useMemo(
    () => academyLessons.filter((lesson) => `${lesson.title} ${lesson.teaser}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  useEffect(() => {
    if (!selectedLessonId) {
      setQuestionIndex(0);
      setSelectedOption(null);
      setAnswers([]);
      setQuizComplete(false);
      setQuizScore(null);
    }
  }, [selectedLessonId]);

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
  };

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null || !selectedLesson) return;

    const nextAnswers = [...answers, selectedOption];
    setAnswers(nextAnswers);
    setSelectedOption(null);

    if (questionIndex < selectedLesson.quiz.length - 1) {
      setQuestionIndex((current) => current + 1);
      return;
    }

    const score = nextAnswers.filter((answer, index) => answer === selectedLesson.quiz[index].correctIndex).length;
    setQuizScore(score);
    setQuizComplete(true);

    if (!completedLessons.includes(selectedLesson.id)) {
      const nextCompleted = [...completedLessons, selectedLesson.id];
      setCompletedLessons(nextCompleted);
      saveCompletedLessons(nextCompleted);
      addAcademyXp(selectedLesson.xp);
    }
  };

  const completedCount = completedLessons.length;
  const lessonStatusText = academyUnlocked
    ? `${completedCount} of ${academyLessons.length} lessons complete`
    : 'Locked until you finish the Fallacy District.';

  return (
    <Shell>
      <div className="mf-page">
        <Link href="/city" className="mf-link" data-testid="link-back-city-academy">
          <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} /> City desk
        </Link>

        <div className="mf-bias-hero">
          <div>
            <div className="mf-eyebrow">District 04 / Detective Academy</div>
            <h1 className="mf-display">The detective<br /><em>academy.</em></h1>
            <p className="mf-lede">Train in the classroom that prepares you to question your own thinking first. Dialogue, quizzes, and checkpoints make the learning feel like a case file, not a textbook.</p>
          </div>
          <div className="mf-card mf-bias-progress">
            <Lightbulb />
            <strong>{completedCount}<small> / {academyLessons.length}</small></strong>
            <span>{lessonStatusText}</span>
            <div className="mf-progress"><span style={{ width: `${(completedCount / academyLessons.length) * 100}%` }} /></div>
            <p>{academyUnlocked ? 'Complete a lesson to earn XP and unlock the next module.' : 'Finish the Fallacy District to enter the Academy.'}</p>
          </div>
        </div>

        {!academyUnlocked ? (
          <div className="mf-card mf-bias-reading">
            <h2>Academy locked.</h2>
            <p>Vantage City requires you to complete the Fallacy District before you can begin formal training. Return once you have the argument archive under your belt.</p>
          </div>
        ) : selectedLesson ? (
          <div className="mf-bias-detail-grid">
            <main>
              <section className="mf-card mf-bias-reading">
                <div className="mf-reading-kicker"><Lightbulb size={14} /> Lesson overview</div>
                <h2>{selectedLesson.title}</h2>
                <p>{selectedLesson.teaser}</p>
                <div className="mf-reading-columns">
                  <div>
                    <span>Lesson order</span>
                    <p>{selectedLesson.order} / {academyLessons.length}</p>
                  </div>
                  <div>
                    <span>XP reward</span>
                    <p>{selectedLesson.xp} XP</p>
                  </div>
                </div>
              </section>

              <section className="mf-card mf-scenario">
                <div className="mf-step-label"><Lightbulb size={14} /> Dialogue</div>
                <div className="space-y-4">
                  {selectedLesson.dialogue.map((line, index) => (
                    <div key={`${line.speaker}-${index}`} className="mf-lesson-line">
                      <div className="mf-lesson-speaker" style={{ color: speakers[line.speaker].color }}>
                        {speakers[line.speaker].name}
                      </div>
                      <p>{line.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mf-card mf-quiz">
                <div className="mf-step-label"><Lightbulb size={14} /> Quiz</div>
                {quizComplete ? (
                  <div>
                    <h2>{selectedLesson.title} complete</h2>
                    <p>You answered {quizScore} of {selectedLesson.quiz.length} questions correctly.</p>
                    <button className="mf-button" onClick={() => setSelectedLessonId(null)}>
                      Return to Academy <ArrowRight size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="mf-quiz-prompt">{selectedLesson.quiz[questionIndex].question}</p>
                    <div className="mf-choice-list">
                      {selectedLesson.quiz[questionIndex].options.map((option, index) => (
                        <button
                          key={option}
                          type="button"
                          className={`mf-choice ${selectedOption === index ? 'active' : ''}`}
                          onClick={() => handleAnswer(index)}
                          data-testid={`button-academy-question-${questionIndex}-${index}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {selectedOption !== null && (
                      <div className="mf-feedback right">
                        <strong>{selectedOption === selectedLesson.quiz[questionIndex].correctIndex ? 'Correct.' : 'Not quite.'}</strong>
                        <span>{selectedLesson.quiz[questionIndex].explanation}</span>
                        <button className="mf-button" onClick={handleNextQuestion}>
                          {questionIndex === selectedLesson.quiz.length - 1 ? 'Finish lesson' : 'Next question'} <ArrowRight size={14} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </section>
            </main>

            <aside className="mf-bias-side">
              <div className="mf-card mf-tool-card">
                <div className="mf-eyebrow">Training note</div>
                <h2>What the Academy teaches.</h2>
                <p>These lessons are built to make you question assumptions early. The point is not to feel clever — it is to make the next choice harder to get wrong.</p>
                <div className="mf-side-rule" />
              </div>
              <div className="mf-card mf-tool-card">
                <div className="mf-eyebrow">Lesson progress</div>
                <strong className="mf-side-score">{completedCount * 20} XP</strong>
                <p>{completedLessons.includes(selectedLesson.id) ? 'You already completed this module.' : 'Answer the quiz and finish the lesson to file it in your notebook.'}</p>
                <Link href="/district/academy" className="mf-link">Back to lessons <ArrowRight size={13} /></Link>
              </div>
            </aside>
          </div>
        ) : (
          <>
            <div className="mf-section-head">
              <div>
                <h2 className="mf-section-title">Course roster</h2>
                <p className="mf-section-copy">{filteredLessons.length} lessons · complete them in order to unlock the next module.</p>
              </div>
              <label className="mf-search">
                <Search size={14} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search lessons" aria-label="Search lessons" />
              </label>
            </div>

            <div className="mf-bias-grid">
              {filteredLessons.map((lesson) => {
                const unlocked = isLessonUnlocked(lesson, completedLessons);
                const completed = completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    className={`mf-card mf-bias-card ${completed ? 'complete' : ''} ${!unlocked ? 'locked' : ''}`}
                    onClick={() => unlocked && handleSelectLesson(lesson.id)}
                    disabled={!unlocked}
                    data-testid={`card-academy-${lesson.id}`}
                  >
                    <span className="mf-bias-number">A/{String(lesson.order).padStart(2, '0')}</span>
                    {completed ? <span className="mf-bias-status"><Check size={11} /> Completed</span> : <span className="mf-bias-status">{unlocked ? 'Open' : 'Locked'}</span>}
                    <h2>{lesson.title}</h2>
                    <p>{lesson.teaser}</p>
                    <span className="mf-bias-read">{unlocked ? 'Open lesson' : 'Unlock previous lesson'} <ArrowRight size={13} /></span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </Shell>
  );
}
