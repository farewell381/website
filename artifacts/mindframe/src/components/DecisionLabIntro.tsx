"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { decisionLabIntroScript, speakers, type DialogueLine } from '@/data/decisionLabIntro';

const TYPE_SPEED_MS = 22;

export default function DecisionLabIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [lineFinished, setLineFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentLine: DialogueLine | undefined = decisionLabIntroScript[lineIndex];
  const isLastLine = lineIndex === decisionLabIntroScript.length - 1;

  useEffect(() => {
    if (!currentLine) return;

    setDisplayedText('');
    setLineFinished(false);

    let charIndex = 0;
    intervalRef.current = setInterval(() => {
      charIndex += 1;
      setDisplayedText(currentLine.text.slice(0, charIndex));
      if (charIndex >= currentLine.text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setLineFinished(true);
      }
    }, TYPE_SPEED_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [lineIndex, currentLine]);

  function handleAdvance() {
    if (!lineFinished && currentLine) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayedText(currentLine.text);
      setLineFinished(true);
      return;
    }

    if (isLastLine) {
      onComplete();
      return;
    }
    setLineIndex((i) => i + 1);
  }

  if (!currentLine) return null;

  const speaker = speakers[currentLine.speaker];

  return (
    <div
      onClick={handleAdvance}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleAdvance();
      }}
      className="min-h-screen bg-[#0B0F14] text-[#E7E9EC] flex flex-col justify-end px-6 py-12 md:px-16 cursor-pointer select-none"
    >
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#9AA3AE]">
          Vantage City — Decision Lab — Briefing
        </p>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={lineIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#11161D] border border-[#1C232C] rounded-lg p-6 min-h-[140px] flex flex-col justify-between"
          >
            <div>
              <p
                className="font-mono text-xs uppercase tracking-widest mb-3"
                style={{ color: speaker.color }}
              >
                {speaker.name}
              </p>
              <p className="text-base md:text-lg leading-relaxed text-[#E7E9EC]">
                {displayedText}
                {!lineFinished && (
                  <span className="inline-block w-2 h-4 ml-0.5 bg-[#E7E9EC] animate-pulse align-middle" />
                )}
              </p>
            </div>

            <div className="flex items-center justify-between mt-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#4E5762]">
                {lineIndex + 1} / {decisionLabIntroScript.length}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#4E5762]">
                {lineFinished
                  ? isLastLine
                    ? 'Tap to enter →'
                    : 'Tap to continue →'
                  : 'Tap to skip'}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="font-mono text-[10px] uppercase tracking-widest text-[#4E5762] hover:text-[#9AA3AE] mt-4 transition-colors"
        >
          Skip briefing
        </button>
      </div>
    </div>
  );
}
