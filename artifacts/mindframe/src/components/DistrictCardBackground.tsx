export default function DistrictCardBackground() {
  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      {/* Base card tone */}
      <rect x="0" y="0" width="400" height="200" fill="#11161D" />

      {/* Spotlight beam — subtle, angled from top */}
      <polygon points="230,0 280,0 340,200 200,200" fill="#F5B841" opacity="0.04" />

      {/* Skyline silhouette, back row (darker, slightly shorter) */}
      <g fill="#0B0F14" opacity="0.9">
        <rect x="0" y="140" width="30" height="60" />
        <rect x="34" y="120" width="24" height="80" />
        <rect x="62" y="150" width="36" height="50" />
        <rect x="102" y="110" width="20" height="90" />
        <rect x="126" y="135" width="30" height="65" />
        <rect x="330" y="125" width="26" height="75" />
        <rect x="360" y="145" width="40" height="55" />
      </g>

      {/* Skyline silhouette, front row (darkest, taller — near-black) */}
      <g fill="#060809">
        <rect x="150" y="95" width="24" height="105" />
        <rect x="178" y="130" width="18" height="70" />
        <rect x="200" y="70" width="28" height="130" />
        <rect x="232" y="115" width="22" height="85" />
        <rect x="258" y="90" width="30" height="110" />
        <rect x="292" y="140" width="20" height="60" />
      </g>

      {/* Single lit window, front-row building */}
      <rect x="211" y="150" width="6" height="8" fill="#F5B841" opacity="0.85" />

      {/* Ground haze */}
      <rect x="0" y="185" width="400" height="15" fill="#0B0F14" opacity="0.6" />
    </svg>
  );
}
