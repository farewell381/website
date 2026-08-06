import { BookOpen, Building2, Compass, Crosshair, FileText, Gem } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useMemo } from 'react';

export function Brand() {
  return <Link href="/" className="mf-brand" data-testid="link-brand"><span className="mf-brand-mark">M</span><span><span className="mf-brand-name">Mindframe</span><span className="mf-brand-kicker">The quiet evidence</span></span></Link>;
}

export function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const active = useMemo(() => location === '/' ? 'home' : location.startsWith('/cases') ? 'cases' : location.startsWith('/city') ? 'city' : 'cases', [location]);
  return <div className="mf-shell">
    <aside className="mf-rail"><Brand /><div className="mf-nav-label">Desk</div><nav className="mf-nav">
      <Link href="/city" className={`mf-nav-link ${active === 'city' ? 'active' : ''}`} data-testid="link-city"><Building2 /><span>City desk</span></Link>
      <Link href="/cases" className={`mf-nav-link ${active === 'cases' ? 'active' : ''}`} data-testid="link-cases"><FileText /><span>Case files</span></Link>
    </nav><div className="mf-rail-note">Late shift<br /><strong>Open investigation</strong></div></aside>
    <main className="mf-main"><header className="mf-topbar"><div className="mf-breadcrumb"><strong>Mindframe</strong> / {active === 'city' ? 'City desk' : 'Case files'}</div><XpBadge /></header>{children}</main>
  </div>;
}

export function XpBadge() {
  const xp = Number(localStorage.getItem('mindframe-xp') || '0');
  return <div className="mf-xp" data-testid="text-xp"><Gem /> {xp.toLocaleString()} XP</div>;
}

export const icons = { Compass, Crosshair, BookOpen };