import jsPDF from "jspdf";

/* ---------------------------------------------------------------
   FONT VE LOGO YÜKLEME (Türkçe karakter desteği için DejaVuSans)
--------------------------------------------------------------- */

let fontsLoadedPromise = null;

async function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function loadLogoBase64() {
  try {
    const response = await fetch("/ctso-logo.png");
    if (!response.ok) return null;
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn("Logo yüklenemedi:", e);
    return null;
  }
}

async function ensureFontsLoaded(doc) {
  if (!fontsLoadedPromise) {
    fontsLoadedPromise = Promise.all([
      fetch("/fonts/DejaVuSans-subset.ttf").then((r) => r.arrayBuffer()),
      fetch("/fonts/DejaVuSans-Bold-subset.ttf").then((r) => r.arrayBuffer()),
    ]).then(([regularBuf, boldBuf]) =>
      Promise.all([arrayBufferToBase64(regularBuf), arrayBufferToBase64(boldBuf)])
    );
  }
  const [regularB64, boldB64] = await fontsLoadedPromise;
  doc.addFileToVFS("DejaVuSans.ttf", regularB64);
  doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
  doc.addFileToVFS("DejaVuSans-Bold.ttf", boldB64);
  doc.addFont("DejaVuSans-Bold.ttf", "DejaVuSans", "bold");
}

/* ---------------------------------------------------------------
   RENK PALETİ
--------------------------------------------------------------- */
const NAVY = [9, 21, 56];
const GREEN = [6, 95, 70];
const AMBER = [217, 119, 6];
const STEEL = [100, 116, 139];
const LIGHT = [241, 245, 249];

const PAGE_W = 210;
const MARGIN = 18;
const CONTENT_W = PAGE_W - MARGIN * 2;

function scoreRgb(score) {
  if (score < 40) return [220, 38, 38];
  if (score < 60) return [217, 119, 6];
  if (score < 80) return [180, 140, 6];
  return [5, 150, 105];
}

