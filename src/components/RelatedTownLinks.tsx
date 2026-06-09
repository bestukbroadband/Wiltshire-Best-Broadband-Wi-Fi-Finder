/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Building2, ChevronRight } from "lucide-react";
import { townsData } from "../data/towns";

interface RelatedTownLinksProps {
  townTargets: string[];
  onTownClick: (id: string) => void;
}

export function RelatedTownLinks({ townTargets, onTownClick }: RelatedTownLinksProps) {
  if (!townTargets || townTargets.length === 0) return null;

  // Resolve matching towns
  const mappedTowns = townTargets.map(slugOrId => {
    const matched = townsData.find(t => t.id.toLowerCase() === slugOrId.toLowerCase() || t.name.toLowerCase() === slugOrId.toLowerCase());
    return matched || { id: slugOrId.toLowerCase(), name: slugOrId.charAt(0).toUpperCase() + slugOrId.slice(1), shortIntro: "Wiltshire community with active telecom pipelines." };
  });

  return (
    <div className="bg-white border border-slate-200/95 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm text-left">
      <div className="space-y-1">
        <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Building2 className="h-5 w-5 text-indigo-600" />
          Targeted Towns & Surrounds
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          Review regional broadband coverage indices inside these core Wiltshire municipalities:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {mappedTowns.map((town, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onTownClick(town.id)}
            className="group flex flex-col justify-between p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50/35 active:bg-indigo-50/40 transition-all text-left focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <div className="space-y-1.5 pb-2">
              <span className="text-sm font-black text-slate-800 tracking-tight group-hover:text-indigo-600">
                {town.name}
              </span>
              {town.shortIntro && (
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {town.shortIntro}
                </p>
              )}
            </div>
            
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 uppercase tracking-widest leading-none">
              <span>Explore {town.name}</span>
              <ChevronRight className="h-3 w-3 shrink-0 text-slate-400 group-hover:text-indigo-500" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default RelatedTownLinks;
