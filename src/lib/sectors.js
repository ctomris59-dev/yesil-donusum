// Çorlu TSO Bütüncül Yeşil Dönüşüm & Sürdürülebilirlik Karnesi
// Sektör, kategori, soru ve finansman öneri verisi.
// Otomatik üretildi — kaynak: sektör araştırma dosyaları (14.08.2026)

export const CROSS_SECTOR_PROGRAMS = [
  { id: "yesil_donusum_programi_bakanlik", name: "Yeşil Dönüşüm Programı (Sanayi ve Teknoloji Bakanlığı)", scope: "Enerji/su tasarrufu, atık ısı geri kazanımı, döngüsel ekonomi. Onaylananlara 5 yıl geçerli Yeşil Dönüşüm Merkezi Belgesi verilir.", amount: "", note: "2026 dönemi başvuruları 21 Mayıs - 31 Temmuz 2026 arasıydı, muhtemelen kapandı. Portalde 'gelecek dönem için hazırlık' olarak sun, aktif fırsat gibi gösterme.", confidence: "high" },
  { id: "eka_destek_programi", name: "EKA (Enerji ve Karbon Azaltım) Destek Programı", scope: "Sanayide enerji kaynaklı karbon emisyonu azaltan projeler", amount: "18.000.000 TL'ye kadar hibe", note: "Yeni program, detaylı başvuru kriterleri ayrıca doğrulanmalı", confidence: "medium" },
  { id: "vap_genel", name: "VAP (Verimlilik Artırıcı Proje) Desteği", scope: "", amount: "", note: "Kaynaklar arasında rakam çelişkisi var (bazı kaynaklar proje başı 300.000 TL limit, bazıları 27M TL proje üst limiti diyor — muhtemelen farklı alt kategoriler). Yenilenebilir Enerji Genel Müdürlüğü güncel tebliğinden teyit edilmeden JSON'a kesin tutar girilmedi.", confidence: "medium" },
  { id: "sanayide_yesil_donusum_belgesi", name: "Sanayide Yeşil Dönüşüm Belgesi (Endüstriyel Emisyonların Yönetimi Yönetmeliği)", scope: "Enerji, metal, mineral, kimya, atık yönetimi, tekstil, otomotiv, deri, kağıt, gıda, hayvancılık sektörlerinde ~6.000 tesis. Mevcut en iyi teknik kullanımına göre A'dan F'ye sınıflandırma.", amount: "", note: "Daha önceki 'Yeşil Dönüşüm Programı' (KOSGEB/Bakanlık teşviki) ile KARIŞTIRILMAMALI — bu ayrı, zorunlu bir uyum/sınıflandırma sistemi. Portalde net ayrım yapılmalı: biri 'başvurabileceğiniz destek', diğeri 'uyulması gereken sınıflandırma'.", confidence: "high" },
];

export const CONDITIONAL_MODULES = {
  ets_skdm_module: {
    content: "Firmanız TR-ETS Kategori B/C kapsamına girme ihtimali taşıyor. Türkiye Emisyon Ticaret Sistemi (TR-ETS) 2026-2027 emisyonlarını kapsayan pilot uygulamaya başlıyor; yıllık katılım ücreti 100.000 TL, spot piyasa birim işlem ücreti 4 TL/tCO2e olarak belirlendi. Detaylı yükümlülük analizi için İklim Değişikliği Başkanlığı'na danışmanızı öneririz.",
    source: "EPDK Kurul Kararı, Resmi Gazete 29 Kasım 2025",
    confidence: "high",
  },
};

