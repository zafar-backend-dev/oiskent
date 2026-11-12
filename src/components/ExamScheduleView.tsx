import React, { useState } from 'react';
import {
  Printer,
  Download,
  Search,
  CheckCircle2,
  Calendar,
  MapPin,
  Info,
  Clock,
  Building2,
  AlertTriangle,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { KentLogo } from './KentLogo';
import { STUDENT_INFO, EXAM_SCHEDULE, ExamItem } from '../data/kentData';

export const ExamScheduleView: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null);

  const filteredExams = EXAM_SCHEDULE.filter((exam) => {
    const q = filterQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      exam.dersAdi.toLowerCase().includes(q) ||
      exam.dersKodu.toLowerCase().includes(q) ||
      exam.ogretimElemani.toLowerCase().includes(q) ||
      exam.derslik.toLowerCase().includes(q) ||
      exam.tarihSaat.toLowerCase().includes(q)
    );
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = [
      'SINAV TIPI',
      'DERS KODU',
      'DERS ADI',
      'TARIH - SAAT',
      'KAMPUS',
      'SON TARIH',
      'DERSLIK',
      'OGRETIM ELEMANI',
      'ACIKLAMA',
    ];

    const rows = EXAM_SCHEDULE.map((e) => [
      `"${e.sinavTipi}"`,
      `"${e.dersKodu}"`,
      `"${e.dersAdi}"`,
      `"${e.tarihSaat}"`,
      `"${e.kampus}"`,
      `"${e.sonTarih || '-'}"`,
      `"${e.derslik}"`,
      `"${e.ogretimElemani}"`,
      `"${e.aciklama.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Istanbul_Kent_Uni_Sinav_Programi_Cekmekoy_${STUDENT_INFO.adi}_${STUDENT_INFO.soyadi}.csv`);
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
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-800 leading-tight">
              Sınav Programı
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Search */}
          <div className="relative flex-1 sm:w-60">
            <input
              type="text"
              placeholder="Sınav veya derslik ara..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
            title="Sınav Programını Resmi Belge Olarak Yazdır / PDF İndir"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Yazdır / PDF</span>
          </button>
        </div>
      </div>

      {/* Official Sınav Programı Document Container matching Screenshot 4 */}
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm border border-gray-200 print:border-none print:shadow-none print:p-0 text-gray-900 font-sans">
        
        {/* Document Header matching screenshot 4 */}
        <div className="relative pb-6 border-b border-gray-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Official Kent Logo */}
            <div className="flex items-center">
              <KentLogo variant="document" showTagline={true} />
            </div>

            {/* Center: Official Title */}
            <div className="text-center">
              <div className="text-xs sm:text-sm font-semibold tracking-wider text-gray-600 uppercase">
                T.C.
              </div>
              <div className="text-base sm:text-xl font-bold tracking-wide text-gray-900 uppercase">
                İSTANBUL KENT ÜNİVERSİTESİ
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-700">
                (Öğrenci İşleri Direktörlüğü)
              </div>
              <div className="text-sm sm:text-base font-extrabold text-[#a81015] tracking-widest mt-2 uppercase">
                SINAV PROGRAMI
              </div>
            </div>

            {/* Right: Date */}
            <div className="text-right text-xs text-gray-600 sm:self-start">
              <span className="font-medium text-gray-500">Tarih: </span>
              <span className="font-semibold text-gray-800">{STUDENT_INFO.tarih}</span>
            </div>
          </div>

          {/* Student Info Table matching Screenshot 4 */}
          <div className="mt-6 border border-gray-400 text-xs text-gray-800 bg-white">
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
                  <span className="col-span-2 font-medium">Fall</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Table matching Screenshot 4 */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100/90 text-gray-800 font-bold border-b border-gray-400 text-[11px] sm:text-xs">
                <th className="border border-gray-300 p-2 whitespace-nowrap uppercase">SINAV TİPİ</th>
                <th className="border border-gray-300 p-2 whitespace-nowrap uppercase">DERS KODU</th>
                <th className="border border-gray-300 p-2 whitespace-nowrap uppercase">DERS ADI</th>
                <th className="border border-gray-300 p-2 whitespace-nowrap uppercase">TARİH - SAAT</th>
                <th className="border border-gray-300 p-2 whitespace-nowrap uppercase">KAMPÜS</th>
                <th className="border border-gray-300 p-2 whitespace-nowrap uppercase">SON TARİH</th>
                <th className="border border-gray-300 p-2 whitespace-nowrap uppercase">DERSLİK</th>
                <th className="border border-gray-300 p-2 whitespace-nowrap uppercase">ÖĞRETİM ELEMANI</th>
                <th className="border border-gray-300 p-2 min-w-[200px] uppercase">Açıklama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredExams.map((exam, index) => (
                <tr
                  key={exam.id}
                  onClick={() => setSelectedExam(exam)}
                  className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                  }`}
                >
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-medium text-gray-700">
                    {exam.sinavTipi}
                  </td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-mono font-bold text-gray-900">
                    {exam.dersKodu}
                  </td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-semibold text-gray-800">
                    {exam.dersAdi}
                  </td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-medium text-gray-700">
                    {exam.tarihSaat}
                  </td>
                  {/* Changed Kağıthane to Çekmeköy plainly */}
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-medium text-gray-800">
                    {exam.kampus}
                  </td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap text-gray-500">
                    {exam.sonTarih || ''}
                  </td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-mono font-bold text-slate-800">
                    {exam.derslik}
                  </td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-medium text-gray-700">
                    {exam.ogretimElemani}
                  </td>
                  <td className="border border-gray-300 p-2 text-gray-600 text-[11px] leading-relaxed">
                    {exam.aciklama || ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Official Document Footer Notice */}
        <div className="mt-8 pt-4 border-t border-gray-300 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 gap-2">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>
              Bu belge İstanbul Kent Üniversitesi Öğrenci Bilgi Sistemi (OİS) üzerinden üretilmiştir.
            </span>
          </div>
          <div className="font-mono text-gray-600">
            Güvenlik Kodu: KNT-OIS-2026-9835
          </div>
        </div>
      </div>

      {/* Sınav Detay Modal */}
      {selectedExam && (
        <div
          onClick={() => setSelectedExam(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-lg w-full overflow-hidden"
          >
            <div className="bg-[#28323c] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-400" />
                <h3 className="font-bold text-sm">
                  {selectedExam.dersKodu} - {selectedExam.dersAdi}
                </h3>
              </div>
              <button
                onClick={() => setSelectedExam(null)}
                className="text-gray-400 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="bg-red-50 border-l-4 border-red-600 p-3 rounded-r text-red-900">
                <div className="font-bold flex items-center gap-1 text-sm">
                  <MapPin className="w-4 h-4 text-red-600" />
                  Sınav Kampüsü: {selectedExam.kampus} Kampüsü
                </div>
                <div className="text-[11px] text-red-700 mt-1">
                  Sınav salonu: <span className="font-bold">{selectedExam.derslik}</span>. Lütfen sınav saatinden en az 15 dakika önce Çekmeköy Kampüsünde hazır bulununuz.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">
                <div>
                  <span className="font-semibold text-gray-500">Sınav Tipi:</span>
                  <p className="font-bold text-gray-900">{selectedExam.sinavTipi}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-500">Tarih - Saat:</span>
                  <p className="font-bold text-gray-900">{selectedExam.tarihSaat}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-500">Öğretim Elemanı:</span>
                  <p className="font-bold text-gray-900">{selectedExam.ogretimElemani}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-500">Kredi / AKTS:</span>
                  <p className="font-bold text-gray-900">{selectedExam.kredi} Kredi / {selectedExam.akts} AKTS</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-1">Sınav Yönergeleri & Açıklama:</h4>
                <p className="bg-blue-50/60 p-2.5 rounded border border-blue-200 text-blue-900 leading-relaxed text-[11px]">
                  {selectedExam.aciklama || 'Belirtilmiş özel bir yönerge bulunmamaktadır. Standart sınav kuralları geçerlidir.'}
                </p>
              </div>

              <div className="text-[11px] text-gray-500 flex items-center gap-1.5 pt-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Öğrenci kimliği olmayan öğrenciler sınav salonuna alınmayacaktır.</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setSelectedExam(null)}
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
