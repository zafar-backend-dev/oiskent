import React from 'react';
import { CheckSquare, AlertCircle, FileText, MapPin } from 'lucide-react';
import { CURRENT_ENROLLED_COURSES, STUDENT_INFO } from '../data/kentData';

export const ExamResultsView: React.FC = () => {
  const grades = [
    { kod: 'MDF203', ad: 'Diferansiyel Denklemler', vize: 88, ortalama: 62.4, durum: 'Açıklandı', harf: 'AA Beklentisi' },
    { kod: 'MDF205', ad: 'İş Sağlığı ve Güvenliği', vize: 92, ortalama: 74.1, durum: 'Açıklandı', harf: 'AA Beklentisi' },
    { kod: 'MDF201', ad: 'Mesleki İngilizce 1', vize: 85, ortalama: 70.0, durum: 'Açıklandı', harf: 'BA Beklentisi' },
    { kod: 'BİL207', ad: 'Sayısal Mantık Tasarımı', vize: 78, ortalama: 58.5, durum: 'Açıklandı', harf: 'BA Beklentisi' },
    { kod: 'MDF107', ad: 'Genel Kimya', vize: 82, ortalama: 64.2, durum: 'Açıklandı', harf: 'BA Beklentisi' },
    { kod: 'MDF109', ad: 'Genel Kimya Laboratuvar', vize: 95, ortalama: 80.3, durum: 'Açıklandı', harf: 'AA Beklentisi' },
    { kod: 'BİL201', ad: 'Ayrık Matematik', vize: 74, ortalama: 55.0, durum: 'Açıklandı', harf: 'BB Beklentisi' },
    { kod: 'BİL209', ad: 'İşletim Sistemleri', vize: 86, ortalama: 66.8, durum: 'Açıklandı', harf: 'BA Beklentisi' },
    { kod: 'BİL700', ad: 'E-Ticaret', vize: 90, ortalama: 75.4, durum: 'Açıklandı', harf: 'AA Beklentisi' },
    { kod: 'BİL203', ad: 'Veri Yapıları ve Algoritmalar', vize: 84, ortalama: 61.2, durum: 'Açıklandı', harf: 'BA Beklentisi' },
    { kod: 'TDL101', ad: 'Türk Dili-I', vize: 96, ortalama: 78.0, durum: 'Açıklandı', harf: 'AA Beklentisi' },
  ];

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-800">
              Sınav Sonuçları (2026-2027 Güz Yarıyılı)
            </h2>
            <p className="text-xs text-gray-500">
              Çekmeköy Kampüsünde icra edilen ara sınav (vize) ve laboratuvar notları
            </p>
          </div>
        </div>

        <div className="text-right text-xs bg-gray-50 px-3 py-1.5 rounded border border-gray-200">
          <span className="text-gray-500">Öğrenci: </span>
          <span className="font-bold text-gray-900">{STUDENT_INFO.adi} {STUDENT_INFO.soyadi}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#343e49] text-white text-[11px]">
                <th className="p-3">Ders Kodu</th>
                <th className="p-3">Ders Adı</th>
                <th className="p-3 text-center">Ara Sınav (Vize)</th>
                <th className="p-3 text-center">Sınıf Ortalaması</th>
                <th className="p-3 text-center">Tahmini Harf Notu</th>
                <th className="p-3 text-center">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {grades.map((g, idx) => (
                <tr key={idx} className="hover:bg-blue-50/40">
                  <td className="p-3 font-mono font-bold text-gray-900">{g.kod}</td>
                  <td className="p-3 font-medium text-gray-800">{g.ad}</td>
                  <td className="p-3 text-center font-mono font-bold text-base text-blue-700">
                    {g.vize}
                  </td>
                  <td className="p-3 text-center font-mono text-gray-500">
                    {g.ortalama}
                  </td>
                  <td className="p-3 text-center font-semibold text-emerald-800">
                    {g.harf}
                  </td>
                  <td className="p-3 text-center">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {g.durum}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
