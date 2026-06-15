/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Sparkles, ShieldCheck, MapPin, ArrowRight, Star } from "lucide-react";

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

  return (
    <div 
      className={`relative rounded-3xl p-6 md:p-10 overflow-hidden border-2 border-slate-200 bg-white text-slate-900 flex flex-col justify-between min-h-[380px] shadow-sm ${className}`} 
      id="hero-comparison-banner"
    >
      {/* Visual Content Layer */}
      <div className="relative z-10 space-y-6 max-w-4xl">
        
        {/* Dynamic Category Badging */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 border border-brand-green/20 text-brand-green rounded-full text-xs font-black tracking-wider uppercase">
            <Sparkles className="h-3 w-3 text-brand-green" />
            Wiltshire Broadband Finder
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-full text-xs font-black tracking-wider">
            Independent local broadband information guide
          </span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#091e36] tracking-tight max-w-3xl leading-tight">
            Best broadband in Wiltshire
          </h1>
          
          <p className="text-sm md:text-base text-slate-800 leading-relaxed font-semibold max-w-3xl font-sans">
            Check listed broadband, WiFi and internet provider options across Wiltshire towns, villages and postcode areas. Enter your postcode area to see providers and availability checkers to try.
          </p>
        </div>

        {/* Central Search Card Layout */}
        <div className="space-y-4 max-w-3xl bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-200">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <label htmlFor="hero-search-input" className="sr-only">Wiltshire Postcode or Area</label>
              <input
                id="hero-search-input"
                type="text"
                placeholder="Enter postcode or area, e.g. SN10, SN12, SN15, BA14, SP1"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-3 pl-11 rounded-xl text-base bg-white border-2 border-slate-300 hover:border-slate-400 focus:border-brand-green text-slate-900 focus:ring-0 placeholder:text-slate-400 focus:outline-hidden transition-all font-sans font-bold"
              />
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-brand-green" />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              {/* Primary CTA */}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-brand-green hover:bg-brand-green-hover text-white text-base font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer select-none leading-none group"
              >
                <span>Check my area</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>

          {/* DYNAMIC POSTCODE HELPER & QUICK SELECTS */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200">
            <span className="text-xs text-slate-500 font-extrabold uppercase tracking-wide flex items-center gap-1">
              <MapPin className="h-3 w-3 text-brand-green" />
              Quick Check:
            </span>
            {["SN10", "Devizes", "SN12", "Melksham", "SN15", "Chippenham", "BA14", "Trowbridge", "SP1", "Salisbury"].map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => handleQuickSelect(area)}
                className="px-2.5 py-1 text-xs font-black bg-white hover:bg-brand-green/10 border border-slate-200 hover:border-brand-green text-slate-705 hover:text-brand-green rounded-lg transition-all cursor-pointer"
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Trust disclaimer card exactly beneath the search */}
        <div className="flex gap-2.5 items-start p-3 bg-slate-100/80 border border-slate-200 rounded-xl max-w-3xl">
          <ShieldCheck className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
          <p className="text-xs text-slate-800 font-semibold font-sans leading-relaxed">
            Availability varies by exact address. Always confirm speeds, prices and contract terms with the provider before ordering. Wiltshire Broadband Finder is an independent information guide; we do not sell broadband directly.
          </p>
        </div>

      </div>
    </div>
  );
}

export default HeroSearch;
