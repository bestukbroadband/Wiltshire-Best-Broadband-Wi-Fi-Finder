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
    heroTitle: "Find local broadband options for Wiltshire villages and towns",
    heroSubheading: "Compare full fibre networks, alternative networks, 5G home broadband, wireless and national providers across Wiltshire. Search your town, village or postcode area and request an address-level check.",
    ctaPrimary: "Check my postcode",
    ctaSecondary: "List your service",
    supportingMessage: "Broadband availability across Wiltshire can change from road to road. One village may have full fibre while the next may still rely on older connections. Wiltshire Broadband Finder helps you compare local and national providers, check likely availability and request a proper address-level review before choosing."
  },
  disclaimers: {
    footerCopyright: "© 2026 Cane Communications Limited. Company number 11485145. All rights reserved.",
    footerTradingStyle: "Wiltshire Broadband Finder is a trading style of Cane Communications Limited.",
    legalCompliance: "Wiltshire Broadband Finder is an independent broadband listing and enquiry site. We are not a broadband provider and do not sell broadband contracts directly. Prices, speeds, contract terms and availability can vary by address and require direct provider check. Sponsored listings and adverts are clearly marked.",
    commissionNotice: "We may receive referral fees, commission, advertising income or sponsorship support from providers listed on this site. This does not affect the price you pay.",
    marketLimitNotice: "We list selected mainstream, local and alternative network providers that may serve Wiltshire homes.",
    complianceStyleWording: {
      noUnsupportedClaims: [
        "Do not make unsupported claims such as: Best provider in Wiltshire, Guaranteed cheapest deal, Guaranteed fastest broadband, Guaranteed availability, Guaranteed speed.",
        "Instead, use careful wording: Best match, Featured deal, Popular option, Strong value, Fastest listed package, Lowest listed monthly price, Subject to provider confirmation, Final terms confirmed by provider."
      ]
    },
    localResultsDisclaimer: "Results are an initial local match. Final availability, speed, price and contract terms must be confirmed by the provider using your full address."
  },
  howItWorks: {
    steps: [
      {
        stepNumber: "01",
        title: "Search your locale",
        description: "Type in your Wiltshire town, village, or part postcode to find active operators in your postcode zone."
      },
      {
        stepNumber: "02",
        title: "Compare listed options",
        description: "Filter by speed, altnets vs national, monthly rates, or contract terms next to each matching card."
      },
      {
        stepNumber: "03",
        title: "Request address check",
        description: "Submit our short form. We perform an address-level check to find which listed options serve your home."
      }
    ],
    note: "All listed options require a full address check. Final availability, pricing, speeds and terms are confirmed directly by the provider before ordering."
  }
};
export type SiteSettings = typeof siteSettingsData;
