import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, ShieldCheck, Printer, Clock } from 'lucide-react';
import { KentLogo } from './KentLogo';
import { STUDENT_INFO } from '../data/kentData';

interface DocumentRequestViewProps {
  initialTab?: 'talep' | 'hazirlik';
}

export const DocumentRequestView: React.FC<DocumentRequestViewProps> = ({
  initialTab = 'talep',
}) => {
  const [selectedDocType, setSelectedDocType] = useState('ogrenci-belgesi');
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [reason, setReason] = useState('Staj ve Resmi Kurum Başvurusu');
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);

  const documentTypes = [
    { id: 'ogrenci-belgesi', name: 'Öğrenci Belgesi (Aktif Öğrenci Durum Belgesi)' },
    { id: 'transkript-resmi', name: 'Resmi Onaylı Transkript (Türkçe/İngilizce)' },
    { id: 'disiplin-belgesi', name: 'Disiplin Sicil Durum Belgesi' },
    { id: 'askerlik-belgesi', name: 'Ek-C2 Askerlik Durum / Tecil Belgesi' },
    { id: 'yatay-gecis', name: 'Yatay Geçişe Engel Olmadığına Dair Belge' },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedDoc(selectedDocType);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-800">
              Online Belge Talep ve e-İmzalı Dokümanlar
            </h2>
            <p className="text-xs text-gray-500">
              e-Devlet ve YÖKSİS entegrasyonlu anında doğrulanabilir karekodlu belgeler
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Request Form (5 cols) */}
        <div className="md:col-span-5 bg-white p-5 rounded-lg shadow-sm border border-gray-200 space-y-4 text-xs">
          <h3 className="font-bold text-sm text-gray-800 border-b border-gray-100 pb-2">
            Yeni Belge Başvurusu
          </h3>

          <form onSubmit={handleGenerate} className="space-y-3">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Belge Türü Seçiniz:
              </label>
              <select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500"
              >
                {documentTypes.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Belge Dili:
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="lang"
                    checked={language === 'tr'}
                    onChange={() => setLanguage('tr')}
                  />
                  <span>Türkçe</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="lang"
                    checked={language === 'en'}
                    onChange={() => setLanguage('en')}
                  />
                  <span>İngilizce (English)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Talep Nedeni / Verileceği Kurum:
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Örn: Staj başvurusu, Vize işlemleri"
                className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="p-3 bg-gray-50 rounded border border-gray-200 space-y-1 text-gray-600">
              <span className="font-bold text-gray-800 block">Kayıtlı Bilgileriniz:</span>
              <p>Öğrenci: {STUDENT_INFO.adi} {STUDENT_INFO.soyadi} ({STUDENT_INFO.ogrenciNo})</p>
              <p>Fakülte: {STUDENT_INFO.fakulte}</p>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Belgeyi Üret ve Görüntüle
            </button>
          </form>
        </div>

        {/* Right: Document Preview (7 cols) */}
        <div className="md:col-span-7 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-4">
            <span className="font-bold text-xs uppercase text-gray-600">
              Elektronik Belge Önizleme
            </span>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1 px-3 py-1 bg-slate-800 text-white rounded text-xs font-semibold hover:bg-slate-900"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / İndir</span>
            </button>
          </div>

          {/* Official Document Sheet */}
          <div className="border-2 border-gray-300 p-6 rounded text-xs text-gray-800 bg-amber-50/20 font-serif space-y-4">
            <div className="text-center space-y-0.5">
              <div className="font-sans font-bold text-sm tracking-wide text-gray-900">
                T.C. İSTANBUL KENT ÜNİVERSİTESİ REKTÖRLÜĞÜ
              </div>
              <div className="text-[11px] font-sans font-semibold text-gray-600">
                Öğrenci İşleri Direktörlüğü
              </div>
              <div className="text-xs font-sans font-bold text-[#a81015] uppercase tracking-wider pt-2">
                {selectedDocType === 'ogrenci-belgesi' ? 'ÖĞRENCİ BELGESİ' : 'RESMİ ONAYLI DURUM BELGESİ'}
              </div>
            </div>

            <div className="pt-2 text-[11px] leading-relaxed space-y-3 font-sans">
              <p>
                Aşağıda açık kimlik bilgileri yer alan{' '}
                <strong>{STUDENT_INFO.adi} {STUDENT_INFO.soyadi}</strong>, Üniversitemiz{' '}
                <strong>{STUDENT_INFO.fakulte}</strong>{' '}
                <strong>{STUDENT_INFO.bolumProgram}</strong> bölümünde{' '}
                <strong>{STUDENT_INFO.sinifi}. sınıf</strong> kayıtlı ve aktif öğrencimizdir.
              </p>
              
              <div className="bg-white p-3 border border-gray-300 rounded space-y-1 font-mono text-[11px]">
                <div>T.C. Kimlik No: {STUDENT_INFO.tcKimlikNo}</div>
                <div>Öğrenci Numarası: {STUDENT_INFO.ogrenciNo}</div>
                <div>Öğrenim Türü: Örgün Öğretim</div>
                <div>Kayıt Tarihi: {STUDENT_INFO.kayitTarihi}</div>
                <div>Genel Not Ortalaması: {STUDENT_INFO.gno} / 4.00</div>
              </div>

              <p>
                İşbu belge, ilgilinin talebi üzerine <strong>"{reason}"</strong> amacıyla düzenlenmiş olup, 5070 sayılı Elektronik İmza Kanunu gereğince e-imzalıdır.
              </p>
            </div>

            {/* Document Verification Footer */}
            <div className="pt-4 border-t border-gray-300 flex items-center justify-between text-[10px] font-sans text-gray-500">
              <div>
                <div>Belge No: KNT-BELGE-2026-98356</div>
                <div>Doğrulama Kodu: https://turkiye.gov.tr/belge-dogrulama</div>
              </div>
              <div className="text-right">
                <div className="w-14 h-14 bg-gray-200 border border-gray-400 flex items-center justify-center font-mono text-[8px] text-gray-700">
                  [KAREKOD]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
