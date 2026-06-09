/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { broadbandNewsData } from "../data/broadbandNews";
import { BroadbandNewsItem } from "../types";
import { buildTrackedUrl } from "../data/trackingConfig";

export function BroadbandNewsTicker() {
  const [news, setNews] = useState<BroadbandNewsItem[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [fadeIndex, setFadeIndex] = useState(0);

  useEffect(() => {
    // Only fetch active news items
    const activeNews = broadbandNewsData.filter((item) => item.isActive);
    setNews(activeNews);

    // Respect reduced motion setting
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // For static fade transition under reduced motion
  useEffect(() => {
    if (prefersReducedMotion && news.length > 0) {
      const interval = setInterval(() => {
        setFadeIndex((prev) => (prev + 1) % news.length);
      }, 5000); // cycle every 5 seconds
      return () => clearInterval(interval);
    }
  }, [prefersReducedMotion, news]);

  if (news.length === 0) return null;

  return (
    <div 
      className="bg-slate-950 text-xs border-b border-slate-800 py-2.5 px-4 overflow-hidden relative select-none"
      id="broadband-news-ticker-container"
    >
      <div className="max-w-7xl mx-auto flex items-center h-5">
        {/* Ticker Label */}
        <div className="flex items-center gap-1.5 bg-brand-gold text-slate-950 font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider text-[10px] z-10 shrink-0 select-none shadow mr-4 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
          Broadband watch
        </div>

        {/* Scrolling Content */}
        {!prefersReducedMotion ? (
          <div 
            className="relative w-full overflow-hidden flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* The animation container holding duplicate lists for seamless loop */}
            <div 
              className="flex whitespace-nowrap gap-16 animate-marquee shrink-0"
              style={{
                animationPlayState: isHovered ? "paused" : "running",
                animationDuration: "45s", // Very slow, readable speed
              }}
            >
              {news.map((item, idx) => (
                <div key={`news-scroll-1-${idx}`} className="inline-flex items-center gap-2">
                  {/* Category Tag */}
                  <span className="text-[10px] bg-emerald-950 text-emerald-350 px-1.5 py-0.5 rounded font-semibold border border-emerald-900/45 tracking-wide">
                    {item.category}
                  </span>
                  {/* Headline */}
                  <span className="text-slate-300 font-sans tracking-wide">
                    {item.headline}
                  </span>
                  {/* Separator / Date */}
                  <span className="text-slate-500 text-[10px] uppercase font-mono">
                    ({item.publishedDate})
                  </span>
                  {/* Source Trigger link */}
                  <a 
                    href={buildTrackedUrl(item.sourceUrl, "default", { utm_term: "news_ticker" })} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-gold hover:underline cursor-pointer flex items-center gap-0.5 font-bold animate-pulse"
                  >
                    Read
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>

            {/* Duplicate for seamless infinite scrolling */}
            <div 
              className="flex whitespace-nowrap gap-16 animate-marquee shrink-0 aria-hidden"
              style={{
                animationPlayState: isHovered ? "paused" : "running",
                animationDuration: "45s",
              }}
            >
              {news.map((item, idx) => (
                <div key={`news-scroll-2-${idx}`} className="inline-flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-950 text-emerald-350 px-1.5 py-0.5 rounded font-semibold border border-emerald-900/45 tracking-wide">
                    {item.category}
                  </span>
                  <span className="text-slate-300 font-sans tracking-wide">
                    {item.headline}
                  </span>
                  <span className="text-slate-500 text-[10px] uppercase font-mono">
                    ({item.publishedDate})
                  </span>
                  <a 
                    href={buildTrackedUrl(item.sourceUrl, "default", { utm_term: "news_ticker" })} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-gold hover:underline cursor-pointer flex items-center gap-0.5 font-bold animate-pulse"
                  >
                    Read
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Reduced Motion: Static cycling with smooth subtle fade cross-dissolve */
          <div className="relative w-full h-full flex items-center transition-all duration-500 overflow-hidden">
            {news.map((item, idx) => (
              <div 
                key={`news-fade-${idx}`}
                className={`absolute inset-y-0 left-0 right-0 flex items-center gap-2 text-slate-300 font-sans tracking-wide transition-all duration-700 ${
                  fadeIndex === idx ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-1 scale-95 pointer-events-none"
                }`}
              >
                <span className="text-[10px] bg-emerald-950 text-emerald-350 px-1.5 py-0.5 rounded font-semibold border border-emerald-900/45 tracking-wide whitespace-nowrap">
                  {item.category}
                </span>
                <span className="text-slate-300 font-sans tracking-wide truncate max-w-[50%] md:max-w-[70%]">
                  {item.headline}
                </span>
                <span className="text-slate-500 text-[10px] uppercase font-mono whitespace-nowrap">
                  ({item.publishedDate})
                </span>
                <a 
                  href={buildTrackedUrl(item.sourceUrl, "default", { utm_term: "news_ticker_reduced" })} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:underline font-bold whitespace-nowrap cursor-pointer inline-flex items-center gap-0.5"
                >
                  Read
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
