/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const siteSettingsData = {
  brandName: "Wiltshire Broadband Finder",
  fullBrandName: "Broadband Listings for Wiltshire Villages and Towns",
  owner: {
    companyName: "Cane Communications Limited",
    companyNumber: "11485145",
    registeredOffice: "United Kingdom",
    contactEmail: "bestukbroaband@proton.me"
  },
  headlines: {
    heroTitle: "Best broadband in Wiltshire",
    heroSubheading: "Check listed broadband, WiFi and internet provider options across Wiltshire towns, villages and postcode areas. Enter your postcode area to see providers and availability checkers to try.",
    ctaPrimary: "Get Wiltshire broadband updates",
    ctaSecondary: "List your service",
    supportingMessage: "Wiltshire Broadband Finder helps you check listed broadband and WiFi options across towns, villages and rural postcode areas. We group national providers, regional broadband networks, full fibre options, mobile broadband and satellite choices so you can quickly open the right provider checkers."
  },
  disclaimers: {
    footerCopyright: "© 2026 Cane Communications Limited. Company number 11485145. All rights reserved.",
    footerTradingStyle: "Wiltshire Broadband Finder is an independent local broadband information guide.",
    legalCompliance: "Wiltshire Broadband Finder does not sell broadband directly. Always confirm availability, speeds, pricing, installation and contract terms with the provider before ordering.",
    commissionNotice: "We may receive referral fees, commission, advertising income or sponsorship support from providers listed on this site. This does not affect the price you pay.",
    marketLimitNotice: "We list selected mainstream, local and alternative network providers that may serve Wiltshire homes.",
    complianceStyleWording: {
      noUnsupportedClaims: [
        "Do not make unsupported claims such as: Best provider in Wiltshire, Guaranteed cheapest deal, Guaranteed fastest broadband, Guaranteed availability, Guaranteed speed.",
        "Instead, use careful wording: Best match, Featured deal, Popular option, Strong value, Fastest listed package, Lowest listed monthly price, Subject to provider confirmation, Final terms confirmed by provider."
      ]
    },
    localResultsDisclaimer: "Availability varies by exact address. Always confirm speeds, prices and contract terms with the provider before ordering."
  },
  howItWorks: {
    steps: [
      {
        stepNumber: "01",
        title: "Enter your postcode area",
        description: "Search by Wiltshire postcode district, such as SN10, SN12, SN15, BA14 or SP1."
      },
      {
        stepNumber: "02",
        title: "See providers to check",
        description: "We show national, regional and alternative providers that may be relevant to that area."
      },
      {
        stepNumber: "03",
        title: "Confirm with the provider",
        description: "Use provider checkers to confirm exact availability, speed, installation and price."
      }
    ],
    note: "Broadband availability across Wiltshire can change from road to road. Always check exact local coverage on the provider's official checkers."
  }
};
export type SiteSettings = typeof siteSettingsData;
