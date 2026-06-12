/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Provider } from "../types";
import { Award, ArrowDown, ArrowUp, Zap, HelpCircle, AlertCircle, Sparkles, ExternalLink } from "lucide-react";
import { EditorScoreCard } from "./EditorScoreCard";
import { PriceDetails } from "./PriceDetails";
import { getProviderCtaUrl, getProviderCtaLabel } from "../utils/linkHelpers";

interface DealRankingProps {
  key?: any;
  provider: Provider;
  rank: number;
  onEnquire?: (p: Provider) => void;
}

export function DealRanking({ provider, rank, onEnquire }: DealRankingProps) {
  // Map rank values to beautiful medal icons or simple stylish bullets
  const isMedal = rank <= 3;
  const medalStyles = [
    "bg-gradient-to-br from-brand-gold to-amber-500 text-slate-950 border-brand-gold ring-brand-gold/30 shadow-lg shadow-brand-gold/10", // Gold
    "bg-gradient-to-br from-slate-300 to-slate-500 text-slate-950 border-slate-400 ring-slate-400/30", // Silver
    "bg-gradient-to-br from-[#d97706] to-[#b45309] text-white border-amber-750 ring-amber-600/20" // Bronze
  ];
  const rankClass = isMedal ? medalStyles[rank - 1] : "bg-slate-900 text-slate-300 border-slate-700";

  // Determine matching ranking tags dynamically for premium visual context
  const tags: { label: string; colorClass: string }[] = [];
  
  if (provider.isSponsored) {
    tags.push({ label: "Sponsored", colorClass: "bg-amber-400/10 text-amber-300 border border-amber-400/30" });
  }
  if (rank === 1) {
    tags.push({ label: "Best listed deal", colorClass: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" });
  }
  if (provider.monthlyPriceFrom <= 26) {
    tags.push({ label: "Lowest listed monthly price", colorClass: "bg-teal-500/10 text-teal-300 border border-teal-500/20" });
  }
  if (provider.averageDownloadSpeed >= 900) {
    tags.push({ label: "Fastest listed package", colorClass: "bg-sky-500/10 text-sky-400 border border-sky-500/20" });
  }
  const editScore = provider.editorScore ?? parseFloat(((provider.rankingScore ?? 85) / 10).toFixed(1));
  if (editScore >= 8.4) {
    tags.push({ label: "Strong editor score", colorClass: "bg-brand-gold/15 text-brand-gold border border-brand-gold/25" });
  }
  const isRural = provider.bestFor.toLowerCase().includes("rural") || 
                    provider.bestFor.toLowerCase().includes("village") ||
                    provider.providerType.some(t => t.includes("Rural") || t.includes("Alternative") || t.includes("Satellite"));
  if (isRural) {
    tags.push({ label: "Best for rural homes", colorClass: "bg-purple-500/10 text-purple-300 border border-purple-500/20" });
  }
  const isWorking = provider.bestFor.toLowerCase().includes("work") || 
                     provider.bestFor.toLowerCase().includes("office") ||
                     provider.averageUploadSpeed >= 150;
  if (isWorking) {
    tags.push({ label: "Best for home working", colorClass: "bg-amber-500/10 text-amber-300 border border-amber-500/20" });
  }
  const isFamily = provider.bestFor.toLowerCase().includes("family") || 
                    provider.bestFor.toLowerCase().includes("families") || 
                    (provider.averageDownloadSpeed >= 500 && provider.monthlyPriceFrom <= 45);
  if (isFamily) {
    tags.push({ label: "Best for families", colorClass: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20" });
  }
  if (provider.networkType.toLowerCase().includes("5g") || provider.providerType.some(t => t.includes("5G"))) {
    tags.push({ label: "Good 5G option", colorClass: "bg-slate-800 text-slate-300 border border-slate-700" });
  }
  if (provider.networkType.toLowerCase().includes("satellite") || provider.providerType.some(t => t.includes("Satellite"))) {
    tags.push({ label: "Good satellite option", colorClass: "bg-slate-800 text-slate-350 border border-slate-700" });
  }
  if (provider.midContractPriceRise) {
    tags.push({ label: "Check price rise", colorClass: "bg-rose-500/10 text-rose-400 border border-rose-500/25" });
  }

  const ctaUrl = getProviderCtaUrl(provider.id);
  const ctaLabel = getProviderCtaLabel(provider.id);

  return (
    <div
      className={`bg-[#12192c] border-2 border-slate-700/60 rounded-2xl p-5 md:p-6 flex flex-col gap-4 transition-all duration-200 hover:border-brand-gold/50 hover:shadow-xl hover:shadow-brand-gold/5 relative`}
      id={`deal-rank-row-${provider.id}`}
    >
      {/* 1. Header Spec Row with logo and badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full border-b border-slate-800 pb-3">
        <div className="flex items-center gap-4">
          <div className={`h-11 w-11 rounded-xl font-black text-base flex items-center justify-center border font-sans tracking-tight shrink-0 ${rankClass}`}>
            #{rank}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-950 bg-brand-gold px-1.5 py-0.5 rounded leading-none shrink-0">
                {provider.networkType}
              </span>
              {tags.slice(0, 3).map((tag, tIdx) => (
                <span key={tIdx} className={`text-[9px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded border leading-none shrink-0 ${tag.colorClass}`}>
                  {tag.label}
                </span>
              ))}
            </div>
            <h3 className="text-base font-black text-white mt-1.5 leading-tight flex items-center gap-2">
              {provider.providerName}
              <span className="text-xs font-semibold text-slate-400 font-sans tracking-tight">
                ({provider.packageName})
              </span>
            </h3>
          </div>
        </div>

        {/* Speed indicators */}
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Avg. Speed</span>
            <span className="text-sm font-black text-emerald-400 font-sans tracking-tight">
              {provider.averageDownloadSpeed} Mbps
            </span>
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Avg. Upload</span>
            <span className="text-sm font-black text-brand-gold font-sans tracking-tight">
              {provider.averageUploadSpeed} Mbps
            </span>
          </div>
        </div>
      </div>

      {/* 2. Standardized pricing matrix displaying all 10 mandated parameter points */}
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

      {/* 3. Footer scoring card and CTAs */}
      <div className="flex flex-col gap-3 pt-3 border-t border-slate-805">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <EditorScoreCard provider={provider} isDark={true} />
          </div>
          
          {ctaUrl ? (
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-slate-950 text-xs font-black font-sans rounded-xl tracking-wide shadow-md flex items-center justify-center gap-1.5 transition-all shrink-0"
            >
              {ctaLabel}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <button
              disabled
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 text-slate-400 text-xs font-black font-sans rounded-xl tracking-wide cursor-not-allowed"
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

export default DealRanking;
