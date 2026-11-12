import React, { useState } from 'react';
import { Mail, Send, X, Paperclip, CheckCircle } from 'lucide-react';
import { STUDENT_INFO } from '../data/kentData';

interface NewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendSuccess?: (recipient: string, subject: string) => void;
}

export const NewMessageModal: React.FC<NewMessageModalProps> = ({
  isOpen,
  onClose,
  onSendSuccess,
}) => {
  const [recipient, setRecipient] = useState('hulya.acar@kent.edu.tr');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onSendSuccess?.(recipient, subject);
      onClose();
    }, 1500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-lg w-full overflow-hidden"
      >
        <div className="bg-[#28323c] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm">Yeni OİS Mesajı Oluştur</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSent ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="font-bold text-base text-gray-800">Mesajınız Gönderildi!</h4>
            <p className="text-xs text-gray-500">
              Mesajınız ilgili birim / öğretim elemanının OİS gelen kutusuna iletilmiştir.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Kime:</label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="hulya.acar@kent.edu.tr">
                  Hülya ACAR (Danışman / Diferansiyel Denklemler)
                </option>
                <option value="berkay.cetin@kent.edu.tr">
                  Berkay ÇETİN (Veri Yapıları ve Algoritmalar)
                </option>
                <option value="cihan.uyanik@kent.edu.tr">
                  Cihan UYANIK (E-Ticaret & İSG)
                </option>
                <option value="mehmet.boz@kent.edu.tr">
                  Mehmet BOZ (İşletim Sistemleri)
                </option>
                <option value="omer.gokdas@kent.edu.tr">
                  Ömer GÖKDAŞ (Sayısal Mantık Tasarımı)
                </option>
                <option value="arda.atakol@kent.edu.tr">
                  Arda ATAKOL (Genel Kimya)
                </option>
                <option value="oidb@kent.edu.tr">
                  Öğrenci İşleri Direktörlüğü (Çekmeköy Kampüsü)
                </option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Konu:</label>
              <input
                type="text"
                placeholder="Mesaj konusunu giriniz..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Öncelik Seviyesi:</label>
              <div className="flex gap-4">
                {['Normal', 'Yüksek', 'Düşük'].map((p) => (
                  <label key={p} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={priority === p}
                      onChange={() => setPriority(p)}
                    />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Mesaj Metni:</label>
              <textarea
                rows={5}
                placeholder="Mesajınızı buraya yazınız..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="p-2.5 bg-gray-50 rounded border border-gray-200 text-gray-500 text-[11px]">
              Gönderen: <strong>{STUDENT_INFO.adi} {STUDENT_INFO.soyadi}</strong> ({STUDENT_INFO.tcKimlikNo}) • Yerleşke: Çekmeköy Kampüsü
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs font-semibold"
              >
                İptal
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#107c41] hover:bg-[#0c6334] text-white rounded text-xs font-semibold shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gönder</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
