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

interface ProviderCardProps {
  key?: any;
  provider: Provider;
  onEnquire: (provider: Provider) => void;
  className?: string;
}

export function ProviderCard({ provider, onEnquire, className = "" }: ProviderCardProps) {
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
              <strong className="text-black font-extrabold">Wiltshire Coverage:</strong> {provider.coverageNote} Suffix checks required.
            </span>
          </div>
        </div>

        {/* Editorial Scoring Card */}
        <EditorScoreCard provider={provider} isDark={false} />
      </div>

      {/* CARD CALL TO ACTIONS BAR */}
      <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onEnquire(provider)}
            className="w-full py-2.5 px-4 text-xs font-bold bg-brand-green hover:bg-brand-green-hover text-white rounded-lg transition-all cursor-pointer shadow-md"
          >
            Check coverage
          </button>
          
          <a
            href={provider.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 text-xs font-bold text-center border-2 border-brand-green bg-white text-brand-green hover:bg-slate-100 rounded-lg flex items-center justify-center gap-1.5 transition-all"
          >
            {provider.ctaLabel || "View listed deals"}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <p className="text-[10px] text-center text-black font-bold leading-none font-sans">
          * Subject to local lines. Checking is free.
        </p>
      </div>
    </div>
  );
}
export default ProviderCard;
