/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { broadbandNewsData } from "../data/broadbandNews";
import { BroadbandNewsItem } from "../types";
import { buildTrackedUrl } from "../data/trackingConfig";

export function BroadbandNewsTicker() {
  const [news, setNews] = useState<BroadbandNewsItem[]>([]);

  useEffect(() => {
    // Only fetch active news items
    const safeNewsData = Array.isArray(broadbandNewsData) ? broadbandNewsData : [];
    const activeNews = safeNewsData.filter((item) => item?.isActive);
    setNews(activeNews);
  }, []);

  if (news.length === 0) return null;

  return (
    <div 
      className="bg-slate-950 text-xs border-b border-slate-900 py-2 px-4 shadow-sm select-none w-full"
      style={{ minHeight: "38px" }}
      id="broadband-news-ticker-container"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-hidden h-full">
        {/* Ticker Label */}
        <div className="flex items-center gap-1.5 bg-brand-gold text-slate-950 font-black px-2 py-0.5 rounded uppercase tracking-wider text-[10px] shrink-0 select-none shadow">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
          Broadband watch
        </div>

        {/* Static news items - horizontal list */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth w-full py-0.5 text-slate-300">
          {news.slice(0, 4).map((item, idx) => (
            <div key={`news-static-${idx}`} className="flex items-center gap-1.5 shrink-0 text-xs md:text-sm">
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-semibold border border-emerald-900/40 tracking-wide uppercase">
                {item.category}
              </span>
              <span className="text-slate-200 font-sans font-medium whitespace-nowrap">
                {item.headline}
              </span>
              <a 
                href={buildTrackedUrl(item.sourceUrl, "default", { utm_term: "news_ticker_static" })} 
                target="_blank"  
                rel="noopener noreferrer"
                className="text-brand-gold hover:underline font-bold inline-flex items-center gap-0.5 shrink-0"
              >
                Read
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ width: "12px", height: "12px", display: "inline-block", minWidth: "12px" }}
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
              {idx < news.slice(0, 4).length - 1 && (
                <span className="text-slate-750 font-bold shrink-0 ml-1.5 text-xs">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
