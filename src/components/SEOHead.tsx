/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { SeoPageData } from "../types";
import { JsonLdSchema } from "./JsonLdSchema";

interface SEOHeadProps {
  seoData: SeoPageData;
}

export function SEOHead({ seoData }: SEOHeadProps) {
  useEffect(() => {
    // 1. Update document title
    document.title = seoData.pageTitle || seoData.metaTitle;

    // Helper to find or create a meta tag
    const updateOrCreateMeta = (nameAttr: "name" | "property", val: string, content: string) => {
      if (!content) return;
      let el = document.querySelector(`meta[${nameAttr}="${val}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameAttr, val);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Set description
    updateOrCreateMeta("name", "description", seoData.metaDescription);

    // 3. Set canonical URL link
    if (seoData.canonicalUrl) {
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", seoData.canonicalUrl);
    }

    // 4. Open Graph (OG)
    updateOrCreateMeta("property", "og:title", seoData.ogTitle || seoData.pageTitle);
    updateOrCreateMeta("property", "og:description", seoData.ogDescription || seoData.metaDescription);
    updateOrCreateMeta("property", "og:image", seoData.ogImage);
    updateOrCreateMeta("property", "og:url", seoData.canonicalUrl);
    updateOrCreateMeta("property", "og:type", "website");

    // 5. Twitter Meta Tags
    updateOrCreateMeta("name", "twitter:card", "summary_large_image");
    updateOrCreateMeta("name", "twitter:title", seoData.twitterTitle || seoData.ogTitle);
    updateOrCreateMeta("name", "twitter:description", seoData.twitterDescription || seoData.ogDescription);
    updateOrCreateMeta("name", "twitter:image", seoData.twitterImage);

    // 6. Keywords
    if (seoData.primaryKeyword) {
      const keywords = [seoData.primaryKeyword, ...(seoData.secondaryKeywords || [])].join(", ");
      updateOrCreateMeta("name", "keywords", keywords);
    }

    // 7. Robots (index/noindex)
    const robotsVal = seoData.indexStatus === "noindex" ? "noindex, follow" : "index, follow";
    updateOrCreateMeta("name", "robots", robotsVal);
  }, [seoData]);

  // Handle rich JSON-LD parsing safely
  let parsedSchema: object | null = null;
  try {
    if (seoData.schemaJson) {
      parsedSchema = typeof seoData.schemaJson === "string" 
        ? JSON.parse(seoData.schemaJson)
        : seoData.schemaJson;
    }
  } catch (error) {
    console.error("Failed to parse scheme JSON for:", seoData.slug, error);
  }

  return (
    <>
      {parsedSchema && (
        <JsonLdSchema schema={parsedSchema} id={`seo-page-${seoData.slug || "home"}`} />
      )}
    </>
  );
}

export default SEOHead;
