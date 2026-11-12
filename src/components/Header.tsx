import React, { useState, useEffect } from 'react';
import {
  FileText,
  BookOpen,
  Grid,
  Search,
  Clock,
  ChevronDown,
  User,
  LogOut,
  Bell,
  Building,
  KeyRound,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  X
} from 'lucide-react';
import { KentLogo } from './KentLogo';
import { STUDENT_INFO, EXAM_SCHEDULE, COURSE_SCHEDULE, ANNOUNCEMENTS } from '../data/kentData';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenQuickMenu?: (type: 'courses' | 'shortcuts') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  isSidebarOpen,
  activeView,
  setActiveView,
  onOpenQuickMenu,
}) => {
  // Session countdown timer starting at 29 min 28 sec
  const [secondsLeft, setSecondsLeft] = useState(29 * 60 + 28);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [timerAlert, setTimerAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          return 30 * 60; // reset
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins} dak. ${secs < 10 ? '0' : ''}${secs} sn. sonra oturumunuz sonlanacaktır`;
  };

  const handleExtendSession = () => {
    setSecondsLeft(30 * 60);
    setTimerAlert(true);
    setTimeout(() => setTimerAlert(false), 2500);
  };

  // Live search filtering across courses, exams, announcements
  const filteredExams = searchQuery.trim()
    ? EXAM_SCHEDULE.filter(
        (e) =>
          e.dersAdi.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.dersKodu.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.ogretimElemani.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.derslik.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredAnnouncements = searchQuery.trim()
    ? ANNOUNCEMENTS.filter((a) =>
        a.baslik.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-[#28323c] text-white shadow-md border-b border-slate-700/60 select-none">
      <div className="flex items-center justify-between px-2 sm:px-4 h-14 sm:h-16 gap-2">
        {/* Left Side: Action buttons and University Brand */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Green Documents Button (as seen on screenshot 1 and 2) */}
          <button
            onClick={onToggleSidebar}
            title="Belgeler & Menü"
            aria-label="Belgeler Menüsü"
            className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded cursor-pointer transition-all ${
              isSidebarOpen
                ? 'bg-emerald-600 text-white shadow-inner ring-2 ring-emerald-400'
                : 'bg-[#107c41] hover:bg-[#0c6334] text-white shadow-sm'
            }`}
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Purple CMS / Courses Button */}
          <button
            onClick={() => onOpenQuickMenu?.('courses')}
            title="Dönem Dersleri ve CMS"
            aria-label="Dersler & CMS"
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#704ba3] hover:bg-[#5b3c86] text-white shadow-sm cursor-pointer transition-all"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Cyan / Teal Grid Button */}
          <button
            onClick={() => onOpenQuickMenu?.('shortcuts')}
            title="Hızlı İşlemler Portalı"
            aria-label="Hızlı İşlemler"
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#009b9e] hover:bg-[#007f82] text-white shadow-sm cursor-pointer transition-all"
          >
            <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* University Logo */}
          <div
            onClick={() => setActiveView('anasayfa')}
            className="cursor-pointer flex items-center ml-1 sm:ml-2 hover:opacity-95 transition-opacity"
          >
            <KentLogo variant="header" />
          </div>
        </div>

        {/* Center: Search input */}
        <div className="relative flex-1 max-w-xl mx-2 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Uygulamada Ara ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full bg-[#f8fafc] text-gray-800 text-xs sm:text-sm pl-4 pr-9 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner placeholder-gray-400"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
          </div>

          {/* Live Search Dropdown */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white text-gray-800 rounded-md shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50 p-2 text-xs divide-y divide-gray-100">
              <div className="p-2 font-semibold text-gray-500 uppercase tracking-wider flex justify-between items-center text-[11px]">
                <span>Arama Sonuçları: "{searchQuery}"</span>
                <button
                  onClick={() => setIsSearchFocused(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Kapat
                </button>
              </div>

              {filteredExams.length > 0 && (
                <div className="py-2">
                  <div className="px-2 pb-1 font-bold text-blue-700">Sınavlar</div>
                  {filteredExams.map((exam) => (
                    <div
                      key={exam.id}
                      onClick={() => {
                        setActiveView('sinav-programi');
                        setIsSearchFocused(false);
                      }}
                      className="px-2 py-1.5 hover:bg-blue-50 rounded cursor-pointer flex justify-between items-center"
                    >
                      <div>
                        <span className="font-semibold text-gray-900">{exam.dersKodu} - {exam.dersAdi}</span>
                        <div className="text-[11px] text-gray-500">{exam.ogretimElemani} • {exam.derslik}</div>
                      </div>
                      <span className="text-gray-500 text-[10px] font-medium">
                        {exam.tarihSaat}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {filteredAnnouncements.length > 0 && (
                <div className="py-2">
                  <div className="px-2 pb-1 font-bold text-amber-700">Duyurular</div>
                  {filteredAnnouncements.map((ann) => (
                    <div
                      key={ann.id}
                      onClick={() => {
                        setActiveView('duyurular');
                        setIsSearchFocused(false);
                      }}
                      className="px-2 py-1.5 hover:bg-amber-50 rounded cursor-pointer"
                    >
                      <div className="font-medium text-gray-900 line-clamp-1">{ann.baslik}</div>
                      <div className="text-[10px] text-gray-500">{ann.tarih} - {ann.kategori}</div>
                    </div>
                  ))}
                </div>
              )}

              {filteredExams.length === 0 && filteredAnnouncements.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  Sonuç bulunamadı. Lütfen ders kodu veya ders adı arayın.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Session Countdown Timer & User Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Timer Card matching screenshot 1 */}
          <div
            onClick={handleExtendSession}
            title="Oturum süresini uzatmak için tıklayın (+30 dk)"
            className="flex items-center gap-1.5 bg-[#1f262e] hover:bg-[#181d24] px-2.5 py-1.5 rounded border border-slate-600/50 cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-red-600/90 flex items-center justify-center text-white shrink-0">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] sm:text-xs text-slate-200 font-medium whitespace-nowrap">
              {formatTimer(secondsLeft)}
            </span>
          </div>

          {/* User Profile Button */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1 rounded hover:bg-slate-700/60 transition-colors cursor-pointer"
              aria-label="Kullanıcı Menüsü"
            >
              {/* Photo matching screenshot with Zafar Ziyatov portrait */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-slate-600 border border-slate-500 overflow-hidden flex items-center justify-center text-white shadow-sm">
                <img
                  src="/assets/aistudio/image_3c44efb6.png"
                  alt="Zafar Ziyatov"
                  className="w-full h-full object-cover object-top scale-175 translate-y-1 translate-x-1"
                  onError={(e) => {
                    // Fallback to avatar icon if image crop fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <User className="w-4 h-4 text-gray-200" />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-300 hidden sm:block" />
            </button>

            {/* Profile Menu Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white text-gray-800 rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-white/60 overflow-hidden bg-slate-700 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-wide">
                        {STUDENT_INFO.adi} {STUDENT_INFO.soyadi}
                      </h4>
                      <p className="text-[11px] text-gray-300">Öğr. No: {STUDENT_INFO.ogrenciNo}</p>
                      <p className="text-[10px] text-emerald-400 font-medium">● {STUDENT_INFO.ogrenimDurumu}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 text-xs border-b border-gray-100 bg-gray-50 space-y-1.5">
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="font-medium">Bölüm:</span>
                    <span className="text-gray-900 text-right truncate max-w-[150px]">Bilgisayar Müh. (2. Sınıf)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="font-medium">Danışman:</span>
                    <span className="text-gray-900">{STUDENT_INFO.danisman}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="font-medium">GNO:</span>
                    <span className="font-bold text-blue-700">{STUDENT_INFO.gno} / 4.00</span>
                  </div>
                </div>

                <div className="py-1 text-xs">
                  <button
                    onClick={() => {
                      setActiveView('ders-programi');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span>Ders Programı</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('sinav-programi');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span>Sınav Programı</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('transkript');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-gray-500" />
                    <span>Transkript</span>
                  </button>
                  <button
                    onClick={() => {
                      handleExtendSession();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-blue-600 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 text-blue-500" />
                    <span>Oturum Süresini Yenile</span>
                  </button>
                </div>

                <div className="p-2 border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      setActiveView('anasayfa');
                    }}
                    className="w-full py-1.5 px-3 bg-slate-700 hover:bg-slate-800 text-white rounded text-center text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Güvenli Çıkış</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Session Extended Toast */}
      {timerAlert && (
        <div className="bg-emerald-600 text-white text-xs px-4 py-1 text-center font-medium animate-in fade-in slide-in-from-top duration-200">
          ✓ Oturum süreniz 30 dakikaya uzatıldı.
        </div>
      )}
    </header>
  );
};
