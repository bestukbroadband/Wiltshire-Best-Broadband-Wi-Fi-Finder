/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Sparkles, ShieldAlert, MapPin, ArrowRight, Star } from "lucide-react";
import { HeroVideoBackground } from "./HeroVideoBackground";

interface HeroSearchProps {
  onSearchSubmit: (query: string) => void;
  onListProviderClick: () => void;
  className?: string;
}

export function HeroSearch({ onSearchSubmit, onListProviderClick, className = "" }: HeroSearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(query);
  };

  const handleQuickSelect = (area: string) => {
    setQuery(area);
    onSearchSubmit(area);
  };

  const handleScrollToWeeklyOffers = () => {
    const section = document.getElementById("best-deals-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div 
      className={`relative rounded-3xl p-6 md:p-12 overflow-hidden shadow-2xl border-2 border-slate-800 bg-[#0c101d] text-white flex flex-col justify-between min-h-[480px] md:min-h-[520px] ${className}`} 
      id="hero-comparison-banner"
    >
      {/* 1. Muted Looping Video Background with mobile & motion fallbacks */}
      <HeroVideoBackground 
        videoUrl="/videos/wiltshire-broadband-hero.mp4"
        posterImage="/images/wiltshire-broadband-poster.jpg"
        overlayOpacity={0.72}
      />

      {/* 2. Visual Content Layer */}
      <div className="relative z-10 space-y-8 max-w-4xl">
        
        {/* Dynamic Category Badging */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold rounded-full text-[10.5px] font-extrabold tracking-widest uppercase shadow-xs">
            <Sparkles className="h-3 w-3 text-brand-gold animate-pulse" />
            Wiltshire Broadband Intelligence Hub
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 border border-slate-705 text-slate-350 rounded-full text-[10.5px] font-bold tracking-wider">
            Independent Advisory Platform
          </span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-4">
          <h1 className="hero-h1 text-white max-w-3xl">
            Find local broadband options for <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-brand-gold via-amber-300 to-yellow-200 bg-clip-text text-transparent">
              Wiltshire
            </span> villages and towns
          </h1>
          
          <p className="text-base text-slate-300 leading-relaxed font-semibold max-w-4xl text-pretty font-sans">
            Compare full fibre networks, local altnets, and national providers across Wiltshire. Search your postcode, town, or village to see listed deals, editor reviews, and direct address-level check options.
          </p>
        </div>

        {/* Central Search Card Layout */}
        <div className="space-y-4 max-w-3xl bg-slate-900/40 p-1 md:p-2 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                id="hero-search-input"
                type="text"
                placeholder="Enter SN10, BA14, Devizes, Worton village..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-4 pl-11 rounded-xl text-base bg-slate-950/80 border-2 border-slate-700 hover:border-slate-500 focus:border-brand-gold/90 text-white focus:ring-0 placeholder:text-slate-400 focus:outline-hidden transition-all font-sans font-bold"
              />
              <Search className="absolute left-4 top-4 h-4 w-4 text-brand-gold" />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              {/* Primary CTA */}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-4 bg-brand-gold hover:bg-brand-gold-hover text-slate-950 text-base font-black rounded-xl transition-all shadow-lg hover:shadow-brand-gold/15 flex items-center justify-center gap-1.5 cursor-pointer select-none leading-none group"
              >
                <span>Check my postcode</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={handleScrollToWeeklyOffers}
                className="w-full sm:w-auto px-5 py-4 bg-slate-805 hover:bg-slate-800 border-2 border-slate-700 text-slate-200 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Star className="h-3.5 w-3.5 text-brand-gold shrink-0 fill-brand-gold/20" />
                <span>View weekly offer</span>
              </button>
            </div>
          </form>

          {/* DYNAMIC POSTCODE HELPER & QUICK SELECTS */}
          <div className="flex flex-wrap items-center gap-2 px-2 pt-1">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest flex items-center gap-1">
              <MapPin className="h-3 w-3 text-brand-gold" />
              Quick Searches:
            </span>
            {["Worton", "Devizes", "Calne", "Pewsey", "Marlborough", "Lacock", "SN10", "BA14"].map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => handleQuickSelect(area)}
                className="px-2.5 py-1 text-[11px] font-black bg-slate-950/60 hover:bg-brand-gold/15 border border-slate-800 hover:border-brand-gold text-slate-300 hover:text-brand-gold rounded-lg transition-all cursor-pointer"
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Coverage & Compliance Footnotes Grid */}
        <div className="pt-6 border-t border-slate-805/60 grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-300 leading-relaxed font-sans">
          
          {/* A. Local Coverage Line */}
          <div className="flex gap-3 items-start">
            <div className="bg-brand-gold/10 text-brand-gold p-2.5 rounded-xl border border-brand-gold/20 shrink-0" aria-hidden="true">
              <MapPin className="h-4.5 w-4.5" />
            </div>
            <div className="space-y-1">
              <span className="font-extrabold text-white block uppercase tracking-wider text-[11px] font-sans">
                Broadband Coverage Areas:
              </span>
              <p className="text-slate-350">
                Covering Wiltshire villages, market towns and border areas across SN, SP, BA, GL and RG postcodes.
              </p>
            </div>
          </div>

          {/* B. Trust Disclaimer */}
          <div className="flex gap-3 items-start">
            <div className="bg-slate-800/60 text-slate-400 p-2.5 rounded-xl border border-slate-700 shrink-0" aria-hidden="true">
              <ShieldAlert className="h-4.5 w-4.5" />
            </div>
            <div className="space-y-1">
              <span className="font-extrabold text-white block uppercase tracking-wider text-[11px] font-sans">
                Accuracy &amp; Verified Checks:
              </span>
              <p className="text-slate-350">
                Prices, speeds and availability can vary by exact address. We show listed offers and local guidance, then help you request a proper address level check.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default HeroSearch;
