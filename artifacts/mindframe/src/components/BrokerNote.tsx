import { brokerNotes } from "@/lib/data/theBroker";

const BROKER_ACCENT = "#8B4049";

export default function BrokerNote({ fallacyId }: { fallacyId: string }) {
  const note = brokerNotes[fallacyId];
  if (!note) return null;

  return (
    <div
      className="mt-4 rounded-md border border-dashed px-4 py-3"
      style={{ borderColor: `${BROKER_ACCENT}40`, backgroundColor: "#0E1319" }}
    >
      <p
        className="font-mono text-[10px] uppercase tracking-widest mb-2"
        style={{ color: BROKER_ACCENT }}
      >
        How The Broker Uses This
      </p>
      <p className="text-sm text-[#B7A8AA] leading-relaxed italic">“{note}”</p>
    </div>
  );
}
