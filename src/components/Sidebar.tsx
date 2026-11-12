import React from 'react';
import {
  FileText,
  Calendar,
  Award,
  Download,
  GraduationCap,
  CheckSquare,
  Home,
  Mail,
  Bell,
  Clock,
  Video,
  MapPin,
  X,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeView,
  setActiveView,
  unreadCount = 10,
}) => {
  const documentMenuItems = [
    { id: 'transkript', label: 'Transkript', icon: Award },
    { id: 'ders-programi', label: 'Ders Programı', icon: Calendar },
    { id: 'hazirlik-not-belgesi', label: 'Hazırlık Not Belgesi', icon: GraduationCap },
    { id: 'online-belge-talep', label: 'Online Belge Talep', icon: Download },
    { id: 'sinav-programi', label: 'Sınav Programı', icon: FileText },
    { id: 'sinav-sonuclari', label: 'Sınav Sonuçları', icon: CheckSquare },
  ];

  const generalMenuItems = [
    { id: 'anasayfa', label: 'Anasayfa', icon: Home },
    { id: 'mesaj-kutusu', label: 'Mesaj Kutusu', icon: Mail, count: unreadCount },
    { id: 'duyurular', label: 'Duyurular', icon: Bell },
    { id: 'rezervasyonlar', label: 'Rezervasyonlar', icon: Clock },
    { id: 'canli-dersler', label: 'Canlı Dersler', icon: Video },
    { id: 'muafiyet-basvuru', label: 'Dersler Muafiyet Sınavları Başvuru', icon: BookOpen },
  ];

  const handleSelect = (id: string) => {
    setActiveView(id);
    // On small screens, close the drawer after selection
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-14 sm:top-16 left-0 bottom-0 z-30 w-64 sm:w-72 bg-[#20272f] text-gray-200 border-r border-slate-700/80 shadow-2xl flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header inside drawer */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/80 bg-[#1a2027]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-bold text-gray-300">
              OİS Menü Paneli
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded hover:bg-slate-700/60 transition-colors"
            aria-label="Menüyü Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4 text-xs select-none">
          {/* Group 1: Belgeler (matching Image 2) */}
          <div>
            <div className="px-3 pb-1.5 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              Belgeler
            </div>
            <ul className="space-y-0.5">
              {documentMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded text-left transition-colors cursor-pointer group ${
                        isActive
                          ? 'bg-emerald-600/90 text-white font-semibold shadow-xs'
                          : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-emerald-400'
                          }`}
                        />
                        <span className="text-[13px]">{item.label}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Group 2: Genel İşlemler */}
          <div>
            <div className="px-3 pb-1.5 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
              Genel İşlemler
            </div>
            <ul className="space-y-0.5">
              {generalMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded text-left transition-colors cursor-pointer group ${
                        isActive
                          ? 'bg-blue-600 text-white font-semibold shadow-xs'
                          : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-blue-400'
                          }`}
                        />
                        <span className="text-[13px]">{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};
