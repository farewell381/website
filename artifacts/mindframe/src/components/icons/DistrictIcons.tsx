type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const defaults = { size: 28, color: '#F5B841' };

export function CrimeSceneIcon({ size = defaults.size, color = defaults.color, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="6.5" stroke={color} strokeWidth="1.6" />
      <line x1="14.8" y1="14.8" x2="20.5" y2="20.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BiasDistrictIcon({ size = defaults.size, color = defaults.color, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 15c0-4 4-4 6-2s2 5-1 6-6-2-4-5 7-6 10-3 1 7-2 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FallacyDistrictIcon({ size = defaults.size, color = defaults.color, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3c-4 0-7 2.5-7 6 0 4 2 6 4 7.5.6.4 1.2-.2.9-.9-.4-1-.3-1.8.5-2 .8-.2 1 .6.6 1.4-.4.9.3 1.6 1 1 1.8-1.6 4-3.5 4-7 0-3.5-3-6-7-6z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="9.5" r="0.9" fill={color} />
      <circle cx="14.5" cy="9.5" r="0.9" fill={color} />
      <path d="M12 9l-1 3 1.5 1-1 3" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function DetectiveAcademyIcon({ size = defaults.size, color = defaults.color, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DecisionLabIcon({ size = defaults.size, color = defaults.color, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 20V13" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 13c0-3-4-3-4-6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 13c0-3 4-3 4-6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5.5 4.5l2.5 2.5-2.5 2.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 4.5l-2.5 2.5 2.5 2.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArgumentAnalyzerIcon({ size = defaults.size, color = defaults.color, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 5.5h16v10H10l-4 3.5v-3.5H4v-10z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 6.5l2 4-2.5 1 3 4.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MindPalaceIcon({ size = defaults.size, color = defaults.color, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="7.5" cy="9.5" r="4" stroke={color} strokeWidth="1.5" />
      <path d="M10.8 12.3L19 20.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15.5 17L18 14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17.5 19L20 16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AchievementsIcon({ size = defaults.size, color = defaults.color, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.8 7.2 18.4l.9-5.4L4.2 9.2l5.4-.8L12 3.5z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const districtIcons = {
  'crime-scene': CrimeSceneIcon,
  'bias-district': BiasDistrictIcon,
  'fallacy-district': FallacyDistrictIcon,
  'detective-academy': DetectiveAcademyIcon,
  'decision-lab': DecisionLabIcon,
  'argument-analyzer': ArgumentAnalyzerIcon,
  'mind-palace': MindPalaceIcon,
  'achievements': AchievementsIcon,
} as const;

export type DistrictIconId = keyof typeof districtIcons;
