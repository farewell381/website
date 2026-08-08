import { useState } from 'react';
import { ArrowRight, NotebookPen, Trophy } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Shell } from '@/components/Shell';
import DistrictCard from '@/components/DistrictCard';
import { cases } from '@/data/cases';
import { biases } from '@/data/biases';
import { fallacies } from '@/data/fallacies';

const loreItems = [
  { id: 'bias', label: 'Bias District', description: 'The Bias District is your evidence archive. Thirty cognitive traps are laid out with detective-context examples so you can spot them before they become case-breaking assumptions.' },
  { id: 'fallacy', label: 'Fallacy District', description: 'The Fallacy District is where arguments are decoded. Every bad reason follows one of thirty patterns, and the more you know, the harder it is for anyone to fool you.' },
  { id: 'academy', label: 'Detective Academy', description: 'The Academy trains you through dialogue and practical lessons rather than dry theory. Each module sharpens your instincts for the evidence that matters most.' },
  { id: 'decision', label: 'Decision Lab', description: 'The Decision Lab tests how your judgment holds up under pressure. Your choices are scored, and the outcomes link back to the biases that shaped them.' },
  { id: 'argument', label: 'Argument Analyzer', description: 'The Analyzer lets you drop in real arguments and see what reasoning errors hide inside. It turns everyday rhetoric into a case file you can solve.' },
  { id: 'mindpalace', label: 'Mind Palace', description: 'The Mind Palace stores notes, biases, and fallacies so you can review them later. It is the difference between simply recognizing an error and remembering it when it matters.' },
  { id: 'achievements', label: 'Achievements', description: 'Achievements track your progress through cases, districts, and mental shortcuts. They let you see how far your detective instincts have come.' },
] as const;

type LoreItemId = (typeof loreItems)[number]['id'];

