/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Town, Provider } from "../types";
import { providersData } from "../data/providers";
import { townsData } from "../data/towns";
import { ProviderCard } from "./ProviderCard";
import { BestDealsSection } from "./BestDealsSection";
import { LeadForm } from "./LeadForm";
import { AdvertBanner } from "./AdvertBanner";
import { Compass, MapPin, ChevronRight, HelpCircle, AlertCircle, Building2, Landmark } from "lucide-react";
import { InternalSEOLinks } from "./InternalSEOLinks";
import { JsonLdSchema } from "./JsonLdSchema";
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

interface TownPageProps {
  town: Town;
  onTownSelect: (townId: string) => void;
  onEnquire: (p: Provider) => void;
  onBackToHome: () => void;
  onPageClick?: (pageId: string) => void;
  onPostcodeClick?: (prefix: string) => void;
}

export function TownPage({ 
  town, 
  onTownSelect, 
  onEnquire, 
  onBackToHome,
  onPageClick,
  onPostcodeClick
}: TownPageProps) {
  // Filter providers whose "townsCovered" contains the town's name (case-insensitive check)
  const localProviders = providersData.filter((provider) =>
    provider.townsCovered.some((tName) => tName.toLowerCase() === town.name.toLowerCase())
  );

  // Fallback to general providers if none listed explicitly for this specific village
  const activeProviders = localProviders.length > 0 ? localProviders : providersData.slice(0, 4);

  // Map nearby towns
  const nearbyTowns = townsData.filter((t) =>
    town.nearbyTowns.some((vName) => vName.toLowerCase() === t.name.toLowerCase())
  );

  // Dynamic Schemas for the Town
  const townSchemas = React.useMemo(() => {
    const websiteSchema = createWebsiteSchema();
    const organisationSchema = createOrganisationSchema();
    
    const webpageSchema = createWebPageSchema(
      `Broadband in ${town.name} | Wiltshire Local Parish Finder`,
      town.shortIntro,
      `https://www.wiltshirebroadbandfinder.co.uk/town/${town.id}`,
      `broadband connection options in ${town.name}`,
      "2026-06-08T12:05:14Z"
    );

    const breadcrumbSchema = createBreadcrumbSchema([
      { name: "Home", url: "https://www.wiltshirebroadbandfinder.co.uk/" },
      { name: `Broadband in ${town.name}`, url: `https://www.wiltshirebroadbandfinder.co.uk/town/${town.id}` }
    ]);

    const faqSchema = town.faqs && town.faqs.length > 0
      ? createFAQSchema(town.faqs)
      : null;

    const itemListSchema = createItemListSchema(
      activeProviders.slice(0, 6).map((item, idx) => ({
        position: idx + 1,
        name: `Listed provider options: ${item.providerName}`,
        url: `https://www.wiltshirebroadbandfinder.co.uk/town/${town.id}`
      }))
    );

    const offerSchemas = activeProviders.slice(0, 2).map((item) => {
      return createOfferSchema(
        item.packageName || "Listed Speed Tier Connection",
        item.monthlyPriceFrom || item.monthlyPrice || 29.99,
        "GBP",
        item.providerName,
        `https://www.wiltshirebroadbandfinder.co.uk/town/${town.id}`
      );
    });

    const reviewSchema = activeProviders.length > 0
      ? createReviewSchema(
          `${activeProviders[0].providerName} in ${town.name}`,
          (activeProviders[0].rankingScore || 85) / 10,
          `Editorial review of ${activeProviders[0].providerName} coverage and speed reliability in ${town.name}.`
        )
      : createReviewSchema(
          `${town.name} Broadband Services`,
          8.5,
          `Objective editorial alignment index for listed providers in ${town.name} parish.`
        );

    const serviceSchema = createServiceSchema(
      `Broadband listed offers in ${town.name}`
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
  }, [town, activeProviders]);

  return (
    <div className="space-y-8 animate-fadeIn" id={`town-page-${town.id}`}>
      {/* Dynamic JSON-LD Structured Markups */}
      <JsonLdSchema schema={townSchemas.websiteSchema} id={`website-schema-town-${town.id}`} />
      <JsonLdSchema schema={townSchemas.organisationSchema} id={`org-schema-town-${town.id}`} />
      <JsonLdSchema schema={townSchemas.webpageSchema} id={`webpage-schema-town-${town.id}`} />
      <JsonLdSchema schema={townSchemas.breadcrumbSchema} id={`breadcrumb-schema-town-${town.id}`} />
      {townSchemas.faqSchema && <JsonLdSchema schema={townSchemas.faqSchema} id={`faq-schema-town-${town.id}`} />}
      <JsonLdSchema schema={townSchemas.itemListSchema} id={`itemlist-schema-town-${town.id}`} />
      {townSchemas.offerSchemas.map((offer, oIdx) => (
        <JsonLdSchema key={oIdx} schema={offer} id={`offer-schema-town-${town.id}-${oIdx}`} />
      ))}
      <JsonLdSchema schema={townSchemas.reviewSchema} id={`review-schema-town-${town.id}`} />
      <JsonLdSchema schema={townSchemas.serviceSchema} id={`service-schema-town-${town.id}`} />
      
      {/* BREADCRUMBS BAR */}
      <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400 flex items-center gap-1">
        <button onClick={onBackToHome} className="hover:text-brand-gold cursor-pointer transition-colors">
          Wiltshire Finder
        </button>
        <ChevronRight className="h-3 w-3 text-slate-350" />
        <span className="text-slate-500">Parishes</span>
        <ChevronRight className="h-3 w-3 text-slate-350" />
        <span className="text-white font-extrabold">{town.name} ({town.postcodeExamples.join(", ")})</span>
      </div>

      {/* TOWN HEADER TITLE HERO HEROINE */}
      <div className="bg-[#1B3022] text-white p-6 md:p-8 rounded-3xl border border-brand-gold/30 relative overflow-hidden shadow-xs">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-gold/15 via-transparent pointer-events-none" />
        
        <div className="relative space-y-4 max-w-3xl">
          <span className="bg-brand-gold/15 border border-[#C5A059]/40 text-brand-gold rounded-full text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 inline-block">
            MUNICIPAL LOCAL BROADBAND SUMMARY
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2 font-sans">
              <MapPin className="h-6 w-6 text-brand-gold shrink-0" />
              Broadband in {town.name}, Wiltshire
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Primary Postcode Sectors: {town.postcodeExamples.join(" &bull; ")}
            </p>
          </div>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {town.shortIntro}
          </p>
        </div>
      </div>

      {/* MUNICIPAL SPONSORS ADVERT AT THE HEAD */}
      <AdvertBanner
        placement="Town page sponsor banner"
        townId={town.id}
        className="w-full"
      />

      {/* COMPLIANCE ALERT BOX IN SECURE VIEW */}
      <div className="bg-[#F9F7F2] border border-brand-gold/45 p-4 rounded-xl flex gap-3 text-xs leading-relaxed text-[#1B3022]">
        <AlertCircle className="h-4.5 w-4.5 text-brand-gold shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Local Line Variance Notice:</span> Broadband speeds and alternative full-fibre networks are highly variable across Wiltshire parishes. You might reside on an active street served by {activeProviders[0]?.providerName || "national brands"} while the next road is pending build completion. Always submit a query to verify current line parameters.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PROVIDERS AND CONTENT DIRECTORY */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* LOCAL PROVIDERS CONTAINER */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5 leading-none font-sans">
                <Building2 className="h-5 w-5 text-brand-gold" />
                Active & Build-Stage Providers in {town.name}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                The broadband providers listed below serve rural or urban premises within the {town.name} sectors. Check speeds carefully.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activeProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onEnquire={onEnquire}
                />
              ))}
            </div>
          </div>

          {/* BEST DEALS DECK IN THE REGION */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5 leading-none font-sans">
                <Landmark className="h-4.5 w-4.5 text-brand-gold" />
                Best Ranked Broadband Offers in {town.name}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ranks calculated across primary Wiltshire altnets and Openreach providers.
              </p>
            </div>
            
            <BestDealsSection onEnquire={onEnquire} limit={4} />
          </div>

          {/* HIGH VARIETY MUNICIPAL REVIEWS AND FAQS */}
          <div className="bg-[#12192c] border-2 border-slate-700/80 rounded-2xl p-5 md:p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-black uppercase tracking-wider text-brand-gold font-sans">
              Frequently Asked Questions for {town.name} Residents
            </h3>
            <div className="space-y-3 font-sans">
              {town.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-700/60 p-4 rounded-xl space-y-2">
                  <h4 className="text-xs font-black text-white flex items-start gap-1.5 leading-snug">
                    <HelpCircle className="h-4.5 w-4.5 text-brand-gold shrink-0 mt-0.5" />
                    {faq.question}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SIDE ACTIONS PANEL */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* SECURE DIRECT CONVERSION FORM */}
          <LeadForm
            preSelectedProvider={activeProviders[0]}
            className="sticky top-20 shadow-md"
          />

          {/* NEARBY VILLAGES AND PARISH BOUNDS LINK COMPASS */}
          <div className="bg-[#12192c] border-2 border-slate-700/80 rounded-2xl p-5 space-y-3.5 shadow-xl">
            <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1 leading-none font-sans">
              <Compass className="h-4 w-4 text-brand-gold" />
              Nearby Parishes & Towns
            </h4>
            <p className="text-[11px] text-slate-300 leading-normal font-semibold font-sans">
              Compare broadband infrastructure in neighboring local rural communities within Wiltshire:
            </p>
            <div className="flex flex-col gap-1.5 font-sans">
              {nearbyTowns.length > 0 ? (
                nearbyTowns.map((nTown) => (
                  <button
                    key={nTown.id}
                    onClick={() => onTownSelect(nTown.id)}
                    className="py-2.5 px-3 rounded-lg border border-slate-700 text-left bg-slate-900/50 hover:bg-brand-gold/15 hover:border-brand-gold transition-colors text-xs font-bold text-slate-100 flex justify-between items-center group cursor-pointer"
                  >
                    <span>{nTown.name}</span>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-brand-gold transition-all shrink-0" />
                  </button>
                ))
              ) : (
                town.nearbyTowns.map((vName, vIdx) => (
                  <div
                    key={vIdx}
                    className="py-2 px-3 bg-slate-900 border border-slate-800 rounded text-xs text-slate-450 select-none"
                  >
                    {vName} (Parish lines)
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* 8. Categorised SEO Internal Navigation Block */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 mt-8">
        <InternalSEOLinks
          onPageClick={onPageClick || (() => {})}
          onPostcodeClick={onPostcodeClick || (() => {})}
          onTownClick={onTownSelect}
          id="town-page-seo-links"
        />
      </div>

    </div>
  );
}
export default TownPage;
