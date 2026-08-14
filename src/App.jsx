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
   ANA UYGULAMA
--------------------------------------------------------------- */
export default function App() {
  const [screen, setScreen] = useState("intro"); // intro | sectorPick | questions | results
  const [sectorId, setSectorId] = useState(null);
  const [pageIndex, setPageIndex] = useState(0); // kategori sayfası
  const [answers, setAnswers] = useState({});
  const [firmName, setFirmName] = useState("");
  const [pdfState, setPdfState] = useState("idle"); // idle | generating | done

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
      setScreen("results");
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
    setScreen("intro");
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-3">
          <img src="/ctso-logo.png" alt="Çorlu TSO" className="h-9 w-auto" />
          <div>
            <div className="text-sm font-extrabold text-slate-900 leading-tight">Çorlu Ticaret ve Sanayi Odası</div>
            <div className="text-xs text-slate-500 leading-tight">Bütüncül Yeşil Dönüşüm & Sürdürülebilirlik Karnesi</div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
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
                Hiçbir veri sunucuya gönderilmez veya saklanmaz — tüm hesaplama tarayıcınızda yapılır.
              </div>
              <button
                onClick={() => setScreen("sectorPick")}
                className="mt-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-lg transition-all inline-flex items-center gap-2"
              >
                Başla <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {screen === "sectorPick" && (
          <div className="space-y-4">
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
          <div className="space-y-5">
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

        {screen === "results" && sector && (
          <div className="space-y-6">
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
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 flex-shrink-0">
          <div className="max-w-4xl mx-auto px-4">
            <p className="font-semibold text-slate-700">Çorlu Ticaret ve Sanayi Odası © {new Date().getFullYear()}</p>
            <p className="mt-1 text-[11px] text-slate-400">Yeşil Dönüşüm & Sürdürülebilirlik Hizmetleri</p>
          </div>
        </footer>
      )}
    </div>
  );
}
