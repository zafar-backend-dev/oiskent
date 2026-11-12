export interface StudentInfo {
  tcKimlikNo: string;
  adi: string;
  soyadi: string;
  ogrenciNo: string;
  sinifi: string;
  fakulte: string;
  bolumProgram: string;
  akademikYil: string;
  donem: string;
  tarih: string;
  danisman: string;
  danismanEmail: string;
  kayitTarihi: string;
  ogrenimDurumu: string;
  gno: string;
  tamamlananAkts: number;
  toplamAkts: number;
  kampus: string;
}

export interface ExamItem {
  id: string;
  sinavTipi: string;
  dersKodu: string;
  dersAdi: string;
  tarihSaat: string;
  kampus: string;
  sonTarih: string;
  derslik: string;
  ogretimElemani: string;
  aciklama: string;
  kredi: number;
  akts: number;
}

export interface CourseScheduleItem {
  id: string;
  gun: 'PAZARTESİ' | 'SALI' | 'ÇARŞAMBA' | 'PERŞEMBE' | 'CUMA' | 'CUMARTESİ' | 'PAZAR';
  dersKodu: string;
  dersAdi: string;
  derslik: string; // Strictly Çekmeköy
  saat: string;
  ogretimElemani: string;
  renk?: string;
}

export interface Announcement {
  id: string;
  tarih: string;
  baslik: string;
  ozet: string;
  icerik: string;
  kategori: string;
  onemli?: boolean;
}

export interface MessageItem {
  id: string;
  gonderen: string;
  gonderenUnvan: string;
  gonderenEmail: string;
  alici: string;
  konu: string;
  tarih: string;
  saat: string;
  icerik: string;
  okundu: boolean;
  oncelik: 'Normal' | 'Yüksek' | 'Düşük';
}

export interface TranscriptCourse {
  kod: string;
  ad: string;
  kredi: number;
  akts: number;
  harfNotu: string;
  basariKatsayisi: number;
  durum: 'Geçti' | 'Kaldı' | 'Devam Ediyor';
}

export interface TranscriptTerm {
  donemAdi: string;
  akademikYil: string;
  dersler: TranscriptCourse[];
  donemKredi: number;
  donemAkts: number;
  dno: number; // Dönem not ortalaması
  gno: number; // Genel not ortalaması
}

export const STUDENT_INFO: StudentInfo = {
  tcKimlikNo: '98356268816',
  adi: 'ZAFAR',
  soyadi: 'ZIYATOV',
  ogrenciNo: '220702001',
  sinifi: '2',
  fakulte: '07-Mühendislik ve Doğa Bilimleri Fakültesi',
  bolumProgram: '0702-Bilgisayar Mühendisliği/0702001-Bilgisayar Mühendisliği',
  akademikYil: '2026-2027',
  donem: 'Güz',
  tarih: '12/11/2026',
  danisman: 'Hülya ACAR',
  danismanEmail: 'hulya.acar@kent.edu.tr',
  kayitTarihi: '18/09/2025',
  ogrenimDurumu: 'Aktif Öğrenci',
  gno: '3.24',
  tamamlananAkts: 64,
  toplamAkts: 240,
  kampus: 'Çekmeköy',
};

