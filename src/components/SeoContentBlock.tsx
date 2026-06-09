/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AlertCircle, FileText, ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { SeoPageData } from "../types";

export interface SeoContentBlockProps {
  key?: string;
  seoData?: SeoPageData;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  contentParagraphs?: string[];
  bulletPoints?: string[];
  editorNote?: string;
  ctaLabel?: string;
  ctaTarget?: string;
  relatedLinks?: { label: string; actionId: string }[];
  onAction?: (actionId: string) => void;
}

export function SeoContentBlock({
  seoData,
  eyebrow,
  heading,
  intro,
  contentParagraphs,
  bulletPoints,
  editorNote,
  ctaLabel,
  ctaTarget,
  relatedLinks,
  onAction
}: SeoContentBlockProps) {
  // If we only passed seoData (for backward-compatible inline rendering in SeoPageTemplate)
  if (seoData && !heading && !intro && !contentParagraphs && !bulletPoints) {
    return (
      <div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-left text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
          <span className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-400/20">
            <FileText className="h-5 w-5 text-indigo-450" />
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight font-sans text-white">
            Editorial Assessment & Guidelines
          </h2>
        </div>

        <div className="space-y-4">
          {seoData.supportingIntro && (
            <p className="text-sm sm:text-base text-slate-205 leading-relaxed font-sans font-bold">
              {seoData.supportingIntro}
            </p>
          )}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            The landscape of digital networks in Wiltshire is undergoing rapid expansion. Alternative broadband networks (altnets) are physical network system operators building proprietary glass fibre conduits. By contrast, mainstream national providers serve homes using either traditional copper lines (often leading to high speed drop-offs in parished zones) or hybrid coaxial pathways. 
          </p>
          <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
            When choosing standard or promotional deals, always review whether a physical site survey or installation fee applies to non-standard properties. To secure direct, unhindered broadband delivery, we advise making a full postcode availability inquiry.
          </p>
        </div>

        {seoData.sections && seoData.sections.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {seoData.sections.map((sec, idx) => (
              <div key={idx} className="group space-y-2 border-l-2 border-indigo-500 pl-4 sm:pl-5 transition-colors">
                <h3 className="text-xs sm:text-sm font-black text-white tracking-tight font-sans uppercase">
                  {sec.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {seoData.editorNote && (
          <div className="bg-amber-950/40 border border-amber-500/20 rounded-2xl p-4 flex gap-3 text-left">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-wider font-mono">Editor's Compliance Notice</span>
              <p className="text-xs text-amber-100 leading-relaxed font-medium">
                {seoData.editorNote} Speeds, prices, and available packages depend entirely on exact street alignment.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Otherwise, render the premium custom SEO block
  const displayEyebrow = eyebrow || seoData?.metaTitle || "Broadband Insights";
  const displayHeading = heading || seoData?.h1 || "Useful Information";
  const displayIntro = intro || seoData?.heroIntro || "";
  const displayParagraphs = contentParagraphs || (seoData?.supportingIntro ? [seoData.supportingIntro] : []);
  const displayBullets = bulletPoints || [];
  const displayEditorNote = editorNote || seoData?.editorNote;

  return (
    <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl text-left text-slate-205 h-full flex flex-col justify-between transition-all duration-300 hover:border-slate-700">
      <div className="space-y-5">
        {/* Header Metadata */}
        <div className="space-y-1">
          {displayEyebrow && (
            <span className="text-[11px] font-black uppercase text-brand-gold font-mono tracking-widest block">
              {displayEyebrow}
            </span>
          )}
          <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight font-sans">
            {displayHeading}
          </h3>
        </div>

        {/* Intro Copy */}
        {displayIntro && (
          <p className="text-xs md:text-sm font-bold text-slate-100 leading-relaxed font-sans">
            {displayIntro}
          </p>
        )}

        {/* Paragraphs */}
        {displayParagraphs.length > 0 && (
          <div className="space-y-3">
            {displayParagraphs.map((para, idx) => (
              <p key={idx} className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                {para}
              </p>
            ))}
          </div>
        )}

        {/* Bullet Points */}
        {displayBullets.length > 0 && (
          <div className="pt-2">
            <ul className="grid grid-cols-1 gap-2.5">
              {displayBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-350">
                  <CheckCircle2 className="h-4.5 w-4.5 text-brand-gold shrink-0 mt-0.5" />
                  <span className="leading-snug">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Editor's Compliance Note */}
        {displayEditorNote && (
          <div className="bg-amber-950/45 border-l-4 border-amber-500 rounded-r-xl p-3.5 flex gap-2.5 text-left text-xs text-amber-205">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-400 block mb-0.5 text-[10px] uppercase font-mono tracking-wider">Editor Assessment Notice:</span>
              <p className="leading-relaxed font-semibold">{displayEditorNote}</p>
            </div>
          </div>
        )}
      </div>

      {/* Actions and Related Links footer section */}
      {(ctaLabel || (relatedLinks && relatedLinks.length > 0)) && (
        <div className="pt-5 border-t border-slate-800/80 space-y-4">
          
          {ctaLabel && ctaTarget && (
            <button
              type="button"
              onClick={() => onAction && onAction(ctaTarget)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider font-sans transition-all active:scale-[0.98] select-none cursor-pointer border border-indigo-500 shadow-md"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          {relatedLinks && relatedLinks.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400 font-mono tracking-widest block">
                Related Reading & Pages
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {relatedLinks.map((link, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onAction && onAction(link.actionId)}
                    className="flex items-center gap-1.5 text-left text-xs text-slate-350 hover:text-brand-gold hover:underline transition-colors font-semibold group cursor-pointer"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-brand-gold shrink-0 transition-colors" />
                    <span className="line-clamp-1">{link.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default SeoContentBlock;