export default function City() {
  const xp = Number(localStorage.getItem('mindframe-xp') || '0');
  const completed: string[] = JSON.parse(localStorage.getItem('mindframe-completed') || '[]');
  const completedBiases: string[] = JSON.parse(localStorage.getItem('mindframe-bias-completed') || '[]');
  const completedFallacies: string[] = JSON.parse(localStorage.getItem('mindframe-fallacy-completed') || '[]');
  const [activeLore, setActiveLore] = useState<LoreItemId>('bias');
  const [showDossier, setShowDossier] = useState(false);
  const [, setLocation] = useLocation();
  const unlocked = cases.filter((c) => c.unlocked || completed.includes(c.id)).length;
  const decisionLabUnlocked = completedFallacies.length === fallacies.length;
  const activeLoreItem = loreItems.find((item) => item.id === activeLore)!;

  const openDistrict = (path: string) => {
    setLocation(path);
  };

  return <Shell><div className="mf-page"><section className="mf-city-hero"><div><div className="mf-eyebrow">Vantage City / Night shift / 23:48</div><h1 className="mf-display">Vantage City is<br /><em>still awake.</em></h1><p className="mf-lede">Welcome back, detective. The desk lamp is warm, the files are waiting, and somewhere in Vantage City a story has been told incorrectly.</p></div><div className="mf-card mf-progress-card"><div className="mf-progress-number"><strong>{xp.toLocaleString()} XP</strong><span>Rank {xp > 500 ? 'Observer' : 'Rookie'}</span></div><div className="mf-progress"><span style={{ width: `${Math.min(100, (xp / 1200) * 100)}%` }} /></div><p className="mf-progress-caption">{completed.length} of 5 files closed · {unlocked} districts accessible</p></div></section>
    <div className="mf-section-head"><div><h2 className="mf-section-title">Choose your district</h2><p className="mf-section-copy">Every case is a different way of seeing.</p></div><Link href="/cases" className="mf-link" data-testid="link-all-cases">View all files <ArrowRight size={14} /></Link></div>
    <div className="mf-districts">
      <DistrictCard
        districtId="crime-scene"
        title="District 01"
        subtitle="You already spot lies in movies. Real suspects are harder — and way more satisfying to catch."
        onClick={() => openDistrict('/cases')}
      />
      <DistrictCard
        districtId="bias-district"
        title="District 02 / Complete"
        subtitle="Your brain cuts corners without asking you. Learn its favorite tricks before they cost you a case — or a real decision."
        onClick={() => openDistrict('/district/biases')}
      />
      <DistrictCard
        districtId="fallacy-district"
        title="District 03 / New"
        subtitle="Every bad argument you'll ever hear follows one of thirty patterns. Learn them once, spot them forever."
        onClick={() => openDistrict('/district/fallacies')}
      />
      <DistrictCard
        districtId="detective-academy"
        title="District 04 / Locked"
        subtitle="Skip the theory-heavy textbook. Learn the same skills through cases that actually make you think."
        onClick={() => openDistrict('/district/academy')}
        locked
      />
      {decisionLabUnlocked ? (
        <DistrictCard
          districtId="decision-lab"
          title="District 05"
          subtitle="This is where 'I would've caught that' gets tested. See how your snap judgments hold up."
          onClick={() => openDistrict('/district/decision')}
        />
      ) : (
        <DistrictCard
          districtId="decision-lab"
          title="District 05 / Locked"
          subtitle="Complete the Fallacy District to unlock the lab."
          locked
        />
      )}
    </div>
    <div className="mf-districts">
      <div className="mf-district mf-district-locked"><FileSearch /><span>District 06 / Locked</span><h3>Argument Analyzer</h3><p>Got a real argument you're stuck on — an email, a debate, a headline? Drop it in and see what's actually wrong with it.</p><small className="mf-district-unlock">Locked. Complete Decision Lab to unlock.</small></div>
      <div className="mf-district mf-district-locked"><NotebookPen /><span>District 07 / Locked</span><h3>Mind Palace</h3><p>Knowing a bias once isn't the same as remembering it when it matters. This is how you make it stick.</p><small className="mf-district-unlock">Locked. Complete Argument Analyzer to unlock.</small></div>
      <div className="mf-district mf-district-locked"><Trophy /><span>District 08 / Locked</span><h3>Achievements</h3><p>Every case cracked is a bias you won't fall for again. Track how far you've come.</p><small className="mf-district-unlock">Locked. Complete Mind Palace to unlock.</small></div>
    </div>
    <section className="mf-briefing-card"><div className="mf-eyebrow">Vantage City / Field briefing</div><h2 className="mf-briefing-heading">Phase 3 is ready. Fallacy District is next.</h2><p className="mf-briefing-copy">Complete the next phase to unlock Detective Academy, Decision Lab, Argument Analyzer, Mind Palace, and Achievements. The city is watching for the detective who can see through both lies and bad logic.</p></section>
    <section className="mf-lore-section"><div className="mf-lore-tabs">{loreItems.map((item) => <button key={item.id} type="button" className={`mf-lore-button ${activeLore === item.id ? 'active' : ''}`} onClick={() => setActiveLore(item.id)}>{item.label}</button>)}</div><div className="mf-lore-copy"><p>{activeLoreItem.description}</p></div></section>
    <section className="mf-dossier-card"><div className="mf-dossier-header"><NotebookPen /><div><span className="mf-eyebrow">Detective dossier</span><h3>Detective Vera Quinn</h3></div></div><p>Detective Quinn has built her career on quiet evidence, deliberate questions, and the kind of instinct that only comes from working every shift in Vantage City.</p><button type="button" className="mf-link mf-dossier-toggle" onClick={() => setShowDossier((current) => !current)}>{showDossier ? 'Collapse dossier' : 'Expand dossier'}</button>{showDossier ? <div className="mf-dossier-details"><ul><li><strong>Years on the beat:</strong> 15</li><li><strong>Style:</strong> Evidence-first, story-second.</li><li><strong>Advice:</strong> The cleanest lie is the one you never question.</li></ul></div> : null}</section>
    <div className="mf-section-head"><div><h2 className="mf-section-title">Your field notes</h2><p className="mf-section-copy">A small record of the work.</p></div></div>
    <div className="mf-stat-grid"><div className="mf-stat"><span className="mf-stat-value">{completed.length}</span><span className="mf-stat-label">Files closed</span></div><div className="mf-stat"><span className="mf-stat-value">{xp}</span><span className="mf-stat-label">Experience</span></div><div className="mf-stat"><span className="mf-stat-value">{completedBiases.length}<small> / {biases.length}</small></span><span className="mf-stat-label">Biases catalogued</span></div><div className="mf-stat"><span className="mf-stat-value">{completedFallacies.length}<small> / {fallacies.length}</small></span><span className="mf-stat-label">Fallacies catalogued</span></div></div>
  </div></Shell>;
}