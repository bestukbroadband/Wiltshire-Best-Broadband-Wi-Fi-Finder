/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { providerLinksData } from "../data/providerLinks";
import { buildTrackedUrl } from "../data/trackingConfig";

/**
 * Safe fallback helper to retrieve the correct tracked CTA URL.
 * 
 * Logic flow:
 * 1. If offer.sourceUrl exists, use that.
 * 2. Else if provider availabilityCheckerUrl exists, use that.
 * 3. Else if provider broadbandDealsUrl exists, use that.
 * 4. Else if provider officialWebsite exists, use that.
 * 5. Else open internal contact form with provider and postcode context.
 */
export function getProviderCtaUrl(
  providerId: string | undefined,
  offer?: any,
  regionSlug?: string,
  postcodeArea?: string
): string {
  // 1. If offer has a customized sourceUrl or similar
  const offerUrl = offer?.sourceUrl || offer?.baseUrl || offer?.ctaUrl;
  
  if (offerUrl && offerUrl !== "#" && offerUrl !== "" && !offerUrl.includes("example.com")) {
    return buildTrackedUrl(offerUrl, "postcode", { 
      utm_term: postcodeArea || "postcode_or_area",
      utm_content: "offer_card" 
    });
  }

  if (!providerId) {
    return "#enquire";
  }

  const pKey = providerId.toLowerCase().trim();
  const linkInfo = providerLinksData[pKey];

  if (linkInfo && linkInfo.isActive) {
    // 2. Else if provider availabilityCheckerUrl exists, use that
    if (linkInfo.availabilityCheckerUrl && !linkInfo.availabilityCheckerUrl.includes("example.com")) {
      return buildTrackedUrl(linkInfo.availabilityCheckerUrl, "default", {
        utm_term: postcodeArea || "postcode_or_area",
        utm_content: "provider_card"
      });
    }
    // 3. Else if provider broadbandDealsUrl exists, use that
    if (linkInfo.broadbandDealsUrl && !linkInfo.broadbandDealsUrl.includes("example.com")) {
      return buildTrackedUrl(linkInfo.broadbandDealsUrl, "default", {
        utm_term: postcodeArea || "postcode_or_area",
        utm_content: "provider_card"
      });
    }
    // 4. Else if provider officialWebsite exists, use that
    if (linkInfo.officialWebsite && !linkInfo.officialWebsite.includes("example.com")) {
      return buildTrackedUrl(linkInfo.officialWebsite, "default", {
        utm_term: postcodeArea || "postcode_or_area",
        utm_content: "provider_card"
      });
    }
  }

  // 5. Else open internal contact form
  return "#enquire";
}

/**
 * Safe fallback helper to retrieve the correct button CTA label.
 * 
 * Logic flow:
 * 1. If availability is address_check_required, label is: Check address availability
 * 2. If source is a comparison source, label is: Compare deal
 * 3. If source is provider site, label is: View provider package
 * 4. If no external source exists, label is: Ask us to check this area
 */
export function getProviderCtaLabel(providerId: string | undefined, offer?: any): string {
  if (!providerId) {
    return "Ask us to check this area";
  }

  const pKey = providerId.toLowerCase().trim();
  const linkInfo = providerLinksData[pKey];

  // If no external link info exists at all
  if (!linkInfo || !linkInfo.isActive) {
    return "Ask us to check this area";
  }

  // 1. Check address_check_required state
  const availability = offer?.availability || offer?.availabilityStatus;
  const requiresCheck = availability === "address_check_required" || 
                        availability === "Address check required" ||
                        linkInfo.sourceType === "availability_checker";
  if (requiresCheck) {
    return "Check address availability";
  }

  // 2. Check if comparison source
  if (linkInfo.sourceType === "comparison_source") {
    return "Compare deal";
  }

  // 3. Check if provider page
  if (linkInfo.sourceType === "provider_page") {
    return "View provider package";
  }

  return "Check availability";
}
