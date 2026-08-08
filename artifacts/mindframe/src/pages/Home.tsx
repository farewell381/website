import { ArrowRight, Eye, Fingerprint, Lightbulb } from 'lucide-react';
import { Link } from 'wouter';
import { Brand } from '@/components/Shell';

export default function Home() {
  return <div className="mf-home">
    <header className="mf-home-nav"><Brand /><Link href="/city" className="mf-link" data-testid="link-enter-desk">Enter Vantage City <ArrowRight size={14} /></Link></header>
     <section className="mf-home-hero"><div className="mf-hero-copy"><div className="mf-eyebrow">A noir detective challenge</div><h1 className="mf-display">Mindframe trains your mind to detect deception. <em>Solve the case, not the trap.</em></h1><p className="mf-lede">MINDFRAME is a noir-themed detective game that teaches critical thinking through murder investigations. Inspect suspect statements, identify cognitive biases and logical fallacies, review clues, accuse a suspect, and earn XP.</p><div className="mf-hero-actions"><Link href="/city" className="mf-button" data-testid="button-start-investigating">ENTER VANTAGE CITY <ArrowRight /></Link><Link href="/cases" className="mf-button secondary" data-testid="button-browse-cases">Browse case files</Link></div></div>
      <div className="mf-desk-object" aria-hidden="true"><div className="mf-lamp"></div><div className="mf-lamp-stem"></div><div className="mf-note"><div className="mf-note-label">Case file 001</div><h2>The Brass Lantern</h2><p>Three witnesses.<br />One missing hour.<br /><br />Look for what the story avoids.</p></div></div></section>
    <div className="mf-home-strip"><div className="mf-strip-item"><Eye /> Read the testimony closely</div><div className="mf-strip-item"><Fingerprint /> Separate evidence from instinct</div><div className="mf-strip-item"><Lightbulb /> Earn XP and sharpen your reasoning</div></div>
  </div>;
}