// Exam schedule: KAMPÜS column changed from Kağıthane to Çekmeköy
export const EXAM_SCHEDULE: ExamItem[] = [
  {
    id: 'exam-1',
    sinavTipi: 'Ara Sınav',
    dersKodu: 'TDL101',
    dersAdi: 'Türk Dili-I',
    tarihSaat: '14.11.2026 - 12:00',
    kampus: 'Çekmeköy',
    sonTarih: '',
    derslik: 'Z2 03',
    ogretimElemani: 'Handan AKIN',
    aciklama: 'Kampüste bilgisayar laboratuvarında gözetimli çevirim içi sınav olarak gerçekleşecek. TDL101 ve ATA101 sınavları aynı saatte başlayacak olup, sınav süreleri 20\'şer dk olacaktır.',
    kredi: 2,
    akts: 2,
  },
  {
    id: 'exam-2',
    sinavTipi: 'Ara Sınav',
    dersKodu: 'BİL201',
    dersAdi: 'Ayrık Matematik',
    tarihSaat: '16.11.2026 - 10:00',
    kampus: 'Çekmeköy',
    sonTarih: '',
    derslik: 'B7 07',
    ogretimElemani: 'Hülya ACAR',
    aciklama: '',
    kredi: 3,
    akts: 5,
  },
  {
    id: 'exam-3',
    sinavTipi: 'Ara Sınav',
    dersKodu: 'BİL700',
    dersAdi: 'E-Ticaret',
    tarihSaat: '16.11.2026 - 14:00',
    kampus: 'Çekmeköy',
    sonTarih: '',
    derslik: 'B5 01',
    ogretimElemani: 'Cihan UYANIK',
    aciklama: '',
    kredi: 3,
    akts: 4,
  },
  {
    id: 'exam-4',
    sinavTipi: 'Ara Sınav',
    dersKodu: 'BİL207',
    dersAdi: 'Sayısal Mantık Tasarımı',
    tarihSaat: '17.11.2026 - 11:00',
    kampus: 'Çekmeköy',
    sonTarih: '',
    derslik: 'B6 09',
    ogretimElemani: 'Ömer GÖKDAŞ',
    aciklama: '',
    kredi: 4,
    akts: 6,
  },
  {
    id: 'exam-5',
    sinavTipi: 'Ara Sınav',
    dersKodu: 'MDF101',
    dersAdi: 'Matematik 1',
    tarihSaat: '17.11.2026 - 13:00',
    kampus: 'Çekmeköy',
    sonTarih: '',
    derslik: 'Z0 02',
    ogretimElemani: 'Hülya ACAR',
    aciklama: '',
    kredi: 4,
    akts: 6,
  },
  {
    id: 'exam-6',
    sinavTipi: 'Ara Sınav',
    dersKodu: 'MDF203',
    dersAdi: 'Diferansiyel Denklemler',
    tarihSaat: '17.11.2026 - 15:00',
    kampus: 'Çekmeköy',
    sonTarih: '',
    derslik: 'Z0 06',
    ogretimElemani: 'Hülya ACAR',
    aciklama: '',
    kredi: 3,
    akts: 5,
  },
  {
    id: 'exam-7',
    sinavTipi: 'Ara Sınav',
    dersKodu: 'BİL209',
    dersAdi: 'İşletim Sistemleri',
    tarihSaat: '18.11.2026 - 11:00',
    kampus: 'Çekmeköy',
    sonTarih: '',
    derslik: 'B7 07',
    ogretimElemani: 'Mehmet BOZ',
    aciklama: '',
    kredi: 3,
    akts: 5,
  },
  {
    id: 'exam-8',
    sinavTipi: 'Ara Sınav',
    dersKodu: 'MDF205',
    dersAdi: 'İş Sağlığı ve Güvenliği',
    tarihSaat: '18.11.2026 - 13:00',
    kampus: 'Çekmeköy',
    sonTarih: '',
    derslik: 'Z2 09',
    ogretimElemani: 'Cihan UYANIK',
    aciklama: '',
    kredi: 2,
    akts: 2,
  },
  {
    id: 'exam-9',
    sinavTipi: 'Ara Sınav',
    dersKodu: 'BİL203',
    dersAdi: 'Veri Yapıları ve Algoritmalar',
    tarihSaat: '19.11.2026 - 10:00',
    kampus: 'Çekmeköy',
    sonTarih: '',
    derslik: 'B7 07',
    ogretimElemani: 'Berkay ÇETİN',
    aciklama: '',
    kredi: 4,
    akts: 6,
  },
  {
    id: 'exam-10',
    sinavTipi: 'Ara Sınav',
    dersKodu: 'MDF107',
    dersAdi: 'Genel Kimya',
    tarihSaat: '19.11.2026 - 14:00',
    kampus: 'Çekmeköy',
    sonTarih: '',
    derslik: 'Z0 05',
    ogretimElemani: 'Arda ATAKOL',
    aciklama: '',
    kredi: 3,
    akts: 4,
  },
  {
    id: 'exam-11',
    sinavTipi: 'Ara Sınav',
    dersKodu: 'MDF201',
    dersAdi: 'Mesleki İngilizce 1',
    tarihSaat: '20.11.2026 - 11:00',
    kampus: 'Çekmeköy',
    sonTarih: '',
    derslik: 'Z2 09',
    ogretimElemani: 'Kasım Burak ÇAVUŞOĞLU',
    aciklama: '',
    kredi: 2,
    akts: 3,
  },
  {
    id: 'exam-12',
    sinavTipi: 'Ara Sınav Ödevi/Projesi',
    dersKodu: 'MDF109',
    dersAdi: 'Genel Kimya Laboratuvar',
    tarihSaat: '11.11.2026 - 00:00',
    kampus: 'Çekmeköy',
    sonTarih: '',
    derslik: 'VERİ YOK',
    ogretimElemani: 'Arda ATAKOL',
    aciklama: '',
    kredi: 1,
    akts: 2,
  },
];

