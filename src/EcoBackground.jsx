import React from "react";

/* ---------------------------------------------------------------
   ECO BACKGROUND — özgün, telifsiz dekoratif arka plan.
   Koyu yeşil/siyah degrade + bokeh ışıklar + yaprak kümesi +
   jenerik (evrensel) geri dönüşüm sembolü. Sabit (fixed), tüm
   ekranın arkasında durur; içerik okunabilirliği kartlar/panel
   üzerinden sağlanır.
--------------------------------------------------------------- */

function Leaf({ x, y, w, rotate, opacity, fill }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${w / 60})`} opacity={opacity}>
      <path
        d="M0,0 C14,-34 46,-34 60,0 C46,34 14,34 0,0 Z"
        fill={fill}
      />
      <path d="M2,0 L58,0" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
    </g>
  );
}

const LEAVES = [
  { x: 620, y: 90, w: 90, rotate: 15, opacity: 0.5, fill: "#173D26" },
  { x: 720, y: 60, w: 70, rotate: -25, opacity: 0.55, fill: "#1F5136" },
  { x: 800, y: 140, w: 100, rotate: 55, opacity: 0.5, fill: "#123018" },
  { x: 660, y: 210, w: 80, rotate: -70, opacity: 0.6, fill: "#2A5F3C" },
  { x: 780, y: 260, w: 65, rotate: 20, opacity: 0.5, fill: "#173D26" },
  { x: 700, y: 330, w: 95, rotate: 100, opacity: 0.55, fill: "#1F5136" },
  { x: 850, y: 340, w: 75, rotate: -40, opacity: 0.5, fill: "#123018" },
  { x: 620, y: 400, w: 85, rotate: 60, opacity: 0.5, fill: "#2A5F3C" },
  { x: 760, y: 440, w: 70, rotate: -10, opacity: 0.55, fill: "#173D26" },
  { x: 880, y: 220, w: 60, rotate: 140, opacity: 0.45, fill: "#1F5136" },
  { x: 900, y: 420, w: 90, rotate: 30, opacity: 0.5, fill: "#123018" },
  { x: 640, y: 480, w: 60, rotate: -90, opacity: 0.45, fill: "#2A5F3C" },
];

/* Jenerik, evrensel "üç dönen ok" geri dönüşüm sembolü — özgün çizim. */
function RecycleGlyph() {
  const arrow = (rotate) => (
    <g transform={`rotate(${rotate})`}>
      <path
        d="M -8,-58 L 30,-58 A 62 62 0 0 1 55,-18 L 40,-10 L 62,18 L 20,22 L 30,-4 L 16,4 A 46 46 0 0 0 -2,-42 Z"
        fill="url(#recycleGrad)"
      />
    </g>
  );
  return (
    <g filter="url(#glow)">
      <defs>
        <linearGradient id="recycleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
      </defs>
      {arrow(0)}
      {arrow(120)}
      {arrow(240)}
    </g>
  );
}

const SPARKLES = Array.from({ length: 16 }).map((_, i) => ({
  cx: 560 + ((i * 137) % 420),
  cy: 40 + ((i * 211) % 480),
  r: 1 + (i % 3),
  opacity: 0.25 + (i % 4) * 0.1,
}));

export default function EcoBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Taban degrade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 22% 15%, #16321F 0%, #0A1710 50%, #05090A 100%)",
        }}
      />

      {/* Bokeh ışık lekeleri (sol üst ağırlıklı) */}
      <div className="absolute -left-10 top-4 w-72 h-72 rounded-full bg-emerald-300/10 blur-3xl eco-pulse" />
      <div className="absolute left-24 top-40 w-56 h-56 rounded-full bg-emerald-200/10 blur-3xl eco-pulse-slow" />
      <div className="absolute left-4 bottom-20 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl eco-pulse" />
      <div className="absolute left-1/3 top-1/4 w-40 h-40 rounded-full bg-white/5 blur-2xl" />

      {/* Yaprak kümesi + geri dönüşüm sembolü (sağ taraf) */}
      <svg
        className="absolute right-0 top-0 h-full w-full sm:w-2/3"
        viewBox="0 0 960 600"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {LEAVES.map((l, i) => (
          <Leaf key={i} {...l} />
        ))}

        <g transform="translate(760 300) scale(1.15)">
          <RecycleGlyph />
        </g>

        {SPARKLES.map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#D9F99D"
            opacity={s.opacity}
            className={i % 2 === 0 ? "eco-twinkle" : ""}
          />
        ))}
      </svg>

      {/* Sol taraftan koyulaştırma — metin okunabilirliği için */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,9,8,0.55) 0%, rgba(5,9,8,0.25) 45%, rgba(5,9,8,0) 75%)",
        }}
      />
    </div>
  );
}
