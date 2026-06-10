/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useMemo } from "react";
import { 
  Search, 
  Sparkles, 
  Globe, 
  MapPin, 
  Info, 
  CheckCircle, 
  Building, 
  ExternalLink,
  ChevronRight,
  Filter,
  Check,
  User,
  ArrowRight,
  GraduationCap,
  Network
} from "lucide-react";
import { providerDirectoryData, normaliseProviderName } from "../data/providerDirectory";
import { JsonLdSchema } from "./JsonLdSchema";
import { ProviderComparisonBlocks } from "./ProviderComparisonBlocks";
import { 
  createWebPageSchema, 
  createBreadcrumbSchema, 
  createFAQSchema, 
  createItemListSchema 
} from "../data/schemaMarkup";

interface ProviderDirectoryViewProps {
  onNavigateToTab: (tabId: string) => void;
  onNavigateToProviderProfile: (providerSlug: string) => void;
}

export function ProviderDirectoryView({
  onNavigateToTab,
  onNavigateToProviderProfile
}: ProviderDirectoryViewProps) {
  // 1. Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMainstreamOnly, setSelectedMainstreamOnly] = useState<boolean | null>(null);
  const [selectedAltNetOnly, setSelectedAltNetOnly] = useState<boolean | null>(null);
  const [selectedWiltshireOnly, setSelectedWiltshireOnly] = useState<boolean>(false);
  
  // Category array filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // List of all user-requested filters to display as interactive pills
  const filterOptions = [
    { label: "Mainstream Providers", category: "Mainstream broadband" },
    { label: "Alternative Networks (AltNets)", category: "Alternative network" },
    { label: "Local Specialists", category: "Rural broadband" },
    { label: "Full Fibre (FTTP)", category: "Full fibre provider" },
    { label: "Fixed Wireless Access", category: "Wireless broadband" },
    { label: "LEO Satellite Providers", category: "Satellite broadband" },
    { label: "Business Broadband", category: "Business broadband" },
    { label: "Student Broadband", category: "Student broadband" },
    { label: "Wholesale Networks", category: "Wholesale network" },
    { label: "Fibre Infrastructure Owners", category: "Network owner" },
    { label: "Closed Networks", category: "Closed network" },
    { label: "New Build Estates", category: "New build broadband" },
    { label: "VoIP & Telecoms Specialists", category: "VoIP and telecoms" },
    { label: "Legacy Brands", category: "Legacy provider" },
    { label: "Regional South West Providers", category: "Regional provider" },
    { label: "Nationwide UK Wide Networks", category: "UK wide provider" },
    { label: "Fibre Network Owners & Operators", category: "Fibre infrastructure" },
    { label: "Mobile or 5G Home Broadband", category: "5G home broadband" }
  ];

  // Toggle category filters helper
  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Reset all filters state
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedMainstreamOnly(null);
    setSelectedAltNetOnly(null);
    setSelectedWiltshireOnly(false);
    setSelectedCategories([]);
  };

  // 2. Computed filtered list
  const filteredList = useMemo(() => {
    return providerDirectoryData.filter((provider) => {
      // Search Box: Match Name, alternateNames (aliases), coverageNotes or category
      if (searchQuery.trim()) {
        const queryNormalized = searchQuery.toLowerCase().trim();
        const normalisedProviderNameStr = normaliseProviderName(provider.providerName);
        const normalisedDisplayNameStr = normaliseProviderName(provider.displayName);
        
        const matchesName = provider.providerName.toLowerCase().includes(queryNormalized) ||
                            provider.displayName.toLowerCase().includes(queryNormalized);
                            
        const matchesAlias = provider.alternativeNames.some(alt => 
          alt.toLowerCase().includes(queryNormalized) || normaliseProviderName(alt).includes(queryNormalized)
        );
        
        const matchesNotes = provider.coverageNotes.toLowerCase().includes(queryNormalized) ||
                             (provider.editorNotes && provider.editorNotes.toLowerCase().includes(queryNormalized));

        const matchesTag = provider.providerCategories.some(cat => 
          cat.toLowerCase().includes(queryNormalized)
        );

        if (!matchesName && !matchesAlias && !matchesNotes && !matchesTag) {
          return false;
        }
      }

      // Mainstream / Altnet Radio Filters
      if (selectedMainstreamOnly !== null) {
        if (selectedMainstreamOnly && !provider.isMainstream) return false;
        if (!selectedMainstreamOnly && provider.isMainstream) return false;
      }
      
      if (selectedAltNetOnly !== null) {
        if (selectedAltNetOnly && !provider.isAltNet) return false;
        if (!selectedAltNetOnly && provider.isAltNet) return false;
      }

      // Wiltshire Relevance Filter Check
      if (selectedWiltshireOnly && !provider.wiltshireRelevance) {
        return false;
      }

      // Category Array Check: items must match selected categories
      if (selectedCategories.length > 0) {
        const hasMatchingCategory = selectedCategories.some(cat => 
          provider.providerCategories.includes(cat) || provider.providerType.some(pt => pt.includes(cat))
        );
        if (!hasMatchingCategory) return false;
      }

      return true;
    });
  }, [searchQuery, selectedMainstreamOnly, selectedAltNetOnly, selectedWiltshireOnly, selectedCategories]);

  // 3. Dynamic JSON-LD Structured Schema Compilation
  const breadcrumbSchema = useMemo(() => {
    return createBreadcrumbSchema([
      { name: "Home", url: "https://www.wiltshirebroadbandfinder.co.uk/" },
      { name: "Broadband Providers Directory", url: "https://www.wiltshirebroadbandfinder.co.uk/broadband-providers" }
    ]);
  }, []);

  const webpageSchema = useMemo(() => {
    return createWebPageSchema(
      "UK Broadband Providers Directory & Wiltshire Coverage Maps",
      "Comprehensive list directory of mainstream UK telecom networks, regional altnets, satellite wireless providers, and estate operators. Track local Wiltshire relevance.",
      "https://www.wiltshirebroadbandfinder.co.uk/broadband-providers",
      "Broadband Providers Directory UK Wiltshire"
    );
  }, []);

  const itemListSchema = useMemo(() => {
    return createItemListSchema(
      filteredList.map((p, idx) => ({
        position: idx + 1,
        name: `Provider: ${p.displayName}`,
        url: `https://www.wiltshirebroadbandfinder.co.uk/providers/${p.slug}`
      })),
      "Directory of telecom providers tracked for Wiltshire & UK wide availability",
      "A structured overview database covering parished altnets, mobile operators and regional infrastructure owners."
    );
  }, [filteredList]);

  const directoryFaqSchema = useMemo(() => {
    return createFAQSchema([
      {
        question: "What is an alternative network (AltNet) provider?",
        answer: "An alternative network (AltNet) is a separate broadband network independent of Openreach or Virgin Media. Examples include Gigaclear, Wessex Internet, Truespeed and Zzoomm, which build dedicated full-fibre lines to towns and parished villages."
      },
      {
        question: "How do I check if a broadband provider is available on my street?",
        answer: "Broadband networks are street-specific. While our directory flags regional Wiltshire presence, you must run an address-level postcode check to verify which fiber or wireless lines physically serve your home."
      },
      {
        question: "What is the difference between open-access and closed networks?",
        answer: "Open-access network owners like Openreach or CityFibre lease their fiber infrastructure to multiple retail brands (like BT, Sky or Zen). Closed networks (like FibreNest on certain Persimmon developments) carry only their own retail brand."
      }
    ]);
  }, []);

  return (
    <div className="space-y-8" id="provider-directory-view-container">
      {/* Schema Injection */}
      <JsonLdSchema schema={breadcrumbSchema} id="provider-directory-breadcrumb" />
      <JsonLdSchema schema={webpageSchema} id="provider-directory-webpage" />
      <JsonLdSchema schema={itemListSchema} id="provider-directory-itemlist" />
      <JsonLdSchema schema={directoryFaqSchema} id="provider-directory-faqs" />

      {/* Header Description Section */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Network Database
        </div>
        <h1 className="text-3xl md:text-4.5xl font-black font-sans tracking-tight text-white leading-tight">
          Broadband &amp; Telecom Providers Directory
        </h1>
        <p className="text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Our independent directory tracks mainstream providers, parished alt-nets, satellite setups, wholesale networks, and new build estate operators. Compare regional coverage footprints before you switch.
        </p>
      </div>

      {/* Interactive Filters Grid & Sidebar layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Panel column */}
        <div className="lg:col-span-1 space-y-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5" id="directory-filter-panel">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
            <h2 className="font-sans font-bold text-sm text-white flex items-center gap-2">
              <Filter className="h-4 w-4 text-emerald-400" />
              <span>Refine Directory</span>
            </h2>
            {(searchQuery || selectedWiltshireOnly || selectedCategories.length > 0 || selectedMainstreamOnly !== null || selectedAltNetOnly !== null) && (
              <button 
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer bg-none border-none p-0 text-[11px] underline"
                id="reset-all-filters-btn"
              >
                Reset All
              </button>
            )}
          </div>

          {/* 1. Keyword search inside provider name / aliases */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 font-sans block">Search Provider Name or Alias</label>
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Plusnet, TrueSpeed, Hull..."
                className="w-full bg-slate-950/70 border border-slate-800 text-sm rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                id="directory-search-input"
              />
            </div>
            <p className="text-[10px] text-slate-500 font-sans">
              Enter brand names, infrastructure owners, or aliases.
            </p>
          </div>

          {/* 2. Geographic / relevance check */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-300 font-sans block">Wiltshire Footprint</span>
            <label className="flex items-center gap-3 cursor-pointer group" id="wiltshire-filter-label">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedWiltshireOnly}
                  onChange={(e) => setSelectedWiltshireOnly(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-md border transition-all ${
                  selectedWiltshireOnly 
                    ? "bg-emerald-500 border-emerald-500 text-slate-950" 
                    : "border-slate-800 bg-slate-950 group-hover:border-slate-700"
                } flex items-center justify-center`}>
                  {selectedWiltshireOnly && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
              </div>
              <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                Only Wiltshire Active
              </span>
            </label>
            <p className="text-[10px] text-slate-500 font-sans leading-normal">
              Filters listings down to providers with tracked networks in parished Wiltshire counties.
            </p>
          </div>

          {/* 3. Provider Category Pills checklist */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-300 font-sans block">Filter by Categories</span>
            <div className="flex flex-col gap-2" id="directory-categories-checklist">
              {filterOptions.map((opt, idx) => {
                const isActive = selectedCategories.includes(opt.category);
                return (
                  <button
                    key={idx}
                    onClick={() => handleToggleCategory(opt.category)}
                    className={`w-full py-1.5 px-3 rounded-lg text-left text-xs transition-all flex items-center justify-between border cursor-pointer ${
                      isActive 
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300" 
                        : "bg-slate-950/40 border-slate-900 text-slate-400 hover:bg-slate-950/80 hover:text-slate-200"
                    }`}
                    id={`filter-pill-${idx}`}
                  >
                    <span>{opt.label}</span>
                    {isActive && <Check className="h-3 w-3 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Directory Listings column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400 font-sans">
              Showing <span className="font-bold text-emerald-400">{filteredList.length}</span> listed broadband connection profiles
            </p>
          </div>

          {filteredList.length === 0 ? (
            <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-12 text-center space-y-4" id="empty-directory-fallback">
              <div className="mx-auto w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                <Search className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold font-sans text-white text-base">No Providers Found</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  We couldn't find any provider matching your search. Please check your spelling, clear active filters, or search for a generic term like &ldquo;Altnet&rdquo;.
                </p>
              </div>
              <button 
                onClick={handleResetFilters}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer"
                id="empty-reset-btn"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="directory-providers-grid">
              {filteredList.map((provider) => {
                const queryUTMStr = `?utm_source=${provider.utmSource || "wiltshire_broadband_finder"}&utm_medium=directory&utm_campaign=${provider.slug}`;
                return (
                  <div
                    key={provider.providerId}
                    className="bg-slate-900/30 hover:bg-slate-950/50 border border-slate-800/60 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all relative group"
                    id={`dir-card-${provider.providerId}`}
                  >
                    <div className="space-y-3">
                      
                      {/* Badge and Name block */}
                      <div className="flex items-start justify-between gap-2.5">
                        <div>
                          <h3 className="font-bold text-base text-slate-100 group-hover:text-white transition-colors leading-snug">
                            {provider.displayName}
                          </h3>
                          <span className="text-[11px] text-slate-500 font-semibold font-sans">
                            {provider.networkType} &bull; {provider.retailOrWholesale === "both" ? "Retail & Wholesale" : provider.retailOrWholesale === "wholesale" ? "Wholesale Only" : "Retail Connection"}
                          </span>
                        </div>

                        {provider.wiltshireRelevance ? (
                          <span className="text-[10px] font-bold font-sans uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>Wiltshire Active</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-sans font-medium text-slate-500 border border-slate-800/80 px-2 py-0.5 rounded-full bg-slate-950/20">
                            UK Wide
                          </span>
                        )}
                      </div>

                      {/* Display aliases/alternateNames so Google indexes alternative searches perfectly */}
                      {provider.alternativeNames && provider.alternativeNames.length > 0 && (
                        <p className="text-[11px] text-slate-400 font-sans leading-tight">
                          <span className="text-slate-500 font-medium font-sans">Also known as:</span> {provider.alternativeNames.slice(0, 3).join(", ")}
                        </p>
                      )}

                      {/* Short editorial quote */}
                      <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-slate-800 pl-3">
                        &ldquo;{provider.coverageNotes}&rdquo;
                      </p>

                      {/* Region indicator */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-sans">
                        <MapPin className="h-3 w-3 text-slate-500 shrink-0" />
                        <span>Coverage: {provider.knownRegions.join(", ")}</span>
                      </div>

                      {/* Category Pill tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {provider.providerCategories.map((cat, idx) => (
                          <span 
                            key={idx}
                            className="bg-slate-950/80 border border-slate-800 text-[10px] text-slate-400 px-2 py-0.5 rounded-md font-sans"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Panel */}
                    <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between gap-3 mt-1 text-[11px] font-sans font-bold">
                      <button
                        onClick={() => onNavigateToProviderProfile(provider.slug)}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer bg-none border-none p-0"
                        id={`dir-link-profile-${provider.providerId}`}
                      >
                        <span>View Provider Profile</span>
                        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </button>

                      {provider.websiteUrl && (
                        <a
                          href={provider.baseUrl ? `${provider.baseUrl}${queryUTMStr}` : provider.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                          id={`dir-link-visit-${provider.providerId}`}
                        >
                          <span>Visit Site</span>
                          <ExternalLink className="h-3 w-3 text-slate-500" />
                        </a>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* Fact Sheet Disclaimer Box */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 space-y-3 text-slate-350" id="directory-disclaimer-box">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-350 flex items-center gap-2">
              <Info className="h-3.5 w-3.5 text-emerald-400" />
              <span>Provider Database Disclosure Guidance</span>
            </h4>
            <div className="text-[11px] leading-relaxed space-y-2">
              <p>
                This directory indexes commercial broadband networks, parished alt-nets, mobile operators and regional satellite networks. Mention of a provider name or trademark does not guarantee that lines are physically laid to your exact address or capable of achieving maximum advertised speeds.
              </p>
              <p>
                <strong>Switching Notice:</strong> Broadband deployments operate on a street-by-street or property-by-property basis. Real-time availability, package costs, and physical connection speeds can only be confirmed by running a comprehensive postcode address check directly with the provider or on our comparison pages.
              </p>
            </div>
          </div>

          {/* Dynamic FAQ List Section for SEO */}
          <div className="space-y-4 pt-4 border-t border-slate-800/40" id="directory-faq-section-block">
            <h2 className="font-sans text-lg font-bold text-white flex items-center gap-2">
              <span>Frequently Asked Questions &bull; Providers Directory</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/20 border border-slate-850 rounded-xl p-4 space-y-1.5">
                <h3 className="text-xs font-bold text-white font-sans">Are all UK broadband brands represented?</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  We track a wide list of national networks, alt-nets, local developers, wireless beams and wholesale operators. Standard household offers depend on regional Openreach or custom fiber presence.
                </p>
              </div>
              <div className="bg-slate-900/20 border border-slate-850 rounded-xl p-4 space-y-1.5">
                <h3 className="text-xs font-bold text-white font-sans">How do I verify Wiltshire coverage details?</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  Look for the <strong>Wiltshire Active</strong> tag on the provider card. This identifies brands with active fiber installations, cabinets, or local satellite operations in Wiltshire parishes.
                </p>
              </div>
            </div>
          </div>

          {/* Designed Provider comparison SEO blocks (Part 7) */}
          <ProviderComparisonBlocks 
            onSelectCategory={(category) => {
              setSelectedCategories([category]);
              // Reset other binary toggle overrides so the custom categories display nicely
              setSelectedMainstreamOnly(null);
              setSelectedAltNetOnly(null);
              // Scroll up to results nicely
              const el = document.getElementById("search-results-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }} 
            onNavigateToProvider={(slug) => {
              onNavigateToProviderProfile(slug);
            }} 
          />

        </div>

      </div>

    </div>
  );
}
