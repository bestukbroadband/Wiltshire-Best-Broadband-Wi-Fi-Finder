/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { ArrowRight, HelpCircle } from "lucide-react";
import { SeoPageData, Provider } from "../types";
import { SeoIntroBlock } from "./SeoIntroBlock";
import { SeoContentBlock } from "./SeoContentBlock";
import { RelatedPostcodeLinks } from "./RelatedPostcodeLinks";
import { RelatedTownLinks } from "./RelatedTownLinks";
import { RelatedProviderLinks } from "./RelatedProviderLinks";
import { SeoFaqSection } from "./SeoFaqSection";
import { InternalLinkGrid } from "./InternalLinkGrid";
import { LastUpdatedNotice } from "./LastUpdatedNotice";
import { InternalSEOLinks } from "./InternalSEOLinks";
import { reusableSeoBlocks, ReusableSeoBlock } from "../data/reusableSeoBlocks";
import { JsonLdSchema } from "./JsonLdSchema";
import { providersData } from "../data/providers";
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

interface SeoPageTemplateProps {
  seoData: SeoPageData;
  onPostcodeClick: (prefix: string) => void;
  onTownClick: (id: string) => void;
  onPageClick: (pageId: string) => void;
  onEnquire: (provider: Provider) => void;
  onTriggerAddressCheck: () => void;
}