// Course schedule strictly set in Çekmeköy (changed from Kağıthane)
export const COURSE_SCHEDULE: CourseScheduleItem[] = [
  // PAZARTESİ
  {
    id: 'cs-1',
    gun: 'PAZARTESİ',
    dersKodu: 'MDF203',
    dersAdi: 'Diferansiyel Denklemler',
    derslik: 'Çekmeköy B7 05 Kat:7',
    saat: '10:00 - 13:00',
    ogretimElemani: 'Hülya ACAR',
    renk: 'blue',
  },
  {
    id: 'cs-2',
    gun: 'PAZARTESİ',
    dersKodu: 'MDF205',
    dersAdi: 'İş Sağlığı ve Güvenliği',
    derslik: 'Çekmeköy B7 05 Kat:7',
    saat: '14:00 - 16:00',
    ogretimElemani: 'Cihan UYANIK',
    renk: 'emerald',
  },
  {
    id: 'cs-3',
    gun: 'PAZARTESİ',
    dersKodu: 'MDF201',
    dersAdi: 'Mesleki İngilizce 1',
    derslik: 'Çekmeköy B7 05 Kat:7',
    saat: '16:00 - 18:00',
    ogretimElemani: 'Kasım Burak ÇAVUŞOĞLU',
    renk: 'purple',
  },

  // SALI
  {
    id: 'cs-4',
    gun: 'SALI',
    dersKodu: 'BİL207',
    dersAdi: 'Sayısal Mantık Tasarımı',
    derslik: 'Çekmeköy B7 05 Kat:7',
    saat: '10:00 - 13:00',
    ogretimElemani: 'Ömer GÖKDAŞ',
    renk: 'amber',
  },
  {
    id: 'cs-5',
    gun: 'SALI',
    dersKodu: 'MDF107',
    dersAdi: 'Genel Kimya',
    derslik: 'Çekmeköy B7 06 Kat:7',
    saat: '13:00 - 15:00',
    ogretimElemani: 'Arda ATAKOL',
    renk: 'rose',
  },
  {
    id: 'cs-6',
    gun: 'SALI',
    dersKodu: 'BİL201',
    dersAdi: 'Ayrık Matematik',
    derslik: 'Çekmeköy B7 05 Kat:7',
    saat: '16:00 - 17:00',
    ogretimElemani: 'Hülya ACAR',
    renk: 'indigo',
  },

  // ÇARŞAMBA
  {
    id: 'cs-7',
    gun: 'ÇARŞAMBA',
    dersKodu: 'BİL209',
    dersAdi: 'İşletim Sistemleri',
    derslik: 'Çekmeköy B7 05 Kat:7',
    saat: '10:00 - 13:00',
    ogretimElemani: 'Mehmet BOZ',
    renk: 'cyan',
  },
  {
    id: 'cs-8',
    gun: 'ÇARŞAMBA',
    dersKodu: 'BİL700',
    dersAdi: 'E-Ticaret',
    derslik: 'Çekmeköy B7 05 Kat:7',
    saat: '14:00 - 17:00',
    ogretimElemani: 'Cihan UYANIK',
    renk: 'teal',
  },

  // PERŞEMBE
  {
    id: 'cs-9',
    gun: 'PERŞEMBE',
    dersKodu: 'BİL203',
    dersAdi: 'Veri Yapıları ve Algoritmalar',
    derslik: 'Çekmeköy Z2 03 Kat:-2',
    saat: '12:00 - 15:00',
    ogretimElemani: 'Berkay ÇETİN',
    renk: 'sky',
  },
  {
    id: 'cs-10',
    gun: 'PERŞEMBE',
    dersKodu: 'BİL202',
    dersAdi: 'Ayrık Matematik (Uygulama)',
    derslik: 'Çekmeköy B7 05 Kat:7',
    saat: '15:00 - 17:00',
    ogretimElemani: 'Hülya ACAR',
    renk: 'indigo',
  },

  // CUMA
  {
    id: 'cs-11',
    gun: 'CUMA',
    dersKodu: 'MDF201',
    dersAdi: 'Mesleki İngilizce 1',
    derslik: 'Çekmeköy B7 05 Kat:7',
    saat: '14:00 - 16:00',
    ogretimElemani: 'Kasım Burak ÇAVUŞOĞLU',
    renk: 'purple',
  },
  {
    id: 'cs-12',
    gun: 'CUMA',
    dersKodu: 'MDF205',
    dersAdi: 'İş Sağlığı ve Güvenliği',
    derslik: 'Çekmeköy B7 05 Kat:7',
    saat: '16:00 - 18:00',
    ogretimElemani: 'Cihan UYANIK',
    renk: 'emerald',
  },

  // CUMARTESİ
  {
    id: 'cs-13',
    gun: 'CUMARTESİ',
    dersKodu: 'TDL101',
    dersAdi: 'Türk Dili-I',
    derslik: 'Çekmeköy ONLINE ASENKRON',
    saat: '13:00 - 16:00',
    ogretimElemani: 'Handan AKIN',
    renk: 'violet',
  },
];

