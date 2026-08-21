import React, { useState, useMemo } from "react";
// UI-FIX-GREEN-2026-08-21-NOSCROLL-V2
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

const HIBE_MOTORU_URL = "https://hibemotoru.vercel.app";
const CTSO_LOGO = "data:image/webp;base64,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";

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
    <div className="grid gap-4">
      {sector.categories.map((cat, idx) => {
        const s = categoryScores[cat.code] ?? 0;
        const c = scoreColor(s);
        const findings = findingsByCategory[idx]?.findings || [];
        return (
          <article
            key={cat.code}
            className="rounded-[22px] border border-[#DDE9E2] bg-white p-5 sm:p-6 shadow-[0_12px_34px_rgba(4,46,35,.06)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#789187]">Dönüşüm Alanı</div>
                <h4 className="mt-1 text-[15px] sm:text-base font-extrabold text-[#10251E]">{cat.label}</h4>
              </div>
              <span className={`text-xs font-extrabold px-3 py-1.5 rounded-full border ${c.badge}`}>
                {s} / 100
              </span>
            </div>

            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-[#EDF3EF]">
              <div className={`h-full ${c.bar} rounded-full transition-all duration-500`} style={{ width: `${s}%` }} />
            </div>

            {findings.length > 0 ? (
              <div className="mt-5 space-y-3">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#789187]">Öncelikli aksiyonlar</div>
                {findings.map((q) => (
                  <div key={q.id} className="rounded-2xl border border-[#E2ECE6] bg-[#F7FAF8] p-4">
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 flex-shrink-0 rounded-full px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide ${
                          q.answerValue === 0 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {q.answerValue === 0 ? "Eksik" : "Geliştirilmeli"}
                      </span>
                      <span className="text-xs font-bold leading-relaxed text-[#31483F]">{q.text}</span>
                    </div>
                    <p className="mt-2.5 border-l-2 border-[#52A879] pl-3 text-xs leading-relaxed text-[#17633F]">
                      {q.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-[#CFE6D8] bg-[#F0F8F3] p-4 text-xs font-bold leading-relaxed text-[#17633F]">
                Bu kategoride öncelikli bir eksik görünmüyor. Mevcut uygulamalarınızı koruyup performansı düzenli izleyin.
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function Gauge({ value }) {
  const size = 240;
  const cx = size / 2;
  const cy = size / 2 + 14;
  const r = 94;
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
  const [nx, ny] = polar(needleAngle, r - 18);

  return (
    <svg viewBox={`0 0 ${size} ${size * 0.64}`} width="100%" style={{ maxWidth: 280, display: "block", margin: "0 auto" }}>
      <defs>
        <linearGradient id="greenGauge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9DCB58" />
          <stop offset="55%" stopColor="#2C9B69" />
          <stop offset="100%" stopColor="#087257" />
        </linearGradient>
      </defs>
      <path d={arcPath(startAngle, endAngle, r)} fill="none" stroke="#E4ECE7" strokeWidth="14" strokeLinecap="round" />
      <path d={arcPath(startAngle, needleAngle, r)} fill="none" stroke="url(#greenGauge)" strokeWidth="14" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#12362B" strokeWidth="4" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="7" fill="#12362B" />
      <text x={cx} y={cy - 36} textAnchor="middle" fontSize="38" fontWeight="800" fill="#10251E">{value}</text>
      <text x={cx} y={cy - 14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#769087">/ 100</text>
    </svg>
  );
}

/* ---------------------------------------------------------------
   KATEGORİ RADARI (sektöre göre değişken eksen sayısı, 0-100)
--------------------------------------------------------------- */
function CategoryRadar({ sector, categoryScores }) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 102;
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
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: 330, display: "block", margin: "0 auto" }}>
      {rings.map((ring) => {
        const pts = categories.map((_, i) => pointAt(i, (ring / 100) * maxR).join(",")).join(" ");
        return <polygon key={ring} points={pts} fill="none" stroke={ring === 100 ? "#BFD2C6" : "#DDE8E1"} strokeWidth={ring === 100 ? 1.5 : 1} />;
      })}
      {categories.map((cat, i) => {
        const [x, y] = pointAt(i, maxR);
        return <line key={cat.code} x1={cx} y1={cy} x2={x} y2={y} stroke="#D5E2DA" strokeWidth="1" />;
      })}
      <polygon points={dataPath} fill="rgba(33, 139, 92, 0.16)" stroke="#147452" strokeWidth="3" />
      {dataPoints.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="5" fill="#147452" stroke="#FFFFFF" strokeWidth="2.5" />)}
      {categories.map((cat, i) => {
        const [x, y] = pointAt(i, maxR + 31);
        return <text key={cat.code} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="9.5" fill="#365348" fontWeight="800">{cat.label.toUpperCase()}</text>;
      })}
    </svg>
  );
}

/* ---------------------------------------------------------------
   METODOLOJİ MODALI
--------------------------------------------------------------- */
function MethodologyModal({ onClose }) {
  const [tab, setTab] = useState(0);

  const tabs = [
    {
      label: "Çerçeve",
      title: "Uluslararası yaklaşım",
      body: (
        <>
          <p>
            Bu karne; çevresel-sosyal-yönetişim (ESG) raporlamasında uluslararası kabul gören{" "}
            <strong>GRI (Global Reporting Initiative) Standartları</strong>'nın kategori yapısından,
            BM <strong>Sürdürülebilir Kalkınma Amaçları</strong>'ndan (özellikle SKA 6 — Temiz Su,
            SKA 7 — Erişilebilir Enerji, SKA 8 — İnsana Yakışır İş, SKA 12 — Sorumlu Üretim-Tüketim,
            SKA 13 — İklim Eylemi) ve <strong>AB Döngüsel Ekonomi Eylem Planı</strong>'ndan esinlenerek
            Çorlu Ticaret ve Sanayi Odası tarafından özgün olarak geliştirilmiştir.
          </p>
          <div className="mt-4 rounded-2xl border border-[#DDE9E2] bg-[#F6FAF7] p-4">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#598071]">Kategori Çerçevesi</div>
            <p className="mt-2 text-xs leading-5 text-[#526B62]">
              Her sektör dört ortak eksende değerlendirilir: <strong>Enerji Yönetimi</strong>,{" "}
              <strong>Su & Kimyasal Yönetimi</strong>, <strong>Döngüsel Ekonomi</strong> ve{" "}
              <strong>Sosyal & Yönetişim (ESG)</strong>. Bu yapı GRI 300 (Çevresel) ve GRI 400
              (Sosyal) serileriyle ve yaygın E-S-G raporlama pratiğiyle uyumludur.
            </p>
          </div>
        </>
      ),
    },
    {
      label: "Sektörel",
      title: "Sektörel içerik kaynakları",
      body: (
        <>
          <p>
            Soru içerikleri, her sektörde fiilen kullanılan tanınmış sertifikasyon ve uyum
            standartlarına dayanır.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 text-[11px] font-bold text-[#435E54] sm:grid-cols-3">
            {[
              ["ZDHC", "Tekstil / boyahane"],
              ["LWG", "Deri ve deri ürünleri"],
              ["AEEE & RoHS", "Elektrik-elektronik"],
              ["Yeşil Lojistik", "Lojistik"],
              ["OCS / PAGEV", "Plastik"],
              ["Enerji Kimlik Belgesi", "Hizmet & bina"],
            ].map(([name, scope]) => (
              <div key={name} className="rounded-2xl border border-[#DDE9E2] bg-[#F7FAF8] p-3">
                <div className="text-[#176947]">{name}</div>
                <div className="mt-1 text-[9px] font-semibold text-[#80938B]">{scope}</div>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      label: "Mevzuat",
      title: "Ulusal mevzuat uyumu",
      body: (
        <>
          <p>
            Sorular ve uyarı modülleri; 7552 sayılı <strong>İklim Kanunu</strong> (9 Temmuz 2025),{" "}
            <strong>Türkiye Emisyon Ticaret Sistemi (TR-ETS)</strong> pilot uygulaması ve AB{" "}
            <strong>Sınırda Karbon Düzenleme Mekanizması (SKDM/CBAM)</strong> ile uyumlu olacak
            şekilde güncellenmiştir (kaynak taraması: Ağustos 2026).
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["İklim Kanunu", "Ulusal iklim yönetişimi"],
              ["TR-ETS", "Emisyon ticaretine hazırlık"],
              ["SKDM / CBAM", "AB sınırda karbon uyumu"],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl bg-[#0A4937] p-3 text-white">
                <div className="text-[11px] font-extrabold">{title}</div>
                <div className="mt-1 text-[9px] leading-4 text-white/60">{desc}</div>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      label: "Skor",
      title: "Skor hesaplama yaklaşımı",
      body: (
        <>
          <p>
            Her soru 3 kademeli bir ölçekte (Hayır / Kısmen / Evet → 0 / 1 / 2) yanıtlanır.
            Kategori skoru, o kategorideki soruların ortalamasının 100 üzerinden ifadesidir;
            genel skor, dört kategori skorunun ortalamasıdır. Bu, gelişmiş olgunluk
            modellerinde (örn. acatech Endüstri 4.0 Olgunluk Endeksi) kullanılan basit
            ortalama yaklaşımının sadeleştirilmiş bir uyarlamasıdır.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["0", "Hayır"],
              ["1", "Kısmen"],
              ["2", "Evet"],
            ].map(([value, label]) => (
              <div key={value} className="rounded-2xl border border-[#DDE9E2] bg-[#F7FAF8] p-3 text-center">
                <div className="text-xl font-extrabold text-[#176947]">{value}</div>
                <div className="mt-0.5 text-[9px] font-extrabold uppercase tracking-wide text-[#748A81]">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3">
            <p className="text-[10px] leading-5 text-amber-900">
              <strong>Sınırlılık notu:</strong> Bu araç bir öz-değerlendirme ve yönlendirme aracıdır;
              resmi denetim, sertifikasyon veya danışmanlık hizmetinin yerine geçmez. Hibe/teşvik
              tutarları ve mevzuat hükümleri zamanla değişebilir.
            </p>
          </div>
        </>
      ),
    },
  ];

  const active = tabs[tab];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#031D17]/82 p-2.5 backdrop-blur-md sm:p-4"
      onClick={onClose}
    >
      <div
        className="flex h-[min(610px,calc(100dvh-20px))] w-full max-w-4xl flex-col overflow-hidden rounded-[26px] border border-white/70 bg-[#FBFDFB] shadow-[0_30px_100px_rgba(1,31,23,.28)] sm:h-[min(620px,calc(100dvh-32px))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-[#DFE9E3] px-4 py-3 sm:px-6">
          <div>
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#5A7B6D]">Bilimsel altyapı</div>
            <h3 className="mt-0.5 text-base font-extrabold tracking-tight text-[#10251E] sm:text-lg">Metodoloji ve Kaynakça</h3>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCE7E1] bg-white text-[#6D8279] transition hover:bg-[#F3F7F4]">
            <X size={18} />
          </button>
        </div>

        <div className="grid flex-shrink-0 grid-cols-4 gap-1.5 border-b border-[#E4ECE7] bg-[#F7FAF8] p-2 sm:px-4">
          {tabs.map((item, idx) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setTab(idx)}
              className={`rounded-xl px-2 py-2 text-[9px] font-extrabold transition sm:text-[10px] ${
                idx === tab ? "bg-[#0B684C] text-white shadow-[0_7px_16px_rgba(11,104,76,.14)]" : "text-[#60786F] hover:bg-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 gap-3 p-4 sm:grid-cols-[0.34fr_0.66fr] sm:p-5">
          <div className="hidden min-h-0 rounded-[22px] bg-[#073A2D] p-5 text-white sm:block">
            <Leaf size={28} className="text-[#CDE764]" />
            <div className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#BBD9A7]">Aktif başlık</div>
            <div className="mt-2 text-xl font-extrabold leading-tight">{active.title}</div>
            <p className="mt-3 text-[10px] leading-5 text-white/60">
              İçerik tek ekran içinde sekmelere ayrılmıştır; sayfa veya modal kaydırması gerekmez.
            </p>
          </div>

          <div className="min-h-0 overflow-hidden rounded-[22px] border border-[#DDE9E2] bg-white p-4 text-[11px] leading-5 text-[#4E675D] sm:p-5 sm:text-xs sm:leading-6">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#176947] sm:hidden">{active.title}</div>
            <div className="sm:mt-0 mt-2">{active.body}</div>
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
  const [tab, setTab] = useState(0);

  const tabs = [
    {
      label: "Veri & Amaç",
      title: "Veri sorumlusu, işlenen veriler ve amaç",
      body: (
        <>
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#176947]">Veri Sorumlusu</div>
            <p className="mt-1.5">
              Bu değerlendirme, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında
              Çorlu Ticaret ve Sanayi Odası ("Oda") tarafından veri sorumlusu sıfatıyla yürütülmektedir.
            </p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#DDE9E2] bg-[#F7FAF8] p-3.5">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#176947]">İşlenen Veriler</div>
              <p className="mt-1.5 text-[10px] leading-5">
                Firma unvanı, yetkili adı-soyadı, e-posta, telefon, anket yanıtları ve hesaplanan
                sürdürülebilirlik skorları işlenir.
              </p>
            </div>
            <div className="rounded-2xl border border-[#DDE9E2] bg-[#F7FAF8] p-3.5">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#176947]">İşleme Amacı</div>
              <p className="mt-1.5 text-[10px] leading-5">
                Yeşil dönüşüm olgunluğunun ölçülmesi, sonuç raporunun sunulması ve ilerleyen dönemde
                gelişim sürecinin takip edilmesi amaçlanır.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      label: "Hukuki Çerçeve",
      title: "Hukuki sebep ve güvenlik",
      body: (
        <>
          <div className="rounded-2xl border border-[#DDE9E2] bg-[#F7FAF8] p-4">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#176947]">Hukuki Sebep</div>
            <p className="mt-2">
              KVKK md. 5/1 uyarınca açık rızanıza dayanılarak; Oda'nın üyelerine yönelik yeşil dönüşüm
              ve sürdürülebilirlik kapasitesini geliştirme faaliyetlerinin yürütülmesi meşru amacıyla
              işlenir.
            </p>
          </div>
          <div className="mt-3 rounded-2xl bg-[#073A2D] p-4 text-white">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#CDE764]">Saklama ve Güvenlik</div>
            <p className="mt-2 text-[10px] leading-5 text-white/70 sm:text-[11px]">
              Veriler yalnızca Oda yetkilileri tarafından erişilebilen güvenli bir veritabanında saklanır;
              amaç için gerekli süre boyunca tutulur, üçüncü taraflarla paylaşılmaz ve ticari amaçla kullanılmaz.
            </p>
          </div>
        </>
      ),
    },
    {
      label: "Haklar",
      title: "Haklarınız ve sınırlılık notu",
      body: (
        <>
          <div className="rounded-2xl border border-[#DDE9E2] bg-[#F7FAF8] p-4">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#176947]">Haklarınız</div>
            <p className="mt-2">
              KVKK md. 11 uyarınca verilerinize erişme, düzeltilmesini/silinmesini talep etme ve
              rızanızı geri alma dahil haklarınızı kullanmak için Oda'ya yazılı olarak başvurabilirsiniz.
            </p>
          </div>
          <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3.5">
            <p className="text-[10px] leading-5 text-amber-900">
              Bu metin genel bir taslaktır; yayına almadan önce Oda'nın hukuk/uyum birimince gözden
              geçirilmesi önerilir.
            </p>
          </div>
        </>
      ),
    },
  ];

  const active = tabs[tab];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#031D17]/82 p-2.5 backdrop-blur-md sm:p-4"
      onClick={onClose}
    >
      <div
        className="flex h-[min(560px,calc(100dvh-20px))] w-full max-w-3xl flex-col overflow-hidden rounded-[26px] border border-white/70 bg-[#FBFDFB] shadow-[0_30px_100px_rgba(1,31,23,.28)] sm:h-[min(570px,calc(100dvh-32px))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-[#DFE9E3] px-4 py-3 sm:px-6">
          <div>
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#5A7B6D]">Kişisel verilerin korunması</div>
            <h3 className="mt-0.5 text-base font-extrabold tracking-tight text-[#10251E] sm:text-lg">KVKK Aydınlatma Metni</h3>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCE7E1] bg-white text-[#6D8279] transition hover:bg-[#F3F7F4]">
            <X size={18} />
          </button>
        </div>

        <div className="grid flex-shrink-0 grid-cols-3 gap-1.5 border-b border-[#E4ECE7] bg-[#F7FAF8] p-2 sm:px-4">
          {tabs.map((item, idx) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setTab(idx)}
              className={`rounded-xl px-2 py-2 text-[9px] font-extrabold transition sm:text-[10px] ${
                idx === tab ? "bg-[#0B684C] text-white shadow-[0_7px_16px_rgba(11,104,76,.14)]" : "text-[#60786F] hover:bg-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 gap-3 p-4 sm:grid-cols-[0.32fr_0.68fr] sm:p-5">
          <div className="hidden min-h-0 rounded-[22px] bg-[#073A2D] p-5 text-white sm:block">
            <ShieldCheck size={26} className="text-[#CDE764]" />
            <div className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#BBD9A7]">KVKK</div>
            <div className="mt-2 text-lg font-extrabold leading-tight">{active.title}</div>
          </div>

          <div className="min-h-0 overflow-hidden rounded-[22px] border border-[#DDE9E2] bg-white p-4 text-[11px] leading-5 text-[#4E675D] sm:p-5 sm:text-xs sm:leading-6">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#176947] sm:hidden">{active.title}</div>
            <div className="mt-2 sm:mt-0">{active.body}</div>
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
  const [resultsView, setResultsView] = useState("overview");

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
    setResultsView("overview");
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
    setResultsView("overview");
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
    <div className="h-[100dvh] overflow-hidden bg-[#F3F7F3] text-[#10251E]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap');
        html, body, #root { width: 100%; height: 100%; overflow: hidden; }
        html { scroll-behavior: auto; }
        body { margin: 0; background: #F3F7F3; }
        @media (max-height: 820px) {
          .vh-hide { display: none !important; }
          .vh-tight { padding-top: .8rem !important; padding-bottom: .8rem !important; }
          .vh-title { font-size: clamp(2rem, 4vw, 3.2rem) !important; }
          .vh-feature-copy { display: none !important; }
        }
        @media (max-height: 700px) {
          .vh-tight { padding-top: .55rem !important; padding-bottom: .55rem !important; }
          .vh-title { font-size: clamp(1.7rem, 3.5vw, 2.75rem) !important; }
          .vh-compact-text { font-size: 10px !important; line-height: 1rem !important; }
          .vh-compact-pad { padding: .65rem !important; }
        }
        @media (max-width: 520px) {
          .mobile-hide { display: none !important; }
          .mobile-tight { padding: .6rem !important; }
        }
        * { box-sizing: border-box; }
        html, body { overscroll-behavior: none; }
        .green-grid {
          background-image:
            linear-gradient(rgba(26,92,70,.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,92,70,.045) 1px, transparent 1px);
          background-size: 34px 34px;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-28 top-20 h-96 w-96 rounded-full bg-[#CDE6A7]/35 blur-3xl" />
        <div className="absolute right-[-110px] top-[28%] h-[420px] w-[420px] rounded-full bg-[#B9E0D1]/35 blur-3xl" />
        <div className="absolute bottom-[-170px] left-[32%] h-[460px] w-[460px] rounded-full bg-[#DDEBC5]/35 blur-3xl" />
        <div className="green-grid absolute inset-0 opacity-55" />
      </div>

      {/* HEADER — Verimlilik uygulamasındaki kurumsal mimari, yeşil dönüşüm paleti */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#062E26]/95 shadow-[0_10px_30px_rgba(3,36,29,.12)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_7px_20px_rgba(0,0,0,.18)] ring-1 ring-white/30">
              <img src={CTSO_LOGO} alt="Çorlu Ticaret ve Sanayi Odası" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-extrabold tracking-[-0.01em] text-white sm:text-[15px]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Çorlu Ticaret ve Sanayi Odası
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#BBD9A7] sm:text-[11px]">
                <span>Üye Dönüşüm Portalı</span>
                <span className="hidden h-1 w-1 rounded-full bg-[#CDE764] sm:block" />
                <span className="hidden text-white/70 sm:inline">Yeşil Dönüşüm Karnesi</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {screen !== "intro" && (
              <div className="hidden rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-right lg:block">
                <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/50">Aktif adım</div>
                <div className="text-xs font-bold text-white">
                  {screen === "sectorPick" ? "Sektör Seçimi" : screen === "questions" ? currentCategory?.label : screen === "contact" ? "İletişim Bilgileri" : "Sonuç Karnesi"}
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowMethodology(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#A9CF90]/30 bg-white/[0.07] px-3.5 py-2.5 text-[11px] font-bold text-white transition hover:bg-white/[0.12] sm:px-4"
            >
              <Leaf size={14} className="text-[#CDE764]" />
              <span className="hidden sm:inline">Bilimsel Metodoloji</span>
              <span className="sm:hidden">Metodoloji</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto h-[calc(100dvh-64px)] w-full max-w-[1600px] overflow-hidden px-2.5 py-2.5 sm:px-4 sm:py-3 lg:px-6">
        {/* ---------------- INTRO ---------------- */}
        {screen === "intro" && (
          <section className="grid h-full min-h-0 grid-cols-1 gap-3 xl:grid-cols-12 xl:gap-4">
            <div className="relative overflow-hidden rounded-[30px] bg-[#073A2D] shadow-[0_24px_80px_rgba(4,49,38,.18)] xl:col-span-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(196,231,100,.23),transparent_28%),radial-gradient(circle_at_64%_80%,rgba(58,159,116,.28),transparent_35%),linear-gradient(135deg,#073A2D_0%,#0A4937_48%,#0A2E27_100%)]" />
              <div className="absolute -right-10 top-4 opacity-[0.08]">
                <Leaf size={390} strokeWidth={1} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/20 to-transparent" />

              <div className="relative flex h-full min-h-0 flex-col justify-between p-5 sm:p-6 lg:p-7 xl:p-8 vh-tight">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#CDE764]/35 bg-[#CDE764]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#DDF28D]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#DDF28D]" />
                    İklim · Döngüsellik · ESG · Rekabet
                  </div>

                  <h1
                    className="vh-title mt-4 max-w-[850px] text-[34px] font-extrabold leading-[0.98] tracking-[-0.055em] text-white sm:text-[42px] lg:text-[48px] xl:text-[54px]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    Yeşil dönüşümünüzü ölçün. Riskleri azaltın. Rekabet gücünüzü büyütün.
                  </h1>

                  <p className="mt-3 max-w-[760px] text-[12px] font-medium leading-5 text-white/80 sm:text-[13px] lg:text-[14px]">
                    Sektörünüze özel değerlendirmeyle enerji, su ve kimyasal yönetimi, döngüsel ekonomi ile sosyal-yönetişim performansınızı görün; mevzuat, hibe ve somut aksiyon önerilerinizi tek karnede alın.
                  </p>

                  <div className="intro-features mt-4 grid max-w-[860px] grid-cols-3 gap-2.5">
                    {[
                      ["01", "Sektöre Özel", "Sorular sektörünüze göre şekillenir."],
                      ["02", "Veriye Dayalı", "Dört dönüşüm ekseni 100 puan üzerinden ölçülür."],
                      ["03", "Aksiyona Dönük", "Eksikler, teşvikler ve öncelikler birlikte sunulur."],
                    ].map(([n, title, text]) => (
                      <div key={n} className="rounded-2xl border border-white/15 bg-white/[0.08] p-3 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#CDE764] text-xs font-extrabold text-[#173A2E]">{n}</div>
                          <div>
                            <div className="text-xs font-extrabold text-white">{title}</div>
                            <div className="vh-feature-copy mt-0.5 text-[10px] leading-4 text-white/60">{text}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 max-w-[900px]">
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/12 bg-black/15 p-3 backdrop-blur-sm">
                    <input
                      type="checkbox"
                      checked={kvkkAccepted}
                      onChange={(e) => setKvkkAccepted(e.target.checked)}
                      className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer accent-[#B9D94C]"
                    />
                    <span className="text-[11px] leading-relaxed text-white/75 sm:text-xs">
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); setShowKVKK(true); }}
                        className="font-extrabold text-white underline decoration-[#CDE764]/70 underline-offset-2 hover:text-[#DDF28D]"
                      >
                        KVKK Aydınlatma Metni
                      </button>{" "}
                      'ni okudum, kişisel verilerimin belirtilen amaçlarla işlenmesini onaylıyorum.
                    </span>
                  </label>

                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => kvkkAccepted && setScreen("sectorPick")}
                      disabled={!kvkkAccepted}
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#C6E45C] px-6 py-3.5 text-sm font-extrabold text-[#11382C] shadow-[0_14px_30px_rgba(174,207,72,.18)] transition hover:bg-[#D6EE7B] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35 disabled:shadow-none sm:flex-none sm:min-w-[270px]"
                    >
                      Değerlendirmeye Başla <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowMethodology(true)}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-white/16 bg-white/[0.08] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.13]"
                    >
                      Nasıl Çalışır?
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <aside className="hidden flex-col rounded-[30px] border border-[#D9E7DE] bg-white/90 p-5 shadow-[0_24px_70px_rgba(4,49,38,.08)] backdrop-blur-xl sm:p-5 xl:col-span-4 xl:flex">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#6D897E]">Dönüşüm Çerçevesi</div>
                  <h2 className="mt-2 text-xl font-extrabold tracking-[-0.035em] text-[#10251E]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    İşletmenizin yeşil dönüşüm fotoğrafı
                  </h2>
                </div>
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#E9F4DF]">
                  <Leaf size={21} className="text-[#1A7855]" />
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                {[
                  ["Enerji Yönetimi", "Tüketim, verimlilik ve emisyon hazırlığı"],
                  ["Su & Kimyasal", "Kaynak kullanımı, deşarj ve risk yönetimi"],
                  ["Döngüsel Ekonomi", "Atık, geri kazanım ve kaynak döngüsü"],
                  ["Sosyal & Yönetişim", "ESG, çalışan ve yönetişim uygulamaları"],
                ].map(([title, text], i) => (
                  <div key={title} className="group flex items-center gap-3 rounded-2xl border border-[#E0EAE4] bg-[#F8FBF9] p-2.5 transition hover:border-[#B9D3C2] hover:bg-white">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#0E5A43] text-[11px] font-extrabold text-white">0{i + 1}</div>
                    <div>
                      <div className="text-xs font-extrabold text-[#17352A]">{title}</div>
                      <div className="mt-0.5 text-[10px] leading-4 text-[#71877F]">{text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto grid grid-cols-3 gap-2 pt-3">
                <div className="rounded-2xl bg-[#073A2D] p-3 text-center text-white">
                  <div className="text-xl font-extrabold">20</div>
                  <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-white/55">Soru</div>
                </div>
                <div className="rounded-2xl bg-[#EAF4E3] p-3 text-center text-[#174632]">
                  <div className="text-xl font-extrabold">100</div>
                  <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-[#5C776C]">Puan</div>
                </div>
                <div className="rounded-2xl bg-[#EDF1C9] p-3 text-center text-[#384510]">
                  <div className="text-xl font-extrabold">8–10</div>
                  <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-[#66702E]">Dakika</div>
                </div>
              </div>

              <div className="vh-hide mt-2 rounded-2xl border border-[#DDE9E2] bg-white p-3">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={17} className="mt-0.5 flex-shrink-0 text-[#27815D]" />
                  <p className="text-[10px] font-medium leading-5 text-[#627970]">
                    Sonuç ekranında skorunuz, kategori görünümünüz, somut aksiyonlarınız ve uygun hibe-teşvik yönlendirmeleriniz birlikte sunulur.
                  </p>
                </div>
              </div>
            </aside>
          </section>
        )}

        {/* ---------------- SECTOR PICK ---------------- */}
        {screen === "sectorPick" && (
          <section className="h-full min-h-0 overflow-hidden rounded-[26px] border border-[#DCE8E1] bg-white/90 p-4 shadow-[0_24px_70px_rgba(4,49,38,.08)] backdrop-blur-xl sm:p-5 lg:p-6">
            <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[0.68fr_2fr] lg:gap-5">
              <div className="hidden h-full rounded-[24px] bg-[#073A2D] p-5 text-white lg:block">
                <div className="inline-flex rounded-full border border-[#CDE764]/30 bg-[#CDE764]/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#DDF28D]">1. Adım</div>
                <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-[-0.04em]" style={{ fontFamily: "'Manrope', sans-serif" }}>Sektörünüzü seçin.</h2>
                <p className="mt-3 text-xs leading-5 text-white/68">Değerlendirme soruları sektörünüzdeki çevresel riskler, sertifikasyon çerçeveleri ve dönüşüm önceliklerine göre özelleştirilir.</p>
                <div className="mt-5 space-y-2">
                  {["Sektörel soru seti", "Karşılaştırılabilir 100 puanlık skor", "Hibe ve mevzuat yönlendirmesi"].map((t) => (
                    <div key={t} className="flex items-center gap-3 text-xs font-bold text-white/80"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#CDE764] text-[#15382D]">✓</span>{t}</div>
                  ))}
                </div>
              </div>

              <div className="min-h-0">
                <div className="mb-3 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#789187]">Sektörel değerlendirme</div>
                    <h3 className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-[#10251E]">Firmanıza en uygun alanı seçin</h3>
                  </div>
                  <button onClick={() => setScreen("intro")} className="hidden text-xs font-bold text-[#537168] hover:text-[#123C2F] sm:inline">← Girişe dön</button>
                </div>
                <div className="grid h-[calc(100%-54px)] auto-rows-fr grid-cols-2 gap-2 sm:gap-2.5 xl:grid-cols-3">
                  {SECTORS.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => selectSector(s.id)}
                      className="group min-h-0 rounded-[18px] border border-[#DCE8E1] bg-[#FAFCFA] p-2.5 sm:p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-[#91B9A2] hover:bg-white hover:shadow-[0_16px_36px_rgba(4,49,38,.09)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E9F4DF] text-[11px] font-extrabold text-[#237451]">{String(idx + 1).padStart(2, "0")}</div>
                        <ChevronRight size={18} className="text-[#9DB2A9] transition group-hover:translate-x-0.5 group-hover:text-[#237451]" />
                      </div>
                      <div className="mt-2 text-[12px] font-extrabold leading-snug text-[#17352A]">{s.label}</div>
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#80948C]">{totalQuestionCount(s)} soru</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ---------------- QUESTIONS ---------------- */}
        {screen === "questions" && sector && currentCategory && (
          <section className="h-full min-h-0 overflow-hidden rounded-[26px] border border-[#DCE8E1] bg-white/92 p-3 shadow-[0_24px_70px_rgba(4,49,38,.08)] backdrop-blur-xl sm:p-4 lg:p-4">
            <div className="grid h-full min-h-0 gap-3 xl:grid-cols-[230px_1fr]">
              <aside className="hidden h-full rounded-[22px] bg-[#073A2D] p-4 text-white xl:block">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#BBD9A7]">Seçili Sektör</div>
                <div className="mt-1.5 text-sm font-extrabold leading-snug">{sector.label}</div>
                <div className="mt-5 h-px bg-white/10" />
                <div className="mt-5 space-y-2">
                  {sector.categories.map((cat, idx) => {
                    const active = idx === pageIndex;
                    const completed = idx < pageIndex;
                    return (
                      <div key={cat.code} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${active ? "bg-white/12" : "bg-transparent"}`}>
                        <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold ${active ? "bg-[#CDE764] text-[#15382D]" : completed ? "bg-[#2E785B] text-white" : "bg-white/8 text-white/50"}`}>
                          {completed ? "✓" : idx + 1}
                        </div>
                        <span className={`text-[11px] font-bold leading-snug ${active ? "text-white" : "text-white/55"}`}>{cat.label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="flex items-center justify-between text-[10px] font-bold text-white/55"><span>Sayfa ilerlemesi</span><span>{answeredInPage}/{currentCategory.questions.length}</span></div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#CDE764] transition-all" style={{ width: `${currentCategory.questions.length ? (answeredInPage / currentCategory.questions.length) * 100 : 0}%` }} /></div>
                </div>
              </aside>

              <div className="flex min-h-0 flex-col">
                <div className="flex-shrink-0 rounded-[18px] border border-[#DDE9E2] bg-[#F7FAF8] p-3 sm:p-4">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#789187]">{pageIndex + 1}. kategori · {pageIndex + 1}/{totalPages}</div>
                      <h2 className="mt-1 text-xl font-extrabold tracking-[-0.035em] text-[#10251E]" style={{ fontFamily: "'Manrope', sans-serif" }}>{currentCategory.label}</h2>
                    </div>
                    <div className="text-xs font-bold text-[#5F786E]">Tüm soruları yanıtlayınca devam edebilirsiniz.</div>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#DFE9E3]"><div className="h-full rounded-full bg-gradient-to-r from-[#95C958] to-[#117354] transition-all duration-300" style={{ width: `${((pageIndex + 1) / totalPages) * 100}%` }} /></div>
                </div>

                <div className="mt-3 grid min-h-0 flex-1 auto-rows-fr grid-cols-2 gap-2.5 xl:grid-cols-3">
                  {currentCategory.questions.map((q, qIndex) => {
                    const options = ANSWER_OPTIONS[q.type] || ANSWER_OPTIONS.boolean;
                    const selected = answers[q.id];
                    return (
                      <article key={q.id} className="min-h-0 rounded-[18px] border border-[#DDE9E2] bg-white p-3 shadow-[0_8px_20px_rgba(4,49,38,.04)] sm:p-3.5">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#EAF4E3] text-[10px] font-extrabold text-[#277452]">{String(qIndex + 1).padStart(2, "0")}</div>
                          <div>
                            <p className="text-[11px] font-extrabold leading-[1.35] text-[#253B33] sm:text-[12px]">{q.text}</p>
                            {q.note && <p className="mt-1.5 text-[10px] italic leading-4 text-[#7C9088]">{q.note}</p>}
                          </div>
                        </div>
                        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                          {options.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setAnswer(q.id, opt.value)}
                              className={`min-h-[34px] rounded-lg border px-1.5 py-1.5 text-[9px] font-extrabold transition-all sm:text-[11px] ${selected === opt.value ? "border-[#0E6E50] bg-[#0E6E50] text-white shadow-[0_8px_18px_rgba(14,110,80,.15)]" : "border-[#D8E4DD] bg-[#FAFCFA] text-[#5E756C] hover:border-[#94BCA5] hover:bg-white"}`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-3 flex flex-shrink-0 items-center justify-between rounded-[18px] border border-[#DDE9E2] bg-white p-2.5">
                  <button onClick={prevPage} className="inline-flex items-center gap-2 rounded-xl border border-[#D7E2DC] bg-white px-4 py-2.5 text-xs font-extrabold text-[#49645A] transition hover:bg-[#F6F9F7]"><ArrowLeft size={14} /> Geri</button>
                  <button onClick={nextPage} disabled={!canProceed} className="inline-flex items-center gap-2 rounded-xl bg-[#0B684C] px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#08583F] disabled:cursor-not-allowed disabled:bg-[#CFDAD4] disabled:text-[#84968E]">
                    {pageIndex < totalPages - 1 ? "Sonraki Kategori" : "Değerlendirmeyi Tamamla"} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ---------------- CONTACT ---------------- */}
        {screen === "contact" && sector && (
          <section className="grid h-full min-h-0 overflow-hidden rounded-[26px] border border-[#DCE8E1] bg-white/94 shadow-[0_24px_70px_rgba(4,49,38,.08)] backdrop-blur-xl lg:grid-cols-[0.72fr_1.28fr]">
            <div className="relative hidden bg-[#073A2D] p-6 text-white lg:block">
              <div className="absolute -bottom-16 -right-12 opacity-[0.07]"><Leaf size={330} /></div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#CDE764]/30 bg-[#CDE764]/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#DDF28D]"><ShieldCheck size={12} /> Son Adım</div>
                <h2 className="mt-4 max-w-md text-2xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl" style={{ fontFamily: "'Manrope', sans-serif" }}>Karneniz hazır. Sonucunuzu güvenli biçimde kaydedelim.</h2>
                <p className="vh-compact-text mt-3 max-w-md text-xs leading-5 text-white/65">İletişim bilgileriniz, sonuç karnenizin oluşturulması ve Çorlu TSO'nun gelişim sürecinizi takip edebilmesi amacıyla kullanılır.</p>
                <div className="mt-5 space-y-2">
                  {["Yanıtlarınız 100 puan üzerinden skorlanır", "Sonuç karnesi ve PDF raporu oluşturulur", "Hibe / teşvik ve aksiyon önerileri eşleştirilir"].map((t) => <div key={t} className="flex items-center gap-3 text-xs font-bold text-white/75"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#CDE764] text-[#15382D]">✓</span>{t}</div>)}
                </div>
              </div>
            </div>

            <div className="flex h-full items-center p-4 sm:p-6 lg:p-7">
              <form onSubmit={handleContactSubmit} className="mx-auto w-full max-w-2xl">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#789187]">İletişim Bilgileri</div>
                <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-[#10251E]" style={{ fontFamily: "'Manrope', sans-serif" }}>Sonucunuzu görüntüleyin</h3>
                <p className="mt-2 text-xs leading-5 text-[#71877F]">Lütfen firma ve yetkili bilgilerini eksiksiz girin.</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wide text-[#61786F]">Firma Adı *</label>
                    <input value={contact.companyName} onChange={handleContactChange("companyName")} placeholder="Örn. ABC Tekstil San. ve Tic. A.Ş." className={`w-full rounded-xl border bg-[#FAFCFA] px-3.5 py-2.5 text-xs outline-none transition focus:border-[#5E9D7E] focus:ring-4 focus:ring-[#4F9A79]/10 ${contactErrors.companyName ? "border-red-400" : "border-[#D7E3DC]"}`} />
                    {contactErrors.companyName && <p className="mt-1 text-[10px] font-bold text-red-600">{contactErrors.companyName}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wide text-[#61786F]">Ad Soyad *</label>
                    <input value={contact.contactName} onChange={handleContactChange("contactName")} placeholder="Yetkili adı soyadı" className={`w-full rounded-xl border bg-[#FAFCFA] px-3.5 py-2.5 text-xs outline-none transition focus:border-[#5E9D7E] focus:ring-4 focus:ring-[#4F9A79]/10 ${contactErrors.contactName ? "border-red-400" : "border-[#D7E3DC]"}`} />
                    {contactErrors.contactName && <p className="mt-1 text-[10px] font-bold text-red-600">{contactErrors.contactName}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wide text-[#61786F]">E-posta *</label>
                    <input type="email" value={contact.email} onChange={handleContactChange("email")} placeholder="ornek@firma.com" className={`w-full rounded-xl border bg-[#FAFCFA] px-3.5 py-2.5 text-xs outline-none transition focus:border-[#5E9D7E] focus:ring-4 focus:ring-[#4F9A79]/10 ${contactErrors.email ? "border-red-400" : "border-[#D7E3DC]"}`} />
                    {contactErrors.email && <p className="mt-1 text-[10px] font-bold text-red-600">{contactErrors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wide text-[#61786F]">Telefon *</label>
                    <input type="tel" value={contact.phone} onChange={handleContactChange("phone")} placeholder="05XX XXX XX XX" className={`w-full rounded-xl border bg-[#FAFCFA] px-3.5 py-2.5 text-xs outline-none transition focus:border-[#5E9D7E] focus:ring-4 focus:ring-[#4F9A79]/10 ${contactErrors.phone ? "border-red-400" : "border-[#D7E3DC]"}`} />
                    {contactErrors.phone && <p className="mt-1 text-[10px] font-bold text-red-600">{contactErrors.phone}</p>}
                  </div>
                </div>

                {submitError && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-700">{submitError}</p>}

                <div className="mt-4 flex items-center justify-between gap-3">
                  <button type="button" onClick={() => setScreen("questions")} className="inline-flex items-center gap-2 rounded-xl border border-[#D7E2DC] bg-white px-4 py-3 text-xs font-extrabold text-[#49645A] transition hover:bg-[#F6F9F7]"><ArrowLeft size={14} /> Geri</button>
                  <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-xl bg-[#0B684C] px-6 py-3 text-xs font-extrabold text-white shadow-[0_12px_24px_rgba(11,104,76,.15)] transition hover:bg-[#08583F] disabled:opacity-50">
                    {submitting ? "Kaydediliyor…" : "Sonucumu Görüntüle"} {!submitting && <ArrowRight size={14} />}
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* ---------------- RESULTS — viewport locked, tabbed, no page scrolling ---------------- */}
        {screen === "results" && sector && (
          <section className="flex h-full min-h-0 flex-col gap-2.5">
            <div className="flex flex-shrink-0 items-center justify-between gap-4 overflow-hidden rounded-[24px] bg-[#073A2D] px-5 py-3.5 text-white shadow-[0_18px_52px_rgba(4,49,38,.13)] sm:px-6">
              <div className="min-w-0">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#BBD9A7]">Yeşil Dönüşüm Sonuç Karnesi</div>
                <div className="mt-1 flex min-w-0 items-baseline gap-3">
                  <h2 className="truncate text-xl font-extrabold tracking-[-0.035em] sm:text-2xl" style={{ fontFamily: "'Manrope', sans-serif" }}>{firmName || contact.companyName || "İşletmeniz"}</h2>
                  <span className="hidden truncate text-[11px] font-bold text-white/55 md:inline">{sector.label}</span>
                </div>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <div className="rounded-xl border border-white/12 bg-white/[0.07] px-4 py-2">
                  <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/45">Skor</div>
                  <div className="text-2xl font-extrabold leading-none text-[#DDF28D]">{overallScore}<span className="text-[10px] text-white/40">/100</span></div>
                </div>
                <div className="hidden rounded-xl bg-[#CDE764] px-4 py-2 text-[#17382D] sm:block">
                  <div className="text-[8px] font-extrabold uppercase tracking-[0.15em] opacity-60">Düzey</div>
                  <div className="mt-0.5 max-w-[170px] truncate text-[11px] font-extrabold">{level.name}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center justify-between gap-2 rounded-[18px] border border-[#DCE8E1] bg-white/92 p-1.5 shadow-[0_8px_24px_rgba(4,49,38,.05)]">
              <div className="grid flex-1 grid-cols-4 gap-1.5">
                {[
                  ["overview", "Genel Bakış"],
                  ["actions", "Aksiyonlar"],
                  ["funding", "Destekler"],
                  ["report", "Rapor"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setResultsView(key)}
                    className={`rounded-xl px-2 py-2 text-[10px] font-extrabold transition sm:text-[11px] ${resultsView === key ? "bg-[#0B684C] text-white shadow-[0_7px_16px_rgba(11,104,76,.14)]" : "text-[#60786F] hover:bg-[#F1F6F2]"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button type="button" onClick={restart} className="hidden flex-shrink-0 items-center gap-1.5 rounded-xl border border-[#D7E2DC] bg-white px-3 py-2 text-[10px] font-extrabold text-[#49645A] hover:bg-[#F6F9F7] sm:inline-flex"><RotateCcw size={12} /> Yeniden Başlat</button>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden">
              {resultsView === "overview" && (
                <div className="grid h-full min-h-0 grid-cols-2 gap-2 md:grid-cols-3 md:gap-2.5">
                  <div className="flex min-h-0 flex-col rounded-[22px] border border-[#DCE8E1] bg-white p-4 shadow-[0_10px_30px_rgba(4,49,38,.05)]">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#789187]">Genel performans</div>
                    <div className="flex min-h-0 flex-1 items-center"><Gauge value={overallScore} /></div>
                    <div className="rounded-xl bg-[#F3F8F4] p-3 text-center">
                      <div className="text-xs font-extrabold text-[#174632]">{level.name}</div>
                      <p className="mt-1 text-[9px] leading-4 text-[#687F76]">{level.desc}</p>
                    </div>
                  </div>

                  <div className="hidden min-h-0 flex-col rounded-[22px] border border-[#DCE8E1] bg-white p-4 shadow-[0_10px_30px_rgba(4,49,38,.05)] md:flex">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#789187]">Kategori görünümü</div>
                    <div className="flex min-h-0 flex-1 items-center justify-center"><CategoryRadar sector={sector} categoryScores={categoryScores} /></div>
                  </div>

                  <div className="flex min-h-0 flex-col rounded-[22px] border border-[#DCE8E1] bg-[#F8FBF9] p-4 shadow-[0_10px_30px_rgba(4,49,38,.05)]">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#789187]">Önerilen yön</div>
                    <h3 className="mt-2 text-lg font-extrabold tracking-[-0.025em] text-[#17352A]">Bir sonraki dönüşüm adımınız</h3>
                    <p className="mt-2 text-[10px] font-medium leading-5 text-[#5F786E]">{level.recommendation}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {sector.categories.map((cat) => (
                        <div key={cat.code} className="rounded-xl border border-[#DCE8E1] bg-white p-2.5">
                          <div className="truncate text-[9px] font-bold text-[#637A71]">{cat.label}</div>
                          <div className="mt-1 flex items-center gap-2"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E9F0EC]"><div className="h-full rounded-full bg-[#2A805D]" style={{ width: `${categoryScores[cat.code] ?? 0}%` }} /></div><span className="text-[10px] font-extrabold text-[#1E6D50]">{categoryScores[cat.code] ?? 0}</span></div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto rounded-xl border border-[#D6E7DC] bg-white p-3">
                      <div className="flex items-start gap-2"><ShieldCheck size={14} className="mt-0.5 flex-shrink-0 text-[#2B825F]" /><p className="text-[9px] leading-4 text-[#61786F]">Aksiyonlar ve destekler ayrı sekmelerde özetlenir; tam detay PDF raporunda korunur.</p></div>
                    </div>
                  </div>
                </div>
              )}

              {resultsView === "actions" && (
                <div className="grid h-full min-h-0 grid-cols-2 gap-2 sm:gap-2.5">
                  {sector.categories.map((cat, idx) => {
                    const s = categoryScores[cat.code] ?? 0;
                    const findings = actionableFindings(sector, answers)[idx]?.findings || [];
                    return (
                      <div key={cat.code} className="flex min-h-0 flex-col rounded-[20px] border border-[#DCE8E1] bg-white p-3.5 shadow-[0_8px_24px_rgba(4,49,38,.045)]">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0"><div className="truncate text-xs font-extrabold text-[#17352A]">{cat.label}</div><div className="mt-1 h-1.5 w-36 max-w-full overflow-hidden rounded-full bg-[#E8F0EB]"><div className="h-full rounded-full bg-[#2A805D]" style={{ width: `${s}%` }} /></div></div>
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#EAF4E3] text-xs font-extrabold text-[#1F704F]">{s}</div>
                        </div>
                        <div className="mt-3 grid min-h-0 flex-1 gap-2">
                          {findings.length ? findings.slice(0, 2).map((q) => (
                            <div key={q.id} className="rounded-xl border border-[#E4ECE7] bg-[#F8FBF9] p-2.5">
                              <div className="flex items-start gap-2"><span className={`mt-0.5 flex-shrink-0 rounded px-1.5 py-0.5 text-[8px] font-extrabold ${q.answerValue === 0 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{q.answerValue === 0 ? "HAYIR" : "KISMEN"}</span><p className="text-[9px] font-bold leading-4 text-[#425C52]">{q.text}</p></div>
                              <p className="mt-1.5 border-l-2 border-[#9BC5A9] pl-2 text-[9px] leading-4 text-[#267052]">{q.recommendation}</p>
                            </div>
                          )) : <div className="flex h-full items-center justify-center rounded-xl bg-[#F2F8F2] p-3 text-center text-[10px] font-bold text-[#2E7B59]">Bu kategoride öncelikli eksik görünmüyor.</div>}
                        </div>
                        {findings.length > 2 && <div className="mt-2 text-[8px] font-bold uppercase tracking-wide text-[#82958D]">+{findings.length - 2} ek aksiyon PDF raporunda</div>}
                      </div>
                    );
                  })}
                </div>
              )}

              {resultsView === "funding" && (
                <div className="grid h-full min-h-0 grid-cols-1 gap-2.5 lg:grid-cols-[1.1fr_.9fr]">
                  <div className="min-h-0 rounded-[22px] border border-[#DCE8E1] bg-white p-4 shadow-[0_10px_30px_rgba(4,49,38,.05)]">
                    <div className="flex items-center justify-between gap-3"><div><div className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#789187]">Size özel</div><h3 className="mt-1 text-base font-extrabold text-[#17352A]">Hibe & Teşvik Önerileri</h3></div><span className="rounded-full bg-[#EAF4E3] px-2.5 py-1 text-[9px] font-extrabold text-[#267052]">{financeNotes.length} eşleşme</span></div>
                    <div className="mt-3 grid h-[calc(100%-48px)] auto-rows-fr grid-cols-2 gap-2">
                      {financeNotes.slice(0, 6).map((fn) => (
                        <div key={fn.id} className="min-h-0 rounded-xl border border-[#E0EAE4] bg-[#F8FBF9] p-2.5">
                          <div className="flex items-start justify-between gap-2"><span className="text-[10px] font-extrabold leading-snug text-[#253B33]">{fn.name}</span>{fn.confidence === "medium" && <span className="flex-shrink-0 rounded-full bg-amber-100 px-1.5 py-0.5 text-[7px] font-extrabold text-amber-800">TEYİT</span>}</div>
                          {fn.amount && <div className="mt-1 text-[9px] font-extrabold text-[#1C7954]">{fn.amount}</div>}
                          {fn.note && <p className="mt-1 text-[8px] leading-3.5 text-[#6C8179]">{fn.note}</p>}
                        </div>
                      ))}
                      {!financeNotes.length && <div className="col-span-full flex items-center justify-center rounded-xl bg-[#F4F8F5] p-4 text-[10px] font-bold text-[#657C73]">Bu sonuç için özel bir finansman eşleşmesi görünmüyor.</div>}
                    </div>
                  </div>

                  <div className="hidden min-h-0 grid-rows-[1fr_auto] gap-2.5 lg:grid">
                    <div className="min-h-0 rounded-[22px] border border-[#DCE8E1] bg-white p-4 shadow-[0_10px_30px_rgba(4,49,38,.05)]">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#789187]">Tüm sektörler</div>
                      <h3 className="mt-1 text-base font-extrabold text-[#17352A]">Ortak Destek Programları</h3>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        {CROSS_SECTOR_PROGRAMS.slice(0, 6).map((p) => (
                          <div key={p.id} className="rounded-xl border border-[#E0EAE4] bg-[#F8FBF9] p-2.5"><div className="text-[9px] font-extrabold text-[#253B33]">{p.name}</div>{p.amount && <div className="mt-0.5 text-[8px] font-extrabold text-[#1C7954]">{p.amount}</div>}</div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 rounded-[18px] bg-[#073A2D] px-4 py-3 text-white">
                      <div><div className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-[#BBD9A7]">Detaylı tarama</div><div className="mt-0.5 text-xs font-extrabold">Çorlu TSO Hibe Motoru</div></div>
                      <a href={HIBE_MOTORU_URL} target="_blank" rel="noreferrer" className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-[#CDE764] px-3 py-2 text-[9px] font-extrabold text-[#15382D]">Aç <ExternalLink size={11} /></a>
                    </div>
                  </div>
                </div>
              )}

              {resultsView === "report" && (
                <div className="grid h-full min-h-0 grid-cols-1 gap-2.5 lg:grid-cols-2">
                  <div className="flex min-h-0 flex-col rounded-[22px] border border-[#DCE8E1] bg-white p-5 shadow-[0_10px_30px_rgba(4,49,38,.05)]">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#789187]">Raporlama</div>
                    <h3 className="mt-2 text-xl font-extrabold tracking-[-0.025em] text-[#17352A]">Detaylı PDF karnenizi indirin</h3>
                    <p className="mt-2 text-[10px] leading-5 text-[#71877F]">Kategori skorları, tüm aksiyon bulguları, hibe/teşvik önerileri ve mevzuat notları raporda tam içerikle yer alır.</p>
                    <div className="mt-4 rounded-2xl bg-[#F5F9F6] p-4">
                      <label className="mb-1.5 block text-[9px] font-extrabold uppercase tracking-wide text-[#61786F]">Rapor Başlığı / Firma Adı</label>
                      <input value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder="Firma adı" className="w-full rounded-xl border border-[#D7E3DC] bg-white px-3.5 py-2.5 text-xs outline-none transition focus:border-[#5E9D7E] focus:ring-4 focus:ring-[#4F9A79]/10" />
                    </div>
                    <button onClick={handleDownloadPdf} disabled={pdfState === "generating"} className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B684C] px-5 py-3 text-[11px] font-extrabold text-white transition hover:bg-[#08583F] disabled:opacity-50"><Download size={14} />{pdfState === "generating" ? "Oluşturuluyor…" : pdfState === "done" ? "PDF'yi Tekrar İndir" : "PDF Raporunu İndir"}</button>
                    <button onClick={restart} className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-[#D7E2DC] bg-white px-4 py-2.5 text-[10px] font-extrabold text-[#49645A] hover:bg-[#F6F9F7]"><RotateCcw size={13} /> Yeni Değerlendirme</button>
                  </div>

                  <div className="hidden min-h-0 grid-rows-2 gap-2.5 lg:grid">
                    {triggeredModules.includes("ets_skdm_module") && CONDITIONAL_MODULES.ets_skdm_module ? (
                      <div className="min-h-0 rounded-[22px] border border-amber-200 bg-amber-50 p-4">
                        <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-amber-800">TR-ETS / SKDM Uyarısı</div>
                        <p className="mt-2 text-[10px] font-medium leading-5 text-[#5B4A20]">{CONDITIONAL_MODULES.ets_skdm_module.content}</p>
                        <p className="mt-2 text-[8px] leading-4 text-amber-700/70">Kaynak: {CONDITIONAL_MODULES.ets_skdm_module.source}</p>
                      </div>
                    ) : (
                      <div className="flex min-h-0 items-center rounded-[22px] border border-[#DCE8E1] bg-[#F5F9F6] p-5"><div><ShieldCheck size={22} className="text-[#2A805D]" /><div className="mt-2 text-sm font-extrabold text-[#17352A]">Özel ETS/SKDM uyarısı tetiklenmedi</div><p className="mt-1 text-[10px] leading-5 text-[#657C73]">Mevcut yanıtlarınıza göre bu koşullu modül öncelikli uyarı üretmedi.</p></div></div>
                    )}
                    <div className="flex min-h-0 items-center justify-between gap-5 overflow-hidden rounded-[22px] bg-[#073A2D] p-5 text-white">
                      <div className="min-w-0"><div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#BBD9A7]">Üye Dönüşüm Portalı</div><h4 className="mt-1 text-lg font-extrabold">Yeşil dönüşüm yol haritanızı bir sonraki adıma taşıyın.</h4><p className="mt-2 text-[9px] leading-4 text-white/60">Detaylı finansman taraması için Hibe Motoru'nu kullanabilirsiniz.</p></div>
                      <Leaf size={92} strokeWidth={1.2} className="hidden flex-shrink-0 text-[#CDE764]/45 sm:block" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer intentionally omitted: every app screen is viewport-locked with no page scrolling. */}

      {showMethodology && <MethodologyModal onClose={() => setShowMethodology(false)} />}
      {showKVKK && <KVKKModal onClose={() => setShowKVKK(false)} />}
    </div>
  );
}
