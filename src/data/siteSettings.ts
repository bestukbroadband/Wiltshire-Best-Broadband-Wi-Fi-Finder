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
    heroSubheading: "Compare full fibre networks, alternative networks, 5G home broadband, wireless and national providers across Wiltshire. Search your town, village or postcode area and stay updated.",
    ctaPrimary: "Get Wiltshire broadband updates",
    ctaSecondary: "List your service",
    supportingMessage: "Broadband availability across Wiltshire can change from road to road. One village may have full fibre while the next may still rely on older connections. Wiltshire Broadband Finder helps you compare local and national providers, and sign up for occasional updates about rural connectivity news and provider changes."
  },
  disclaimers: {
    footerCopyright: "© 2026 Cane Communications Limited. Company number 11485145. All rights reserved.",
    footerTradingStyle: "Wiltshire Broadband Finder is a trading style of Cane Communications Limited.",
    legalCompliance: "Wiltshire Broadband Finder is an independent local broadband information site. We do not sell broadband directly. Always confirm availability, speeds, pricing and contract terms with the provider before ordering. Sponsored listings and adverts are clearly marked.",
    commissionNotice: "We may receive referral fees, commission, advertising income or sponsorship support from providers listed on this site. This does not affect the price you pay.",
    marketLimitNotice: "We list selected mainstream, local and alternative network providers that may serve Wiltshire homes.",
    complianceStyleWording: {
      noUnsupportedClaims: [
        "Do not make unsupported claims such as: Best provider in Wiltshire, Guaranteed cheapest deal, Guaranteed fastest broadband, Guaranteed availability, Guaranteed speed.",
        "Instead, use careful wording: Best match, Featured deal, Popular option, Strong value, Fastest listed package, Lowest listed monthly price, Subject to provider confirmation, Final terms confirmed by provider."
      ]
    },
    localResultsDisclaimer: "Results are an initial local match. We do not sell broadband directly. Always confirm availability, pricing, speeds and contract terms directly on the provider's website."
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
        title: "Stay updated",
        description: "Sign up for updates about new packages, rural connectivity improvements, and network developments across Wiltshire."
      }
    ],
    note: "We do not sell broadband directly. Always confirm availability, pricing, speeds andcontract terms directly on the provider's website."
  }
};
export type SiteSettings = typeof siteSettingsData;
