import { ArrowRight, Brain, Check, ChevronRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { Shell } from '@/components/Shell';
import { biases } from '@/data/biases';

export default function Biases() {
  const [query, setQuery] = useState('');
  const completed: string[] = JSON.parse(localStorage.getItem('mindframe-bias-completed') || '[]');
  const filtered = useMemo(() => biases.filter((bias) => `${bias.name} ${bias.shortDefinition}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return <Shell><div className="mf-page">
    <Link href="/city" className="mf-link" data-testid="link-back-city"><ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> City desk</Link>
    <div className="mf-bias-hero"><div><div className="mf-eyebrow">District 02 / cognitive archive</div><h1 className="mf-display">The bias<br /><em>district.</em></h1><p className="mf-lede">Thirty mental shortcuts hide in plain sight. Learn the pattern, test it against a scene, and make your own thinking harder to fool.</p></div><div className="mf-card mf-bias-progress"><Brain /><strong>{completed.length}<small> / {biases.length}</small></strong><span>catalogued</span><div className="mf-progress"><span style={{ width: `${(completed.length / biases.length) * 100}%` }} /></div><p>{completed.length === biases.length ? 'The archive is complete.' : `${biases.length - completed.length} patterns remain in the dark.`}</p></div></div>
    <div className="mf-section-head"><div><h2 className="mf-section-title">The archive</h2><p className="mf-section-copy">{filtered.length} entries · complete a lesson to earn 25 XP</p></div><label className="mf-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the archive" aria-label="Search biases" /></label></div>
    {filtered.length > 0 ? <div className="mf-bias-grid">{filtered.map((bias, index) => { const isComplete = completed.includes(bias.id); return <Link className={`mf-card mf-bias-card ${isComplete ? 'complete' : ''}`} href={`/district/biases/${bias.id}`} key={bias.id} data-testid={`card-bias-${bias.id}`}><span className="mf-bias-number">B/{String(index + 1).padStart(2, '0')}</span>{isComplete ? <span className="mf-bias-status"><Check size={11} /> Filed</span> : <span className="mf-bias-status">Open</span>}<h2>{bias.name}</h2><p>{bias.shortDefinition}</p><span className="mf-bias-read">Study pattern <ChevronRight size={13} /></span></Link>; })}</div> : <div className="mf-empty"><Brain /><h2>No matching pattern.</h2><p>Try a different phrase or clear the archive search.</p></div>}
  </div></Shell>;
}
