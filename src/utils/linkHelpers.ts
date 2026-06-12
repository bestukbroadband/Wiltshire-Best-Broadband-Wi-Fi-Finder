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
): string | undefined {
  // 1. If offer has a customized sourceUrl or similar
  const offerUrl = offer?.sourceUrl || offer?.baseUrl || offer?.ctaUrl;
  
  if (offerUrl && offerUrl !== "#" && offerUrl !== "" && !offerUrl.includes("example.com")) {
    return buildTrackedUrl(offerUrl, "postcode", { 
      utm_term: postcodeArea || "postcode_or_area",
      utm_content: "offer_card" 
    });
  }

  if (!providerId) {
    return undefined;
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

  // 5. Fallback - no link found (do not send to contact form)
  return undefined;
}

/**
 * Safe fallback helper to retrieve the correct button CTA label.
 */
export function getProviderCtaLabel(providerId: string | undefined, offer?: any): string {
  const url = getProviderCtaUrl(providerId, offer);
  if (!url) {
    return "Provider link being reviewed";
  }

  if (!providerId) {
    return "Check availability";
  }

  const pKey = providerId.toLowerCase().trim();
  const linkInfo = providerLinksData[pKey];

  if (!linkInfo || !linkInfo.isActive) {
    return "Check availability";
  }

  // Check availability vs. details
  if (linkInfo.availabilityCheckerUrl) {
    return "Check availability";
  } else if (linkInfo.broadbandDealsUrl) {
    return "View provider packages";
  } else if (linkInfo.officialWebsite) {
    return "Visit provider";
  }

  return "Check availability";
}
