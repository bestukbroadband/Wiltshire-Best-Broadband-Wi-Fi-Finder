/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Network, HelpCircle, Mail, Map } from "lucide-react";
import { siteSettingsData } from "../data/siteSettings";
import { providerCategoriesData } from "../data/providerCategories";
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

  // Get a selection of 6 prominent Wiltshire towns for high layout variety
  const featuredTowns = townsData.slice(0, 8);

  return (
    <footer className="bg-[#0b0e1a] border-t border-slate-800 text-slate-300 text-xs py-12 md:py-16" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* FOOTER MULTICOLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* SITE INFO AND BRAND COLUMN */}
          <div className="space-y-4 md:col-span-1">
            <BrandLogo variant="footer" showText={true} />
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Assisting rural Wiltshire households and agricultural ventures in connecting with high-speed full fibre, altnet, 5G, and orbit satellite arrays.
            </p>
            <div className="text-[10px] text-slate-450 space-y-1.5 leading-tight">
              <p className="font-extrabold text-brand-gold">Project of: {siteSettingsData.owner.companyName}</p>
              <p>Company Reg No: {siteSettingsData.owner.companyNumber}</p>
              <p>Enquiry Email: <a href={`mailto:${siteSettingsData.owner.contactEmail}`} className="text-brand-gold hover:underline transition-colors font-bold" id="footer-contact-email-link">Info</a></p>
            </div>
          </div>

          {/* SEO GUIDES COLUMN */}
          <div className="space-y-3">
            <h4 className="text-brand-gold text-xs font-black uppercase tracking-widest border-b border-slate-800 pb-2">
              Broadband Guides
            </h4>
            <ul className="space-y-2 text-[11px] font-semibold">
              <li>
                <button onClick={() => handleLinkClick("best-broadband-wiltshire")} className="text-slate-300 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Best Broadband in Wiltshire
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("best-wifi-wiltshire")} className="text-slate-300 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Best WiFi in Wiltshire
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("rural-broadband-wiltshire")} className="text-slate-300 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Best Rural Broadband
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("full-fibre-broadband-wiltshire")} className="text-slate-300 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Full Fibre Wiltshire
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("alternative-network-broadband-wiltshire")} className="text-slate-300 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Alternative Networks
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("broadband-deals-wiltshire")} className="text-slate-300 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Broadband Deals Wiltshire
                </button>
              </li>
            </ul>
          </div>

          {/* POPULAR TOWNS COLUMN */}
          <div className="space-y-3">
            <h4 className="text-brand-gold text-xs font-black uppercase tracking-widest border-b border-slate-800 pb-2">
              Wiltshire Towns Covered
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] font-semibold">
              {featuredTowns.map((town) => (
                <button
                  key={town.id}
                  onClick={() => handleTownClick(town.id)}
                  className="text-slate-300 hover:text-brand-gold hover:underline transition-colors text-left truncate cursor-pointer"
                >
                  {town.name}
                </button>
              ))}
            </div>
          </div>

          {/* COMPLIANCE PAGES COLUMN */}
          <div className="space-y-3">
            <h4 className="text-brand-gold text-xs font-black uppercase tracking-widest border-b border-slate-800 pb-2">
              Legal &amp; Partners
            </h4>
            <ul className="space-y-2 text-[11px] font-semibold">
              <li>
                <button onClick={() => handleLinkClick("list-provider")} className="text-brand-gold hover:text-brand-gold-hover hover:underline transition-colors cursor-pointer text-left font-black">
                  List Your Broadband Service
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("advertise")} className="text-brand-gold hover:text-brand-gold-hover hover:underline transition-colors cursor-pointer text-left font-black">
                  Advertise With Us
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("privacy")} className="text-slate-300 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("terms")} className="text-slate-300 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Terms of Use
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("cookie")} className="text-slate-300 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("contact")} className="text-slate-300 hover:text-brand-gold hover:underline transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* REGULATORY DISCLAIMER ZONE - MUST BE PROMINENT */}
        <div className="pt-8 border-t border-slate-800 space-y-4">
          <div className="bg-[#12192c] p-4 rounded-xl border-2 border-slate-750 text-[10.5px] leading-relaxed text-slate-300 space-y-2.5 shadow-md">
            <p>
              <strong>Compliance Disclaimer:</strong> {siteSettingsData.disclaimers.legalCompliance}
            </p>
            <p>
              <strong>Commission Wording Detail:</strong> {siteSettingsData.disclaimers.commissionNotice} {siteSettingsData.disclaimers.marketLimitNotice} We make zero guarantees regarding line speeds or package costs.
            </p>
          </div>

          {/* COPYRIGHT SHIELD */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-sans">
            <p>{siteSettingsData.disclaimers.footerCopyright}</p>
            <p>{siteSettingsData.disclaimers.footerTradingStyle}</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
export default Footer;