export function SeoPageTemplate({
  seoData,
  onPostcodeClick,
  onTownClick,
  onPageClick,
  onEnquire,
  onTriggerAddressCheck,
}: SeoPageTemplateProps) {
  
  // Synchronous and dynamic JSON-LD Schema implementations
  const websiteSchema = createWebsiteSchema();
  const organisationSchema = createOrganisationSchema();
  
  const webpageSchema = createWebPageSchema(
    seoData.pageTitle || seoData.metaTitle,
    seoData.metaDescription,
    seoData.canonicalUrl || `https://www.wiltshirebroadbandfinder.co.uk/guide/${seoData.slug}`,
    seoData.primaryKeyword || "Wiltshire broadband connection",
    "2026-06-08T12:05:14Z"
  );

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://www.wiltshirebroadbandfinder.co.uk/" },
    { name: seoData.metaTitle || seoData.pageTitle, url: seoData.canonicalUrl || `https://www.wiltshirebroadbandfinder.co.uk/guide/${seoData.slug}` }
  ]);

  const faqSchema = seoData.faqItems && seoData.faqItems.length > 0
    ? createFAQSchema(seoData.faqItems)
    : null;

  // Query relevant providers for this SEO page
  const targetedProv = seoData.postcodeTargets && seoData.postcodeTargets.length > 0
    ? providersData.filter(p => p.postcodeAreas?.some(area => seoData.postcodeTargets.includes(area)))
    : (seoData.townTargets && seoData.townTargets.length > 0
       ? providersData.filter(p => p.townsCovered?.some(town => seoData.townTargets.includes(town)))
       : providersData.slice(0, 5));

  const itemListSchema = createItemListSchema(
    targetedProv.slice(0, 6).map((p, idx) => ({
      position: idx + 1,
      name: `Listed provider options: ${p.providerName}`,
      url: `https://www.wiltshirebroadbandfinder.co.uk/provider/${p.id}`
    }))
  );

  const offerSchemas = targetedProv.slice(0, 2).map((p) => {
    return createOfferSchema(
      p.packageName || "Listed Speed Tier Connection",
      p.monthlyPriceFrom || p.monthlyPrice || 29.99,
      "GBP",
      p.providerName,
      `https://www.wiltshirebroadbandfinder.co.uk/provider/${p.id}`
    );
  });

  const reviewSchema = targetedProv.length > 0
    ? createReviewSchema(
        targetedProv[0].providerName,
        (targetedProv[0].rankingScore || 85) / 10,
        targetedProv[0].description || "Recognized regional broadband options listed."
      )
    : createReviewSchema(
        "Wiltshire Broadband Options",
        8.5,
        "Highly-rated broadband listed deals for rural villages."
      );

  const serviceSchema = createServiceSchema(
    seoData.h1 || "Wiltshire Broadband Service Comparison Information"
  );

  // Dynamic block determination helper
  const getRelevantBlocks = (pageId: string): ReusableSeoBlock[] => {
    const list: ReusableSeoBlock[] = [];
    const lowerId = pageId.toLowerCase();
    
    if (lowerId.includes("wifi")) {
      list.push(reusableSeoBlocks["wifi-vs-broadband-speed"]);
      list.push(reusableSeoBlocks["what-makes-a-good-deal"]);
    } else if (lowerId.includes("rural") || lowerId.includes("village")) {
      list.push(reusableSeoBlocks["rural-broadband-notes"]);
      list.push(reusableSeoBlocks["why-postcode-checks-matter"]);
    } else if (lowerId.includes("deal") || lowerId.includes("fibre") || lowerId.includes("fibre")) {
      list.push(reusableSeoBlocks["what-makes-a-good-deal"]);
      list.push(reusableSeoBlocks["how-we-compare"]);
    } else if (lowerId.includes("provider") || lowerId.includes("internet") || lowerId.includes("broadband")) {
      list.push(reusableSeoBlocks["how-we-compare"]);
      list.push(reusableSeoBlocks["why-postcode-checks-matter"]);
    } else {
      list.push(reusableSeoBlocks["how-we-compare"]);
      list.push(reusableSeoBlocks["what-makes-a-good-deal"]);
    }
    return list;
  };

  const handleBlockAction = (target: string) => {
    if (target === "address-check") {
      onTriggerAddressCheck();
    } else {
      onPageClick(target);
    }
  };

  const relevantBlocks = getRelevantBlocks(seoData.pageId || "");

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2 px-1" id={`seo-page-${seoData.pageId || "unnamed"}`}>
      {/* Dynamic JSON-LD Structured Markups */}
      <JsonLdSchema schema={websiteSchema} id={`website-schema-${seoData.pageId || "seo"}`} />
      <JsonLdSchema schema={organisationSchema} id={`org-schema-${seoData.pageId || "seo"}`} />
      <JsonLdSchema schema={webpageSchema} id={`webpage-schema-${seoData.pageId || "seo"}`} />
      <JsonLdSchema schema={breadcrumbSchema} id={`breadcrumb-schema-${seoData.pageId || "seo"}`} />
      {faqSchema && <JsonLdSchema schema={faqSchema} id={`faq-schema-${seoData.pageId || "seo"}`} />}
      <JsonLdSchema schema={itemListSchema} id={`itemlist-schema-${seoData.pageId || "seo"}`} />
      {offerSchemas.map((offer, oIdx) => (
        <JsonLdSchema key={oIdx} schema={offer} id={`offer-schema-${seoData.pageId || "seo"}-${oIdx}`} />
      ))}
      <JsonLdSchema schema={reviewSchema} id={`review-schema-${seoData.pageId || "seo"}`} />
      <JsonLdSchema schema={serviceSchema} id={`service-schema-${seoData.pageId || "seo"}`} />

      {/* 1. Introductory Block */}
      <SeoIntroBlock seoData={seoData} />

      {/* 2. Structured Content assessment Block */}
      <SeoContentBlock seoData={seoData} />

      {/* 2.5 Expert Insights Grid */}
      {relevantBlocks.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-extrabold text-white tracking-tight font-sans flex items-center gap-2">
              <HelpCircle className="h-5.5 w-5.5 text-brand-gold" />
              Wiltshire Broadband Consumer Handbook
            </h3>
            <p className="text-xs text-slate-450 font-medium">
              Important factors to review before committing to a broadband subscription.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relevantBlocks.map((block) => (
              <SeoContentBlock
                key={block.blockId}
                eyebrow={block.eyebrow}
                heading={block.heading}
                intro={block.intro}
                contentParagraphs={block.contentParagraphs}
                bulletPoints={block.bulletPoints}
                editorNote={block.editorNote}
                ctaLabel={block.ctaLabel}
                ctaTarget={block.ctaTarget}
                relatedLinks={block.relatedLinks}
                onAction={handleBlockAction}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. STRONG LEAD GENERATION CALL TO ACTION */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 border-2 border-indigo-500 rounded-3xl p-6 sm:p-8 text-center text-white shadow-lg space-y-5">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight">
          Request an Address-Level Physical Switch Check
        </h3>
        <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl mx-auto leading-relaxed">
          Speeds and listed prices vary from street to street. Protect your family or business against incorrect online estimates. Our team runs direct structural checks with altnets to verify exact glass fibre locations.
        </p>
        <button
          type="button"
          onClick={onTriggerAddressCheck}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-gold hover:bg-brand-gold-dark text-slate-905 font-black font-sans text-sm sm:text-base border-b-4 border-amber-650 hover:border-amber-700 transition-all hover:scale-[1.02] shadow-md focus:outline-none cursor-pointer"
        >
          {seoData.ctaLabel || "Check Postcode Availability Now"}
          <ArrowRight className="h-4 w-4 stroke-[3px]" />
        </button>
      </div>

      {/* 4. Active Regional Providers targeting these exact parameters */}
      <RelatedProviderLinks
        postcodeTargets={seoData.postcodeTargets}
        townTargets={seoData.townTargets}
        onEnquire={onEnquire}
      />

      {/* 5. Target postcodes in Wiltshire */}
      <RelatedPostcodeLinks
        postcodeTargets={seoData.postcodeTargets}
        onPostcodeClick={onPostcodeClick}
      />

      {/* 6. Target Towns covered */}
      <RelatedTownLinks
        townTargets={seoData.townTargets}
        onTownClick={onTownClick}
      />

      {/* 7. Accordion FAQs */}
      <SeoFaqSection faqItems={seoData.faqItems} />

      {/* 8. Internal Navigation list cards */}
      <InternalLinkGrid
        relatedPages={seoData.relatedPages || []}
        onPageClick={onPageClick}
      />

      {/* 8.5. Comprehensive Categorised Internal Links */}
      <InternalSEOLinks 
        onPageClick={onPageClick}
        onPostcodeClick={onPostcodeClick}
        onTownClick={onTownClick}
        id="seo-page-internal-seo-links"
      />

      {/* 9. Authority publisher sign-off notice */}
      <LastUpdatedNotice seoData={seoData} />
    </div>
  );
}

export default SeoPageTemplate;