export const CURRENT_ENROLLED_COURSES = [
  { kod: 'MDF107', ad: 'Genel Kimya', kredi: 3, akts: 4, cmsUrl: 'https://cms.kent.edu.tr/mdf107', hocasi: 'Arda ATAKOL' },
  { kod: 'MDF109', ad: 'Genel Kimya Laboratuvar', kredi: 1, akts: 2, cmsUrl: 'https://cms.kent.edu.tr/mdf109', hocasi: 'Arda ATAKOL' },
  { kod: 'MDF201', ad: 'Mesleki İngilizce 1', kredi: 2, akts: 3, cmsUrl: 'https://cms.kent.edu.tr/mdf201', hocasi: 'Kasım Burak ÇAVUŞOĞLU' },
  { kod: 'MDF203', ad: 'Diferansiyel Denklemler', kredi: 3, akts: 5, cmsUrl: 'https://cms.kent.edu.tr/mdf203', hocasi: 'Hülya ACAR' },
  { kod: 'MDF205', ad: 'İş Sağlığı ve Güvenliği', kredi: 2, akts: 2, cmsUrl: 'https://cms.kent.edu.tr/mdf205', hocasi: 'Cihan UYANIK' },
  { kod: 'BİL201', ad: 'Ayrık Matematik', kredi: 3, akts: 5, cmsUrl: 'https://cms.kent.edu.tr/bil201', hocasi: 'Hülya ACAR' },
  { kod: 'BİL203', ad: 'Veri Yapıları ve Algoritmalar', kredi: 4, akts: 6, cmsUrl: 'https://cms.kent.edu.tr/bil203', hocasi: 'Berkay ÇETİN' },
  { kod: 'BİL207', ad: 'Sayısal Mantık Tasarımı', kredi: 4, akts: 6, cmsUrl: 'https://cms.kent.edu.tr/bil207', hocasi: 'Ömer GÖKDAŞ' },
  { kod: 'BİL209', ad: 'İşletim Sistemleri', kredi: 3, akts: 5, cmsUrl: 'https://cms.kent.edu.tr/bil209', hocasi: 'Mehmet BOZ' },
  { kod: 'BİL700', ad: 'E-Ticaret', kredi: 3, akts: 4, cmsUrl: 'https://cms.kent.edu.tr/bil700', hocasi: 'Cihan UYANIK' },
  { kod: 'TDL101', ad: 'Türk Dili-I', kredi: 2, akts: 2, cmsUrl: 'https://cms.kent.edu.tr/tdl101', hocasi: 'Handan AKIN' },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    tarih: '2026-11-02',
    baslik: '2026-11-02 Uluslararası Yenilikçilik ve Girişimcilik Fırsatı: EIT HEI 2026 Proje Çağrısı Açıldı! - International Innovation and Entrepreneurship Opportunity: EIT HEI 2026 Call for Proposals Now Open!',
    ozet: 'EIT HEI Girişimi 2026 yılı çağrısı kapsamında uluslararası girişimcilik proje başvuruları açılmıştır.',
    icerik: 'Avrupa İnovasyon ve Teknoloji Enstitüsü (EIT) Yükseköğretim Girişimi (HEI) 2026 çağrısı çerçevesinde öğrenciler uluslararası girişimcilik ve yenilikçilik projelerine başvuru yapabilir.',
    kategori: 'Genel Duyuru',
  },
  {
    id: 'ann-2',
    tarih: '2026-10-28',
    baslik: '2026-10-28 Ara Sınavlar Hk / About Midterms',
    ozet: '2026-2027 Güz Yarıyılı Ara Sınav Programı yayımlanmıştır.',
    icerik: '2026-2027 Akademik Yılı Güz Yarıyılı Ara Sınav Programı yayımlanmıştır. Sınav takviminize Sınav Programı sekmesinden ulaşabilirsiniz.',
    kategori: 'Akademik',
  },
  {
    id: 'ann-3',
    tarih: '2026-10-14',
    baslik: '2026-10-14 2026-2027 Güz Yarıyılı Ara Sınav Tarihlerinin Ertelenmesi Hk.',
    ozet: '2026-2027 Güz Yarıyılı Ara Sınav Tarihlerinin Ertelenmesi Hk.',
    icerik: 'Üniversitemiz Senato kararı gereğince 2026-2027 Akademik Yılı Güz Yarıyılı ara sınav takvimi güncellenmiştir.',
    kategori: 'Senato Kararı',
  },
];

