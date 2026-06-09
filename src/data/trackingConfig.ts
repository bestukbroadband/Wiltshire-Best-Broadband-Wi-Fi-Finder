/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TrackingParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

/**
 * Builds a URL with complete UTM tracking parameters following Wiltshire Broadband Finder rules.
 * 
 * Default values:
 * - utm_source: wiltshire_broadband_finder
 * - utm_medium: referral
 * - utm_campaign: broadband_listing
 * - utm_content: provider_card
 * - utm_term: postcode_or_area
 */
export function buildTrackedUrl(
  baseUrl: string | undefined,
  campaignType: "default" | "weekly" | "postcode" | "sponsored" = "default",
  customParams: Partial<TrackingParams> = {}
): string {
  // If no URL exists, we shouldn't use an empty URL or #.
  // Instead, return an internal route or let the caller intercept it.
  if (!baseUrl || baseUrl === "" || baseUrl === "#") {
    // Return a path that activates the internal lead form
    return "#lead-form-trigger";
  }

  try {
    const urlObj = new URL(baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`);
    
    const defaults: TrackingParams = {
      utm_source: "wiltshire_broadband_finder",
      utm_medium: "referral",
      utm_campaign: "broadband_listing",
      utm_content: "provider_card",
      utm_term: "postcode_or_area",
    };

    // Override campaign based on campaignType
    if (campaignType === "weekly") {
      defaults.utm_campaign = "weekly_offer";
      defaults.utm_content = "weekly_highlight_card";
    } else if (campaignType === "postcode") {
      defaults.utm_campaign = "postcode_page";
      defaults.utm_content = "postcode_matches";
    } else if (campaignType === "sponsored") {
      defaults.utm_campaign = "sponsored_ad";
      defaults.utm_content = "sponsored_placement";
    }

    const finalParams = {
      ...defaults,
      ...customParams,
    };

    Object.entries(finalParams).forEach(([key, value]) => {
      if (value) {
        urlObj.searchParams.set(key, value);
      }
    });

    return urlObj.toString();
  } catch (e) {
    // Fallback if URL parsing fails
    let cleanedUrl = baseUrl;
    const separator = cleanedUrl.includes("?") ? "&" : "?";
    const utmSourceObj = customParams.utm_source || "wiltshire_broadband_finder";
    const utmMediumObj = customParams.utm_medium || "referral";
    let utmCampaignObj = customParams.utm_campaign || "broadband_listing";
    let utmContentObj = customParams.utm_content || "provider_card";
    const utmTermObj = customParams.utm_term || "postcode_or_area";

    if (campaignType === "weekly") {
      utmCampaignObj = "weekly_offer";
      utmContentObj = "weekly_highlight_card";
    } else if (campaignType === "postcode") {
      utmCampaignObj = "postcode_page";
      utmContentObj = "postcode_matches";
    } else if (campaignType === "sponsored") {
      utmCampaignObj = "sponsored_ad";
      utmContentObj = "sponsored_placement";
    }

    return `${cleanedUrl}${separator}utm_source=${encodeURIComponent(utmSourceObj)}&utm_medium=${encodeURIComponent(utmMediumObj)}&utm_campaign=${encodeURIComponent(utmCampaignObj)}&utm_content=${encodeURIComponent(utmContentObj)}&utm_term=${encodeURIComponent(utmTermObj)}`;
  }
}
