/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link2, Sparkles } from "lucide-react";
import { seoPagesData } from "../data/seoPages";

interface InternalLinkGridProps {
  relatedPages: string[];
  onPageClick: (pageId: string) => void;
}

export function InternalLinkGrid({ relatedPages, onPageClick }: InternalLinkGridProps) {
  if (!relatedPages || relatedPages.length === 0) return null;

  // Map requested related pages to their title and description
  const resolvedPages = relatedPages.map(pageId => {
    const data = seoPagesData[pageId];
    return {
      pageId,
      title: data ? data.h1 : "Wiltshire Telecom Solutions",
      metaDesc: data ? data.metaDescription : "Read extra county guides from our editors."
    };
  });

  return (
    <div className="bg-white border border-slate-200/95 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm text-left">
      <div className="space-y-1">
        <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Link2 className="h-5 w-5 text-indigo-600" />
          Related County Guides
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          Deeper reading and analysis compiled by Wiltshire Digital and Broadband editors:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {resolvedPages.map((page, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onPageClick(page.pageId)}
            className="group p-4 border border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/10 active:bg-indigo-50/25 transition-all text-left flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <div className="space-y-1">
              <span className="text-xs font-black text-indigo-700/90 group-hover:text-indigo-600 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-brand-gold shrink-0" /> Local Guide
              </span>
              <h4 className="text-sm font-extrabold text-slate-800 leading-snug group-hover:text-slate-900">
                {page.title}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {page.metaDesc}
              </p>
            </div>
            
            <div className="mt-4 pt-2 border-t border-slate-100 text-[10px] font-bold text-indigo-500 group-hover:translate-x-1 transition-transform self-start">
              Open Analysis Page &rarr;
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default InternalLinkGrid;
