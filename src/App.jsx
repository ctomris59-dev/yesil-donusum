import React, { useState, useMemo } from "react";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ExternalLink,
  Download,
  Leaf,
  ShieldCheck,
  ChevronRight,
  X,
} from "lucide-react";
import { SECTORS, CROSS_SECTOR_PROGRAMS, CONDITIONAL_MODULES } from "./lib/sectors";
import {
  ANSWER_OPTIONS,
  levelFor,
  computeScores,
  relevantFinanceNotes,
  totalQuestionCount,
  actionableFindings,
} from "./lib/scoring";
import { generateGreenPdfReport } from "./lib/pdfReport";
import { supabase } from "./lib/supabaseClient";
import EcoBackground from "./components/EcoBackground";

const HIBE_MOTORU_URL = "https://hibemotoru.vercel.app";

/* ---------------------------------------------------------------
   RENK YARDIMCISI
--------------------------------------------------------------- */
function scoreColor(score) {
  if (score < 40) return { bar: "bg-red-500", badge: "bg-red-50 text-red-700 border-red-200", text: "text-red-600" };
  if (score < 60) return { bar: "bg-orange-500", badge: "bg-orange-50 text-orange-700 border-orange-200", text: "text-orange-600" };
  if (score < 80) return { bar: "bg-amber-500", badge: "bg-amber-50 text-amber-800 border-amber-200", text: "text-amber-700" };
  return { bar: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-800 border-emerald-200", text: "text-emerald-700" };
}

/* ---------------------------------------------------------------
   KATEGORİ SKORU + SOMUT AKSİYON BULGULARI
--------------------------------------------------------------- */
function CategoryBars({ sector, categoryScores, answers }) {
  const findingsByCategory = actionableFindings(sector, answers);

  return (
    <div className="grid gap-3">
      {sector.categories.map((cat, idx) => {
        const s = categoryScores[cat.code] ?? 0;
        const c = scoreColor(s);
        const findings = findingsByCategory[idx]?.findings || [];
        return (
          <div key={cat.code} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-sm font-bold text-slate-900">{cat.label}</span>
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${c.badge}`}>
                {s} / 100
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3">
              <div className={`h-full ${c.bar} rounded-full transition-all duration-500`} style={{ width: `${s}%` }} />
            </div>

            {findings.length > 0 ? (
              <div className="space-y-2.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Öncelikli Aksiyon Alanları
                </div>
                {findings.map((q) => (
                  <div key={q.id} className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <span
                        className={`mt-0.5 flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          q.answerValue === 0
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {q.answerValue === 0 ? "Hayır" : "Kısmen"}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 leading-snug">{q.text}</span>
                    </div>
                    <p className="text-xs text-emerald-800 leading-relaxed mt-1.5 pl-2 border-l-2 border-emerald-300">
                      → {q.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-emerald-700 font-medium">
                Bu kategoride öncelikli bir eksik görünmüyor — mevcut uygulamalarınızı sürdürün.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Gauge({ value }) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const r = 88;
  const startAngle = -180;
  const endAngle = 0;
  const pct = Math.max(0, Math.min(1, value / 100));
  const needleAngle = startAngle + pct * (endAngle - startAngle);

  const polar = (angleDeg, radius) => {
    const rad = (angleDeg * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  };
  const arcPath = (a0, a1, radius) => {
    const [x0, y0] = polar(a0, radius);
    const [x1, y1] = polar(a1, radius);
    const large = a1 - a0 > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${radius} ${radius} 0 ${large} 1 ${x1} ${y1}`;
  };
  const [nx, ny] = polar(needleAngle, r - 14);

  return (
    <svg viewBox={`0 0 ${size} ${size * 0.62}`} width="100%" style={{ maxWidth: 240, display: "block", margin: "0 auto" }}>
      <path d={arcPath(startAngle, endAngle, r)} fill="none" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
      <path d={arcPath(startAngle, needleAngle, r)} fill="none" stroke="#065F46" strokeWidth="12" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="6" fill="#0F172A" />
      <text x={cx} y={cy - 32} textAnchor="middle" fontSize="32" fontWeight="800" fill="#0F172A">
        {value}
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------
   KATEGORİ RADARI (sektöre göre değişken eksen sayısı, 0-100)
--------------------------------------------------------------- */
function CategoryRadar({ sector, categoryScores }) {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 100;
  const categories = sector.categories;
  const n = categories.length;

  const pointAt = (i, r) => {
    const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };

  const rings = [20, 40, 60, 80, 100];
  const dataPoints = categories.map((cat, i) => pointAt(i, ((categoryScores[cat.code] ?? 0) / 100) * maxR));
  const dataPath = dataPoints.map((p) => p.join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: 300, display: "block", margin: "0 auto" }}>
      {rings.map((ring) => {
        const pts = categories.map((_, i) => pointAt(i, (ring / 100) * maxR).join(",")).join(" ");
        return (
          <polygon key={ring} points={pts} fill="none" stroke="#E2E8F0" strokeWidth={ring === 100 ? 1.5 : 1} strokeDasharray={ring === 100 ? "0" : "3,3"} />
        );
      })}
      {categories.map((cat, i) => {
        const [x, y] = pointAt(i, maxR);
        return <line key={cat.code} x1={cx} y1={cy} x2={x} y2={y} stroke="#CBD5E1" strokeWidth="1" />;
      })}
      <polygon points={dataPath} fill="rgba(6, 95, 70, 0.15)" stroke="#065F46" strokeWidth="2.5" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#065F46" stroke="#FFFFFF" strokeWidth="2" />
      ))}
      {categories.map((cat, i) => {
        const [x, y] = pointAt(i, maxR + 26);
        return (
          <text key={cat.code} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#334155" fontWeight="700">
            {cat.label.toUpperCase()}
          </text>
        );
      })}
    </svg>
  );
}

/* ---------------------------------------------------------------
   METODOLOJİ MODALI
--------------------------------------------------------------- */
function MethodologyModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 z-50 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-xl shadow-2xl p-6 sm:p-8 max-w-2xl w-full"
        style={{ maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-base font-extrabold text-slate-900">Bilimsel Metodoloji ve Kaynakça</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
          <p>
            Bu karne; çevresel-sosyal-yönetişim (ESG) raporlamasında uluslararası kabul gören{" "}
            <strong>GRI (Global Reporting Initiative) Standartları</strong>'nın kategori yapısından,
            BM <strong>Sürdürülebilir Kalkınma Amaçları</strong>'ndan (özellikle SKA 6 — Temiz Su,
            SKA 7 — Erişilebilir Enerji, SKA 8 — İnsana Yakışır İş, SKA 12 — Sorumlu Üretim-Tüketim,
            SKA 13 — İklim Eylemi) ve <strong>AB Döngüsel Ekonomi Eylem Planı</strong>'ndan esinlenerek
            Çorlu Ticaret ve Sanayi Odası tarafından özgün olarak geliştirilmiştir.
          </p>

          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              1. Kategori Çerçevesi
            </div>
            <p>
              Her sektör dört ortak eksende değerlendirilir: <strong>Enerji Yönetimi</strong>,{" "}
              <strong>Su & Kimyasal Yönetimi</strong>, <strong>Döngüsel Ekonomi</strong> ve{" "}
              <strong>Sosyal & Yönetişim (ESG)</strong>. Bu dörtlü yapı, GRI 300 (Çevresel) ve
              GRI 400 (Sosyal) serileriyle ve yaygın E-S-G raporlama pratiğiyle uyumludur.
            </p>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              2. Sektörel İçerik Kaynakları
            </div>
            <p>
              Soru içerikleri, her sektörde fiilen kullanılan tanınmış sertifikasyon ve
              uyum standartlarına dayanır:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 text-xs">
              <li><strong>ZDHC</strong> (Zero Discharge of Hazardous Chemicals) — tekstil/boyahane</li>
              <li><strong>LWG</strong> (Leather Working Group) — deri ve deri ürünleri</li>
              <li><strong>AEEE Yönetmeliği & RoHS</strong> — elektrik-elektronik</li>
              <li><strong>Yeşil Lojistik Belgesi</strong> (Ulaştırma ve Altyapı Bakanlığı) — lojistik</li>
              <li><strong>Operation Clean Sweep (OCS)</strong>, PAGEV yürütücülüğünde — plastik</li>
              <li><strong>Enerji Kimlik Belgesi</strong> (5627 sayılı Kanun) — hizmet & bina</li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              3. Ulusal Mevzuat Uyumu
            </div>
            <p>
              Sorular ve uyarı modülleri; 7552 sayılı <strong>İklim Kanunu</strong> (9 Temmuz 2025),{" "}
              <strong>Türkiye Emisyon Ticaret Sistemi (TR-ETS)</strong> pilot uygulaması ve AB{" "}
              <strong>Sınırda Karbon Düzenleme Mekanizması (SKDM/CBAM)</strong> ile uyumlu olacak
              şekilde güncellenmiştir (kaynak taraması: Ağustos 2026).
            </p>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              4. Skor Hesaplama
            </div>
            <p>
              Her soru 3 kademeli bir ölçekte (Hayır / Kısmen / Evet → 0 / 1 / 2) yanıtlanır.
              Kategori skoru, o kategorideki soruların ortalamasının 100 üzerinden ifadesidir;
              genel skor, dört kategori skorunun ortalamasıdır. Bu, gelişmiş olgunluk
              modellerinde (örn. acatech Endüstri 4.0 Olgunluk Endeksi) kullanılan basit
              ortalama yaklaşımının sadeleştirilmiş bir uyarlamasıdır.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>Sınırlılık notu:</strong> Bu araç bir öz-değerlendirme ve yönlendirme
              aracıdır; resmi denetim, sertifikasyon veya danışmanlık hizmetinin yerine geçmez.
              Hibe/teşvik tutarları ve mevzuat hükümleri zamanla değişebilir — başvuru öncesi
              ilgili kurumdan güncel şartları teyit ediniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   KVKK AYDINLATMA METNİ MODALI
--------------------------------------------------------------- */
function KVKKModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 z-50 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-xl shadow-2xl p-6 sm:p-8 max-w-2xl w-full"
        style={{ maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-base font-extrabold text-slate-900">KVKK Aydınlatma Metni</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Veri Sorumlusu</div>
            <p>
              Bu değerlendirme, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında
              Çorlu Ticaret ve Sanayi Odası ("Oda") tarafından veri sorumlusu sıfatıyla yürütülmektedir.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">İşlenen Veriler</div>
            <p>
              Değerlendirmeyi tamamlayıp sonuç raporunu görüntülemeniz için firma unvanı, yetkili
              adı-soyadı, e-posta adresi, telefon numarası ile anket yanıtlarınız ve hesaplanan
              sürdürülebilirlik skorlarınız işlenir.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">İşleme Amacı</div>
            <p>
              Verileriniz; yeşil dönüşüm ve sürdürülebilirlik olgunluk düzeyinizin ölçülmesi, size özel
              sonuç raporunun sunulması ve Oda tarafından ilerleyen dönemde (öngörülen süre yaklaşık 6 ay)
              tarafınızla iletişime geçilerek gelişim sürecinizin takip edilmesi amacıyla işlenir.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Hukuki Sebep</div>
            <p>
              KVKK md. 5/1 uyarınca açık rızanıza dayanılarak; Oda'nın üyelerine yönelik yeşil dönüşüm
              ve sürdürülebilirlik kapasitesini geliştirme faaliyetlerinin yürütülmesi meşru amacıyla
              işlenir.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Saklama ve Güvenlik</div>
            <p>
              Veriler, yalnızca Oda yetkilileri tarafından erişilebilen güvenli bir veritabanında
              saklanır ve amaç için gerekli süre boyunca tutulur; üçüncü taraflarla paylaşılmaz veya
              ticari amaçla kullanılmaz. Anket yanıtlarınızın skorlanması tarayıcınızda yapılır; yalnızca
              iletişim bilgileriniz ve sonuç skorlarınız kayıt altına alınır.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Haklarınız</div>
            <p>
              KVKK md. 11 uyarınca verilerinize erişme, düzeltilmesini/silinmesini talep etme ve
              rızanızı geri alma dahil haklarınızı kullanmak için Oda'ya yazılı olarak başvurabilirsiniz.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-900 leading-relaxed">
              Bu metin genel bir taslaktır; yayına almadan önce Oda'nın hukuk/uyum birimince gözden
              geçirilmesi önerilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ANA UYGULAMA
--------------------------------------------------------------- */
export default function App() {
  const [screen, setScreen] = useState("intro"); // intro | sectorPick | questions | contact | results
  const [sectorId, setSectorId] = useState(null);
  const [pageIndex, setPageIndex] = useState(0); // kategori sayfası
  const [answers, setAnswers] = useState({});
  const [firmName, setFirmName] = useState("");
  const [pdfState, setPdfState] = useState("idle"); // idle | generating | done
  const [showMethodology, setShowMethodology] = useState(false);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [showKVKK, setShowKVKK] = useState(false);
  const [contact, setContact] = useState({ companyName: "", contactName: "", email: "", phone: "" });
  const [contactErrors, setContactErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const sector = useMemo(() => SECTORS.find((s) => s.id === sectorId) || null, [sectorId]);

  const currentCategory = sector ? sector.categories[pageIndex] : null;
  const totalPages = sector ? sector.categories.length : 0;

  const answeredInPage = useMemo(() => {
    if (!currentCategory) return 0;
    return currentCategory.questions.filter((q) => typeof answers[q.id] === "number").length;
  }, [currentCategory, answers]);

  const canProceed = currentCategory ? answeredInPage === currentCategory.questions.length : false;

  const { categoryScores, overallScore, triggeredModules } = useMemo(() => {
    if (!sector) return { categoryScores: {}, overallScore: 0, triggeredModules: [] };
    return computeScores(sector, answers);
  }, [sector, answers]);

  const level = levelFor(overallScore);
  const financeNotes = sector ? relevantFinanceNotes(sector, categoryScores) : [];

  function selectSector(id) {
    setSectorId(id);
    setAnswers({});
    setPageIndex(0);
    setScreen("questions");
  }

  function setAnswer(qId, value) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }

  function nextPage() {
    if (pageIndex < totalPages - 1) {
      setPageIndex((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setScreen("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function prevPage() {
    if (pageIndex > 0) {
      setPageIndex((p) => p - 1);
    } else {
      setScreen("sectorPick");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    setSectorId(null);
    setAnswers({});
    setPageIndex(0);
    setFirmName("");
    setPdfState("idle");
    setKvkkAccepted(false);
    setContact({ companyName: "", contactName: "", email: "", phone: "" });
    setContactErrors({});
    setSubmitError("");
    setScreen("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleContactChange(field) {
    return (e) => {
      setContact((prev) => ({ ...prev, [field]: e.target.value }));
      setContactErrors((prev) => (prev[field] ? { ...prev, [field]: null } : prev));
    };
  }

  function validateContact() {
    const errs = {};
    if (!contact.companyName.trim()) errs.companyName = "Firma adı zorunludur";
    if (!contact.contactName.trim()) errs.contactName = "Ad soyad zorunludur";
    if (!contact.email.trim()) errs.email = "E-posta zorunludur";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) errs.email = "Geçerli bir e-posta girin";
    if (!contact.phone.trim()) errs.phone = "Telefon zorunludur";
    else if (contact.phone.replace(/\D/g, "").length < 10) errs.phone = "Geçerli bir telefon girin";
    setContactErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleContactSubmit(e) {
    e.preventDefault();
    if (!validateContact()) return;

    setSubmitting(true);
    setSubmitError("");

    const { error } = await supabase.from("yesil_donusum_basvurular").insert({
      company_name: contact.companyName.trim(),
      contact_name: contact.contactName.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      sector_id: sectorId,
      sector_label: sector?.label || null,
      overall_score: overallScore,
      level_name: level.name,
      category_scores: categoryScores,
      answers,
      kvkk_consent: true,
    });

    setSubmitting(false);

    if (error) {
      console.error("Supabase kayıt hatası:", error);
      setSubmitError("Kaydınız gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.");
      return;
    }

    setFirmName(contact.companyName.trim());
    setScreen("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDownloadPdf() {
    setPdfState("generating");
    try {
      await generateGreenPdfReport({
        firmName,
        sector,
        categoryScores,
        overallScore,
        level,
        financeNotes,
        crossSectorPrograms: CROSS_SECTOR_PROGRAMS,
        triggeredModules,
        conditionalModules: CONDITIONAL_MODULES,
        findingsByCategory: actionableFindings(sector, answers),
      });
      setPdfState("done");
    } catch (e) {
      console.error("PDF üretim hatası:", e);
      setPdfState("idle");
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <EcoBackground />

      <header className="bg-slate-950/35 backdrop-blur-md border-b border-white/10 py-4 flex-shrink-0 relative z-10">
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-3">
          <div className="bg-white/95 rounded-lg p-1 flex-shrink-0">
            <img src="/ctso-logo.png" alt="Çorlu TSO" className="h-8 w-auto" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-white leading-tight">Çorlu Ticaret ve Sanayi Odası</div>
            <div className="text-xs text-emerald-200/80 leading-tight">Bütüncül Yeşil Dönüşüm & Sürdürülebilirlik Karnesi</div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 relative z-10">
        {screen === "intro" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                <Leaf className="text-emerald-700" size={28} />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">Yeşil Dönüşüm & Sürdürülebilirlik Karnesi</h1>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
                Sektörünüze özel 20 soruluk bir değerlendirmeyle enerji, su, döngüsel ekonomi ve
                sosyal-yönetişim (ESG) alanlarındaki mevcut durumunuzu görün; size özel hibe, teşvik
                ve mevzuat uyum önerilerini alın. Tamamlama süresi 8-10 dakika.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={14} className="text-emerald-600" />
                Anket yanıtlarınız tarayıcınızda hesaplanır; sonucu görüntülemek için yalnızca iletişim bilgileriniz kaydedilir.
              </div>

              <label className="flex items-start gap-2.5 max-w-md mx-auto text-left cursor-pointer">
                <input
                  type="checkbox"
                  checked={kvkkAccepted}
                  onChange={(e) => setKvkkAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-emerald-700 flex-shrink-0 cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setShowKVKK(true); }}
                    className="underline font-bold text-emerald-800 hover:text-emerald-900"
                  >
                    KVKK Aydınlatma Metni
                  </button>
                  'ni okudum, kişisel verilerimin belirtilen amaçlarla işlenmesini onaylıyorum.
                </span>
              </label>

              <button
                onClick={() => kvkkAccepted && setScreen("sectorPick")}
                disabled={!kvkkAccepted}
                className="mt-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-all inline-flex items-center gap-2"
              >
                Başla <ArrowRight size={16} />
              </button>
            </div>

            <div className="bg-white/95 backdrop-blur-sm border border-emerald-200/80 rounded-xl p-6 space-y-3 shadow-lg">
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                BİLİMSEL METODOLOJİ VE KAYNAKÇA
              </div>
              <div className="text-sm font-bold text-slate-900">Bu değerlendirme neye dayanıyor?</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bu araç; GRI Standartları, BM Sürdürülebilir Kalkınma Amaçları, AB Döngüsel
                Ekonomi Eylem Planı ve sektörel uluslararası sertifikasyon standartlarından
                (ZDHC, LWG, AEEE/RoHS, Yeşil Lojistik Belgesi vb.) esinlenerek, Türkiye'nin
                güncel iklim mevzuatıyla (İklim Kanunu, TR-ETS) uyumlu şekilde Çorlu Ticaret ve
                Sanayi Odası tarafından özgün olarak geliştirilmiştir.
              </p>
              <button
                onClick={() => setShowMethodology(true)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Detaylı Metodolojiyi ve Kaynakçayı Gör
              </button>
            </div>
          </div>
        )}

        {screen === "sectorPick" && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 p-5 sm:p-8 space-y-4">
            <div className="text-center space-y-1 mb-2">
              <h2 className="text-lg font-extrabold text-slate-900">Sektörünüzü Seçin</h2>
              <p className="text-xs text-slate-500">Sorular sektörünüze göre özelleştirilecek.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {SECTORS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => selectSector(s.id)}
                  className="text-left bg-white border border-slate-200 hover:border-emerald-600 hover:shadow-md rounded-xl p-4 transition-all flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-sm font-bold text-slate-900">{s.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{totalQuestionCount(s)} soru</div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === "questions" && sector && currentCategory && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 p-5 sm:p-8 space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
                <span>{sector.label}</span>
                <span>{pageIndex + 1} / {totalPages}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                  style={{ width: `${((pageIndex + 1) / totalPages) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-lg font-extrabold text-slate-900">{currentCategory.label}</h2>

            <div className="grid gap-3">
              {currentCategory.questions.map((q) => {
                const options = ANSWER_OPTIONS[q.type] || ANSWER_OPTIONS.boolean;
                const selected = answers[q.id];
                return (
                  <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                    <p className="text-sm font-semibold text-slate-800 leading-snug">{q.text}</p>
                    {q.note && <p className="text-xs text-slate-500 italic">{q.note}</p>}
                    <div className="grid grid-cols-3 gap-2">
                      {options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setAnswer(q.id, opt.value)}
                          className={`text-xs font-semibold py-2 px-2 rounded-lg border transition-all ${
                            selected === opt.value
                              ? "bg-emerald-700 border-emerald-700 text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:border-emerald-400"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={prevPage}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg transition-all inline-flex items-center gap-1.5"
              >
                <ArrowLeft size={14} /> Geri
              </button>
              <button
                onClick={nextPage}
                disabled={!canProceed}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-lg transition-all inline-flex items-center gap-1.5"
              >
                {pageIndex < totalPages - 1 ? "Devam" : "Sonuçları Gör"} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {screen === "contact" && sector && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 p-5 sm:p-8 space-y-5">
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                <ShieldCheck size={12} /> Son Adım
              </div>
              <h2 className="text-lg font-extrabold text-slate-900">Sonucunuzu görmek için bilgilerinizi girin</h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Sürdürülebilirlik karneniz ve PDF raporunuz, aşağıdaki bilgiler kaydedildikten sonra
                görüntülenecektir. Bu bilgiler yalnızca Çorlu TSO tarafından ilerleyen süreçte
                gelişiminizi takip etmek amacıyla kullanılacaktır.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">Firma Adı *</label>
                <input
                  value={contact.companyName}
                  onChange={handleContactChange("companyName")}
                  placeholder="Örn. ABC Tekstil San. ve Tic. A.Ş."
                  className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                    contactErrors.companyName ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.companyName && <p className="text-red-600 text-[11px] mt-1">{contactErrors.companyName}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">Ad Soyad *</label>
                <input
                  value={contact.contactName}
                  onChange={handleContactChange("contactName")}
                  placeholder="Yetkili adı soyadı"
                  className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                    contactErrors.contactName ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.contactName && <p className="text-red-600 text-[11px] mt-1">{contactErrors.contactName}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5">E-posta *</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={handleContactChange("email")}
                    placeholder="ornek@firma.com"
                    className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      contactErrors.email ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                  {contactErrors.email && <p className="text-red-600 text-[11px] mt-1">{contactErrors.email}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5">Telefon *</label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={handleContactChange("phone")}
                    placeholder="05XX XXX XX XX"
                    className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      contactErrors.phone ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                  {contactErrors.phone && <p className="text-red-600 text-[11px] mt-1">{contactErrors.phone}</p>}
                </div>
              </div>

              {submitError && (
                <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{submitError}</p>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setScreen("questions")}
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg transition-all inline-flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Geri
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-all inline-flex items-center gap-1.5"
                >
                  {submitting ? "Kaydediliyor…" : "Sonucumu Görüntüle"} {!submitting && <ArrowRight size={14} />}
                </button>
              </div>
            </form>
          </div>
        )}

        {screen === "results" && sector && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 p-5 sm:p-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{sector.label}</div>
              <Gauge value={overallScore} />
              <div className="inline-block px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-extrabold text-emerald-800">
                {level.name}
              </div>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">{level.desc}</p>
              <p className="text-xs text-slate-700 font-medium max-w-md mx-auto leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                {level.recommendation}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Kategori Bazlı Genel Görünüm</h3>
              <CategoryRadar sector={sector} categoryScores={categoryScores} />
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kategori Bazlı Sonuçlar</h3>
              <CategoryBars sector={sector} categoryScores={categoryScores} answers={answers} />
            </div>

            {triggeredModules.includes("ets_skdm_module") && CONDITIONAL_MODULES.ets_skdm_module && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-2">
                <div className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                  ⚠ TR-ETS / SKDM Uyarısı
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">{CONDITIONAL_MODULES.ets_skdm_module.content}</p>
                <p className="text-[11px] text-slate-500">Kaynak: {CONDITIONAL_MODULES.ets_skdm_module.source}</p>
              </div>
            )}

            {financeNotes.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Size Özel Hibe & Teşvik Önerileri
                </h3>
                <div className="grid gap-3">
                  {financeNotes.map((fn) => (
                    <div key={fn.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-bold text-slate-900">{fn.name}</span>
                        {fn.confidence === "medium" && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 flex-shrink-0">
                            Teyit önerilir
                          </span>
                        )}
                      </div>
                      {fn.amount && <div className="text-xs font-semibold text-emerald-700">{fn.amount}</div>}
                      {fn.note && <p className="text-xs text-slate-600 leading-relaxed">{fn.note}</p>}
                      {fn.prerequisite && (
                        <p className="text-xs text-slate-500 italic">Ön şart: {fn.prerequisite}</p>
                      )}
                      {fn.criticalNote && (
                        <p className="text-xs text-red-700 bg-red-50 border border-red-100 rounded p-2 mt-1">
                          {fn.criticalNote}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tüm Sektörleri İlgilendiren Programlar</h3>
              <div className="grid gap-2">
                {CROSS_SECTOR_PROGRAMS.map((p) => (
                  <div key={p.id} className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                    <div className="text-xs font-bold text-slate-800">{p.name}</div>
                    {p.amount && <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">{p.amount}</div>}
                    {p.note && <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">{p.note}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Detaylı Hibe & Teşvik Taraması İçin</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yukarıdaki öneriler genel bir yönlendirmedir. Firmanıza özel, güncel hibe ve teşvik
                programlarını görmek için Çorlu Ticaret ve Sanayi Odası'nın <strong>Hibe Motoru</strong>{" "}
                uygulamasından faydalanabilirsiniz.
              </p>
              <a
                href={HIBE_MOTORU_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Hibe Motoru'nu Aç <ExternalLink size={13} />
              </a>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900">PDF Raporu İndirin</h4>
              <input
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder="Firma adı (opsiyonel, rapor başlığında görünür)"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                onClick={handleDownloadPdf}
                disabled={pdfState === "generating"}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-all inline-flex items-center gap-2"
              >
                <Download size={14} />
                {pdfState === "generating" ? "Oluşturuluyor…" : pdfState === "done" ? "Tekrar İndir" : "PDF İndir"}
              </button>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={restart}
                className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg transition-all flex items-center gap-2"
              >
                <RotateCcw size={14} /> Yeniden Başlat
              </button>
            </div>
          </div>
        )}
      </main>

      {screen !== "intro" && (
        <footer className="border-t border-white/10 bg-slate-950/35 backdrop-blur-md py-6 text-center text-xs flex-shrink-0 relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <p className="font-semibold text-white/90">Çorlu Ticaret ve Sanayi Odası © {new Date().getFullYear()}</p>
            <p className="mt-1 text-[11px] text-emerald-200/60">Yeşil Dönüşüm & Sürdürülebilirlik Hizmetleri</p>
          </div>
        </footer>
      )}

      {showMethodology && <MethodologyModal onClose={() => setShowMethodology(false)} />}
      {showKVKK && <KVKKModal onClose={() => setShowKVKK(false)} />}
    </div>
  );
}
