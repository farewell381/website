import { ArrowRight, Brain, Map, MapPin, Shield, Star } from 'lucide-react';
import { Link } from 'wouter';
import { Shell } from '@/components/Shell';
import { cases } from '@/data/cases';
import { biases } from '@/data/biases';

export default function City() {
  const xp = Number(localStorage.getItem('mindframe-xp') || '0');
  const completed: string[] = JSON.parse(localStorage.getItem('mindframe-completed') || '[]');
  const completedBiases: string[] = JSON.parse(localStorage.getItem('mindframe-bias-completed') || '[]');
  const unlocked = cases.filter((c) => c.unlocked || completed.includes(c.id)).length;
  return <Shell><div className="mf-page"><section className="mf-city-hero"><div><div className="mf-eyebrow">Night shift / 23:48</div><h1 className="mf-display">The city is<br /><em>still awake.</em></h1><p className="mf-lede">Welcome back, detective. The desk lamp is warm, the files are waiting, and somewhere in the city a story has been told incorrectly.</p></div><div className="mf-card mf-progress-card"><div className="mf-progress-number"><strong>{xp.toLocaleString()} XP</strong><span>Rank {xp > 500 ? 'Observer' : 'Rookie'}</span></div><div className="mf-progress"><span style={{ width: `${Math.min(100, (xp / 1200) * 100)}%` }} /></div><p className="mf-progress-caption">{completed.length} of 5 files closed · {unlocked} districts accessible</p></div></section>
    <div className="mf-section-head"><div><h2 className="mf-section-title">Choose your district</h2><p className="mf-section-copy">Every case is a different way of seeing.</p></div><Link href="/cases" className="mf-link" data-testid="link-all-cases">View all files <ArrowRight size={14} /></Link></div>
    <div className="mf-districts"><Link href="/cases" className="mf-district mf-district-link" data-testid="link-district-crime"><MapPin /><span>District 01</span><h3>Crime Scene</h3><p>Five files. Every statement leaves a trace.</p></Link><Link href="/district/biases" className="mf-district mf-district-link mf-district-featured" data-testid="link-district-biases"><Brain /><span>District 02 / New</span><h3>Bias District</h3><p>{completedBiases.length} of {biases.length} mental shortcuts catalogued.</p><strong className="mf-district-action">Enter archive <ArrowRight size={13} /></strong></Link><div className="mf-district mf-district-locked"><Shield /><span>District 03</span><h3>The Outer Ring</h3><p>{unlocked >= 3 ? 'New files have surfaced.' : 'Unlocks after two closed files.'}</p></div></div>
    <div className="mf-section-head"><div><h2 className="mf-section-title">Your field notes</h2><p className="mf-section-copy">A small record of the work.</p></div></div>
    <div className="mf-stat-grid"><div className="mf-stat"><span className="mf-stat-value">{completed.length}</span><span className="mf-stat-label">Files closed</span></div><div className="mf-stat"><span className="mf-stat-value">{xp}</span><span className="mf-stat-label">Experience</span></div><div className="mf-stat"><span className="mf-stat-value">{completedBiases.length}<small> / {biases.length}</small></span><span className="mf-stat-label">Biases catalogued</span></div></div>
  </div></Shell>;
}