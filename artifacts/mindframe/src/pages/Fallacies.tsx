import { ArrowRight, Check, ChevronRight, Search, Scale } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { Shell } from '@/components/Shell';
import { fallacies } from '@/data/fallacies';

export default function Fallacies() {
  const [query, setQuery] = useState('');
  const completed: string[] = JSON.parse(localStorage.getItem('mindframe-fallacy-completed') || '[]');
  const filtered = useMemo(() => fallacies.filter((fallacy) => `${fallacy.name} ${fallacy.shortDefinition}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return <Shell><div className="mf-page">
    <Link href="/city" className="mf-link" data-testid="link-back-city-fallacies"><ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> City desk</Link>
    <div className="mf-bias-hero"><div><div className="mf-eyebrow">District 03 / argument archive</div><h1 className="mf-display">The fallacy<br /><em>district.</em></h1><p className="mf-lede">Thirty ways an argument can sound stronger than it is. Follow the claim, find the hidden turn, and keep the evidence on the page.</p></div><div className="mf-card mf-bias-progress"><Scale /><strong>{completed.length}<small> / {fallacies.length}</small></strong><span>catalogued</span><div className="mf-progress"><span style={{ width: `${(completed.length / fallacies.length) * 100}%` }} /></div><p>{completed.length === fallacies.length ? 'The archive is complete.' : `${fallacies.length - completed.length} arguments remain to be examined.`}</p></div></div>
    <div className="mf-section-head"><div><h2 className="mf-section-title">The argument archive</h2><p className="mf-section-copy">{filtered.length} entries · complete a lesson to earn 25 XP</p></div><label className="mf-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the archive" aria-label="Search fallacies" /></label></div>
    {filtered.length > 0 ? <div className="mf-bias-grid">{filtered.map((fallacy, index) => { const isComplete = completed.includes(fallacy.id); return <Link className={`mf-card mf-bias-card ${isComplete ? 'complete' : ''}`} href={`/district/fallacies/${fallacy.id}`} key={fallacy.id} data-testid={`card-fallacy-${fallacy.id}`}><span className="mf-bias-number">F/{String(index + 1).padStart(2, '0')}</span>{isComplete ? <span className="mf-bias-status"><Check size={11} /> Filed</span> : <span className="mf-bias-status">Open</span>}<h2>{fallacy.name}</h2><p>{fallacy.shortDefinition}</p><span className="mf-bias-read">Study argument <ChevronRight size={13} /></span></Link>; })}</div> : <div className="mf-empty"><Scale /><h2>No matching argument.</h2><p>Try a different phrase or clear the archive search.</p></div>}
  </div></Shell>;
}
