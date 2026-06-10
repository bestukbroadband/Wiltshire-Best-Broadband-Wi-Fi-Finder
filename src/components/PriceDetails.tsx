/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Info, AlertTriangle, CheckSquare, Server, HelpCircle } from "lucide-react";
import { ContractLengthBadge } from "./ContractLengthBadge";

interface PriceDetailsProps {
  // New standardized props
  monthlyPrice?: number;
  knownAnnualPriceRise?: string;
  priceAfterMinimumTerm?: number;

  // Backward compatibility props
  monthlyPriceFrom?: number;
  monthlyPriceAfterContract?: number;
  annualPriceRiseNote?: string;

  contractLength: number;
  setupFee: number;
  routerCost: number;
  routerIncluded: boolean;
  installationFee: number;
  deliveryFee: number;
  midContractPriceRise: boolean;
  lastCheckedDate: string;
  priceStatus?: "Active" | "Pending Review" | "Expired" | "Featured" | string;
  priceDisclaimer?: string;
  isDark?: boolean;
}

export function PriceDetails({
  monthlyPrice,
  knownAnnualPriceRise,
  priceAfterMinimumTerm,
  monthlyPriceFrom,
  monthlyPriceAfterContract,
  annualPriceRiseNote,
  contractLength,
  setupFee,
  routerCost,
  routerIncluded,
  installationFee,
  deliveryFee,
  midContractPriceRise,
  lastCheckedDate,
  priceStatus = "Active",
  priceDisclaimer,
  isDark = false,
}: PriceDetailsProps) {
  const resolvedMonthlyPrice = monthlyPrice ?? monthlyPriceFrom ?? 0;
  const resolvedPriceAfterMinimumTerm = priceAfterMinimumTerm ?? monthlyPriceAfterContract;
  const resolvedKnownAnnualPriceRise = knownAnnualPriceRise ?? annualPriceRiseNote;

  const showPriceRiseUnknown =
    !resolvedKnownAnnualPriceRise ||
    resolvedKnownAnnualPriceRise.trim() === "" ||
    resolvedKnownAnnualPriceRise.toLowerCase().includes("not yet confirmed") ||
    resolvedKnownAnnualPriceRise.toLowerCase() === "unknown";

  const priceRiseText = showPriceRiseUnknown
    ? "Price rise details not yet confirmed. Check the final contract before ordering."
    : resolvedKnownAnnualPriceRise;

  const bgClasses = isDark
    ? "bg-slate-900/90 border-2 border-slate-700/60 text-slate-100"
    : "bg-stone-50 border-2 border-slate-200 text-slate-900";

  const labelClasses = isDark ? "text-slate-400 font-medium" : "text-slate-650 font-medium";
  const valueClasses = isDark ? "text-slate-100 font-extrabold" : "text-slate-900 font-extrabold";
  const sectionTitleClasses = isDark ? "text-brand-gold font-bold uppercase tracking-wider" : "text-brand-green font-bold uppercase tracking-wider";

  return (
    <div className={`rounded-2xl p-4 md:p-5 space-y-4 ${bgClasses}`} id="pricing-details-grid-wrapper">
      {/* 1. Header Section with Main Pricing Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-dashed border-slate-700/30 pb-3 gap-2">
        <div>
          <span className={`text-[10px] ${sectionTitleClasses}`}>Broadband Tariff Breakdowns</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl font-black font-sans leading-none">
              £{resolvedMonthlyPrice.toFixed(2)}
            </span>
            <span className="text-xs font-semibold">/ month</span>
          </div>
        </div>
        <div className="sm:text-right">
          <span className="text-[10.5px] leading-tight block font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/10 max-w-xs">
            Example price only. Final price confirmed by provider.
          </span>
        </div>
      </div>

      {/* 2. Structured Details Layout (Satisfying all required fields & labels) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
        {/* Core Contract Terms */}
        <div className="flex justify-between items-center py-1 border-b border-slate-200/40 dark:border-slate-800/40">
          <span className={labelClasses}>Contract length:</span>
          <span className={valueClasses}>
            {contractLength === 0 ? "Rolling Contract" : `${contractLength} Months`}
          </span>
        </div>

        <div className="flex justify-between items-center py-1 border-b border-slate-200/40 dark:border-slate-800/40">
          <span className={labelClasses}>Monthly price:</span>
          <span className={`${valueClasses} text-emerald-500 font-black`}>
            £{resolvedMonthlyPrice.toFixed(2)} / mo
          </span>
        </div>

        {/* Setup and Hardware Costs */}
        <div className="flex justify-between items-center py-1 border-b border-slate-200/40 dark:border-slate-800/40">
          <span className={labelClasses}>Setup cost:</span>
          <span className={valueClasses}>
            £{setupFee.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center py-1 border-b border-slate-200/40 dark:border-slate-800/40">
          <span className={labelClasses}>Router cost:</span>
          <span className={valueClasses}>
            £{routerCost.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center py-1 border-b border-slate-200/40 dark:border-slate-800/40">
          <span className={labelClasses}>Installation fee:</span>
          <span className={valueClasses}>
            {installationFee === 0 ? "Included" : `£${installationFee.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between items-center py-1 border-b border-slate-200/40 dark:border-slate-800/40">
          <span className={labelClasses}>Delivery fee:</span>
          <span className={valueClasses}>
            {deliveryFee === 0 ? "Included" : `£${deliveryFee.toFixed(2)}`}
          </span>
        </div>

        {/* Future Costs & Expiration */}
        <div className="flex justify-between items-center py-1 border-b border-slate-200/40 dark:border-slate-800/40">
          <span className={labelClasses}>Router included:</span>
          <span className={`${valueClasses} flex items-center gap-1`}>
            {routerIncluded ? "Yes (Free Bundle)" : `No (Extra £${routerCost.toFixed(2)})`}
          </span>
        </div>

        <div className="flex justify-between items-center py-1 border-b border-slate-200/40 dark:border-slate-800/40">
          <span className={labelClasses}>Price after contract:</span>
          <span className={valueClasses}>
            {resolvedPriceAfterMinimumTerm ? `£${resolvedPriceAfterMinimumTerm.toFixed(2)} / mo` : "Not specified"}
          </span>
        </div>
      </div>

      {/* 3. Price Adjustments (Mid Contract Price Rise and Known Annual price changes) */}
      <div className="pt-2 border-t border-dashed border-slate-700/30 space-y-2">
        <div className="flex flex-col gap-1.5 bg-amber-500/5 p-3 rounded-xl border border-amber-500/20 text-xs">
          <span className="font-black flex items-center gap-1.5 text-amber-500">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Known price change
          </span>
          <p className="leading-relaxed font-semibold">
            {priceRiseText}
          </p>
          {midContractPriceRise && (
            <p className="text-[10px] text-amber-600/90 dark:text-amber-300/80 leading-normal">
              * Note: This package permits index-linked mid-contract adjustments based on annual CPI/RPI rate hikes.
            </p>
          )}
        </div>
      </div>

      {/* 4. Integrity and Last Update stamp */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[10px] uppercase font-mono tracking-wider font-bold">
        <span className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 inline text-emerald-500 shrink-0" />
          Last checked: <span className="font-black text-emerald-500">{lastCheckedDate}</span>
        </span>
        <span className={`px-2 py-0.5 rounded border ${isDark ? "bg-slate-850 border-slate-755 text-slate-300" : "bg-stone-150 border-slate-200 text-slate-700"}`}>
          Status: {priceStatus}
        </span>
      </div>
    </div>
  );
}

export default PriceDetails;
