/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Provider } from "../types";
import { ArrowDown, Check, Zap, ExternalLink } from "lucide-react";
import { EditorScoreCard } from "./EditorScoreCard";
import { PriceDetails } from "./PriceDetails";
import { getProviderCtaUrl, getProviderCtaLabel } from "../utils/linkHelpers";

interface PackageCardProps {
  provider: Provider;
  onEnquire?: (p: Provider) => void;
}

export function PackageCard({ provider, onEnquire }: PackageCardProps) {
  if (!provider) {
    return (
      <div className="p-4 bg-yellow-950/20 border border-yellow-850 text-yellow-300 text-xs rounded-xl">
        Package details are missing or unavailable.
      </div>
    );
  }

  const ctaUrl = getProviderCtaUrl(provider.id);
  const ctaLabel = getProviderCtaLabel(provider.id);

  return (
    <div className="bg-[#12192c] border-2 border-slate-700/60 rounded-xl p-5 flex flex-col gap-4 hover:border-brand-gold/50 hover:shadow-lg hover:shadow-brand-gold/5 transition-all text-slate-100" id={`pkg-card-${provider.id}`}>
      {/* 1. Brand/Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full border-b border-slate-850 pb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-16 bg-gradient-to-r from-brand-green to-teal-700 border-2 border-brand-gold text-white rounded-lg flex items-center justify-center font-black text-[10px] tracking-widest uppercase shadow-xs">
            {provider.logoText}
          </div>
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-brand-gold-hover block">{provider.providerName}</span>
            <h4 className="text-sm font-black text-sky-300 leading-tight">{provider.packageName}</h4>
            <span className="text-[10px] text-slate-300 block font-extrabold">{provider.networkType}</span>
          </div>
        </div>

        {/* Dynamic Speed details in heading bar */}
        <div className="text-left sm:text-right">
          <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Average Download</span>
          <span className="text-sm font-black text-emerald-400 font-sans">{provider.averageDownloadSpeed} Mbps</span>
        </div>
      </div>

      {/* 2. Structured Price Details Matrix (Shows all 10 required fields uniformly) */}
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
        priceDisclaimer={provider.priceDisclaimer}
        isDark={true}
      />

      {/* 3. Action Button and Score Panels */}
      <div className="flex flex-col gap-3 pt-3 border-t border-slate-850">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <EditorScoreCard provider={provider} isDark={true} />
          </div>
          
          {ctaUrl ? (
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-slate-950 rounded-lg text-xs font-black text-center flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              {ctaLabel}
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <button
              disabled
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 text-slate-400 rounded-lg text-xs font-black cursor-not-allowed"
            >
              {ctaLabel}
            </button>
          )}
        </div>
        
        {/* Direct provider notice (Part 5) */}
        <p className="text-[10px] text-center text-slate-400 font-semibold leading-relaxed font-sans pt-1 border-t border-slate-800/50">
          We do not sell broadband directly. Provider pricing, availability, installation and contract terms must be confirmed on the provider’s website.
        </p>
      </div>
    </div>
  );
}

export default PackageCard;