export const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 'msg-1',
    gonderen: 'Hülya ACAR',
    gonderenUnvan: 'Dr. Öğr. Üyesi - Akademik Danışman',
    gonderenEmail: 'hulya.acar@kent.edu.tr',
    alici: 'Zafar Ziyatov',
    konu: '2026-2027 Güz Dönemi Ders Kayıt ve Ara Sınav Bilgilendirmesi',
    tarih: '10.11.2026',
    saat: '14:22',
    icerik: 'Merhaba Zafar, Diferansiyel Denklemler ve Ayrık Matematik ara sınavları Çekmeköy Kampüsü Z0 06 ve B7 07 dersliklerinde yapılacaktır. Hazırlıklarında başarılar dilerim. Bir sorun olursa Çekmeköy danışmanlık odama gelebilirsin.',
    okundu: false,
    oncelik: 'Yüksek',
  },
  {
    id: 'msg-2',
    gonderen: 'Berkay ÇETİN',
    gonderenUnvan: 'Öğr. Gör. - Veri Yapıları Dersi Sorumlusu',
    gonderenEmail: 'berkay.cetin@kent.edu.tr',
    alici: 'Zafar Ziyatov',
    konu: 'BİL203 Veri Yapıları Ara Sınav Kapsamı',
    tarih: '09.11.2026',
    saat: '11:15',
    icerik: 'Sevgili öğrenciler, 19 Kasım tarihindeki ara sınavımız Çekmeköy B7 07 nolu salonda yapılacaktır. Özellikle AVL ağaçları ve karmaşıklık analizine dikkat ediniz.',
    okundu: false,
    oncelik: 'Normal',
  },
  {
    id: 'msg-3',
    gonderen: 'Öğrenci İşleri Direktörlüğü',
    gonderenUnvan: 'İstanbul Kent Üniversitesi Rektörlük',
    gonderenEmail: 'oidb@kent.edu.tr',
    alici: 'Zafar Ziyatov',
    konu: 'Çekmeköy Kampüsü Sınav Giriş Kuralları ve Kimlik Kontrolleri',
    tarih: '08.11.2026',
    saat: '09:40',
    icerik: 'Sınav salonlarına girişte Kent Üniversitesi öğrenci kartınızı ibraz etmeniz zorunludur. Kartını kaybeden öğrencilerimiz Çekmeköy Öğrenci İşleri ofisinden geçici belge alabilirler.',
    okundu: false,
    oncelik: 'Yüksek',
  },
  {
    id: 'msg-4',
    gonderen: 'Cihan UYANIK',
    gonderenUnvan: 'Dr. Öğr. Üyesi',
    gonderenEmail: 'cihan.uyanik@kent.edu.tr',
    alici: 'Zafar Ziyatov',
    konu: 'MDF205 İş Sağlığı ve Güvenliği Sınav Dökümanları',
    tarih: '06.11.2026',
    saat: '16:05',
    icerik: 'Ders slaytları CMS sistemine yüklenmiştir. Sınavımız Çekmeköy Z2 09 dersliğinde test usulü olacaktır.',
    okundu: true,
    oncelik: 'Normal',
  },
  {
    id: 'msg-5',
    gonderen: 'Handan AKIN',
    gonderenUnvan: 'Öğr. Gör. - Türk Dili Bölümü',
    gonderenEmail: 'handan.akin@kent.edu.tr',
    alici: 'Zafar Ziyatov',
    konu: 'TDL101 Sınavı Çekmeköy Lab Oturumu',
    tarih: '05.11.2026',
    saat: '15:30',
    icerik: '14 Kasım Cumartesi günü saat 12:00\'de Çekmeköy Z2 03 bilgisayar laboratuvarında hazır bulunmanız rica olunur.',
    okundu: true,
    oncelik: 'Normal',
  },
  {
    id: 'msg-6',
    gonderen: 'Kariyer Merkezi Direktörlüğü',
    gonderenUnvan: 'Kariyer ve Mezunlar Ofisi',
    gonderenEmail: 'kariyer@kent.edu.tr',
    alici: 'Zafar Ziyatov',
    konu: 'Bilişim ve Yazılım Staj Fırsatları - 2026',
    tarih: '03.11.2026',
    saat: '10:20',
    icerik: 'Bilgisayar Mühendisliği 2. sınıf öğrencileri için yaz stajı ön protokolleri başlamıştır.',
    okundu: true,
    oncelik: 'Düşük',
  },
  {
    id: 'msg-7',
    gonderen: 'Mehmet BOZ',
    gonderenUnvan: 'Dr. Öğr. Üyesi',
    gonderenEmail: 'mehmet.boz@kent.edu.tr',
    alici: 'Zafar Ziyatov',
    konu: 'BİL209 İşletim Sistemleri Ödev 1 Notlandırması',
    tarih: '01.11.2026',
    saat: '17:45',
    icerik: 'Ödev 1 (Shell Scripting) notlarınız CMS sistemine işlenmiştir. İtirazlar için Çekmeköy Kampüsü B blok 4. kata gelebilirsiniz.',
    okundu: true,
    oncelik: 'Normal',
  },
  {
    id: 'msg-8',
    gonderen: 'Kütüphane ve Dokümantasyon Daire Bşk.',
    gonderenUnvan: 'Kütüphane Hizmetleri',
    gonderenEmail: 'kutuphane@kent.edu.tr',
    alici: 'Zafar Ziyatov',
    konu: 'IEEE Xplore ve ACM Digital Library Uzaktan Erişim',
    tarih: '29.10.2026',
    saat: '13:00',
    icerik: 'Mühendislik veri tabanlarına kurumsal e-postanız ile kampüs dışından sınırsız erişim sağlayabilirsiniz.',
    okundu: true,
    oncelik: 'Düşük',
  },
  {
    id: 'msg-9',
    gonderen: 'Sağlık Kültür ve Spor Daire Bşk.',
    gonderenUnvan: 'SKS Daire Bşk.',
    gonderenEmail: 'sks@kent.edu.tr',
    alici: 'Zafar Ziyatov',
    konu: 'Çekmeköy Kampüsü Spor Tesisleri ve Öğrenci Kulüpleri',
    tarih: '25.10.2026',
    saat: '11:10',
    icerik: 'Yazılım ve Yapay Zeka Kulübü etkinlikleri Çekmeköy konferans salonunda başlayacaktır.',
    okundu: true,
    oncelik: 'Normal',
  },
  {
    id: 'msg-10',
    gonderen: 'Ömer GÖKDAŞ',
    gonderenUnvan: 'Dr. Öğr. Üyesi',
    gonderenEmail: 'omer.gokdas@kent.edu.tr',
    alici: 'Zafar Ziyatov',
    konu: 'BİL207 Sayısal Mantık Tasarımı Laboratuvar Deneyleri',
    tarih: '20.10.2026',
    saat: '14:50',
    icerik: 'Deney bordları ve lojik kapı entegreleri Çekmeköy Elektronik Laboratuvarından teslim alınabilir.',
    okundu: true,
    oncelik: 'Normal',
  },
];

