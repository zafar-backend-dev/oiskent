import React from 'react';
import { Printer, Download, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { KentLogo } from './KentLogo';
import { STUDENT_INFO, TRANSCRIPT_DATA } from '../data/kentData';

export const TranscriptView: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Top action bar */}
      <div className="print:hidden bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-800">
              Resmi Not Dökümü (Transkript)
            </h2>
            <p className="text-xs text-gray-500">
              Genel Not Ortalaması (GNO): <span className="font-bold text-blue-700">{STUDENT_INFO.gno} / 4.00</span> • Toplam Kredi: 64 AKTS
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Resmi Transkripti Yazdır / PDF</span>
        </button>
      </div>

      {/* Official Transcript Document */}
      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-sm border border-gray-300 print:border-none print:shadow-none print:p-0 text-gray-900 font-sans">
        
        {/* Letterhead */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b-2 border-gray-300">
          <KentLogo variant="document" />
          <div className="text-center">
            <div className="text-xs text-gray-600 font-semibold tracking-wider uppercase">T.C.</div>
            <div className="text-lg sm:text-xl font-black text-gray-900 uppercase">İSTANBUL KENT ÜNİVERSİTESİ</div>
            <div className="text-xs font-bold text-[#a81015] tracking-widest uppercase mt-0.5">ÖĞRENCİ İŞLERİ DİREKTÖRLÜĞÜ</div>
            <div className="text-sm font-extrabold text-gray-800 mt-1 uppercase underline underline-offset-4">LİSANS NOT DÖKÜM BELGESİ (TRANSKRİPT)</div>
          </div>
          <div className="text-right text-xs text-gray-500">
            <div>Barkod: <span className="font-mono font-bold text-gray-800">KNT-TR-2026-9835</span></div>
            <div>Tarih: {STUDENT_INFO.tarih}</div>
          </div>
        </div>

        {/* Student metadata */}
        <div className="my-5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-gray-50 p-3 rounded border border-gray-300">
          <div>
            <span className="text-gray-500 block">Öğrenci Adı Soyadı:</span>
            <span className="font-bold text-gray-900 uppercase">{STUDENT_INFO.adi} {STUDENT_INFO.soyadi}</span>
          </div>
          <div>
            <span className="text-gray-500 block">T.C. Kimlik / Öğrenci No:</span>
            <span className="font-mono font-bold text-gray-900">{STUDENT_INFO.tcKimlikNo} / {STUDENT_INFO.ogrenciNo}</span>
          </div>
          <div>
            <span className="text-gray-500 block">Fakülte / Bölüm:</span>
            <span className="font-bold text-gray-900">Mühendislik / Bilgisayar Müh.</span>
          </div>
          <div>
            <span className="text-gray-500 block">Sınıf / Statü:</span>
            <span className="font-bold text-gray-900">2. Sınıf / Aktif</span>
          </div>
        </div>

        {/* Semesters list */}
        <div className="space-y-6">
          {TRANSCRIPT_DATA.map((term, tIdx) => (
            <div key={tIdx} className="border border-gray-300 rounded overflow-hidden">
              <div className="bg-gray-100 px-3 py-2 border-b border-gray-300 flex justify-between items-center text-xs font-bold text-gray-800">
                <span>{term.donemAdi} ({term.akademikYil})</span>
                {term.dno > 0 && (
                  <div className="text-gray-700">
                    DNO: <span className="text-blue-700">{term.dno.toFixed(2)}</span> | GNO: <span className="text-blue-700">{term.gno.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-[11px]">
                    <th className="p-2">Ders Kodu</th>
                    <th className="p-2">Ders Adı</th>
                    <th className="p-2 text-center">Kredi</th>
                    <th className="p-2 text-center">AKTS</th>
                    <th className="p-2 text-center">Harf Notu</th>
                    <th className="p-2 text-center">Katsayı</th>
                    <th className="p-2 text-right">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {term.dersler.map((c, cIdx) => (
                    <tr key={cIdx} className="hover:bg-gray-50">
                      <td className="p-2 font-mono font-bold text-gray-900">{c.kod}</td>
                      <td className="p-2 font-medium text-gray-800">{c.ad}</td>
                      <td className="p-2 text-center font-mono">{c.kredi}</td>
                      <td className="p-2 text-center font-mono">{c.akts}</td>
                      <td className="p-2 text-center font-bold font-mono text-gray-900">{c.harfNotu}</td>
                      <td className="p-2 text-center font-mono">{c.basariKatsayisi ? c.basariKatsayisi.toFixed(1) : '-'}</td>
                      <td className="p-2 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.durum === 'Geçti'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {c.durum}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Transcript Summary */}
        <div className="mt-6 pt-4 border-t-2 border-gray-300 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-700 gap-4">
          <div className="space-y-1">
            <div><strong className="text-gray-900">Eğitim Dili:</strong> %100 İngilizce / Türkçe Destekli</div>
            <div><strong className="text-gray-900">Akademik Durum:</strong> Başarılı Öğrenci</div>
          </div>
          <div className="p-3 bg-gray-50 rounded border border-gray-300 text-center min-w-[200px]">
            <div className="text-gray-500 text-[11px]">Genel Not Ortalaması (GNO)</div>
            <div className="text-2xl font-black text-blue-700">3.24 / 4.00</div>
            <div className="text-[10px] text-emerald-700 font-semibold">Toplam Tamamlanan AKTS: 64</div>
          </div>
        </div>

        {/* Digital Verification */}
        <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-2 text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Bu belge 5070 sayılı Elektronik İmza Kanunu uyarınca güvenli elektronik imza ile imzalanmıştır.</span>
          </div>
          <div className="font-mono text-gray-600">e-Devlet Doğrulama Kodu: 9835-KNT-2026</div>
        </div>
      </div>
    </div>
  );
};
