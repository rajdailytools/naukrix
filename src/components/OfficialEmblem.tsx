import React from 'react';

interface EmblemProps {
  type: 'ssc' | 'railway' | 'police' | 'ibps' | 'defence' | 'teaching' | 'upsc' | 'state';
  className?: string;
  size?: number;
}

export const OfficialEmblem: React.FC<EmblemProps> = ({ type, className = '', size = 52 }) => {
  if (type === 'ssc') {
    // Staff Selection Commission Circular Emblem (Gold/Red ring with Ashoka crest and gear)
    return (
      <div 
        style={{ width: size, height: size }}
        className={`rounded-full flex items-center justify-center p-1 bg-white border border-amber-200 shadow-sm shrink-0 ${className}`}
        title="Staff Selection Commission"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="46" fill="#FFFDF8" stroke="#D97706" strokeWidth="4" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Inner circle with red shield */}
          <circle cx="50" cy="50" r="32" fill="#991B1B" />
          {/* Ashoka Stambh / Emblem silhouette */}
          <path d="M47 30 L53 30 L54 48 L46 48 Z" fill="#FCD34D" />
          <circle cx="50" cy="27" r="4" fill="#FCD34D" />
          <path d="M41 33 C45 33 46 38 46 48 L44 48 C44 40 42 36 39 36 Z" fill="#FDE68A" />
          <path d="M59 33 C55 33 54 38 54 48 L56 48 C56 40 58 36 61 36 Z" fill="#FDE68A" />
          <rect x="42" y="48" width="16" height="4" rx="1" fill="#FEF08A" />
          {/* Wheel / Base */}
          <circle cx="50" cy="62" r="9" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
          <circle cx="50" cy="62" r="3" fill="#78350F" />
          <path d="M35 73 Q50 78 65 73" stroke="#FDE68A" strokeWidth="3" fill="none" />
          <text x="50" y="20" textAnchor="middle" fontSize="6.5" fill="#78350F" fontWeight="bold">SSC</text>
        </svg>
      </div>
    );
  }

  if (type === 'railway') {
    // Indian Railways Emblem (Red circular medallion with steam train / emblem)
    return (
      <div 
        style={{ width: size, height: size }}
        className={`rounded-full flex items-center justify-center p-1 bg-white border border-red-200 shadow-sm shrink-0 ${className}`}
        title="Indian Railways"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="46" fill="#FFF5F5" stroke="#DC2626" strokeWidth="4" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="#991B1B" strokeWidth="1.5" />
          {/* Inner Red Fill */}
          <circle cx="50" cy="50" r="33" fill="#B91C1C" />
          {/* Steam Locomotive front silhouette */}
          <rect x="36" y="38" width="28" height="24" rx="4" fill="#FEF2F2" />
          <circle cx="50" cy="44" r="5" fill="#DC2626" />
          <rect x="42" y="30" width="16" height="6" rx="2" fill="#FEF2F2" />
          <path d="M47 24 L53 24 L54 30 L46 30 Z" fill="#FCA5A5" />
          <rect x="38" y="52" width="24" height="6" fill="#991B1B" />
          <circle cx="42" cy="66" r="4.5" fill="#FEF2F2" stroke="#991B1B" strokeWidth="1.5" />
          <circle cx="58" cy="66" r="4.5" fill="#FEF2F2" stroke="#991B1B" strokeWidth="1.5" />
          <path d="M30 74 L70 74" stroke="#DC2626" strokeWidth="2.5" />
          <path d="M34 77 L66 77" stroke="#DC2626" strokeWidth="1.5" />
          <text x="50" y="19" textAnchor="middle" fontSize="6.5" fill="#991B1B" fontWeight="bold">INDIAN RAILWAYS</text>
        </svg>
      </div>
    );
  }

  if (type === 'police') {
    // UP Police Emblem (Classic shield with two fish, twin flags, and national emblem)
    return (
      <div 
        style={{ width: size, height: size }}
        className={`rounded-full flex items-center justify-center p-1 bg-white border border-amber-200 shadow-sm shrink-0 ${className}`}
        title="Uttar Pradesh Police"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="46" fill="#FFFDF5" stroke="#B45309" strokeWidth="3" />
          {/* Police Star / Shield background */}
          <path d="M50 14 L59 32 L78 35 L64 48 L68 68 L50 58 L32 68 L36 48 L22 35 L41 32 Z" fill="#991B1B" />
          <circle cx="50" cy="48" r="19" fill="#1E3A8A" stroke="#FDE047" strokeWidth="1.5" />
          {/* Twin Fish Emblem of UP Govt */}
          <path d="M42 48 C37 42 40 37 46 41 C48 43 45 46 42 48 Z" fill="#FEF08A" />
          <path d="M58 48 C63 42 60 37 54 41 C52 43 55 46 58 48 Z" fill="#FEF08A" />
          {/* Bow and Arrow silhouette */}
          <path d="M39 54 Q50 49 61 54" stroke="#FEF08A" strokeWidth="1.5" fill="none" />
          <path d="M50 44 L50 57" stroke="#FEF08A" strokeWidth="1.5" />
          {/* Base ribbon */}
          <path d="M30 80 Q50 86 70 80 L67 74 Q50 78 33 74 Z" fill="#B45309" />
          <text x="50" y="80" textAnchor="middle" fontSize="5" fill="#FFFFFF" fontWeight="bold">UP POLICE</text>
        </svg>
      </div>
    );
  }

  if (type === 'ibps') {
    // IBPS Banking Emblem (Stylized blue letter 'i' and interlocking checkmark / book)
    return (
      <div 
        style={{ width: size, height: size }}
        className={`rounded-full flex items-center justify-center p-1 bg-white border border-blue-200 shadow-sm shrink-0 ${className}`}
        title="Institute of Banking Personnel Selection"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="46" fill="#F0F7FF" stroke="#0284C7" strokeWidth="3.5" />
          {/* Stylized IBPS geometric glyphs */}
          <rect x="28" y="32" width="10" height="36" rx="2" fill="#0284C7" />
          <circle cx="33" cy="24" r="5" fill="#0284C7" />
          <path d="M44 32 C56 32 66 39 66 49 C66 56 60 61 52 64 L70 68 L58 68 L44 65 Z" fill="#1D4ED8" />
          <path d="M44 40 L52 40 C56 40 59 43 59 47 C59 51 56 54 52 54 L44 54 Z" fill="#EFF6FF" />
          <text x="50" y="86" textAnchor="middle" fontSize="9" fill="#1E3A8A" fontWeight="900" letterSpacing="1">IBPS</text>
        </svg>
      </div>
    );
  }

  if (type === 'defence') {
    return (
      <div 
        style={{ width: size, height: size }}
        className={`rounded-full flex items-center justify-center p-1 bg-white border border-sky-300 shadow-sm shrink-0 ${className}`}
        title="Defence Forces"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" strokeWidth="3" />
          <circle cx="50" cy="50" r="32" fill="#0369A1" />
          <path d="M50 25 L65 42 L55 42 L57 60 L50 56 L43 60 L45 42 L35 42 Z" fill="#FDE047" />
          <circle cx="50" cy="74" r="6" fill="#BAE6FD" />
          <text x="50" y="90" textAnchor="middle" fontSize="6" fill="#0369A1" fontWeight="bold">DEFENCE</text>
        </svg>
      </div>
    );
  }

  // Default Central Govt / Emblem
  return (
    <div 
      style={{ width: size, height: size }}
      className={`rounded-full flex items-center justify-center p-1 bg-white border border-slate-200 shadow-sm shrink-0 ${className}`}
      title="Government Department"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#475569" strokeWidth="2.5" />
        <rect x="44" y="32" width="12" height="30" rx="2" fill="#1E293B" />
        <circle cx="50" cy="26" r="6" fill="#0284C7" />
        <rect x="36" y="64" width="28" height="6" rx="1" fill="#475569" />
        <circle cx="50" cy="46" r="3" fill="#38BDF8" />
        <text x="50" y="86" textAnchor="middle" fontSize="6.5" fill="#334155" fontWeight="bold">GOVT JOB</text>
      </svg>
    </div>
  );
};
