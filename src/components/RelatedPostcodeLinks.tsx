/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { postcodeAreasData } from "../data/postcodeAreas";

interface RelatedPostcodeLinksProps {
  postcodeTargets: string[];
  onPostcodeClick: (prefix: string) => void;
}

export function RelatedPostcodeLinks({ postcodeTargets, onPostcodeClick }: RelatedPostcodeLinksProps) {
  if (!postcodeTargets || postcodeTargets.length === 0) return null;

  // Resolve prefix details from our comprehensive database
  const targetDetails = postcodeTargets.map(prefix => {
    const matched = postcodeAreasData.find(p => p.postcodePrefix.toUpperCase() === prefix.toUpperCase());
    return {
      prefix,
      areaName: matched ? matched.areaName : "Wiltshire Parish",
      primaryTown: matched ? matched.primaryTown : "Wiltshire",
      slug: matched ? matched.slug : ""
    };
  });

  return (
    <div className="bg-white border border-slate-200/95 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm text-left">
      <div className="space-y-1">
        <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
          <MapPin className="h-5 w-5 text-indigo-600" />
          Targeted Postcode Districts
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          Check direct full-fibre and altnet broadband coverage across these parished coordinates:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {targetDetails.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onPostcodeClick(item.prefix)}
            className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/20 active:bg-indigo-50/50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <div className="space-y-1 pr-2">
              <span className="text-base font-black text-indigo-700 tracking-tight group-hover:text-indigo-800">
                {item.prefix}
              </span>
              <p className="text-xs font-semibold text-slate-700 truncate max-w-[150px]">
                {item.areaName}
              </p>
              <p className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                {item.primaryTown}
              </p>
            </div>
            <span className="p-1.5 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-indigo-100 group-hover:border-indigo-200 hover:scale-105 transition-all text-indigo-600">
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default RelatedPostcodeLinks;
