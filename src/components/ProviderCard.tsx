/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Provider } from "../types";
import { ArrowUp, ArrowDown, MapPin, BadgeHelp, Check, ExternalLink, Calendar } from "lucide-react";
import { PriceDetails } from "./PriceDetails";
import { ContractLengthBadge } from "./ContractLengthBadge";
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
      <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs rounded-xl">
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
        className="w-full py-2.5 px-3 text-xs font-bold text-center bg-brand-green hover:bg-brand-green-hover text-white rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md"
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
        className="w-full py-2.5 px-3 text-xs font-bold text-center bg-brand-green hover:bg-brand-green-hover text-white rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md"
      >
        Visit provider
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  } else {
    primaryBtn = (
      <button
        onClick={() => onEnquire(provider)}
        className="col-span-2 w-full py-2.5 px-4 text-xs font-bold bg-brand-green hover:bg-brand-green-hover text-white rounded-lg transition-all cursor-pointer shadow-md"
      >
        Ask us to check this area
      </button>
    );
  }

  if (hasChecker && hasDeals) {
    const trackerUrl = buildTrackedUrl(links.broadbandDealsUrl, "default", { utm_term: "postcode_or_area" });
    secondaryBtn = (
      <a
        href={trackerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 px-3 text-xs font-bold text-center border-2 border-brand-green bg-white text-brand-green hover:bg-slate-100 rounded-lg flex items-center justify-center gap-1.5 transition-all"
      >
        View broadband packages
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  } else if (hasChecker || hasWebsite) {
    secondaryBtn = (
      <button
        onClick={() => onEnquire(provider)}
        className="w-full py-2.5 px-3 text-xs font-bold text-center border-2 border-brand-green bg-white text-brand-green hover:bg-slate-100 rounded-lg flex items-center justify-center transition-all cursor-pointer"
      >
        Ask us to check this area
      </button>
    );
  }

  return (
    <div
      className={`bg-white border-2 border-slate-200 rounded-2xl shadow-md hover:border-brand-gold hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between ${className}`}
      id={`prov-card-${provider.id}`}
    >
      {/* CARD TOP INFO */}
      <div className="p-5 space-y-4">
        {/* LOGO AND BRAND HEADER */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <span className="inline-block text-[9px] font-extrabold text-black bg-stone-150 rounded-sm px-1.5 py-0.5 tracking-wider uppercase">
              {provider.networkType}
            </span>
            <div className="flex items-center gap-2">
              {/* Text based logo mark logoText */}
              <div className="h-10 px-3 bg-brand-green text-white border border-brand-green/20 text-xs font-black rounded-lg flex items-center justify-center tracking-tight uppercase shadow-sm">
                {provider.logoText}
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-brand-green leading-none">
                  {provider.providerName}
                </h3>
                <span className="text-[10.5px] text-black font-heavy">
                  {provider.packageName}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block text-[10px] font-black text-brand-green bg-brand-gold-light px-2 py-0.5 rounded border-2 border-brand-gold">
              {provider.bestFor}
            </span>
          </div>
        </div>

        {/* SPEEDS BAR SUMMARY */}
        <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-3 border border-slate-350">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-green-light rounded-md text-brand-green shrink-0 border border-brand-green/30">
              <ArrowDown className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-black block">Avg. Download</span>
              <span className="text-base font-black text-brand-green font-sans tracking-tight">
                {provider.averageDownloadSpeed} <span className="text-[10px] font-bold text-black font-sans">Mbps</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-gold-light rounded-md text-brand-gold-hover shrink-0 border border-brand-gold/30">
              <ArrowUp className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-black block">Avg. Upload</span>
              <span className="text-base font-black text-brand-green font-sans tracking-tight">
                {provider.averageUploadSpeed} <span className="text-[10px] font-bold text-black font-sans">Mbps</span>
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
        <div className="space-y-2 text-xs text-black pt-1">
          <p className="leading-relaxed font-semibold">
            {provider.description}
          </p>
          <div className="flex items-start gap-1.5 text-black bg-brand-green-light/80 p-2.5 rounded-lg border-2 border-brand-green/35 text-[11px] leading-snug">
            <MapPin className="h-3.5 w-3.5 text-brand-gold shrink-0 mt-0.5" />
            <span>
              <strong className="text-black font-extrabold">Wiltshire Coverage:</strong> {provider.coverageNotes || provider.coverageNote} Suffix checks required.
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
          Availability varies by exact address. Final price, speed, package and installation terms must be confirmed by the provider.
        </p>
      </div>
    </div>
  );
}
export default ProviderCard;
