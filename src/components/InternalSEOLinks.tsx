/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { 
  Sparkles, 
  MapPin, 
  Building2, 
  Cpu, 
  Layers, 
  BookOpen, 
  ArrowRight 
} from "lucide-react";
import { 
  mainSeoPages, 
  postcodePages, 
  townPages, 
  providerPages, 
  broadbandTypePages, 
  guidePages,
  SEOInternalLink
} from "../data/internalLinks";

interface InternalSEOLinksProps {
  onPageClick: (pageId: string) => void;
  onPostcodeClick: (prefix: string) => void;
  onTownClick: (townId: string) => void;
  id?: string;
}

export function InternalSEOLinks({ onPageClick, onPostcodeClick, onTownClick, id = "internal-seo-links" }: InternalSEOLinksProps) {
  
  const handleLinkClick = (link: SEOInternalLink) => {
    switch (link.type) {
      case "seo-page":
      case "broadband-type":
      case "guide":
        onPageClick(link.targetId);
        break;
      case "postcode":
        onPostcodeClick(link.targetId);
        break;
      case "town":
        onTownClick(link.targetId);
        break;
      case "provider":
        onPageClick("alt-net");
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-10 mt-12 pt-10 border-t border-slate-150 text-left" id={id}>
      <div className="space-y-2 max-w-2xl">
        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-widest inline-block">
          Explore Wiltshire Broadband Finder
        </span>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          Comprehensive Local Broadband Directory
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          Whether you are comparing listed alternative networks in parished villages or exploring mainstream coverage across core towns, use our guides to research and confirm availability options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* BLOCK 1: Popular Wiltshire Searches */}
        <div className="bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between" id={`${id}-block-popular`}>
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                <Sparkles className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase tracking-wider font-mono">
                Popular Wiltshire Searches
              </h3>
            </div>
            <p className="text-[11px] text-slate-550 leading-relaxed mb-4">
              Direct access links to Wiltshire's most heavily searched editorial comparisons and guide listings:
            </p>
            <div className="space-y-2">
              {mainSeoPages.map((link, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLinkClick(link)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-50 hover:border-indigo-100 hover:bg-slate-50/50 flex items-center justify-between transition-all group font-medium text-xs text-slate-700"
                >
                  <span className="group-hover:text-indigo-600 truncate">{link.label}</span>
                  <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BLOCK 2: Compare by Postcode */}
        <div className="bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between" id={`${id}-block-postcode`}>
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <span className="p-1.5 bg-sky-50 text-sky-600 rounded-lg shrink-0">
                <MapPin className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase tracking-wider font-mono">
                Compare by Postcode
              </h3>
            </div>
            <p className="text-[11px] text-slate-550 leading-relaxed mb-4">
              Get detailed speed statistics, local cabinet distances, and coverage profiles by postcode:
            </p>
            <div className="space-y-2">
              {postcodePages.map((link, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLinkClick(link)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-50 hover:border-sky-100 hover:bg-slate-50/50 flex items-center justify-between transition-all group font-medium text-xs text-slate-700"
                >
                  <span className="group-hover:text-sky-700 truncate">{link.label}</span>
                  <span className="text-[9px] font-mono font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded group-hover:bg-sky-100">
                    View
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BLOCK 3: Compare by Town */}
        <div className="bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between" id={`${id}-block-town`}>
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                <Building2 className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase tracking-wider font-mono">
                Compare by Town
              </h3>
            </div>
            <p className="text-[11px] text-slate-550 leading-relaxed mb-4">
              Explore municipal-level fibre availability and Altnet expansion timelines across towns:
            </p>
            <div className="space-y-2">
              {townPages.map((link, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLinkClick(link)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-50 hover:border-emerald-100 hover:bg-slate-50/50 flex items-center justify-between transition-all group font-medium text-xs text-slate-700"
                >
                  <span className="group-hover:text-emerald-700 truncate">{link.label}</span>
                  <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BLOCK 4: Broadband Types */}
        <div className="bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between" id={`${id}-block-types`}>
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <span className="p-1.5 bg-pink-50 text-pink-600 rounded-lg shrink-0">
                <Layers className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase tracking-wider font-mono">
                Broadband Types
              </h3>
            </div>
            <p className="text-[11px] text-slate-550 leading-relaxed mb-4">
              Decide whether copper FTTC, hybrid wireless, or full fibre FTTP is appropriate for your home:
            </p>
            <div className="space-y-2">
              {broadbandTypePages.map((link, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLinkClick(link)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-50 hover:border-pink-100 hover:bg-slate-50/50 flex items-center justify-between transition-all group font-medium text-xs text-slate-700"
                >
                  <span className="group-hover:text-pink-600 truncate">{link.label}</span>
                  <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-pink-500 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BLOCK 5: Provider Guides */}
        <div className="bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between" id={`${id}-block-providers`}>
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                <Cpu className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase tracking-wider font-mono">
                Provider Guides
              </h3>
            </div>
            <p className="text-[11px] text-slate-550 leading-relaxed mb-4">
              Compare independent Altnets operating private telephone corridors inside Wiltshire limits:
            </p>
            <div className="space-y-2">
              {providerPages.map((link, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLinkClick(link)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-50 hover:border-amber-100 hover:bg-slate-50/50 flex items-center justify-between transition-all group font-medium text-xs text-slate-700"
                >
                  <span className="group-hover:text-amber-700 truncate">{link.label}</span>
                  <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BLOCK 6: Related Guides */}
        <div className="bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between" id={`${id}-block-guides`}>
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <span className="p-1.5 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                <BookOpen className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase tracking-wider font-mono">
                Related Guides
              </h3>
            </div>
            <p className="text-[11px] text-slate-550 leading-relaxed mb-4">
              Consult Wiltshire Digital and Telecom editors for the latest market tracking and contract advice:
            </p>
            <div className="space-y-2">
              {guidePages.map((link, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLinkClick(link)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-50 hover:border-purple-100 hover:bg-slate-50/50 flex items-center justify-between transition-all group font-medium text-xs text-slate-700"
                >
                  <span className="group-hover:text-purple-600 truncate">{link.label}</span>
                  <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
