/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Provider } from "../types";
import { ArrowUp, ArrowDown, MapPin, BadgeAlert, Check, ExternalLink } from "lucide-react";
import { PriceDetails } from "./PriceDetails";
import { EditorScoreCard } from "./EditorScoreCard";
import { ProviderSourceNote } from "./ProviderSourceNote";

import { providerLinksData } from "../data/providerLinks";
import { buildTrackedUrl } from "../data/trackingConfig";

interface ProviderCardProps {
  key?: any;
  provider: Provider;
  onEnquire: (provider: Provider) => void;
  className?: string;
}

export function ProviderCard({ provider, onEnquire, className = "" }: ProviderCardProps) {
  if (!provider) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-250 text-yellow-800 text-xs rounded-xl">
        Provider data is missing or unavailable.
      </div>
    );
  }

  const provId = (provider.id || provider.providerId || "").toLowerCase();
  const links = providerLinksData[provId];
  const hasChecker = !!(links?.availabilityCheckerUrl);
  const hasDeals = !!(links?.broadbandDealsUrl);
  const hasWebsite = !!(links?.officialWebsite);

  let primaryBtn = null;
  let secondaryBtn = null;

  if (hasChecker) {
    const trackerUrl = buildTrackedUrl(links.availabilityCheckerUrl, "default", { utm_term: "postcode_or_area" });
    primaryBtn = (
      <a
        href={trackerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 px-3 text-xs font-black text-center bg-brand-green hover:bg-brand-green-hover text-white rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
      >
        Check availability
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  } else if (hasWebsite) {
    const trackerUrl = buildTrackedUrl(links.officialWebsite, "default", { utm_term: "postcode_or_area" });
    primaryBtn = (
      <a
        href={trackerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 px-3 text-xs font-black text-center bg-brand-green hover:bg-brand-green-hover text-white rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
      >
        Visit provider
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  } else {
    primaryBtn = (
      <button
        disabled
        className="w-full py-2.5 px-3 text-xs font-bold text-center bg-slate-200 text-slate-500 rounded-lg cursor-not-allowed"
      >
        Provider link being reviewed
      </button>
    );
  }

  if (hasDeals) {
    const trackerUrl = buildTrackedUrl(links.broadbandDealsUrl, "default", { utm_term: "postcode_or_area" });
    secondaryBtn = (
      <a
        href={trackerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 px-3 text-xs font-black text-center border-2 border-brand-green bg-white text-brand-green hover:bg-slate-50 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
      >
        View provider packages
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }

  // Derive legal, accurate label in accordance with Part 4
  let statusText = "Provider checker required";
  let statusColor = "bg-slate-100 text-slate-800 border-slate-300";

  const isNational = [
    "bt", "ee", "sky", "now", "now-broadband", "talktalk", "vodafone", "plusnet", "zen", "zen-internet", "virgin", "virgin-media", "three", "three-broadband", "starlink"
  ].includes(provId);

  if (isNational) {
    statusText = "Provider checker required";
    statusColor = "bg-slate-100 text-slate-800 border-slate-350";
  } else {
    // Alternate or Regional
    const textLower = (provider.availabilityStatus || "").toLowerCase();
    if (textLower.includes("address")) {
      statusText = "Address check required";
      statusColor = "bg-blue-50 text-blue-900 border-blue-250";
    } else if (textLower.includes("regional")) {
      statusText = "Regional relevance";
      statusColor = "bg-stone-100 text-stone-900 border-stone-250";
    } else if (textLower.includes("reviewed") || textLower.includes("pending")) {
      statusText = "Review pending";
      statusColor = "bg-yellow-50 text-amber-900 border-yellow-250";
    } else if (provider.sourceName && (textLower.includes("verified") || textLower.includes("ofcom") || textLower.includes("thinkbroadband"))) {
      statusText = "Verified source";
      statusColor = "bg-teal-50 text-teal-900 border-teal-250";
    } else {
      statusText = "Address check required"; // Default safe fallback
      statusColor = "bg-blue-50 text-blue-900 border-blue-250";
    }
  }

  return (
    <div
      className={`bg-white border-2 border-slate-200 rounded-2xl shadow-xs hover:border-brand-green/40 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between ${className}`}
      id={`prov-card-${provider.id}`}
    >
      {/* CARD TOP INFO */}
      <div className="p-5 space-y-4">
        {/* LOGO AND BRAND HEADER */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="inline-block text-[10px] font-black text-slate-800 bg-slate-100 rounded-sm px-1.5 py-0.5 tracking-wider uppercase">
                {provider.networkType}
              </span>
              <span className={`inline-block text-[10px] font-black px-1.5 py-0.5 rounded border ${statusColor} uppercase tracking-wider`}>
                {statusText}
              </span>
            </div>
            
            <div className="flex items-center gap-2.5 pt-1">
              <div className="h-10 px-3 bg-brand-green text-white border border-brand-green/20 text-xs font-black rounded-lg flex items-center justify-center tracking-tight uppercase shadow-xs">
                {provider.logoText}
              </div>
              <div>
                <h3 className="text-sm font-black text-[#091e36] leading-none">
                  {provider.providerName}
                </h3>
                <span className="text-xs text-slate-705 font-bold">
                  {provider.packageName}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="inline-block text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-250">
              {provider.bestFor}
            </span>
          </div>
        </div>

        {/* SPEEDS BAR SUMMARY */}
        <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-green/10 rounded-md text-brand-green shrink-0 border border-brand-green/20">
              <ArrowDown className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block">Avg. Download</span>
              <span className="text-base font-black text-brand-green font-sans tracking-tight">
                {provider.averageDownloadSpeed} <span className="text-[10px] font-bold text-slate-500 font-sans">Mbps</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-50 rounded-md text-amber-700 shrink-0 border border-amber-205">
              <ArrowUp className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block">Avg. Upload</span>
              <span className="text-base font-black text-slate-800 font-sans tracking-tight">
                {provider.averageUploadSpeed} <span className="text-[10px] font-bold text-slate-500 font-sans">Mbps</span>
              </span>
            </div>
          </div>
        </div>

        {/* PRICE BREAKDOWN COMPONENT */}
        <PriceDetails
          monthlyPrice={provider.monthlyPrice}
          monthlyPriceFrom={provider.monthlyPriceFrom}
          monthlyPriceAfterContract={provider.monthlyPriceAfterContract}
          priceAfterMinimumTerm={provider.priceAfterMinimumTerm}
          contractLength={provider.contractLength}
          setupFee={provider.setupFee}
          routerCost={provider.routerCost}
          routerIncluded={provider.routerIncluded}
          installationFee={provider.installationFee}
          deliveryFee={provider.deliveryFee}
          midContractPriceRise={provider.midContractPriceRise}
          knownAnnualPriceRise={provider.knownAnnualPriceRise}
          annualPriceRiseNote={provider.annualPriceRiseNote}
          lastCheckedDate={provider.lastCheckedDate}
          priceStatus={provider.priceStatus}
          isDark={false}
        />

        {/* DESCRIPTION AND RURAL COVERAGE NOTES */}
        <div className="space-y-2 text-xs text-slate-800 pt-1">
          <p className="leading-relaxed font-semibold">
            {provider.description}
          </p>
          <div className="flex items-start gap-1.5 text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs leading-normal">
            <MapPin className="h-3.5 w-3.5 text-brand-green shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-900 font-black">Wiltshire Coverage:</strong> {provider.coverageNotes || provider.coverageNote} Suffix checks required.
            </span>
          </div>
        </div>

        {/* Source Checked Registry Note */}
        <ProviderSourceNote
          sourceName={provider.sourceName}
          lastCheckedDate={provider.sourceLastChecked}
          sourceUrl={provider.sourceUrl}
        />

        {/* Editorial Scoring Card */}
        <EditorScoreCard provider={provider} isDark={false} />
      </div>

      {/* CARD CALL TO ACTIONS BAR */}
      <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-2.5">
        <div className={secondaryBtn ? "grid grid-cols-2 gap-2.5" : "block"}>
          {primaryBtn}
          {secondaryBtn}
        </div>
        <p className="text-[10px] text-center text-slate-500 font-semibold leading-relaxed font-sans">
          Wiltshire Broadband Finder does not sell broadband directly. Always confirm availability, speeds, pricing, installation and contract terms with the provider before ordering.
        </p>
      </div>
    </div>
  );
}

export default ProviderCard;
