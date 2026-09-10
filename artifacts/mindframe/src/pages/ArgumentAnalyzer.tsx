import { ArrowLeft, ArrowRight, FileSearch, Lightbulb, RotateCcw, ScanText } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { Shell } from '@/components/Shell';
import { analyzeArgument, sampleArguments, type Match } from '@/lib/argumentAnalyzer';
import { fallacies } from '@/data/fallacies';

function getDecisionLabProgress() {
  if (typeof window === 'undefined') return { solvedToolIds: [] as string[] };
  try {
    const raw = localStorage.getItem('mindframe-decision-lab-progress');
    if (!raw) return { solvedToolIds: [] as string[] };
    return JSON.parse(raw);
  } catch {
    return { solvedToolIds: [] as string[] };
  }
}

type HighlightSegment = {
  text: string;
  match?: Match;
};

function buildSegments(text: string, matches: Match[]): HighlightSegment[] {
  if (matches.length === 0) return [{ text }];
  const segments: HighlightSegment[] = [];
  let cursor = 0;
  for (const match of matches) {
    if (match.start > cursor) {
      segments.push({ text: text.slice(cursor, match.start) });
    }
    segments.push({ text: text.slice(match.start, match.end), match });
    cursor = match.end;
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor) });
  }
  return segments;
}

