/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { ExamScheduleView } from './components/ExamScheduleView';
import { CourseScheduleView } from './components/CourseScheduleView';
import { TranscriptView } from './components/TranscriptView';
import { ExamResultsView } from './components/ExamResultsView';
import { DocumentRequestView } from './components/DocumentRequestView';
import { MessagesView } from './components/MessagesView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { ReservationsView } from './components/ReservationsView';
import { NewMessageModal } from './components/NewMessageModal';
import { QuickDrawers } from './components/QuickDrawers';
import { Announcement, STUDENT_INFO } from './data/kentData';
import {
  Home,
  ChevronRight,
  FileText,
  Calendar,
  Award,
  Download,
  Mail,
  Megaphone,
  MapPin,
  CheckCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<string>('anasayfa');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [quickDrawerType, setQuickDrawerType] = useState<'courses' | 'shortcuts' | null>(null);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState<boolean>(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getViewTitle = () => {
    switch (activeView) {
      case 'anasayfa':
        return 'Öğrenci Bilgi Sistemi (OİS)';
      case 'sinav-programi':
        return 'Sınav Programı';
      case 'ders-programi':
        return 'Ders Programı';
      case 'transkript':
        return 'Resmi Not Dökümü (Transkript)';
      case 'sinav-sonuclari':
        return 'Sınav Sonuçları';
      case 'hazirlik-not-belgesi':
        return 'Hazırlık Not Belgesi';
      case 'online-belge-talep':
        return 'Online Belge Talep';
      case 'mesaj-kutusu':
        return 'Mesaj Kutusu';
      case 'duyurular':
        return 'Duyurular';
      case 'rezervasyonlar':
        return 'Rezervasyonlar';
      case 'canli-dersler':
        return 'Canlı Dersler';
      case 'muafiyet-basvuru':
        return 'Dersler Muafiyet Sınavları Başvuru';
      default:
        return 'Öğrenci Bilgi Sistemi';
    }
  };

  return (
    <div className="min-h-screen bg-[#eaedf1] text-gray-800 flex flex-col font-sans selection:bg-red-200">
      {/* Top Header */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenQuickMenu={(type) => setQuickDrawerType(type)}
      />

      {/* Collapsible Navigation Sidebar (Image 2) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeView={activeView}
        setActiveView={setActiveView}
        unreadCount={10}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-2.5 sm:p-4 md:p-6 transition-all duration-200 max-w-[1600px] w-full mx-auto">
        {/* Breadcrumb (hidden on print) */}
        <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 bg-white px-3.5 py-2.5 rounded-lg shadow-2xs border border-gray-200 text-xs">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-gray-500 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setActiveView('anasayfa')}
              className="flex items-center gap-1 hover:text-blue-700 cursor-pointer font-medium"
            >
              <Home className="w-3.5 h-3.5" />
              <span>OİS</span>
            </button>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="font-semibold text-gray-800">
              {getViewTitle()}
            </span>
          </nav>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {activeView !== 'sinav-programi' && (
              <button
                onClick={() => setActiveView('sinav-programi')}
                className="px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-[11px] transition-colors cursor-pointer"
              >
                Sınav Programı
              </button>
            )}

            {activeView !== 'ders-programi' && (
              <button
                onClick={() => setActiveView('ders-programi')}
                className="px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-[11px] transition-colors cursor-pointer"
              >
                Ders Programı
              </button>
            )}
          </div>
        </div>

        {/* View Switcher */}
        {activeView === 'anasayfa' && (
          <DashboardView
            onNavigate={(v) => setActiveView(v)}
            onOpenNewMessage={() => setIsNewMessageOpen(true)}
            onSelectAnnouncement={(ann) => {
              setSelectedAnnouncement(ann);
              setActiveView('duyurular');
            }}
          />
        )}

        {activeView === 'sinav-programi' && <ExamScheduleView />}

        {activeView === 'ders-programi' && <CourseScheduleView />}

        {activeView === 'transkript' && <TranscriptView />}

        {activeView === 'sinav-sonuclari' && <ExamResultsView />}

        {activeView === 'hazirlik-not-belgesi' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">
                İngilizce Hazırlık Muafiyet / Not Belgesi
              </h2>
              <div className="bg-gray-50 max-w-md mx-auto p-4 rounded border border-gray-200 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Öğrenci:</span>
                  <span className="font-bold text-gray-800">{STUDENT_INFO.adi} {STUDENT_INFO.soyadi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sınav Adı:</span>
                  <span className="font-bold text-gray-800">Kent Yabancı Dil Muafiyet Sınavı (KENT-FLPT)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Alınan Puan:</span>
                  <span className="font-bold text-blue-700 text-sm">84 / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Seviye:</span>
                  <span className="font-bold text-gray-800">B2+ (Upper-Intermediate)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Durum:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Hazırlıktan Muaf - Lisansa Başladı
                  </span>
                </div>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-800 text-white rounded text-xs font-semibold hover:bg-slate-900"
              >
                Belgeyi Yazdır / PDF İndir
              </button>
            </div>
          </div>
        )}

        {activeView === 'online-belge-talep' && <DocumentRequestView />}

        {activeView === 'mesaj-kutusu' && (
          <MessagesView onOpenCompose={() => setIsNewMessageOpen(true)} />
        )}

        {activeView === 'duyurular' && (
          <AnnouncementsView
            selectedAnnouncement={selectedAnnouncement}
            onCloseDetail={() => setSelectedAnnouncement(null)}
          />
        )}

        {activeView === 'rezervasyonlar' && <ReservationsView />}

        {activeView === 'canli-dersler' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
              <h2 className="text-base font-bold text-gray-800 border-b border-gray-200 pb-3">
                Canlı Dersler ve CMS Platformu
              </h2>
              <p className="text-xs text-gray-600">
                İstanbul Kent Üniversitesi sanal sınıf altyapısı Microsoft Teams ve Moodle CMS ile entegredir.
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50/60 rounded-lg border border-blue-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="font-bold text-sm text-blue-950">TDL101 Türk Dili-I (Cumartesi 13:00 - 16:00)</span>
                    <p className="text-xs text-blue-700 mt-1">Öğretim Görevlisi: Handan AKIN • Online Asenkron</p>
                  </div>
                  <button
                    onClick={() => showToast('Canlı ders bağlantısı başlatılıyor...')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold cursor-pointer"
                  >
                    Oturuma Katıl
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'muafiyet-basvuru' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
              <h2 className="text-base font-bold text-gray-800 border-b border-gray-200 pb-3">
                Dersler Muafiyet Sınavları Başvuru Ekranı
              </h2>
              <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-800 text-xs">
                ✓ 2026-2027 Eğitim Öğretim yılı başında girdiğiniz muafiyet sınavları başarıyla işlenmiştir.
              </div>
              <table className="w-full text-left text-xs border border-gray-200 rounded">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                    <th className="p-2.5">Ders Kodu & Adı</th>
                    <th className="p-2.5 text-center">Kredi</th>
                    <th className="p-2.5 text-center">Durum</th>
                    <th className="p-2.5 text-right">Sonuç</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-2.5 font-medium">İNG101 İngilizce 1</td>
                    <td className="p-2.5 text-center font-mono">2</td>
                    <td className="p-2.5 text-center text-emerald-700 font-bold">Onaylandı</td>
                    <td className="p-2.5 text-right font-mono font-bold text-emerald-800">Muaf (AA)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">BİL100 Bilgisayar Okuryazarlığı</td>
                    <td className="p-2.5 text-center font-mono">2</td>
                    <td className="p-2.5 text-center text-emerald-700 font-bold">Onaylandı</td>
                    <td className="p-2.5 text-right font-mono font-bold text-emerald-800">Muaf (AA)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Quick Drawers for Purple and Cyan Header buttons */}
      <QuickDrawers
        type={quickDrawerType}
        onClose={() => setQuickDrawerType(null)}
        onNavigate={(v) => setActiveView(v)}
      />

      {/* Compose Message Modal */}
      <NewMessageModal
        isOpen={isNewMessageOpen}
        onClose={() => setIsNewMessageOpen(false)}
        onSendSuccess={(rec, subj) => {
          showToast(`Mesaj "${rec}" adresine başarıyla gönderildi.`);
        }}
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* University Footer */}
      <footer className="print:hidden bg-[#20272f] text-gray-400 text-xs py-4 px-4 border-t border-slate-700/60 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-bold text-gray-200">İstanbul Kent Üniversitesi</span> • Öğrenci Bilgi Sistemi (OİS)
          </div>
          <div className="text-[11px] text-gray-400">
            Öğrenci: <strong className="text-gray-200">{STUDENT_INFO.adi} {STUDENT_INFO.soyadi}</strong> ({STUDENT_INFO.ogrenciNo}) • © 2026 Tüm Hakları Saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}
