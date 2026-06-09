/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { UserCheck } from "lucide-react";
import { SeoPageData } from "../types";

interface LastUpdatedNoticeProps {
  seoData: SeoPageData;
}

export function LastUpdatedNotice({ seoData }: LastUpdatedNoticeProps) {
  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-medium text-left">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100/50 text-indigo-600 shrink-0">
          <UserCheck className="h-5 w-5" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono block">Published By</span>
          <span className="text-slate-800 font-extrabold">{seoData.publishedBy || "Cane Communications Limited"}</span>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono block">Reviewed By</span>
          <span className="text-slate-700 font-extrabold">{seoData.reviewedBy || "Joshua Greedy"}</span>
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono block">Last Updated</span>
          <span className="text-slate-700 font-extrabold">{seoData.lastUpdated || "June 2026"}</span>
        </div>
      </div>
    </div>
  );
}

export default LastUpdatedNotice;