export const TRANSCRIPT_DATA: TranscriptTerm[] = [
  {
    donemAdi: '1. Sınıf - Güz Dönemi',
    akademikYil: '2025-2026',
    donemKredi: 16,
    donemAkts: 30,
    dno: 3.45,
    gno: 3.45,
    dersler: [
      { kod: 'MDF101', ad: 'Matematik 1', kredi: 4, akts: 6, harfNotu: 'AA', basariKatsayisi: 4.0, durum: 'Geçti' },
      { kod: 'FİZ101', ad: 'Fizik 1 (Mekanik)', kredi: 4, akts: 6, harfNotu: 'BA', basariKatsayisi: 3.5, durum: 'Geçti' },
      { kod: 'FİZ103', ad: 'Fizik 1 Laboratuvarı', kredi: 1, akts: 2, harfNotu: 'AA', basariKatsayisi: 4.0, durum: 'Geçti' },
      { kod: 'BİL101', ad: 'Bilgisayar Mühendisliğine Giriş', kredi: 3, akts: 5, harfNotu: 'AA', basariKatsayisi: 4.0, durum: 'Geçti' },
      { kod: 'ATA101', ad: 'Atatürk İlkeleri ve İnkılap Tarihi 1', kredi: 2, akts: 2, harfNotu: 'BA', basariKatsayisi: 3.5, durum: 'Geçti' },
      { kod: 'İNG101', ad: 'İngilizce 1', kredi: 2, akts: 3, harfNotu: 'AA', basariKatsayisi: 4.0, durum: 'Geçti' },
      { kod: 'KNT101', ad: 'Kent Kültürü ve Yaşam', kredi: 1, akts: 1, harfNotu: 'AA', basariKatsayisi: 4.0, durum: 'Geçti' },
    ],
  },
  {
    donemAdi: '1. Sınıf - Bahar Dönemi',
    akademikYil: '2025-2026',
    donemKredi: 17,
    donemAkts: 34,
    dno: 3.12,
    gno: 3.28,
    dersler: [
      { kod: 'MDF102', ad: 'Matematik 2 (Kalkülüs)', kredi: 4, akts: 6, harfNotu: 'BB', basariKatsayisi: 3.0, durum: 'Geçti' },
      { kod: 'FİZ102', ad: 'Fizik 2 (Elektrik & Manyetizma)', kredi: 4, akts: 6, harfNotu: 'CB', basariKatsayisi: 2.5, durum: 'Geçti' },
      { kod: 'FİZ104', ad: 'Fizik 2 Laboratuvarı', kredi: 1, akts: 2, harfNotu: 'BA', basariKatsayisi: 3.5, durum: 'Geçti' },
      { kod: 'BİL102', ad: 'Nesne Yönelimli Programlama (Java)', kredi: 4, akts: 6, harfNotu: 'AA', basariKatsayisi: 4.0, durum: 'Geçti' },
      { kod: 'ATA102', ad: 'Atatürk İlkeleri ve İnkılap Tarihi 2', kredi: 2, akts: 2, harfNotu: 'BA', basariKatsayisi: 3.5, durum: 'Geçti' },
      { kod: 'İNG102', ad: 'İngilizce 2', kredi: 2, akts: 3, harfNotu: 'AA', basariKatsayisi: 4.0, durum: 'Geçti' },
    ],
  },
  {
    donemAdi: '2. Sınıf - Güz Dönemi (Mevcut Dönem)',
    akademikYil: '2026-2027',
    donemKredi: 28,
    donemAkts: 44,
    dno: 0,
    gno: 3.24,
    dersler: [
      { kod: 'MDF203', ad: 'Diferansiyel Denklemler', kredi: 3, akts: 5, harfNotu: '--', basariKatsayisi: 0, durum: 'Devam Ediyor' },
      { kod: 'MDF205', ad: 'İş Sağlığı ve Güvenliği', kredi: 2, akts: 2, harfNotu: '--', basariKatsayisi: 0, durum: 'Devam Ediyor' },
      { kod: 'MDF201', ad: 'Mesleki İngilizce 1', kredi: 2, akts: 3, harfNotu: '--', basariKatsayisi: 0, durum: 'Devam Ediyor' },
      { kod: 'BİL207', ad: 'Sayısal Mantık Tasarımı', kredi: 4, akts: 6, harfNotu: '--', basariKatsayisi: 0, durum: 'Devam Ediyor' },
      { kod: 'MDF107', ad: 'Genel Kimya', kredi: 3, akts: 4, harfNotu: '--', basariKatsayisi: 0, durum: 'Devam Ediyor' },
      { kod: 'MDF109', ad: 'Genel Kimya Laboratuvar', kredi: 1, akts: 2, harfNotu: '--', basariKatsayisi: 0, durum: 'Devam Ediyor' },
      { kod: 'BİL201', ad: 'Ayrık Matematik', kredi: 3, akts: 5, harfNotu: '--', basariKatsayisi: 0, durum: 'Devam Ediyor' },
      { kod: 'BİL209', ad: 'İşletim Sistemleri', kredi: 3, akts: 5, harfNotu: '--', basariKatsayisi: 0, durum: 'Devam Ediyor' },
      { kod: 'BİL700', ad: 'E-Ticaret', kredi: 3, akts: 4, harfNotu: '--', basariKatsayisi: 0, durum: 'Devam Ediyor' },
      { kod: 'BİL203', ad: 'Veri Yapıları ve Algoritmalar', kredi: 4, akts: 6, harfNotu: '--', basariKatsayisi: 0, durum: 'Devam Ediyor' },
      { kod: 'TDL101', ad: 'Türk Dili-I', kredi: 2, akts: 2, harfNotu: '--', basariKatsayisi: 0, durum: 'Devam Ediyor' },
    ],
  },
];

export const MOCK_RESERVATIONS = [
  {
    id: 'res-1',
    alan: 'Kütüphane Bireysel Çalışma Kabini #04',
    tarih: '14.11.2026',
    saat: '09:00 - 11:30',
    durum: 'Onaylandı',
  },
  {
    id: 'res-2',
    alan: 'Mühendislik Grup Çalışma Odası 2',
    tarih: '17.11.2026',
    saat: '16:00 - 18:00',
    durum: 'Onaylandı',
  },
];
