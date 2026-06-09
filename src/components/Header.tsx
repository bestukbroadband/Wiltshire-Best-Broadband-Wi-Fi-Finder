/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Network, Home, Mail, Sliders, Menu, X, Landmark } from "lucide-react";
import { siteSettingsData } from "../data/siteSettings";
import { BrandLogo } from "./BrandLogo";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onEnquireClick: () => void;
}

export function Header({ activeTab, setActiveTab, onEnquireClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "providers-directory", label: "Providers Directory", icon: Network },
    { id: "best-deals", label: "Best Listed Deals", icon: Sliders },
    { id: "advertise", label: "Advertise", icon: Mail }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c101dbd] backdrop-blur-md border-b-2 border-brand-gold/30 text-white shadow-lg" id="site-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 cursor-pointer text-left group"
            >
              <BrandLogo variant="header" showText={true} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? "bg-brand-gold/25 border border-brand-gold/30 text-brand-gold font-black"
                      : "text-slate-300 hover:bg-slate-800/65 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA & Admin Shortcuts */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleNavClick("admin")}
              className={`px-3 py-1.5 border border-slate-700 hover:border-brand-gold hover:text-brand-gold rounded-lg text-[10.5px] font-black tracking-wide transition-all cursor-pointer uppercase ${
                activeTab === "admin" ? "bg-slate-900 text-brand-gold border-brand-gold/40" : "text-slate-400"
              }`}
            >
              Admin
            </button>
            <button
              onClick={onEnquireClick}
              className="px-4 py-2 bg-brand-gold hover:bg-brand-gold-hover text-slate-950 rounded-lg text-xs font-black font-sans select-none active:scale-95 transition-transform shrink-0 cursor-pointer shadow-md leading-none"
            >
              Check My Area
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-slate-800 bg-[#0c101d] pb-4 animate-slideDown">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-bold text-left transition-all ${
                    isActive
                      ? "bg-brand-gold/20 text-brand-gold font-extrabold"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="px-4 pt-3 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => handleNavClick("admin")}
              className="px-3 py-2 border border-slate-700 hover:border-brand-gold rounded-lg text-xs font-bold text-center flex-1 text-slate-300 cursor-pointer"
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onEnquireClick();
              }}
              className="px-4 py-2 bg-brand-gold hover:bg-brand-gold-hover text-slate-950 rounded-lg text-xs font-black text-center flex-1 cursor-pointer"
            >
              Check My Area
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
