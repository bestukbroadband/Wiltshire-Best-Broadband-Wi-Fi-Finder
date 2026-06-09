/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShieldCheck } from "lucide-react";
import { siteSettingsData } from "../data/siteSettings";

export function TrustNotice() {
  return (
    <div className="bg-[#12192c] border-2 border-brand-gold/30 rounded-xl p-4 flex gap-3 text-slate-100" id="trust-notice-block">
      <ShieldCheck className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
      <div className="text-xs space-y-1 text-slate-305">
        <p className="font-extrabold text-white font-sans text-sm">Our Compliance &amp; Transparency Pledge</p>
        <p className="leading-relaxed text-slate-200">
          {siteSettingsData.disclaimers.legalCompliance} {siteSettingsData.disclaimers.commissionNotice} <strong>{siteSettingsData.disclaimers.marketLimitNotice}</strong>
        </p>
        <p className="text-[10px] text-slate-400 leading-relaxed mt-1 font-semibold">
          * Wiltshire Broadband Finder is not a retail provider. We list popular matching options to assist Wiltshire council parishes and rural properties, but final availability is subject to direct provider confirmation.
        </p>
      </div>
    </div>
  );
}
