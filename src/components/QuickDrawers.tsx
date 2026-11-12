import React from 'react';
import {
  X,
  BookOpen,
  Folder,
  ExternalLink,
  Calendar,
  FileText,
  Award,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';
import { CURRENT_ENROLLED_COURSES, STUDENT_INFO } from '../data/kentData';

interface QuickDrawersProps {
  type: 'courses' | 'shortcuts' | null;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

export const QuickDrawers: React.FC<QuickDrawersProps> = ({
  type,
  onClose,
  onNavigate,
}) => {
  if (!type) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-end animate-in fade-in duration-150 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-80 sm:w-96 bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div
          className={`p-4 text-white flex items-center justify-between ${
            type === 'courses' ? 'bg-[#704ba3]' : 'bg-[#009b9e]'
          }`}
        >
          <div className="flex items-center gap-2">
            {type === 'courses' ? (
              <>
                <BookOpen className="w-5 h-5" />
                <h3 className="font-bold text-sm">Fall Dönemi Dersleri & CMS</h3>
              </>
            ) : (
              <>
                <Compass className="w-5 h-5" />
                <h3 className="font-bold text-sm">Hızlı OİS Menüsü</h3>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
          {type === 'courses' ? (
            <div className="space-y-2">
              <div className="divide-y divide-gray-100">
                {CURRENT_ENROLLED_COURSES.map((c) => (
                  <div key={c.kod} className="py-2.5 flex items-center justify-between hover:bg-gray-50 px-1 rounded">
                    <div>
                      <div className="font-bold text-gray-900">{c.kod} - {c.ad}</div>
                      <div className="text-[10px] text-gray-500">{c.hocasi} • {c.kredi} Kredi / {c.akts} AKTS</div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigate('ders-programi');
                      }}
                      className="text-[10px] bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold px-2 py-1 rounded cursor-pointer"
                    >
                      Program
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => {
                  onNavigate('sinav-programi');
                  onClose();
                }}
                className="w-full p-3 bg-red-50 hover:bg-red-100 text-red-900 rounded-lg border border-red-200 text-left flex items-center justify-between font-bold cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-600" />
                  <span>Sınav Programı</span>
                </div>
              </button>

              <button
                onClick={() => {
                  onNavigate('ders-programi');
                  onClose();
                }}
                className="w-full p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-200 text-left flex items-center justify-between font-bold cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Ders Programı</span>
                </div>
              </button>

              <button
                onClick={() => {
                  onNavigate('transkript');
                  onClose();
                }}
                className="w-full p-3 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg border border-blue-200 text-left flex items-center justify-between font-bold cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Resmi Transkript</span>
                </div>
                <span className="text-[10px] text-blue-700 font-mono">GNO: 3.24</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('mesaj-kutusu');
                  onClose();
                }}
                className="w-full p-3 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-lg border border-gray-200 text-left flex items-center justify-between font-bold cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span>Mesaj Kutusu</span>
                </div>
                <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-bold">10</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('rezervasyonlar');
                  onClose();
                }}
                className="w-full p-3 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-lg border border-gray-200 text-left flex items-center justify-between font-bold cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span>Rezervasyonlar</span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 text-center text-[10px] text-gray-400">
          İstanbul Kent Üniversitesi OİS
        </div>
      </div>
    </div>
  );
};
