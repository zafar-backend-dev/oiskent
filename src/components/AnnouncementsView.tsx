import React, { useState } from 'react';
import { Megaphone, Calendar, Tag, ChevronRight, X, AlertCircle } from 'lucide-react';
import { ANNOUNCEMENTS, Announcement } from '../data/kentData';

interface AnnouncementsViewProps {
  selectedAnnouncement?: Announcement | null;
  onCloseDetail?: () => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  selectedAnnouncement,
  onCloseDetail,
}) => {
  const [activeModalAnn, setActiveModalAnn] = useState<Announcement | null>(
    selectedAnnouncement || null
  );

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-800">
              Üniversite Duyuruları & Senato Kararları
            </h2>
            <p className="text-xs text-gray-500">
              İstanbul Kent Üniversitesi Rektörlüğü ve Fakülte duyuru akışı
            </p>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        {ANNOUNCEMENTS.map((ann) => (
          <div
            key={ann.id}
            onClick={() => setActiveModalAnn(ann)}
            className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {ann.onemli && (
                  <span className="bg-red-100 text-red-800 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                    Önemli Duyuru
                  </span>
                )}
                <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded">
                  {ann.kategori}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>{ann.tarih}</span>
              </div>
            </div>

            <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-blue-700 transition-colors">
              {ann.baslik}
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">
              {ann.ozet}
            </p>

            <div className="pt-2 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>Detaylı Açıklamayı Oku</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Announcement Detail Modal */}
      {activeModalAnn && (
        <div
          onClick={() => {
            setActiveModalAnn(null);
            onCloseDetail?.();
          }}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-xl w-full overflow-hidden"
          >
            <div className="bg-[#28323c] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  {activeModalAnn.kategori}
                </span>
              </div>
              <button
                onClick={() => {
                  setActiveModalAnn(null);
                  onCloseDetail?.();
                }}
                className="text-gray-400 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs text-gray-700 leading-relaxed">
              <div className="border-b border-gray-200 pb-3">
                <div className="text-[11px] text-gray-500 font-mono mb-1">
                  Yayım Tarihi: {activeModalAnn.tarih}
                </div>
                <h3 className="font-bold text-base text-gray-900">
                  {activeModalAnn.baslik}
                </h3>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 text-xs text-gray-800">
                <p>{activeModalAnn.icerik}</p>
              </div>

              <div className="text-[11px] text-gray-500 bg-amber-50 p-3 rounded border border-amber-200/80">
                <p className="font-semibold text-amber-900 mb-0.5">Öğrenci Bilgilendirme:</p>
                <p className="text-amber-800">
                  Sorularınız için Çekmeköy Kampüsü Öğrenci İşleri Ofisi ile iletişime geçebilirsiniz.
                </p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => {
                  setActiveModalAnn(null);
                  onCloseDetail?.();
                }}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded text-xs font-semibold"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