export const SECTORS = [
  {
    id: "tekstil_boyahane",
    label: "Tekstil & Boyahane",
    categories: [
      { code: "energy", label: "Enerji Yönetimi", questions: [
        { id: "en_01", text: "Enerji tüketiminiz aylık/yıllık düzenli ölçülüp kayıt altına alınıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "en_02", text: "Son 3 yılda enerji verimliliği etüdü yaptırdınız mı?", type: "boolean", trigger: null, note: "VAP başvuru ön şartı", options: null },
        { id: "en_03", text: "Yenilenebilir enerji (GES vb.) kullanıyor veya yatırım planlıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "en_04", text: "Boyahane/apre atık ısı geri kazanım sisteminiz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "en_05", text: "Ana ekipmanlarınız (motor, kompresör, kazan) yüksek verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "water", label: "Su & Atık Su Yönetimi", questions: [
        { id: "wa_01", text: "Su tüketiminiz m³ bazında izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "wa_02", text: "Atık su arıtma tesisi kapasiteniz üretiminizi karşılıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "wa_03", text: "Arıtılmış suyu üretimde geri kazanıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "wa_04", text: "ZDHC MRSL uyumlu kimyasal envanteri tutuyor musunuz?", type: "boolean", trigger: null, note: "Marka tedarikçiliği olan firmalar için kritik", options: null },
        { id: "wa_05", text: "Tehlikeli atıklarınız lisanslı firmalarla mı bertaraf ediliyor?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "ci_01", text: "Üretim fire/kırpıntı oranınızı ölçüyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ci_02", text: "Kırpıntı geri dönüşüm/ikincil hammadde olarak değerlendiriliyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ci_03", text: "Geri dönüştürülmüş/organik hammadde kullanım oranınız nedir?", type: "percentage", trigger: null, note: null, options: null },
        { id: "ci_04", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ci_05", text: "Tedarikçilerinizden çevresel uyum beyanı talep ediyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "es_01", text: "ISO 45001 (İSG) belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "es_02", text: "Son 12 ayda tedarikçi denetimi yaptınız mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "es_03", text: "Kadın istihdam oranınız ve yönetim kademesi temsili nedir?", type: "percentage", trigger: null, note: null, options: null },
        { id: "es_04", text: "Sürdürülebilirlik/ESG raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "es_05", text: "Yıllık CO2e emisyonunuz 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null },
      ]},
    ],
    financeNotes: [
      { id: "kosgeb_yesil_sanayi", name: "KOSGEB Yeşil Sanayi Destek Programı", note: "GES ve enerji verimliliği yatırımları", amount: "KOBİ için azami 6.000.000 TL hibe", confidence: "high", criticalNote: "", prerequisite: "", triggerCategories: ["energy"] },
      { id: "vap_enerji_bakanligi", name: "VAP (Verimlilik Artırıcı Proje) Desteği", note: "Enerji tasarrufu yatırımları için doğrudan hibe (Enerji ve Tabii Kaynaklar Bakanlığı)", amount: "Proje üst limiti ~27.092.663 TL, azami hibe 8.127.799-9.482.432 TL", confidence: "high", criticalNote: "", prerequisite: "Enerji verimliliği etüdü zorunlu", triggerCategories: ["energy"] },
      { id: "tubitak_1832", name: "TÜBİTAK 1832 Sanayide Yeşil Dönüşüm Çağrısı", note: "Ar-Ge/inovasyon odaklı yeşil dönüşüm projeleri, TRL 3-9, max 24 ay", amount: "Dünya Bankası destekli 450 milyon USD havuzdan, faizsiz geri ödemeli", confidence: "medium", criticalNote: "", prerequisite: "", triggerCategories: ["energy", "circular"] },
      { id: "ziraat_yesil_ihracat", name: "Ziraat Bankası Yeşil İhracat/Yatırım Kredi Paketi", note: "İhracatçı KOBİ'ler, ÇSY (çevre-sosyal-yönetişim) performansı bazlı", amount: "KGF kefaletiyle firma/risk grubu başına azami 50.000.000 TL", confidence: "high", criticalNote: "", prerequisite: "KKB Greendeks Platformu'nda en az C seviyesi skor", triggerCategories: ["esg"] },
      { id: "tskb_geff", name: "TSKB — GEFF Türkiye II / Yeşil Ekonomi Finansman Fonu", note: "Enerji/kaynak verimliliği, iklim dayanıklılığı yatırımları", amount: "EBRD 100M Euro + AFD/CDP 100M Euro havuz", confidence: "medium", criticalNote: "TSKB doğrudan perakende KOBİ kredisi vermiyor — aracı banka üzerinden veya büyük ölçekli yatırım profiliyle erişilebilir. Küçük KOBİ'lere doğrudan başvuru önerme, 'aracı bankanız üzerinden sorgulayın' şeklinde yönlendir.", prerequisite: "", triggerCategories: ["water", "energy"] },
      { id: "greenmantis_ab", name: "GreenMantis (AB LIFE/Horizon Europe)", note: "Enerji verimliliği yatırımları", amount: "KOBİ başına azami 60.000 EUR", confidence: "high", criticalNote: "", prerequisite: "En az 2 farklı ülkeden 2 KOBİ konsorsiyumu zorunlu", triggerCategories: ["energy"] },
    ],
  },
  {
    id: "gida_tarim",
    label: "Gıda & Tarım",
    categories: [
      { code: "energy", label: "Enerji Yönetimi", questions: [
        { id: "gt_en_01", text: "Soğuk depo/soğuk zincir enerji tüketimi ayrı ölçülüyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_en_02", text: "Enerji verimli soğutma ekipmanı kullanılıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_en_03", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_en_04", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_en_05", text: "Pastörizasyon/kurutma hatlarında ısı geri kazanım sistemi var mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "water", label: "Su & Atık Su Yönetimi", questions: [
        { id: "gt_wa_01", text: "Proses suyu tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_wa_02", text: "Atık su arıtma tesisi kapasitesi yeterli mi?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_wa_03", text: "Su geri kazanım/tekrar kullanım uygulaması var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_wa_04", text: "Gıda güvenliği ve çevre yönetimi entegre mi yürütülüyor (ISO 22000 + 14001)?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_wa_05", text: "Organik atıklar (kabuk, posa) kompostlanıyor/değerlendiriliyor mu?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "gt_ci_01", text: "Ambalaj azaltım hedefi/planınız var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_ci_02", text: "Geri dönüştürülebilir/biyobozunur ambalaj kullanım oranınız nedir?", type: "percentage", trigger: null, note: null, options: null },
        { id: "gt_ci_03", text: "Ürün fire/kayıp oranınız ölçülüyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_ci_04", text: "Yan ürün/atıklar (posa, kabuk) ikinci değer zincirine yönlendiriliyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_ci_05", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "gt_es_01", text: "Gıda güvenliği + iş güvenliği entegre yönetim sistemi var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_es_02", text: "Tedarikçi (çiftçi/üretici) denetimi yapılıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "percentage", trigger: null, note: null, options: null },
        { id: "gt_es_04", text: "Sürdürülebilirlik raporlaması yapılıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "gt_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null },
      ]},
    ],
    financeNotes: [
      { id: "dfif_ambalaj_faktoru", name: "DFİF İhracat Hak Edişi — Ambalaj Faktörü", note: "", amount: "", confidence: "high", criticalNote: "", prerequisite: "", triggerCategories: [] },
    ],
  },
  {
    id: "makine_metal",
    label: "Makine & Metal",
    categories: [
      { code: "energy", label: "Enerji Yönetimi", questions: [
        { id: "mm_en_01", text: "Enerji tüketimi proses bazında (döküm, kaynak, işleme) ayrıştırılıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_en_03", text: "Elektrik motorlarınız IE3+ verimlilik sınıfında mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_en_04", text: "Fırın/ergitme süreçlerinde atık ısı geri kazanımı var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "water", label: "Su & Atık Su Yönetimi", questions: [
        { id: "mm_wa_01", text: "Soğutma suyu kapalı devre mi çalışıyor?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_wa_02", text: "Atık su (ağır metal arıtımı dahil) arıtma tesisiniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_wa_03", text: "Kesme yağı/soğutma sıvısı geri kazanımı yapılıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_wa_04", text: "Tehlikeli atık (boya, kimyasal, yağ) lisanslı bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_wa_05", text: "Su tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "mm_ci_01", text: "Hurda/talaş geri dönüşüm oranınız nedir?", type: "percentage", trigger: null, note: null, options: null },
        { id: "mm_ci_02", text: "Hurda satışı/değerlendirmesi sistematik izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_ci_03", text: "Geri dönüştürülmüş metal hammadde kullanım oranınız nedir?", type: "percentage", trigger: null, note: null, options: null },
        { id: "mm_ci_04", text: "Ambalaj (palet, streç, karton) geri dönüşümü yapılıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_ci_05", text: "Yalın üretim (lean) uygulamaları fire azaltımına yönelik mi?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "mm_es_01", text: "ISO 45001 belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_es_02", text: "Tedarikçi denetimi yapılıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "percentage", trigger: null, note: null, options: null },
        { id: "mm_es_04", text: "Sürdürülebilirlik raporlaması var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "mm_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: "Bu sektörde tetiklenme olasılığı diğerlerine göre daha yüksek (demir-çelik/döküm ağır sanayi TR-ETS Kategori B/C listesinde)", options: null },
      ]},
    ],
    financeNotes: [
    ],
  },
  {
    id: "hizmet_perakende",
    label: "Hizmet & Perakende",
    categories: [
      { code: "energy_building", label: "Enerji / Bina", questions: [
        { id: "hp_en_01", text: "Binanızın Enerji Kimlik Belgesi (EKB) sınıfı nedir?", type: "select", trigger: null, note: "1.000 m² üzeri binalarda yasal zorunluluk (5627 sayılı Kanun)", options: ["A", "B", "C", "D", "E", "F", "G", "Belge yok"] },
        { id: "hp_en_02", text: "Aydınlatma sisteminiz LED/verimli mi?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_en_03", text: "Isıtma-soğutma sisteminiz verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_en_04", text: "Enerji tüketimi düzenli izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_en_05", text: "Çatıda/binada güneş enerjisi sistemi var mı/planlanıyor mu?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "digitalization", label: "Dijitalleşme & Kağıtsız Süreç", questions: [
        { id: "hp_di_01", text: "Fatura/belge süreçleriniz kağıtsız iş akışına geçti mi?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_di_02", text: "Müşteri işlemleri dijital kanallardan mı yürütülüyor?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_di_03", text: "Ofis/mağaza kağıt tüketiminiz izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_di_04", text: "Bulut/uzaktan çalışma altyapınız var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_di_05", text: "Dijital arşivleme sistemi kullanıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "waste_circular", label: "Atık & Döngüsel Ekonomi", questions: [
        { id: "hp_wc_01", text: "E-atık (elektronik cihaz, kartuş vb.) lisanslı toplayıcılara mı veriliyor?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_wc_02", text: "Ambalaj atığı (kağıt, plastik, karton) ayrıştırılıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_wc_03", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_wc_04", text: "Tek kullanımlık plastik azaltma politikanız var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_wc_05", text: "Mobilya/ekipman ömür uzatma veya ikinci el değerlendirme politikanız var mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "hp_es_01", text: "İş sağlığı güvenliği yönetim sistemi var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_es_02", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "percentage", trigger: null, note: null, options: null },
        { id: "hp_es_03", text: "Tedarikçi/üretici çevresel uyum beyanı talep ediyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "hp_es_04", text: "Sürdürülebilirlik/ESG raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
      ]},
    ],
    financeNotes: [
      { id: "enerji_kimlik_belgesi", name: "Enerji Kimlik Belgesi (EKB)", note: "", amount: "", confidence: "high", criticalNote: "", prerequisite: "", triggerCategories: [] },
    ],
  },
  {
    id: "otomotiv_yan_sanayi",
    label: "Otomotiv & Yan Sanayi",
    categories: [
      { code: "energy", label: "Enerji Yönetimi", questions: [
        { id: "ot_en_01", text: "Enerji tüketiminiz proses bazında (kaplama, kaynak, montaj) izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_en_03", text: "Robotik/otomasyon hatlarında enerji verimliliği optimize edildi mi?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_en_04", text: "Kalıphane/döküm süreçlerinde atık ısı geri kazanımı var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "water", label: "Su & Kimyasal Yönetimi", questions: [
        { id: "ot_wa_01", text: "Kaplama/yıkama proses suyu tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_wa_02", text: "Atık su (ağır metal/boya) arıtma tesisiniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_wa_03", text: "Su geri kazanım/tekrar kullanım uygulaması var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_wa_04", text: "Kaplama kimyasallarınız REACH uyumlu mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_wa_05", text: "Tehlikeli atıklar (boya çamuru, kimyasal) lisanslı bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "ot_ci_01", text: "Hurda metal/plastik geri dönüşüm oranınız nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_ci_02", text: "Ürün tasarımında sökülebilirlik/geri dönüştürülebilirlik dikkate alınıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_ci_03", text: "Ambalaj (kasa, palet) tekrar kullanım sistemi uyguluyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_ci_04", text: "Geri dönüştürülmüş malzeme kullanım oranınız nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_ci_05", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "ot_es_01", text: "IATF 16949 ve/veya ISO 45001 belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_es_02", text: "OEM/ana sanayi tarafından denetleniyor musunuz (kalite+çevre)?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_es_04", text: "CDP/EcoVadis gibi sürdürülebilirlik raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ot_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null },
      ]},
    ],
    financeNotes: [
    ],
  },
  {
    id: "plastik_kimya",
    label: "Plastik & Kimya",
    categories: [
      { code: "energy", label: "Enerji Yönetimi", questions: [
        { id: "pk_en_01", text: "Proses enerjisi (ekstrüzyon, enjeksiyon) izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_en_03", text: "Isı geri kazanım sistemi var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_en_04", text: "Elektrik motorlarınız yüksek verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "water", label: "Su & Kimyasal Yönetimi", questions: [
        { id: "pk_wa_01", text: "Kimyasal envanteriniz REACH uyumlu mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_wa_02", text: "Atık su arıtma tesisiniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_wa_03", text: "Tehlikeli kimyasal depolama standardınız (uygun tank/alan) var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_wa_04", text: "VOC emisyon kontrolü uyguluyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_wa_05", text: "Tehlikeli atıklar lisanslı bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "pk_ci_01", text: "Operation Clean Sweep (OCS) uygulaması/sertifikanız var mı?", type: "boolean", trigger: null, note: "PAGEV yürütücülüğünde, plastik pelet kaybını önleme programı", options: null },
        { id: "pk_ci_02", text: "Geri dönüştürülmüş hammadde kullanım oranınız nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_ci_03", text: "Üretim fire oranınızı ölçüyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_ci_04", text: "Ambalaj tasarımınız geri dönüştürülebilirliği gözetiyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_ci_05", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "pk_es_01", text: "ISO 45001 belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_es_02", text: "Tedarikçi denetimi yapılıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_es_04", text: "Sürdürülebilirlik raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "pk_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null },
      ]},
    ],
    financeNotes: [
    ],
  },
  {
    id: "matbaa_ambalaj",
    label: "Matbaa & Ambalaj (Kağıt/Karton)",
    categories: [
      { code: "energy", label: "Enerji Yönetimi", questions: [
        { id: "ma_en_01", text: "Enerji tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_en_03", text: "Kurutma/baskı hattında ısı geri kazanımı var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_en_04", text: "Ekipmanlarınız yüksek verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "water", label: "Su & Kimyasal Yönetimi", questions: [
        { id: "ma_wa_01", text: "Mürekkep/kimyasal atık su yönetiminiz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_wa_02", text: "Su bazlı (solvent içermeyen) mürekkep kullanıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_wa_03", text: "VOC emisyon kontrolü uyguluyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_wa_04", text: "Tehlikeli atıklar (mürekkep, solvent) lisanslı bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_wa_05", text: "Su tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "ma_ci_01", text: "Geri dönüştürülmüş kağıt/karton hammadde kullanım oranınız nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_ci_02", text: "FSC/PEFC sertifikalı hammadde kullanıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_ci_03", text: "Üretim fire/hurda kağıt geri kazanım oranınız nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_ci_04", text: "Ambalaj tasarımınızda malzeme azaltımı hedefiniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_ci_05", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "ma_es_01", text: "ISO 45001 belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_es_02", text: "Tedarikçi (orman/kağıt kaynağı) denetimi yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_es_04", text: "Sürdürülebilirlik raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ma_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null },
      ]},
    ],
    financeNotes: [
    ],
  },
  {
    id: "insaat_boya",
    label: "İnşaat Malzemeleri & Boya",
    categories: [
      { code: "energy", label: "Enerji Yönetimi", questions: [
        { id: "ib_en_01", text: "Üretim enerjisi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_en_03", text: "Fırın/kurutma süreçlerinde ısı geri kazanımı var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_en_04", text: "Ekipmanlarınız yüksek verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "water", label: "Su & Kimyasal Yönetimi", questions: [
        { id: "ib_wa_01", text: "VOC emisyon sınır değerlerine uyum sağlıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_wa_02", text: "Su bazlı (solvent azaltılmış) ürün oranınız nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_wa_03", text: "Atık su arıtma tesisiniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_wa_04", text: "Tehlikeli kimyasal/atık bertarafınız lisanslı mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_wa_05", text: "Kimyasal envanteri tutuyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "ib_ci_01", text: "Geri dönüştürülmüş hammadde/agrega kullanım oranınız nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_ci_02", text: "Ambalaj (varil, teneke) geri dönüşüm/iade sistemi var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_ci_03", text: "Üretim fire oranınızı ölçüyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_ci_04", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_ci_05", text: "Yeşil Bina sertifikasyonuna (LEED/BREEAM) uygun ürün portföyünüz var mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "ib_es_01", text: "ISO 45001 belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_es_02", text: "Tedarikçi denetimi yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_es_04", text: "Sürdürülebilirlik raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ib_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null },
      ]},
    ],
    financeNotes: [
    ],
  },
  {
    id: "deri_deri_urunleri",
    label: "Deri ve Deri Ürünleri",
    categories: [
      { code: "energy", label: "Enerji Yönetimi", questions: [
        { id: "dr_en_01", text: "Tabakhane/işleme süreçlerinde enerji tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_en_03", text: "Kurutma süreçlerinde ısı geri kazanımı var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_en_04", text: "Ekipmanlarınız yüksek verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "water_chemical", label: "Su & Kimyasal Yönetimi", questions: [
        { id: "dr_wa_01", text: "Tabaklama atık suyunuzdaki krom deşarj değeri yasal sınırın (20 mg/l) altında mı?", type: "boolean", trigger: null, note: "Krom tabaklama banyosu 2000-5000 mg/l konsantrasyonda krom içerir, arıtılmadan deşarj edilemez", options: null },
        { id: "dr_wa_02", text: "Atık su arıtma tesisiniz tüm proses suyunu karşılıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_wa_03", text: "Bitkisel/vejetal tabaklama alternatifini değerlendirdiniz mi veya kullanıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_wa_04", text: "Su geri kazanım/tekrar kullanım uygulaması var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_wa_05", text: "Tehlikeli kimyasal atıklar (krom çamuru vb.) lisanslı bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "dr_ci_01", text: "Deri kırpıntı/fire oranınızı ölçüyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_ci_02", text: "Kırpıntı/deri atıkları ikincil ürüne (küçük eşya, dolgu malzemesi) dönüştürülüyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_ci_03", text: "LWG (Leather Working Group) sertifikanız var mı veya başvuru sürecinde misiniz?", type: "boolean", trigger: null, note: "Çorlu Deri OSB'de zaten sertifikalı firmalar mevcut — somut, ulaşılabilir referans", options: null },
        { id: "dr_ci_04", text: "Ambalaj malzemeleriniz geri dönüştürülebilir mi?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_ci_05", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "dr_es_01", text: "ISO 45001 (İSG) belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_es_02", text: "Tedarikçi (ham deri kaynağı) denetimi yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_es_04", text: "Sürdürülebilirlik raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "dr_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null },
      ]},
    ],
    financeNotes: [
      { id: "lwg_sertifikasi", name: "LWG (Leather Working Group) Sertifikası", note: "Gönüllü ama uluslararası marka tedarikçiliğinde fiilen pazar şartı. Çorlu Deri Karma OSB'de 5 firma zaten sertifikalı (Marmara Deri, Toprak Kürk Deri, Selina Kürk Deri, Birdallar Deri, Alpaka Deri) — somut yerel örnek olarak karnede referans gösterilebilir.", amount: "", confidence: "high", criticalNote: "", prerequisite: "", triggerCategories: [] },
    ],
  },
  {
    id: "elektrik_elektronik",
    label: "Elektrik-Elektronik",
    categories: [
      { code: "energy", label: "Enerji Yönetimi", questions: [
        { id: "ee_en_01", text: "Üretim hattı enerji tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_en_03", text: "Ürünleriniz enerji verimliliği standartlarına (Ecodesign vb.) uygun tasarlanıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_en_04", text: "Ekipmanlarınız yüksek verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "hazardous_substances", label: "Tehlikeli Madde & Kimyasal Yönetimi", questions: [
        { id: "ee_ha_01", text: "Ürünleriniz RoHS (tehlikeli madde kısıtlaması) yönetmeliğine uygun mu?", type: "boolean", trigger: null, note: "26.12.2022 tarih 32055 sayılı Yönetmelik, güncellemesi 20.01.2024", options: null },
        { id: "ee_ha_02", text: "Lehim/montaj proseslerinde kurşun-serbest (lead-free) teknoloji kullanıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_ha_03", text: "Tehlikeli kimyasal envanteri tutuyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_ha_04", text: "Atık su/kimyasal arıtma tesisiniz var mı (PCB üretimi vb. için)?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_ha_05", text: "Tehlikeli atıklar lisanslı bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "ee_ci_01", text: "AEEE Yönetmeliği kapsamında ürün geri toplama/genişletilmiş üretici sorumluluğu süreciniz var mı?", type: "boolean", trigger: null, note: "26.12.2022 tarih 32055 sayılı Yönetmelik", options: null },
        { id: "ee_ci_02", text: "Üretim fire/hurda elektronik bileşen oranınızı ölçüyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_ci_03", text: "Geri dönüştürülmüş malzeme (plastik, metal) kullanım oranınız nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_ci_04", text: "Ürün onarılabilirlik/modülerlik tasarımı dikkate alınıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_ci_05", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "ee_es_01", text: "ISO 45001 belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_es_02", text: "Tedarikçi denetimi yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_es_04", text: "Sürdürülebilirlik raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ee_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null },
      ]},
    ],
    financeNotes: [
      { id: "aeee_yonetmeligi", name: "AEEE Yönetmeliği — Genişletilmiş Üretici Sorumluluğu", note: "", amount: "", confidence: "high", criticalNote: "", prerequisite: "", triggerCategories: [] },
      { id: "rohs_yonetmeligi", name: "RoHS — Tehlikeli Madde Kısıtlaması Yönetmeliği", note: "", amount: "", confidence: "high", criticalNote: "", prerequisite: "", triggerCategories: [] },
    ],
  },
  {
    id: "diger_sektorler",
    label: "Diğer Sektörler (Lojistik, Sağlık-Medikal, Ahşap-Mobilya, İnşaat-Mühendislik Hizmetleri, Gayrimenkul, Toptan-Perakende vb.)",
    categories: [
      { code: "energy", label: "Enerji Yönetimi", questions: [
        { id: "ds_en_01", text: "Enerji tüketiminiz düzenli ölçülüp kayıt altına alınıyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ds_en_02", text: "Enerji verimliliği etüdü yaptırdınız mı veya LED/verimli ekipmana geçtiniz mi?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ds_en_03", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "water_waste", label: "Su & Atık Yönetimi", questions: [
        { id: "ds_ww_01", text: "Su tüketiminiz izleniyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ds_ww_02", text: "Atıklarınız (tehlikeli/tehlikesiz) ayrıştırılıp lisanslı firmalarla bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ds_ww_03", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "ds_ci_01", text: "Ambalaj/malzeme geri dönüşümü yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ds_ci_02", text: "Tedarikçilerinizden çevresel uyum beyanı talep ediyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ds_ci_03", text: "Ekipman/malzeme ömür uzatma veya ikinci el değerlendirme politikanız var mı?", type: "boolean", trigger: null, note: null, options: null },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "ds_es_01", text: "İş sağlığı güvenliği yönetim sistemi var mı?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ds_es_02", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null },
        { id: "ds_es_03", text: "Sürdürülebilirlik/ESG raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null },
      ]},
    ],
    financeNotes: [
    ],
  },
];

export default SECTORS;