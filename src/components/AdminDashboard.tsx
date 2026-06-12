/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { providersData as initialProvidersData } from "../data/providers";
import { townsData } from "../data/towns";
import { advertsData as initialAdvertsData } from "../data/adverts";
import { seoPagesData as initialSeoPagesData } from "../data/seoPages";
import { postcodeAreasData as initialPostcodeAreasData } from "../data/postcodeAreas";
import { editorReviewsData as initialEditorReviewsData } from "../data/editorReviews";
import { offersData as initialOffersData } from "../data/offers";
import { featuredOfferData as initialFeaturedOfferData } from "../data/featuredOffer";
import { broadbandNewsData as initialBroadbandNewsData } from "../data/broadbandNews";
import { providerSources as initialProviderSources } from "../data/providerSources";
import liveOffersData from "../data/liveOffers.json";
import sourceUpdateLogsData from "../data/sourceUpdateLogs.json";
import {
  Database,
  ShieldAlert,
  CheckCircle,
  Sliders,
  Play,
  Trash2,
  Mail,
  Map,
  RefreshCw,
  Search,
  FileJson,
  LayoutGrid,
  Tag,
  Sparkles,
  Award,
  PenTool,
  Calendar,
  AlertTriangle,
  FileText,
  Check,
  CheckCircle2,
  SlidersHorizontal,
  Download,
  Upload,
  Globe,
  Plus,
  Bookmark,
  Radio,
  FileSpreadsheet,
  Rss,
  Activity,
  Maximize2
} from "lucide-react";
import { Provider, Offer, FeaturedOffer, BroadbandNewsItem } from "../types";

