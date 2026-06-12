/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Provider } from "../types";
import { ArrowUp, ArrowDown, MapPin, ExternalLink, HelpCircle, AlertCircle } from "lucide-react";
import { PriceDetails } from "./PriceDetails";
import { EditorScoreCard } from "./EditorScoreCard";
import { ProviderSourceNote } from "./ProviderSourceNote";

import { providerLinksData } from "../data/providerLinks";
import { buildTrackedUrl } from "../data/trackingConfig";

interface SponsoredProviderCardProps {
  key?: any;
  provider: Provider;
  onEnquire: (provider: Provider) => void;
  className?: string;
}

export function SponsoredProviderCard({ provider, onEnquire, className = "" }: SponsoredProviderCardProps) {
  if (!provider) {
    return (
      <div className="p-4 bg-yellow-950/20 border border-yellow-850 text-yellow-300 text-xs rounded-xl">
        Provider details are missing or unavailable.
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
        className="w-full py-2.5 px-3 text-xs font-black text-center bg-brand-gold hover:bg-brand-gold-hover text-slate-950 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md"
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
        className="w-full py-2.5 px-3 text-xs font-black text-center bg-brand-gold hover:bg-brand-gold-hover text-slate-950 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md"
      >
        Visit provider
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  } else {
    primaryBtn = (
      <button
        disabled
        className="w-full py-2.5 px-3 text-xs font-black text-center bg-slate-800 text-slate-400 rounded-lg cursor-not-allowed"
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
        className="w-full py-2.5 px-3 text-xs font-black text-center border-2 border-brand-gold bg-[#12192c] text-brand-gold hover:bg-brand-gold-light hover:text-slate-950 rounded-lg flex items-center justify-center gap-1.5 transition-all"
      >
        View provider packages
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }

  return (
    <div
      className={`bg-[#12192c] border-4 border-brand-gold rounded-3xl shadow-xl hover:border-brand-gold-hover hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-200 overflow-hidden flex flex-col justify-between relative ${className}`}
      id={`sponsored-prov-card-${provider.id}`}
    >
      {/* SPONSOR SPOTLIGHT TOP HEADER */}
      <div className="bg-brand-gold text-slate-950 px-4 py-1.5 flex justify-between items-center gap-2 text-[9.5px] xs:text-[10px] font-black tracking-widest uppercase shadow-xs">
        <span className="truncate max-w-[170px] xs:max-w-none">Featured Wiltshire Sponsor</span>
        <span className="bg-slate-950 text-brand-gold px-2 py-0.5 rounded text-[8.5px] font-black shrink-0">
          Sponsored
        </span>
      </div>

      {/* CARD TOP INFO */}
      <div className="p-5 space-y-4">
        {/* LOGO AND BRAND HEADER */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <span className="inline-block text-[9px] font-extrabold text-[#0c101d] bg-brand-gold-light rounded px-1.5 py-0.5 tracking-wider uppercase">
              {provider.networkType}
            </span>
            <div className="flex items-center gap-2">
              <div className="h-10 px-3 bg-gradient-to-r from-brand-green to-teal-700 text-white border border-brand-green/25 text-xs font-black rounded-lg flex items-center justify-center tracking-tight uppercase shadow-sm">
                {provider.logoText}
              </div>
              <div>
                <h3 className="text-sm font-black text-white leading-none">
                  {provider.providerName}
                </h3>
                <span className="text-[10.5px] text-amber-200 font-bold">
                  {provider.packageName}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block text-[10px] font-black text-slate-950 bg-brand-gold-light px-2 py-0.5 rounded border-2 border-brand-gold">
              {provider.bestFor}
            </span>
          </div>
        </div>

        {/* SPEEDS BAR SUMMARY */}
        <div className="grid grid-cols-2 gap-3 bg-slate-900 rounded-xl p-3 border border-slate-700">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-green/20 rounded-md text-emerald-400 shrink-0 border border-brand-green/20">
              <ArrowDown className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block font-sans">Avg. Download</span>
              <span className="text-base font-black text-emerald-400 font-sans tracking-tight">
                {provider.averageDownloadSpeed} <span className="text-[10px] font-black text-slate-400 font-sans">Mbps</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-gold-light/20 rounded-md text-brand-gold-hover shrink-0 border border-brand-gold/20">
              <ArrowUp className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block font-sans">Avg. Upload</span>
              <span className="text-base font-black text-brand-gold-hover font-sans tracking-tight">
                {provider.averageUploadSpeed} <span className="text-[10px] font-black text-slate-400 font-sans">Mbps</span>
              </span>
            </div>
          </div>
        </div>

        {/* PRICE SUMMARY */}
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
          isDark={true}
        />

        {/* DESCRIPTION AND RURAL COVERAGE NOTES */}
        <div className="space-y-2 text-xs text-slate-200 pt-1">
          <p className="leading-relaxed font-semibold">
            {provider.description}
          </p>
          <div className="flex items-start gap-1.5 text-slate-950 bg-brand-gold-light p-2.5 rounded-lg border-2 border-brand-gold text-[11.5px] leading-snug">
            <MapPin className="h-4 w-4 text-[#bf7c13] shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-950 font-black">Sponsor Local Scope:</strong> {provider.coverageNotes || provider.coverageNote} Dedicated rural engineering tracks active in Wiltshire.
            </span>
          </div>
        </div>

        {/* Source Checked Registry Note */}
        <ProviderSourceNote
          sourceName={provider.sourceName}
          lastCheckedDate={provider.sourceLastChecked}
          sourceUrl={provider.sourceUrl}
          isDark={true}
        />

        {/* Editorial Scoring Card */}
        <EditorScoreCard provider={provider} isDark={true} />
      </div>

      {/* CALL TO ACTIONS */}
      <div className="p-5 bg-slate-900 border-t-2 border-brand-gold/30 space-y-2">
        <div className={secondaryBtn ? "grid grid-cols-2 gap-2.5" : "block"}>
          {primaryBtn}
          {secondaryBtn}
        </div>
        <p className="text-[10px] text-center text-slate-400 font-semibold leading-relaxed font-sans">
          We do not sell broadband directly. Provider pricing, availability, installation and contract terms must be confirmed on the provider’s website.
        </p>
        <div className="flex items-center justify-center gap-1 text-[9.5px] text-slate-400 font-bold pt-1">
          <AlertCircle className="h-3 w-3 text-brand-gold-hover shrink-0" />
          <span>Sponsored listings do not automatically influence objective data rankings.</span>
        </div>
      </div>
    </div>
  );
}
export default SponsoredProviderCard;
