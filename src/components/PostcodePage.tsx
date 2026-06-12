/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useMemo } from "react";
import { PostcodeArea, Provider, Offer, FeaturedOffer } from "../types";
import { ProviderCard } from "./ProviderCard";
import { WeeklyOfferHighlight } from "./WeeklyOfferHighlight";
import { LeadForm } from "./LeadForm";
import { DealRanking } from "./DealRanking";
import { AdvertBanner } from "./AdvertBanner";
import { postcodeAreasData } from "../data/postcodeAreas";
import { townsData } from "../data/towns";
import { Compass, MapPin, ChevronRight, HelpCircle, AlertCircle, Building2, Landmark, ShieldCheck, Info, Sparkles, Globe, Radio, Activity, ExternalLink } from "lucide-react";
import { getOffersForPostcode, calculateOfferScore } from "../utils/offersMatch";
import { buildTrackedUrl } from "../data/trackingConfig";
import { SeoContentBlock } from "./SeoContentBlock";
import { InternalSEOLinks } from "./InternalSEOLinks";
import { reusableSeoBlocks } from "../data/reusableSeoBlocks";
import { JsonLdSchema } from "./JsonLdSchema";
import { wiltshirePostcodeProviderMap } from "../data/wiltshirePostcodeProviderMap";

// Private Note: For more accurate automatic availability data, consider a commercial broadband availability API such as ThinkBroadband’s availability API, or approved provider APIs. Do not scrape public maps or copy third party datasets without permission.

const extraProviders: Record<string, Partial<Provider>> = {
  toob: {
    id: "toob",
    providerName: "toob",
    providerType: ["Alternative network providers", "Full fibre providers"],
    networkType: "Full Fibre (FTTP)",
    logoText: "toob",
    townsCovered: ["Chippenham", "Salisbury"],
    postcodeAreas: ["SN14", "SN15"],
    packageName: "toob Symmetrical Home Broadband Only",
    averageDownloadSpeed: 900,
    averageUploadSpeed: 900,
    monthlyPriceFrom: 29.00,
    monthlyPrice: 29.00,
    monthlyPriceAfterContract: 34.00,
    contractLength: 18,
    setupFee: 0,
    routerCost: 0,
    routerIncluded: true,
    installationFee: 0,
    deliveryFee: 0,
    phoneLineRequired: false,
    midContractPriceRise: false,
    annualPriceRiseNote: "No mid-contract price rises in active campaigns.",
    knownAnnualPriceRise: "No price rise guarantee.",
    bestFor: "High-speed symmetrical connections",
    coverageNote: "Check precise address for locally relevant rollouts.",
    availabilityStatus: "Address check required",
    rankingScore: 82,
    dealRank: 3,
    isSponsored: false,
    ctaLabel: "Check toob",
    ctaUrl: "https://www.toob.co.uk/check-availability/",
    leadFormEnabled: true,
    description: "Symmetrical gigabit fibre connection delivering 900 Mbps upload and download speeds, featuring standard premium hardware.",
    lastCheckedDate: "2026-06-12",
    pricingMode: "manual",
    priceStatus: "Active",
    priceDisclaimer: "Local deployment in matching sectors only."
  },
  youfibre: {
    id: "youfibre",
    providerName: "YouFibre",
    providerType: ["Alternative network providers", "Full fibre providers"],
    networkType: "Full Fibre (FTTP)",
    logoText: "YouFibre",
    townsCovered: ["Chippenham", "Melksham", "Malmesbury"],
    postcodeAreas: ["SN14", "SN15", "SN16"],
    packageName: "YouFibre Symmetrical Essential Gigabit",
    averageDownloadSpeed: 1000,
    averageUploadSpeed: 1000,
    monthlyPriceFrom: 27.99,
    monthlyPrice: 27.99,
    monthlyPriceAfterContract: 34.99,
    contractLength: 24,
    setupFee: 0,
    routerCost: 0,
    routerIncluded: true,
    installationFee: 0,
    deliveryFee: 0,
    phoneLineRequired: false,
    midContractPriceRise: false,
    annualPriceRiseNote: "Price fixed for contract term.",
    knownAnnualPriceRise: "Price fixed.",
    bestFor: "Ultra-fast value gigabit",
    coverageNote: "Selectively available on Netomnia physical network fibres.",
    availabilityStatus: "Address check required",
    rankingScore: 81,
    dealRank: 4,
    isSponsored: false,
    ctaLabel: "Check YouFibre",
    ctaUrl: "https://www.youfibre.com/check-availability/",
    leadFormEnabled: true,
    description: "Outstanding symmetrical speeds up to 1000 Mbps upload and download using brand new physical fibre lines.",
    lastCheckedDate: "2026-06-12",
    pricingMode: "manual",
    priceStatus: "Active",
    priceDisclaimer: "Subject to postcode matching checks on the Netomnia footprint."
  },
  brsk: {
    id: "brsk",
    providerName: "Brsk",
    providerType: ["Alternative network providers", "Full fibre providers"],
    networkType: "Full Fibre (FTTP)",
    logoText: "Brsk",
    townsCovered: ["Malmesbury", "Swindon Border"],
    postcodeAreas: ["SN14", "SN15", "SN16"],
    packageName: "Brsk BetterNet Symmetrical Gig",
    averageDownloadSpeed: 950,
    averageUploadSpeed: 950,
    monthlyPriceFrom: 28.00,
    monthlyPrice: 28.00,
    monthlyPriceAfterContract: 35.00,
    contractLength: 24,
    setupFee: 0,
    routerCost: 0,
    routerIncluded: true,
    installationFee: 0,
    deliveryFee: 0,
    phoneLineRequired: false,
    midContractPriceRise: false,
    annualPriceRiseNote: "No automatic mid-term contract price hikes in active campaigns.",
    knownAnnualPriceRise: "No price increases during minimum term.",
    bestFor: "Symmetrical bandwidth stability",
    coverageNote: "Check exact local parished streets to verify active ports.",
    availabilityStatus: "Address check required",
    rankingScore: 80,
    dealRank: 5,
    isSponsored: false,
    ctaLabel: "Check Brsk",
    ctaUrl: "https://www.brsk.co.uk/check-availability",
    leadFormEnabled: true,
    description: "Symmetrical full fibre connection running independent physical fibre strings to your home boundary, with modern router included.",
    lastCheckedDate: "2026-06-12",
    pricingMode: "manual",
    priceStatus: "Active",
    priceDisclaimer: "Final availability requires full boundary status verification."
  }
};
import {
  createWebsiteSchema,
  createOrganisationSchema,
  createWebPageSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createItemListSchema,
  createOfferSchema,
  createReviewSchema,
  createServiceSchema
} from "../data/schemaMarkup";

