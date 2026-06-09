/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { providersData } from "../data/providers";
import { calculateDealRankings } from "../data/pricingSources";
import { rankingRulesData, rankingBadges } from "../data/rankingRules";
import { DealRanking } from "./DealRanking";
import { SponsoredDealCard } from "./SponsoredDealCard";
import { Sparkles, HelpCircle, FileText, BadgeCheck } from "lucide-react";
import { Provider } from "../types";

interface BestDealsSectionProps {
  onEnquire: (p: Provider) => void;
  limit?: number;
}

export function BestDealsSection({ onEnquire, limit = 5 }: BestDealsSectionProps) {
  const [showExplainer, setShowExplainer] = useState(false);

  // Recalculate ranks to verify they are perfectly sorted according to compliance logic
  const rankedDeals = calculateDealRankings(providersData);
  const displayedDeals = rankedDeals.slice(0, limit);

  return (
    <div className="space-y-6" id="best-deals-section">
      <div className="bg-[#12192c] border-2 border-slate-700/60 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-brand-gold/10 rounded-xl text-brand-gold shrink-0 border border-brand-gold/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                {rankingRulesData.label}
              </h2>
              <p className="text-xs text-slate-350 mt-1">
                Wiltshire's leading altnet and mainstream offers scored transparently.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowExplainer(!showExplainer)}
            className="text-xs font-bold text-brand-gold bg-slate-900 border border-brand-gold/40 hover:bg-slate-800 px-3.5 py-2 rounded-lg flex items-center gap-1.5 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <HelpCircle className="h-4 w-4 text-brand-gold" />
            <span>How rankings work</span>
          </button>
        </div>

        {/* COMPLIANT RANKING NOTE */}
        <p className="text-[11.5px] leading-relaxed text-slate-300 border-l-2 border-brand-gold pl-3">
          &ldquo;{rankingRulesData.transparentNote}&rdquo;
        </p>

        {/* DYNAMIC RULES EXPLAINER TOGGLE */}
        {showExplainer && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3.5 animate-fadeIn shadow-inner">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold">Scoring breakdown criteria</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 text-xs">
              {rankingRulesData.criteriaWeightings.map((weight) => (
                <div key={weight.metric} className="p-3 bg-[#12192c] rounded-lg border border-slate-800">
                  <span className="text-brand-gold font-black text-sm block">{weight.weight}</span>
                  <span className="font-bold text-white block mt-1">{weight.metric}</span>
                  <span className="text-[10.5px] text-slate-400 block leading-tight mt-1">{weight.explanation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RANKING LEGENDS/BADGES LIST */}
        <div className="space-y-1.5 pt-2">
          <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block tracking-wider">Scoring Badge Indicators</span>
          <div className="flex flex-wrap gap-1.5">
            {rankingBadges.map((badge) => (
              <span
                key={badge.id}
                className={`px-2 py-0.5 text-[9px] uppercase tracking-wider rounded border border-transparent select-none shadow-sm ${badge.colorClass}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* DEAL ROWS */}
      <div className="space-y-4">
        {providersData.filter((p) => p.isSponsored).slice(0, 1).map((spon) => (
          <SponsoredDealCard
            key={`spon-deal-card-${spon.id}`}
            provider={spon}
            onEnquire={onEnquire}
          />
        ))}
        {displayedDeals.map((provider, index) => (
          <DealRanking
            key={provider.id}
            provider={provider}
            rank={index + 1}
            onEnquire={onEnquire}
          />
        ))}
      </div>
    </div>
  );
}
export default BestDealsSection;
