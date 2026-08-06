import { ArrowRight, Check, Lock, MapPin } from 'lucide-react';
import { Link } from 'wouter';
import { Shell } from '@/components/Shell';
import { cases } from '@/data/cases';

export default function Cases() {
  const completed: string[] = JSON.parse(localStorage.getItem('mindframe-completed') || '[]');
  return <Shell><div className="mf-page"><div className="mf-eyebrow">Municipal records / active files</div><h1 className="mf-display">The case<br /><em>board.</em></h1><p className="mf-lede">Five investigations across a city that prefers its truths incomplete. Start with the open files; each closed case makes the next one visible.</p>
    <div className="mf-section-head"><div><h2 className="mf-section-title">Open investigations</h2><p className="mf-section-copy">{completed.length} closed · {cases.length - completed.length} remaining</p></div></div>
    <div className="mf-case-grid">{cases.map((item, index) => { const isDone = completed.includes(item.id); const isUnlocked = item.unlocked || completed.length >= index - 1; const isLocked = !isUnlocked && !isDone; return <article className={`mf-card mf-case-card ${isLocked ? 'locked' : ''}`} key={item.id} data-testid={`card-case-${item.id}`}><span className="mf-case-num">FILE 0{index + 1}</span><span className={`mf-case-status ${isLocked ? 'locked-label' : ''}`}>{isDone ? <><Check size={12} /> Closed</> : isLocked ? <><Lock size={11} /> Sealed</> : 'Open'}</span><h2 className="mf-case-title">{item.title}</h2><p className="mf-case-synopsis">{item.synopsis}</p><div className="mf-case-meta"><span><MapPin size={11} /> {item.location}</span><span>{item.difficulty}</span><span>{item.xp} XP</span></div>{!isLocked && <Link href={`/cases/${item.id}`} className="mf-link" style={{ marginTop: 18 }} data-testid={`link-case-${item.id}`}>Open file <ArrowRight size={13} /></Link>}</article>; })}</div>
  </div></Shell>;
}