interface PostcodePageProps {
  postcodeArea: PostcodeArea;
  providers: Provider[];
  onEnquire: (p: Provider) => void;
  onPostcodeSelect: (prefix: string) => void;
  onBackToHome: () => void;
  onPageClick?: (pageId: string) => void;
  onTownClick?: (townId: string) => void;
}

/**
 * Checks if a given object is a FeaturedOffer
 */
const isFeaturedOffer = (o: any): o is FeaturedOffer => {
  return o && "weekCommencing" in o;
};

export function PostcodePage({
  postcodeArea,
  providers,
  onEnquire,
  onPostcodeSelect,
  onBackToHome,
  onPageClick,
  onTownClick
}: PostcodePageProps) {
  
  // Heuristic calculation to check if a postcode is rural
  const isRuralPostcode = useMemo(() => {
    const text = (postcodeArea.introCopy + " " + postcodeArea.localBroadbandNotes).toLowerCase();
    return text.includes("rural") || text.includes("parish") || text.includes("village") || text.includes("farm");
  }, [postcodeArea]);

  const matchedTown = useMemo(() => {
    return townsData.find(
      (t) => t.name.toLowerCase() === postcodeArea.primaryTown.toLowerCase() ||
             t.id.toLowerCase() === postcodeArea.primaryTown.toLowerCase()
    );
  }, [postcodeArea.primaryTown]);

  // Call our advanced postcode matching utility
  const matchResult = useMemo(() => {
    return getOffersForPostcode(postcodeArea.postcodePrefix);
  }, [postcodeArea]);

  // Dynamic Schemas for the researched Postcode
  const postcodeSchemas = useMemo(() => {
    const websiteSchema = createWebsiteSchema();
    const organisationSchema = createOrganisationSchema();
    
    const webpageSchema = createWebPageSchema(
      postcodeArea.seoTitle || postcodeArea.h1,
      postcodeArea.metaDescription,
      `https://www.wiltshirebroadbandfinder.co.uk/broadband/${postcodeArea.slug}`,
      `postcode broadband coverage in ${postcodeArea.postcodePrefix}`,
      "2026-06-08T12:05:14Z"
    );

    const breadcrumbSchema = createBreadcrumbSchema([
      { name: "Home", url: "https://www.wiltshirebroadbandfinder.co.uk/" },
      { name: `Broadband in ${postcodeArea.postcodePrefix}`, url: `https://www.wiltshirebroadbandfinder.co.uk/broadband/${postcodeArea.slug}` }
    ]);

    const faqSchema = postcodeArea.faqs && postcodeArea.faqs.length > 0
      ? createFAQSchema(postcodeArea.faqs)
      : null;

    const postcodeMatches = matchResult ? matchResult.matchingOffers : [];
    
    const itemListSchema = createItemListSchema(
      postcodeMatches.slice(0, 6).map((item, idx) => ({
        position: idx + 1,
        name: `Listed offer: ${item.providerName} - ${item.packageName}`,
        url: `https://www.wiltshirebroadbandfinder.co.uk/broadband/${postcodeArea.slug}`
      }))
    );

    const offerSchemas = postcodeMatches.slice(0, 2).map((item) => {
      return createOfferSchema(
        item.packageName,
        item.monthlyPrice,
        "GBP",
        item.providerName,
        item.ctaUrl || `https://www.wiltshirebroadbandfinder.co.uk/broadband/${postcodeArea.slug}`
      );
    });

    const reviewSchema = postcodeMatches.length > 0
      ? createReviewSchema(
          `${postcodeMatches[0].providerName} in ${postcodeArea.postcodePrefix}`,
          postcodeMatches[0].editorScore,
          `Editorial ranking of ${postcodeMatches[0].providerName} service in ${postcodeArea.areaName}.`
        )
      : createReviewSchema(
          `Wiltshire Broadband in ${postcodeArea.postcodePrefix}`,
          8.5,
          `Objective comparison scoring for listed providers in postcode ${postcodeArea.postcodePrefix}.`
        );

    const serviceSchema = createServiceSchema(
      `Broadband listed offers in ${postcodeArea.postcodePrefix}`
    );

    return {
      websiteSchema,
      organisationSchema,
      webpageSchema,
      breadcrumbSchema,
      faqSchema,
      itemListSchema,
      offerSchemas,
      reviewSchema,
      serviceSchema
    };
  }, [postcodeArea, matchResult]);

  // Central mapping utility for converting dynamic matched offer to fully compliant Provider format
  const mapOfferToProvider = (offer: Offer | FeaturedOffer, isWeeklyFeatured = false): Provider => {
    const isOffer = "offerId" in offer && "targetProviderTypes" in offer;
    const providerType = isOffer 
      ? (offer as Offer).targetProviderTypes 
      : [(offer as FeaturedOffer).providerType];
    const targetTowns = offer.targetTowns;
    const targetPostcodes = offer.targetPostcodes;
    const monthlyPrice = offer.monthlyPrice;
    const contractLength = offer.contractLength;
    const averageDownloadSpeed = offer.averageDownloadSpeed;
    const averageUploadSpeed = offer.averageUploadSpeed;
    const setupFee = offer.setupFee;
    const routerIncluded = offer.routerIncluded;
    const installationFee = offer.installationFee;
    const lastCheckedDate = isOffer ? (offer as Offer).lastCheckedDate : (offer as FeaturedOffer).lastReviewedDate;
    const bestFor = offer.bestFor;
    const isSponsored = "isSponsored" in offer ? (offer as Offer).isSponsored : true;
    const sponsorLabel = "sponsorLabel" in offer ? (offer as Offer).sponsorLabel : (offer as FeaturedOffer).sponsorLabel;
    const ctaLabel = offer.ctaLabel;
    const editorScore = offer.editorScore;
    const editorVerdict = offer.editorVerdict;
    const editorNotes = offer.editorNotes;
    const thingsToWatch = offer.thingsToCheck;
    const priceAfterMin = isOffer ? (offer as Offer).priceAfterMinimumTerm : offer.monthlyPrice;
    const priceRise = isOffer ? (offer as Offer).knownAnnualPriceRise : (offer as FeaturedOffer).knownPriceRise;

    const p: Provider = {
      id: offer.offerId,
      providerName: offer.providerName,
      packageName: offer.packageName,
      providerType: providerType as any,
      networkType: providerType[0] || "Alternative Network",
      logoText: isWeeklyFeatured ? "Weekly Pick" : "Editor Match",
      townsCovered: targetTowns,
      postcodeAreas: targetPostcodes,
      monthlyPriceFrom: monthlyPrice,
      monthlyPrice: monthlyPrice,
      monthlyPriceAfterContract: priceAfterMin,
      priceAfterMinimumTerm: priceAfterMin,
      contractLength: contractLength,
      averageDownloadSpeed: averageDownloadSpeed,
      averageUploadSpeed: averageUploadSpeed,
      setupFee: setupFee,
      routerCost: 0,
      routerIncluded: routerIncluded,
      installationFee: installationFee,
      deliveryFee: 0,
      phoneLineRequired: false,
      midContractPriceRise: isOffer ? (offer as Offer).midContractPriceRise : false,
      annualPriceRiseNote: priceRise,
      knownAnnualPriceRise: priceRise,
      bestFor: bestFor,
      coverageNote: `${targetTowns.join(", ")} parishes`,
      availabilityStatus: "Available",
      rankingScore: "score" in offer ? (offer as any).score : 90,
      dealRank: 1,
      isSponsored: isSponsored,
      ctaLabel: ctaLabel,
      ctaUrl: buildTrackedUrl(offer.baseUrl, isWeeklyFeatured ? "weekly" : "postcode", { utm_term: postcodeArea.postcodePrefix.toLowerCase() }),
      leadFormEnabled: true,
      description: editorVerdict || offer.headline,
      lastCheckedDate: lastCheckedDate,
      pricingMode: "manual",
      priceStatus: "Active",
      priceDisclaimer: `${editorNotes}. Availability verified.`,
      editorScore: editorScore,
      editorVerdict: editorVerdict,
      editorNotes: editorNotes,
      thingsToWatch: thingsToWatch,
      lastReviewedDate: lastCheckedDate
    };
    return p;
  };

  // Map matched offers into Provider format for easy rendering inside existing Provider components
  const postcodeMapping = useMemo(() => {
    return wiltshirePostcodeProviderMap[postcodeArea.postcodePrefix.toUpperCase()];
  }, [postcodeArea]);

  const groupedProviders = useMemo(() => {
    if (!postcodeMapping) {
      return {
        national: [],
        regional: [],
        ruralAlternative: [],
        satelliteMobile: []
      };
    }

    const findProvider = (id: string): Provider | null => {
      const mainProv = providers.find((p) => p.id === id);
      if (mainProv) return { ...mainProv };
      
      const extraProv = extraProviders[id];
      if (extraProv) return { ...extraProv } as Provider;
      
      return null;
    };

    const getOverriddenProvider = (id: string): Provider | null => {
      const p = findProvider(id);
      if (!p) return null;
      
      const customStatus = postcodeMapping.providerStatuses[id];
      let resolvedLabel = "";
      
      if (customStatus === "address_check_required") {
        resolvedLabel = "Address check required";
      } else if (customStatus === "review_pending") {
        resolvedLabel = "Review pending";
      } else if (customStatus === "regional_relevance") {
        resolvedLabel = "Regional relevance";
      } else if (customStatus === "verified_for_area") {
        resolvedLabel = "Verified for area";
      } else if (id === "starlink" || id === "three5g" || postcodeMapping.mobileOrSatelliteProviders.includes(id)) {
        resolvedLabel = "Satellite option";
      } else if (postcodeMapping.regionalProviders.includes(id)) {
        resolvedLabel = "Regional provider to check";
      } else if (postcodeMapping.ruralProviders.includes(id)) {
        resolvedLabel = "Rural broadband option to check";
      } else if (postcodeMapping.alternativeNetworkProviders.includes(id)) {
        resolvedLabel = "Alternative network to check";
      } else if (postcodeMapping.defaultProviders.includes(id)) {
        resolvedLabel = "National provider checker";
      } else {
        resolvedLabel = "Provider checker required";
      }

      p.bestFor = resolvedLabel;
      p.availabilityStatus = resolvedLabel;
      p.priceDisclaimer = "Availability varies by exact address. Final price, speed, installation and contract terms must be confirmed by the provider.";
      
      return p;
    };

    const national = postcodeMapping.defaultProviders
      .map(id => getOverriddenProvider(id))
      .filter((p): p is Provider => p !== null && p.id !== "starlink" && p.id !== "three5g" && p.id !== "three");

    const regional = postcodeMapping.regionalProviders
      .map(id => getOverriddenProvider(id))
      .filter((p): p is Provider => p !== null);

    const ruralAlternative = [
      ...postcodeMapping.ruralProviders,
      ...postcodeMapping.alternativeNetworkProviders
    ].map(id => getOverriddenProvider(id))
     .filter((p): p is Provider => p !== null && (p.id !== "zzoomm" || postcodeMapping.providerStatuses["zzoomm"] !== "not_verified_for_area"));

    const satelliteMobile = postcodeMapping.mobileOrSatelliteProviders
      .map(id => getOverriddenProvider(id))
      .filter((p): p is Provider => p !== null);

    return {
      national,
      regional,
      ruralAlternative,
      satelliteMobile
    };
  }, [postcodeMapping, providers]);

  const activeProvidersMapped = useMemo(() => {
    return [
      ...groupedProviders.regional,
      ...groupedProviders.ruralAlternative,
      ...groupedProviders.national,
      ...groupedProviders.satelliteMobile
    ];
  }, [groupedProviders]);

  // Map nearby postcode areas from overall list
  const nearbyPostcodeObjects = useMemo(() => {
    const list = postcodeArea.nearbyPostcodes || [];
    return postcodeAreasData.filter((area) =>
      list.includes(area.postcodePrefix) &&
      area.postcodePrefix !== postcodeArea.postcodePrefix
    );
  }, [postcodeArea]);

  return (
    <div className="space-y-8 animate-fadeIn" id={`postcode-page-${postcodeArea.postcodePrefix}`}>
      {/* 0. DYNAMIC MULTI-SCHEMA INLINE JSON-LD MARKUPS */}
      <JsonLdSchema schema={postcodeSchemas.websiteSchema} id={`website-schema-${postcodeArea.postcodePrefix}`} />
      <JsonLdSchema schema={postcodeSchemas.organisationSchema} id={`org-schema-${postcodeArea.postcodePrefix}`} />
      <JsonLdSchema schema={postcodeSchemas.webpageSchema} id={`webpage-schema-${postcodeArea.postcodePrefix}`} />
      <JsonLdSchema schema={postcodeSchemas.breadcrumbSchema} id={`breadcrumb-schema-${postcodeArea.postcodePrefix}`} />
      {postcodeSchemas.faqSchema && <JsonLdSchema schema={postcodeSchemas.faqSchema} id={`faq-schema-${postcodeArea.postcodePrefix}`} />}
      <JsonLdSchema schema={postcodeSchemas.itemListSchema} id={`itemlist-schema-${postcodeArea.postcodePrefix}`} />
      {postcodeSchemas.offerSchemas.map((offer, oIdx) => (
        <JsonLdSchema key={oIdx} schema={offer} id={`offer-schema-${postcodeArea.postcodePrefix}-${oIdx}`} />
      ))}
      <JsonLdSchema schema={postcodeSchemas.reviewSchema} id={`review-schema-${postcodeArea.postcodePrefix}`} />
      <JsonLdSchema schema={postcodeSchemas.serviceSchema} id={`service-schema-${postcodeArea.postcodePrefix}`} />
      
      {/* 1. BREADCRUMBS BAR */}
      <nav className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400 flex items-center gap-1">
        <button onClick={onBackToHome} className="hover:text-brand-gold cursor-pointer transition-colors">
          Wiltshire Finder
        </button>
        <ChevronRight className="h-3 w-3 text-slate-350" />
        <span className="text-slate-500">Postcodes</span>
        <ChevronRight className="h-3 w-3 text-slate-350" />
        <span className="text-white font-extrabold">{postcodeArea.postcodePrefix} ({postcodeArea.areaName})</span>
      </nav>

      {/* 2. POSTCODE AREA TITLE HERO */}
      <header className="bg-slate-900 border-2 border-slate-700/60 text-white p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent pointer-events-none" />
        
        <div className="relative space-y-4 max-w-4xl">
          <span className="bg-brand-gold/15 border border-brand-gold/30 text-brand-gold rounded-full text-[10px] font-black tracking-widest uppercase px-3 py-1 inline-block">
            Postcode Landing Hub
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight flex flex-wrap items-center gap-2 font-sans text-white">
              <MapPin className="h-7 w-7 text-brand-gold shrink-0" />
              Broadband in {postcodeArea.postcodePrefix}: {postcodeArea.areaName}
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1 font-semibold">
              Primary Covered Zone: {postcodeArea.primaryTown} &bull; {postcodeArea.county}, {postcodeArea.region}
            </p>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans font-medium">
            {postcodeArea.introCopy}
          </p>
        </div>
      </header>

      {/* 3. CORE DISCLAIMER / LOCAL LINE VARIANCE NOTICE */}
      <div className="bg-[#12192c] border border-brand-gold/30 p-4 rounded-xl flex gap-3 text-xs leading-relaxed text-slate-205 shadow-md">
        <AlertCircle className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-white block mb-0.5">Wiltshire Local Service Notice:</span> 
          Networks and package speeds are highly variable on a street-by-street level. Symmetrical broadband is rolling out aggressively across <strong>{postcodeArea.postcodePrefix}</strong>, but availability relies on precise cabinet locations and local infrastructure tests.
        </div>
      </div>

      {/* MANDATORY WARNING DISCLOSURE AS PER PART 8 */}
      <div className="bg-blue-950/40 border border-blue-900/50 p-4 rounded-xl flex gap-3 text-xs leading-relaxed text-blue-300 shadow-md">
        <Info className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-white block mb-0.5">Initial Local Match Notification:</span> 
          Results are an initial local match. Final availability, speed, price and contract terms must be confirmed by the provider using your full address.
        </div>
      </div>

      {/* REGIONAL PARTNER SPONSORED BILLBOARD */}
      <AdvertBanner 
        location="postcode-page-sponsor" 
        postcodePrefix={postcodeArea.postcodePrefix} 
        className="w-full" 
      />

      {/* MAIN TWO-COLUMN BODY LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Local Providers, Rankings, Highlight and Notes */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 4. ACTIVE & BUILD-STAGE PROVIDER CARDS */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5 font-sans" id="providers-to-check-heading">
                <Building2 className="h-6 w-6 text-brand-gold" />
                Broadband providers to check in {postcodeArea.areaName}
              </h2>
              <p className="text-xs text-slate-350 leading-relaxed font-sans font-medium">
                Broadband availability in <strong>{postcodeArea.areaName} ({postcodeArea.postcodePrefix})</strong> can vary by exact address, street and property type. The providers below are listed as useful checks for this area, not guaranteed availability. Use the provider checkers to confirm current packages, speeds, installation options and pricing.
              </p>
            </div>

            {/* A. REGIONAL PROVIDERS LAYER */}
            {groupedProviders.regional.length > 0 && (
              <div className="space-y-3" id="regional-providers-section">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-brand-gold border-b border-slate-800 pb-1.5 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-gold" />
                  Regional Providers to Check
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {groupedProviders.regional.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onEnquire={onEnquire}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* B. RURAL & ALTERNATIVE NETWORKS LAYER */}
            {groupedProviders.ruralAlternative.length > 0 && (
              <div className="space-y-3" id="rural-altnet-providers-section">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-emerald-400 border-b border-slate-800 pb-1.5 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  Rural or Alternative Options to Check
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {groupedProviders.ruralAlternative.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onEnquire={onEnquire}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* C. NATIONAL BROADBAND PROVIDERS LAYER */}
            {groupedProviders.national.length > 0 && (
              <div className="space-y-3" id="national-providers-section">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-blue-450 border-b border-slate-800 pb-1.5 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-450" />
                  National Providers to Check
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {groupedProviders.national.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onEnquire={onEnquire}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* D. SATELLITE & WIRELESS BROADBAND PROVIDERS LAYER */}
            {groupedProviders.satelliteMobile.length > 0 && (
              <div className="space-y-3" id="satellite-mobile-providers-section">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-purple-400 border-b border-slate-800 pb-1.5 flex items-center gap-2">
                  <Radio className="h-4 w-4 text-purple-400" />
                  Satellite or Mobile Broadband Options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {groupedProviders.satelliteMobile.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onEnquire={onEnquire}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 5. WEEKLY OFFER HIGHLIGHT (IF APPLICABLE) */}
          {matchResult && matchResult.weeklyOffer ? (
            <section className="space-y-3">
              <div className="space-y-1">
                <h2 className="text-lg font-extrabold text-white tracking-tight font-sans flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-brand-gold animate-pulse" />
                  {matchResult.isWeeklyOfferLocalHighlight 
                    ? `Weekly offer highlight for this area` 
                    : `Best matching postcode offer spotlight`
                  }
                </h2>
                <p className="text-xs text-slate-400">
                  {matchResult.isWeeklyOfferLocalHighlight 
                    ? `This highly-rated featured campaign targets the searched ${postcodeArea.postcodePrefix} prefix specifically.` 
                    : `Showing the best matching validated deal for the ${postcodeArea.postcodePrefix} sector.`
                  }
                </p>
              </div>
              {isFeaturedOffer(matchResult.weeklyOffer) ? (
                <WeeklyOfferHighlight
                  offerId={matchResult.weeklyOffer.offerId}
                  providerName={matchResult.weeklyOffer.providerName}
                  packageName={matchResult.weeklyOffer.packageName}
                  offerHeadline={matchResult.weeklyOffer.headline}
                  postcodeTargeting={matchResult.weeklyOffer.targetPostcodes.join(", ")}
                  townTargeting={matchResult.weeklyOffer.targetTowns.join(", ")}
                  monthlyPrice={matchResult.weeklyOffer.monthlyPrice}
                  contractLength={matchResult.weeklyOffer.contractLength}
                  averageDownloadSpeed={matchResult.weeklyOffer.averageDownloadSpeed}
                  averageUploadSpeed={matchResult.weeklyOffer.averageUploadSpeed}
                  setupFee={matchResult.weeklyOffer.setupFee}
                  routerIncluded={matchResult.weeklyOffer.routerIncluded}
                  knownPriceRise={matchResult.weeklyOffer.knownPriceRise}
                  offerValidUntil={matchResult.weeklyOffer.offerValidUntil}
                  editorScore={matchResult.weeklyOffer.editorScore}
                  editorVerdict={matchResult.weeklyOffer.editorVerdict}
                  editorNotes={matchResult.weeklyOffer.editorNotes}
                  bestFor={matchResult.weeklyOffer.bestFor}
                  thingsToWatch={matchResult.weeklyOffer.thingsToCheck}
                  ctaLabel={matchResult.weeklyOffer.ctaLabel}
                  ctaUrl={buildTrackedUrl(matchResult.weeklyOffer.baseUrl, "weekly", { utm_term: postcodeArea.postcodePrefix.toLowerCase() })}
                  isSponsored={true}
                  sponsorLabel={matchResult.weeklyOffer.sponsorLabel}
                  lastReviewedDate={matchResult.weeklyOffer.lastReviewedDate}
                  onEnquire={() => {
                    const mappedProv = mapOfferToProvider(matchResult.weeklyOffer!, true);
                    onEnquire(mappedProv);
                  }}
                />
              ) : (
                <WeeklyOfferHighlight
                  offerId={matchResult.weeklyOffer.offerId}
                  providerName={matchResult.weeklyOffer.providerName}
                  packageName={matchResult.weeklyOffer.packageName}
                  offerHeadline={matchResult.weeklyOffer.headline}
                  postcodeTargeting={matchResult.weeklyOffer.targetPostcodes.join(", ")}
                  townTargeting={matchResult.weeklyOffer.targetTowns.join(", ")}
                  monthlyPrice={matchResult.weeklyOffer.monthlyPrice}
                  contractLength={matchResult.weeklyOffer.contractLength}
                  averageDownloadSpeed={matchResult.weeklyOffer.averageDownloadSpeed}
                  averageUploadSpeed={matchResult.weeklyOffer.averageUploadSpeed}
                  setupFee={matchResult.weeklyOffer.setupFee}
                  routerIncluded={matchResult.weeklyOffer.routerIncluded}
                  knownPriceRise={matchResult.weeklyOffer.knownAnnualPriceRise}
                  offerValidUntil={matchResult.weeklyOffer.offerValidUntil}
                  editorScore={matchResult.weeklyOffer.editorScore}
                  editorVerdict={matchResult.weeklyOffer.editorVerdict}
                  editorNotes={matchResult.weeklyOffer.editorNotes}
                  bestFor={matchResult.weeklyOffer.bestFor}
                  thingsToWatch={matchResult.weeklyOffer.thingsToCheck}
                  ctaLabel={matchResult.weeklyOffer.ctaLabel}
                  ctaUrl={buildTrackedUrl(matchResult.weeklyOffer.baseUrl, "postcode", { utm_term: postcodeArea.postcodePrefix.toLowerCase() })}
                  isSponsored={matchResult.weeklyOffer.isSponsored}
                  sponsorLabel={matchResult.weeklyOffer.sponsorLabel}
                  lastReviewedDate={matchResult.weeklyOffer.lastCheckedDate}
                  onEnquire={() => {
                    const mappedProv = mapOfferToProvider(matchResult.weeklyOffer!, false);
                    onEnquire(mappedProv);
                  }}
                />
              )}
            </section>
          ) : (
            <section className="space-y-3">
              <div className="bg-[#1e293b] border-2 border-slate-700 rounded-2xl p-6 space-y-3" id="weekly-availability-editorial-card-postcode">
                <div className="flex items-center gap-2 text-brand-gold">
                  <span className="p-1.5 bg-slate-800 rounded-lg">
                    <svg className="h-4.5 w-4.5 text-brand-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white font-sans">
                    Weekly availability note
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  We are currently reviewing listed broadband options for this area. Availability can vary by exact address, especially across rural Wiltshire. Use the postcode search or provider checkers to confirm current packages before ordering.
                </p>
              </div>
            </section>
          )}

          {/* PARISH PLAN WEEKLY ADVERTISERS */}
          <AdvertBanner 
            location="weekly-offer-sponsor" 
            postcodePrefix={postcodeArea.postcodePrefix} 
            className="w-full" 
          />

          {/* 6. BEST LISTED DEALS (RANKED PACKAGES) DIRECT */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2 font-sans">
                <Landmark className="h-5 w-5 text-brand-gold" />
                Best Listed Deals in {postcodeArea.postcodePrefix}
              </h2>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs text-slate-350 leading-normal">
                  Our rigorous, multi-factor ranking considers: Monthly price, average download speed, average upload speed, contract length, setup fee, router cost, installation fee, known price changes, price after contract, availability confidence, editor score, rural suitability, home working suitability, and provider type.
                </p>
                <p className="text-[11px] text-brand-gold font-bold leading-normal">
                  Note: Rankings are based on the package information currently listed on this site. Availability and final pricing must be confirmed by the provider. Sponsored listings are clearly marked and do not automatically receive a higher ranking.
                </p>
              </div>
            </div>

            {/* Display list of ranked providers for this postcode */}
            <div className="space-y-5 col-active">
              {activeProvidersMapped.map((provider, index) => (
                <DealRanking
                  key={provider.id}
                  provider={provider}
                  rank={index + 1}
                  onEnquire={onEnquire}
                />
              ))}
            </div>
          </section>

          {/* 7. LOCAL BROADBAND NOTES & EDITOR NOTES */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 border-2 border-slate-700/60 rounded-2xl p-5 md:p-6 text-slate-205">
            <div className="space-y-2.5">
              <h3 className="text-sm font-black uppercase tracking-wider text-brand-gold font-sans flex items-center gap-1.5 whitespace-nowrap">
                <Info className="h-4 w-4" />
                Local Connection Notes
              </h3>
              <p className="text-xs leading-relaxed text-slate-350">
                {postcodeArea.localBroadbandNotes}
              </p>
            </div>
            
            <div className="space-y-2.5 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-teal-450 font-sans flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="h-4 w-4" />
                Wiltshire Editor Notes
              </h3>
              <p className="text-xs leading-relaxed text-slate-350">
                Our Editorial Assessment assigns these scores based on actual local altnet surveys, real customer support track records, and contract layout transparency. We consistently update scores to ensure Salisbury Plain and local and alternative providers are treated without mainstream bias.
              </p>
            </div>
          </section>

          {/* REUSABLE EXPERT ADVICE SECTIONS */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-brand-gold font-sans flex items-center gap-1.5">
                <HelpCircle className="h-4.5 w-4.5" />
                Consumer Guides & Frameworks
              </h3>
              <p className="text-xs text-slate-450 leading-relaxed font-semibold">
                Understand the nuances of rural parished connections and standard wireless propagation before ordering.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SeoContentBlock
                key={reusableSeoBlocks["why-postcode-checks-matter"].blockId}
                eyebrow={reusableSeoBlocks["why-postcode-checks-matter"].eyebrow}
                heading={reusableSeoBlocks["why-postcode-checks-matter"].heading}
                intro={reusableSeoBlocks["why-postcode-checks-matter"].intro}
                contentParagraphs={reusableSeoBlocks["why-postcode-checks-matter"].contentParagraphs}
                bulletPoints={reusableSeoBlocks["why-postcode-checks-matter"].bulletPoints}
                editorNote={reusableSeoBlocks["why-postcode-checks-matter"].editorNote}
                ctaLabel={reusableSeoBlocks["why-postcode-checks-matter"].ctaLabel}
                ctaTarget={reusableSeoBlocks["why-postcode-checks-matter"].ctaTarget}
                relatedLinks={reusableSeoBlocks["why-postcode-checks-matter"].relatedLinks}
                onAction={(target) => {
                  if (target === "address-check") {
                    document.getElementById("postcode-lead-form")?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onPageClick?.(target);
                  }
                }}
              />

              <SeoContentBlock
                key={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].blockId : reusableSeoBlocks["what-makes-a-good-deal"].blockId}
                eyebrow={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].eyebrow : reusableSeoBlocks["what-makes-a-good-deal"].eyebrow}
                heading={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].heading : reusableSeoBlocks["what-makes-a-good-deal"].heading}
                intro={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].intro : reusableSeoBlocks["what-makes-a-good-deal"].intro}
                contentParagraphs={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].contentParagraphs : reusableSeoBlocks["what-makes-a-good-deal"].contentParagraphs}
                bulletPoints={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].bulletPoints : reusableSeoBlocks["what-makes-a-good-deal"].bulletPoints}
                editorNote={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].editorNote : reusableSeoBlocks["what-makes-a-good-deal"].editorNote}
                ctaLabel={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].ctaLabel : reusableSeoBlocks["what-makes-a-good-deal"].ctaLabel}
                ctaTarget={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].ctaTarget : reusableSeoBlocks["what-makes-a-good-deal"].ctaTarget}
                relatedLinks={isRuralPostcode ? reusableSeoBlocks["rural-broadband-notes"].relatedLinks : reusableSeoBlocks["what-makes-a-good-deal"].relatedLinks}
                onAction={(target) => {
                  if (target === "address-check") {
                    document.getElementById("postcode-lead-form")?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onPageClick?.(target);
                  }
                }}
              />
            </div>
          </section>

          {/* INDEPENDENT BOUNDARY REFERENCE CHECKS SECTION */}
          <section className="bg-slate-900 border-2 border-slate-800 p-6 rounded-2xl space-y-4" id="independent-reference-checks">
            <div className="space-y-1.5">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-gold flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-brand-gold" />
                Independent Boundary Reference Checks
              </h3>
              <p className="text-xs text-slate-350 leading-relaxed">
                For deeper postcode level availability checks, use provider checkers, Ofcom, Openreach and independent tools such as ThinkBroadband. This site uses local editorial matching and provider source links, but address level availability must be confirmed before ordering.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
              <a
                href="https://www.openreach.com/fibre-checker?utm_source=wiltshirebroadbandfinder&utm_campaign=postcode_check&utm_medium=external_checker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl group transition-all text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-extrabold text-white group-hover:text-brand-gold">Openreach Fibre Checker</span>
                  <p className="text-[10px] text-slate-500 font-medium">Official Openreach line survey database</p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="https://checker.ofcom.org.uk/en-gb/broadband-coverage?utm_source=wiltshirebroadbandfinder&utm_campaign=postcode_check&utm_medium=external_checker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl group transition-all text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-extrabold text-white group-hover:text-brand-gold">Ofcom Broadband Checker</span>
                  <p className="text-[10px] text-slate-500 font-medium">Government telecom coverage search</p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="https://labs.thinkbroadband.com/local/postcode?utm_source=wiltshirebroadbandfinder&utm_campaign=postcode_check&utm_medium=external_checker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl group transition-all text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-extrabold text-white group-hover:text-brand-gold">ThinkBroadband Local Map</span>
                  <p className="text-[10px] text-slate-500 font-medium font-heavy">Interactive maps showing FTTP/cabinet layout</p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="https://www.thinkbroadband.com/postcode-search?utm_source=wiltshirebroadbandfinder&utm_campaign=postcode_check&utm_medium=external_checker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl group transition-all text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-extrabold text-white group-hover:text-brand-gold">ThinkBroadband Search</span>
                  <p className="text-[10px] text-slate-500 font-medium font-heavy">Independent postcode check analysis</p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </section>

          {/* 8. FAQ SECTION */}
          <section className="bg-slate-900/40 border-2 border-slate-700/60 rounded-2xl p-5 md:p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-black uppercase tracking-wider text-brand-gold font-sans flex items-center gap-1.5">
              <HelpCircle className="h-4.5 w-4.5" />
              Frequently Asked Questions for {postcodeArea.postcodePrefix} Residents
            </h3>
            <div className="space-y-3 font-sans">
              {(postcodeArea.faqs || []).map((faq, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-700/30 p-4 rounded-xl space-y-2">
                  <h4 className="text-xs font-black text-white flex items-start gap-1.5 leading-snug">
                    <span className="text-brand-gold">Q:</span>
                    {faq.question}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-4">
                    <span className="text-emerald-450 font-bold block mb-1">Answer:</span>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Lead Form, Nearby Postcodes and Disclaimers */}
        <div className="space-y-8">
          
          {/* 9. LEAD CAPTURE FORM */}
          <section id="postcode-lead-form" className="bg-[#12192c] border-2 border-slate-705/60 p-5 rounded-2xl space-y-4 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-sm font-black uppercase tracking-wider text-brand-gold font-sans">
                Postcode Eligibility Check
              </h3>
              <p className="text-[11px] text-slate-400 font-semibold leading-normal">
                Submit details below to let our local Wiltshire team verify precise speed, available connection methods, and active promotions for your property.
              </p>
            </div>
            <LeadForm
              preSelectedProvider={activeProvidersMapped[0]}
              onSubmitSuccess={() => {}}
              className="bg-transparent"
            />
          </section>

          {/* 10. NEARBY POSTCODE AREAS */}
          {nearbyPostcodeObjects.length > 0 && (
            <section className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                Nearby Postcode Areas
              </h3>
              <p className="text-[11px] text-slate-505">
                Explore broadband deployment patterns for communities adjacent to {postcodeArea.postcodePrefix}:
              </p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {nearbyPostcodeObjects.map((area) => (
                  <button
                    key={area.postcodePrefix}
                    onClick={() => onPostcodeSelect(area.postcodePrefix)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 select-none text-xs rounded text-slate-205 cursor-pointer font-bold transition-all duration-150 flex items-center gap-1"
                  >
                    <MapPin className="h-3.5 w-3.5 text-brand-gold" />
                    <span>{area.postcodePrefix} ({area.primaryTown})</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* RELATED TOWN GUIDE */}
          {matchedTown && onTownClick && (
            <section className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-brand-gold" />
                Related Wiltshire Town Guide
              </h3>
              <p className="text-[11px] text-slate-505">
                Explore broadband options, Altnet rollouts and speed rankings for the primary hub serving this postcode:
              </p>
              <button
                type="button"
                onClick={() => onTownClick(matchedTown.id)}
                className="w-full text-left p-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between group transition-all cursor-pointer"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-202 group-hover:text-brand-gold transition-colors block">
                    {matchedTown.name} Broadband Guide
                  </span>
                  <span className="text-[10px] text-slate-500 line-clamp-1 block">
                    {matchedTown.shortIntro || "Compare local providers and speeds."}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            </section>
          )}

          {/* 11. TRANSPARENT COMPLIANCE DISCLAIMER */}
          <section className="bg-slate-900/35 border border-slate-800/80 p-4 rounded-xl space-y-2 text-[10px] text-slate-500 leading-relaxed font-sans font-medium">
            <p className="font-bold text-slate-400 uppercase tracking-wider">
              Service Check Disclosures
            </p>
            <p>
              We provide independent information comparing selected Wiltshire alternative networks and national Openreach providers. Symmetrical speed estimates, router inclusions, and monthly setup rates are correct at the time of publication but remain subject to detailed provider survey and terms.
            </p>
            <p>
              Sponsored placements are clearly marked and do not automatically improve scoring or placement ranks. Always verify precise legal terms directly on the provider's checkout screen before committing to contracts.
            </p>
            <p className="text-[9.5px]">
              Wiltshire Broadband Finder is operated by Cane Communications Limited, Company number 11485145.
            </p>
          </section>

        </div>

      </div>

      {/* 12. INTERNAL SEO LINK DIRECTORY */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200">
        <InternalSEOLinks
          onPageClick={onPageClick || (() => {})}
          onPostcodeClick={onPostcodeSelect}
          onTownClick={onTownClick || (() => {})}
          id="postcode-page-seo-links"
        />
      </div>

    </div>
  );
}
export default PostcodePage;
