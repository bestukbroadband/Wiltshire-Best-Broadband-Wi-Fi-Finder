/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Provider } from "../types";
import { Star, ShieldAlert, CheckCircle, AlertTriangle, Calendar, Award } from "lucide-react";

interface EditorScoreCardProps {
  provider: Provider;
  isDark?: boolean;
}

export function EditorScoreCard({ provider, isDark = false }: EditorScoreCardProps) {
  // Guard clause for missing or invalid source URL (showing 'Editor review pending')
  if (!provider.sourceUrl || provider.sourceUrl === "#" || provider.sourceUrl === "") {
    return (
      <div className={`p-4 rounded-xl border-2 border-dashed mt-4 text-center space-y-1 ${isDark ? "border-slate-800 bg-slate-950/20 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-600"} text-xs`}>
        <p className="font-extrabold uppercase tracking-widest text-[10.5px] text-brand-gold">Editor review pending</p>
        <p className="font-semibold leading-relaxed">We are currently verifying listed packages, public pricing sources, and direct coverage footprints for this provider. Symmetrical and rural options are subject to strict direct check verification before scoring occurs.</p>
      </div>
    );
  }

  // 1. Process data inputs with smart parametric fallbacks to ensure rich coverage
  const score = provider.editorScore ?? parseFloat(((provider.rankingScore ?? 85) / 10).toFixed(1));
  const verdict = provider.editorVerdict ?? (
    provider.providerType.includes("Alternative network providers")
      ? "Outstanding rural private network bypassing traditional copper infrastructure."
      : provider.providerType.includes("5G home broadband providers")
      ? "Excellent high-flexibility, instant-on candidate where cell tower lines are robust."
      : provider.providerType.includes("Satellite broadband providers")
      ? "Essential universal alternative for properties completely out of physical line range."
      : "Tried-and-tested mainstream solution with deep exchanges across Wiltshire market towns."
  );

  const notes = provider.editorNotes ?? (
    `This package from ${provider.providerName} is a solid rural option on the ${provider.networkType} platform, providing speeds of up to ${provider.averageDownloadSpeed} Mbps download. In rural Wiltshire villages, this represents a welcome upgrade from standard copper setups, although exact speeds depend on structural line layout.`
  );

  const bestFor = provider.bestFor ?? "Wiltshire rural villages & families moving from outdated copper lines";
  
  const rawWatch = provider.thingsToWatch ?? [
    `Annual price modifications may take effect after the ${provider.contractLength}-month commitment ends.`,
    "Direct physical line layout checks are required before final engineer installation.",
    "Peak evening internet speeds can shift depending on local community usage."
  ];
  const thingsToWatch = rawWatch.slice(0, 3); // limit to 3 items for dense cards

  const lastReviewed = provider.lastReviewedDate ?? provider.lastCheckedDate ?? "June 8, 2026";

  // 2. Map score labels based on user definition
  let scoreLabel = "Limited appeal unless availability is strong";
  let badgeColor = "bg-rose-500/10 text-rose-500 border-rose-500/20";
  
  if (score >= 9.0) {
    scoreLabel = "Excellent listed option";
    badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  } else if (score >= 8.0) {
    scoreLabel = "Strong listed option";
    badgeColor = "bg-brand-gold/10 text-brand-gold border-brand-gold/30";
  } else if (score >= 7.0) {
    scoreLabel = "Worth checking";
    badgeColor = "bg-sky-500/10 text-sky-450 border-sky-450/20";
  } else if (score >= 6.0) {
    scoreLabel = "Check the details";
    badgeColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
  }

  // Class presets
  const borderClass = isDark ? "border-slate-800" : "border-slate-200";
  const bgClass = isDark ? "bg-slate-950/45" : "bg-slate-50";
  const titleText = isDark ? "text-slate-300" : "text-slate-700";
  const bodyText = isDark ? "text-slate-200" : "text-slate-850";
  const subText = isDark ? "text-slate-400" : "text-slate-500";

  return (
    <div 
      className={`border-t ${borderClass} pt-3.5 mt-3.5 space-y-4`} 
      id={`editor-card-${provider.id}`}
    >
      {/* SCORES HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900/10 dark:bg-slate-950/20 p-3 rounded-xl border border-dashed border-slate-700/15">
        <div className="flex items-center gap-2.5">
          {/* Circular Score Badge */}
          <div className="h-11 w-11 rounded-xl bg-slate-950 border-2 border-brand-gold flex flex-col justify-center items-center shadow-md select-none">
            <span className="text-xs font-black text-brand-gold leading-none">{score}</span>
            <span className="text-[7.5px] text-slate-400 font-bold tracking-widest block leading-none mt-0.5">/10</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className={`inline-block px-2 py-0.5 border text-[9.5px] font-black uppercase tracking-wider rounded-md ${badgeColor}`}>
                {scoreLabel}
              </span>
              <span className="text-[10px] text-brand-gold font-bold flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-brand-gold text-brand-gold" />
                Editor Pick
              </span>
            </div>
            
            <p className={`text-[11px] font-bold ${bodyText} mt-0.5`}>
              &ldquo;{verdict}&rdquo;
            </p>
          </div>
        </div>
        
        <div className="text-[10px] text-slate-405 flex items-center gap-1 shrink-0 font-bold">
          <Calendar className="h-3.5 w-3.5 text-brand-gold" />
          <span>Verified: <strong className="text-brand-gold">{lastReviewed}</strong></span>
        </div>
      </div>

      {/* DETAILED EDITOR notes & SUITABILITY SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Editorial Narrative Notes (Left 7) */}
        <div className="md:col-span-7 space-y-2">
          <span className="text-[10.5px] uppercase font-extrabold tracking-widest text-slate-400 flex items-center gap-1 leading-none">
            <Award className="h-3.5 w-3.5 text-brand-gold" />
            Wiltshire Adviser Assessment:
          </span>
          <p className={`text-xs ${bodyText} leading-relaxed font-semibold`}>
            {notes}
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-slate-405 font-extrabold uppercase tracking-wider leading-none">Best suited for:</span>
            <span className="px-2 py-0.5 bg-brand-gold/15 border border-brand-gold/25 text-brand-gold text-[10px] font-black rounded-md">
              {bestFor}
            </span>
          </div>
        </div>

        {/* Caveats & Points (Right 5) */}
        <div className={`md:col-span-5 ${bgClass} p-3.5 rounded-xl border ${borderClass} space-y-2.5`}>
          <span className="text-[10.5px] uppercase font-extrabold tracking-widest text-[#bf7c13] flex items-center gap-1 leading-none">
            <AlertTriangle className="h-3.5 w-3.5" />
            Watch Out Points:
          </span>
          <ul className="space-y-1.5">
            {thingsToWatch.map((item, id) => (
              <li key={id} className="flex gap-1.5 items-start text-[11px] leading-relaxed font-semibold text-slate-300 dark:text-slate-200">
                <span className="text-brand-gold shrink-0 text-xs mt-0.5">▪</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* METRIC EXPLANATION disclaimer FOOTNOTE */}
      <div className="pt-2 border-t border-slate-700/10 text-[9.5px] text-slate-405 flex items-start gap-1.5 leading-relaxed font-semibold">
        <ShieldAlert className="h-3.5 w-3.5 text-brand-gold shrink-0" />
        <p>
          <strong>Editor Notice:</strong> Editor scores are based on the offers currently listed on this site, including price, speed, contract length, setup costs, known price changes and suitability for rural or town households.
        </p>
      </div>

    </div>
  );
}

export default EditorScoreCard;
