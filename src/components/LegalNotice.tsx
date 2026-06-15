/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Info } from "lucide-react";
import { siteSettingsData } from "../data/siteSettings";

export function LegalNotice() {
  return (
    <div className="bg-white border-2 border-slate-200 p-5 rounded-3xl text-sm leading-relaxed text-slate-700 shadow-xs" id="legal-notice-block">
      <div className="flex gap-3">
        <Info className="h-6 w-6 text-brand-green shrink-0 mt-0.5" />
        <div className="space-y-2.5 font-semibold">
          <p className="font-black text-[#091e36] text-base">Regulatory &amp; Trading Disclosures</p>
          <p>
            {siteSettingsData.disclaimers.legalCompliance}
          </p>
          <p>
            {siteSettingsData.disclaimers.commissionNotice} This independent platform gathers and displays public announcements, direct ISP submissions, and local engineering data tracks to aid rural homes and agricultural businesses.
          </p>
          <p className="text-xs text-slate-500 font-bold">
            Wiltshire Broadband Finder is owned and operated by <span className="font-black text-brand-green">{siteSettingsData.owner.companyName}</span> (Company number {siteSettingsData.owner.companyNumber}). Registered Office in the UK.
          </p>
        </div>
      </div>
    </div>
  );
}
