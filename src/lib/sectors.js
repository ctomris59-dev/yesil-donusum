// Çorlu TSO Bütüncül Yeşil Dönüşüm & Sürdürülebilirlik Karnesi
// Sektör, kategori, soru, somut aksiyon önerisi ve finansman verisi.
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
        { id: "en_01", text: "Enerji tüketiminiz aylık/yıllık düzenli ölçülüp kayıt altına alınıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Aylık elektrik/doğalgaz tüketiminizi basit bir tabloda kayıt altına almaya başlayın — bu, VAP hibe başvurusunun da ön şartıdır." },
        { id: "en_02", text: "Son 3 yılda enerji verimliliği etüdü yaptırdınız mı?", type: "boolean", trigger: null, note: "VAP başvuru ön şartı", options: null, recommendation: "Yenilenebilir Enerji Genel Müdürlüğü yetkili bir danışmanlık firmasından enerji etüdü alın; VAP hibesi (proje başına ~8-9,5M TL'ye kadar) bu etüde bağlıdır." },
        { id: "en_03", text: "Yenilenebilir enerji (GES vb.) kullanıyor veya yatırım planlıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "KOSGEB Yeşil Sanayi Destek Programı'na (KOBİ için 6M TL'ye kadar hibe) başvurarak çatı GES yatırımını değerlendirin." },
        { id: "en_04", text: "Boyahane/apre atık ısı geri kazanım sisteminiz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Boyahane atık ısısını ön ısıtma suyunda değerlendiren bir ısı eşanjörü yatırımını VAP kapsamında değerlendirin." },
        { id: "en_05", text: "Ana ekipmanlarınız (motor, kompresör, kazan) yüksek verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Motor ve kompresörlerinizi IE3+ verimlilik sınıfına yükseltme planı çıkarın; yenileme maliyeti VAP hibesine dahil edilebilir." },
      ]},
      { code: "water", label: "Su & Atık Su Yönetimi", questions: [
        { id: "wa_01", text: "Su tüketiminiz m³ bazında izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Su sayacı okumalarını haftalık kaydedin — arıtma tesisi kapasite planlamasının ve gelecekteki teşvik başvurularının temelidir." },
        { id: "wa_02", text: "Atık su arıtma tesisi kapasiteniz üretiminizi karşılıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Mevcut arıtma tesisi kapasitenizi üretim hacminize göre yeniden hesaplatın; yetersizse TSKB GEFF kredisini aracı bankanız üzerinden sorgulayın." },
        { id: "wa_03", text: "Arıtılmış suyu üretimde geri kazanıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Arıtılmış suyu boyahanede ön yıkama suyu olarak geri kullanma fizibilitesini çıkarın — su maliyetini doğrudan düşürür." },
        { id: "wa_04", text: "ZDHC MRSL uyumlu kimyasal envanteri tutuyor musunuz?", type: "boolean", trigger: null, note: "Marka tedarikçiliği olan firmalar için kritik", options: null, recommendation: "ZDHC Gateway'e kayıt olup kimyasal envanterinizi MRSL listesine göre gözden geçirin — uluslararası marka tedarikçiliği için ön koşuldur." },
        { id: "wa_05", text: "Tehlikeli atıklarınız lisanslı firmalarla mı bertaraf ediliyor?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tehlikeli atık bertaraf sözleşmenizi Çevre Bakanlığı lisanslı bir firmayla başlatın/gözden geçirin." },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "ci_01", text: "Üretim fire/kırpıntı oranınızı ölçüyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Aylık fire/kırpıntı miktarını tartıp kaydedin — bu veri, döngüsel ekonomi projelerinin ve hibe başvurularının başlangıç noktasıdır." },
        { id: "ci_02", text: "Kırpıntı geri dönüşüm/ikincil hammadde olarak değerlendiriliyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kırpıntı geri dönüşüm/iplik geri kazanım firmalarıyla anlaşma yapmayı değerlendirin; hurda değerlendirmesi ek gelir kalemi olur." },
        { id: "ci_03", text: "Geri dönüştürülmüş/organik hammadde kullanım oranınız nedir?", type: "percentage", trigger: null, note: null, options: null, recommendation: "Geri dönüştürülmüş/organik hammadde tedarikçisi araştırıp kademeli bir geçiş planı oluşturun." },
        { id: "ci_04", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Sıfır Atık Belgesi yenileme/başvuru sürecini Çevre Bakanlığı sistemi (Sıfır Atık Bilgi Sistemi) üzerinden başlatın." },
        { id: "ci_05", text: "Tedarikçilerinizden çevresel uyum beyanı talep ediyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tedarikçilerinizden basit bir çevresel uyum beyan formu talep etmeye başlayın." },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "es_01", text: "ISO 45001 (İSG) belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "ISO 45001 belgelendirme sürecini başlatmak için TSE veya akredite bir belgelendirme kuruluşuyla görüşün." },
        { id: "es_02", text: "Son 12 ayda tedarikçi denetimi yaptınız mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yılda en az bir kez temel bir tedarikçi çevre/sosyal uyum kontrol listesi uygulamaya başlayın." },
        { id: "es_03", text: "Kadın istihdam oranınız ve yönetim kademesi temsili nedir?", type: "percentage", trigger: null, note: null, options: null, recommendation: "Kadın istihdamını artırmaya yönelik esnek çalışma/kreş desteği gibi somut bir politika değerlendirin — ESG raporlamasında da istenen bir veridir." },
        { id: "es_04", text: "Sürdürülebilirlik/ESG raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Basit bir yıllık sürdürülebilirlik özet raporu (1-2 sayfa) hazırlamaya başlayın — CDP/EcoVadis'e geçişin ilk adımıdır." },
        { id: "es_05", text: "Yıllık CO2e emisyonunuz 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null, recommendation: null },
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
        { id: "gt_en_01", text: "Soğuk depo/soğuk zincir enerji tüketimi ayrı ölçülüyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Soğuk depo/soğuk zincir için ayrı bir alt sayaç taktırıp tüketimi izlemeye başlayın — enerji verimliliği projelerinin ön şartıdır." },
        { id: "gt_en_02", text: "Enerji verimli soğutma ekipmanı kullanılıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yüksek COP değerli soğutma ekipmanına geçiş planı çıkarın; VAP hibesi kapsamında değerlendirilebilir." },
        { id: "gt_en_03", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yenilenebilir Enerji Genel Müdürlüğü yetkili danışmanlık firmasından enerji etüdü alın." },
        { id: "gt_en_04", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "KOSGEB Yeşil Sanayi Destek Programı ile GES yatırımını değerlendirin (KOBİ için 6M TL'ye kadar)." },
        { id: "gt_en_05", text: "Pastörizasyon/kurutma hatlarında ısı geri kazanım sistemi var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Pastörizasyon/kurutma hatlarında atık ısı geri kazanım sistemi yatırımını VAP kapsamında değerlendirin." },
      ]},
      { code: "water", label: "Su & Atık Su Yönetimi", questions: [
        { id: "gt_wa_01", text: "Proses suyu tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Proses suyu tüketimini ayrı sayaçla izlemeye başlayın." },
        { id: "gt_wa_02", text: "Atık su arıtma tesisi kapasitesi yeterli mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Atık su arıtma kapasitenizi üretim artışına göre yeniden hesaplatın." },
        { id: "gt_wa_03", text: "Su geri kazanım/tekrar kullanım uygulaması var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Su geri kazanım/tekrar kullanım fizibilitesi çıkarın (özellikle yıkama/soğutma suyunda)." },
        { id: "gt_wa_04", text: "Gıda güvenliği ve çevre yönetimi entegre mi yürütülüyor (ISO 22000 + 14001)?", type: "boolean", trigger: null, note: null, options: null, recommendation: "ISO 22000 ve ISO 14001'i entegre bir yönetim sistemi olarak kurgulayın — tek denetimle iki belgeyi yönetebilirsiniz." },
        { id: "gt_wa_05", text: "Organik atıklar (kabuk, posa) kompostlanıyor/değerlendiriliyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Organik atıklarınız (kabuk, posa) için bir kompost veya hayvan yemi değerlendirme anlaşması araştırın." },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "gt_ci_01", text: "Ambalaj azaltım hedefi/planınız var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ambalaj azaltım hedefi belirleyip yıllık takip edin — DFİF ihracat hak edişindeki 'Ambalaj Faktörü' katsayısını da olumlu etkiler." },
        { id: "gt_ci_02", text: "Geri dönüştürülebilir/biyobozunur ambalaj kullanım oranınız nedir?", type: "percentage", trigger: null, note: null, options: null, recommendation: "Geri dönüştürülebilir/biyobozunur ambalaj tedarikçisi araştırıp pilot bir ürün hattında test edin." },
        { id: "gt_ci_03", text: "Ürün fire/kayıp oranınız ölçülüyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ürün fire/kayıp oranınızı proses bazında ölçüp kayıt altına alın." },
        { id: "gt_ci_04", text: "Yan ürün/atıklar (posa, kabuk) ikinci değer zincirine yönlendiriliyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Posa/kabuk gibi yan ürünleri hayvan yemi veya biyogaz tesislerine yönlendirme anlaşması araştırın." },
        { id: "gt_ci_05", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Sıfır Atık Belgesi başvuru/yenileme sürecini başlatın." },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "gt_es_01", text: "Gıda güvenliği + iş güvenliği entegre yönetim sistemi var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Gıda güvenliği (ISO 22000) ve İSG yönetim sistemlerini entegre bir yapıda yürütün." },
        { id: "gt_es_02", text: "Tedarikçi (çiftçi/üretici) denetimi yapılıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Çiftçi/üretici tedarikçilerinize yönelik basit bir uyum kontrol listesi uygulayın." },
        { id: "gt_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "percentage", trigger: null, note: null, options: null, recommendation: "Kadın istihdamını artırmaya yönelik somut bir HR politikası (esnek çalışma, kreş desteği) değerlendirin." },
        { id: "gt_es_04", text: "Sürdürülebilirlik raporlaması yapılıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yıllık kısa bir sürdürülebilirlik özeti hazırlamaya başlayın." },
        { id: "gt_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null, recommendation: null },
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
        { id: "mm_en_01", text: "Enerji tüketimi proses bazında (döküm, kaynak, işleme) ayrıştırılıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Enerji tüketimini döküm/kaynak/işleme gibi ana proseslere göre ayrıştırıp izlemeye başlayın." },
        { id: "mm_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Enerji verimliliği etüdü alın — VAP hibesinin ön şartıdır." },
        { id: "mm_en_03", text: "Elektrik motorlarınız IE3+ verimlilik sınıfında mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Elektrik motorlarınızı kademeli olarak IE3+ sınıfına yükseltme planı çıkarın." },
        { id: "mm_en_04", text: "Fırın/ergitme süreçlerinde atık ısı geri kazanımı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Fırın/ergitme süreçlerinde atık ısı geri kazanım yatırımını VAP kapsamında değerlendirin." },
        { id: "mm_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "KOSGEB Yeşil Sanayi Destek Programı ile GES yatırımını değerlendirin." },
      ]},
      { code: "water", label: "Su & Atık Su Yönetimi", questions: [
        { id: "mm_wa_01", text: "Soğutma suyu kapalı devre mi çalışıyor?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Soğutma suyunu kapalı devreye alma fizibilitesi çıkarın — hem su maliyetini hem atık su yükünü azaltır." },
        { id: "mm_wa_02", text: "Atık su (ağır metal arıtımı dahil) arıtma tesisiniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ağır metal arıtımı yapabilen bir atık su arıtma tesisi yatırımını değerlendirin." },
        { id: "mm_wa_03", text: "Kesme yağı/soğutma sıvısı geri kazanımı yapılıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kesme yağı/soğutma sıvısı geri kazanım sistemi (filtrasyon) yatırımını araştırın." },
        { id: "mm_wa_04", text: "Tehlikeli atık (boya, kimyasal, yağ) lisanslı bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Boya/kimyasal/yağ atıklarınız için lisanslı bertaraf sözleşmesi başlatın." },
        { id: "mm_wa_05", text: "Su tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Su tüketiminizi sayaç bazlı izlemeye başlayın." },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "mm_ci_01", text: "Hurda/talaş geri dönüşüm oranınız nedir?", type: "percentage", trigger: null, note: null, options: null, recommendation: "Hurda/talaş miktarını tartıp aylık kayıt altına alın — bu, hem maliyet hem de TR-ETS/Yeşil Dönüşüm Belgesi hazırlığı için gerekli veri." },
        { id: "mm_ci_02", text: "Hurda satışı/değerlendirmesi sistematik izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Hurda satışını sistematik bir sözleşme/takip sürecine bağlayın; ek gelir kalemidir." },
        { id: "mm_ci_03", text: "Geri dönüştürülmüş metal hammadde kullanım oranınız nedir?", type: "percentage", trigger: null, note: null, options: null, recommendation: "Geri dönüştürülmüş metal hammadde tedarikçisi araştırıp kademeli geçiş planı yapın." },
        { id: "mm_ci_04", text: "Ambalaj (palet, streç, karton) geri dönüşümü yapılıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Palet/streç/karton ambalaj geri dönüşümünü sistematik hale getirin." },
        { id: "mm_ci_05", text: "Yalın üretim (lean) uygulamaları fire azaltımına yönelik mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yalın üretim (5S, kaizen) uygulamalarını fire azaltımı hedefiyle başlatın." },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "mm_es_01", text: "ISO 45001 belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "ISO 45001 belgelendirme sürecini başlatın — bu sektörde iş güvenliği riski yüksek, denetimlerde öncelikli konu." },
        { id: "mm_es_02", text: "Tedarikçi denetimi yapılıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tedarikçi denetimi için basit bir uyum kontrol listesi oluşturun." },
        { id: "mm_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "percentage", trigger: null, note: null, options: null, recommendation: "Kadın istihdamını artırmaya yönelik somut bir politika değerlendirin." },
        { id: "mm_es_04", text: "Sürdürülebilirlik raporlaması var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yıllık kısa bir sürdürülebilirlik özeti hazırlamaya başlayın." },
        { id: "mm_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: "Bu sektörde tetiklenme olasılığı diğerlerine göre daha yüksek (demir-çelik/döküm ağır sanayi TR-ETS Kategori B/C listesinde)", options: null, recommendation: null },
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
        { id: "hp_en_01", text: "Binanızın Enerji Kimlik Belgesi (EKB) sınıfı nedir?", type: "select", trigger: null, note: "1.000 m² üzeri binalarda yasal zorunluluk (5627 sayılı Kanun)", options: ["A", "B", "C", "D", "E", "F", "G", "Belge yok"], recommendation: "1.000 m² üzeri binanız varsa Enerji Kimlik Belgesi (EKB) almak yasal zorunluluk; yoksa yetkili bir mühendislik firmasıyla iletişime geçin." },
        { id: "hp_en_02", text: "Aydınlatma sisteminiz LED/verimli mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Aydınlatmayı kademeli olarak LED'e geçirin — kısa geri ödeme süreli, düşük maliyetli bir ilk adımdır." },
        { id: "hp_en_03", text: "Isıtma-soğutma sisteminiz verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Isıtma-soğutma sisteminizi verimli sınıfa (VRF, ısı pompası) yükseltme planı çıkarın; EKB sınıfınızı da doğrudan iyileştirir." },
        { id: "hp_en_04", text: "Enerji tüketimi düzenli izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Enerji tüketiminizi aylık fatura üzerinden basit bir tabloda takip etmeye başlayın." },
        { id: "hp_en_05", text: "Çatıda/binada güneş enerjisi sistemi var mı/planlanıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Çatı güneş enerjisi sistemi fizibilitesi çıkarın." },
      ]},
      { code: "digitalization", label: "Dijitalleşme & Kağıtsız Süreç", questions: [
        { id: "hp_di_01", text: "Fatura/belge süreçleriniz kağıtsız iş akışına geçti mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kağıt bazlı onay/fatura süreçlerini bulut tabanlı dijital form araçlarına taşıyın." },
        { id: "hp_di_02", text: "Müşteri işlemleri dijital kanallardan mı yürütülüyor?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Müşteri işlemlerini kademeli olarak dijital kanallara (online sipariş, e-fatura) taşıyın." },
        { id: "hp_di_03", text: "Ofis/mağaza kağıt tüketiminiz izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ofis/mağaza kağıt tüketimini aylık takip etmeye başlayın." },
        { id: "hp_di_04", text: "Bulut/uzaktan çalışma altyapınız var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Bulut tabanlı doküman/çalışma altyapısına geçişi değerlendirin." },
        { id: "hp_di_05", text: "Dijital arşivleme sistemi kullanıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Fiziksel arşivi kademeli olarak dijital arşivleme sistemine taşıyın." },
      ]},
      { code: "waste_circular", label: "Atık & Döngüsel Ekonomi", questions: [
        { id: "hp_wc_01", text: "E-atık (elektronik cihaz, kartuş vb.) lisanslı toplayıcılara mı veriliyor?", type: "boolean", trigger: null, note: null, options: null, recommendation: "E-atıklarınızı (bozuk cihaz, kartuş) lisanslı bir toplayıcıyla düzenli bertaraf sözleşmesine bağlayın." },
        { id: "hp_wc_02", text: "Ambalaj atığı (kağıt, plastik, karton) ayrıştırılıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kağıt/plastik/karton ambalaj atığını kaynağında ayrıştırma sistemine geçin." },
        { id: "hp_wc_03", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Sıfır Atık Belgesi başvuru/yenileme sürecini başlatın." },
        { id: "hp_wc_04", text: "Tek kullanımlık plastik azaltma politikanız var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tek kullanımlık plastik yerine alternatif (kağıt poşet, çok kullanımlık) politikası belirleyin." },
        { id: "hp_wc_05", text: "Mobilya/ekipman ömür uzatma veya ikinci el değerlendirme politikanız var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Mobilya/ekipmanlar için onarım/ikinci el değerlendirme politikası oluşturun." },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "hp_es_01", text: "İş sağlığı güvenliği yönetim sistemi var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Temel bir İSG yönetim sistemi (risk değerlendirmesi, acil durum planı) kurun." },
        { id: "hp_es_02", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "percentage", trigger: null, note: null, options: null, recommendation: "Kadın istihdamını artırmaya yönelik somut bir politika değerlendirin." },
        { id: "hp_es_03", text: "Tedarikçi/üretici çevresel uyum beyanı talep ediyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tedarikçilerinizden basit bir çevresel uyum beyanı talep etmeye başlayın." },
        { id: "hp_es_04", text: "Sürdürülebilirlik/ESG raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yıllık kısa bir sürdürülebilirlik özeti hazırlamaya başlayın." },
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
        { id: "ot_en_01", text: "Enerji tüketiminiz proses bazında (kaplama, kaynak, montaj) izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kaplama/kaynak/montaj proseslerinde enerji tüketimini ayrıştırıp izlemeye başlayın." },
        { id: "ot_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Enerji verimliliği etüdü alın — VAP hibesinin ön şartı." },
        { id: "ot_en_03", text: "Robotik/otomasyon hatlarında enerji verimliliği optimize edildi mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Robotik/otomasyon hatlarında bekleme modu ve enerji optimizasyonu ayarlarını gözden geçirin." },
        { id: "ot_en_04", text: "Kalıphane/döküm süreçlerinde atık ısı geri kazanımı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kalıphane/döküm süreçlerinde atık ısı geri kazanım yatırımını VAP kapsamında değerlendirin." },
        { id: "ot_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "KOSGEB Yeşil Sanayi Destek Programı ile GES yatırımını değerlendirin." },
      ]},
      { code: "water", label: "Su & Kimyasal Yönetimi", questions: [
        { id: "ot_wa_01", text: "Kaplama/yıkama proses suyu tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kaplama/yıkama proses suyunu ayrı sayaçla izlemeye başlayın." },
        { id: "ot_wa_02", text: "Atık su (ağır metal/boya) arıtma tesisiniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ağır metal/boya arıtımı yapabilen bir atık su arıtma tesisi yatırımını değerlendirin." },
        { id: "ot_wa_03", text: "Su geri kazanım/tekrar kullanım uygulaması var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Su geri kazanım/tekrar kullanım fizibilitesi çıkarın." },
        { id: "ot_wa_04", text: "Kaplama kimyasallarınız REACH uyumlu mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kaplama kimyasallarınızın REACH uyumunu tedarikçinizle teyit edin — OEM denetimlerinde sıkça sorgulanan bir konu." },
        { id: "ot_wa_05", text: "Tehlikeli atıklar (boya çamuru, kimyasal) lisanslı bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Boya çamuru/kimyasal atıklar için lisanslı bertaraf sözleşmesi başlatın." },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "ot_ci_01", text: "Hurda metal/plastik geri dönüşüm oranınız nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Hurda metal/plastik miktarını tartıp aylık kayıt altına alın." },
        { id: "ot_ci_02", text: "Ürün tasarımında sökülebilirlik/geri dönüştürülebilirlik dikkate alınıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yeni ürün tasarımlarında sökülebilirlik/geri dönüştürülebilirlik kriterini tasarım kontrol listesine ekleyin." },
        { id: "ot_ci_03", text: "Ambalaj (kasa, palet) tekrar kullanım sistemi uyguluyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kasa/palet için tekrar kullanılabilir ambalaj sistemine (dönüşlü kasa) geçişi değerlendirin." },
        { id: "ot_ci_04", text: "Geri dönüştürülmüş malzeme kullanım oranınız nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Geri dönüştürülmüş malzeme kullanımını kademeli artıracak bir tedarik planı oluşturun." },
        { id: "ot_ci_05", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Sıfır Atık Belgesi başvuru/yenileme sürecini başlatın." },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "ot_es_01", text: "IATF 16949 ve/veya ISO 45001 belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "IATF 16949 ve ISO 45001 belgelendirme sürecini başlatın — OEM tedarikçiliği için fiilen zorunlu hale geliyor." },
        { id: "ot_es_02", text: "OEM/ana sanayi tarafından denetleniyor musunuz (kalite+çevre)?", type: "boolean", trigger: null, note: null, options: null, recommendation: "OEM denetim taleplerine hazırlıklı olmak için iç öz-denetim (self-audit) sürecini düzenli hale getirin." },
        { id: "ot_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kadın istihdamını artırmaya yönelik somut bir politika değerlendirin." },
        { id: "ot_es_04", text: "CDP/EcoVadis gibi sürdürülebilirlik raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "CDP/EcoVadis kaydı açıp temel verilerinizi girmeye başlayın — birçok OEM artık bunu tedarikçi şartı olarak istiyor." },
        { id: "ot_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null, recommendation: null },
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
        { id: "pk_en_01", text: "Proses enerjisi (ekstrüzyon, enjeksiyon) izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ekstrüzyon/enjeksiyon hatlarında enerji tüketimini makine bazında izlemeye başlayın." },
        { id: "pk_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Enerji verimliliği etüdü alın — VAP hibesinin ön şartı." },
        { id: "pk_en_03", text: "Isı geri kazanım sistemi var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Proses atık ısısını değerlendiren bir geri kazanım sistemi yatırımını araştırın." },
        { id: "pk_en_04", text: "Elektrik motorlarınız yüksek verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Motorlarınızı kademeli olarak yüksek verimli sınıfa yükseltin." },
        { id: "pk_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "KOSGEB Yeşil Sanayi Destek Programı ile GES yatırımını değerlendirin." },
      ]},
      { code: "water", label: "Su & Kimyasal Yönetimi", questions: [
        { id: "pk_wa_01", text: "Kimyasal envanteriniz REACH uyumlu mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kimyasal envanterinizi REACH kısıtlı madde listesine göre gözden geçirin." },
        { id: "pk_wa_02", text: "Atık su arıtma tesisiniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Atık su arıtma tesisi yatırımını/kapasite artışını değerlendirin." },
        { id: "pk_wa_03", text: "Tehlikeli kimyasal depolama standardınız (uygun tank/alan) var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tehlikeli kimyasal depolama alanınızı (tank, bariyer, etiketleme) ilgili standarda uygun hale getirin." },
        { id: "pk_wa_04", text: "VOC emisyon kontrolü uyguluyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "VOC emisyon kontrolü için bir ölçüm/izleme sistemi kurun." },
        { id: "pk_wa_05", text: "Tehlikeli atıklar lisanslı bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tehlikeli atıklar için lisanslı bertaraf sözleşmesi başlatın." },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "pk_ci_01", text: "Operation Clean Sweep (OCS) uygulaması/sertifikanız var mı?", type: "boolean", trigger: null, note: "PAGEV yürütücülüğünde, plastik pelet kaybını önleme programı", options: null, recommendation: "PAGEV'in yürüttüğü Operation Clean Sweep (OCS) programına kaydolup pelet kaybını önleme protokolünü uygulamaya başlayın — gönüllü ve doğrudan erişilebilir." },
        { id: "pk_ci_02", text: "Geri dönüştürülmüş hammadde kullanım oranınız nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Geri dönüştürülmüş hammadde kullanım oranınızı kademeli artıracak bir tedarik planı oluşturun — AB ihracatında %25-30 zorunluluğu yaklaşıyor." },
        { id: "pk_ci_03", text: "Üretim fire oranınızı ölçüyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Üretim fire oranınızı makine bazında ölçüp kayıt altına alın." },
        { id: "pk_ci_04", text: "Ambalaj tasarımınız geri dönüştürülebilirliği gözetiyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ambalaj tasarımınızı tek malzeme/geri dönüştürülebilir yapıya göre gözden geçirin." },
        { id: "pk_ci_05", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Sıfır Atık Belgesi başvuru/yenileme sürecini başlatın." },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "pk_es_01", text: "ISO 45001 belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "ISO 45001 belgelendirme sürecini başlatın." },
        { id: "pk_es_02", text: "Tedarikçi denetimi yapılıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tedarikçi denetimi için basit bir uyum kontrol listesi oluşturun." },
        { id: "pk_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kadın istihdamını artırmaya yönelik somut bir politika değerlendirin." },
        { id: "pk_es_04", text: "Sürdürülebilirlik raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yıllık kısa bir sürdürülebilirlik özeti hazırlamaya başlayın." },
        { id: "pk_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null, recommendation: null },
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
        { id: "ma_en_01", text: "Enerji tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Enerji tüketiminizi aylık takip etmeye başlayın." },
        { id: "ma_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Enerji verimliliği etüdü alın — VAP hibesinin ön şartı." },
        { id: "ma_en_03", text: "Kurutma/baskı hattında ısı geri kazanımı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kurutma/baskı hattında atık ısı geri kazanım sistemi yatırımını araştırın." },
        { id: "ma_en_04", text: "Ekipmanlarınız yüksek verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ekipmanlarınızı kademeli olarak yüksek verimli sınıfa yükseltin." },
        { id: "ma_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "KOSGEB Yeşil Sanayi Destek Programı ile GES yatırımını değerlendirin." },
      ]},
      { code: "water", label: "Su & Kimyasal Yönetimi", questions: [
        { id: "ma_wa_01", text: "Mürekkep/kimyasal atık su yönetiminiz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Mürekkep/kimyasal atık suyunuz için bir arıtma/toplama sistemi kurun." },
        { id: "ma_wa_02", text: "Su bazlı (solvent içermeyen) mürekkep kullanıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Solvent bazlı mürekkepten su bazlı alternatiflere kademeli geçiş planı yapın." },
        { id: "ma_wa_03", text: "VOC emisyon kontrolü uyguluyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "VOC emisyonlarınızı ölçüp izlemeye başlayın." },
        { id: "ma_wa_04", text: "Tehlikeli atıklar (mürekkep, solvent) lisanslı bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Mürekkep/solvent atıkları için lisanslı bertaraf sözleşmesi başlatın." },
        { id: "ma_wa_05", text: "Su tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Su tüketiminizi sayaç bazlı izlemeye başlayın." },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "ma_ci_01", text: "Geri dönüştürülmüş kağıt/karton hammadde kullanım oranınız nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Geri dönüştürülmüş kağıt/karton hammadde oranınızı kademeli artıracak bir tedarik planı oluşturun." },
        { id: "ma_ci_02", text: "FSC/PEFC sertifikalı hammadde kullanıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "FSC/PEFC sertifikalı hammadde tedarikçisi araştırıp kademeli geçiş yapın — ihracat/marka tedarikçiliğinde avantaj sağlar." },
        { id: "ma_ci_03", text: "Üretim fire/hurda kağıt geri kazanım oranınız nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Üretim fire/hurda kağıt oranınızı ölçüp kayıt altına alın." },
        { id: "ma_ci_04", text: "Ambalaj tasarımınızda malzeme azaltımı hedefiniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ambalaj tasarımınızda malzeme azaltımı (gramaj düşürme, tek katman) hedefi belirleyin." },
        { id: "ma_ci_05", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Sıfır Atık Belgesi başvuru/yenileme sürecini başlatın." },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "ma_es_01", text: "ISO 45001 belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "ISO 45001 belgelendirme sürecini başlatın." },
        { id: "ma_es_02", text: "Tedarikçi (orman/kağıt kaynağı) denetimi yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kağıt/orman kaynağı tedarikçilerinize yönelik bir uyum kontrol listesi uygulayın." },
        { id: "ma_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kadın istihdamını artırmaya yönelik somut bir politika değerlendirin." },
        { id: "ma_es_04", text: "Sürdürülebilirlik raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yıllık kısa bir sürdürülebilirlik özeti hazırlamaya başlayın." },
        { id: "ma_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null, recommendation: null },
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
        { id: "ib_en_01", text: "Üretim enerjisi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Üretim enerjinizi aylık takip etmeye başlayın." },
        { id: "ib_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Enerji verimliliği etüdü alın — VAP hibesinin ön şartı." },
        { id: "ib_en_03", text: "Fırın/kurutma süreçlerinde ısı geri kazanımı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Fırın/kurutma süreçlerinde atık ısı geri kazanım sistemi yatırımını araştırın." },
        { id: "ib_en_04", text: "Ekipmanlarınız yüksek verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ekipmanlarınızı kademeli olarak yüksek verimli sınıfa yükseltin." },
        { id: "ib_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "KOSGEB Yeşil Sanayi Destek Programı ile GES yatırımını değerlendirin." },
      ]},
      { code: "water", label: "Su & Kimyasal Yönetimi", questions: [
        { id: "ib_wa_01", text: "VOC emisyon sınır değerlerine uyum sağlıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "VOC emisyon sınır değerlerine uyumu güncel mevzuata göre teyit edin ve gerekirse formülasyonu revize edin." },
        { id: "ib_wa_02", text: "Su bazlı (solvent azaltılmış) ürün oranınız nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Su bazlı/solvent azaltılmış ürün oranınızı kademeli artıracak bir Ar-Ge/üretim planı oluşturun — hem mevzuat hem pazar talebi bu yönde." },
        { id: "ib_wa_03", text: "Atık su arıtma tesisiniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Atık su arıtma tesisi yatırımını/kapasite artışını değerlendirin." },
        { id: "ib_wa_04", text: "Tehlikeli kimyasal/atık bertarafınız lisanslı mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tehlikeli kimyasal/atık bertarafınızı lisanslı bir firmayla sözleşmeye bağlayın." },
        { id: "ib_wa_05", text: "Kimyasal envanteri tutuyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kimyasal envanterinizi güncel tutmaya başlayın." },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "ib_ci_01", text: "Geri dönüştürülmüş hammadde/agrega kullanım oranınız nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Geri dönüştürülmüş hammadde/agrega kullanım oranınızı kademeli artıracak bir tedarik planı oluşturun." },
        { id: "ib_ci_02", text: "Ambalaj (varil, teneke) geri dönüşüm/iade sistemi var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Varil/teneke ambalajlar için iade/tekrar kullanım sistemi kurun." },
        { id: "ib_ci_03", text: "Üretim fire oranınızı ölçüyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Üretim fire oranınızı ölçüp kayıt altına alın." },
        { id: "ib_ci_04", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Sıfır Atık Belgesi başvuru/yenileme sürecini başlatın." },
        { id: "ib_ci_05", text: "Yeşil Bina sertifikasyonuna (LEED/BREEAM) uygun ürün portföyünüz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yeşil Bina sertifikasyonuna (LEED/BREEAM) uygun bir ürün hattı geliştirmeyi değerlendirin — EKB B sınıfı üzeri bina talebi artıyor." },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "ib_es_01", text: "ISO 45001 belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "ISO 45001 belgelendirme sürecini başlatın." },
        { id: "ib_es_02", text: "Tedarikçi denetimi yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tedarikçi denetimi için basit bir uyum kontrol listesi oluşturun." },
        { id: "ib_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kadın istihdamını artırmaya yönelik somut bir politika değerlendirin." },
        { id: "ib_es_04", text: "Sürdürülebilirlik raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yıllık kısa bir sürdürülebilirlik özeti hazırlamaya başlayın." },
        { id: "ib_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null, recommendation: null },
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
        { id: "dr_en_01", text: "Tabakhane/işleme süreçlerinde enerji tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tabakhane süreçlerinde enerji tüketimini izlemeye başlayın." },
        { id: "dr_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Enerji verimliliği etüdü alın — VAP hibesinin ön şartı." },
        { id: "dr_en_03", text: "Kurutma süreçlerinde ısı geri kazanımı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kurutma süreçlerinde atık ısı geri kazanım sistemi yatırımını araştırın." },
        { id: "dr_en_04", text: "Ekipmanlarınız yüksek verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ekipmanlarınızı kademeli olarak yüksek verimli sınıfa yükseltin." },
        { id: "dr_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "KOSGEB Yeşil Sanayi Destek Programı ile GES yatırımını değerlendirin." },
      ]},
      { code: "water_chemical", label: "Su & Kimyasal Yönetimi", questions: [
        { id: "dr_wa_01", text: "Tabaklama atık suyunuzdaki krom deşarj değeri yasal sınırın (20 mg/l) altında mı?", type: "boolean", trigger: null, note: "Krom tabaklama banyosu 2000-5000 mg/l konsantrasyonda krom içerir, arıtılmadan deşarj edilemez", options: null, recommendation: "Krom deşarj değerinizi (yasal sınır 20 mg/l) düzenli ölçtürün; aşıyorsanız arıtma kapasitesini acilen artırın — bu bir uyum riski." },
        { id: "dr_wa_02", text: "Atık su arıtma tesisiniz tüm proses suyunu karşılıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Atık su arıtma tesisi kapasitenizi tüm proses suyunu (yıkama, retenaj dahil) karşılayacak şekilde gözden geçirin." },
        { id: "dr_wa_03", text: "Bitkisel/vejetal tabaklama alternatifini değerlendirdiniz mi veya kullanıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yüksek katma değerli ürün hatlarında bitkisel/vejetal tabaklamayı pilot olarak deneyin — krom atık yükünü doğrudan azaltır." },
        { id: "dr_wa_04", text: "Su geri kazanım/tekrar kullanım uygulaması var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Su geri kazanım/tekrar kullanım fizibilitesi çıkarın." },
        { id: "dr_wa_05", text: "Tehlikeli kimyasal atıklar (krom çamuru vb.) lisanslı bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Krom çamuru ve diğer tehlikeli kimyasal atıklar için lisanslı bertaraf sözleşmesi başlatın." },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "dr_ci_01", text: "Deri kırpıntı/fire oranınızı ölçüyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Deri kırpıntı/fire miktarını tartıp aylık kayıt altına alın." },
        { id: "dr_ci_02", text: "Kırpıntı/deri atıkları ikincil ürüne (küçük eşya, dolgu malzemesi) dönüştürülüyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kırpıntıları küçük deri eşya/dolgu malzemesi üreticilerine yönlendiren bir değerlendirme anlaşması araştırın." },
        { id: "dr_ci_03", text: "LWG (Leather Working Group) sertifikanız var mı veya başvuru sürecinde misiniz?", type: "boolean", trigger: null, note: "Çorlu Deri OSB'de zaten sertifikalı firmalar mevcut — somut, ulaşılabilir referans", options: null, recommendation: "LWG sertifikasyon sürecini başlatın — Çorlu Deri OSB'de zaten sertifikalı firmalar var, onlardan süreç bilgisi alabilirsiniz." },
        { id: "dr_ci_04", text: "Ambalaj malzemeleriniz geri dönüştürülebilir mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ambalaj malzemelerinizi geri dönüştürülebilir alternatiflere geçirin." },
        { id: "dr_ci_05", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Sıfır Atık Belgesi başvuru/yenileme sürecini başlatın." },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "dr_es_01", text: "ISO 45001 (İSG) belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "ISO 45001 belgelendirme sürecini başlatın." },
        { id: "dr_es_02", text: "Tedarikçi (ham deri kaynağı) denetimi yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ham deri tedarikçilerinize yönelik bir uyum kontrol listesi uygulayın." },
        { id: "dr_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kadın istihdamını artırmaya yönelik somut bir politika değerlendirin." },
        { id: "dr_es_04", text: "Sürdürülebilirlik raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yıllık kısa bir sürdürülebilirlik özeti hazırlamaya başlayın — LWG başvurusunda da faydalı bir belge." },
        { id: "dr_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null, recommendation: null },
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
        { id: "ee_en_01", text: "Üretim hattı enerji tüketimi izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Üretim hattı enerji tüketiminizi izlemeye başlayın." },
        { id: "ee_en_02", text: "Enerji verimliliği etüdü yaptırıldı mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Enerji verimliliği etüdü alın — VAP hibesinin ön şartı." },
        { id: "ee_en_03", text: "Ürünleriniz enerji verimliliği standartlarına (Ecodesign vb.) uygun tasarlanıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yeni ürün tasarımlarında Ecodesign/enerji verimliliği kriterlerini tasarım kontrol listesine ekleyin." },
        { id: "ee_en_04", text: "Ekipmanlarınız yüksek verimli sınıfta mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ekipmanlarınızı kademeli olarak yüksek verimli sınıfa yükseltin." },
        { id: "ee_en_05", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "KOSGEB Yeşil Sanayi Destek Programı ile GES yatırımını değerlendirin." },
      ]},
      { code: "hazardous_substances", label: "Tehlikeli Madde & Kimyasal Yönetimi", questions: [
        { id: "ee_ha_01", text: "Ürünleriniz RoHS (tehlikeli madde kısıtlaması) yönetmeliğine uygun mu?", type: "boolean", trigger: null, note: "26.12.2022 tarih 32055 sayılı Yönetmelik, güncellemesi 20.01.2024", options: null, recommendation: "Ürünlerinizin RoHS uyumunu (26.12.2022 tarih 32055 sayılı Yönetmelik) tedarikçi bazında teyit edin — AB pazarına erişim şartı." },
        { id: "ee_ha_02", text: "Lehim/montaj proseslerinde kurşun-serbest (lead-free) teknoloji kullanıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Lehim/montaj proseslerinizi kurşun-serbest teknolojiye geçirme planı çıkarın." },
        { id: "ee_ha_03", text: "Tehlikeli kimyasal envanteri tutuyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tehlikeli kimyasal envanterinizi güncel tutmaya başlayın." },
        { id: "ee_ha_04", text: "Atık su/kimyasal arıtma tesisiniz var mı (PCB üretimi vb. için)?", type: "boolean", trigger: null, note: null, options: null, recommendation: "PCB üretimi gibi süreçleriniz varsa atık su/kimyasal arıtma kapasitenizi gözden geçirin." },
        { id: "ee_ha_05", text: "Tehlikeli atıklar lisanslı bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tehlikeli atıklarınız için lisanslı bertaraf sözleşmesi başlatın." },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "ee_ci_01", text: "AEEE Yönetmeliği kapsamında ürün geri toplama/genişletilmiş üretici sorumluluğu süreciniz var mı?", type: "boolean", trigger: null, note: "26.12.2022 tarih 32055 sayılı Yönetmelik", options: null, recommendation: "AEEE Yönetmeliği kapsamında genişletilmiş üretici sorumluluğu sürecinizi (ürün geri toplama) başlatın — yasal yükümlülük." },
        { id: "ee_ci_02", text: "Üretim fire/hurda elektronik bileşen oranınızı ölçüyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Üretim fire/hurda elektronik bileşen oranınızı ölçüp kayıt altına alın." },
        { id: "ee_ci_03", text: "Geri dönüştürülmüş malzeme (plastik, metal) kullanım oranınız nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Geri dönüştürülmüş plastik/metal kullanım oranınızı kademeli artıracak bir tedarik planı oluşturun." },
        { id: "ee_ci_04", text: "Ürün onarılabilirlik/modülerlik tasarımı dikkate alınıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ürün tasarımınızda onarılabilirlik/modülerlik kriterini değerlendirin — hem döngüsellik hem AB pazar talebi bu yönde." },
        { id: "ee_ci_05", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Sıfır Atık Belgesi başvuru/yenileme sürecini başlatın." },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "ee_es_01", text: "ISO 45001 belgeniz var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "ISO 45001 belgelendirme sürecini başlatın." },
        { id: "ee_es_02", text: "Tedarikçi denetimi yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tedarikçi denetimi için basit bir uyum kontrol listesi oluşturun." },
        { id: "ee_es_03", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kadın istihdamını artırmaya yönelik somut bir politika değerlendirin." },
        { id: "ee_es_04", text: "Sürdürülebilirlik raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yıllık kısa bir sürdürülebilirlik özeti hazırlamaya başlayın." },
        { id: "ee_es_05", text: "Yıllık CO2e emisyonu 50.000 tonu aşıyor mu?", type: "boolean", trigger: "ets_skdm_module", note: null, options: null, recommendation: null },
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
        { id: "ds_en_01", text: "Enerji tüketiminiz düzenli ölçülüp kayıt altına alınıyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Enerji tüketiminizi aylık basit bir tabloda kayıt altına almaya başlayın." },
        { id: "ds_en_02", text: "Enerji verimliliği etüdü yaptırdınız mı veya LED/verimli ekipmana geçtiniz mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kolay uygulanabilir bir adımla başlayın: LED aydınlatmaya geçiş veya temel bir enerji etüdü." },
        { id: "ds_en_03", text: "Yenilenebilir enerji kullanımı/planı var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Küçük ölçekli bir güneş enerjisi/yenilenebilir yatırımının fizibilitesini araştırın." },
      ]},
      { code: "water_waste", label: "Su & Atık Yönetimi", questions: [
        { id: "ds_ww_01", text: "Su tüketiminiz izleniyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Su tüketiminizi fatura üzerinden aylık takip etmeye başlayın." },
        { id: "ds_ww_02", text: "Atıklarınız (tehlikeli/tehlikesiz) ayrıştırılıp lisanslı firmalarla bertaraf ediliyor mu?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Atıklarınızı tehlikeli/tehlikesiz ayrıştırıp lisanslı firmalarla bertaraf sözleşmesi başlatın." },
        { id: "ds_ww_03", text: "Sıfır Atık Belgeniz güncel mi?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Sıfır Atık Belgesi başvuru/yenileme sürecini başlatın." },
      ]},
      { code: "circular", label: "Döngüsel Ekonomi", questions: [
        { id: "ds_ci_01", text: "Ambalaj/malzeme geri dönüşümü yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ambalaj/malzeme atıklarınızı kaynağında ayrıştırıp geri dönüşüme yönlendirin." },
        { id: "ds_ci_02", text: "Tedarikçilerinizden çevresel uyum beyanı talep ediyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Tedarikçilerinizden basit bir çevresel uyum beyanı talep etmeye başlayın." },
        { id: "ds_ci_03", text: "Ekipman/malzeme ömür uzatma veya ikinci el değerlendirme politikanız var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Ekipman/malzeme için onarım veya ikinci el değerlendirme politikası oluşturun." },
      ]},
      { code: "esg", label: "Sosyal & Yönetişim (ESG)", questions: [
        { id: "ds_es_01", text: "İş sağlığı güvenliği yönetim sistemi var mı?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Temel bir İSG yönetim sistemi (risk değerlendirmesi, acil durum planı) kurun." },
        { id: "ds_es_02", text: "Kadın istihdam oranı ve yönetim temsili nedir?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Kadın istihdamını artırmaya yönelik somut bir politika değerlendirin." },
        { id: "ds_es_03", text: "Sürdürülebilirlik/ESG raporlaması yapıyor musunuz?", type: "boolean", trigger: null, note: null, options: null, recommendation: "Yıllık kısa bir sürdürülebilirlik özeti hazırlamaya başlayın." },
      ]},
    ],
    financeNotes: [
    ],
  },
];

export default SECTORS;