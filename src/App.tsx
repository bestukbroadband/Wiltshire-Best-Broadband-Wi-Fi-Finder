/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Network,
  Search,
  Sliders,
  Filter,
  CheckCircle2,
  MapPin,
  Calendar,
  AlertCircle,
  HelpCircle,
  Info,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronDown
} from "lucide-react";

// Data feeds
import { providersData } from "./data/providers";
import { townsData } from "./data/towns";
import { providerCategoriesData } from "./data/providerCategories";
import { localUpdatesData } from "./data/localUpdates";
import { siteSettingsData } from "./data/siteSettings";
import { pricingSourcesData } from "./data/pricingSources";

// Sub-components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HeroSearch } from "./components/HeroSearch";
import { WeeklyOfferHighlight } from "./components/WeeklyOfferHighlight";
import { FilterPanel, initialFilterState, FilterState } from "./components/FilterPanel";
import { ProviderCard } from "./components/ProviderCard";
import { SponsoredProviderCard } from "./components/SponsoredProviderCard";
import { SponsoredDealCard } from "./components/SponsoredDealCard";
import { PackageCard } from "./components/PackageCard";
import { BestDealsSection } from "./components/BestDealsSection";
import { LeadForm } from "./components/LeadForm";
import { AdvertiseForm } from "./components/AdvertiseForm";
import { ListProviderForm } from "./components/ListProviderForm";
import { AdvertBanner } from "./components/AdvertBanner";
import { TrustNotice } from "./components/TrustNotice";
import { LegalNotice } from "./components/LegalNotice";
import { HowItWorks } from "./components/HowItWorks";
import { LocalUpdateCard } from "./components/LocalUpdateCard";
import { ProviderCategoryCard } from "./components/ProviderCategoryCard";
import { NewsletterSignup } from "./components/NewsletterSignup";
import { TownSearch } from "./components/TownSearch";
import { TownPage } from "./components/TownPage";
import { PostcodePage } from "./components/PostcodePage";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdIntegrationHub } from "./components/AdIntegrationHub";
import { CookieBanner } from "./components/CookieBanner";
import { BroadbandNewsTicker } from "./components/BroadbandNewsTicker";
import { featuredOfferData } from "./data/featuredOffer";
import { buildTrackedUrl } from "./data/trackingConfig";

import { postcodeAreasData } from "./data/postcodeAreas";
import { seoPagesData } from "./data/seoPages";
import { townPagesData } from "./data/townPages";
import { SEOHead } from "./components/SEOHead";
import { SeoPageTemplate } from "./components/SeoPageTemplate";
import { InternalSEOLinks } from "./components/InternalSEOLinks";
import { Provider, Town, LocalUpdate, SeoPageData } from "./types";
import { ProviderDirectoryView } from "./components/ProviderDirectoryView";
import { ProviderProfileView } from "./components/ProviderProfileView";
import { WiltshireTrackedProviders } from "./components/WiltshireTrackedProviders";
import { providerDirectoryData } from "./data/providerDirectory";

