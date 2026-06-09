/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Info } from "lucide-react";
import { siteSettingsData } from "../data/siteSettings";

export function LegalNotice() {
  return (
    <div className="bg-[#12192c] border-2 border-slate-700/60 p-5 rounded-xl text-xs leading-relaxed text-slate-200" id="legal-notice-block">
      <div className="flex gap-3">
        <Info className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
        <div className="space-y-2.5">
          <p className="font-extrabold text-white text-sm">Regulatory &amp; Trading Disclosures</p>
          <p>
            {siteSettingsData.disclaimers.legalCompliance}
          </p>
          <p>
            {siteSettingsData.disclaimers.commissionNotice} This independent platform gathers and displays public announcements, direct ISP submissions, and local engineering data tracks to aid rural homes and agricultural businesses.
          </p>
          <p className="text-[11px] text-slate-400">
            Wiltshire Broadband Finder is owned and operated by <span className="font-black text-brand-gold">{siteSettingsData.owner.companyName}</span> (Company number {siteSettingsData.owner.companyNumber}). Registered Office in the UK.
          </p>
        </div>
      </div>
    </div>
  );
}
