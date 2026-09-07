import React, { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Sparkles, Copy, Check, Palette, Type } from "lucide-react";

const FONTS = [
  { id: "fredericka", name: "Fredericka the Great", family: "'Fredericka the Great', cursive", desc: "Chalk-sketch artistic handwritten serif script", size: "85px" },
  { id: "homemade-apple", name: "Homemade Apple", family: "'Homemade Apple', cursive", desc: "Authentic handwritten signature script like Apple Hello", size: "90px" },
  { id: "rock-salt", name: "Rock Salt", family: "'Rock Salt', cursive", desc: "Authentic, raw felt-marker handwritten script", size: "85px" },
  { id: "satisfy", name: "Satisfy", family: "'Satisfy', cursive", desc: "Sleek, fluid, highly legible feminine script", size: "115px" },
  { id: "italianno", name: "Italianno", family: "'Italianno', cursive", desc: "Refined, fast elegant calligraphic handwriting", size: "125px" },
  { id: "pinyon", name: "Pinyon Script", family: "'Pinyon Script', cursive", desc: "High-society luxury signature script with graceful loops", size: "115px" },
  { id: "birthstone", name: "Birthstone", family: "'Birthstone', cursive", desc: "Modern delicate bouncing signature script", size: "115px" },
  { id: "caveat", name: "Caveat", family: "'Caveat', cursive", desc: "Modern aesthetic handwritten script", size: "115px" },
  { id: "playfair-italic", name: "Playfair Italic", family: "'Playfair Display', Georgia, serif", desc: "Timeless luxury italic editorial serif", style: "italic", size: "105px" },
  { id: "dancing-script", name: "Dancing Script", family: "'Dancing Script', cursive", desc: "Friendly dynamic cursive with gentle bounce", size: "110px" },
  { id: "alex-brush", name: "Alex Brush", family: "'Alex Brush', cursive", desc: "Classic smooth calligraphic cursive", size: "115px" },
  { id: "sacramento", name: "Sacramento", family: "'Sacramento', cursive", desc: "Chic retro 1950s hand lettering", size: "115px" },
];

const THEMES = [
  {
    id: "rose-gold",
    name: "Rose Gold",
    primary: "#F4C4C9",
    secondary: "#E38DA3",
    accent: "#CF547A",
    glow: "rgba(207, 84, 122, 0.6)",
    gradient: "linear-gradient(135deg, #F4C4C9 0%, #E38DA3 50%, #CF547A 100%)",
  },
  {
    id: "gold-shimmer",
    name: "Gold Shimmer",
    primary: "#FEF08A",
    secondary: "#FBBF24",
    accent: "#D97706",
    glow: "rgba(245, 158, 11, 0.6)",
    gradient: "linear-gradient(135deg, #FEF08A 0%, #FBBF24 50%, #D97706 100%)",
  },
  {
    id: "cosmic-neon",
    name: "Cosmic Neon",
    primary: "#F472B6",
    secondary: "#EC4899",
    accent: "#A855F7",
    glow: "rgba(236, 72, 153, 0.7)",
    gradient: "linear-gradient(135deg, #F472B6 0%, #EC4899 50%, #8B5CF6 100%)",
  },
  {
    id: "pearl-cyan",
    name: "Pearl Aura",
    primary: "#E0F2FE",
    secondary: "#38BDF8",
    accent: "#818CF8",
    glow: "rgba(56, 189, 248, 0.6)",
    gradient: "linear-gradient(135deg, #E0F2FE 0%, #38BDF8 50%, #818CF8 100%)",
  },
];

