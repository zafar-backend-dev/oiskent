import React from 'react';

interface KentLogoProps {
  className?: string;
  variant?: 'full' | 'header' | 'document' | 'crest-only';
  showTagline?: boolean;
}

export const KentLogo: React.FC<KentLogoProps> = ({
  className = '',
  variant = 'header',
  showTagline = true,
}) => {
  if (variant === 'crest-only') {
    return (
      <div className={`flex items-center justify-center shrink-0 ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rounded crest background */}
          <rect width="100" height="100" rx="20" fill="#a81015" />
          <rect x="3" y="3" width="94" height="94" rx="17" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="2" />
          {/* Stylized Kent K letter */}
          <path
            d="M28 22V78H39V56L61 78H76L48 50L73 22H59L39 44V22H28Z"
            fill="#ffffff"
          />
          {/* Small decorative dot */}
          <circle cx="28" cy="22" r="3" fill="#e53e3e" />
        </svg>
      </div>
    );
  }

  if (variant === 'document') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        {/* Crest */}
        <div className="w-16 h-16 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#a81015" />
            <rect x="3" y="3" width="94" height="94" rx="17" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" />
            <path
              d="M28 22V78H39V56L61 78H76L48 50L73 22H59L39 44V22H28Z"
              fill="#ffffff"
            />
          </svg>
        </div>
        <div>
          <div className="text-[13px] font-semibold text-gray-700 tracking-wide uppercase leading-tight">
            İSTANBUL
          </div>
          <div className="text-[26px] font-black text-[#1a202c] tracking-tight leading-none">
            KENT
          </div>
          <div className="text-[13px] font-bold text-[#a81015] tracking-widest uppercase leading-tight">
            ÜNİVERSİTESİ
          </div>
          {showTagline && (
            <div className="text-[12px] italic text-[#8d9ba8] font-serif leading-none mt-1">
              Geleceğin Bu Kent'te
            </div>
          )}
        </div>
      </div>
    );
  }

  // Header variant (dark background)
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="#a81015" />
          <rect x="3" y="3" width="94" height="94" rx="17" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
          <path
            d="M28 22V78H39V56L61 78H76L48 50L73 22H59L39 44V22H28Z"
            fill="#ffffff"
          />
        </svg>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-semibold tracking-wider text-gray-300 uppercase leading-none">
          İSTANBUL
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-sm sm:text-base font-extrabold text-white tracking-wide leading-tight">
            KENT
          </span>
          <span className="text-xs sm:text-sm font-bold text-red-400 tracking-wider uppercase leading-tight">
            ÜNİVERSİTESİ
          </span>
        </div>
        <span className="text-[9px] text-gray-400 font-medium leading-none">
          Öğrenci Bilgi Sistemi (OİS)
        </span>
      </div>
    </div>
  );
};
