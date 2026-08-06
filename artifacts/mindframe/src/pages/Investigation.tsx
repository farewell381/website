import { ArrowLeft, BookOpen, Check, ChevronRight, CircleAlert, FileSearch, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { Shell } from '@/components/Shell';
import { cases, tags, type Tag } from '@/data/cases';

export default function Investigation() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const item = cases.find((entry) => entry.id === params.id) || cases[0];
  const [selected, setSelected] = useState(item.suspects[0].id);
  const [marked, setMarked] = useState<Record<string, Tag[]>>({});
  const [accusation, setAccusation] = useState('');
  const [drawer, setDrawer] = useState(false);
  const [result, setResult] = useState<{ correct: boolean; score: number } | null>(null);
  useEffect(() => { localStorage.setItem('mindframe-last-case', item.id); }, [item.id]);
  const current = item.suspects.find((suspect) => suspect.id === selected) || item.suspects[0];
  const currentTags = marked[selected] || [];
  const totalTags = useMemo(() => Object.values(marked).flat().length, [marked]);
  const addTag = (tag: Tag) => setMarked((old) => ({ ...old, [selected]: [...(old[selected] || []), tag] }));
  const removeTag = (tag: Tag) => setMarked((old) => ({ ...old, [selected]: (old[selected] || []).filter((entry) => entry !== tag) }));
  const submit = () => {
    const tagHits = item.suspects.reduce((count, suspect) => count + (marked[suspect.id] || []).filter((tag) => suspect.tags.includes(tag)).length, 0);
    const tagTotal = item.suspects.reduce((count, suspect) => count + suspect.tags.length, 0);
    const correct = accusation === item.accusation;
    const score = (correct ? 55 : 0) + Math.round((tagHits / tagTotal) * 45);
    setResult({ correct, score });
    if (!JSON.parse(localStorage.getItem('mindframe-completed') || '[]').includes(item.id)) {
      const completed: string[] = JSON.parse(localStorage.getItem('mindframe-completed') || '[]');
      localStorage.setItem('mindframe-completed', JSON.stringify([...completed, item.id]));
      localStorage.setItem('mindframe-xp', String(Number(localStorage.getItem('mindframe-xp') || 0) + item.xp));
    }
  };
  if (result) return <Shell><div className="mf-page"><div className="mf-card mf-result"><div className="mf-result-mark">{result.correct ? <Check /> : <CircleAlert />}</div><div className="mf-eyebrow">{result.correct ? 'A clean read' : 'The thread slips away'}</div><h1>{result.correct ? 'Case closed.' : 'Not quite, detective.'}</h1><p>{result.correct ? `You identified ${item.victim}'s killer and kept your assumptions in check. The city will remember the detail.` : `Your accusation missed the mark. The evidence was trying to tell you something else. Your notes are still valuable.`}</p><div className="mf-score"><div><strong>{result.score}%</strong><span>Read accuracy</span></div><div><strong>+{item.xp}</strong><span>Experience earned</span></div></div><div className="mf-hero-actions" style={{ justifyContent: 'center' }}><Link href="/cases" className="mf-button" data-testid="button-return-cases">Return to files <ArrowLeft /></Link><button className="mf-button secondary" onClick={() => setResult(null)} data-testid="button-review-case">Review evidence</button></div></div></div></Shell>;
  return <Shell><div className="mf-page mf-investigation"><Link href="/cases" className="mf-link" data-testid="link-back-cases"><ArrowLeft size={14} /> All case files</Link><header className="mf-case-header" style={{ marginTop: 25 }}><div><div className="mf-eyebrow">File 0{cases.findIndex((entry) => entry.id === item.id) + 1} / {item.location}</div><h1>{item.title}</h1><p>{item.synopsis} The deceased: <strong>{item.victim}</strong>, {item.date}.</p></div><div className="mf-case-header-side"><strong>{item.xp} XP</strong><span>{item.difficulty} investigation</span></div></header>
    <div className="mf-investigate-grid"><section className="mf-statements"><div className="mf-instruction"><span><strong>Read the room.</strong> Select a statement, then mark the reasoning that does not hold.</span><span>{totalTags} tags placed</span></div>{item.suspects.map((suspect) => <button className={`mf-statement ${selected === suspect.id ? 'selected' : ''}`} key={suspect.id} onClick={() => setSelected(suspect.id)} data-testid={`button-statement-${suspect.id}`}><div className="mf-statement-head"><span className="mf-statement-name">{suspect.name}</span><span className="mf-statement-role">{suspect.role}</span></div><blockquote>“{suspect.statement}”</blockquote>{(marked[suspect.id] || []).length > 0 && <div className="mf-tag-row">{marked[suspect.id].map((tag) => <span className="mf-tag" key={tag}>{tag}<button onClick={(event) => { event.stopPropagation(); removeTag(tag); }} aria-label={`Remove ${tag}`} data-testid={`button-remove-tag-${suspect.id}-${tag}`}><X /></button></span>)}</div>}</button>)}</section>
      <aside className="mf-sidebar-stack"><div className="mf-card mf-tool-card"><h2>Reasoning tags</h2><p>Mark the tactic in <strong>{current.name}</strong>’s statement.</p>{tags.map((tag) => <button className="mf-tag-button" disabled={currentTags.includes(tag)} onClick={() => addTag(tag)} key={tag} data-testid={`button-tag-${tag}`}>{currentTags.includes(tag) ? 'Marked · ' : '+ '}{tag}</button>)}</div><div className="mf-card mf-tool-card"><h2>Evidence drawer</h2>{item.clues.map((clue) => <button className="mf-clue-button" onClick={() => setDrawer(true)} key={clue.id} data-testid={`button-clue-${clue.id}`}><FileSearch /> {clue.title}<ChevronRight size={13} style={{ marginLeft: 'auto' }} /></button>)}</div><div className="mf-card mf-tool-card"><h2>Make the call</h2><p>Who arranged the scene?</p><div className="mf-accusation">{item.suspects.map((suspect) => <button className={`mf-accuse-option ${accusation === suspect.id ? 'selected' : ''}`} onClick={() => setAccusation(suspect.id)} key={suspect.id} data-testid={`button-accuse-${suspect.id}`}>{suspect.name}</button>)}</div><div className="mf-submit-bar"><span className="mf-submit-note">One accusation.<br />Read it twice.</span><button className="mf-button" disabled={!accusation} onClick={submit} data-testid="button-submit-accusation">Submit</button></div></div></aside></div>
  </div>{drawer && <><div className="mf-drawer-backdrop" onClick={() => setDrawer(false)} /><aside className="mf-drawer"><div className="mf-drawer-head"><div><div className="mf-eyebrow">Collected evidence</div><h2>Clue ledger</h2></div><button className="mf-icon-button" onClick={() => setDrawer(false)} data-testid="button-close-drawer"><X /></button></div>{item.clues.map((clue) => <div className="mf-clue" key={clue.id}><div className="mf-clue-kicker">{clue.type}</div><h3>{clue.title}</h3><p>{clue.detail}</p></div>)}</aside></>}</Shell>;
}