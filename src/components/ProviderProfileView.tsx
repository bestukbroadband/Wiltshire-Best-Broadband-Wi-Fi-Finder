/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useMemo } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  CheckCircle,
  AlertTriangle,
  ExternalLink, 
  Star, 
  Info, 
  Network,
  Tag, 
  ShieldCheck, 
  Clock, 
  Sliders, 
  Cpu
} from "lucide-react";
import { DirectoryProvider } from "../types";
import { JsonLdSchema } from "./JsonLdSchema";
import { 
  createWebPageSchema, 
  createBreadcrumbSchema, 
  createOfferSchema, 
  createReviewSchema, 
  createFAQSchema 
} from "../data/schemaMarkup";

interface ProviderProfileViewProps {
  provider: DirectoryProvider | null;
  onBackToDirectory: () => void;
  onPostcodeClick?: (prefix: string) => void;
  onTownClick?: (townId: string) => void;
}

export function ProviderProfileView({
  provider,
  onBackToDirectory,
  onPostcodeClick,
  onTownClick
}: ProviderProfileViewProps) {
  if (!provider) {
    return (
      <div className="space-y-4 text-center py-12" id="provider-profile-not-found">
        <h2 className="text-xl font-bold text-white">Provider Profile Not Found</h2>
        <p className="text-xs text-slate-400">The requested custom provider connection page cannot be located.</p>
        <button 
          onClick={onBackToDirectory}
          className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-705 transition-colors cursor-pointer"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  // Generate UTM strings
  const trackingParams = `utm_source=${provider.utmSource || "wiltshire_broadband_finder"}&utm_medium=profile_page&utm_campaign=${provider.slug}`;
  const trackedUrl = provider.baseUrl ? `${provider.baseUrl}?${trackingParams}` : provider.websiteUrl;

  // 1. Compile Rich Schema JSON LD Arrays
  const breadcrumbSchema = useMemo(() => {
    return createBreadcrumbSchema([
      { name: "Home", url: "https://www.wiltshirebroadbandfinder.co.uk/" },
      { name: "Broadband Providers Directory", url: "https://www.wiltshirebroadbandfinder.co.uk/broadband-providers" },
      { name: provider.displayName, url: `https://www.wiltshirebroadbandfinder.co.uk/providers/${provider.slug}` }
    ]);
  }, [provider]);

  const webPageSchema = useMemo(() => {
    return createWebPageSchema(
      provider.seoTitle || `${provider.displayName} Wiltshire Coverage & Rates Directory`,
      provider.metaDescription || `Compare ${provider.displayName} speeds, coverage notes, parished targets and business plans in Wiltshire.`,
      `https://www.wiltshirebroadbandfinder.co.uk/providers/${provider.slug}`,
      `${provider.displayName} broadband Wiltshire`
    );
  }, [provider]);

  const offerSchema = useMemo(() => {
    return createOfferSchema(
      "Listed Symmetrical or Gigabit Connection",
      29.99,
      "GBP",
      provider.displayName,
      `https://www.wiltshirebroadbandfinder.co.uk/providers/${provider.slug}`
    );
  }, [provider]);

  const reviewSchema = useMemo(() => {
    return createReviewSchema(
      provider.displayName,
      8.6,
      provider.editorNotes || `Excellent regional provider offering fast fiber drops in Wiltshire parishes.`,
      "Cane Editorial Team"
    );
  }, [provider]);

  const localFaqSchema = useMemo(() => {
    return createFAQSchema([
      {
        question: `Is ${provider.displayName} available in rural Wiltshire?`,
        answer: `${provider.displayName} coverage varies by street and address. Some rural Wiltshire villages have active fiber lines laid, while other homes may require a satellite or wireless unit. Availability must be confirmed at address check level.`
      },
      {
        question: `How do I sign up for ${provider.displayName}?`,
        answer: `If ${provider.displayName} is listed in your area, you can visit their site directly to confirm final available speeds, prices, and installation times. Contracts typically span 12 to 24 months.`
      }
    ]);
  }, [provider]);

  return (
    <div className="space-y-8" id={`provider-profile-view-${provider.providerId}`}>
      {/* Schema Injection */}
      <JsonLdSchema schema={breadcrumbSchema} id="profile-breadcrumb-schema" />
      <JsonLdSchema schema={webPageSchema} id="profile-webpage-schema" />
      <JsonLdSchema schema={offerSchema} id="profile-offer-schema" />
      <JsonLdSchema schema={reviewSchema} id="profile-review-schema" />
      <JsonLdSchema schema={localFaqSchema} id="profile-faqs-schema" />

      {/* Back button */}
      <div>
        <button
          onClick={onBackToDirectory}
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors bg-none border-none p-0 cursor-pointer font-sans"
          id="back-to-directory-btn"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Broadband Providers Directory</span>
        </button>
      </div>

      {/* Hero Header block */}
      <div className="bg-gradient-to-r from-slate-900/80 to-slate-950/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
        
        {/* Subtle glowing ambient effect */}
        <div className="absolute right-0 top-0 -translate-y-20 translate-x-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold font-mono tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                {provider.isMainstream ? "Mainstream Network" : "Alternative Network (AltNet)"}
              </span>
              
              {provider.wiltshireRelevance ? (
                <span className="text-[10px] font-bold font-sans uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                  Wiltshire Relevance Confirmed
                </span>
              ) : (
                <span className="text-[10px] font-sans font-medium text-slate-400 border border-slate-800 bg-slate-950/30 px-2.5 py-0.5 rounded-full">
                  UK Wide National Network
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-black font-sans tracking-tight text-white leading-tight">
              {provider.displayName} Profile &amp; Coverage
            </h1>

            <p className="text-xs text-slate-400 font-sans">
              <span className="text-slate-500 font-semibold font-sans">Primary infrastructure:</span> {provider.networkType} &bull; <span className="font-semibold text-slate-500 font-sans">Operations model:</span> {provider.retailOrWholesale === "both" ? "Retail and Wholesale leasing" : provider.retailOrWholesale === "wholesale" ? "Wholesale infrastructure owner" : "Retail customer provider"}
            </p>
          </div>

          <a
            href={trackedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 self-start md:self-stretch flex items-center justify-center px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl text-xs font-bold transition-all gap-2 cursor-pointer shadow-lg shadow-emerald-500/5 hover:-translate-y-0.5"
            id="profile-cta-check-postcode"
          >
            <span>{provider.ctaLabel || "Check Availability"}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Info Grid block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800/60 relative z-10" id="profile-meta-grid">
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-905/30">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-sans block mb-1">Editor Score</span>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span className="text-sm font-extrabold text-white font-mono">8.6 / 10</span>
            </div>
          </div>

          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-905/30">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-sans block mb-1">Network Owner</span>
            <span className="text-xs font-bold text-slate-200 font-sans block truncate">
              {provider.isNetworkOwner ? "Own In-House Lines" : "Leases Wholesale Lines"}
            </span>
          </div>

          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-905/30">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-sans block mb-1">Contract Status</span>
            <span className="text-xs font-bold text-slate-200 font-sans block truncate">
              {provider.isBusinessProvider ? "Home & Business" : "Home Consumer Only"}
            </span>
          </div>

          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-905/30">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-sans block mb-1">Last Data Check</span>
            <div className="flex items-center gap-1 text-slate-200 text-xs font-bold font-sans">
              <Clock className="h-3 w-3 text-slate-500" />
              <span>{provider.lastCheckedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Editorial and Description block Column */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 md:p-6 space-y-4">
            <h2 className="text-lg font-black font-sans text-white uppercase tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Editorial Assessment &amp; Overview</span>
            </h2>

            {provider.editorNotes && (
              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                {provider.editorNotes}
              </p>
            )}

            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/40">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-sans block mb-1">Coverage Scope Statement</span>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                &ldquo;{provider.coverageNotes}&rdquo;
              </p>
            </div>
          </div>

          {/* Regional coverage map details */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 md:p-6 space-y-4">
            <h2 className="text-lg font-black font-sans text-white uppercase tracking-tight flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>Regional Coverage &amp; Parished Targets</span>
            </h2>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Listed network lines are deployed on a street-specific basis. This provider has indicated active customer deployments or infrastructure presence in the following areas:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/40 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-sans block">Primary Towns Tracked</span>
                {provider.townTargets && provider.townTargets.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5" id="profile-town-links">
                    {provider.townTargets.map((town, idx) => (
                      <button
                        key={idx}
                        onClick={() => onTownClick && onTownClick(town.toLowerCase())}
                        className="text-[10px] font-bold font-sans bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 px-2 py-1 rounded hover:text-white transition-all cursor-pointer"
                        id={`profile-town-btn-${idx}`}
                      >
                        {town}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-500">None registered specifically. Available on general UK-wide grids.</span>
                )}
              </div>

              <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/40 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-sans block">Primary Outward Postcodes</span>
                {provider.postcodeTargets && provider.postcodeTargets.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5" id="profile-postcode-links">
                    {provider.postcodeTargets.map((prefix, idx) => (
                      <button
                        key={idx}
                        onClick={() => onPostcodeClick && onPostcodeClick(prefix)}
                        className="text-[10px] font-mono bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 px-2 py-1 rounded hover:text-white transition-all cursor-pointer"
                        id={`profile-postcode-btn-${idx}`}
                      >
                        {prefix}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-500">No specific postcode centroids mapped yet. available region-wide.</span>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Technical Specs Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <h3 className="font-sans font-extrabold text-sm text-white flex items-center gap-2">
              <Sliders className="h-4 w-4 text-emerald-400" />
              <span>Technical Specifications</span>
            </h3>

            <div className="space-y-3 Divide-y divide-slate-800/60" id="profile-specs-list">
              <div className="flex justify-between text-xs py-2">
                <span className="text-slate-500">Carrier Class</span>
                <span className="font-bold text-slate-200">
                  {provider.isMainstream ? "Mainstream Tier-1" : "Regional AltNet"}
                </span>
              </div>

              <div className="flex justify-between text-xs py-2 pt-2">
                <span className="text-slate-500">Network Topology</span>
                <span className="font-bold text-slate-200">
                  {provider.isSatelliteProvider ? "LEO Satellite" : provider.networkType}
                </span>
              </div>

              <div className="flex justify-between text-xs py-2 pt-2">
                <span className="text-slate-500">Access Type</span>
                <span className="font-bold text-slate-200 uppercase">
                  {provider.retailOrWholesale}
                </span>
              </div>

              <div className="flex justify-between text-xs py-2 pt-2">
                <span className="text-slate-500">Business Services</span>
                <span className="font-bold text-slate-200">
                  {provider.isBusinessProvider ? "Active Leased Lines" : "Home broadband Only"}
                </span>
              </div>

              {provider.alternativeNames && provider.alternativeNames.length > 0 && (
                <div className="pt-3 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">Registered Brand Aliases</span>
                  <div className="flex flex-wrap gap-1">
                    {provider.alternativeNames.map((alias, aIdx) => (
                      <span 
                        key={aIdx} 
                        className="bg-slate-950/60 text-[10px] text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded font-sans"
                      >
                        {alias}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Disclaimer */}
          <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4 flex items-start gap-2.5 text-[11px] text-slate-350 leading-relaxed">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-300">Address-level Notice:</span> This information is listed based on available carrier filings. Physical connection speeds, lines ownership and contract conditions must be validated directly at postcode level before committing to a setup.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