export async function generateGreenPdfReport({
  firmName,
  sector,
  categoryScores,
  overallScore,
  level,
  financeNotes,
  crossSectorPrograms,
  triggeredModules,
  conditionalModules,
  findingsByCategory = [],
}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  await ensureFontsLoaded(doc);
  const logo = await loadLogoBase64();

  let y = 0;

  // ---- Kapak / başlık bandı ----
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, 42, "F");
  if (logo) {
    try {
      doc.addImage(logo, "PNG", MARGIN, 8, 22, 22);
    } catch (e) {
      /* logo yüklenemezse sessizce geç */
    }
  }
  doc.setFont("DejaVuSans", "bold");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.text("Çorlu Ticaret ve Sanayi Odası", MARGIN + 26, 18);
  doc.setFontSize(11);
  doc.setFont("DejaVuSans", "normal");
  doc.text("Yeşil Dönüşüm & Sürdürülebilirlik Karnesi", MARGIN + 26, 26);
  doc.setFontSize(9);
  doc.setTextColor(200, 210, 230);
  doc.text(sector.label, MARGIN + 26, 33);

  y = 52;

  // ---- Firma / tarih ----
  doc.setTextColor(...STEEL);
  doc.setFontSize(9);
  doc.setFont("DejaVuSans", "normal");
  const dateStr = new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Rapor Tarihi: ${dateStr}`, MARGIN, y);
  if (firmName) {
    doc.text(`Firma: ${firmName}`, PAGE_W - MARGIN, y, { align: "right" });
  }
  y += 10;

  // ---- Genel skor kutusu ----
  doc.setFillColor(...LIGHT);
  doc.roundedRect(MARGIN, y, CONTENT_W, 30, 3, 3, "F");
  const [r, g, b] = scoreRgb(overallScore);
  doc.setTextColor(r, g, b);
  doc.setFont("DejaVuSans", "bold");
  doc.setFontSize(26);
  doc.text(`${overallScore}/100`, MARGIN + 8, y + 20);
  doc.setTextColor(...NAVY);
  doc.setFontSize(13);
  doc.text(level.name, MARGIN + 55, y + 14);
  doc.setFont("DejaVuSans", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...STEEL);
  const descLines = doc.splitTextToSize(level.desc, CONTENT_W - 60);
  doc.text(descLines, MARGIN + 55, y + 21);
  y += 38;

  // ---- Öneri kutusu ----
  doc.setFillColor(236, 253, 245);
  const recLines = doc.splitTextToSize(level.recommendation, CONTENT_W - 8);
  const recBoxH = 8 + recLines.length * 4.2;
  doc.roundedRect(MARGIN, y, CONTENT_W, recBoxH, 2, 2, "F");
  doc.setTextColor(...GREEN);
  doc.setFont("DejaVuSans", "bold");
  doc.setFontSize(8);
  doc.text("ÖNCELİKLİ AKSİYON", MARGIN + 4, y + 5.5);
  doc.setFont("DejaVuSans", "normal");
  doc.setTextColor(30, 41, 59);
  doc.text(recLines, MARGIN + 4, y + 10.5);
  y += recBoxH + 8;

  // ---- Kategori skorları ----
  doc.setFont("DejaVuSans", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...NAVY);
  doc.text("Kategori Bazlı Sonuçlar", MARGIN, y);
  y += 6;

  sector.categories.forEach((cat, idx) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    const s = categoryScores[cat.code] ?? 0;
    const [cr, cg, cb] = scoreRgb(s);
    doc.setFont("DejaVuSans", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    doc.text(cat.label, MARGIN, y);
    doc.setTextColor(cr, cg, cb);
    doc.text(`${s}/100`, PAGE_W - MARGIN, y, { align: "right" });
    y += 3;
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(MARGIN, y, CONTENT_W, 3, 1.5, 1.5, "F");
    doc.setFillColor(cr, cg, cb);
    doc.roundedRect(MARGIN, y, (CONTENT_W * s) / 100, 3, 1.5, 1.5, "F");
    y += 7;

    // ---- Öncelikli aksiyon bulguları (bu kategori için) ----
    const findings = findingsByCategory[idx]?.findings || [];
    findings.forEach((q) => {
      const qLines = doc.splitTextToSize(q.text, CONTENT_W - 10);
      const recLines = doc.splitTextToSize(`→ ${q.recommendation}`, CONTENT_W - 10);
      const blockH = 4 + qLines.length * 3.6 + recLines.length * 3.6 + 3;
      if (y + blockH > 272) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("DejaVuSans", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(q.answerValue === 0 ? 185 : 180, q.answerValue === 0 ? 28 : 130, q.answerValue === 0 ? 28 : 10);
      doc.text(q.answerValue === 0 ? "[Hayır]" : "[Kısmen]", MARGIN + 3, y);
      doc.setTextColor(51, 65, 85);
      doc.text(qLines, MARGIN + 18, y);
      y += qLines.length * 3.6 + 1;
      doc.setFont("DejaVuSans", "normal");
      doc.setFontSize(7.3);
      doc.setTextColor(...GREEN);
      doc.text(recLines, MARGIN + 18, y);
      y += recLines.length * 3.6 + 3;
    });

    y += 3;
  });

  y += 2;

  // ---- ETS/SKDM uyarısı ----
  if (triggeredModules.includes("ets_skdm_module") && conditionalModules.ets_skdm_module) {
    if (y > 245) {
      doc.addPage();
      y = 20;
    }
    const mod = conditionalModules.ets_skdm_module;
    doc.setFillColor(255, 251, 235);
    const modLines = doc.splitTextToSize(mod.content, CONTENT_W - 8);
    const modBoxH = 10 + modLines.length * 4.2;
    doc.roundedRect(MARGIN, y, CONTENT_W, modBoxH, 2, 2, "F");
    doc.setFont("DejaVuSans", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...AMBER);
    doc.text("⚠ TR-ETS / SKDM UYARISI", MARGIN + 4, y + 6);
    doc.setFont("DejaVuSans", "normal");
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(modLines, MARGIN + 4, y + 11);
    y += modBoxH + 8;
  }

  // ---- Finansman önerileri ----
  if (y > 250) {
    doc.addPage();
    y = 20;
  }
  doc.setFont("DejaVuSans", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...NAVY);
  doc.text("Hibe & Teşvik Önerileri", MARGIN, y);
  y += 7;

  financeNotes.forEach((fn) => {
    const lines = [];
    if (fn.amount) lines.push(fn.amount);
    if (fn.note) lines.push(fn.note);
    if (fn.prerequisite) lines.push(`Ön şart: ${fn.prerequisite}`);
    const wrapped = doc.splitTextToSize(lines.join(" — "), CONTENT_W - 4);
    const boxH = 6 + wrapped.length * 4;

    if (y + boxH > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("DejaVuSans", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(fn.name, MARGIN, y);
    y += 4.5;
    doc.setFont("DejaVuSans", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...STEEL);
    doc.text(wrapped, MARGIN, y);
    y += wrapped.length * 3.6 + 4;
  });

  // ---- Ortak programlar ----
  if (y > 245) {
    doc.addPage();
    y = 20;
  }
  y += 3;
  doc.setFont("DejaVuSans", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...NAVY);
  doc.text("Tüm Sektörleri İlgilendiren Programlar", MARGIN, y);
  y += 7;

  crossSectorPrograms.forEach((p) => {
    const lines = [p.amount, p.note].filter(Boolean);
    const wrapped = doc.splitTextToSize(lines.join(" — "), CONTENT_W - 4);
    const boxH = 5 + wrapped.length * 3.6;
    if (y + boxH > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("DejaVuSans", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(p.name, MARGIN, y);
    y += 4;
    doc.setFont("DejaVuSans", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...STEEL);
    doc.text(wrapped, MARGIN, y);
    y += wrapped.length * 3.6 + 4;
  });

  // ---- Hibe Motoru CTA ----
  if (y > 255) {
    doc.addPage();
    y = 20;
  }
  y += 4;
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(MARGIN, y, CONTENT_W, 20, 2, 2, "F");
  doc.setFont("DejaVuSans", "bold");
  doc.setFontSize(9);
  doc.setTextColor(30, 58, 138);
  doc.text("Detaylı hibe/teşvik taraması için Çorlu TSO Hibe Motoru'nu ziyaret edin:", MARGIN + 4, y + 8);
  doc.setFont("DejaVuSans", "normal");
  doc.setFontSize(8.5);
  doc.textWithLink("hibemotoru.vercel.app", MARGIN + 4, y + 14, { url: "https://hibemotoru.vercel.app" });

  // ---- Alt bilgi (her sayfaya) ----
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("DejaVuSans", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...STEEL);
    doc.text(
      "Çorlu Ticaret ve Sanayi Odası — Bu rapor bilgilendirme amaçlıdır, resmi başvurular için ilgili kurumların güncel şartlarını teyit ediniz.",
      MARGIN,
      289
    );
    doc.text(`${i}/${pageCount}`, PAGE_W - MARGIN, 289, { align: "right" });
  }

  const safeName = firmName ? firmName.replace(/[^\p{L}\p{N}]+/gu, "_") : "rapor";
  doc.save(`corlu-tso-yesil-donusum-${safeName}.pdf`);
}
