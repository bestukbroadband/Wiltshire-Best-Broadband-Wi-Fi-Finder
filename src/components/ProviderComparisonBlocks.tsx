/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { 
  CheckCircle, 
  HelpCircle, 
  ArrowRight, 
  Server, 
  Satellite, 
  Building, 
  Cpu, 
  ShieldAlert, 
  Globe, 
  Network,
  Compass
} from "lucide-react";

interface ComparisonBlock {
  id: string;
  category: string;
  title: string;
  intro: string;
  examples: Array<{ name: string; slug: string }>;
  features: string[];
  ctaLabel: string;
  tooltip: string;
}

interface ProviderComparisonBlocksProps {
  onSelectCategory: (category: string) => void;
  onNavigateToProvider: (slug: string) => void;
}

export function ProviderComparisonBlocks({
  onSelectCategory,
  onNavigateToProvider
}: ProviderComparisonBlocksProps) {
  
  const blocks: ComparisonBlock[] = [
    {
      id: "mainstream",
      category: "Mainstream broadband",
      title: "Mainstream Providers",
      intro: "National brands with massive UK-wide coverage footprints. Primarily rely on Openreach or independent cable frames to serve major towns or rural parishes.",
      examples: [
        { name: "BT Broadband", slug: "bt-broadband" },
        { name: "EE Broadband", slug: "ee-brand" },
        { name: "Sky Broadband", slug: "sky-broadband" },
        { name: "Virgin Media", slug: "virgin-media-broadband" }
      ],
      features: [
        "Unrivalled nationwide availability",
        "Bundled multiplay services (TV, mobile, landline)",
        "Trusted, stable enterprise customer services"
      ],
      ctaLabel: "View Mainstream Providers",
      tooltip: "Click to filter mainstream UK consumer brands on the network."
    },
    {
      id: "altnet",
      category: "Alternative network",
      title: "Alternative Networks (AltNets)",
      intro: "Independent commercial operators building their own full-fibre lines. Bypassing old copper lines entirely to offer symmetrical gigabit rates.",
      examples: [
        { name: "Gigaclear", slug: "gigaclear-broadband" },
        { name: "Wessex Internet", slug: "wessex-internet-broadband" },
        { name: "Truespeed", slug: "truespeed-broadband" },
        { name: "Zzoomm", slug: "zzoomm-broadband" }
      ],
      features: [
        "Pure symmetrical upload & download speeds",
        "Direct optical connection right into the building",
        "Hassle-free local installation and zero annual price hikes"
      ],
      ctaLabel: "View AltNet Providers",
      tooltip: "Filter listings to independent full-fibre AltNet builders."
    },
    {
      id: "rural",
      category: "Rural broadband",
      title: "Rural Specialists",
      intro: "Broadband builders focused specifically on parished villages and outlying rural settlements that national operators bypass.",
      examples: [
        { name: "Voneus", slug: "voneus-broadband" },
        { name: "Wessex Internet", slug: "wessex-internet-broadband" },
        { name: "Airband", slug: "airband-broadband" },
        { name: "B4RN", slug: "broadband-for-the-rural-north" }
      ],
      features: [
        "Specialist sub-surface and telegraph line drops",
        "Leverages hybrid fixed wireless and deep fibre routing",
        "Eligible for regional community voucher infrastructure subsidies"
      ],
      ctaLabel: "View Rural Specialized",
      tooltip: "Filter listings to rural and parished telecom specialists."
    },
    {
      id: "full-fibre",
      category: "Full fibre provider",
      title: "Full Fibre Network Providers",
      intro: "Operators delivering dedicated Fibre-to-the-Premises (FTTP) lines. Offers top-tier speeds ranging from 150Mbps to Multi-Gigabit rates.",
      examples: [
        { name: "Hyperoptic", slug: "hyperoptic-broadband" },
        { name: "toob", slug: "toob-broadband" },
        { name: "Community Fibre", slug: "community-fibre-broadband" },
        { name: "Lit Fibre", slug: "lit-fibre" }
      ],
      features: [
        "100% full optical fibre cable (no copper elements)",
        "Perfect for massive simultaneous ultra-HD streaming load",
        "Impervious to regional bad weather interference drops"
      ],
      ctaLabel: "Filter Full Fibre (FTTP)",
      tooltip: "View pure 100% FTTP optical network retail brands."
    },
    {
      id: "satellite",
      category: "Satellite Networks",
      title: "Satellite Broadband Options",
      intro: "Next-gen low-orbit constellations (LEO) and geostationary orbit (GEO) space feeds delivering 100% geographic coverage anywhere in Wiltshire.",
      examples: [
        { name: "Starlink", slug: "starlink" },
        { name: "Global Satellite Internet", slug: "global-satellite-broadband" }
      ],
      features: [
        "Up to 220Mbps speeds in completely detached zones",
        "Zero underground cable dependencies or pole line runs",
        "Plugs into simple local smart reception terminal kits"
      ],
      ctaLabel: "Filter Satellite Brands",
      tooltip: "Show tracked space-based satellite connections."
    },
    {
      id: "business",
      category: "Business broadband",
      title: "Business & Enterprise Broadband",
      intro: "Committed Service Level Agreements (SLAs), symmetrical Ethernet leased lines, and dedicated bandwidth channels built for enterprise.",
      examples: [
        { name: "Daisy Communications", slug: "daisy" },
        { name: "Zen Business", slug: "zen-internet" },
        { name: "B2B Telecoms Alliance", slug: "business-telecoms-broadband" }
      ],
      features: [
        "Proactive 4-hour target fault fixes with SLA backing",
        "Static IP routing options and robust VoIP digital PBX blocks",
        "Dedicated symmetrical fiber lines with 1:1 contention rates"
      ],
      ctaLabel: "Filter Business Telecoms",
      tooltip: "Browse robust commercial & business grade internet specialists."
    },
    {
      id: "closed",
      category: "Closed network",
      title: "Closed & New Build Providers",
      intro: "Specialist optical providers laying closed infrastructure patterns inside new-build housing estates, often under sole brand rights.",
      examples: [
        { name: "FibreNest", slug: "fibrenest" },
        { name: "seethelight", slug: "seethelight" },
        { name: "Home Unity", slug: "home-unity-broadband" }
      ],
      features: [
        "Fibre lines laid directly during house construction",
        "Ready to connect and activate on key moving-in days",
        "Bypasses standard open-market Openreach wiring paths"
      ],
      ctaLabel: "Filter Closed & New Build",
      tooltip: "Examine restricted and dedicated estate operators."
    },
    {
      id: "wholesale",
      category: "Wholesale network",
      title: "Wholesale & Infrastructure Owners",
      intro: "Underground operators that do not sell directly to consumers. Instead, they build and lease digital transit ducts to high-speed retailers.",
      examples: [
        { name: "Openreach", slug: "openreach" },
        { name: "CityFibre", slug: "cityfibre" },
        { name: "PlatformX Communications", slug: "pxc" },
        { name: "National Wholesale", slug: "wholesale-closed-networks" }
      ],
      features: [
        "Massive multi-territory transit backhaul networks",
        "Open-access ports leasing capacity to consumer brands",
        "Heavy capital layout and dark fiber installation operators"
      ],
      ctaLabel: "Filter Infrastructure & Wholesale",
      tooltip: "Review non-retail transit operators."
    }
  ];

  return (
    <div className="space-y-6 pt-6 border-t border-slate-800/60" id="comparison-seo-blocks-root">
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-black text-slate-100 font-sans tracking-tight">
          Broadband Network Categories &amp; Comparison Hub
        </h2>
        <p className="text-xs md:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Select a dedicated network classification to narrow down listed providers, examine coverage features, and track physical installation models across Wiltshire Counties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5" id="comparison-seo-blocks-grid">
        {blocks.map((block) => (
          <div 
            key={block.id}
            className="bg-slate-900/25 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all"
            id={`comparison-block-${block.id}`}
          >
            <div className="space-y-3">
              
              {/* Category H3 with graphic accent */}
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-bold text-sm text-white leading-tight">
                  {block.title}
                </h3>
                <Compass className="h-4 w-4 text-emerald-400 shrink-0 opacity-60" />
              </div>

              {/* Intro summary */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                {block.intro}
              </p>

              {/* Examples block */}
              <div className="space-y-1 bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                <span className="text-[10px] uppercase font-bold text-slate-500 block font-mono">
                  Example Listed Brands:
                </span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {block.examples.map((ex, idx) => (
                    <button
                      key={idx}
                      onClick={() => onNavigateToProvider(ex.slug)}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer transition-colors bg-none border-none p-0 flex items-center font-sans font-medium"
                      id={`ex-link-${block.id}-${idx}`}
                    >
                      {ex.name}
                      {idx < block.examples.length - 1 && <span className="text-slate-600 px-1 font-normal">&bull;</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Key attributes checklist */}
              <ul className="space-y-1.5 pt-1.5">
                {block.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400 leading-normal font-sans">
                    <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

            </div>

            {/* Quick-action category filter click */}
            <button
              onClick={() => onSelectCategory(block.category)}
              className="w-full text-center py-2 bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 hover:text-emerald-300 text-[11px] font-bold rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 group"
              title={block.tooltip}
              id={`block-cta-${block.id}`}
            >
              <span>{block.ctaLabel}</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
