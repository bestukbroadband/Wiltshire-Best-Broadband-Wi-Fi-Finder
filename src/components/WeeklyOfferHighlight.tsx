/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, ShieldAlert, Check, AlertCircle, ArrowRight, ArrowUp, ArrowDown, Calendar, Tag, MapPin, Award } from "lucide-react";

export interface WeeklyOfferHighlightProps {
  offerId?: string;
  providerName?: string;
  packageName?: string;
  offerHeadline?: string;
  postcodeTargeting?: string;
  townTargeting?: string;
  monthlyPrice?: number;
  contractLength?: number;
  averageDownloadSpeed?: number;
  averageUploadSpeed?: number;
  setupFee?: number;
  routerIncluded?: boolean;
  knownPriceRise?: string | boolean;
  offerValidUntil?: string;
  editorScore?: number;
  editorVerdict?: string;
  editorNotes?: string;
  bestFor?: string;
  thingsToWatch?: string[];
  ctaLabel?: string;
  ctaUrl?: string;
  isSponsored?: boolean;
  sponsorLabel?: string;
  lastReviewedDate?: string;
  onEnquire?: (providerName: string, packageName: string) => void;
}

export function WeeklyOfferHighlight({
  offerId = "weekly-giga-01",
  providerName = "Voneus Broadband",
  packageName = "Gigabit Local Fibre",
  offerHeadline = "Fast full fibre option for selected Wiltshire towns",
  postcodeTargeting = "SN10, SN11, BA14, BA15, SP1, SP2",
  townTargeting = "Worton, Devizes, Calne, lacock, Melksham & parished villages",
  monthlyPrice = 29.99,
  contractLength = 24,
  averageDownloadSpeed = 900,
  averageUploadSpeed = 900,
  setupFee = 0,
  routerIncluded = true,
  knownPriceRise = "Fixed rate lock - no mid-contract inflation price rises during initial contract period",
  offerValidUntil = "June 30, 2026",
  editorScore = 8.4,
  editorVerdict = "Outstanding alternative to copper services with absolute price stability.",
  editorNotes = "This offer looks strong where full fibre is actually available, especially for households moving from older copper based services. Check the contract length, install date and any annual price change before ordering.",
  bestFor = "Wiltshire villages & homeworkers requiring synchronous speeds",
  thingsToWatch = [
    "Subject to detailed local optical line survey",
    "24-month commitment applies to lock in the special pricing rate",
    "Availability is limited strictly to properties on the Wiltshire Altnet rollout cluster"
  ],
  ctaLabel = "Check my postcode",
  ctaUrl = "#",
  isSponsored = false,
  sponsorLabel = "Sponsored Spotlight",
  lastReviewedDate = "June 8, 2026",
  onEnquire
}: WeeklyOfferHighlightProps) {
  
  const handleCtaClick = (e: React.MouseEvent) => {
    if (onEnquire) {
      e.preventDefault();
      onEnquire(providerName, packageName);
    } else {
      // Smooth scroll to comparison or enquiry lead form
      const formElement = document.getElementById("comparison-finder") || document.getElementById("enquiry-section-anchor");
      if (formElement) {
        e.preventDefault();
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section 
      className="relative bg-gradient-to-br from-[#12192c] via-[#0f1526] to-[#0a0e1a] border-2 border-brand-gold/40 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden text-white space-y-6"
      id={`weekly-highlight-${offerId}`}
    >
      {/* Decorative backdrop glow dots */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* HEADER BAR AND SPONSOR TAGS */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:items-center relative z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-gold text-slate-950 rounded-full text-[10.5px] font-black uppercase tracking-wider shadow-md">
            <Star className="h-3.5 w-3.5 fill-slate-950 text-slate-950" />
            Weekly offer highlight
          </span>
          {isSponsored && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-550/20 border border-brand-gold/40 text-brand-gold rounded-full text-[9px] font-extrabold tracking-widest uppercase">
              {sponsorLabel}
            </span>
          )}
        </div>
        
        {lastReviewedDate && (
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-bold">
            <Calendar className="h-3.5 w-3.5 text-brand-gold" />
            <span>Reviewed &amp; Verified: <strong className="text-slate-200">{lastReviewedDate}</strong></span>
          </div>
        )}
      </div>

      {/* CORE TITLE & TARGET HIGHLIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        
        {/* Left 7 Columns - Left Block details */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-xl md:text-2xl font-serif font-black tracking-tight text-white">
              {offerHeadline}
            </h3>
            <p className="text-xs md:text-sm text-brand-gold font-sans font-extrabold flex items-center gap-1.5">
              <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-white text-[11px] font-black">
                {providerName}
              </span>
              <span>— {packageName}</span>
            </p>
          </div>

          {/* Editor Review Panel */}
          <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl space-y-3 backdrop-blur-xs">
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Award className="h-4 w-4 text-brand-gold" />
                Editorial Review
              </span>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-brand-gold/10 border border-brand-gold/30 rounded-lg">
                <span className="text-[11px] font-extrabold text-slate-300">Editor score:</span>
                <span className="text-xs font-black text-brand-gold tracking-tight">{editorScore} out of 10</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-100 flex items-start gap-1.5">
                <span className="text-brand-gold">Verdict:</span>
                <span className="text-slate-200 font-semibold">&ldquo;{editorVerdict}&rdquo;</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                <strong className="text-white block mb-1">Notes from editor:</strong>
                {editorNotes}
              </p>
            </div>
            
            {bestFor && (
              <div className="pt-2 text-[11px] flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-400 font-extrabold uppercase tracking-wider">Best for:</span>
                <span className="px-2 py-0.5 bg-brand-gold/15 border border-brand-gold/20 text-brand-gold text-[10px] font-black rounded-md">
                  {bestFor}
                </span>
              </div>
            )}
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#192239] p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Speed Avg</span>
              <span className="text-base font-black text-white mt-1">
                {averageDownloadSpeed} <span className="text-[11px] text-slate-400 font-bold">Mbps</span>
              </span>
              <span className="text-[10px] text-slate-405 flex items-center gap-0.5 mt-0.5 font-semibold">
                <ArrowUp className="h-3 w-3 text-brand-gold" />
                {averageUploadSpeed} Mbps upload
              </span>
            </div>

            <div className="bg-[#192239] p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly cost</span>
              <span className="text-lg font-black text-brand-gold mt-1">
                £{monthlyPrice.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">For first {contractLength}m</span>
            </div>

            <div className="bg-[#192239] p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Setup Cost</span>
              <span className="text-sm font-black text-slate-200 mt-1.5">
                {setupFee === 0 ? "Free setup" : `£${setupFee.toFixed(2)}`}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold mt-1">
                {routerIncluded ? "✔ Gig Router incl." : "Standard router"}
              </span>
            </div>

            <div className="bg-[#192239] p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Local Reach</span>
              <div className="text-[11px] font-extrabold text-slate-200 mt-1 lines-clamp-2 truncate">
                {townTargeting}
              </div>
              <span className="text-[9px] text-slate-400 truncate mt-0.5 font-bold">
                Pcodes: {postcodeTargeting}
              </span>
            </div>
          </div>
        </div>

        {/* Right 5 Columns - Offer CTAs & Things to Watch */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Things to Watch panel */}
          <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl space-y-3">
            <span className="text-[11px] font-extrabold text-slate-450 uppercase tracking-widest block">
              Things to watch before ordering
            </span>
            <ul className="space-y-2 text-xs text-slate-300 font-semibold">
              {thingsToWatch.map((item, index) => (
                <li key={index} className="flex gap-2 items-start">
                  <Check className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Box */}
          <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl space-y-3">
            {knownPriceRise && (
              <div className="bg-amber-500/10 border border-brand-gold/20 p-2.5 rounded-lg flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <p className="text-[10.5px] text-amber-300 leading-relaxed font-bold">
                  <strong>Inflation Check:</strong> {typeof knownPriceRise === "string" ? knownPriceRise : "Annual price variations may write-in after initial contract periods."}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={handleCtaClick}
                className="w-full py-4 bg-brand-gold hover:bg-brand-gold-hover text-slate-950 text-xs font-black rounded-xl transition-all shadow-lg hover:shadow-brand-gold/15 flex items-center justify-center gap-1.5 cursor-pointer leading-none group"
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              
              {offerValidUntil && (
                <p className="text-[10px] text-slate-450 text-center font-bold">
                  Offer period valid until <strong className="text-slate-300">{offerValidUntil}</strong>. Terms apply.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* COMPLIANT DISCLAIMER FOOTER ZONE */}
      <div className="pt-4 border-t border-slate-805/50 flex flex-col md:flex-row gap-3.5 items-start text-xs text-slate-400 font-semibold leading-relaxed">
        <div className="bg-slate-850 p-2 rounded-lg shrink-0 text-slate-400 border border-slate-800">
          <ShieldAlert className="h-4.5 w-4.5" />
        </div>
        <div className="space-y-0.5">
          <span className="font-extrabold text-white text-[11px] block uppercase tracking-wider">
            Verification Disclaimer:
          </span>
          <p className="text-slate-350">
            This is an editorial listing based on the information currently available to this site. Final price, speed, terms and availability must be confirmed by the provider.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WeeklyOfferHighlight;
