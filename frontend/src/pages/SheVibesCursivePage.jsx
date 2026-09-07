import React from "react";
import SheVibesCursiveAnimation from "../components/SheVibesCursiveAnimation";
import { Sparkles, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function SheVibesCursivePage() {
  return (
    <div className="relative pt-24 pb-20 bg-[#050507] min-h-screen text-white overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#CF547A]/20 to-[#E38DA3]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#FBBF24]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Navigation back */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/vibeathon"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to SheVibes
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#E38DA3] font-medium">
            <Heart className="w-4 h-4 fill-[#CF547A] text-[#CF547A] animate-pulse" />
            Crafted for SheVibes
          </div>
        </div>

        {/* Main Showcase Component */}
        <SheVibesCursiveAnimation />

        {/* Cursive Font Collection Showcase Section */}
        <div className="mt-20 border-t border-white/10 pt-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#CF547A]/10 border border-[#CF547A]/30 px-3.5 py-1 rounded-full text-xs font-semibold text-[#E38DA3] uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Luxury Typography Gallery
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Explore Cursive Styles for <span className="text-[#E38DA3]">SheVibes</span>
            </h3>
            <p className="text-sm text-gray-400 max-w-xl mx-auto mt-2">
              Compare hand-picked cursive typefaces with generous vertical padding to prevent any character clipping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Homemade Apple (Active - Apple Hello Style)",
                font: "'Homemade Apple', cursive",
                desc: "Authentic cursive signature handwriting script like the Apple Hello animation.",
                sample: "SheVibes",
              },
              {
                name: "Rock Salt",
                font: "'Rock Salt', cursive",
                desc: "Authentic, raw felt-marker handwritten script with modern edge.",
                sample: "SheVibes",
              },
              {
                name: "Satisfy",
                font: "'Satisfy', cursive",
                desc: "Sleek, fluid, highly legible feminine script with gentle modern flow.",
                sample: "SheVibes",
              },
              {
                name: "Italianno",
                font: "'Italianno', cursive",
                desc: "Fast, sleek calligraphic handwriting with refined, elegant loops.",
                sample: "SheVibes",
              },
              {
                name: "Pinyon Script",
                font: "'Pinyon Script', cursive",
                desc: "High-society luxury signature script with dramatic, stately flourishes.",
                sample: "SheVibes",
              },
              {
                name: "Birthstone",
                font: "'Birthstone', cursive",
                desc: "Modern bouncy delicate signature cursive with playful rhythm.",
                sample: "SheVibes",
              },
              {
                name: "Caveat",
                font: "'Caveat', cursive",
                desc: "Aesthetic modern handwritten script, casual yet stylish.",
                sample: "SheVibes",
              },
              {
                name: "Playfair Italic",
                font: "'Playfair Display', Georgia, serif",
                style: "italic",
                desc: "Timeless luxury editorial italic cursive serif.",
                sample: "SheVibes",
              },
              {
                name: "Dancing Script",
                font: "'Dancing Script', cursive",
                desc: "Dynamic, casual cursive with friendly bounces and smooth curves.",
                sample: "shevibes",
              },
              {
                name: "Alex Brush",
                font: "'Alex Brush', cursive",
                desc: "Classic calligraphic script with bold stroke contrast.",
                sample: "SheVibes",
              },
              {
                name: "Sacramento",
                font: "'Sacramento', cursive",
                desc: "Chic & minimalist handwriting inspired by 1950s hand lettering.",
                sample: "shevibes",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-[#120c18]/60 hover:bg-[#181122]/90 border border-white/10 hover:border-[#CF547A]/50 p-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#CF547A]/20 flex flex-col justify-between overflow-visible"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#E38DA3] transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                      Font #{idx + 1}
                    </span>
                  </div>

                  {/* Sample Text Display - Extra Padding to Prevent Clipping */}
                  <div className="py-6 px-2 text-center overflow-visible">
                    <div
                      className="text-5xl sm:text-6xl py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#F4C4C9] via-[#E38DA3] to-[#CF547A] group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(207,84,122,0.4)] overflow-visible leading-relaxed"
                      style={{ fontFamily: item.font, fontStyle: item.style || "normal" }}
                    >
                      {item.sample}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-4 leading-relaxed border-t border-white/5 pt-3">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
