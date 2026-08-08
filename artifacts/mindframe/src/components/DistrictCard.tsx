import DistrictCardBackground from './DistrictCardBackground';
import { districtIcons, type DistrictIconId } from './icons/DistrictIcons';

export default function DistrictCard({
  districtId,
  title,
  subtitle,
  locked = false,
  onClick,
}: {
  districtId: DistrictIconId;
  title: string;
  subtitle: string;
  locked?: boolean;
  onClick?: () => void;
}) {
  const Icon = districtIcons[districtId];
  const iconColor = locked ? '#4E5762' : '#F5B841';

  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`relative w-full text-left rounded-lg overflow-hidden border transition-colors ${
        locked
          ? 'border-[#1C232C] opacity-60 cursor-not-allowed'
          : 'border-[#1C232C] hover:border-[#F5B841]/40'
      }`}
    >
      <DistrictCardBackground />

      <div className="relative z-10 px-5 py-6 flex flex-col gap-3 min-h-[140px] justify-between">
        <Icon size={30} color={iconColor} />
        <div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-[#E7E9EC] mb-1">
            {title}
          </h3>
          <p className="text-sm text-[#9AA3AE] leading-snug">{subtitle}</p>
        </div>
      </div>
    </button>
  );
}
