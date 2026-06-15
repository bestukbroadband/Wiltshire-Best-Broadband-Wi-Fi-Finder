/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { siteSettingsData } from "../data/siteSettings";
import { townsData } from "../data/towns";
import { BrandLogo } from "./BrandLogo";

interface FooterProps {
  onNavClick: (tabId: string) => void;
  activeTab: string;
}

export function Footer({ onNavClick, activeTab }: FooterProps) {
  const handleLinkClick = (tabId: string) => {
    onNavClick(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTownClick = (townId: string) => {
    onNavClick(`town-${townId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const featuredTowns = townsData.slice(0, 10);

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-800 text-xs py-12 md:py-16" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* FOOTER MULTICOLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* SITE INFO AND BRAND COLUMN */}
          <div className="space-y-4 md:col-span-1">
            <BrandLogo variant="lightBackground" size="w-8 h-8" showText={true} />
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Wiltshire Broadband Finder is an independent local broadband information guide. We assist Wiltshire households and communities in identifying listed broadband and WiFi operator choices.
            </p>
            <div className="text-xs text-slate-500 space-y-1 leading-normal font-semibold">
              <p className="font-extrabold text-brand-green">Owner: {siteSettingsData.owner.companyName}</p>
              <p>Company Number: {siteSettingsData.owner.companyNumber}</p>
              <p>Email: <a href={`mailto:${siteSettingsData.owner.contactEmail}`} className="text-brand-green hover:underline font-bold">bestukbroaband@proton.me</a></p>
            </div>
          </div>

          {/* BROADBAND OPTIONS & CHANNELS */}
          <div className="space-y-3">
            <h4 className="text-[#091e36] text-xs font-black uppercase tracking-wider border-b border-slate-200 pb-2">
              Broadband Providers
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-605">
              <li>
                <button onClick={() => handleLinkClick("providers-directory")} className="text-slate-700 hover:text-brand-green transition-colors cursor-pointer text-left">
                  Listed Broadband Providers
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("best-deals")} className="text-slate-700 hover:text-brand-green transition-colors cursor-pointer text-left">
                  Best Listed Deals
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("alt-net")} className="text-slate-705 hover:text-brand-green transition-colors cursor-pointer text-left">
                  Regional &amp; Alternative Networks
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("home")} className="text-slate-700 hover:text-brand-green transition-colors cursor-pointer text-left">
                  Search Postcode Areas
                </button>
              </li>
            </ul>
          </div>

          {/* POPULAR TOWNS COLUMN */}
          <div className="space-y-3">
            <h4 className="text-[#091e36] text-xs font-black uppercase tracking-wider border-b border-slate-200 pb-2">
              Wiltshire Market Towns
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-bold text-slate-650">
              {featuredTowns.map((town) => (
                <button
                  key={town.id}
                  onClick={() => handleTownClick(town.id)}
                  className="text-slate-700 hover:text-brand-green transition-colors text-left truncate cursor-pointer"
                >
                  {town.name}
                </button>
              ))}
            </div>
          </div>

          {/* UTILITY & SUPPORT COLUMN */}
          <div className="space-y-3">
            <h4 className="text-[#091e36] text-xs font-black uppercase tracking-wider border-b border-slate-200 pb-2">
              Get Updates &amp; Contact
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-650">
              <li>
                <button onClick={() => handleLinkClick("home")} className="text-slate-700 hover:text-brand-green transition-colors cursor-pointer text-left">
                  Get updates
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("list-provider")} className="text-brand-green hover:underline cursor-pointer text-left">
                  List your broadband service
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("advertise")} className="text-slate-700 hover:text-brand-green transition-colors cursor-pointer text-left">
                  How we track offers
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("privacy")} className="text-slate-700 hover:text-brand-green transition-colors cursor-pointer text-left">
                  Privacy note
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("terms")} className="text-slate-700 hover:text-brand-green transition-colors cursor-pointer text-left">
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* REGULATORY DISCLAIMER ZONE - MUST BE PROMINENT */}
        <div className="pt-8 border-t border-slate-200 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-800 space-y-2.5 font-semibold">
            <p id="footer-availability-disclaimer">
              <strong>Provider availability disclaimer:</strong> Wiltshire Broadband Finder does not sell broadband directly. Always confirm availability, speeds, pricing, installation and contract terms with the provider before ordering.
            </p>
            <p>
              <strong>Commission Announcement:</strong> We may receive referral fees, commission, advertising support, or sponsorship payments from some of the operators listed on this site. This is independent from provider checker checks.
            </p>
          </div>

          {/* COPYRIGHT SHIELD */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-505 font-bold font-sans">
            <p>{siteSettingsData.disclaimers.footerCopyright}</p>
            <p>{siteSettingsData.disclaimers.footerTradingStyle}</p>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
