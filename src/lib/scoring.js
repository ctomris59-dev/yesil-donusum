// Skor hesaplama mantığı — client-side, veri saklanmaz.

export const ANSWER_OPTIONS = {
  boolean: [
    { value: 0, label: "Hayır" },
    { value: 1, label: "Kısmen" },
    { value: 2, label: "Evet" },
  ],
  percentage: [
    { value: 0, label: "%0-25" },
    { value: 1, label: "%26-60" },
    { value: 2, label: "%61-100" },
  ],
  select: [
    { value: 0, label: "Düşük (E-G / Belge yok)" },
    { value: 1, label: "Orta (C-D)" },
    { value: 2, label: "Yüksek (A-B)" },
  ],
};

export const LEVELS = [
  {
    max: 39,
    name: "Başlangıç",
    desc: "Yeşil dönüşüm uygulamaları henüz sistematik değil, çoğunlukla münferit.",
    recommendation: "Öncelik: enerji ve su tüketimini düzenli ölçüp kayıt altına almakla başlayın — ölçemediğinizi yönetemezsiniz.",
  },
  {
    max: 59,
    name: "Gelişmekte",
    desc: "Bazı temel uygulamalar var ama kategoriler arasında dengesizlik mevcut.",
    recommendation: "Öncelik: en zayıf kategorinizde somut bir aksiyon planı çıkarıp, ilgili hibe/teşvik programına başvuru hazırlığı yapın.",
  },
  {
    max: 79,
    name: "İyi Seviye",
    desc: "Çoğu alanda sistematik uygulamalar mevcut, belgelendirme fırsatları değerlendirilebilir.",
    recommendation: "Öncelik: sektörünüze özel sertifikasyon (ZDHC, LWG, Yeşil Lojistik Belgesi vb.) için başvuru sürecini başlatın.",
  },
  {
    max: 100,
    name: "Öncü",
    desc: "Yeşil dönüşüm kurumsal stratejinin parçası haline gelmiş, raporlama ve sürekli iyileştirme aktif.",
    recommendation: "Öncelik: sürdürülebilirlik performansınızı CDP/EcoVadis gibi uluslararası platformlarda görünür kılın.",
  },
];

export function levelFor(score) {
  return LEVELS.find((l) => score <= l.max) ?? LEVELS[LEVELS.length - 1];
}

/**
 * answers: { [questionId]: number (0,1,2) }
 * sector: { categories: [{ code, label, questions: [{id, trigger, ...}] }] }
 * Returns: { categoryScores: {code: 0-100}, overallScore: 0-100, triggeredModules: [moduleKey] }
 */
export function computeScores(sector, answers) {
  const categoryScores = {};
  const triggeredModules = new Set();

  sector.categories.forEach((cat) => {
    let sum = 0;
    let count = 0;
    cat.questions.forEach((q) => {
      const val = answers[q.id];
      if (typeof val === "number") {
        sum += val;
        count += 1;
        if (q.trigger && val === 2) {
          triggeredModules.add(q.trigger);
        }
      }
    });
    categoryScores[cat.code] = count > 0 ? Math.round(((sum / count) / 2) * 100) : 0;
  });

  const catValues = Object.values(categoryScores);
  const overallScore =
    catValues.length > 0 ? Math.round(catValues.reduce((a, b) => a + b, 0) / catValues.length) : 0;

  return { categoryScores, overallScore, triggeredModules: Array.from(triggeredModules) };
}

export function weakCategories(sector, categoryScores, threshold = 60) {
  return sector.categories.filter((cat) => categoryScores[cat.code] < threshold);
}

/**
 * Her kategori için, "Hayır" (0) veya "Kısmen" (1) cevaplanmış — yani somut aksiyon
 * gerektiren — soruları, önerileriyle birlikte döndürür. "Evet" (2) cevaplanan veya
 * tetikleyici (trigger) sorular hariç tutulur (tetikleyiciler ayrı bir uyarı modülünde gösterilir).
 * Her kategoriden en fazla `maxPerCategory` soru döndürülür (en düşük skorlu olanlar önce).
 */
export function actionableFindings(sector, answers, maxPerCategory = 3) {
  return sector.categories.map((cat) => {
    const weak = cat.questions
      .filter((q) => !q.trigger && typeof answers[q.id] === "number" && answers[q.id] < 2 && q.recommendation)
      .map((q) => ({ ...q, answerValue: answers[q.id] }))
      .sort((a, b) => a.answerValue - b.answerValue)
      .slice(0, maxPerCategory);
    return { category: cat, findings: weak };
  });
}

export function relevantFinanceNotes(sector, categoryScores, threshold = 70) {
  const weakCodes = sector.categories
    .filter((cat) => categoryScores[cat.code] < threshold)
    .map((cat) => cat.code);

  const relevant = sector.financeNotes.filter((fn) => {
    if (!fn.triggerCategories || fn.triggerCategories.length === 0) return true;
    return fn.triggerCategories.some((c) => weakCodes.includes(c));
  });

  // Eşleşen yoksa hepsini göster (boş sonuç kullanıcıya hiç fayda sağlamaz)
  return relevant.length > 0 ? relevant : sector.financeNotes;
}

export function totalQuestionCount(sector) {
  return sector.categories.reduce((sum, cat) => sum + cat.questions.length, 0);
}
