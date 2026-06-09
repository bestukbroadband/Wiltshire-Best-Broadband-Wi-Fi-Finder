/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Search, Scale, FileSpreadsheet, ShieldAlert } from "lucide-react";
import { siteSettingsData } from "../data/siteSettings";

export function HowItWorks() {
  const icons = [Search, Scale, FileSpreadsheet];

  return (
    <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 md:p-8" id="how-it-works">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Simple Process</span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-green mt-1.5">
          How Wiltshire Broadband Finder Works
        </h2>
        <p className="text-xs md:text-sm text-stone-600 mt-2">
          Find the best rural connectivity solutions within minutes by following three simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {siteSettingsData.howItWorks.steps.map((step, index) => {
          const IconComponent = icons[index] || Search;
          return (
            <div key={index} className="bg-white p-5 rounded-xl border border-stone-100 hover:border-brand-gold transition-all flex flex-col justify-between group shadow-xs">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="p-2.5 bg-brand-green/10 rounded-lg text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors" aria-hidden="true">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-extrabold text-stone-300 font-mono group-hover:text-brand-gold transition-colors">
                    {step.stepNumber}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-brand-green leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compliance Note */}
      <div className="mt-8 pt-6 border-t border-stone-200 bg-brand-gold-light/40 border border-brand-gold/20 p-4 rounded-xl flex gap-3 text-[11px] leading-relaxed text-brand-green">
        <ShieldAlert className="h-4.5 w-4.5 text-brand-gold shrink-0 mt-0.5" />
        <p>
          <span className="font-bold">Important Notice:</span> {siteSettingsData.howItWorks.note} We operate independent comparisons of listed packages and wholesale scopes, and never pre-approve line ordering.
        </p>
      </div>
    </div>
  );
}
