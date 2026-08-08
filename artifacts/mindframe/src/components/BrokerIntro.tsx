"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brokerIntro } from "@/lib/data/theBroker";

const BROKER_ACCENT = "#8B4049";

export default function BrokerIntro() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-lg border border-dashed px-5 py-4 mb-8"
      style={{ borderColor: `${BROKER_ACCENT}55`, backgroundColor: "#0E1319" }}
    >
      <button
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="w-full flex items-center justify-between text-left"
      >
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: BROKER_ACCENT }}
        >
          Unknown Voice — “The Broker"
        </span>
        <span className="font-mono text-xs" style={{ color: BROKER_ACCENT }}>
          {expanded ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              {brokerIntro.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-sm text-[#B7A8AA] leading-relaxed italic">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
