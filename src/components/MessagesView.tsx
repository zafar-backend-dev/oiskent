import React, { useState } from 'react';
import {
  Mail,
  Inbox,
  Send,
  PenSquare,
  Search,
  CheckCircle,
  Clock,
  User,
  Trash2,
  Reply,
  AlertCircle
} from 'lucide-react';
import { INITIAL_MESSAGES, MessageItem, STUDENT_INFO } from '../data/kentData';

interface MessagesViewProps {
  onOpenCompose: () => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({ onOpenCompose }) => {
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
  const [tab, setTab] = useState<'gelen' | 'giden'>('gelen');
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);
  const [search, setSearch] = useState('');

  const handleSelectMessage = (msg: MessageItem) => {
    setSelectedMessage(msg);
    // Mark as read
    if (!msg.okundu) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, okundu: true } : m))
      );
    }
  };

  const filteredMessages = messages.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.konu.toLowerCase().includes(q) ||
      m.gonderen.toLowerCase().includes(q) ||
      m.icerik.toLowerCase().includes(q)
    );
  });

  const unreadCount = messages.filter((m) => !m.okundu).length;

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-800">
              OİS Mesaj Kutusu
            </h2>
            <p className="text-xs text-gray-500">
              Akademik danışman, öğretim üyeleri ve rektörlük yazışmaları • {unreadCount} okunmamış mesaj
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCompose}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <PenSquare className="w-4 h-4" />
          <span>Yeni Mesaj Yaz</span>
        </button>
      </div>

      {/* Main Mailbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[550px]">
        
        {/* Left Side: Tabs & Search & Message List (5 cols) */}
        <div className="lg:col-span-5 border-r border-gray-200 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-medium">
            <button
              onClick={() => {
                setTab('gelen');
                setSelectedMessage(null);
              }}
              className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
                tab === 'gelen'
                  ? 'border-emerald-600 text-emerald-700 font-bold bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Gelen Kutusu</span>
              <span className="bg-[#107c41] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {messages.length}
              </span>
            </button>

            <button
              onClick={() => {
                setTab('giden');
                setSelectedMessage(null);
              }}
              className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
                tab === 'giden'
                  ? 'border-blue-600 text-blue-700 font-bold bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Giden Kutusu</span>
              <span className="text-gray-500 text-[10px]">2</span>
            </button>
          </div>

          {/* Search in messages */}
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Mesajlarda ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 border border-gray-200 rounded bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 text-xs">
            {tab === 'gelen' ? (
              filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-3 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50/90 border-l-4 border-blue-600'
                        : !msg.okundu
                        ? 'bg-emerald-50/30 hover:bg-emerald-50/60 font-semibold border-l-4 border-emerald-500'
                        : 'hover:bg-gray-50 border-l-4 border-transparent text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-gray-900 truncate max-w-[180px]">
                        {msg.gonderen}
                      </span>
                      <span className="text-gray-400 font-mono text-[10px]">
                        {msg.tarih}
                      </span>
                    </div>
                    <div className="text-gray-900 font-semibold truncate mb-1 text-xs">
                      {msg.konu}
                    </div>
                    <div className="text-gray-500 text-[11px] line-clamp-1">
                      {msg.icerik}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 space-y-3">
                <div className="p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                    <span>Kime: Hülya ACAR</span>
                    <span>04.11.2026 - 15:40</span>
                  </div>
                  <div className="font-semibold text-gray-800 text-xs">
                    Ara Sınav Çakışması ve Çekmeköy Kampüsü Derslik Bilgisi
                  </div>
                  <p className="text-gray-600 text-[11px] mt-1">
                    Sayın Hocam, Çekmeköy yerleşkesinde düzenlenecek sınavlar hakkında sorum vardı...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Message Detail (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between bg-white">
          {selectedMessage ? (
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-base text-gray-900">
                      {selectedMessage.konu}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold">
                        {selectedMessage.gonderen.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {selectedMessage.gonderen}{' '}
                          <span className="text-gray-500 font-normal">
                            ({selectedMessage.gonderenUnvan})
                          </span>
                        </div>
                        <div className="text-[11px] text-blue-700">
                          {selectedMessage.gonderenEmail}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-xs text-gray-500">
                    <div>{selectedMessage.tarih}</div>
                    <div>{selectedMessage.saat}</div>
                    {selectedMessage.oncelik === 'Yüksek' && (
                      <span className="inline-block mt-1 bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Yüksek Öncelik
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Message body */}
              <div className="text-xs sm:text-sm text-gray-800 leading-relaxed space-y-3 bg-slate-50/50 p-4 rounded-lg border border-gray-100 min-h-[220px]">
                <p>{selectedMessage.icerik}</p>
                <div className="pt-4 border-t border-gray-200 text-xs text-gray-500">
                  <p>Saygılarımla,</p>
                  <p className="font-semibold text-gray-700">{selectedMessage.gonderen}</p>
                  <p className="text-[11px]">İstanbul Kent Üniversitesi - Çekmeköy Kampüsü</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={onOpenCompose}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Yanıtla</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400">
              <Mail className="w-12 h-12 text-gray-300 mb-3" />
              <h4 className="text-sm font-semibold text-gray-600">Mesaj Seçiniz</h4>
              <p className="text-xs text-gray-400 max-w-xs mt-1">
                Gelen kutunuzdaki 10 mesajdan birine tıklayarak içeriğini ve detaylarını görüntüleyebilirsiniz.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