export function AdminDashboard() {
  // Leads list loaded from localStorage
  const [leads, setLeads] = useState<any[]>([]);
  const [syncStatus, setSyncStatus] = useState("Idle");
  const [apiRate, setApiRate] = useState(24); // hours

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });

  // Loaded reactive data states (allowing simulated real-time state edits across components)
  const [providers, setProviders] = useState<Provider[]>(initialProvidersData);
  const [offers, setOffers] = useState<Offer[]>(initialOffersData);
  const [featuredOffer, setFeaturedOffer] = useState<FeaturedOffer>(initialFeaturedOfferData);
  const [broadbandNews, setBroadbandNews] = useState<BroadbandNewsItem[]>(initialBroadbandNewsData);
  const [adverts, setAdverts] = useState<any[]>(initialAdvertsData);
  const [seoPages, setSeoPages] = useState<Record<string, any>>(initialSeoPagesData);
  const [postcodeAreas, setPostcodeAreas] = useState<any[]>(initialPostcodeAreasData);
  const [editorReviews, setEditorReviews] = useState<any[]>(initialEditorReviewsData);

  // Active section inside the panel
  const [activeTab, setActiveTab] = useState<string>("manage-weekly-featured-offer");

  // Selection states for sub-editors
  const [selectedSeoKey, setSelectedSeoKey] = useState<string>("home");
  const [selectedPostcodePrefix, setSelectedPostcodePrefix] = useState<string>("SN10");
  const [selectedReviewId, setSelectedReviewId] = useState<string>("review-zzoomm-wiltshire");
  const [selectedProviderId, setSelectedProviderId] = useState<string>("zzoomm");
  const [selectedOfferId, setSelectedOfferId] = useState<string>("offer-zzoomm-500");
  const [selectedAdvertId, setSelectedAdvertId] = useState<string>("lead-banner-zzoomm");

  // News ticker addition form state
  const [newNewsHeadline, setNewNewsHeadline] = useState("");
  const [newNewsSource, setNewNewsSource] = useState("Wiltshire Broadband Finder Staff");
  const [newNewsUrl, setNewNewsUrl] = useState("https://www.wiltshirebroadbandfinder.co.uk/");
  const [newNewsCategory, setNewNewsCategory] = useState("Editor Updates");
  const [newNewsRegion, setNewNewsRegion] = useState("Wiltshire");
  const [newNewsIsWiltshire, setNewNewsIsWiltshire] = useState(true);
  const [newNewsSummary, setNewNewsSummary] = useState("");
  const [newNewsPriority, setNewNewsPriority] = useState(1);

  // Crawler states
  const [provSources, setProvSources] = useState<any[]>(initialProviderSources);
  const [liveOffersState, setLiveOffersState] = useState<any[]>(Array.isArray(liveOffersData) ? liveOffersData : []);
  const [updateLogsState, setUpdateLogsState] = useState<any[]>(sourceUpdateLogsData);

  // Future automated RSS Feed configurator state
  const [rssFeedUrl, setRssFeedUrl] = useState("https://www.ispreview.co.uk/index.php/feed");
  const [rssAutopublish, setRssAutopublish] = useState(false);
  const [rssTerminalLogs, setRssTerminalLogs] = useState<string[]>([]);

  // News sources configuration
  const [newsSources, setNewsSources] = useState([
    { name: "Wiltshire Council broadband updates", type: "Official", url: "https://www.wiltshire.gov.uk/broadband", active: true },
    { name: "ISPreview", type: "Broadband Press", url: "https://www.ispreview.co.uk/", active: true },
    { name: "ThinkBroadband", type: "Coverage Maps", url: "https://www.thinkbroadband.com/", active: true },
    { name: "Ofcom", type: "Regulator", url: "https://www.ofcom.org.uk/", active: true },
    { name: "Gov UK broadband updates", type: "National Portal", url: "https://www.gov.uk/", active: true }
  ]);

  // Offer Availability edit states
  const [availabilityOfferId, setAvailabilityOfferId] = useState("offer-zzoomm-500");
  const [availabilityPostcode, setAvailabilityPostcode] = useState("SN10");
  const [availabilityStatus, setAvailabilityStatus] = useState<any>("Likely available");
  const [availabilityConfidence, setAvailabilityConfidence] = useState<any>("High");

  // Recalculator Console Logs
  const [recalculateLogs, setRecalculateLogs] = useState<string[]>([]);
  const [isRecalculating, setIsRecalculating] = useState(false);

  // Form states matching edits
  const [seoForm, setSeoForm] = useState<any>({
    pageTitle: "",
    metaTitle: "",
    metaDescription: "",
    primaryKeyword: "",
    introCopy: "",
    canonicalUrl: ""
  });

  const [schemaText, setSchemaText] = useState<string>("");
  const [schemaValidationMsg, setSchemaValidationMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const [postcodeForm, setPostcodeForm] = useState<any>({
    h1: "",
    introCopy: "",
    metaDescription: "",
    localBroadbandNotes: ""
  });

  const [weeklyOfferForm, setWeeklyOfferForm] = useState<{
    offerId: string;
    monthlyPrice: number;
    headline: string;
    shortDescription: string;
    editorNotes: string;
    isLive: boolean;
  }>({
    offerId: "offer-zzoomm-500",
    monthlyPrice: 27.95,
    headline: "Tracked Wiltshire Symmetrical 500Mbps Special",
    shortDescription: "Symmetrical speeds with a contract price freeze and zero setup fees for listed SN11 and SN12 postcodes.",
    editorNotes: "Zzoomm runs independent fiber networks in Calne and Melksham. This is a tracked package with no activation fees.",
    isLive: true
  });

  const [csvPasteData, setCsvPasteData] = useState<string>(
    "offerId,monthlyPrice,contractLength,setupFee,isLive\n" +
    "offer-zzoomm-500,26.50,12,0.00,true\n" +
    "offer-gigaclear-300,28.00,18,0.00,true\n" +
    "offer-wessex-300,34.50,24,39.00,true"
  );
  const [csvImportLog, setCsvImportLog] = useState<string[]>([]);

  // Trigger notification toast
  const triggerToast = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
  };

  useEffect(() => {
    // Read local Switch Enquiry leads
    const storedLeads = JSON.parse(localStorage.getItem("wiltshire_leads") || "[]");
    setLeads(storedLeads);
  }, []);

  // Sync edit forms when selections change
  useEffect(() => {
    if (seoPages[selectedSeoKey]) {
      const page = seoPages[selectedSeoKey];
      setSeoForm({
        pageTitle: page.pageTitle || "",
        metaTitle: page.metaTitle || "",
        metaDescription: page.metaDescription || "",
        primaryKeyword: page.primaryKeyword || "",
        introCopy: page.introCopy || "",
        canonicalUrl: page.canonicalUrl || ""
      });
      setSchemaText(page.schemaJson || "");
      setSchemaValidationMsg(null);
    }
  }, [selectedSeoKey, seoPages]);

  useEffect(() => {
    const pc = postcodeAreas.find(p => p.postcodePrefix === selectedPostcodePrefix);
    if (pc) {
      setPostcodeForm({
        h1: pc.h1 || "",
        introCopy: pc.introCopy || "",
        metaDescription: pc.metaDescription || "",
        localBroadbandNotes: pc.localBroadbandNotes || ""
      });
    }
  }, [selectedPostcodePrefix, postcodeAreas]);

  // Load weekly offer fields
  useEffect(() => {
    if (featuredOffer) {
      setWeeklyOfferForm({
        offerId: featuredOffer.offerId || "offer-zzoomm-500",
        monthlyPrice: featuredOffer.monthlyPrice || 27.95,
        headline: featuredOffer.headline || "",
        shortDescription: featuredOffer.shortDescription || "",
        editorNotes: featuredOffer.editorNotes || "",
        isLive: featuredOffer.isLive !== false
      });
    }
  }, [featuredOffer]);

  // Lead handling
  const handleDeleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    localStorage.setItem("wiltshire_leads", JSON.stringify(updated));
    triggerToast("Lead purged successfully from local session storage.");
  };

  const triggerSyncSimulated = () => {
    setSyncStatus("Querying regional Altnet networks...");
    setTimeout(() => {
      setProviders(prev => prev.map(p => ({ ...p, lastCheckedDate: "2026-06-08" })));
      setSyncStatus(`Fully synchronized. Batch updated ${providers.length} registered Wiltshire ISPs.`);
      triggerToast("Synchronization successful! All checked dates updated to 2026-06-08.");
    }, 1200);
  };

  // 8 INDEPENDENT ANALYTICAL KPI METRICS (AS SPECIFIED)
  const countWeeklyOfferLive = featuredOffer.isLive ? 1 : 0;
  const countTickerItemsLive = broadbandNews.filter(n => n.isActive).length;
  const countOffersNeedingReview = offers.filter(o => o.availabilityConfidence !== "High" || !o.isLive).length;
  const countExpiredOffers = offers.filter(o => !o.isLive).length;
  const countPostcodesCovered = postcodeAreas.length;
  const countProvidersActive = providers.length;
  const countSponsoredPlacementsActive = offers.filter(o => o.isSponsored).length;
  const countSeoPagesMissingMeta = Object.keys(seoPages).filter(
    key => !seoPages[key].metaDescription || seoPages[key].metaDescription.trim() === ""
  ).length;

  // SAVE HANDLERS FOR NEW TABS
  const handleSaveWeeklyOfferForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFeaturedOffer(prev => ({
      ...prev,
      offerId: weeklyOfferForm.offerId,
      monthlyPrice: weeklyOfferForm.monthlyPrice,
      headline: weeklyOfferForm.headline,
      shortDescription: weeklyOfferForm.shortDescription,
      editorNotes: weeklyOfferForm.editorNotes,
      isLive: weeklyOfferForm.isLive
    }));
    triggerToast("Manual weekly featured offer lock parameters updated reactively!");
  };

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    setSeoPages(prev => ({
      ...prev,
      [selectedSeoKey]: {
        ...prev[selectedSeoKey],
        ...seoForm
      }
    }));
    triggerToast(`Successfully saved SEO tags for /${selectedSeoKey}. Firestore schema updated.`);
  };

  const handleValidateSchema = () => {
    try {
      if (!schemaText.trim()) {
        setSchemaValidationMsg({ text: "Schema raw text is currently empty.", isError: true });
        return;
      }
      JSON.parse(schemaText);
      setSchemaValidationMsg({ text: "Schema format verified. Absolute syntactic match (Valid Schema JSON-LD).", isError: false });
    } catch (err: any) {
      setSchemaValidationMsg({ text: `Invalid JSON syntax pattern: ${err?.message || "Format error"}`, isError: true });
    }
  };

  const handleSaveSchema = () => {
    try {
      JSON.parse(schemaText);
      setSeoPages(prev => ({
        ...prev,
        [selectedSeoKey]: {
          ...prev[selectedSeoKey],
          schemaJson: schemaText
        }
      }));
      triggerToast(`Saved verified Schema representation for Page: ${selectedSeoKey}.`);
    } catch (err) {
      triggerToast("Error: Cannot save invalid JSON schema metadata. Check validation notes.");
    }
  };

  const handleSavePostcodePage = (e: React.FormEvent) => {
    e.preventDefault();
    setPostcodeAreas(prev => prev.map(p => {
      if (p.postcodePrefix === selectedPostcodePrefix) {
        return { ...p, ...postcodeForm };
      }
      return p;
    }));
    triggerToast(`Postcode area ${selectedPostcodePrefix} page properties modernized successfully.`);
  };

  const handleUpdateEditorScore = (pId: string, value: number) => {
    setProviders(prev => prev.map(prov => {
      if (prov.id === pId) {
        return { ...prov, editorScore: value };
      }
      return prov;
    }));
    triggerToast(`Adjusted provider rating score of ${pId} to ${value}/10.`);
  };

  const handleSaveAvailabilityOverride = (e: React.FormEvent) => {
    e.preventDefault();
    setOffers(prevOffers => prevOffers.map(o => {
      if (o.offerId === availabilityOfferId) {
        const alreadyHasPc = o.targetPostcodes.includes(availabilityPostcode);
        let updatedPcs = [...o.targetPostcodes];
        if (availabilityStatus !== "Not currently listed" && !alreadyHasPc) {
          updatedPcs.push(availabilityPostcode);
        } else if (availabilityStatus === "Not currently listed" && alreadyHasPc) {
          updatedPcs = updatedPcs.filter(prefix => prefix !== availabilityPostcode);
        }
        return {
          ...o,
          targetPostcodes: updatedPcs,
          availabilityConfidence: availabilityConfidence
        };
      }
      return o;
    }));
    triggerToast(`Availability rules committed for ${availabilityOfferId} in ${availabilityPostcode}`);
  };

  const handleAddNewsTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsHeadline.trim()) {
      triggerToast("News ticker headline cannot be left blank.");
      return;
    }
    const newItem: BroadbandNewsItem = {
      id: `news-${Date.now()}`,
      headline: newNewsHeadline,
      sourceName: newNewsSource,
      sourceUrl: newNewsUrl,
      publishedDate: new Date().toISOString().split("T")[0],
      category: newNewsCategory,
      region: newNewsRegion,
      isWiltshireRelevant: newNewsIsWiltshire,
      summary: newNewsSummary,
      displayPriority: Number(newNewsPriority),
      isActive: true
    };
    setBroadbandNews([newItem, ...broadbandNews]);
    setNewNewsHeadline("");
    setNewNewsSummary("");
    triggerToast("Headline added to Wiltshire slowly scrolling news ticker!");
  };

  const toggleNewsActive = (id?: string) => {
    if (!id) return;
    setBroadbandNews(prev => prev.map(item => item.id === id ? { ...item, isActive: !item.isActive } : item));
    triggerToast("News ticker item visibility switched.");
  };

  const deleteNewsItem = (id?: string) => {
    if (!id) return;
    setBroadbandNews(prev => prev.filter(item => item.id !== id));
    triggerToast("News ticker headline purged from active indexes.");
  };

  const triggerExportCSVLeads = () => {
    if (leads.length === 0) {
      triggerToast("No Switch Enquiries are currently available to export.");
      return;
    }
    const headers = "LeadID,First_Name,Last_Name,Email,Telephone,Postcode,Town_Village,Provider_Chosen,Current_Provider,Notes,Timestamp\n";
    const bodyStr = leads.map(l =>
      `"${l.id}","${l.firstName || ""}","${l.lastName || ""}","${l.email || ""}","${l.phone || ""}","${l.postcode || ""}","${l.townOrVillage || ""}","${l.providerOfInterest || ""}","${l.currentProvider || ""}","${(l.reasonForSwitching || "").replace(/"/g, '""')}","${l.id.split("-")[1] || "2026-06-08"}"`
    ).join("\n");

    const blob = new Blob([headers + bodyStr], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `wiltshire_broadband_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Lead register compiled into CSV format and downloaded successfully.");
  };

  const handleImportCsv = () => {
    if (!csvPasteData.trim()) {
      setCsvImportLog(["Error: Spreadsheet input area represents empty parameters."]);
      return;
    }
    const lines = csvPasteData.split("\n");
    const logs: string[] = [];
    let updatedCount = 0;

    lines.forEach((line, idx) => {
      if (idx === 0) return; // skip header
      const parts = line.split(",").map(p => p.trim());
      if (parts.length < 2 || !parts[0]) return;

      const [oId, price, length, setup, isLiveStr] = parts;
      
      setOffers(prevOffers => prevOffers.map(o => {
        if (o.offerId.toLowerCase() === oId.toLowerCase()) {
          updatedCount++;
          logs.push(`Offer: ${o.packageName} Match! Set price: £${parseFloat(price).toFixed(2)}, setup fee: £${parseFloat(setup).toFixed(2)}.`);
          return {
            ...o,
            monthlyPrice: parseFloat(price) || o.monthlyPrice,
            contractLength: parseInt(length) || o.contractLength,
            setupFee: parseFloat(setup) ?? o.setupFee,
            isLive: isLiveStr === "true" || isLiveStr === "1"
          };
        }
        return o;
      }));
    });

    if (updatedCount === 0) {
      logs.push("Warning: No matching offer IDs found. Verify offerId columns.");
    } else {
      logs.push(`Success: Parsed rows, matched and updated ${updatedCount} Wiltshire active offer structures.`);
    }
    setCsvImportLog(logs);
    triggerToast(`Import complete. Synced data with ${updatedCount} regional offer profiles.`);
  };

  const triggerRssPolling = () => {
    setRssTerminalLogs(["[Polling Triggered] Reading feed configurations...", `[Network] Connecting to ISP feed: ${rssFeedUrl}...`]);
    setTimeout(() => {
      setRssTerminalLogs(prev => [...prev, "[Parsing XML] Found channel metadata element.", "[Filtering Wiltshire Relevance] Filtering keywords: Wiltshire, Salisbury, Devizes, Westbury..."]);
    }, 400);

    setTimeout(() => {
      // Simulate adding a pulled Wiltshire council node
      const autoItem: BroadbandNewsItem = {
        id: `news-rss-${Date.now()}`,
        headline: "Wiltshire Council deploys local infrastructure grants for Outlying Salisbury parishes",
        sourceName: "Wiltshire Council broadband updates",
        sourceUrl: rssFeedUrl,
        publishedDate: new Date().toISOString().split("T")[0],
        category: "Gov UK Ingest",
        region: "Wiltshire",
        isWiltshireRelevant: true,
        summary: "Automated ingestion parser detected public sector grants deployed to support fibre installations.",
        displayPriority: 2,
        isActive: true
      };
      setBroadbandNews(prev => {
        const exists = prev.some(n => n.headline === autoItem.headline);
        if (exists) return prev;
        return [autoItem, ...prev];
      });
      setRssTerminalLogs(prev => [...prev, "[Ingested] Headline added: Wiltshire Council infrastructure grants successfully added to news list.", "[Success] Automated pricing / news sweep accomplished."]);
      triggerToast("RSS feed parsed! Added Wiltshire relevant headline straight to news ticker.");
    }, 1000);
  };

  const triggerRecalculateCommand = () => {
    setIsRecalculating(true);
    setRecalculateLogs(["[Core Scoring Processor] Initiating re-ranking sweeps...", "[Normalization] Normalising Monthly Tariff indices..."]);
    
    setTimeout(() => {
      setRecalculateLogs(prev => [...prev, "[Weighting System] Applying weights: Price(35%), Speed(30%), Fees(15%), Term(10%), Score(10%)", "[Validation] Scanning available Alnets for target postcodes: SN10, BA14, SP1, GL8..."]);
    }, 600);

    setTimeout(() => {
      setOffers(prevOffers => prevOffers.map(o => {
        // Calculate dynamic mock score out of 100
        const speedFactor = Math.min(o.averageDownloadSpeed / 10, 50);
        const priceFactor = Math.max(80 - o.monthlyPrice, 10);
        const feeFactor = o.setupFee === 0 ? 10 : 0;
        const newScore = Math.min(Math.round(speedFactor + priceFactor + feeFactor), 100);
        return {
          ...o,
          editorScore: Number((newScore / 10).toFixed(1)),
          rankingScore: newScore
        };
      }));
      setRecalculateLogs(prev => [...prev, "[Matrix Updated] Calculated 12 local ranking pools dynamically.", "[Success] All parished broadband listing arrays optimized and saved to browser state."]);
      setIsRecalculating(false);
      triggerToast("Postcode rankings optimized! All deal utility values re-scored.");
    }, 1400);
  };

  return (
    <div className="space-y-6" id="editorial-regulatory-admin-panel">

      {/* FLOATING TOAST NOTIFICATION */}
      {toast.visible && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 border border-emerald-500 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-slideIn max-w-sm">
          <CheckCircle2 className="h-6 w-6 text-emerald-100 shrink-0" />
          <span className="text-xs font-bold font-sans">{toast.message}</span>
        </div>
      )}

      {/* ADMIN CONTROL PANEL HEADER */}
      <div className="bg-[#121921] border border-slate-850 rounded-3xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-brand-gold text-slate-950 rounded text-[9px] uppercase font-black tracking-widest leading-none font-sans">
              EDITORIAL WORKSPACE
            </span>
            <span className="text-[10px] text-emerald-400 font-bold tracking-widest font-mono uppercase">
              REQUISITION MODULE v1.5
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight font-sans text-brand-gold">
            Wiltshire Broadband Finder &ndash; Editorial Panel
          </h1>
          <p className="text-xs text-stone-300 leading-relaxed max-w-4xl">
            This module provides manual weekly offer locks, postcode matching rule editors, a broadband news ticker pipeline, and pricing ingest controllers.
            All operations take effect immediately on current local simulation state.
          </p>
        </div>

        <button
          onClick={triggerSyncSimulated}
          className="px-5 py-2.5 bg-brand-green hover:bg-[#132c18] rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-2 text-white border border-emerald-600/30 cursor-pointer shadow-md"
        >
          <RefreshCw className="h-4 w-4 text-brand-gold" />
          <span>Polled Network Refresh</span>
        </button>
      </div>

      {/* THE 8 STATS EXECUTIVE ANALYTICAL CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        
        {/* Card 1: Weekly offer live */}
        <div className="bg-white border border-slate-200/80 p-3.5 rounded-2xl flex flex-col justify-between shadow-3xs hover:border-emerald-300 transition-colors">
          <span className="text-[9px] font-black text-slate-405 uppercase tracking-wider block leading-tight">Weekly Offer Live?</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">{countWeeklyOfferLive ? "Active" : "Closed"}</span>
            <span className={`text-[8.5px] px-1.5 py-0.5 rounded font-extrabold ${countWeeklyOfferLive ? "text-emerald-700 bg-emerald-50" : "text-amber-70s bg-amber-50"}`}>
              {countWeeklyOfferLive ? "Live Spotlight" : "Draft"}
            </span>
          </div>
        </div>

        {/* Card 2: Ticker items live */}
        <div className="bg-white border border-slate-200/80 p-3.5 rounded-2xl flex flex-col justify-between shadow-3xs hover:border-purple-300 transition-colors">
          <span className="text-[9px] font-black text-slate-405 uppercase tracking-wider block leading-tight">Ticker News</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-purple-700 tracking-tight">{countTickerItemsLive}/mo</span>
            <span className="text-[8.5px] text-purple-800 bg-purple-50 px-1.5 py-0.5 rounded font-extrabold">Ticker Speed</span>
          </div>
        </div>

        {/* Card 3: Offers needing review */}
        <div className="bg-white border border-slate-200/80 p-3.5 rounded-2xl flex flex-col justify-between shadow-3xs hover:border-amber-300 transition-colors">
          <span className="text-[9px] font-black text-slate-405 uppercase tracking-wider block leading-tight">Pending Review</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-amber-600 tracking-tight">{countOffersNeedingReview}</span>
            <span className="text-[8.5px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-extrabold">Urgent</span>
          </div>
        </div>

        {/* Card 4: Expired offers */}
        <div className="bg-white border border-slate-200/80 p-3.5 rounded-2xl flex flex-col justify-between shadow-3xs hover:border-rose-300 transition-colors">
          <span className="text-[9px] font-black text-slate-405 uppercase tracking-wider block leading-tight">Expired Offers</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-rose-600 tracking-tight">{countExpiredOffers}</span>
            <span className="text-[8.5px] text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-extrabold">Audits</span>
          </div>
        </div>

        {/* Card 5: Postcodes covered */}
        <div className="bg-white border border-slate-200/80 p-3.5 rounded-2xl flex flex-col justify-between shadow-3xs hover:border-sky-300 transition-colors">
          <span className="text-[9px] font-black text-slate-405 uppercase tracking-wider block leading-tight">Mapped Grids</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-[#115C6C] tracking-tight">{countPostcodesCovered}</span>
            <span className="text-[8.5px] text-[#115C6C] bg-cyan-50 px-1.5 py-0.5 rounded font-bold">Parishes</span>
          </div>
        </div>

        {/* Card 6: Providers active */}
        <div className="bg-white border border-slate-200/80 p-3.5 rounded-2xl flex flex-col justify-between shadow-3xs hover:border-indigo-300 transition-colors">
          <span className="text-[9px] font-black text-slate-405 uppercase tracking-wider block leading-tight">Active ISPs</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-indigo-750 tracking-tight">{countProvidersActive}</span>
            <span className="text-[8.5px] text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded font-extrabold">Monitored</span>
          </div>
        </div>

        {/* Card 7: Sponsored placements */}
        <div className="bg-white border border-slate-200/80 p-3.5 rounded-2xl flex flex-col justify-between shadow-3xs hover:border-rose-300 transition-colors">
          <span className="text-[9px] font-black text-slate-405 uppercase tracking-wider block leading-tight">Sponsorships</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-rose-600 tracking-tight">{countSponsoredPlacementsActive}</span>
            <span className="text-[8.5px] text-rose-750 bg-rose-50 px-1.5 py-0.5 rounded font-bold">Pinned</span>
          </div>
        </div>

        {/* Card 8: SEO Meta Gaps */}
        <div className="bg-white border border-slate-200/80 p-3.5 rounded-2xl flex flex-col justify-between shadow-3xs hover:border-[#C5A059]/40 transition-colors">
          <span className="text-[9px] font-black text-slate-405 uppercase tracking-wider block leading-tight">SEO Meta Gaps</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">{countSeoPagesMissingMeta}</span>
            <span className="text-[8.5px] text-amber-800 bg-[#FAF8F5] border border-amber-200 px-1.5 py-0.5 rounded font-extrabold">Needs Meta</span>
          </div>
        </div>

      </div>

      {/* DOUBLE PANEL WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR TABS SELECTIONS MENU */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[#FAF8F5] border border-stone-200 p-4 rounded-2xl shadow-3xs">
            <span className="text-[10px] font-black uppercase text-stone-500 block tracking-widest mb-3 select-none">
              Twelve Core Operations
            </span>
            
            <nav className="space-y-1.5" aria-label="Twelve Mandatory Admin Tabs">
              {[
                { id: "manage-weekly-featured-offer", label: "Manage Weekly Offer", icon: Sparkles, color: "text-amber-500", desc: "Featured spot lock" },
                { id: "manage-automated-crawler", label: "Automated Offer Crawler", icon: Activity, color: "text-[#C5A059]", desc: "Check tracked sources & logs" },
                { id: "manage-postcode-offers", label: "Manage Postcode Offers", icon: Map, color: "text-indigo-500", desc: "Align region results" },
                { id: "manage-provider-listings", label: "Manage Provider Listings", icon: LayoutGrid, color: "text-teal-500", desc: "Profile core parameters" },
                { id: "manage-offer-availability", label: "Manage Offer Availability", icon: CheckCircle, color: "text-emerald-500", desc: "Confidence markers" },
                { id: "manage-editor-scores", label: "Manage Editor Scores", icon: Award, color: "text-orange-500", desc: "Adjust deal score weights" },
                { id: "manage-broadband-news-ticker", label: "Manage News Ticker", icon: Sliders, color: "text-purple-500", desc: "Add headlines" },
                { id: "manage-news-sources", label: "Manage News Sources", icon: Globe, color: "text-blue-500", desc: "Deduplicate news list" },
                { id: "manage-rss-feed-placeholders", label: "Manage RSS Placeholders", icon: Rss, color: "text-cyan-500", desc: "Pull automated XML" },
                { id: "manage-adverts", label: "Manage Adverts", icon: Play, color: "text-rose-500", desc: "Inspect display banners" },
                { id: "review-expired-offers", label: "Review Expired Offers", icon: AlertTriangle, color: "text-red-500", desc: "Re-validate campaigns" },
                { id: "import-csv-offers", label: "Import CSV Offers", icon: Upload, color: "text-yellow-600", desc: "Bulk price sync" },
                { id: "recalculate-postcode-rankings", label: "Recalculate Rankings", icon: RefreshCw, color: "text-slate-600", desc: "Recalculate dynamic lists" }
              ].map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2.5 transition-all cursor-pointer ${
                      isActive
                        ? "bg-brand-green text-white shadow-xs"
                        : "text-slate-700 hover:bg-stone-100"
                    }`}
                  >
                    <IconComp className={`h-4.5 w-4.5 ${isActive ? "text-brand-gold" : item.color}`} />
                    <div className="flex flex-col">
                      <span className="leading-tight">{item.label}</span>
                      <span className={`text-[9px] font-medium leading-none mt-0.5 ${isActive ? "text-emerald-150" : "text-stone-400"}`}>{item.desc}</span>
                    </div>
                  </button>
                );
              })}
            </nav>

            <span className="text-[10px] font-black uppercase text-stone-500 block tracking-widest mt-6 mb-3 select-none">
              Additional SEO Tools
            </span>
            <nav className="space-y-1.5" aria-label="Secondary SEO Controls">
              {[
                { id: "seo-pages", label: "Manage SEO Pages", icon: Globe, color: "text-blue-500" },
                { id: "json-ld", label: "JSON-LD Schema Markup", icon: FileJson, color: "text-amber-500" },
                { id: "export-leads", label: "Export Leads CSV", icon: Download, color: "text-emerald-500" }
              ].map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-black flex items-center gap-2.5 transition-all cursor-pointer ${
                      isActive
                        ? "bg-brand-green text-white shadow-xs"
                        : "text-slate-755 hover:bg-stone-100"
                    }`}
                  >
                    <IconComp className={`h-4 w-4 ${isActive ? "text-brand-gold" : item.color}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="bg-[#111625] border border-slate-800 p-4 rounded-2xl text-slate-350 text-[10px] leading-relaxed relative overflow-hidden">
            <h4 className="font-extrabold text-white text-xs mb-1">State log</h4>
            <p className="font-mono text-brand-gold">Synchronization Status: {syncStatus}</p>
            <p className="font-mono text-slate-400 mt-1">Live Reactive Model Coverage: SNR</p>
          </div>
        </div>

        {/* WORKSPACE OPERATIONS DETAILED CARD */}
        <div className="lg:col-span-3 bg-white border border-stone-200 rounded-3xl p-6 shadow-3xs">
          
          <div className="border-b border-stone-150 pb-4 mb-5 flex justify-between items-center bg-[#FAF8F5]/60 -mx-6 -mt-6 p-4 rounded-t-3xl border-b border-stone-200">
            <div>
              <span className="text-[10px] uppercase font-black text-brand-gold block tracking-wider leading-none">
                Active Console Workspace
              </span>
              <h2 className="text-base font-extrabold text-brand-green leading-snug">
                {activeTab.replace(/-/g, " ").toUpperCase()}
              </h2>
            </div>
            <span className="text-[10px] bg-brand-gold text-slate-950 font-sans font-black px-2 py-0.5 rounded border border-brand-green/10">
              Interactive Reactive Panel
            </span>
          </div>

          {/* TAB: AUTOMATED OFFER CRAWLER */}
          {activeTab === "manage-automated-crawler" && (
            <div className="space-y-6 animate-fadeIn font-sans">
              <div className="bg-[#FAF8F5] border border-stone-200 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-brand-green">Auto-Crawler Scheduled Tracking Console</h3>
                  <p className="text-[11px] text-stone-550 leading-normal max-w-xl">
                    Every 24 hours, Wiltshire Broadband Finder's backend GitHub Action executes our custom Node Cheerio crawler to scan verified regional provider packages, normalise rate cards, validate regulatory price-hike disclosures, and commit updates.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSyncStatus("Crawling active pages...");
                    triggerToast("Mocking Automated Crawler Run... Fetching 18 provider targets with 5s rate limits.");
                    setTimeout(() => {
                      setSyncStatus("Idle");
                      triggerToast("Simulation complete. 18 sources checked. 0 changes flagged for manual review.");
                    }, 2000);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black bg-[#1C3B2B] hover:bg-emerald-950 text-white rounded-lg transition-all shadow-3xs cursor-pointer shrink-0"
                >
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Execute Crawl Scan Now</span>
                </button>
              </div>

              {/* STATS ROW */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl">
                  <span className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider block">Checked Sources</span>
                  <span className="text-xl font-black text-brand-green">{provSources.length} Providers</span>
                  <p className="text-[9.5px] text-stone-500 mt-0.5">{provSources.filter(s => s.enabled).length} scraper threads active</p>
                </div>
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl">
                  <span className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider block">Live Packages</span>
                  <span className="text-xl font-black text-emerald-600">{liveOffersState.filter(o => o.isLive).length} Active</span>
                  <p className="text-[9.5px] text-stone-500 mt-0.5">Fed directly to search matches</p>
                </div>
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl">
                  <span className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider block">Flagged For Review</span>
                  <span className="text-xl font-black text-amber-600">
                    {liveOffersState.filter(o => o.reviewStatus === "review_required").length} Blocked
                  </span>
                  <p className="text-[9.5px] text-amber-700 mt-0.5 font-bold">Halt safety lock triggered</p>
                </div>
                <div className="bg-[#111625] border border-slate-800 p-3 rounded-xl text-white">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block text-brand-gold">Scheduler Status</span>
                  <span className="text-sm font-mono block font-black mt-1">● active-daily</span>
                  <p className="text-[9px] text-slate-400 mt-1">Next check: Tomorrow 04:30 GMT</p>
                </div>
              </div>

              {/* INTERNAL VIEW SWITCHER */}
              <div className="border-b border-stone-200 flex gap-2 overflow-x-auto pb-1">
                {["tracked-offers", "crawler-logs", "review-queue", "provider-settings"].map((subTab) => (
                  <button
                    key={subTab}
                    onClick={() => setSelectedReviewId(subTab)} // reuse selectedReviewId space
                    className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap rounded-t-lg transition-all border-b-2 -mb-1 cursor-pointer ${
                      selectedReviewId === subTab || (subTab === "tracked-offers" && !["tracked-offers", "crawler-logs", "review-queue", "provider-settings"].includes(selectedReviewId))
                        ? "border-[#C5A059] text-[#1B3022] font-black"
                        : "border-transparent text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    {subTab.replace(/-/g, " ").toUpperCase()}
                  </button>
                ))}
              </div>

              {/* SUB TAB CONTENT: TRACKED OFFERS LIST */}
              {(selectedReviewId === "tracked-offers" || !["tracked-offers", "crawler-logs", "review-queue", "provider-settings"].includes(selectedReviewId)) && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-extrabold text-[#1B3022] uppercase tracking-wider">Scraped & Tracked Broadband Offers</h4>
                    <span className="text-[10px] text-slate-500 font-medium">Checked against official provider standard leaflets</span>
                  </div>

                  <div className="overflow-x-auto border border-stone-200 rounded-xl">
                    <table className="w-full text-left text-xs text-stone-600 font-sans border-collapse">
                      <thead>
                        <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 font-black">
                          <th className="p-3">Provider</th>
                          <th className="p-3">Package Name</th>
                          <th className="p-3">Monthly Price</th>
                          <th className="p-3">Speed (Down/Up)</th>
                          <th className="p-3">Contract</th>
                          <th className="p-3">Last Checked</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {liveOffersState.map((of, i) => (
                          <tr key={i} className="border-b border-stone-150 hover:bg-stone-50 transition-all text-[11px]">
                            <td className="p-3 font-extrabold text-[#1B3022]">{of.providerName}</td>
                            <td className="p-3 font-semibold text-stone-900">{of.packageName}</td>
                            <td className="p-3 font-black text-[#1B3022]">{of.monthlyPrice}</td>
                            <td className="p-3 font-mono text-stone-500">{of.averageDownloadSpeed} / {of.averageUploadSpeed} Mbps</td>
                            <td className="p-3">{of.contractLength}</td>
                            <td className="p-3 font-mono text-stone-400">{of.lastChecked}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                of.isLive 
                                  ? "bg-emerald-100 text-emerald-800" 
                                  : "bg-amber-100 text-amber-800"
                              }`}>
                                {of.isLive ? "Live" : "Review Required"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB TAB CONTENT: CRAWLER LOGS */}
              {selectedReviewId === "crawler-logs" && (
                <div className="space-y-4 font-sans">
                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold text-[#1B3022] uppercase tracking-wider">Run History & Crawler Logs</h4>
                    <p className="text-[10px] text-stone-500">Tracks active cron triggers and response latencies</p>
                  </div>

                  <div className="space-y-3">
                    {updateLogsState.map((log, i) => (
                      <div key={i} className="border border-stone-200 rounded-xl p-4 bg-stone-50 space-y-3">
                        <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase bg-[#1B3022] text-white px-2 py-0.5 rounded">Run OK</span>
                            <span className="text-xs text-stone-600 font-mono">{log.timestamp}</span>
                          </div>
                          <span className="text-[11px] font-bold text-indigo-600">Run ID: {log.runId}</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                          <div><span className="text-stone-400 block uppercase font-bold text-[9px]">Scraped</span> {log.scrapedCount} Sources</div>
                          <div><span className="text-stone-400 block uppercase font-bold text-[9px]">Updated</span> {log.updatedCount} Packages</div>
                          <div><span className="text-stone-400 block uppercase font-bold text-[9px]">Review Triggered</span> {log.reviewRequiredCount} Items</div>
                          <div><span className="text-stone-400 block uppercase font-bold text-[9px]">Status</span> <span className="text-emerald-600 font-black">Success</span></div>
                        </div>

                        <div className="space-y-1 mt-2.5">
                          <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider">Logs Output:</span>
                          <div className="bg-stone-900 text-slate-300 text-[10px] font-mono p-2.5 rounded-lg max-h-48 overflow-y-auto space-y-1">
                            {log.logs.map((item: any, id: number) => (
                              <p key={id} className="leading-relaxed">
                                <span className={`font-black ${item.status === "success" ? "text-emerald-400" : item.status === "review_required" ? "text-amber-400" : "text-rose-400"}`}>
                                  [{item.providerId.toUpperCase()}]
                                </span> {item.info}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB TAB CONTENT: REVIEW QUEUE */}
              {selectedReviewId === "review-queue" && (
                <div className="space-y-3 font-sans">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-extrabold text-[#1B3022] uppercase tracking-wider">Offers Requiring Manual Review</h4>
                    <span className="text-[10pt] text-amber-600 font-bold bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                      Pricing and regulatory disclosures safely locked from production displays
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-500 leading-normal">
                    When the scraper detects a key metric shift exceeding validation limits (e.g., &gt;20% price alteration, contract lengthenings, or regulatory price raise modifications), the auto-live switch turns OFF and locks the item for admin manual review.
                  </p>

                  <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-200">
                    <div className="p-4 bg-amber-50/50 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9.5px] font-black uppercase bg-amber-200 text-amber-900 px-2 py-0.5 rounded">Pending Review</span>
                          <h5 className="font-extrabold text-sm text-[#1B3022] mt-1.5 font-sans">Trooli HomeGig 1000 - Symmetrical High Fiber</h5>
                          <p className="text-[10.5px] text-stone-500">Source: Trooli Broadband Packages Page</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-stone-500 font-bold block">Last checked: Today</span>
                          <span className="text-[11px] font-black text-rose-600">Warnings active: Price Hike Warning</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs border border-stone-200 bg-white p-3 rounded-xl mt-2.5">
                        <div>
                          <span className="text-stone-400 text-[9px] block uppercase font-black">Pre-Check Price</span>
                          <span className="font-bold text-stone-800 line-through">£35.00/mo</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[9px] block uppercase font-black">Crawled Price</span>
                          <span className="font-extrabold text-rose-600">£45.00/mo</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[9px] block uppercase font-black">Deviation</span>
                          <span className="font-black text-rose-600">+28.5% Change</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[9px] block uppercase font-black">Known price rise</span>
                          <span className="font-semibold text-stone-800 text-[10px]">CPI + 3.9% Yearly applied Apr 1st</span>
                        </div>
                      </div>

                      <div className="bg-red-50 text-red-800 border border-red-200 p-2 text-[10.5px] rounded-lg mt-1">
                        ⚠️ <strong>Validation warnings logged:</strong> Scraped price (£45.00) exceeds cached base (£35.00) by more than 20.00% validation threshold bounds. Review structure checklist manually on official Trooli rate charts before approval.
                      </div>

                      <div className="flex gap-2 justify-end mt-2">
                        <button
                          onClick={() => triggerToast("Pricing reject simulated. Package reverted to cached values.")}
                          className="px-3 py-1.5 text-xs font-extrabold border border-stone-350 hover:bg-stone-100 text-stone-700 rounded-lg cursor-pointer transition-all"
                        >
                          Reject Change
                        </button>
                        <button
                          onClick={() => triggerToast("Pricing change approved physically. Dynamic state successfully synced to production indices.")}
                          className="px-3 py-1.5 text-xs font-extrabold bg-[#1A3A2C] hover:bg-emerald-950 text-white rounded-lg cursor-pointer transition-all"
                        >
                          Approve Live Update
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-stone-50 text-stone-400 text-center py-6 text-xs">
                      All other tracked broadband offer integrations matching Wiltshire boundaries are fully confirmed.
                    </div>
                  </div>
                </div>
              )}

              {/* SUB TAB CONTENT: PROVIDER SETTINGS */}
              {selectedReviewId === "provider-settings" && (
                <div className="space-y-4 font-sans">
                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold text-[#1B3022] uppercase tracking-wider">Active Provider Scraper Settings</h4>
                    <p className="text-[10.5px] text-stone-500 font-sans">Enable or disable crawler threads, adjust rate limit safety blocks, and check target bounds</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {provSources.map((source: any, idx: number) => (
                      <div key={idx} className="border border-stone-200 rounded-xl p-3 bg-white space-y-2.5 text-[11px]">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-sm text-[#1B3022]">{source.providerName}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-stone-400 font-mono">ID: {source.providerId}</span>
                            <button
                              onClick={() => {
                                const copy = [...provSources];
                                copy[idx].enabled = !copy[idx].enabled;
                                setProvSources(copy);
                                triggerToast(`${source.providerName} crawler thread successfully ${copy[idx].enabled ? "enabled" : "disabled"}.`);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-extrabold tracking-tight uppercase cursor-pointer ${
                                source.enabled 
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                                  : "bg-red-100 text-red-800 border border-red-200"
                              }`}
                            >
                              {source.enabled ? "Enabled" : "Disabled"}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1 bg-stone-50 p-2 rounded-lg text-stone-600">
                          <div><strong>Scraper Type:</strong> <span className="font-mono text-[10px] bg-stone-200 px-1 py-0.2 rounded">{source.sourceType}</span></div>
                          <div><strong>Target URL:</strong> <a href={source.pricingPageUrl} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline font-mono text-[9px] truncate block">{source.pricingPageUrl}</a></div>
                          {source.targetTowns.length > 0 && (
                            <div className="truncate"><strong>Bound Towns:</strong> {source.targetTowns.join(", ")}</div>
                          )}
                          {source.targetPostcodes.length > 0 && (
                            <div className="truncate"><strong>Bound Postcodes:</strong> {source.targetPostcodes.join(", ")}</div>
                          )}
                          <div><strong>Rate Limit:</strong> delay check {source.rateLimitSeconds}s | freq: {source.updateFrequency}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 1: MANAGE WEEKLY FEATURED OFFER */}
          {activeTab === "manage-weekly-featured-offer" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-550 leading-relaxed font-sans">
                Below is the manual editor for Wiltshire's <strong>Weekly Featured Offer Highlight</strong> dashboard slot.
                Changes updated here save instantly to local app states and show on the homepage if targeted postcode searches match Sn10.
              </p>

              <form onSubmit={handleSaveWeeklyOfferForm} className="space-y-4 max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="weekly-id" className="text-xs font-black text-slate-700 font-sans">Target Campaign Offer</label>
                    <select
                      id="weekly-id"
                      className="p-2.5 bg-stone-50 border border-slate-205 rounded-xl text-xs font-extrabold"
                      value={weeklyOfferForm.offerId}
                      onChange={(e) => setWeeklyOfferForm(prev => ({ ...prev, offerId: e.target.value }))}
                    >
                      {offers.map(o => (
                        <option key={o.offerId} value={o.offerId}>{o.providerName} &ndash; {o.packageName}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="weekly-price" className="text-xs font-black text-slate-700 font-sans">Special Price (£/mo)</label>
                    <input
                      id="weekly-price"
                      type="number"
                      step="0.01"
                      className="p-2.5 bg-stone-50 border border-slate-205 rounded-xl text-xs font-extrabold text-slate-900"
                      value={weeklyOfferForm.monthlyPrice}
                      onChange={(e) => setWeeklyOfferForm(prev => ({ ...prev, monthlyPrice: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>

                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="weekly-headline" className="text-xs font-black text-slate-700 font-sans">Special Offer Headline</label>
                  <input
                    id="weekly-headline"
                    type="text"
                    className="p-2.5 bg-stone-50 border border-slate-205 rounded-xl text-xs font-extrabold"
                    value={weeklyOfferForm.headline}
                    onChange={(e) => setWeeklyOfferForm(prev => ({ ...prev, headline: e.target.value }))}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="weekly-desc" className="text-xs font-black text-slate-700 font-sans">Short Promo Description</label>
                  <textarea
                    id="weekly-desc"
                    rows={3}
                    className="p-2.5 bg-stone-50 border border-slate-205 rounded-xl text-xs font-bold leading-normal text-slate-800"
                    value={weeklyOfferForm.shortDescription}
                    onChange={(e) => setWeeklyOfferForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="weekly-notes" className="text-xs font-black text-slate-700 font-sans">Editor Spotlight Notes</label>
                  <textarea
                    id="weekly-notes"
                    rows={3}
                    className="p-2.5 bg-stone-50 border border-slate-205 rounded-xl text-xs font-bold leading-normal text-slate-800"
                    value={weeklyOfferForm.editorNotes}
                    onChange={(e) => setWeeklyOfferForm(prev => ({ ...prev, editorNotes: e.target.value }))}
                  />
                </div>

                <div className="flex items-center gap-2 py-1">
                  <input
                    id="weekly-is-live"
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 rounded border-slate-300 cursor-pointer pointer-events-auto"
                    checked={weeklyOfferForm.isLive}
                    onChange={(e) => setWeeklyOfferForm(prev => ({ ...prev, isLive: e.target.checked }))}
                  />
                  <label htmlFor="weekly-is-live" className="text-xs font-black text-slate-750 font-sans cursor-pointer select-none">
                    Keep Weekly highlights and badges visible on frontpage search matching SN10/Devizes areas
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-3 bg-brand-green hover:bg-[#122e1b] text-white font-black rounded-xl text-xs cursor-pointer shadow-md transition-all flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4 text-brand-gold font-sans" />
                    <span>Commit Core Spotlight Parameters</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: MANAGE POSTCODE OFFERS */}
          {activeTab === "manage-postcode-offers" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-550 leading-relaxed font-sans animate-fadeIn">
                Adjust matched providers, editorial findings, and rankings for specific postcode codes (e.g. SN10, BA14).
                This coordinates directly with the system prefix matching rules.
              </p>

              <div className="space-y-4 max-w-xl">
                <div className="flex flex-col gap-1.5 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <label htmlFor="match-prefix" className="text-xs font-black text-slate-800">Target Region Prefix</label>
                  <select
                    id="match-prefix"
                    className="p-2.5 bg-white border border-slate-205 rounded-xl text-xs font-extrabold text-slate-900"
                    value={selectedPostcodePrefix}
                    onChange={(e) => setSelectedPostcodePrefix(e.target.value)}
                  >
                    {postcodeAreas.map(p => (
                      <option key={p.postcodePrefix} value={p.postcodePrefix}>{p.postcodePrefix} Area &mdash; {p.areaName} ({p.county})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-450 tracking-wider">Public Active Offers In This Area Prefix:</h4>
                  
                  {offers.filter(o => o.targetPostcodes.includes(selectedPostcodePrefix)).length === 0 ? (
                    <div className="p-4 rounded-xl border border-dashed border-amber-205 bg-amber-500/5 text-amber-850 text-xs">
                      No active offers targeted directly to {selectedPostcodePrefix}. Use the Availability Panel to map ones!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {offers.filter(o => o.targetPostcodes.includes(selectedPostcodePrefix)).map(o => (
                        <div key={o.offerId} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs hover:border-[#C5A059] transition-colors">
                          <div className="space-y-0.5">
                            <span className="font-extrabold text-slate-900 leading-normal">{o.providerName} &ndash; {o.packageName}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-400 font-mono">Monthly Rate: £{o.monthlyPrice?.toFixed(2)}</span>
                              <span className="text-[9px] px-1 bg-[#EEFDF0] hover:bg-emerald-100 hover:text-emerald-950 font-bold text-emerald-800 border border-emerald-305 rounded">Score: {o.editorScore}/10</span>
                              {o.isSponsored && <span className="text-[9px] px-1 bg-amber-50 font-black text-[#855B18] border border-[#ECD395] rounded">Spotlight Sponsored</span>}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setOffers(prev => prev.map(item => item.offerId === o.offerId ? { ...item, isSponsored: !item.isSponsored } : item));
                              triggerToast(`Toggled search card pin badge state for offer: ${o.packageName}`);
                            }}
                            className={`px-3 py-1.5 font-bold font-sans rounded-lg border text-[10px] transition-all cursor-pointer ${o.isSponsored ? "bg-amber-500 text-white border-amber-450 hover:bg-amber-600" : "bg-stone-50 hover:bg-stone-105"}`}
                          >
                            {o.isSponsored ? "Unpin Sponsored" : "Pin Sponsored"}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MANAGE PROVIDER LISTINGS */}
          {activeTab === "manage-provider-listings" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-500 leading-normal">
                Inspect physical Alnets and mainstream platforms currently categorized within our systems index list.
              </p>

              <div className="space-y-4 max-w-xl">
                <div className="flex flex-col gap-1.5 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <label htmlFor="provider-profile-select" className="text-xs font-black text-slate-800">Select Registered Brand</label>
                  <select
                    id="provider-profile-select"
                    value={selectedProviderId}
                    onChange={(e) => setSelectedProviderId(e.target.value)}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-extrabold font-sans"
                  >
                    {providers.map(p => (
                      <option key={p.id} value={p.id}>{p.providerName} ({p.networkType})</option>
                    ))}
                  </select>
                </div>

                {(() => {
                  const prov = providers.find(p => p.id === selectedProviderId);
                  if (!prov) return null;
                  return (
                    <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-black tracking-wider leading-relaxed">Provider Name</span>
                        <input
                          type="text"
                          className="w-full p-2 bg-white border border-slate-200 rounded mt-1 text-slate-900 font-extrabold"
                          value={prov.providerName}
                          onChange={(e) => {
                            const val = e.target.value;
                            setProviders(prev => prev.map(p => p.id === prov.id ? { ...p, providerName: val } : p));
                          }}
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-black tracking-wider leading-relaxed">Logo Text Brand Banner</span>
                        <input
                          type="text"
                          className="w-full p-2 bg-white border border-slate-200 rounded mt-1 text-slate-900 font-extrabold"
                          value={prov.logoText}
                          onChange={(e) => {
                            const val = e.target.value;
                            setProviders(prev => prev.map(p => p.id === prov.id ? { ...p, logoText: val } : p));
                          }}
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-black tracking-wider leading-relaxed">Infrastructure Class (FTTP/FTTC)</span>
                        <input
                          type="text"
                          className="w-full p-2 bg-white border border-slate-200 rounded mt-1 text-slate-900 font-extrabold"
                          value={prov.networkType}
                          onChange={(e) => {
                            const val = e.target.value;
                            setProviders(prev => prev.map(p => p.id === prov.id ? { ...p, networkType: val } : p));
                          }}
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-black tracking-wider leading-relaxed">Sponsorship Spotlight</span>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            checked={prov.isSponsored}
                            onChange={(e) => {
                              const val = e.target.checked;
                              setProviders(prev => prev.map(p => p.id === prov.id ? { ...p, isSponsored: val } : p));
                            }}
                            className="h-4.5 w-4.5 text-emerald-600 rounded border-slate-300 pointer-events-auto cursor-pointer"
                          />
                          <span className="text-slate-800">Mark Sponsored</span>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 pt-2 border-t border-stone-150">
                        <button
                          type="button"
                          onClick={() => triggerToast(`Provider listings parameters updated for: ${prov.providerName}`)}
                          className="px-4 py-2 bg-brand-green hover:bg-[#122e1b] hover:text-white text-white rounded-lg transition-all"
                        >
                          Save Profile
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TAB 4: MANAGE OFFER AVAILABILITY */}
          {activeTab === "manage-offer-availability" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-550 leading-relaxed font-sans">
                Align <strong>Street Cabinet &amp; Infrastructure Availability</strong> rules safely. Manage the mapping parameters of where individual Altnet offers are available publically.
              </p>

              <form onSubmit={handleSaveAvailabilityOverride} className="p-4 bg-slate-50 border border-slate-200 rounded-3xl space-y-4 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="avail-offer" className="text-xs font-black text-slate-700 font-sans">Select Active Offer</label>
                    <select
                      id="avail-offer"
                      className="p-2.5 bg-white border border-slate-205 rounded-xl text-xs font-extrabold"
                      value={availabilityOfferId}
                      onChange={(e) => setAvailabilityOfferId(e.target.value)}
                    >
                      {offers.map(o => (
                        <option key={o.offerId} value={o.offerId}>{o.providerName} &ndash; {o.packageName}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="avail-postcode" className="text-xs font-black text-slate-700 font-sans">Target Postcode Area</label>
                    <select
                      id="avail-postcode"
                      className="p-2.5 bg-white border border-slate-205 rounded-xl text-xs font-extrabold"
                      value={availabilityPostcode}
                      onChange={(e) => setAvailabilityPostcode(e.target.value)}
                    >
                      {postcodeAreas.map(p => (
                        <option key={p.postcodePrefix} value={p.postcodePrefix}>{p.postcodePrefix} Area ({p.areaName})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="avail-status" className="text-xs font-black text-slate-700 font-sans">Confidence Status Mapping</label>
                    <select
                      id="avail-status"
                      className="p-2.5 bg-white border border-slate-205 rounded-xl text-xs font-extrabold"
                      value={availabilityStatus}
                      onChange={(e) => setAvailabilityStatus(e.target.value)}
                    >
                      <option value="Likely available">Likely Available (Renders green on page info)</option>
                      <option value="Limited availability">Limited Availability (Renders as Amber warn)</option>
                      <option value="Address check required">Address Check Required (Mandates lead form)</option>
                      <option value="Not currently listed">Not Active / Not available</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="avail-confidence" className="text-xs font-black text-slate-700 font-sans">Verification Confidence Class</label>
                    <select
                      id="avail-confidence"
                      className="p-2.5 bg-white border border-slate-205 rounded-xl text-xs font-extrabold"
                      value={availabilityConfidence}
                      onChange={(e) => setAvailabilityConfidence(e.target.value)}
                    >
                      <option value="High">High Confidence (Audit confirmed)</option>
                      <option value="Medium">Medium Confidence (Sample checks)</option>
                      <option value="Low">Low Confidence (Requires manual review)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-green hover:bg-[#123118] text-white font-black rounded-xl text-xs cursor-pointer shadow-xs transition-colors"
                >
                  Apply Availability Logic Map
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: MANAGE EDITOR RATINGS */}
          {activeTab === "manage-editor-scores" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Tweak calculated score matrices (Editor Scores out of 10.0). These represent combined assessments of service speed, customer feedback and tariff locks.
              </p>

              <div className="space-y-3 overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] font-black tracking-widest bg-stone-50/50">
                      <th className="py-2.5 px-3">Provider</th>
                      <th className="py-2.5 px-3">Package Category</th>
                      <th className="py-2.5 px-3 text-center">Current Editor Rating (1-10)</th>
                      <th className="py-2.5 px-3 text-right">Raw rankingScore</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-105">
                    {providers.slice(0, 10).map((p) => {
                      const computedScore = p.editorScore ?? parseFloat(((p.rankingScore ?? 85) / 10).toFixed(1));
                      return (
                        <tr key={p.id} className="hover:bg-amber-500/5 transition-colors">
                          <td className="py-2.5 px-3 font-bold font-sans text-slate-900">{p.providerName}</td>
                          <td className="py-2.5 px-3 font-bold text-sky-650 block text-[10.5px]">{p.packageName}</td>
                          <td className="py-2.5 px-3 font-sans text-center">
                            <input
                              type="number"
                              min="1"
                              max="10"
                              step="0.1"
                              className="w-18 p-1.5 border border-stone-200 rounded font-sans font-black text-center"
                              value={computedScore}
                              onChange={(e) => handleUpdateEditorScore(p.id, parseFloat(e.target.value) || 8.0)}
                            />
                            <span className="text-[10px] text-stone-400 font-medium ml-2">/ 10</span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">
                            {p.rankingScore || Math.round(computedScore * 10)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: MANAGE BROADBAND NEWS TICKER */}
          {activeTab === "manage-broadband-news-ticker" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-550 leading-relaxed font-sans">
                Introduce a slowly scrolling broadband news ticker at the top of the page. Headline items defined below scroll gracefully.
                Do not copy full article text, only brief summaries in our own words with strict source links.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Addition Form */}
                <form onSubmit={handleAddNewsTicker} className="md:col-span-1 p-4 bg-slate-50 border border-slate-200 rounded-3xl space-y-3.5 text-xs font-bold text-slate-800">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-1">
                    <Plus className="h-4 w-4 text-[#C5A059]" />
                    <span>Create Headline</span>
                  </h4>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="news-head" className="text-stone-500 text-[10.5px]">News Headline Text</label>
                    <input
                      id="news-head"
                      type="text"
                      className="p-2 bg-white border border-stone-205 rounded font-extrabold focus:outline"
                      value={newNewsHeadline}
                      onChange={(e) => setNewNewsHeadline(e.target.value)}
                      placeholder="e.g. Westbury physical trench fibre completed..."
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="news-src" className="text-stone-500 text-[10.5px]">Source attribution name</label>
                    <input
                      id="news-src"
                      type="text"
                      className="p-2 bg-white border border-stone-205 rounded font-extrabold focus:outline"
                      value={newNewsSource}
                      onChange={(e) => setNewNewsSource(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="news-url" className="text-stone-500 text-[10.5px]">Original Article URL</label>
                    <input
                      id="news-url"
                      type="text"
                      className="p-2 bg-white border border-stone-205 rounded font-extrabold focus:outline font-mono"
                      value={newNewsUrl}
                      onChange={(e) => setNewNewsUrl(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="news-summary" className="text-stone-500 text-[10.5px]">Brief Summary in Our Own Words</label>
                    <textarea
                      id="news-summary"
                      rows={2}
                      className="p-2 bg-white border border-stone-205 rounded font-medium focus:outline"
                      value={newNewsSummary}
                      onChange={(e) => setNewNewsSummary(e.target.value)}
                      placeholder="Do not duplicate copyright content. Summarize!"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      id="news-wilt"
                      type="checkbox"
                      checked={newNewsIsWiltshire}
                      className="pointer-events-auto h-4 w-4 text-emerald-600 border border-slate-300"
                      onChange={(e) => setNewNewsIsWiltshire(e.target.checked)}
                    />
                    <label htmlFor="news-wilt" className="text-stone-650 text-[10.5px] cursor-pointer">Wiltshire Relevant?</label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-brand-green hover:bg-[#122e1b] text-white font-black text-xs rounded-lg cursor-pointer"
                  >
                    Insert Ticker Headline
                  </button>
                </form>

                {/* Listing of active news items */}
                <div className="md:col-span-2 space-y-3.5 max-h-[480px] overflow-y-auto">
                  <h4 className="text-xs font-black uppercase text-slate-450 tracking-wider">Scroll Items Index Queue:</h4>
                  
                  {broadbandNews.map((item, idx) => (
                    <div key={item.id || idx} className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 ${item.isActive ? "bg-white border-slate-200" : "bg-[#FAF8F5]/60 border-slate-150 opacity-70"}`}>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-black uppercase ${item.displayPriority === 1 ? "bg-purple-100 text-purple-750" : "bg-stone-100 text-stone-605"}`}>
                            Priority {item.displayPriority}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono italic">Source: {item.sourceName}</span>
                        </div>
                        <h5 className="text-xs font-extrabold text-slate-900 leading-snug mt-1.5">{item.headline}</h5>
                        {item.summary && <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">{item.summary}</p>}
                      </div>

                      <div className="flex items-center gap-2 border-t border-stone-100 pt-2.5">
                        <button
                          onClick={() => toggleNewsActive(item.id)}
                          className={`px-2 py-1 transform-gpu hover:scale-102 transition-transform text-[9.5px] font-extrabold rounded-md cursor-pointer border ${item.isActive ? "bg-stone-100 text-stone-700" : "bg-emerald-600 text-white border-emerald-505"}`}
                        >
                          {item.isActive ? "Pause Ticker" : "Resume Ticker"}
                        </button>
                        <button
                          onClick={() => deleteNewsItem(item.id)}
                          className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-[9.5px] font-extrabold rounded-md cursor-pointer"
                        >
                          Delete Permanent
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* TAB 7: MANAGE NEWS SOURCES */}
          {activeTab === "manage-news-sources" && (
            <div className="space-y-4 animate-fadeIn">
              <p className="text-xs text-slate-550 leading-relaxed font-sans">
                Review, configure, and deduplicate active RSS or manual pricing feed pipelines.
                Ensure strict copyright control of what domains are parsed.
              </p>

              <div className="space-y-3.5 max-w-xl">
                <div className="space-y-2">
                  {newsSources.map((source, sIdx) => (
                    <div key={sIdx} className="p-3 bg-[#FAF8F5] border border-stone-200 rounded-xl flex items-center justify-between text-xs font-bold text-slate-900">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-cyan-800 bg-cyan-50 border border-cyan-155 px-1 py-0.5 rounded text-[8.5px] uppercase font-bold tracking-wider">{source.type}</span>
                          <span className="text-stone-850 font-black">{source.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono mt-1 block">Root Domain: {source.url}</span>
                      </div>

                      <button
                        onClick={() => {
                          setNewsSources(prev => prev.map((s, idx) => idx === sIdx ? { ...s, active: !s.active } : s));
                          triggerToast(`Switched pipeline activation state for: ${source.name}`);
                        }}
                        className={`text-[10px] px-2.5 py-1.5 font-bold rounded-lg ${source.active ? "bg-stone-200 hover:bg-stone-250 text-slate-800" : "bg-brand-green text-white"}`}
                      >
                        {source.active ? "Disable pipeline" : "Enable pipeline"}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => triggerToast("Mock connection test successful. All news domains are responding within 85ms bounds.")}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 border text-slate-850 font-sans text-xs font-black rounded-lg cursor-pointer transition-colors"
                  >
                    Test pipeline connectivity thresholds
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: RSS INGESTION INTERACTIVE LOGS */}
          {activeTab === "manage-rss-feed-placeholders" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-550 leading-relaxed font-sans">
                Define external RSS/XML feed feeds (e.g. from ISPreview, Ofcom, Council portals) to automatically ingest and parse Salisbury-plain and Wiltshire-centred broadband headlines.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-3xl space-y-4 text-xs font-bold text-slate-800">
                  <h4 className="text-xs font-black text-slate-450 uppercase tracking-widest flex items-center gap-1">
                    <Rss className="h-4 w-4 text-brand-gold" />
                    <span>External Feed Setup</span>
                  </h4>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rss-target" className="text-stone-505 font-bold">Approved XML Feed Target URL</label>
                    <input
                      id="rss-target"
                      type="text"
                      className="p-2.5 bg-white border border-stone-200 rounded-xl font-mono text-[11px]"
                      value={rssFeedUrl}
                      onChange={(e) => setRssFeedUrl(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      id="rss-auto"
                      type="checkbox"
                      checked={rssAutopublish}
                      onChange={(e) => setRssAutopublish(e.target.checked)}
                      className="pointer-events-auto h-4 w-4 text-emerald-600"
                    />
                    <label htmlFor="rss-auto" className="text-stone-700 cursor-pointer">Auto-publish matched news items without review</label>
                  </div>

                  <button
                    onClick={triggerRssPolling}
                    className="w-full px-4 py-2.5 bg-brand-green hover:bg-[#122e1b] text-white font-sans text-xs font-black rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
                  >
                    <Rss className="h-4 w-4 text-brand-gold" />
                    <span>Trigger RSS Feed Poll</span>
                  </button>
                </div>

                {/* Interactive Terminal */}
                <div className="bg-slate-900 rounded-3xl p-4 text-brand-gold font-mono text-[10.5px] leading-relaxed shadow-lg flex flex-col justify-between">
                  <div>
                    <span className="font-sans text-white uppercase text-[9.5px] block border-b border-slate-800 pb-1.5 tracking-wider select-none">
                      RSS Ingestion Parser Logs:
                    </span>
                    {rssTerminalLogs.length === 0 ? (
                      <div className="text-slate-500 py-12 text-center text-[10px]">
                        Terminal idle. Click "Trigger RSS Feed Poll" to pipe automated news streams...
                      </div>
                    ) : (
                      <div className="space-y-1 mt-2.5">
                        {rssTerminalLogs.map((log, lIdx) => (
                          <p key={lIdx} className="animate-fadeIn">{log}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  {rssTerminalLogs.length > 0 && (
                    <button
                      onClick={() => setRssTerminalLogs([])}
                      className="mt-3 font-sans text-[9px] bg-slate-800 hover:bg-slate-750 text-stone-300 py-1 rounded w-full border border-slate-700 cursor-pointer"
                    >
                      Clear Logs
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: MANAGE ADVERTS */}
          {activeTab === "manage-adverts" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-500 leading-normal">
                Tune Campaign Billboards (Hero, Content block advertisements, category highlights).
              </p>

              <div className="space-y-4 max-w-xl">
                <div className="flex flex-col gap-1.5 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <label htmlFor="advert-campaign-select" className="text-xs font-black text-slate-800">Select Billboard Sponsor</label>
                  <select
                    id="advert-campaign-select"
                    value={selectedAdvertId}
                    onChange={(e) => setSelectedAdvertId(e.target.value)}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-brand-green"
                  >
                    {adverts.map(ad => (
                      <option key={ad.id} value={ad.id}>Ad: {ad.advertiserName} &mdash; ({ad.placement})</option>
                    ))}
                  </select>
                </div>

                {(() => {
                  const adObj = adverts.find(a => a.id === selectedAdvertId);
                  if (!adObj) return null;
                  return (
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-3xl space-y-3.5 text-xs font-bold text-slate-950">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="ad-sponsor-name" className="text-[10px] uppercase font-black text-stone-400 block pb-1">Advertiser Logo / Title</label>
                          <input
                            id="ad-sponsor-name"
                            type="text"
                            className="w-full p-2.5 bg-white border border-stone-205 rounded font-extrabold"
                            value={adObj.advertiserName || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAdverts(prev => prev.map(a => a.id === adObj.id ? { ...a, advertiserName: val } : a));
                            }}
                          />
                        </div>
                        <div>
                          <label htmlFor="ad-sponsor-placement" className="text-[10px] uppercase font-black text-stone-400 block pb-1">Placement Target Location</label>
                          <input
                            id="ad-sponsor-placement"
                            type="text"
                            className="w-full p-2.5 bg-white border border-stone-250 rounded font-extrabold font-mono"
                            value={adObj.placement || ""}
                            readOnly
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="ad-sponsor-headline" className="text-[10px] uppercase font-black text-stone-400 block pb-1">Primary Campaign Headline</label>
                        <input
                          id="ad-sponsor-headline"
                          type="text"
                          className="w-full p-2.5 bg-white border border-stone-205 rounded font-extrabold"
                          value={adObj.headline || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAdverts(prev => prev.map(a => a.id === adObj.id ? { ...a, headline: val } : a));
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="ad-sponsor-desc" className="text-[10px] uppercase font-black text-stone-400 block pb-1">Promotional Description</label>
                        <textarea
                          id="ad-sponsor-desc"
                          rows={2}
                          className="w-full p-2.5 bg-white border border-stone-205 rounded font-extrabold"
                          value={adObj.description || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAdverts(prev => prev.map(a => a.id === adObj.id ? { ...a, description: val } : a));
                          }}
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => triggerToast(`Campaign metrics preserved in draft state for ${adObj.advertiserName}.`)}
                          className="px-5 py-2.5 bg-brand-green hover:bg-[#153420] text-white rounded-xl text-xs font-black cursor-pointer shadow-xs transition-colors"
                        >
                          Save Advert Copy
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TAB 10: REVIEW EXPIRED OFFERS */}
          {activeTab === "review-expired-offers" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-550 leading-relaxed font-sans">
                Review any parished broadband campaigns that have expired validity periods or are flagged as deactivated.
                Keep Wiltshire Finder compliant with billing standardizations.
              </p>

              <div className="space-y-3.5 max-w-xl">
                {offers.some(o => !o.isLive) ? (
                  <div className="space-y-3">
                    {offers.filter(o => !o.isLive).map(o => (
                      <div key={o.offerId} className="p-4 bg-orange-500/5 border border-amber-305 rounded-3xl flex items-center justify-between text-xs font-bold text-slate-900 animate-fadeIn">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-705 border border-amber-305 text-[8.5px] uppercase font-black tracking-widest rounded leading-none">
                              Expired Campaign
                            </span>
                            <span className="font-extrabold text-stone-850">{o.providerName} &ndash; {o.packageName}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono mt-1.5 block">Was targeted: {o.targetPostcodes.slice(0, 3).join(", ") || "No targets set"}</span>
                        </div>

                        <button
                          onClick={() => {
                            setOffers(prev => prev.map(offer => offer.offerId === o.offerId ? { ...offer, isLive: true } : offer));
                            triggerToast(`Re-validated pricing validity parameters for ${o.packageName}`);
                          }}
                          className="px-4.5 py-2.5 bg-brand-green hover:bg-[#122e1b] text-white rounded-xl text-xs font-black shrink-0 cursor-pointer shadow-2xs"
                        >
                          Approve, Extend &amp; Publish
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-slate-50 border border-slate-205 rounded-3xl text-emerald-800 text-xs">
                    <CheckCircle className="h-9 w-9 text-emerald-600 mx-auto mb-2" />
                    <span className="font-extrabold block">All Campaigns are publically live and verified!</span>
                    <span className="text-slate-450 text-[10px] font-medium block mt-1">Pricing audit is fully optimized. No expired listings detected.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 11: IMPORT CSV OFFERS */}
          {activeTab === "import-csv-offers" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-500 leading-normal">
                Direct spreadsheet import engine. Paste tabular rows below matching standard offerId headers to bulk sync consumer pricing.
              </p>

              <div className="space-y-4 max-w-xl">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="csv-offers-textarea" className="text-xs font-black text-slate-800 block">Tabular CSV raw spreadsheet stream:</label>
                  <textarea
                    id="csv-offers-textarea"
                    rows={6}
                    className="w-full p-3 font-mono text-[11px] text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                    value={csvPasteData}
                    onChange={(e) => setCsvPasteData(e.target.value)}
                  />
                  <span className="text-[10.5px] italic text-slate-450 block">Required Header Structure: offerId, monthlyPrice, contractLength, setupFee, isLive</span>
                </div>

                <button
                  onClick={handleImportCsv}
                  className="px-5 py-2.5 bg-brand-green hover:bg-[#14311c] text-white rounded-xl text-xs font-black cursor-pointer shadow-xs transition-colors"
                >
                  Parse CSV Spreadsheet Data
                </button>

                {csvImportLog.length > 0 && (
                  <div className="p-4 bg-slate-900 leading-relaxed rounded-xl font-mono text-[10.5px] text-brand-gold shadow-xs space-y-1">
                    <span className="font-sans uppercase text-[10px] block text-white font-black pb-1 border-b border-slate-705 tracking-wider select-none">CSV Integration Feedback logs:</span>
                    {csvImportLog.map((logLine, lineIdx) => (
                      <p key={lineIdx} className={logLine.startsWith("Error") ? "text-rose-400" : "text-emerald-400"}>
                        {logLine}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 12: RECALCULATE DEALS POSTCODE RANKINGS */}
          {activeTab === "recalculate-postcode-rankings" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-550 leading-relaxed font-sans">
                Trigger an immediate recalculation sweep of calculated consumer matching scores for all Wiltshire targets.
              </p>

              <div className="p-5 bg-stone-50 border border-stone-200 rounded-3xl space-y-4 max-w-2xl">
                <div className="flex items-center gap-2">
                  <RefreshCw className={`h-6 w-6 text-emerald-600 ${isRecalculating ? "animate-spin" : ""}`} />
                  <h4 className="text-sm font-black text-slate-900 font-sans">Scoring Matrix optimizer Console</h4>
                </div>
                <p className="text-xs text-slate-650 leading-relaxed font-sans mt-1">
                  Adjusting speed ratios and prices automatically triggers score differences.
                  Use this optimization console to recalculate rating parameters to ensure active listings display in their proper order.
                </p>

                <button
                  onClick={triggerRecalculateCommand}
                  className="px-5 py-3 bg-brand-green hover:bg-[#122e1b] text-white rounded-xl text-xs font-black cursor-pointer transition-colors"
                >
                  {isRecalculating ? "Recalculating rankings..." : "Run Global Optimization Sweeps"}
                </button>

                {recalculateLogs.length > 0 && (
                  <div className="p-4 bg-slate-950 font-mono text-[11px] leading-relaxed text-emerald-400 rounded-2xl shadow-inner space-y-1 mt-3">
                    <span className="text-[10px] text-white block font-black border-b border-emerald-950 pb-1 uppercase tracking-widest leading-none font-sans select-none">Calculators process console logs:</span>
                    {recalculateLogs.map((log, logIdx) => (
                      <p key={logIdx} className="animate-fadeIn">{log}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB SEO-PAGES */}
          {activeTab === "seo-pages" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-500 leading-normal">
                Optimize title pairings, target coordinates, primary focus keywords and content intros. Changes apply to the state machine dynamically.
              </p>

              <div className="space-y-4 max-w-2xl">
                <div className="flex flex-col gap-1.5 p-4 bg-slate-50 border border-slate-205 rounded-xl">
                  <label htmlFor="seo-page-target-select" className="text-xs font-black text-slate-700">Select SEO Page Target</label>
                  <select
                    id="seo-page-target-select"
                    value={selectedSeoKey}
                    onChange={(e) => setSelectedSeoKey(e.target.value)}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold leading-normal focus:outline-hidden focus:ring-2 focus:ring-brand-green"
                  >
                    {Object.keys(seoPages).map(key => (
                      <option key={key} value={key}>/{key === "home" ? "" : key} (Title: {seoPages[key].metaTitle})</option>
                    ))}
                  </select>
                </div>

                <form onSubmit={handleSaveSeo} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-800">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="seo-page-title" className="text-[11px] font-black text-slate-500 uppercase tracking-widest font-sans">Page Title</label>
                    <input
                      id="seo-page-title"
                      type="text"
                      className="p-2.5 border border-slate-205 rounded-xl bg-stone-50"
                      value={seoForm.pageTitle}
                      onChange={(e) => setSeoForm({ ...seoForm, pageTitle: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="seo-meta-title" className="text-[11px] font-black text-slate-500 uppercase tracking-widest font-sans">Meta Title</label>
                    <input
                      id="seo-meta-title"
                      type="text"
                      className="p-2.5 border border-slate-205 rounded-xl bg-stone-50"
                      value={seoForm.metaTitle}
                      onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label htmlFor="seo-meta-description" className="text-[11px] font-black text-slate-500 uppercase tracking-widest bg-stone-100 p-1.5 rounded flex items-center justify-between">
                      <span>Meta Description</span>
                      <span className={seoForm.metaDescription ? "text-emerald-700" : "text-amber-500"}>
                        {seoForm.metaDescription ? `${seoForm.metaDescription.length} characters` : "Empty (Gap found)"}
                      </span>
                    </label>
                    <textarea
                      id="seo-meta-description"
                      rows={3}
                      className="p-2.5 border border-slate-205 rounded-xl bg-stone-50"
                      value={seoForm.metaDescription}
                      onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-2 pt-3 border-t border-stone-150">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-brand-green hover:bg-[#122c19] text-white rounded-xl text-xs font-black cursor-pointer shadow-xs transition-all"
                    >
                      Save SEO Coordinates
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB JSON-LD */}
          {activeTab === "json-ld" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-500 font-sans">
                Manage raw Schema Graph contexts (Structured markup graphs) safely. Validate JSON schema representations.
              </p>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <label htmlFor="jsonld-page-select" className="text-xs font-black text-slate-800">Target SEO Node</label>
                  <select
                    id="jsonld-page-select"
                    value={selectedSeoKey}
                    onChange={(e) => setSelectedSeoKey(e.target.value)}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold leading-normal text-slate-900"
                  >
                    {Object.keys(seoPages).map(key => (
                      <option key={key} value={key}>/{key} schema markup type: ({seoPages[key].schemaType || "None"})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="jsonld-textarea" className="text-[11px] font-black text-slate-550 uppercase tracking-widest block font-sans">RAW SCHEMA JSON-LD STRUCTURE</label>
                  <textarea
                    id="jsonld-textarea"
                    rows={12}
                    className="w-full p-3 font-mono text-[11px] text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                    value={schemaText}
                    onChange={(e) => setSchemaText(e.target.value)}
                  />
                </div>

                {schemaValidationMsg && (
                  <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${schemaValidationMsg.isError ? "bg-rose-50 border border-rose-200 text-rose-850" : "bg-emerald-50 border border-emerald-200 text-emerald-850"}`}>
                    <AlertTriangle className="h-4.5 w-4.5 text-orange-500 font-sans" />
                    <span>{schemaValidationMsg.text}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={handleValidateSchema}
                    className="px-4 py-2.5 bg-stone-150 hover:bg-stone-200 text-slate-800 rounded-xl text-xs font-black cursor-pointer transition-colors"
                  >
                    Validate JSON Formatting
                  </button>
                  <button
                    onClick={handleSaveSchema}
                    className="px-5 py-2.5 bg-brand-green hover:bg-[#122c19] text-white rounded-xl text-xs font-black cursor-pointer transition-all"
                  >
                    Commit Verified Schema Meta
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB EXPORT-LEADS */}
          {activeTab === "export-leads" && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-xs text-slate-500 leading-normal">
                Extract Switch Enquiries recorded during browser tracking sessions. CRM-ready formats.
              </p>

              <div className="p-5 bg-stone-50 rounded-3xl border border-stone-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-1">
                      <Mail className="h-4.5 w-4.5 text-[#C5A059]" />
                      Switch Registry Export Controller
                    </h4>
                    <p className="text-xs text-stone-500 leading-normal max-w-sm">
                      Current county database session registers <strong>{leads.length} leads</strong>. Click to instantly build and download a CSV file matching standard CRM requirements.
                    </p>
                  </div>

                  <button
                    onClick={triggerExportCSVLeads}
                    className="px-5 py-3 bg-brand-green hover:bg-[#153120] text-white rounded-xl text-xs font-black flex items-center gap-2 transition-all shrink-0 cursor-pointer shadow-md"
                  >
                    <Download className="h-4 w-4 text-brand-gold font-sans" />
                    <span>Download Leads (CSV)</span>
                  </button>
                </div>

                {leads.length > 0 && (
                  <div className="mt-4 border-t border-stone-200 pt-3.5 space-y-1.5 max-h-[160px] overflow-y-auto font-mono text-[9.5px] text-slate-600 leading-normal">
                    <p className="font-sans font-black text-[10px] text-brand-green uppercase tracking-wider">Lead Sandbox Registers: {leads.length}</p>
                    {leads.slice(0, 3).map((l, lIdx) => (
                      <div key={lIdx} className="bg-white p-2 rounded border border-stone-150">
                        <span>L#{lIdx + 1}: {l.firstName} {l.lastName} ({l.postcode}) Enquired: {l.providerOfInterest} from {l.currentProvider || "None"}</span>
                        <button
                          onClick={() => handleDeleteLead(l.id)}
                          className="text-rose-600 font-bold ml-2 hover:underline"
                        >
                          Purge
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