export default function ArgumentAnalyzer() {
  const [input, setInput] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [activeMatch, setActiveMatch] = useState<Match | null>(null);

  const decisionLab = useMemo(() => getDecisionLabProgress(), []);
  const analyzerUnlocked = decisionLab.solvedToolIds.length >= 3;

  const matches = useMemo(() => (analyzed ? analyzeArgument(input) : []), [input, analyzed]);
  const segments = useMemo(() => buildSegments(input, matches), [input, matches]);
  const uniqueFallacies = useMemo(() => {
    const seen = new Map<string, Match>();
    for (const m of matches) {
      if (!seen.has(m.fallacyId)) seen.set(m.fallacyId, m);
    }
    return Array.from(seen.values());
  }, [matches]);

  if (!analyzerUnlocked) {
    return (
      <Shell>
        <div className="mf-page">
          <Link href="/city" className="mf-link" data-testid="link-back-city-analyzer">
            <ArrowLeft size={14} /> City desk
          </Link>
          <div className="mf-bias-hero">
            <div>
              <div className="mf-eyebrow">District 06 / Argument Analyzer</div>
              <h1 className="mf-display">The argument<br /><em>analyzer.</em></h1>
              <p className="mf-lede">This district is still locked. Master at least 3 tools in the Decision Lab to open the Analyzer and start breaking down real arguments.</p>
            </div>
            <div className="mf-card mf-bias-progress">
              <FileSearch />
              <strong>{decisionLab.solvedToolIds.length}<small> / 3</small></strong>
              <span>tools mastered</span>
              <div className="mf-progress">
                <span style={{ width: `${Math.min(100, (decisionLab.solvedToolIds.length / 3) * 100)}%` }} />
              </div>
              <p>Master tools in the Decision Lab to unlock the Analyzer.</p>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  const handleAnalyze = () => {
    setAnalyzed(true);
    setActiveMatch(null);
  };

  const handleReset = () => {
    setInput('');
    setAnalyzed(false);
    setActiveMatch(null);
  };

  const loadSample = (text: string) => {
    setInput(text);
    setAnalyzed(false);
    setActiveMatch(null);
  };

  return (
    <Shell>
      <div className="mf-page mf-bias-detail">
        <Link href="/city" className="mf-link" data-testid="link-back-city-analyzer">
          <ArrowLeft size={14} /> City desk
        </Link>

        <header className="mf-bias-detail-head">
          <div>
            <div className="mf-eyebrow">District 06 / Argument Analyzer</div>
            <h1>The argument<br /><em>analyzer.</em></h1>
            <p>Drop in any argument — an email, a headline, a debate claim — and the analyzer scans it for the reasoning errors you learned in the Fallacy District. Click a highlighted phrase to see what pattern it matches.</p>
          </div>
          <div className={`mf-bias-file-mark ${analyzed && matches.length > 0 ? 'complete' : ''}`}>
            {analyzed && matches.length > 0 ? <><FileSearch size={17} /> {matches.length} found</> : <>A/06</>}
          </div>
        </header>

        <div className="mf-bias-detail-grid">
          <main>
            <section className="mf-card mf-analyzer-input">
              <div className="mf-step-label"><ScanText size={14} /> Submit your argument</div>
              <h2>Paste the text you want to investigate.</h2>
              <p className="mf-scenario-prompt">The analyzer looks for the thirty fallacy patterns from the archive. It highlights phrases that match and explains the pattern behind each one.</p>

              <textarea
                className="mf-analyzer-textarea"
                value={input}
                onChange={(e) => { setInput(e.target.value); setAnalyzed(false); }}
                placeholder="Paste an argument here — a speech, an email, a comment thread, a headline..."
                aria-label="Argument text input"
                rows={6}
                data-testid="textarea-analyzer-input"
              />

              <div className="mf-analyzer-actions">
                <button
                  className="mf-button"
                  onClick={handleAnalyze}
                  disabled={!input.trim()}
                  data-testid="button-analyze"
                >
                  <ScanText size={14} /> Analyze argument
                </button>
                <button className="mf-button secondary" onClick={handleReset} data-testid="button-clear">
                  <RotateCcw size={14} /> Clear
                </button>
              </div>

              <div className="mf-analyzer-samples">
                <span className="mf-eyebrow">Or try a sample</span>
                <div className="mf-analyzer-sample-list">
                  {sampleArguments.map((sample) => (
                    <button
                      key={sample.label}
                      className="mf-choice"
                      onClick={() => loadSample(sample.text)}
                      data-testid={`button-sample-${sample.label.replace(/\s+/g, '-')}`}
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {analyzed && (
              <section className="mf-card mf-analyzer-results">
                <div className="mf-step-label"><FileSearch size={14} /> Analysis results</div>
                <h2>{matches.length === 0 ? 'No fallacies detected.' : `${matches.length} potential fallacy ${matches.length === 1 ? 'flag' : 'flags'} found.`}</h2>
                <p className="mf-scenario-prompt">
                  {matches.length === 0
                    ? 'The analyzer did not find a match for any known pattern. That does not mean the argument is sound — only that it did not trip a heuristic. Review it yourself.'
                    : 'Click any highlighted phrase below to see which pattern it matched and why. The analyzer uses keyword and pattern heuristics, so it can flag false positives — use your own judgment.'}
                </p>

                <div className="mf-analyzer-text" data-testid="div-analyzed-text">
                  {segments.map((seg, i) =>
                    seg.match ? (
                      <mark
                        key={i}
                        className={`mf-analyzer-highlight ${activeMatch === seg.match ? 'active' : ''}`}
                        onClick={() => setActiveMatch(seg.match ?? null)}
                        data-testid={`mark-${seg.match!.fallacyId}`}
                      >
                        {seg.text}
                      </mark>
                    ) : (
                      <span key={i}>{seg.text}</span>
                    )
                  )}
                </div>

                {uniqueFallacies.length > 0 && (
                  <div className="mf-analyzer-found-list">
                    <span className="mf-eyebrow">Patterns identified</span>
                    <div className="mf-tag-row">
                      {uniqueFallacies.map((m) => (
                        <span key={m.fallacyId} className="mf-tag" data-testid={`tag-found-${m.fallacyId}`}>
                          {m.fallacyName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {activeMatch && (
              <section className="mf-card mf-analyzer-tooltip" data-testid="section-tooltip">
                <div className="mf-step-label"><Lightbulb size={14} /> {activeMatch.fallacyName}</div>
                <h2>{activeMatch.shortDefinition}</h2>
                <p className="mf-scenario-prompt">{activeMatch.definition}</p>
                <div className="mf-feedback right">
                  <strong>Matched phrase</strong>
                  <span>"{activeMatch.snippet}"</span>
                </div>
                <div className="mf-feedback">
                  <strong>Why it flagged</strong>
                  <span>{activeMatch.explanation}</span>
                </div>
                <Link href={`/district/fallacies/${activeMatch.fallacyId}`} className="mf-link" data-testid="link-study-fallacy">
                  Study this pattern in the archive <ArrowRight size={13} />
                </Link>
              </section>
            )}
          </main>

          <aside className="mf-bias-side">
            <div className="mf-card mf-tool-card">
              <div className="mf-eyebrow">Field note</div>
              <h2>The analyzer is a starting point, not a verdict.</h2>
              <p>It matches phrases to known fallacy patterns. Some matches will be false positives — a phrase that looks like a fallacy but is used differently in context. Always read the argument and decide for yourself.</p>
              <div className="mf-side-rule" />
            </div>
            <div className="mf-card mf-tool-card">
              <div className="mf-eyebrow">Archive coverage</div>
              <strong className="mf-side-score">{fallacies.length}</strong>
              <p>The analyzer checks against all {fallacies.length} fallacy patterns in the archive. Each flag links back to the full lesson so you can study the pattern.</p>
              <Link href="/district/fallacies" className="mf-link">Browse the archive <ArrowRight size={13} /></Link>
            </div>
          </aside>
        </div>
      </div>
    </Shell>
  );
}
