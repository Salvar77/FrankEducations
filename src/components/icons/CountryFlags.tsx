// components/icons/CountryFlags.tsx
const CountryFlags = {
  Canada: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="12" fill="white" />
      <rect width="8" height="12" fill="#FF0000" />
      <path
        d="M8 0L9 2H11L9.5 3L10.5 5L8 4L5.5 5L6.5 3L5 2H7L8 0Z"
        fill="#FF0000"
      />
    </svg>
  ),
  Poland: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="12" fill="white" />
      <rect width="16" height="6" fill="#DC143C" />
    </svg>
  ),
  UK: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="12" fill="#012169" />
      <path d="M0 0L16 12M16 0L0 12" stroke="white" strokeWidth="2" />
      <path d="M6 0L10 12M10 0L6 12" stroke="white" strokeWidth="2" />
      <path d="M0 4L16 8M16 4L0 8" stroke="white" strokeWidth="2" />
      <path d="M0 0L16 12M16 0L0 12" stroke="#C8102E" strokeWidth="1" />
      <path d="M6 0L10 12M10 0L6 12" stroke="#C8102E" strokeWidth="1" />
      <path d="M0 4L16 8M16 4L0 8" stroke="#C8102E" strokeWidth="1" />
    </svg>
  ),
  USA: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="12" fill="#B31942" />
      <rect width="8" height="6" fill="#0A3161" />
      {[...Array(5)].map((_, i) => (
        <rect key={i} y={6 + i} width="16" height="1" fill="white" />
      ))}
      {[...Array(6)].map((_, i) => (
        <rect
          key={i}
          x={8 + (i % 2) * 1.6}
          y={i * 1}
          width="1.6"
          height="1"
          fill="white"
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <rect
          key={i}
          x={8 + ((i + 1) % 2) * 1.6}
          y={i * 1 + 0.5}
          width="1.6"
          height="1"
          fill="#B31942"
        />
      ))}
    </svg>
  ),
  Germany: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="4" fill="#000000" />
      <rect y="4" width="16" height="4" fill="#DD0000" />
      <rect y="8" width="16" height="4" fill="#FFCE00" />
    </svg>
  ),
  Ireland: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="5.33" height="12" fill="#169B62" />
      <rect x="5.33" width="5.34" height="12" fill="white" />
      <rect x="10.67" width="5.33" height="12" fill="#FF883E" />
    </svg>
  ),
  Switzerland: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="12" fill="#FF0000" />
      <rect x="6" y="2" width="4" height="8" fill="white" />
      <rect x="2" y="4" width="12" height="4" fill="white" />
      <rect x="7" y="4" width="2" height="4" fill="#FF0000" />
      <rect x="4" y="5" width="8" height="2" fill="#FF0000" />
    </svg>
  ),
  Finland: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="12" fill="white" />
      <rect x="4" width="3" height="12" fill="#003580" />
      <rect y="4" width="16" height="3" fill="#003580" />
    </svg>
  ),
  Australia: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="12" fill="#012169" />
      <path d="M0 0L16 12M16 0L0 12" stroke="white" strokeWidth="2" />
      <path d="M6 0L10 12M10 0L6 12" stroke="white" strokeWidth="2" />
      <path d="M0 4L16 8M16 4L0 8" stroke="white" strokeWidth="2" />
      <path d="M0 0L16 12M16 0L0 12" stroke="#C8102E" strokeWidth="1" />
      <path d="M6 0L10 12M10 0L6 12" stroke="#C8102E" strokeWidth="1" />
      <path d="M0 4L16 8M16 4L0 8" stroke="#C8102E" strokeWidth="1" />
      {/* Gwiazdy dla Australii */}
      <circle cx="12" cy="3" r="1" fill="white" />
      <circle cx="14" cy="6" r="0.7" fill="white" />
      <circle cx="12" cy="9" r="0.7" fill="white" />
      <circle cx="10" cy="7" r="0.7" fill="white" />
    </svg>
  ),
  Spain: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="4" fill="#C60B1E" />
      <rect y="4" width="16" height="4" fill="#FFC400" />
      <rect y="8" width="16" height="4" fill="#C60B1E" />
      <rect x="6" y="4" width="4" height="4" fill="#FFC400" />
    </svg>
  ),
  // NOWE KRAJE - DODANE
  Japan: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="12" fill="white" />
      <circle cx="8" cy="6" r="3" fill="#BC002D" />
    </svg>
  ),
  CzechRepublic: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="12" fill="white" />
      <path d="M0 0L8 6L0 12V0Z" fill="#11457E" />
      <path d="M0 0L16 0L8 6L0 6V0Z" fill="#D7141A" />
    </svg>
  ),
  Hungary: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="4" fill="#CD2A3E" />
      <rect y="4" width="16" height="4" fill="white" />
      <rect y="8" width="16" height="4" fill="#436F4D" />
    </svg>
  ),
  Albania: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="12" fill="#E41E20" />
      <path
        d="M4 2L6 4L4 6L6 8L4 10L6 12H10L12 10L10 8L12 6L10 4L12 2L10 0H6L4 2Z"
        fill="black"
      />
      <path
        d="M5 1L7 3L5 5L7 7L5 9L7 11H9L11 9L9 7L11 5L9 3L11 1L9 0H7L5 1Z"
        fill="#E41E20"
      />
      <circle cx="8" cy="6" r="2" fill="black" />
      <circle cx="8" cy="6" r="1.5" fill="#E41E20" />
    </svg>
  ),
  Bulgaria: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="4" fill="white" />
      <rect y="4" width="16" height="4" fill="#00966E" />
      <rect y="8" width="16" height="4" fill="#D62612" />
    </svg>
  ),
};

export default CountryFlags;
