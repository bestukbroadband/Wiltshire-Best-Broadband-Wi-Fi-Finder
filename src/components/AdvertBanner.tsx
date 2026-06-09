/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { adPlacementsData, AdPlacement } from "../data/adPlacements";
import { ExternalLink, Code2, Check, Settings, ArrowRight, Info, Library, X } from "lucide-react";

interface AdvertBannerProps {
  // Backward compatibility support for older placement names
  placement?: string;
  // Modern type-safe locations
  location?: 
    | "top-leaderboard"
    | "hero-sponsor-strip"
    | "weekly-offer-sponsor"
    | "postcode-page-sponsor"
    | "town-page-sponsor"
    | "provider-category-sponsor"
    | "in-content-advert"
    | "sidebar-advert"
    | "mobile-sticky-banner"
    | "footer-sponsor-strip"
    | "newsletter-sponsor"
    | "sponsored-provider-card"
    | "sponsored-deal-card";
  townId?: string;
  postcodePrefix?: string;
  categoryName?: string;
  className?: string;
}

export function AdvertBanner({ 
  placement, 
  location, 
  townId, 
  postcodePrefix, 
  categoryName, 
  className = "" 
}: AdvertBannerProps) {
  // Map old placement names to new location keys for absolute compatibility
  const resolvedLocation = (() => {
    if (location) return location;
    if (!placement) return "top-leaderboard";
    
    const lower = placement.toLowerCase();
    if (lower.includes("top leaderboard")) return "top-leaderboard";
    if (lower.includes("hero sponsor")) return "hero-sponsor-strip";
    if (lower.includes("weekly offer")) return "weekly-offer-sponsor";
    if (lower.includes("postcode page")) return "postcode-page-sponsor";
    if (lower.includes("town page sponsor") || lower.includes("town-banner")) return "town-page-sponsor";
    if (lower.includes("category sponsor")) return "provider-category-sponsor";
    if (lower.includes("in content")) return "in-content-advert";
    if (lower.includes("sidebar")) return "sidebar-advert";
    if (lower.includes("mobile")) return "mobile-sticky-banner";
    if (lower.includes("footer")) return "footer-sponsor-strip";
    if (lower.includes("newsletter")) return "newsletter-sponsor";
    if (lower.includes("provider card")) return "sponsored-provider-card";
    if (lower.includes("deal card")) return "sponsored-deal-card";
    return "top-leaderboard";
  })();

  // AD PLACEMENT MODE: "standard" (Wiltshire Altnets) | "google" (AdSense Responsive) | "aws" (Amazon Affiliate / AWS Ads)
  const [adType, setAdType] = useState<"standard" | "google" | "aws">("standard");
  const [showConfig, setShowConfig] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  
  // Custom configuration states
  const [pubId, setPubId] = useState("ca-pub-9460426230985203");
  const [adSlot, setAdSlot] = useState("8392102934");
  const [awsTag, setAwsTag] = useState("wiltshirebroad-21");

  // Dynamic layout spacer calculation to strictly eliminate Cumulative Layout Shift (CLS)
  const getMinHeightValue = () => {
    switch (resolvedLocation) {
      case "top-leaderboard":
        return 90;
      case "hero-sponsor-strip":
        return 80;
      case "weekly-offer-sponsor":
        return 140;
      case "postcode-page-sponsor":
        return 250;
      case "town-page-sponsor":
        return 90;
      case "provider-category-sponsor":
        return 80;
      case "in-content-advert":
        return 250;
      case "sidebar-advert":
        return 300;
      case "mobile-sticky-banner":
        return 100;
      case "footer-sponsor-strip":
        return 90;
      case "newsletter-sponsor":
        return 85;
      default:
        return 120;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 280); // Quick buffer to keep the web feeling fast but visually progressive
    return () => clearTimeout(timer);
  }, [adType, resolvedLocation, townId, postcodePrefix, categoryName]);

  // Find targeted active local advertisement
  const matchedAd = adPlacementsData.find((ad) => {
    if (!ad.isActive) return false;
    if (ad.location !== resolvedLocation) return false;

    // Optional postcode prefix targeting (case-insensitive checking)
    if (postcodePrefix && ad.targetPostcodes.length > 0) {
      const match = ad.targetPostcodes.some(
        (p) => p.toLowerCase() === postcodePrefix.toLowerCase() || postcodePrefix.toLowerCase().startsWith(p.toLowerCase())
      );
      if (!match) return false;
    }

    // Optional town targeting (case-insensitive checking)
    if (townId && ad.targetTowns.length > 0) {
      const match = ad.targetTowns.some(
        (t) => t.toLowerCase() === townId.toLowerCase()
      );
      if (!match) return false;
    }

    return true;
  }) || adPlacementsData.find((ad) => ad.isActive && ad.location === resolvedLocation); // Fallback to generic of the same location type

  if (isDismissed) return null;

  const handleCopyCode = () => {
    let snippet = "";
    if (adType === "google") {
      snippet = `<!-- Google AdSense - Responsive Leaderboard [${resolvedLocation}] -->\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}" crossorigin="anonymous"></script>\n<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="${pubId}"\n     data-ad-slot="${adSlot}"\n     data-ad-format="auto"\n     data-full-width-responsive="true"></ins>\n<script>\n     (adsbygoogle = window.adsbygoogle || []).push({});\n</script>`;
    } else {
      snippet = `<!-- AWS Marketplace & Associate Referral - [${resolvedLocation}] -->\n<div class="aws-advertisement-deck" data-location="${resolvedLocation}">\n  <a href="https://aws.amazon.com/free/?utm_source=wiltshire&utm_medium=affiliate&tag=${awsTag}" target="_blank" rel="nofollow noopener">\n    <img src="https://images-na.ssl-images-amazon.com/images/G/01/associates/build-with-aws-banner.png" alt="Build High Speed Apps with AWS Cloud" />\n  </a>\n</div>`;
    }

    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Select styles based on locations to merge beautifully without making the site look cheap
  let wrapClasses = "w-full rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col ";
  
  if (resolvedLocation === "top-leaderboard" || resolvedLocation === "town-page-sponsor") {
    wrapClasses += "border-[#1E2E25]/10 bg-[#EDF3EF]/90 p-4 md:py-3 md:px-5";
  } else if (resolvedLocation === "hero-sponsor-strip") {
    wrapClasses += "border-[#C5A059]/30 bg-[#FAF7F2] p-3 md:px-5";
  } else if (resolvedLocation === "postcode-page-sponsor" || resolvedLocation === "in-content-advert") {
    wrapClasses += "border-slate-700/65 bg-slate-900/60 p-5 md:p-6 text-white";
  } else if (resolvedLocation === "sidebar-advert") {
    wrapClasses += "border-slate-200 bg-white p-5 shadow-2xs";
  } else if (resolvedLocation === "mobile-sticky-banner") {
    wrapClasses += "fixed bottom-0 left-0 right-0 z-50 border-t border-brand-gold/40 bg-slate-950 text-white p-3 md:p-4 rounded-t-xl shadow-2xl max-w-lg mx-auto mb-1";
  } else if (resolvedLocation === "footer-sponsor-strip") {
    wrapClasses += "border-[#111A2E]/20 bg-[#F4F6F9] p-4";
  } else if (resolvedLocation === "newsletter-sponsor") {
    wrapClasses += "border-[#FAF7F2]/20 bg-[#12192C]/40 p-4 rounded-xl text-slate-300";
  } else {
    wrapClasses += "border-stone-200 bg-[#FAF9F6] p-4";
  }

  // Dimension helpers to display as diagnostic tag
  const sizeLabel = matchedAd ? matchedAd.size : "Dynamic Size";

  return (
    <div 
      className={`${wrapClasses} ${className}`} 
      id={`ad-slot-${resolvedLocation}`}
      style={{ minHeight: `${getMinHeightValue()}px` }}
    >
      {/* 1. AD HEADER TABS (COMPACT & LESS INTRUSIVE) */}
      <div className="flex items-center justify-between border-b border-stone-200/50 dark:border-slate-700/30 pb-1.5 mb-2.5 text-[9px] uppercase font-mono font-bold tracking-widest text-[#1B3022]/40 dark:text-slate-400">
        <div className="flex gap-2.5 items-center">
          <button
            onClick={() => { setAdType("standard"); setShowConfig(false); }}
            className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${adType === "standard" ? "bg-brand-green/10 text-brand-green font-extrabold" : "hover:text-brand-green hover:bg-stone-150/40"}`}
          >
            Local sponsor
          </button>
          <button
            onClick={() => { setAdType("google"); }}
            className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${adType === "google" ? "bg-sky-500/10 text-sky-600 font-extrabold" : "hover:text-sky-500"}`}
          >
            AdSense
          </button>
          <button
            onClick={() => { setAdType("aws"); }}
            className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${adType === "aws" ? "bg-amber-500/10 text-amber-500 font-extrabold" : "hover:text-amber-500"}`}
          >
            AWS Partner
          </button>
        </div>

        <div className="flex items-center gap-2">
          {adType !== "standard" && (
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="flex items-center gap-0.5 text-[8px] hover:text-stone-700 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Settings className="h-3 w-3" />
              <span>{showConfig ? "Close" : "Params"}</span>
            </button>
          )}

          <span className="bg-stone-155 dark:bg-slate-800 px-1.5 py-0.2 rounded-sm text-[8px] text-stone-500 dark:text-slate-450 normal-case font-semibold">
            {sizeLabel}
          </span>

          {resolvedLocation === "mobile-sticky-banner" && (
            <button 
              onClick={() => setIsDismissed(true)}
              className="p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Dismiss Advertisement"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* 2. CONFIGURATION MODAL / PANEL */}
      {showConfig && adType !== "standard" && (
        <div className="bg-stone-950 text-stone-300 rounded-lg p-3 mb-2.5 text-[11px] space-y-2.5 font-mono border border-brand-gold/15">
          <div className="flex justify-between items-center border-b border-stone-800 pb-1">
            <span className="text-brand-gold font-bold flex items-center gap-1">
              <Library className="h-3.5 w-3.5" />
              Slot Configurator
            </span>
            <button
              onClick={handleCopyCode}
              className="px-1.5 py-0.5 bg-stone-900 hover:bg-stone-850 text-[9px] font-bold text-white rounded cursor-pointer transition-colors flex items-center gap-1 border border-stone-850"
            >
              {copied ? <Check className="h-2.5 w-2.5 text-emerald-400" /> : <Code2 className="h-2.5 w-2.5" />}
              <span>{copied ? "Copied" : "Copy Tag"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {adType === "google" ? (
              <>
                <div>
                  <label className="text-stone-400 block text-[9px]">Client ID:</label>
                  <input
                    type="text"
                    value={pubId}
                    onChange={(e) => setPubId(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded px-1.5 py-0.5 text-white font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block text-[9px]">Ad Slot:</label>
                  <input
                    type="text"
                    value={adSlot}
                    onChange={(e) => setAdSlot(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded px-1.5 py-0.5 text-white font-mono text-xs"
                  />
                </div>
              </>
            ) : (
              <div className="sm:col-span-2">
                <label className="text-stone-400 block text-[9px]">AWS ID:</label>
                <input
                  type="text"
                  value={awsTag}
                  onChange={(e) => setAwsTag(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded px-1.5 py-0.5 text-white font-mono text-xs"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. SIMULATED LOAD STATE OR AD RESPONSES */}
      {isLoading ? (
        <div className="flex-1 flex flex-col justify-center space-y-2 py-2 animate-pulse text-left">
          <div className="h-3 bg-brand-green/10 rounded w-1/3" />
          <div className="h-4 bg-stone-200 dark:bg-slate-800 rounded w-3/4" />
          <div className="h-3 bg-stone-150 dark:bg-slate-800 rounded w-11/12" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center text-left">
          {adType === "standard" && (
            matchedAd ? (
              <div className="relative flex flex-col justify-between h-full font-sans">
                {/* 🌟 Mandatory Standard Legals Regulatory Checkbox/Badges */}
                <div className="absolute top-0 right-1 px-1.5 py-0.2 bg-stone-200/90 dark:bg-slate-800/95 text-[#1B3022] dark:text-slate-300 text-[8px] font-black uppercase tracking-widest rounded border border-stone-300/40 select-none">
                  {matchedAd.sponsorLabel}
                </div>

                <div className="pr-20 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9.5px] font-extrabold text-[#C5A059] uppercase tracking-wider">
                      {matchedAd.advertiserName}
                    </span>
                  </div>
                  
                  <h4 className="text-xs md:text-sm font-black text-[#1B3022] dark:text-white leading-tight tracking-tight max-w-2xl">
                    {matchedAd.headline}
                  </h4>
                  
                  {resolvedLocation !== "newsletter-sponsor" && resolvedLocation !== "hero-sponsor-strip" && (
                    <p className="text-[11px] text-[#1B3022]/80 dark:text-slate-350 leading-relaxed max-w-3xl font-medium">
                      {matchedAd.body}
                    </p>
                  )}
                  
                  {/* Subtle newsletter and strip body */}
                  {(resolvedLocation === "newsletter-sponsor" || resolvedLocation === "hero-sponsor-strip") && (
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal max-w-3xl">
                      {matchedAd.body}
                    </p>
                  )}
                </div>

                <div className="mt-2.5 shrink-0 flex items-center justify-between">
                  {/* Explanatory Data Safety Mouseover Info Icon */}
                  <div className="group relative flex items-center gap-1 text-[9.5px] text-[#1B3022]/40 dark:text-slate-500 font-semibold cursor-help">
                    <Info className="h-3.5 w-3.5" />
                    <span>Privacy Assured Offer</span>
                    <div className="absolute left-0 bottom-5 hidden group-hover:block bg-stone-900 text-white rounded p-2 text-[9px] leading-relaxed w-52 shadow-md z-30 font-sans tracking-normal border border-stone-700">
                      Wiltshire Finder never shares personal parameters with cookies or secondary networks. This specific partner campaign funds local parished coverage.
                    </div>
                  </div>

                  <a
                    href={matchedAd.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-extrabold bg-[#1C3B2B] hover:bg-[#12241b] dark:bg-[#C5A059] dark:hover:bg-[#b08c47] text-white dark:text-stone-950 rounded-md transition-all shadow-3xs cursor-pointer"
                  >
                    <span>{matchedAd.ctaText}</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-2 text-xs text-stone-500 font-sans">
                <span className="font-extrabold text-[#1B3022] tracking-tight">Prime Local sponsorship space available ({resolvedLocation})</span>
                <p className="text-[10px] text-stone-400 mt-0.5">Advertise with Wiltshire Broadband Finder to reach parished consumers.</p>
                <a href="#advertise" className="mt-1 text-[10px] font-black text-[#C5A059] hover:underline block">
                  Get Local Profile Options &rarr;
                </a>
              </div>
            )
          )}

          {/* GOOGLE ADSENSE READY EMBED PREVIEW */}
          {adType === "google" && (
            <div className="relative bg-[#FCFAF5] border border-blue-200/50 p-3 rounded-xl flex items-center justify-between gap-4 font-sans overflow-hidden">
              <div className="absolute top-1.5 right-1.5 flex items-center gap-1 select-none opacity-40">
                <span className="text-[7.5px] border border-blue-500 text-blue-500 rounded px-1 font-bold">AdByGoogle</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] md:text-xs font-black text-slate-800">
                  Google Cloud Compute Engines
                </h4>
                <p className="text-[10px] text-slate-500 leading-normal max-w-md">
                  Host enterprise SQL networks and cloud storage lines built direct for Wiltshire organizations.
                </p>
              </div>
              <a
                href="https://cloud.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center px-2 py-0.5 bg-blue-600 text-white font-extrabold text-[9px] rounded"
              >
                Start Free
              </a>
            </div>
          )}

          {/* AWS BOUNTY ACTIVE PREVIEW */}
          {adType === "aws" && (
            <div className="relative bg-[#111A2E] border border-amber-500/25 p-3 rounded-xl flex items-center justify-between gap-4 text-white font-sans overflow-hidden">
              <div className="absolute top-1.5 right-1.5 flex items-center gap-1 select-none opacity-40">
                <span className="text-[7.5px] border border-amber-400 text-amber-500 rounded px-1 font-mono uppercase">AWS Partner Ad</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] md:text-xs font-extrabold text-amber-400">
                  Amazon RDS Full-Fibre Backbone
                </h4>
                <p className="text-[10px] text-slate-350 leading-normal max-w-md">
                  Build modern databases and serverless architectures in the West Country. Zero entry overhead.
                </p>
              </div>
              <a
                href="https://aws.amazon.com/free/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center px-2 py-0.5 bg-amber-500 text-slate-900 font-black text-[9px] rounded hover:bg-amber-400"
              >
                Deploy Free
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdvertBanner;
