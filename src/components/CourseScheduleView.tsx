import React, { useState } from 'react';
import {
  Printer,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  List,
  Grid as GridIcon,
  ChevronRight,
  User,
  ExternalLink
} from 'lucide-react';
import { STUDENT_INFO, COURSE_SCHEDULE, CourseScheduleItem } from '../data/kentData';

export const CourseScheduleView: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState('2026-2027');
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCourse, setSelectedCourse] = useState<CourseScheduleItem | null>(null);

  const days: ('PAZARTESİ' | 'SALI' | 'ÇARŞAMBA' | 'PERŞEMBE' | 'CUMA' | 'CUMARTESİ' | 'PAZAR')[] = [
    'PAZARTESİ',
    'SALI',
    'ÇARŞAMBA',
    'PERŞEMBE',
    'CUMA',
    'CUMARTESİ',
    'PAZAR',
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['GUN', 'DERS KODU', 'DERS ADI', 'DERSLIK', 'SAAT', 'OGRETIM ELEMANI'];
    const rows = COURSE_SCHEDULE.map((c) => [
      `"${c.gun}"`,
      `"${c.dersKodu}"`,
      `"${c.dersAdi}"`,
      `"${c.derslik}"`,
      `"${c.saat}"`,
      `"${c.ogretimElemani}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Istanbul_Kent_Uni_Ders_Programi_Cekmekoy_${STUDENT_INFO.adi}_${STUDENT_INFO.soyadi}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Top action toolbar (hidden on print) */}
      <div className="print:hidden bg-white p-3.5 sm:p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-800 leading-tight">
              Ders Programı
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs flex items-center gap-1 font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Haftalık Tablo Görünümü"
            >
              <GridIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Haftalık Tablo</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded text-xs flex items-center gap-1 font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Liste Görünümü"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Liste</span>
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-medium shadow-xs transition-colors cursor-pointer"
            title="Excel uyumlu CSV indir"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CSV İndir</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-medium shadow-xs transition-colors cursor-pointer"
            title="Ders Programını Yazdır / PDF İndir"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Yazdır / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Container matching Screenshot 3 */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 print:border-none print:shadow-none print:p-0 text-gray-900 font-sans">
        
        {/* Top Date matching Screenshot 3: "22/09/2026" */}
        <div className="flex justify-between items-center text-xs text-gray-500 pb-2 mb-2 border-b border-gray-200">
          <div className="font-bold text-gray-700 text-sm">
            İstanbul Kent Üniversitesi - Ders Programı
          </div>
          <div className="font-mono text-gray-600">22/09/2026</div>
        </div>

        {/* Student Info Table matching Screenshot 3 */}
        <div className="border border-gray-300 text-xs text-gray-800 bg-white mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-300">
            {/* Left Column */}
            <div className="divide-y divide-gray-200">
              <div className="grid grid-cols-3 p-1.5 bg-gray-50/50">
                <span className="font-bold text-gray-700">TC Kimlik No</span>
                <span className="col-span-2 font-mono font-semibold">{STUDENT_INFO.tcKimlikNo}</span>
              </div>
              <div className="grid grid-cols-3 p-1.5">
                <span className="font-bold text-gray-700">Adı</span>
                <span className="col-span-2 font-semibold uppercase">{STUDENT_INFO.adi}</span>
              </div>
              <div className="grid grid-cols-3 p-1.5 bg-gray-50/50">
                <span className="font-bold text-gray-700">Soyadı</span>
                <span className="col-span-2 font-semibold uppercase">{STUDENT_INFO.soyadi}</span>
              </div>
              <div className="grid grid-cols-3 p-1.5">
                <span className="font-bold text-gray-700">Sınıfı</span>
                <span className="col-span-2 font-semibold">{STUDENT_INFO.sinifi}</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="divide-y divide-gray-200">
              <div className="grid grid-cols-3 p-1.5 bg-gray-50/50">
                <span className="font-bold text-gray-700">Fakülte</span>
                <span className="col-span-2 font-medium">{STUDENT_INFO.fakulte}</span>
              </div>
              <div className="grid grid-cols-3 p-1.5">
                <span className="font-bold text-gray-700">Bölüm/Program</span>
                <span className="col-span-2 font-medium">{STUDENT_INFO.bolumProgram}</span>
              </div>
              <div className="grid grid-cols-3 p-1.5 bg-gray-50/50">
                <span className="font-bold text-gray-700">Akademik Yıl</span>
                <span className="col-span-2 font-medium">{STUDENT_INFO.akademikYil}</span>
              </div>
              <div className="grid grid-cols-3 p-1.5">
                <span className="font-bold text-gray-700">Dönem</span>
                <span className="col-span-2 font-medium">Güz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar matching Screenshot 3: Sezon [2026-2027 v] Dönem [Fall v] [Getir] */}
        <div className="print:hidden flex items-center gap-3 py-2 px-1 text-xs text-gray-700 mb-3 border-b border-gray-200">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold">Sezon:</span>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="2026-2027">2026-2027</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold">Dönem:</span>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="Fall">Fall (Güz)</option>
              <option value="Spring">Spring (Bahar)</option>
            </select>
          </div>

          <button
            onClick={() => {}}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded font-medium cursor-pointer transition-colors"
          >
            Getir
          </button>
        </div>

        {/* Timetable Grid View matching Screenshot 3 */}
        {viewMode === 'grid' ? (
          <div className="overflow-x-auto">
            <div className="min-w-[900px] border border-gray-300 rounded">
              {/* Day Headers matching Screenshot 3 */}
              <div className="grid grid-cols-7 border-b border-gray-300 bg-gray-100 text-center font-bold text-xs uppercase text-gray-700 divide-x divide-gray-300">
                {days.map((day) => (
                  <div key={day} className="py-2.5 px-1 tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              {/* Day Columns */}
              <div className="grid grid-cols-7 divide-x divide-gray-200 min-h-[460px] bg-slate-50/20">
                {days.map((day) => {
                  const dayCourses = COURSE_SCHEDULE.filter((c) => c.gun === day);
                  return (
                    <div key={day} className="p-1.5 space-y-2 flex flex-col">
                      {dayCourses.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-[11px] text-gray-300 italic min-h-[100px]">
                          Ders Yok
                        </div>
                      ) : (
                        dayCourses.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => setSelectedCourse(item)}
                            className="p-2 rounded border border-gray-300/90 bg-white hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group text-left relative"
                          >
                            <div className="font-bold text-[11px] text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.dersKodu}
                            </div>
                            <div className="font-semibold text-xs text-gray-800 leading-tight mt-0.5">
                              {item.dersAdi}
                            </div>
                            
                            {/* Location with Çekmeköy prominent */}
                            <div className="text-[11px] text-gray-600 mt-1.5 flex items-center gap-1">
                              <span className="font-medium text-red-700 bg-red-50 px-1 py-0.2 rounded border border-red-200/50">
                                {item.derslik}
                              </span>
                            </div>

                            {/* Time range */}
                            <div className="text-[11px] font-bold text-gray-700 mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span>{item.saat}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {days.map((day) => {
              const dayCourses = COURSE_SCHEDULE.filter((c) => c.gun === day);
              if (dayCourses.length === 0) return null;
              return (
                <div key={day} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 font-bold text-xs uppercase tracking-wide text-gray-700 border-b border-gray-200">
                    {day}
                  </div>
                  <div className="divide-y divide-gray-100">
                    {dayCourses.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setSelectedCourse(c)}
                        className="p-3 hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs cursor-pointer"
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-gray-900 text-sm">
                            {c.dersKodu} - {c.dersAdi}
                          </div>
                          <div className="text-gray-500 flex items-center gap-2">
                            <span>Öğretim Elemanı: <strong className="text-gray-700">{c.ogretimElemani}</strong></span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded">
                            {c.derslik}
                          </span>
                          <span className="font-mono font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded">
                            {c.saat}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer info notice */}
        <div className="mt-6 pt-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 gap-2">
          <span>İstanbul Kent Üniversitesi Ders Bilgi Sistemi</span>
          <span className="italic">
            Derslik değişiklikleri ve duyurular için OİS Duyurular panelini takip ediniz.
          </span>
        </div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div
          onClick={() => setSelectedCourse(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-md w-full overflow-hidden"
          >
            <div className="bg-[#28323c] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">
                  {selectedCourse.dersKodu} - {selectedCourse.dersAdi}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-gray-400 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs text-gray-700">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded text-slate-900">
                <div className="font-bold text-xs flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  Derslik: {selectedCourse.derslik}
                </div>
              </div>

              <div className="space-y-1.5 bg-gray-50 p-3 rounded border border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Gün:</span>
                  <span className="font-bold text-gray-900">{selectedCourse.gun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Saat Aralığı:</span>
                  <span className="font-bold text-gray-900">{selectedCourse.saat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Öğretim Elemanı:</span>
                  <span className="font-bold text-gray-900">{selectedCourse.ogretimElemani}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/50 rounded border border-blue-100 space-y-1">
                <span className="font-bold text-blue-900 block">Ders Materyalleri ve CMS:</span>
                <p className="text-[11px] text-blue-800">
                  Bu dersin haftalık sunumları, ders notları ve ödev teslimleri CMS (Öğrenim Yönetim Sistemi) üzerinden yayınlanmaktadır.
                </p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-xs font-semibold"
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
