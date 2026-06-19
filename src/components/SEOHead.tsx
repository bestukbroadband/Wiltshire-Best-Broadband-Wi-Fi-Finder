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

    // Helper to resolve absolute URL dynamically
    const resolveAbsoluteUrl = (urlStr: string) => {
      if (!urlStr) return window.location.origin + "/logo.png";
      
      // If it's a placeholder image or points to /images/ that doesn't exist physically, fallback to the beautiful logo.png
      if (urlStr.includes("/images/og-") || urlStr.includes("/images/twitter-")) {
        return window.location.origin + "/logo.png";
      }

      // If it's already an absolute external url and doesn't belong to our domain
      if (urlStr.startsWith("http") && !urlStr.includes("wiltshirebroadbandfinder.co.uk")) {
        return urlStr;
      }

      let pathVal = urlStr;
      if (urlStr.startsWith("https://www.wiltshirebroadbandfinder.co.uk")) {
        pathVal = urlStr.replace("https://www.wiltshirebroadbandfinder.co.uk", "");
      } else if (urlStr.startsWith("http://www.wiltshirebroadbandfinder.co.uk")) {
        pathVal = urlStr.replace("http://www.wiltshirebroadbandfinder.co.uk", "");
      }

      if (!pathVal.startsWith("/")) {
        pathVal = "/" + pathVal;
      }

      return window.location.origin + pathVal;
    };

    const resolvedOgImage = resolveAbsoluteUrl(seoData.ogImage);
    const resolvedTwitterImage = resolveAbsoluteUrl(seoData.twitterImage);

    // 4. Open Graph (OG)
    updateOrCreateMeta("property", "og:title", seoData.ogTitle || seoData.pageTitle);
    updateOrCreateMeta("property", "og:description", seoData.ogDescription || seoData.metaDescription);
    updateOrCreateMeta("property", "og:image", resolvedOgImage);
    updateOrCreateMeta("property", "og:url", seoData.canonicalUrl);
    updateOrCreateMeta("property", "og:type", "website");

    // 5. Twitter Meta Tags
    updateOrCreateMeta("name", "twitter:card", "summary");
    updateOrCreateMeta("name", "twitter:title", seoData.twitterTitle || seoData.ogTitle);
    updateOrCreateMeta("name", "twitter:description", seoData.twitterDescription || seoData.ogDescription);
    updateOrCreateMeta("name", "twitter:image", resolvedTwitterImage);

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
