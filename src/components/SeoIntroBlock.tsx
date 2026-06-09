/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield, Target } from "lucide-react";
import { SeoPageData } from "../types";

interface SeoIntroBlockProps {
  seoData: SeoPageData;
}

export function SeoIntroBlock({ seoData }: SeoIntroBlockProps) {
  return (
    <div className="bg-[#12192c] border-2 border-slate-700/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn text-left">
      <div className="flex flex-wrap items-center gap-3">
        {seoData.primaryKeyword && (
          <span className="text-[10px] sm:text-xs font-bold font-mono tracking-wider text-brand-gold bg-brand-gold-light/10 border border-brand-gold/30 px-3 py-1 rounded-full uppercase">
            Topic Focus: {seoData.primaryKeyword}
          </span>
        )}
        {seoData.searchIntent && (
          <span className="text-[10px] sm:text-xs font-bold font-mono tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full uppercase flex items-center gap-1">
            <Target className="h-3.5 w-3.5 text-brand-gold" /> Intent: {seoData.searchIntent}
          </span>
        )}
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none font-sans">
          {seoData.h1}
        </h1>
        {seoData.heroIntro && (
          <p className="text-lg sm:text-xl font-medium text-slate-250 leading-relaxed max-w-4xl">
            {seoData.heroIntro}
          </p>
        )}
      </div>

      {seoData.targetAudience && (
        <div className="pt-4 border-t border-slate-700/50 flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-slate-350">
          <span className="font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5 leading-none">
            <Shield className="h-4 w-4 text-brand-gold" /> Targeted Audience:
          </span>
          <span className="font-medium text-slate-300">{seoData.targetAudience}</span>
        </div>
      )}
    </div>
  );
}

export default SeoIntroBlock;
