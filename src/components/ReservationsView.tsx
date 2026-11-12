import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle, MapPin, Plus, Trash2 } from 'lucide-react';
import { MOCK_RESERVATIONS, STUDENT_INFO } from '../data/kentData';

export const ReservationsView: React.FC = () => {
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS);
  const [selectedArea, setSelectedArea] = useState('Kütüphane Bireysel Çalışma Kabini #08');
  const [date, setDate] = useState('18.11.2026');
  const [timeSlot, setTimeSlot] = useState('10:00 - 12:00');
  const [successMsg, setSuccessMsg] = useState(false);

  const areas = [
    'Kütüphane Bireysel Çalışma Kabini #01',
    'Kütüphane Bireysel Çalışma Kabini #08',
    'Mühendislik Grup Çalışma Odası 1',
    'Mühendislik Grup Çalışma Odası 3',
    'Bilgisayar Laboratuvarı Z2 03 - İş İstasyonu #12',
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes = {
      id: `res-${Date.now()}`,
      alan: selectedArea,
      tarih: date,
      saat: timeSlot,
      durum: 'Onaylandı',
    };
    setReservations([newRes, ...reservations]);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2500);
  };

  const handleDelete = (id: string) => {
    setReservations(reservations.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-800">
              Alan Rezervasyonları
            </h2>
            <p className="text-xs text-gray-500">
              Kütüphane, grup çalışma odaları ve bilgisayar laboratuvarı rezervasyon modülü
            </p>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Rezervasyonunuz başarıyla oluşturuldu.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Reservation Form (5 cols) */}
        <div className="md:col-span-5 bg-white p-5 rounded-lg shadow-sm border border-gray-200 space-y-4 text-xs">
          <h3 className="font-bold text-sm text-gray-800 border-b border-gray-100 pb-2 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>Yeni Rezervasyon Yap</span>
          </h3>

          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Çalışma Alanı:
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 bg-white"
              >
                {areas.map((a, i) => (
                  <option key={i} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Tarih:</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Zaman Dilimi:</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="09:00 - 11:30">09:00 - 11:30 (Sabah Oturumu)</option>
                <option value="12:00 - 14:30">12:00 - 14:30 (Öğle Oturumu)</option>
                <option value="15:00 - 17:30">15:00 - 17:30 (Öğleden Sonra)</option>
                <option value="18:00 - 21:00">18:00 - 21:00 (Akşam Etüdü)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Rezervasyonu Onayla
            </button>
          </form>
        </div>

        {/* Active Reservations (7 cols) */}
        <div className="md:col-span-7 bg-white p-5 rounded-lg shadow-sm border border-gray-200 space-y-3">
          <h3 className="font-bold text-sm text-gray-800 border-b border-gray-100 pb-2">
            Aktif Rezervasyonlarım ({reservations.length})
          </h3>

          <div className="space-y-2 text-xs">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-start justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="font-bold text-gray-900">{res.alan}</div>
                  <div className="text-gray-500 text-[11px] flex items-center gap-3">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {res.tarih}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {res.saat}
                    </span>
                  </div>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    ● {res.durum}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(res.id)}
                  title="Rezervasyonu İptal Et"
                  className="text-gray-400 hover:text-red-600 p-1 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
