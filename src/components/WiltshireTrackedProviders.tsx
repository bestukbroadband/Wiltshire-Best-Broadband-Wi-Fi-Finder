/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { CheckCircle, Search, ExternalLink, Info, MapPin } from "lucide-react";
import { providerDirectoryData } from "../data/providerDirectory";
import { buildTrackedUrl } from "../data/trackingConfig";

interface WiltshireTrackedProvidersProps {
  onCheckPostcodeClick?: () => void;
  onNavigateToDirectory?: () => void;
  onNavigateToProvider?: (slug: string) => void;
}

export function WiltshireTrackedProviders({
  onCheckPostcodeClick,
  onNavigateToDirectory,
  onNavigateToProvider
}: WiltshireTrackedProvidersProps) {
  // Filter only Wiltshire relevant providers for this homepage/SEO block
  const wiltshireProviders = providerDirectoryData.filter(p => p.wiltshireRelevance);

  return (
    <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6" id="wiltshire-tracked-providers-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Wiltshire Coverage Scope
          </div>
          <h2 className="text-xl md:text-2xl font-black font-sans tracking-tight text-white leading-tight">
            Providers we track for Wiltshire availability
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            We actively monitor listed network infrastructure, physical cabinets, and regional wireless beams across Wiltshire parishes and Salisbury Plain to provide granular connection analysis.
          </p>
        </div>

        {onNavigateToDirectory && (
          <button
            onClick={onNavigateToDirectory}
            className="shrink-0 self-start md:self-end px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700/60"
            id="view-full-directory-btn"
          >
            <span>View Full Directory</span>
            <Search className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Grid of highly polished tracker cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wiltshireProviders.map((provider) => {
          const isRegionalAndAlt = provider.isAltNet && !provider.isMainstream;
          return (
            <div
              key={provider.providerId}
              className="bg-slate-950/40 hover:bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4 transition-all flex flex-col justify-between gap-3 group relative"
              id={`tracked-card-${provider.providerId}`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-100 group-hover:text-white transition-colors leading-none">
                      {provider.displayName}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium font-sans mt-1">
                      {provider.networkType} &bull; {provider.retailOrWholesale === "both" ? "Retail & Wholesale" : provider.retailOrWholesale === "wholesale" ? "Wholesale Only" : "Retail Connection"}
                    </p>
                  </div>
                  <span className={`text-[9px] font-bold font-sans uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    provider.isMainstream 
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                      : provider.isSatelliteProvider 
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" 
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}>
                    {provider.isMainstream ? "Mainstream" : provider.isSatelliteProvider ? "LEO Satellite" : "Alternative Net"}
                  </span>
                </div>

                <p className="text-[11px] text-slate-350 leading-relaxed italic line-clamp-2">
                  &ldquo;{provider.coverageNotes}&rdquo;
                </p>

                {/* Categories Pills */}
                <div className="flex flex-wrap gap-1">
                  {provider.providerCategories.slice(0, 2).map((cat, idx) => (
                    <span 
                      key={idx}
                      className="text-[9px] font-mono bg-slate-900/80 text-slate-400 border border-slate-800/60 px-1.5 py-0.5 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between gap-2 mt-1">
                {/* Internal Profile Link */}
                {onNavigateToProvider && (
                  <button
                    onClick={() => onNavigateToProvider(provider.slug)}
                    className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer bg-none border-none p-0"
                    id={`view-profile-${provider.providerId}`}
                  >
                    <span>View Profile</span>
                    <ArrowRightIcon />
                  </button>
                )}

                {/* Direct action Check button */}
                <a
                  href={`${provider.baseUrl}?utm_source=${provider.utmSource || "wiltshire_broadband_finder"}&utm_medium=tracked_section&utm_campaign=${provider.utmCampaign || "provider_link"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  id={`offsite-link-${provider.providerId}`}
                >
                  <span>Visit Site</span>
                  <ExternalLink className="h-2.5 w-2.5 text-slate-500" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Structured Legal Disclaimer in UK English */}
      <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3.5 flex items-start gap-2.5 text-[11px] text-slate-450 leading-relaxed">
        <Info className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-300">Wiltshire Tracker Guidance:</span> Provider relevance and inclusion in our tracking directory are determined based on reported regional network lines, listed local coverage, or potential availability around Wiltshire parishes. Final speed rates, installation times, and pricing must be verified directly at address level. Please complete a postcode check before booking setups.
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