export default function SheVibesCursiveAnimation() {
  const [text, setText] = useState("SheVibes");
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [animKey, setAnimKey] = useState(0);
  const [speed, setSpeed] = useState(2.6);
  const [copied, setCopied] = useState(false);

  const handleReplay = () => {
    setAnimKey((prev) => prev + 1);
  };

  const handleCopyCode = () => {
    const code = `<span style="font-family: ${selectedFont.family}; font-style: ${selectedFont.style || "normal"}; background: ${selectedTheme.gradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block; padding: 0.2em 0.1em;">${text}</span>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 flex flex-col items-center">
      {/* Header Badge */}
      <div className="inline-flex items-center gap-2 bg-[#CF547A]/10 border border-[#CF547A]/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#E38DA3] mb-4 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-[#E38DA3] animate-pulse" />
        Zero-Clipping Cursive Typography Engine
      </div>

      <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-white tracking-tight mb-2">
        Pick Your Favorite <span className="text-[#E38DA3]">SheVibes</span> Cursive Font
      </h2>
      <p className="text-xs sm:text-sm text-gray-400 text-center max-w-xl mb-6">
        Click any font below to see it live with smooth handwriting stroke drawing animation.
      </p>

      {/* Main Display Stage Card - Extra Vertical Space so No Clipping Happens */}
      <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#120c18]/95 via-[#0d0914]/95 to-[#050507]/98 border border-[#CF547A]/30 p-4 sm:p-10 shadow-2xl backdrop-blur-xl overflow-visible flex flex-col items-center justify-center min-h-[360px]">
        {/* Background Ambient Glow */}
        <div
          className="absolute inset-0 opacity-30 blur-3xl pointer-events-none transition-all duration-700 rounded-3xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${selectedTheme.glow}, transparent 75%)`,
          }}
        />

        {/* Dynamic SVG Animated Text with Extra Vertical Margin (viewBox 0 0 950 260) */}
        <div className="relative w-full max-w-4xl flex items-center justify-center py-4 overflow-visible select-none">
          <svg
            key={animKey}
            viewBox="0 0 950 260"
            className="w-full h-auto max-h-[260px] overflow-visible drop-shadow-[0_0_30px_rgba(227,141,163,0.45)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="shevibesGradientEx" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={selectedTheme.primary} />
                <stop offset="50%" stopColor={selectedTheme.secondary} />
                <stop offset="100%" stopColor={selectedTheme.accent} />
              </linearGradient>

              <filter id="cursiveGlowEx" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <style>{`
              @keyframes strokeDrawEx {
                0% {
                  stroke-dashoffset: 2000;
                  fill: rgba(255, 255, 255, 0);
                  stroke: url(#shevibesGradientEx);
                }
                60% {
                  stroke-dashoffset: 0;
                  fill: rgba(255, 255, 255, 0);
                  stroke: url(#shevibesGradientEx);
                }
                100% {
                  stroke-dashoffset: 0;
                  fill: url(#shevibesGradientEx);
                  stroke: rgba(255, 255, 255, 0.3);
                }
              }

              .cursive-text-ex {
                font-family: ${selectedFont.family};
                font-style: ${selectedFont.style || "normal"};
                font-size: ${selectedFont.size || "115px"};
                font-weight: 400;
                stroke-dasharray: 2000;
                stroke-dashoffset: 2000;
                stroke-width: 2.5px;
                stroke-linecap: round;
                stroke-linejoin: round;
                filter: url(#cursiveGlowEx);
                animation: strokeDrawEx ${speed}s cubic-bezier(0.42, 0, 0.58, 1) forwards;
              }
            `}</style>

            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="cursive-text-ex"
            >
              {text}
            </text>
          </svg>
        </div>

        {/* Font Info & Replay Bar */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3 z-10">
          <button
            onClick={handleReplay}
            className="flex items-center gap-2 bg-[#CF547A] hover:bg-[#b84366] text-white py-2 px-4 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Replay Handwriting
          </button>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white py-2 px-4 rounded-xl text-xs font-semibold border border-white/10 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied CSS!" : "Copy Code"}
          </button>
        </div>
      </div>

      {/* Quick Font Selector Bar */}
      <div className="w-full mt-6 bg-[#120c18]/90 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 text-white font-semibold text-sm mb-4 border-b border-white/10 pb-2">
          <Type className="w-4 h-4 text-[#E38DA3]" />
          Choose Cursive Style ({FONTS.length} Options)
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {FONTS.map((font) => (
            <button
              key={font.id}
              onClick={() => {
                setSelectedFont(font);
                setAnimKey((prev) => prev + 1);
              }}
              className={`p-3 rounded-xl text-left transition-all border ${
                selectedFont.id === font.id
                  ? "border-[#CF547A] bg-[#CF547A]/20 shadow-lg shadow-[#CF547A]/20"
                  : "border-white/5 bg-white/5 hover:bg-white/10 text-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{font.name}</span>
                {selectedFont.id === font.id && (
                  <span className="w-2 h-2 rounded-full bg-[#CF547A] animate-ping" />
                )}
              </div>
              <div
                className="text-2xl text-[#E38DA3] truncate pt-1 overflow-visible"
                style={{ fontFamily: font.family, fontStyle: font.style || "normal" }}
              >
                SheVibes
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Settings: Text & Themes */}
      <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Text Options */}
        <div className="bg-[#120c18]/80 border border-white/10 p-4 rounded-2xl">
          <label className="text-xs text-gray-400 font-medium block mb-2">Display Text</label>
          <div className="flex flex-wrap gap-2">
            {["SheVibes", "shevibes", "She Vibes", "she vibes"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setText(item);
                  setAnimKey((prev) => prev + 1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  text === item
                    ? "bg-[#CF547A] text-white shadow"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Color Themes */}
        <div className="bg-[#120c18]/80 border border-white/10 p-4 rounded-2xl">
          <label className="text-xs text-gray-400 font-medium block mb-2">Color Theme</label>
          <div className="flex flex-wrap gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setSelectedTheme(theme);
                  setAnimKey((prev) => prev + 1);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                  selectedTheme.id === theme.id
                    ? "border-white bg-white/15 text-white"
                    : "border-white/10 bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: theme.gradient }} />
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
