import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'wouter';
import { Shell } from '@/components/Shell';
import DecisionLabIntro from '@/components/DecisionLabIntro';
import { decisionLabTools, type DecisionTool } from '@/data/decisionLabTools';
import { fallacies } from '@/data/fallacies';
import {
  loadDecisionLabProgress,
  markIntroSeen,
  markSolved,
  type DecisionLabProgress,
} from '@/lib/decisionLabStore';

function getCasesSolvedCount() {
  if (typeof window === 'undefined') return 0;
  return JSON.parse(localStorage.getItem('mindframe-completed') || '[]').length;
}

function getFallacyProgress() {
  if (typeof window === 'undefined') return { completed: [] as string[] };
  return {
    completed: JSON.parse(localStorage.getItem('mindframe-fallacy-completed') || '[]') as string[],
  };
}

export default function DecisionLab() {
  const [progress, setProgress] = useState<DecisionLabProgress>(loadDecisionLabProgress);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const casesSolved = useMemo(() => getCasesSolvedCount(), []);
  const fallacyProgress = useMemo(() => getFallacyProgress(), []);
  const decisionLabUnlocked = fallacyProgress.completed.length === fallacies.length;

  function handleIntroComplete() {
    setProgress((current) => markIntroSeen(current));
  }

  function handleMaster(tool: DecisionTool) {
    setProgress((current) => markSolved(current, tool.id, tool.xp));
  }

  if (!decisionLabUnlocked) {
    return (
      <Shell>
        <div className="mf-page">
          <Link href="/city" className="mf-link" data-testid="link-back-city-decisionlab">
            <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> City desk
          </Link>
          <div className="mf-bias-hero">
            <div>
              <div className="mf-eyebrow">District 05 / Decision Lab</div>
              <h1 className="mf-display">The Decision<br /><em>Lab.</em></h1>
              <p className="mf-lede">This district is still locked. Finish the Fallacy District to open the lab and practice choices with real investigation tools.</p>
            </div>
            <div className="mf-card mf-bias-progress">
              <Search />
              <strong>{decisionLabTools.length}<small> tools waiting</small></strong>
              <span>Ready once you unlock</span>
              <div className="mf-progress"><span style={{ width: '0%' }} /></div>
              <p>Complete the argument archive to use these frameworks in the lab.</p>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  if (!progress.introSeen) {
    return <DecisionLabIntro onComplete={handleIntroComplete} />;
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E7E9EC] px-6 py-12 md:px-12">
      <header className="mb-10 max-w-3xl">
        <Link href="/city" className="mf-link" data-testid="link-back-city-decisionlab">
          <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> City desk
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#4DE1C1] mb-3">
          Vantage City — District 05
        </p>
        <h1 className="font-mono text-3xl md:text-4xl uppercase tracking-widest text-[#F5B841] mb-4">
          The Decision Lab
        </h1>
        <p className="text-[#9AA3AE] leading-relaxed">
          Every case ends in a choice. Vantage City&apos;s best detectives don&apos;t rely on instinct alone — they carry a toolkit. Ten frameworks live here. Each one you master sharpens how you close a case, not just how you read one.
        </p>
        <div className="mt-6 font-mono text-xs uppercase tracking-widest text-[#4DE1C1]">
          {progress.totalXp} XP earned · {progress.solvedToolIds.length}/{decisionLabTools.length} tools mastered
        </div>
      </header>

      <section className="grid gap-4 max-w-3xl">
        {decisionLabTools.map((tool) => {
          const locked = casesSolved < tool.unlockRequirement;
          const mastered = progress.solvedToolIds.includes(tool.id);
          const expanded = expandedId === tool.id;

          return (
            <ToolCard
              key={tool.id}
              tool={tool}
              locked={locked}
              mastered={mastered}
              expanded={expanded}
              onToggle={() => !locked && setExpandedId(expanded ? null : tool.id)}
              onMaster={() => handleMaster(tool)}
            />
          );
        })}
      </section>
    </main>
  );
}

function ToolCard({
  tool,
  locked,
  mastered,
  expanded,
  onToggle,
  onMaster,
}: {
  tool: DecisionTool;
  locked: boolean;
  mastered: boolean;
  expanded: boolean;
  onToggle: () => void;
  onMaster: () => void;
}) {
  return (
    <div
      className={`rounded-lg border transition-colors ${
        locked
          ? 'border-[#1C232C] bg-[#0E1319] opacity-60'
          : 'border-[#1C232C] bg-[#11161D] hover:border-[#F5B841]/40'
      }`}
    >
      <button
        onClick={onToggle}
        disabled={locked}
        aria-expanded={expanded}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left disabled:cursor-not-allowed"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-mono text-sm uppercase tracking-widest text-[#E7E9EC]">
              {tool.name}
            </h2>
            {mastered && (
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#4DE1C1] border border-[#4DE1C1]/40 rounded px-1.5 py-0.5">
                Mastered
              </span>
            )}
          </div>
          <p className="text-sm text-[#9AA3AE] italic">{locked ? `Locked — solve ${tool.unlockRequirement} cases to access this file.` : `"${tool.hook}"`}</p>
        </div>
        {!locked && (
          <span className="font-mono text-xs text-[#F5B841] shrink-0">{expanded ? '−' : '+'}</span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {expanded && !locked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-[#1C232C]">
              <p className="text-sm text-[#C7CCD3] leading-relaxed mb-4">{tool.description}</p>
              <div className="bg-[#0B0F14] rounded-md p-4 mb-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#4DE1C1] mb-2">Case File</p>
                <p className="text-sm text-[#9AA3AE] leading-relaxed">{tool.caseExample}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#F5B841]">+{tool.xp} XP</span>
                {!mastered && (
                  <button
                    onClick={onMaster}
                    className="font-mono text-xs uppercase tracking-widest bg-[#F5B841] text-[#0B0F14] px-4 py-2 rounded hover:bg-[#F5B841]/90 transition-colors"
                  >
                    Mark Mastered
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
