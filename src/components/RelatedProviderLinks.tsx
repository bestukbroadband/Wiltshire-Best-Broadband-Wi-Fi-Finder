/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Check, Cpu, ArrowUpRight } from "lucide-react";
import { Provider } from "../types";
import { providersData } from "../data/providers";

interface RelatedProviderLinksProps {
  postcodeTargets: string[];
  townTargets: string[];
  onEnquire: (provider: Provider) => void;
}

export function RelatedProviderLinks({ postcodeTargets, townTargets, onEnquire }: RelatedProviderLinksProps) {
  // Find providers matching the postcode targets or town targets
  const matchedProviders = providersData.filter(provider => {
    const matchesPostcode = provider.postcodeAreas.some(prefix => 
      postcodeTargets.some(p => p.toUpperCase() === prefix.toUpperCase())
    );
    const matchesTown = provider.townsCovered.some(town => 
      townTargets.some(t => t.toLowerCase() === town.toLowerCase())
    );
    return matchesPostcode || matchesTown;
  });

  const displayProviders = matchedProviders.slice(0, 4); // Show top 4 matched

  if (displayProviders.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200/95 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm text-left">
      <div className="space-y-1">
        <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Cpu className="h-5 w-5 text-indigo-600" />
          Selected Broadband Providers
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          Listed broadband operators with confirmed physical connectivity rollouts matching our target county margins:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayProviders.map((provider) => (
          <div 
            key={provider.id} 
            className="p-5 border border-slate-100 rounded-2xl bg-slate-50/20 flex flex-col justify-between hover:border-slate-200 hover:shadow-sm transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900 font-sans tracking-tight">
                  {provider.providerName}
                </span>
                <span className="text-[10px] font-bold font-mono text-indigo-600 bg-indigo-50 border border-indigo-100/65 px-2.5 py-0.5 rounded-full uppercase">
                  {provider.networkType.split(" ")[0]}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left bg-white/70 backdrop-blur-xs p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider font-mono">Download</span>
                  <span className="text-sm font-black text-slate-800 tracking-tight">
                    {provider.averageDownloadSpeed} Mbps
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider font-mono">From</span>
                  <span className="text-sm font-black text-indigo-600 tracking-tight">
                    £{provider.monthlyPriceFrom.toFixed(2)}/mo
                  </span>
                </div>
              </div>

              {provider.bestFor && (
                <div className="flex items-start gap-1.5 text-xs text-slate-600">
                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Best for: <strong className="text-slate-800">{provider.bestFor}</strong></span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400">Availability: Checked Monthly</span>
              <button
                type="button"
                onClick={() => onEnquire(provider)}
                className="text-[11px] font-black font-sans text-indigo-600 hover:text-indigo-800 flex items-center gap-1 focus:outline-none"
              >
                Request Address Check <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProviderLinks;
