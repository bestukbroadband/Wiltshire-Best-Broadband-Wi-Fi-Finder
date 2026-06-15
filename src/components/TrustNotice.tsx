/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShieldCheck } from "lucide-react";
import { siteSettingsData } from "../data/siteSettings";

export function TrustNotice() {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 flex gap-3 text-slate-800 shadow-xs" id="trust-notice-block">
      <ShieldCheck className="h-6 w-6 text-brand-green shrink-0 mt-0.5" />
      <div className="text-sm space-y-1 text-slate-700 font-semibold">
        <p className="font-black text-[#091e36] font-sans text-base">Our Compliance &amp; Transparency Pledge</p>
        <p className="leading-relaxed">
          {siteSettingsData.disclaimers.legalCompliance} {siteSettingsData.disclaimers.commissionNotice} <strong>{siteSettingsData.disclaimers.marketLimitNotice}</strong>
        </p>
        <p className="text-xs text-slate-500 leading-relaxed mt-1 font-bold">
          * Wiltshire Broadband Finder is not a retail provider. We list popular matching options to assist Wiltshire council parishes and rural properties, but final availability is subject to direct provider confirmation.
        </p>
      </div>
    </div>
  );
}
