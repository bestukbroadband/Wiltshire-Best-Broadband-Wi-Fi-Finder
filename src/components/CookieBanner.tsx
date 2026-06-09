/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ShieldCheck, X, Cookie, ArrowRight } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a decision
    const hasConsented = localStorage.getItem("wiltshire_broad_cookie_consent");
    if (!hasConsented) {
      // Trigger a subtle, elegant lazy delay to slide up smoothly
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (approved: boolean) => {
    localStorage.setItem("wiltshire_broad_cookie_consent", approved ? "accepted" : "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 md:bottom-5 md:right-5 md:left-auto md:max-w-md w-full bg-slate-900 text-white z-[9999] shadow-2xl md:rounded-2xl border border-slate-800 p-5 md:p-6 animate-slideUp text-left"
      style={{
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.3)"
      }}
    >
      <div className="space-y-4">
        {/* Banner Title & Icon */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <Cookie className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-100 font-sans">
                Privacy & Cookies
              </h4>
              <p className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase font-bold">
                Wiltshire Broadband Finder
              </p>
            </div>
          </div>
          <button 
            onClick={() => handleConsent(false)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-md hover:bg-slate-800"
            aria-label="Dismiss cookie notice"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Description */}
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          We utilise essential cookies, traffic analysis, and referral indicators to compile listed connection options across Wiltshire. Sponsored listings and partners are always explicitly marked.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button
            onClick={() => handleConsent(false)}
            className="flex-1 cursor-pointer py-2 px-3 text-center text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-750 hover:text-white rounded-xl transition-all border border-slate-700/50"
          >
            Decline
          </button>
          
          <button
            onClick={() => handleConsent(true)}
            className="flex-1 cursor-pointer py-2 px-3 text-center text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-350 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            Accept Cookies
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Advisory Compliance Label */}
        <div className="flex items-center gap-1.5 text-[9.5px] text-slate-450 border-t border-slate-800 pt-3">
          <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
          <span>Fully compliant with UK GDPR, CAP and ASA advertising regulations.</span>
        </div>
      </div>
    </div>
  );
}
export default CookieBanner;