export default function App() {
  const pushStateSafe = (state: any, title: string, url: string) => {
    const repoName = "/Wiltshire-Best-Broadband-Wi-Fi-Finder";
    let targetUrl = url;
    if (window.location.hostname.endsWith(".github.io") || window.location.pathname.startsWith(repoName)) {
      if (!url.startsWith(repoName)) {
        targetUrl = repoName + (url.startsWith("/") ? "" : "/") + url;
      }
    }
    window.history.pushState(state, title, targetUrl);
  };

  const [activeTab, setActiveTab] = useState<string>("home"); // "home" | "best-deals" | "alt-net" | "mainstream" | "advertise" | "list-provider" | "admin" | "town-<id>" | "privacy" | "terms" | "cookie" | "contact" | "postcode-<prefix>"
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  
  // Selection category trigger
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  
  const [selectedEnquiryProvider, setSelectedEnquiryProvider] = useState<Provider | undefined>(undefined);
  const [showStickyEnquiryModal, setShowStickyEnquiryModal] = useState(false);
  
  // Active reading update dialog
  const [readingUpdate, setReadingUpdate] = useState<LocalUpdate | null>(null);
  
  // Tab within Advertise routing: "apply" | "hubs"
  const [advertiseSubTab, setAdvertiseSubTab] = useState<"apply" | "hubs">("apply");

  // Synchronize path/slug router on load & popstate
  useEffect(() => {
    const handleUrlRouting = () => {
      let path = window.location.pathname;
      const hash = window.location.hash;
      
      const repoName = "/Wiltshire-Best-Broadband-Wi-Fi-Finder";
      if (path.startsWith(repoName)) {
        path = path.substring(repoName.length);
      }
      if (!path.startsWith("/")) {
        path = "/" + path;
      }
      
      // Support /broadband-providers or #/broadband-providers
      if (path === "/broadband-providers" || hash === "#/broadband-providers") {
        setActiveTab("providers-directory");
        return;
      }

      // Support /providers/slug or #/providers/slug
      const providerProfilePathMatch = path.match(/^\/providers\/([a-z0-9-]+)/i);
      const providerProfileHashMatch = hash.match(/^#\/providers\/([a-z0-9-]+)/i);
      const providerSlugVal = (providerProfilePathMatch && providerProfilePathMatch[1]) || (providerProfileHashMatch && providerProfileHashMatch[1]);
      if (providerSlugVal) {
        setActiveTab(`provider-${providerSlugVal}`);
        return;
      }

      // Match /broadband/slug in pathname or #/broadband/slug
      const pathMatch = path.match(/^\/broadband\/([a-z0-9_]+)/i);
      const hashMatch = hash.match(/^#\/broadband\/([a-z0-9_]+)/i);
      
      const slugVal = (pathMatch && pathMatch[1]) || (hashMatch && hashMatch[1]);
      if (slugVal) {
        const area = postcodeAreasData.find(a => a.slug === slugVal);
        if (area) {
          setActiveTab(`postcode-${area.postcodePrefix}`);
          return;
        }
      }
      
      // Support town/id routing via /town/id
      const townMatchPath = path.match(/^\/town\/([a-z0-9-]+)/i);
      const townMatchHash = hash.match(/^#\/town\/([a-z0-9-]+)/i);
      const townIdVal = (townMatchPath && townMatchPath[1]) || (townMatchHash && townMatchHash[1]);
      if (townIdVal) {
        const town = townsData.find(t => t.id === townIdVal);
        if (town) {
          setActiveTab(`town-${town.id}`);
          return;
        }
      }

      // Support /guide/slug and direct /{slug} routing
      const guideMatchPath = path.match(/^\/guide\/([a-z0-9-]+)/i);
      const guideMatchHash = hash.match(/^#\/guide\/([a-z0-9-]+)/i);
      const guideSlugVal = (guideMatchPath && guideMatchPath[1]) || (guideMatchHash && guideMatchHash[1]);
      
      const cleanPath = path.replace(/^\//, "").toLowerCase();
      
      // If matches via /guide/slug
      if (guideSlugVal) {
        const matchedPageId = Object.keys(seoPagesData).find(key => seoPagesData[key].slug === guideSlugVal);
        if (matchedPageId) {
          setActiveTab(matchedPageId);
          return;
        }
      } else if (cleanPath && cleanPath !== "index.html") {
        // If matches direct root level slug or pageId key
        const matchedPageId = Object.keys(seoPagesData).find(key => 
          key.toLowerCase() === cleanPath || 
          seoPagesData[key].slug.toLowerCase() === cleanPath
        );
        if (matchedPageId) {
          setActiveTab(matchedPageId);
          return;
        }
      }
      
      // Default to home tab
      setActiveTab("home");
    };

    handleUrlRouting();
    window.addEventListener("popstate", handleUrlRouting);
    return () => window.removeEventListener("popstate", handleUrlRouting);
  }, []);

  // Auto scroll up on tab modifications
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // Handle hero postcode search
  const handleHeroSearchSubmit = (query: string) => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return;

    // Check if matching postcode prefix or outward postcode sector (e.g. SN10, SN10 1EP)
    const normalizedQuery = query.trim().toUpperCase().replace(/\s+/g, "");
    const matchedPostcode = postcodeAreasData.find(
      (area) =>
        normalizedQuery === area.postcodePrefix ||
        normalizedQuery.startsWith(area.postcodePrefix)
    );

    if (matchedPostcode) {
      const newPath = `/broadband/${matchedPostcode.slug}`;
      pushStateSafe({ tab: `postcode-${matchedPostcode.postcodePrefix}` }, "", newPath);
      setActiveTab(`postcode-${matchedPostcode.postcodePrefix}`);
      return;
    }

    // Direct exact Wiltshire town matching
    const matchedTown = townsData.find(
      (town) =>
        town.name.toLowerCase() === trimmedQuery ||
        town.postcodeExamples.some((p) => p.toLowerCase() === trimmedQuery)
    );

    if (matchedTown) {
      setActiveTab(`town-${matchedTown.id}`);
      return;
    }

    // Partial Wiltshire town matching
    const partialMatchedTown = townsData.find(
      (town) =>
        town.name.toLowerCase().includes(trimmedQuery) ||
        town.postcodeExamples.some((p) => p.toLowerCase().includes(trimmedQuery))
    );

    if (partialMatchedTown) {
      setActiveTab(`town-${partialMatchedTown.id}`);
      return;
    }

    // Suffix postcode search filters
    setFilters((prev) => ({
      ...prev,
      searchQuery: query
    }));

    // Scroll smoothly to comparison engine view
    const mainAnchor = document.getElementById("comparison-finder");
    if (mainAnchor) {
      mainAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Switch category lists
  const handleCategorySelect = (catId: string) => {
    const category = providerCategoriesData.find((c) => c.id === catId);
    if (!category) return;

    setSelectedCategoryId(selectedCategoryId === catId ? null : catId);

    // Apply filters based on matching category types
    setFilters((prev) => {
      // Clear or set filter state
      if (selectedCategoryId === catId) {
        return { ...prev, selectedTypes: [] };
      }
      
      const mappedTypes = providersData
        .filter((p) => p.networkType.toLowerCase().includes(category.name.toLowerCase()) || p.bestFor.toLowerCase().includes(category.name.toLowerCase()))
        .map((p) => p.providerType);
        
      return {
        ...prev,
        selectedTypes: mappedTypes.length > 0 ? mappedTypes : [prev.selectedTypes[0] || "Alternative network providers"]
      };
    });

    const mainAnchor = document.getElementById("comparison-finder");
    if (mainAnchor) {
      mainAnchor.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Computed matching providers list based on dynamic search criteria
  const filteredProviders = useMemo(() => {
    return providersData.filter((provider) => {
      // 1. Text Search Filter (name, packages, postcodes, description)
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = provider.providerName.toLowerCase().includes(q);
        const matchesPackage = provider.packageName.toLowerCase().includes(q);
        const matchesDesc = provider.description.toLowerCase().includes(q);
        const matchesTownList = provider.townsCovered.some((t) => t.toLowerCase().includes(q));
        
        if (!matchesName && !matchesPackage && !matchesDesc && !matchesTownList) {
          return false;
        }
      }

      // 2. Provider Type Filter (Altnet vs Mainstream / national)
      if (filters.selectedTypes.length > 0) {
        if (!filters.selectedTypes.includes(provider.providerType)) {
          return false;
        }
      }

      // 3. Price Filter
      if (provider.monthlyPriceFrom > filters.maxMonthlyPrice) {
        return false;
      }

      // 4. Minimum Speed Filter
      if (provider.averageDownloadSpeed < filters.minSpeed) {
        return false;
      }

      // 5. Contract Duration Filter (max contract ceiling)
      if (provider.contractLength > filters.maxContractLength) {
        return false;
      }

      // 6. Upfront Fees
      if (filters.noSetupFee && (provider.setupFee + provider.installationFee) > 0) {
        return false;
      }

      // 7. Router Included
      if (filters.routerIncluded && !provider.routerIncluded) {
        return false;
      }

      // 8. Price Freeze Lock
      if (filters.noKnownPriceRise && provider.midContractPriceRise) {
        return false;
      }

      // 9. Lowest Upfront setup cost
      if (filters.lowestUpfrontCost && provider.installationFee > 0) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleEnquireTrigger = (provider: Provider) => {
    setSelectedEnquiryProvider(provider);
    setShowStickyEnquiryModal(true);
  };

  const handleCustomModalClose = () => {
    setShowStickyEnquiryModal(false);
    setSelectedEnquiryProvider(undefined);
  };

  // Tab direct mapping
  const handleTownPageSelect = (townId: string) => {
    setActiveTab(`town-${townId}`);
  };

  const isTownRoute = activeTab.startsWith("town-");
  const activeTownId = isTownRoute ? activeTab.replace("town-", "") : "";
  const activeTown = townsData.find((t) => t.id === activeTownId);

  const isPostcodeRoute = activeTab.startsWith("postcode-");
  const activePostcodePrefix = isPostcodeRoute ? activeTab.replace("postcode-", "") : "";
  const activePostcodeArea = useMemo(() => {
    return postcodeAreasData.find((area) => area.postcodePrefix === activePostcodePrefix) || null;
  }, [activePostcodePrefix]);

  const isProviderProfileRoute = activeTab.startsWith("provider-");
  const activeProviderSlug = isProviderProfileRoute ? activeTab.replace("provider-", "") : "";
  const activeProvider = useMemo(() => {
    if (!activeProviderSlug) return null;
    return providerDirectoryData.find((p) => p.slug === activeProviderSlug) || null;
  }, [activeProviderSlug]);

  const isPremiumSeoPage = [
    "best-broadband-wiltshire",
    "best-wifi-wiltshire",
    "best-internet-provider-wiltshire",
    "best-broadband-provider-wiltshire",
    "best-rural-broadband-wiltshire",
    "best-rural-broadband-villages-towns",
    "full-fibre-broadband-wiltshire",
    "alternative-network-broadband-wiltshire",
    "broadband-deals-wiltshire",
    "broadband-providers-wiltshire"
  ].includes(activeTab);

  const currentSeoData = useMemo<SeoPageData>(() => {
    if (seoPagesData[activeTab]) {
      return seoPagesData[activeTab];
    }

    if (activeTab === "admin") {
      return {
        pageTitle: "Admin Dashboard | Wiltshire Broadband Finder",
        metaTitle: "Admin Dashboard",
        metaDescription: "Internal portal and administrator hub for Wiltshire Broadband Finder.",
        canonicalUrl: "https://www.wiltshirebroadbandfinder.co.uk/admin",
        slug: "admin",
        h1: "Admin Dashboard Control Center",
        primaryKeyword: "wiltshire broadband finder admin",
        secondaryKeywords: [],
        faqItems: [],
        schemaType: "WebPage",
        schemaJson: "{}",
        ogTitle: "Admin Dashboard",
        ogDescription: "Internal administrative use only.",
        ogImage: "https://www.wiltshirebroadbandfinder.co.uk/logo.png",
        twitterTitle: "Admin Dashboard",
        twitterDescription: "Internal administrative use only.",
        twitterImage: "https://www.wiltshirebroadbandfinder.co.uk/logo.png",
        lastUpdated: "2026-06-10",
        reviewedBy: "Joshua Greedy",
        publishedBy: "Cane Communications Limited",
        indexStatus: "noindex"
      };
    }

    if (activeTab === "providers-directory") {
      return {
        pageTitle: "UK Broadband Providers Directory & Wiltshire Coverage Maps",
        metaTitle: "Broadband Providers Directory UK Wiltshire | Compare Networks",
        metaDescription: "Comprehensive list directory of mainstream UK telecom networks, regional altnets, satellite wireless providers, and estate operators. Track local Wiltshire relevance.",
        canonicalUrl: "https://www.wiltshirebroadbandfinder.co.uk/broadband-providers",
        slug: "broadband-providers",
        h1: "Broadband Providers Directory",
        introCopy: "Independent directory tracking high-speed parished networks, mobile operators, and estate infrastructure.",
        postcodeTargets: [],
        townTargets: [],
        primaryKeyword: "broadband providers list",
        secondaryKeywords: ["wiltshire altnets", "internet service providers directory"],
        faqItems: [
          {
            question: "What is an alternative network (AltNet) provider?",
            answer: "An alternative network (AltNet) is a separate broadband network independent of Openreach or Virgin Media. Examples include Gigaclear, Wessex Internet, Truespeed and Zzoomm, which build dedicated full-fibre lines to towns and parished villages."
          },
          {
            question: "How do I check if a broadband provider is available on my street?",
            answer: "Broadband networks are street-specific. While our directory flags regional Wiltshire presence, you must run an address-level postcode check to verify which fiber or wireless lines physically serve your home."
          }
        ],
        schemaType: "WebPage",
        schemaJson: "{}",
        ogTitle: "UK Broadband Providers Directory & Wiltshire Coverage Maps",
        ogDescription: "Comprehensive list directory of mainstream UK telecom networks, regional altnets, satellite wireless providers, and estate operators.",
        ogImage: "https://www.wiltshirebroadbandfinder.co.uk/logo.png",
        twitterTitle: "UK Broadband Providers Directory",
        twitterDescription: "Explore mainstream and alternative networks on our comprehensive directory.",
        twitterImage: "https://www.wiltshirebroadbandfinder.co.uk/logo.png",
        lastUpdated: "2026-06-08",
        editorName: "Cane Editorial Team",
        reviewedBy: "Joshua Greedy",
        publishedBy: "Cane Communications Limited"
      };
    }

    if (activeTab.startsWith("provider-")) {
      const slugVal = activeTab.replace("provider-", "");
      const prov = providerDirectoryData.find(p => p.slug === slugVal);
      return {
        pageTitle: prov ? prov.seoTitle : "Provider Profile | Wiltshire Broadband Finder",
        metaTitle: prov ? prov.seoTitle : "Provider Profile",
        metaDescription: prov ? prov.metaDescription : "Explore high-speed internet options near you.",
        canonicalUrl: `https://www.wiltshirebroadbandfinder.co.uk/providers/${slugVal}`,
        slug: `providers/${slugVal}`,
        h1: prov ? prov.displayName : "Provider Profile",
        introCopy: prov ? prov.coverageNotes : "",
        postcodeTargets: prov?.postcodeTargets || [],
        townTargets: prov?.townTargets || [],
        primaryKeyword: prov ? `${prov.displayName} broadband` : "broadband provider",
        secondaryKeywords: [],
        faqItems: [
          {
            question: `Is ${prov?.displayName || "this provider"} available in Wiltshire?`,
            answer: `${prov?.displayName || "This provider's"} coverage varies by street and address. Some Wiltshire villages have active fiber lines laid, while other homes may require a satellite or wireless unit.`
          }
        ],
        schemaType: "ItemPage",
        schemaJson: "{}",
        ogTitle: prov ? prov.seoTitle : "Provider Profile",
        ogDescription: prov ? prov.metaDescription : "Explore high-speed internet options.",
        ogImage: "https://www.wiltshirebroadbandfinder.co.uk/logo.png",
        twitterTitle: prov ? prov.seoTitle : "Provider Profile",
        twitterDescription: prov ? prov.metaDescription : "Explore high-speed internet options.",
        twitterImage: "https://www.wiltshirebroadbandfinder.co.uk/logo.png",
        lastUpdated: "2026-06-08",
        editorName: "Cane Editorial Team",
        reviewedBy: "Joshua Greedy",
        publishedBy: "Cane Communications Limited",
        indexStatus: (prov && prov.isLive !== false && prov.listingStatus !== "Disabled") ? "index" : "noindex"
      };
    }
    
    if (activeTab.startsWith("town-")) {
      const townId = activeTab.replace("town-", "");
      if (townPagesData[townId]) {
        return townPagesData[townId];
      }
      return {
        pageTitle: `Best Broadband Deals in ${activeTown?.name || "Wiltshire"} | Wiltshire Broadband Finder`,
        metaTitle: `Broadband in ${activeTown?.name || "Wiltshire"} | Full Fibre & Altnets`,
        metaDescription: `Compare top high-speed broadband rates in ${activeTown?.name || "Wiltshire"}. Find symmetrical gigabit fibre packages.`,
        canonicalUrl: `https://www.wiltshirebroadbandfinder.co.uk/town/${townId}`,
        slug: townId,
        h1: `Broadband in ${activeTown?.name || "Wiltshire"}`,
        introCopy: activeTown?.shortIntro || "",
        postcodeTargets: activeTown?.postcodeExamples || [],
        townTargets: [townId, ...(activeTown?.nearbyTowns || [])],
        primaryKeyword: `broadband deals in ${activeTown?.name || "Wiltshire"}`,
        secondaryKeywords: [],
        faqItems: activeTown?.faqs || [],
        schemaType: "WebPage",
        schemaJson: "{}",
        ogTitle: `Best Broadband in ${activeTown?.name || "Wiltshire"}`,
        ogDescription: `Find full fibre coverage, speeds, and deals in ${activeTown?.name || "Wiltshire"}.`,
        ogImage: "https://www.wiltshirebroadbandfinder.co.uk/logo.png",
        twitterTitle: `Best Broadband in ${activeTown?.name || "Wiltshire"}`,
        twitterDescription: `Find full fibre coverage in ${activeTown?.name || "Wiltshire"}.`,
        twitterImage: "https://www.wiltshirebroadbandfinder.co.uk/logo.png",
        lastUpdated: "2026-06-08",
        editorName: "Cane Editorial Team",
        reviewedBy: "Joshua Greedy",
        publishedBy: "Cane Communications Limited",
        indexStatus: activeTown?.indexStatus || "index"
      };
    }

    if (activeTab.startsWith("postcode-") && activePostcodeArea) {
      return {
        pageTitle: activePostcodeArea.seoTitle || `Best Broadband in ${activePostcodeArea.postcodePrefix} | Wiltshire Broadband Finder`,
        metaTitle: activePostcodeArea.seoTitle,
        metaDescription: activePostcodeArea.metaDescription,
        canonicalUrl: `https://www.wiltshirebroadbandfinder.co.uk/broadband/${activePostcodeArea.slug}`,
        slug: activePostcodeArea.slug,
        h1: activePostcodeArea.h1,
        introCopy: activePostcodeArea.introCopy,
        postcodeTargets: [activePostcodeArea.postcodePrefix],
        townTargets: [activePostcodeArea.primaryTown],
        primaryKeyword: `broadband ${activePostcodeArea.postcodePrefix}`,
        secondaryKeywords: [`fibre broadband ${activePostcodeArea.postcodePrefix}`, `${activePostcodeArea.areaName} broadband deals`],
        faqItems: activePostcodeArea.faqs || [],
        schemaType: "FAQPage",
        schemaJson: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": (activePostcodeArea.faqs || []).map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          }))
        }),
        ogTitle: activePostcodeArea.seoTitle,
        ogDescription: activePostcodeArea.metaDescription,
        ogImage: "https://www.wiltshirebroadbandfinder.co.uk/logo.png",
        twitterTitle: activePostcodeArea.seoTitle,
        twitterDescription: activePostcodeArea.metaDescription,
        twitterImage: "https://www.wiltshirebroadbandfinder.co.uk/logo.png",
        lastUpdated: activePostcodeArea.lastUpdated || "2026-06-08",
        editorName: "Cane Editorial Team",
        reviewedBy: "Joshua Greedy",
        publishedBy: "Cane Communications Limited",
        indexStatus: activePostcodeArea.indexStatus || "index"
      };
    }

    return seoPagesData.home;
  }, [activeTab, activeTown, activePostcodeArea]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c101d] via-[#12192c] to-[#04060b] flex flex-col font-sans" id="wiltshire-applet-root">
      
      <SEOHead seoData={currentSeoData} />

      {/* NEWS TICKER */}
      <BroadbandNewsTicker />

      {/* HEADER COMPASS */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onEnquireClick={() => {
          setSelectedEnquiryProvider(undefined);
          setShowStickyEnquiryModal(true);
        }}
      />

      {/* LEADERSHIP BRAND HERO PLACEMENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-10">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {/* 1. HOMEPAGE TAB ROUTE */}
            {activeTab === "home" && (
              <div className="space-y-10">
                {/* HERO SEARCH BANNER */}
                <HeroSearch
                  onSearchSubmit={handleHeroSearchSubmit}
                  onListProviderClick={() => setActiveTab("list-provider")}
                />

                {/* HERO SPONSOR STRIP */}
                <AdvertBanner location="hero-sponsor-strip" className="w-full mt-4" />

                {/* WEEKLY OFFER HIGHLIGHT SECTION */}
                {featuredOfferData && featuredOfferData.isLive ? (
                  <WeeklyOfferHighlight
                    offerId={featuredOfferData.offerId}
                    providerName={featuredOfferData.providerName}
                    packageName={featuredOfferData.packageName}
                    offerHeadline={featuredOfferData.headline}
                    postcodeTargeting={featuredOfferData.targetPostcodes.join(", ")}
                    townTargeting={featuredOfferData.targetTowns.join(", ")}
                    monthlyPrice={featuredOfferData.monthlyPrice}
                    contractLength={featuredOfferData.contractLength}
                    averageDownloadSpeed={featuredOfferData.averageDownloadSpeed}
                    averageUploadSpeed={featuredOfferData.averageUploadSpeed}
                    setupFee={featuredOfferData.setupFee}
                    routerIncluded={featuredOfferData.routerIncluded}
                    knownPriceRise={featuredOfferData.knownPriceRise}
                    offerValidUntil={featuredOfferData.offerValidUntil}
                    editorScore={featuredOfferData.editorScore}
                    editorVerdict={featuredOfferData.editorVerdict}
                    editorNotes={featuredOfferData.editorNotes}
                    bestFor={featuredOfferData.bestFor}
                    thingsToWatch={featuredOfferData.thingsToCheck}
                    ctaLabel={featuredOfferData.ctaLabel}
                    ctaUrl={buildTrackedUrl(featuredOfferData.baseUrl, "weekly", { utm_term: "homepage_featured" })}
                    isSponsored={true}
                    sponsorLabel={featuredOfferData.sponsorLabel}
                    lastReviewedDate={featuredOfferData.lastReviewedDate}
                    onEnquire={(provName, pkgName) => {
                      const fallbackProv: any = {
                        id: featuredOfferData.offerId,
                        providerName: featuredOfferData.providerName,
                        packageName: featuredOfferData.packageName,
                        providerType: [featuredOfferData.providerType],
                        networkType: featuredOfferData.providerType,
                        website: buildTrackedUrl(featuredOfferData.baseUrl, "weekly", { utm_term: "homepage_featured" }),
                        coverageAreas: featuredOfferData.targetTowns,
                        postcodeAreas: featuredOfferData.targetPostcodes,
                        minPrice: featuredOfferData.monthlyPrice,
                        monthlyPrice: featuredOfferData.monthlyPrice,
                        monthlyPriceFrom: featuredOfferData.monthlyPrice,
                        contractLength: featuredOfferData.contractLength,
                        averageDownloadSpeed: featuredOfferData.averageDownloadSpeed,
                        averageUploadSpeed: featuredOfferData.averageUploadSpeed,
                        setupFee: featuredOfferData.setupFee,
                        routerCost: 0,
                        routerIncluded: featuredOfferData.routerIncluded,
                        installationFee: featuredOfferData.installationFee,
                        deliveryFee: 0,
                        midContractPriceRise: false,
                        knownAnnualPriceRise: featuredOfferData.knownPriceRise,
                        lastCheckedDate: featuredOfferData.lastReviewedDate,
                        priceStatus: "Featured",
                        bestFor: featuredOfferData.bestFor,
                        leadGenerationActive: true,
                        isSponsored: true
                      };
                      setSelectedEnquiryProvider(fallbackProv);
                      setShowStickyEnquiryModal(true);
                    }}
                  />
                ) : (
                  <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-md p-6 space-y-3" id="weekly-availability-editorial-card">
                    <div className="flex items-center gap-2 text-brand-green">
                      <span className="p-1.5 bg-brand-green-light rounded-lg">
                        <svg className="h-4.5 w-4.5 text-brand-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-950 font-sans">
                        Weekly availability note
                      </h3>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      We are currently reviewing listed broadband options for this area. Availability can vary by exact address, especially across Wiltshire. Use the postcode search or provider checkers to confirm current packages before ordering.
                    </p>
                  </div>
                )}

                {/* AD LEADERBOARD BILLBOARD */}
                <AdvertBanner placement="Top leaderboard advert" className="w-full" />

                {/* VISUAL INFRASTRUCTURE CATEGORIES SELECTIONS */}
                <section className="space-y-3">
                  <div className="space-y-1 text-center md:text-left">
                    <span className="text-[11px] font-extrabold text-brand-gold uppercase tracking-widest leading-none">
                      Infrastructure Options
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                      Compare Wiltshire Deployment Classes
                    </h2>
                    <p className="text-xs text-slate-300 font-semibold max-w-xl">
                      Select a specific connectivity medium to filter our objective local guides instantly.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {providerCategoriesData.slice(0, 8).map((cat) => (
                      <ProviderCategoryCard
                        key={cat.id}
                        category={cat}
                        isActive={selectedCategoryId === cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* COMPARISON ENGINE WRAPPER */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4" id="comparison-finder">
                  
                  {/* FILTERS SIDE BAR */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="sticky top-20 space-y-6">
                      <FilterPanel
                        filters={filters}
                        resultCount={filteredProviders.length}
                        onChange={setFilters}
                        onReset={() => {
                          setFilters(initialFilterState);
                          setSelectedCategoryId(null);
                        }}
                      />
                      
                      {/* SIDE PANEL SPONSORED BANNER */}
                      <AdvertBanner placement="Sidebar advert" />
                    </div>
                  </div>

                  {/* ACTIVE PROVIDER DECK */}
                  <div className="lg:col-span-2 space-y-6">
                    {selectedCategoryId && (
                      <AdvertBanner 
                        location="provider-category-sponsor" 
                        categoryName={selectedCategoryId} 
                        className="w-full" 
                      />
                    )}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#12192c] p-4 border-2 border-slate-700/60 rounded-xl shadow-lg">
                      <div>
                        <h2 className="text-base font-black text-white font-sans tracking-tight leading-none">
                          Listed Providers serving Wiltshire Parishes
                        </h2>
                        <span className="text-[11px] text-slate-350 font-bold block mt-1">
                          Refined results based on your selected parameters below.
                        </span>
                      </div>

                      <div className="flex gap-1">
                        <button
                          onClick={() => setFilters((prev) => ({ ...prev, selectedTypes: [] }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            filters.selectedTypes.length === 0
                              ? "bg-brand-gold text-slate-950 font-black shadow-md border border-brand-gold/30"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          All Networks
                        </button>
                        <button
                          onClick={() => setFilters((prev) => ({ ...prev, selectedTypes: ["Alternative network providers"] }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            filters.selectedTypes.includes("Alternative network providers")
                              ? "bg-brand-gold text-slate-950 font-black shadow-md border border-brand-gold/30"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          Altnets
                        </button>
                      </div>
                    </div>

                    {/* DYNAMIC SHIELD - SPONSORED SPOTLIGHT CARDS FIRST */}
                    {filteredProviders.length > 0 && filters.searchQuery === "" && (
                      <div className="space-y-4">
                        <span className="text-[10px] uppercase font-black text-slate-300 block tracking-widest mb-1">
                          Featured local specialists
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5 animate-fadeIn">
                          {providersData.filter((p) => p.isSponsored).slice(0, 2).map((spon) => (
                            <SponsoredProviderCard
                              key={spon.id}
                              provider={spon}
                              onEnquire={handleEnquireTrigger}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* REGULAR DECK LISTINGS */}
                    <div className="space-y-5">
                      <span className="text-[10px] uppercase font-black text-slate-300 block tracking-widest">
                        Standard Local Matches
                      </span>

                      {filteredProviders.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5 animate-fadeIn">
                          {filteredProviders.map((provider) => (
                            <ProviderCard
                              key={provider.id}
                              provider={provider}
                              onEnquire={handleEnquireTrigger}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="py-14 text-center bg-[#12192c] border-2 border-slate-700/60 rounded-2xl space-y-3">
                          <Sliders className="h-10 w-10 text-brand-gold mx-auto" />
                          <h4 className="text-sm font-bold text-white">No matching providers found</h4>
                          <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                            No provider fits those combined speed, price, and price freeze settings. Try resting contract duration slider or widening maximum budget limits.
                          </p>
                          <button
                            onClick={() => {
                              setFilters(initialFilterState);
                              setSelectedCategoryId(null);
                            }}
                            className="text-xs font-bold text-brand-gold underline hover:text-white transition-colors"
                          >
                            Reset filters and check all
                          </button>
                        </div>
                      )}
                    </div>

                    {/* BEST LISTED DEALS PRE-RENDER WRAPPED */}
                    <div className="pt-6 border-t border-slate-108">
                      <BestDealsSection onEnquire={handleEnquireTrigger} limit={3} />
                    </div>

                  </div>
                </div>

                {/* HOW IT WORKS SECTION */}
                <HowItWorks />

                {/* WILTSHIRE REGISTERED TRACKED PROVIDERS GRID */}
                <WiltshireTrackedProviders
                  onNavigateToDirectory={() => {
                    pushStateSafe({ tab: "providers-directory" }, "", "/broadband-providers");
                    setActiveTab("providers-directory");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onNavigateToProvider={(slug) => {
                    pushStateSafe({ tab: `provider-${slug}` }, "", `/providers/${slug}`);
                    setActiveTab(`provider-${slug}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />

                {/* WILTSHIRE TOWN MATRIX VIEWS */}
                <TownSearch onTownSelect={handleTownPageSelect} />

                {/* DYNAMIC LOCAL DEVELOPMENT ARTICLES */}
                <section className="space-y-4" id="rural-broadband-news">
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold text-brand-gold uppercase tracking-widest block leading-none mb-1 font-sans">
                      Wiltshire Updates
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                      Local Digital Infrastructure News
                    </h2>
                    <p className="text-xs text-slate-300 font-semibold max-w-xl leading-relaxed">
                      Read about BDUK Project Gigabit rollouts, altnet mergers, and local fibre voucher statuses across our counties.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {localUpdatesData.map((article) => (
                      <LocalUpdateCard
                        key={article.id}
                        update={article}
                        onReadMore={(art) => setReadingUpdate(art)}
                      />
                    ))}
                  </div>
                </section>

                {/* IN-CONTENT EDITORIAL ADVERT */}
                <AdvertBanner location="in-content-advert" className="w-full" />

                {/* TRUST & COMPLIANCE PLEDGES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <TrustNotice />
                  <LegalNotice />
                </div>

                {/* 1.5. HOME COMPREHENSIVE SEO INDEX INTERNAL LINKS */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 mt-10">
                  <InternalSEOLinks
                    onPageClick={(pageId) => {
                      if (pageId === "alt-net") {
                        setActiveTab("alt-net");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        return;
                      }
                      const page = seoPagesData[pageId];
                      if (page) {
                        const newPath = `/guide/${page.slug}`;
                        pushStateSafe({ tab: pageId }, "", newPath);
                        setActiveTab(pageId);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    onPostcodeClick={(prefix) => {
                      const area = postcodeAreasData.find(a => a.postcodePrefix === prefix);
                      if (area) {
                        const newPath = `/broadband/${area.slug}`;
                        pushStateSafe({ tab: `postcode-${prefix}` }, "", newPath);
                        setActiveTab(`postcode-${prefix}`);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    onTownClick={(townId) => {
                      const town = townsData.find(t => t.id === townId);
                      if (town) {
                        const newPath = `/town/${town.id}`;
                        pushStateSafe({ tab: `town-${town.id}` }, "", newPath);
                        setActiveTab(`town-${town.id}`);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    id="homepage-seo-links"
                  />
                </div>

                {/* NEWSLETTER TRACKER SIGNUP */}
                <NewsletterSignup />

              </div>
            )}

            {/* 2. BEST LISTED DEALS VIEW TAB */}
            {activeTab === "best-deals" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Wiltshire Best Listed Deals</h1>
                  <p className="text-xs leading-relaxed text-slate-300 max-w-2xl">
                    Our objective ranking algorithm scores and orders current provider offerings serving Wiltshire villages based on speed, stability, price freeze lock, and installation expenses.
                  </p>
                </div>
                <BestDealsSection onEnquire={handleEnquireTrigger} limit={12} />
                <LegalNotice />
              </div>
            )}

            {/* 3. ALTNET NETWORKS ROUTE TAB */}
            {activeTab === "alt-net" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Wiltshire Altnets (Alternative Networks)</h1>
                  <p className="text-xs leading-relaxed text-slate-300 max-w-2xl">
                    Alt-nets build custom fibre arrays bypassing national telephone grids. Altnets like Wessex Internet, Gigaclear, and Trooli are active across Wiltshire Parishes offering symmetrical speeds.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {providersData.filter((p) => p.providerType.includes("Alternative network providers")).map((p) => (
                    <ProviderCard key={p.id} provider={p} onEnquire={handleEnquireTrigger} />
                  ))}
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-205 text-xs text-amber-900 leading-relaxed">
                  <strong>Validation Reminder:</strong> Altnets operate within highly specific boundary streets. A single village parish might contain active fibre ports from multiple providers depending on exact postcode coordinates.
                </div>
              </div>
            )}

            {/* 4. NATIONAL BRANDS ROAD TAB */}
            {activeTab === "mainstream" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Mainstream National Brands</h1>
                  <p className="text-xs leading-relaxed text-slate-300 max-w-2xl">
                    National providers (BT, Sky, TalkTalk, EE) operate primarily using the national Openreach network. These reach almost every property but speeds depend heavily on local cabinet lengths.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {providersData.filter((p) => p.providerType.includes("Mainstream broadband providers")).map((p) => (
                    <ProviderCard key={p.id} provider={p} onEnquire={handleEnquireTrigger} />
                  ))}
                </div>
              </div>
            )}

            {/* 5. ADVERTISE TAB */}
            {activeTab === "advertise" && (
              <div className="space-y-6">
                {/* SUB MENU NAVIGATION TABS */}
                <div className="flex border-b border-slate-200 pb-px justify-start gap-5 text-left mb-2">
                  <button
                    onClick={() => setAdvertiseSubTab("apply")}
                    className={`pb-3 text-xs uppercase tracking-widest font-extrabold border-b-2 leading-none transition-all cursor-pointer ${
                      advertiseSubTab === "apply"
                        ? "border-brand-blue text-brand-blue"
                        : "border-transparent text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    Commercial Campaigns
                  </button>
                  <button
                    onClick={() => setAdvertiseSubTab("hubs")}
                    className={`pb-3 text-xs uppercase tracking-widest font-extrabold border-b-2 leading-none transition-all cursor-pointer flex items-center gap-1.5 ${
                      advertiseSubTab === "hubs"
                        ? "border-brand-[0284C7] text-brand-blue"
                        : "border-transparent text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    AdSense & Amazon Code Hub
                  </button>
                </div>

                {advertiseSubTab === "apply" ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
                    <div className="lg:col-span-1 space-y-5">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest bg-amber-50 rounded px-2.5 py-0.5 inline-block border border-amber-100">
                          MEDIA PARTNERSHIPS
                        </span>
                        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none text-left">
                          Advertise With Us
                        </h1>
                        <p className="text-xs text-slate-300 leading-relaxed text-left">
                          Reach Wiltshire households, farm complexes, and local tech professionals actively seeking full fibre and satellite broadband.
                        </p>
                      </div>

                      <div className="bg-white border rounded-2xl p-4.5 space-y-3 text-left">
                        <h4 className="text-xs font-bold text-slate-900 uppercase">Available Positions</h4>
                        <ul className="space-y-2 text-[11.5px] leading-relaxed text-slate-600 list-disc pl-4">
                          <li><strong>Homepage Leaderboard banner:</strong> Placed prominently on top of local listing results.</li>
                          <li><strong>Town Page Sponsor banner:</strong> Target specific regions like Salisbury or Worton.</li>
                          <li><strong>Featured Provider Spotlight:</strong> Highlight speeds and details in glowing partner blocks.</li>
                          <li><strong>Local Newsletter Banner:</strong> Monthly BDUK Gigabit voucher updates tracker sponsor.</li>
                        </ul>
                      </div>

                      <p className="text-[11px] leading-relaxed text-slate-550 text-left">
                        All placements comply strictly with CAP codes and ASA transparency instructions. Sponsored status is always explicitly declared. For customized commercial integrations, pitch layouts, or target region sponsorships, please reach out directly at{" "}
                        <a 
                          href="mailto:bestukbroaband@proton.me" 
                          className="text-brand-gold font-bold hover:underline transition-colors"
                          id="advertise-side-email-link"
                        >
                          Info
                        </a>.
                      </p>
                    </div>

                    <div className="lg:col-span-2">
                      <AdvertiseForm />
                    </div>
                  </div>
                ) : (
                  <AdIntegrationHub />
                )}
              </div>
            )}

            {/* 6. LIST PROVIDER TAB */}
            {activeTab === "list-provider" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-5">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-gold-light rounded px-2.5 py-0.5 inline-block border border-brand-gold/30">
                      PARTNER SCHEME
                    </span>
                    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none font-sans">
                      List Your Broadband
                    </h1>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      Are you a local alternative network builder, a FWA wireless ISP, or municipal reseller deploying coverage in Wiltshire? File your listings parameters below.
                    </p>
                  </div>

                  <div className="bg-white border rounded-2xl p-4.5 text-xs text-slate-600 space-y-2.5 leading-relaxed">
                    <p>
                        Our mission is to help local communities see what is truly available at their village limits. We do not charge listing onboarding fees.
                    </p>
                    <p className="font-semibold text-slate-900">
                      Standard Requirements:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Must cover at least one Wiltshire parish postcode sector.</li>
                      <li>Must provide transparent monthly costs and contract terms.</li>
                      <li>Must submit accurate installation fees.</li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <ListProviderForm />
                </div>
              </div>
            )}

             {/* DIRECTORY VIEW TAB ROUTES */}
            {activeTab === "providers-directory" && (
              <ProviderDirectoryView
                onNavigateToTab={(tabId) => {
                  pushStateSafe({ tab: tabId }, "", `/${tabId}`);
                  setActiveTab(tabId);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onNavigateToProviderProfile={(provSlug) => {
                  pushStateSafe({ tab: `provider-${provSlug}` }, "", `/providers/${provSlug}`);
                  setActiveTab(`provider-${provSlug}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}

            {/* INDIVIDUAL PROVIDER PROFILE TEMPLATE VIEW */}
            {activeTab.startsWith("provider-") && (
              <ProviderProfileView
                provider={activeProvider}
                onBackToDirectory={() => {
                  pushStateSafe({ tab: "providers-directory" }, "", "/broadband-providers");
                  setActiveTab("providers-directory");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onPostcodeClick={(prefix) => {
                  const area = postcodeAreasData.find(a => a.postcodePrefix === prefix);
                  if (area) {
                    const newPath = `/broadband/${area.slug}`;
                    pushStateSafe({ tab: `postcode-${prefix}` }, "", newPath);
                    setActiveTab(`postcode-${prefix}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                onTownClick={(townId) => {
                  const town = townsData.find(t => t.id === townId);
                  if (town) {
                    const newPath = `/town/${town.id}`;
                    pushStateSafe({ tab: `town-${town.id}` }, "", newPath);
                    setActiveTab(`town-${town.id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              />
            )}

            {/* 7. DYNAMIC TOWN ROUTES */}
            {isTownRoute && activeTown && (
              <TownPage
                town={activeTown}
                onTownSelect={handleTownPageSelect}
                onEnquire={handleEnquireTrigger}
                onBackToHome={() => setActiveTab("home")}
                onPageClick={(pageId) => {
                  if (pageId === "home") {
                    pushStateSafe({ tab: "home" }, "", "/");
                    setActiveTab("home");
                  } else {
                    const page = seoPagesData[pageId];
                    if (page) {
                      const newPath = `/guide/${page.slug}`;
                      pushStateSafe({ tab: pageId }, "", newPath);
                      setActiveTab(pageId);
                    }
                  }
                }}
                onPostcodeClick={(prefix) => {
                  const area = postcodeAreasData.find(a => a.postcodePrefix === prefix);
                  if (area) {
                    const newPath = `/broadband/${area.slug}`;
                    pushStateSafe({ tab: `postcode-${prefix}` }, "", newPath);
                    setActiveTab(`postcode-${prefix}`);
                  }
                }}
              />
            )}

            {/* 7.5. DYNAMIC POSTCODE ROUTES */}
            {isPostcodeRoute && activePostcodeArea && (
              <PostcodePage
                postcodeArea={activePostcodeArea}
                providers={providersData}
                onEnquire={handleEnquireTrigger}
                onPostcodeSelect={(prefix) => {
                  const area = postcodeAreasData.find(a => a.postcodePrefix === prefix);
                  if (area) {
                    const newPath = `/broadband/${area.slug}`;
                    pushStateSafe({ tab: `postcode-${prefix}` }, "", newPath);
                    setActiveTab(`postcode-${prefix}`);
                  }
                }}
                onBackToHome={() => {
                  pushStateSafe({ tab: "home" }, "", "/");
                  setActiveTab("home");
                }}
                onPageClick={(pageId) => {
                  if (pageId === "home") {
                    pushStateSafe({ tab: "home" }, "", "/");
                    setActiveTab("home");
                  } else {
                    const page = seoPagesData[pageId];
                    if (page) {
                      const newPath = `/guide/${page.slug}`;
                      pushStateSafe({ tab: pageId }, "", newPath);
                      setActiveTab(pageId);
                    }
                  }
                }}
                onTownClick={(townId) => {
                  const town = townsData.find(t => t.id === townId);
                  if (town) {
                    const newPath = `/town/${town.id}`;
                    pushStateSafe({ tab: `town-${town.id}` }, "", newPath);
                    setActiveTab(`town-${town.id}`);
                  }
                }}
              />
            )}

            {/* PREMIUM SEO DYNAMIC ROUTES */}
            {isPremiumSeoPage && (
              <SeoPageTemplate
                seoData={currentSeoData}
                onPostcodeClick={(prefix) => {
                  const area = postcodeAreasData.find(a => a.postcodePrefix === prefix);
                  if (area) {
                    const newPath = `/broadband/${area.slug}`;
                    pushStateSafe({ tab: `postcode-${prefix}` }, "", newPath);
                    setActiveTab(`postcode-${prefix}`);
                  }
                }}
                onTownClick={(townId) => {
                  const town = townsData.find(t => t.id === townId);
                  if (town) {
                    const newPath = `/town/${town.id}`;
                    pushStateSafe({ tab: `town-${town.id}` }, "", newPath);
                    setActiveTab(`town-${town.id}`);
                  }
                }}
                onPageClick={(pageId) => {
                  const page = seoPagesData[pageId];
                  if (page) {
                    const newPath = `/guide/${page.slug}`;
                    pushStateSafe({ tab: pageId }, "", newPath);
                    setActiveTab(pageId);
                  }
                }}
                onEnquire={handleEnquireTrigger}
                 onTriggerAddressCheck={() => {
                  pushStateSafe({ tab: "home" }, "", "/");
                  setActiveTab("home");
                  setTimeout(() => {
                    const queryInput = document.getElementById("hero-search-input");
                    if (queryInput) {
                      queryInput.focus();
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 120);
                }}
              />
            )}

            {/* 8. ADMIN DASHBOARD ROUTE */}
            {activeTab === "admin" && (
              <AdminDashboard />
            )}

            {/* 9. PRIVATE POLICY TAB */}
            {activeTab === "privacy" && (
              <div className="bg-white border rounded-2xl p-6 md:p-8 space-y-5 max-w-3xl mx-auto text-xs leading-relaxed text-slate-650" id="privacy-policy-view">
                <h1 className="text-xl md:text-2xl font-black text-slate-900">Privacy & Data Protection Policy</h1>
                <p className="text-[10px] font-mono tracking-wider text-slate-400">LAST REVISED: JUNE 2026 &bull; COMPLIANT WITH GDPR / DATA ACT</p>
                <p>
                  At Wiltshire Broadband Finder (a project style of <strong>Cane Communications Limited</strong>), we represent robust local privacy directives. When you submit postcode parameters or house names for an &ldquo;Address Availability Check&rdquo;, we process contact values purely to analyze telecom maps active in your parish boundary.
                </p>
                <h3 className="text-sm font-bold text-slate-905">1. What information do we collect?</h3>
                <p>
                  We catalog First names, Last names, Email addresses, Phone numbers, Postcodes, House numbers, current suppliers, switching reasons, and contact method preferences.
                </p>
                <h3 className="text-sm font-bold text-slate-905">2. Sharing with Providers</h3>
                <p>
                  By checking the non-preticked Address check consent slider, you authorize our operators to share submitted contact tokens with listed altnets or Openreach providers who serve your precise Wiltshire coordinate limits so they can confirm signal strengths and installation pricing.
                </p>
                <div className="p-3 bg-slate-50 border rounded-lg text-[11px] text-slate-500">
                  Adhering to UK legal mandates of data minimisation, we do not monetize or license database lists for secondary marketing campaigns.
                </div>
              </div>
            )}

            {/* 10. TERMS OF USE TAB */}
            {activeTab === "terms" && (
              <div className="bg-white border rounded-2xl p-6 md:p-8 space-y-5 max-w-3xl mx-auto text-xs leading-relaxed text-slate-650" id="terms-of-use-view">
                <h1 className="text-xl md:text-2xl font-black text-slate-900">Terms of Use</h1>
                <p className="text-[10px] font-mono tracking-wider text-slate-400">LAST REVISED: JUNE 2026</p>
                <p>
                  Wiltshire Broadband Finder is a comparison directory project. We compile publicly reported pricing arrays, manual submissions, and wholesale indicators to assist Wiltshire communities.
                </p>
                <h3 className="text-sm font-bold text-slate-950">No Direct Switching Services</h3>
                <p>
                  We are not an active broadband network provider, utility reseller, or consumer switching house. We provide preliminary listed options, but final contractual deals, speeds, price indices, and installation obligations remain confirmed solely between you and your chosen broadband provider.
                </p>
                <p>
                  We do not accept liability for any damages or speed discrepancies resulting from provider cabinet setups or line allocations under Wiltshire village lanes.
                </p>
              </div>
            )}

            {/* 11. COOKIES TAB */}
            {activeTab === "cookie" && (
              <div className="bg-white border rounded-2xl p-6 md:p-8 space-y-5 max-w-3xl mx-auto text-xs leading-relaxed text-slate-650" id="cookie-policy-view">
                <h1 className="text-xl md:text-2xl font-black text-slate-900">Cookie & Preference Policy</h1>
                <p className="text-[10px] font-mono tracking-wider text-slate-400">LAST REVISED: JUNE 2026</p>
                <p>
                  We deploy essential functional session indicators (cookies) to coordinate your active searching tabs, filtered speeds sliders, and dynamic postcode variables.
                </p>
                <h3 className="text-sm font-bold text-slate-900">First-Party Analytics</h3>
                <p>
                  We do not employ third-party tracking pixels or intrusive marketing trackers. All local search preferences remain safe inside your current browser session.
                </p>
              </div>
            )}

            {/* 12. CONTACT US TAB */}
            {activeTab === "contact" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-4">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-905 tracking-tight">Contact Us</h1>
                  <p className="text-xs text-slate-605 leading-relaxed col-span-1">
                    Have feedback about provider listings under Wiltshire corners? Are you experiencing slow ADSL speeds in a village parish? Write to our local digital infrastructure editors.
                  </p>
                  <div className="bg-white border rounded-xl p-4 space-y-2 text-xs text-slate-600">
                    <p><strong>Operator:</strong> Cane Communications Limited</p>
                    <p><strong>Reg No:</strong> 11485145</p>
                    <p><strong>Email:</strong> <a href={`mailto:${siteSettingsData.owner.contactEmail}`} className="text-slate-900 font-bold hover:underline transition-colors animate-pulse" id="contact-tab-email-link">Info</a></p>
                    <p><strong>Address:</strong> Wiltshire, United Kingdom</p>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-white border p-6 rounded-2xl space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase">Send a direct message</h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.currentTarget);
                        console.log("[Contact Enquiry] Message recorded:", Object.fromEntries(data));
                        alert("Thank you. Contact inquiry logged in console.");
                        setActiveTab("home");
                      }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <input type="text" name="name" required placeholder="Full Name" className="p-2 border rounded" />
                        <input type="email" name="email" required placeholder="Work Email" className="p-2 border rounded" />
                      </div>
                      <textarea name="message" required rows={4} placeholder="Your question or local village fibre status report..." className="w-full text-xs p-2.5 border rounded" />
                      <button type="submit" className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </main>

      {/* DYNAMIC COMPREHENSIVE FLOATING MODAL DIALOG */}
      {showStickyEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto" role="dialog" aria-modal="true">
          <div className="relative bg-white rounded-3xl max-w-xl w-full p-1 shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCustomModalClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 text-base font-extrabold focus:outline-hidden p-1 bg-slate-100 hover:bg-slate-200 rounded-full h-8 w-8 flex items-center justify-center cursor-pointer z-10"
              aria-label="Close dialog modal"
            >
              ✕
            </button>
            
            <LeadForm
              preSelectedProvider={selectedEnquiryProvider}
              onSubmitSuccess={() => {
                // Keep the success state visible in the form as crafted
                setTimeout(() => {
                  handleCustomModalClose();
                }, 4000);
              }}
            />
          </div>
        </div>
      )}

      {/* DETAILED DIALOG FOR READING UPDATE EXCERPT */}
      {readingUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn" role="dialog" aria-modal="true">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setReadingUpdate(null)}
              className="absolute top-4 right-4 text-slate-450 hover:text-slate-900 font-extrabold p-1 bg-slate-100 rounded-full h-8 w-8 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-green bg-brand-gold-light px-2 py-0.5 rounded border border-brand-gold/30">
              {readingUpdate.category}
            </span>

            <h2 className="text-lg md:text-xl font-bold tracking-tight text-brand-green font-sans">
              {readingUpdate.title}
            </h2>

            <div className="flex gap-4 text-[10px] font-mono text-slate-400">
              <span>Published: {readingUpdate.publishedDate}</span>
              <span>Author: {readingUpdate.author}</span>
            </div>

            <hr className="border-slate-100" />

            <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
              <p className="font-semibold text-slate-805">
                {readingUpdate.excerpt}
              </p>
              <div className="p-4 bg-stone-50 rounded-lg text-[11.5px] text-stone-600 border space-y-2 leading-relaxed">
                <p>
                    Wiltshire Parishes continue to receive custom fibre voucher grants backed by BDUK programs. This allows local altnets to roll out optical terminations directly to villages and farms experiencing ADSL speeds under 15Mbps.
                </p>
                <p>
                    By matching and tracking these developments daily, Wiltshire Broadband Finder makes checking, compares, and provider checks simple for local residents.
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center text-xs">
              <button
                onClick={() => {
                  setReadingUpdate(null);
                  setSelectedEnquiryProvider(undefined);
                  setShowStickyEnquiryModal(true);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Find Altnets at My Address
              </button>
              
              <button
                onClick={() => setReadingUpdate(null)}
                className="text-slate-500 font-bold hover:underline"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER SPONSOR STRIP BANNER */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-6">
        <AdvertBanner location="footer-sponsor-strip" className="w-full" />
      </div>

      {/* FOOTER COMPASS */}
      <Footer
        onNavClick={setActiveTab}
        activeTab={activeTab}
      />

      {/* COMPLIANCE COOKIE CONSENT LAYER */}
      <CookieBanner />

      {/* MOBILE STICKY ADVERT */}
      <div className="block md:hidden">
        <AdvertBanner location="mobile-sticky-banner" className="w-full" />
      </div>

    </div>
  );
}
