import React, { useState } from 'react';
import {
  User,
  Mail,
  ArrowDownLeft,
  ArrowUpRight,
  PenSquare,
  Megaphone,
  Calendar,
  FileText,
  MapPin,
  ExternalLink,
  Clock,
  Video,
  CheckCircle,
  Folder,
  Award,
  ChevronRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import {
  STUDENT_INFO,
  CURRENT_ENROLLED_COURSES,
  ANNOUNCEMENTS,
  INITIAL_MESSAGES,
  MOCK_RESERVATIONS,
  Announcement
} from '../data/kentData';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
  onOpenNewMessage: () => void;
  onSelectAnnouncement: (ann: Announcement) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenNewMessage,
  onSelectAnnouncement,
}) => {
  const [activeFolderOpen, setActiveFolderOpen] = useState(true);

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Main 3-Column Grid matching Screenshot 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN: Dersler (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded shadow-sm border border-gray-300 overflow-hidden">
            {/* Header matching screenshot 1: dark slate */}
            <div className="bg-[#343e49] text-white py-2 px-4 text-center font-bold text-sm tracking-wide">
              Dersler
            </div>

            <div className="p-3 space-y-3 text-xs">
              {/* Danışman Info Box */}
              <div className="bg-gray-50 p-2.5 rounded border border-gray-200 space-y-1.5">
                <div className="flex items-center gap-2 text-gray-800">
                  <User className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="font-semibold">Danışman:</span>
                  <span className="font-bold text-gray-900">{STUDENT_INFO.danisman}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                  <a
                    href={`mailto:${STUDENT_INFO.danismanEmail}`}
                    className="text-blue-700 hover:underline font-mono text-[11px]"
                  >
                    {STUDENT_INFO.danismanEmail}
                  </a>
                </div>
              </div>

              {/* Fall Dönemi Dersleri Header */}
              <div
                onClick={() => setActiveFolderOpen(!activeFolderOpen)}
                className="bg-gray-200/80 hover:bg-gray-200 px-3 py-1.5 rounded text-gray-800 font-bold flex items-center justify-between cursor-pointer transition-colors"
              >
                <span>Fall Dönemi Dersleri</span>
                <span className="text-[11px] text-gray-600">
                  {CURRENT_ENROLLED_COURSES.length} Ders
                </span>
              </div>

              {/* Course list */}
              {activeFolderOpen && (
                <div className="divide-y divide-gray-100 max-h-[480px] overflow-y-auto pr-1">
                  {CURRENT_ENROLLED_COURSES.map((course) => (
                    <div
                      key={course.kod}
                      className="py-2 px-1 hover:bg-slate-50 flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
                        <div>
                          <div className="font-bold text-gray-900 leading-tight">
                            {course.kod} {course.ad}
                          </div>
                          <div className="text-[10px] text-gray-500">
                            {course.hocasi} • {course.kredi} Kredi / {course.akts} AKTS
                          </div>
                        </div>
                      </div>
                      <a
                        href={course.cmsUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`${course.kod} ${course.ad} CMS ders materyalleri açılıyor.`);
                        }}
                        className="bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded transition-colors"
                        title="CMS Dersi Aç"
                      >
                        CMS
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Rezervasyonlar, Muafiyet, Canlı Dersler, Mesaj Kutusu (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Rezervasyonlar Card */}
          <div className="bg-white rounded shadow-sm border border-gray-300 overflow-hidden">
            <div className="bg-[#343e49] text-white py-2 px-4 text-center font-bold text-sm tracking-wide flex items-center justify-between">
              <span className="mx-auto">Rezervasyonlar</span>
            </div>
            <div className="p-3 text-xs space-y-2">
              {MOCK_RESERVATIONS.map((res) => (
                <div key={res.id} className="p-2 bg-gray-50 rounded border border-gray-200">
                  <div className="font-semibold text-gray-900 leading-tight">{res.alan}</div>
                  <div className="text-[11px] text-gray-500 mt-1 flex justify-between items-center">
                    <span>{res.tarih} | {res.saat}</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded text-[10px]">
                      {res.durum}
                    </span>
                  </div>
                </div>
              ))}
              <button
                onClick={() => onNavigate('rezervasyonlar')}
                className="w-full py-1.5 text-center text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded border border-blue-200 transition-colors"
              >
                + Yeni Rezervasyon Yap
              </button>
            </div>
          </div>

          {/* Dersler Muafiyet Sınavları Başvuru */}
          <div className="bg-white rounded shadow-sm border border-gray-300 overflow-hidden">
            <div className="bg-[#343e49] text-white py-2 px-4 text-center font-bold text-sm tracking-wide">
              Dersler Muafiyet Sınavları Başvuru
            </div>
            <div className="p-2 text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#343e49] text-white text-[11px]">
                    <th className="p-1.5 font-bold">Ders Adı</th>
                    <th className="p-1.5 font-bold text-right">Kredi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="p-2 text-gray-800 font-medium">İNG101 İngilizce 1 (Muaf)</td>
                    <td className="p-2 text-right font-mono font-bold text-emerald-700">2 (Başarılı)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-2 text-gray-800 font-medium">BİL100 Bilgisayar Okuryazarlığı</td>
                    <td className="p-2 text-right font-mono font-bold text-emerald-700">2 (Muaf)</td>
                  </tr>
                </tbody>
              </table>
              <div className="p-2 text-center">
                <button
                  onClick={() => onNavigate('muafiyet-basvuru')}
                  className="text-[11px] text-blue-700 hover:underline font-medium"
                >
                  Tüm Muafiyet Başvurularını Görüntüle →
                </button>
              </div>
            </div>
          </div>

          {/* Canlı Dersler */}
          <div className="bg-white rounded shadow-sm border border-gray-300 overflow-hidden">
            <div className="bg-[#343e49] text-white py-2 px-4 text-center font-bold text-sm tracking-wide">
              Canlı Dersler
            </div>
            <div className="p-3 text-xs text-gray-600 space-y-2">
              <div className="p-2 bg-blue-50/60 rounded border border-blue-200">
                <div className="font-bold text-blue-900">TDL101 Türk Dili-I (Asenkron)</div>
                <div className="text-[11px] text-blue-700 mt-0.5">Cumartesi 13:00 - 16:00 • Çekmeköy Online</div>
                <button
                  onClick={() => alert('Canlı ders oturumuna bağlanılıyor...')}
                  className="mt-2 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-semibold"
                >
                  Canlı Derse Katıl
                </button>
              </div>
            </div>
          </div>

          {/* Mesaj Kutusu matching Screenshot 1 */}
          <div className="bg-white rounded shadow-sm border border-gray-300 overflow-hidden">
            <div className="bg-[#343e49] text-white py-2 px-4 text-center font-bold text-sm tracking-wide">
              Mesaj Kutusu
            </div>
            <div className="p-3 text-xs space-y-2">
              <button
                onClick={() => onNavigate('mesaj-kutusu')}
                className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-100 text-gray-800 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">Gelen Kutusu</span>
                </div>
                {/* 10 Badge in Green matching Screenshot 1 */}
                <span className="bg-[#107c41] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                  10
                </span>
              </button>

              <button
                onClick={() => onNavigate('mesaj-kutusu')}
                className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-100 text-gray-800 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">Giden Kutusu</span>
                </div>
                <span className="text-gray-400 font-mono text-[11px]">2</span>
              </button>

              <button
                onClick={onOpenNewMessage}
                className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-gray-800 transition-colors text-left font-semibold text-blue-700"
              >
                <PenSquare className="w-4 h-4 text-blue-600" />
                <span>Mesaj Yaz</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Online Sınavlar & Duyurular (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Online Sınavlar Card matching Screenshot 1 */}
          <div className="bg-white rounded shadow-sm border border-gray-300 overflow-hidden">
            <div className="bg-[#343e49] text-white py-2 px-4 text-center font-bold text-sm tracking-wide">
              Online Sınavlar
            </div>
            <div className="p-3 text-xs space-y-2">
              <div className="p-2.5 bg-slate-50 rounded border border-gray-200">
                <div className="flex items-center justify-between font-bold text-gray-900">
                  <span>TDL101 Türk Dili-I</span>
                  <span className="text-gray-600 bg-gray-200 text-[10px] px-1.5 py-0.5 rounded">
                    Ara Sınav
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 mt-1">
                  14.11.2026 - 12:00 | Bilgisayar laboratuvarında gözetimli çevrim içi sınav.
                </p>
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => onNavigate('sinav-programi')}
                    className="text-[11px] text-blue-700 font-bold hover:underline"
                  >
                    Sınav Detayları →
                  </button>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded border border-gray-200">
                <div className="flex items-center justify-between font-bold text-gray-900">
                  <span>MDF109 Kimya Laboratuvarı</span>
                  <span className="text-blue-700 bg-blue-100 text-[10px] px-1.5 py-0.5 rounded">
                    Ödev / Proje
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 mt-1">
                  Son Teslim: 25.11.2026 - 23:59 | OİS üzerinden rapor yüklemesi.
                </p>
              </div>
            </div>
          </div>

          {/* Duyurular Card matching Screenshot 1 */}
          <div className="bg-white rounded shadow-sm border border-gray-300 overflow-hidden">
            <div className="bg-[#343e49] text-white py-2 px-4 text-center font-bold text-sm tracking-wide">
              Duyurular
            </div>
            <div className="p-3 text-xs divide-y divide-gray-200 space-y-2">
              {ANNOUNCEMENTS.map((ann) => (
                <div
                  key={ann.id}
                  onClick={() => onSelectAnnouncement(ann)}
                  className="pt-2 first:pt-0 cursor-pointer hover:bg-gray-50/80 p-1.5 rounded transition-colors group"
                >
                  <div className="flex items-start gap-2">
                    <Megaphone className="w-3.5 h-3.5 text-gray-500 group-hover:text-red-600 transition-colors mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900 text-xs leading-snug group-hover:text-blue-700">
                        {ann.baslik}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-2">
                        <span>{ann.tarih}</span>
                        <span>•</span>
                        <span className="font-medium text-gray-700">{ann.kategori}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-center">
                <button
                  onClick={() => onNavigate('duyurular')}
                  className="text-[11px] text-blue-700 hover:underline font-bold"
                >
                  Tüm Duyuruları Gör ({ANNOUNCEMENTS.length}) →
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
