/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ReusableSeoBlock {
  blockId: string;
  eyebrow: string;
  heading: string;
  intro: string;
  contentParagraphs: string[];
  bulletPoints: string[];
  editorNote?: string;
  ctaLabel?: string;
  ctaTarget?: string; // target action or slug
  relatedLinks?: { label: string; actionId: string }[];
}

export const reusableSeoBlocks: Record<string, ReusableSeoBlock> = {
  "how-we-compare": {
    blockId: "how-we-compare",
    eyebrow: "Our Comparison Standards",
    heading: "How we compare listed broadband options",
    intro: "We believe in establishing complete transparency and clarity when evaluating Wiltshire's digital networks.",
    contentParagraphs: [
      "We compare listed broadband options using the information available to this site, including monthly price, average speed, contract length, setup costs, router inclusion, known price changes, availability confidence and editor notes. Final pricing and availability must be confirmed by the provider."
    ],
    bulletPoints: [
      "Monthly subscription price & upfront setup fee evaluation",
      "Average download/upload speed compatibility checks",
      "Included router specs, physical installation & delivery overheads",
      "Term duration commitments & mid-contract price adjustment clauses"
    ],
    editorNote: "Always check the specific terms and conditions on the provider's active checkout screen as promotional offers change frequently.",
    ctaLabel: "See Best Broadband Deals",
    ctaTarget: "broadband-deals-wiltshire",
    relatedLinks: [
      { label: "Best Broadband Wiltshire Guide", actionId: "best-broadband-wiltshire" },
      { label: "Best Internet Providers List", actionId: "best-internet-provider-wiltshire" }
    ]
  },
  "why-postcode-checks-matter": {
    blockId: "why-postcode-checks-matter",
    eyebrow: "Wiltshire Coverage Guide",
    heading: "Why postcode checks matter",
    intro: "Wiltshire's unique layout combines historic buildings with deep parished valleys, creating highly localized network footprints.",
    contentParagraphs: [
      "Broadband availability can change from street to street, especially across rural Wiltshire. A package may be listed for a town or postcode area, but the provider will still need to confirm availability at address level before an order can be placed."
    ],
    bulletPoints: [
      "Street-level physical fibre line runs can terminate unexpectedly",
      "Cabinet and exchange distances directly govern copper backup speeds",
      "FTTP (Fibre to the Premises) layout checks map to exact property walls"
    ],
    editorNote: "Never rely on broad postcode-level claims alone. Be sure to request an address-specific physical check before ordering.",
    ctaLabel: "Check Your Postcode Availability",
    ctaTarget: "address-check",
    relatedLinks: [
      { label: "Rural Wiltshire Broadband Notes", actionId: "rural-broadband-wiltshire" },
      { label: "Alternative Networks Guide", actionId: "alternative-network-broadband-wiltshire" }
    ]
  },
  "what-makes-a-good-deal": {
    blockId: "what-makes-a-good-deal",
    eyebrow: "Savvy Buyer's Guide",
    heading: "What makes a good broadband deal",
    intro: "Securing a truly exceptional connection requires thinking far beyond the initial headline price.",
    contentParagraphs: [
      "A good broadband deal is not always the cheapest monthly price. Contract length, setup fees, router quality, price changes, upload speed, installation timing and reliability can all affect the real value of a package."
    ],
    bulletPoints: [
      "Contract length: 12, 18, versus index-linked 24-month cycles",
      "Hidden setup, activation, router shipping, and site check fees",
      "Symmetric upload speed ratios vital for creators & remote workers",
      "Wired reliability records & regional customer support response times"
    ],
    editorNote: "A contract featuring an inflation-proof price freeze lock is often much cheaper over 24 months than a slightly lower rate subject to double-digit price hikes.",
    ctaLabel: "Compare Wiltshire Deals",
    ctaTarget: "broadband-deals-wiltshire",
    relatedLinks: [
      { label: "Full Fibre FTTP Comparison", actionId: "full-fibre-broadband-wiltshire" },
      { label: "Best Broadband in Wiltshire", actionId: "best-broadband-wiltshire" }
    ]
  },
  "rural-broadband-notes": {
    blockId: "rural-broadband-notes",
    eyebrow: "Rural Connectivity",
    heading: "Rural Wiltshire broadband notes",
    intro: "Overcoming physical barriers in rural parished lines requires regional build awareness and alternative methods.",
    contentParagraphs: [
      "Rural homes may have fewer fixed line options than larger towns. In some areas, full fibre may be available. In others, wireless, 5G home broadband or satellite may be worth checking. The best option depends on the exact property and how the connection will be used."
    ],
    bulletPoints: [
      "Rural altnet expansions bypassing major telecom corridors",
      "High-speed Fixed Wireless Access (FWA) point-to-point networks",
      "Starlink LEO sat dishes delivering coverage in tree-blocked zones",
      "Eligible community voucher schemes subsidizing the installation cost"
    ],
    editorNote: "Independent alternative networks (altnets) routinely establish state-of-the-art fibre ducts across Wiltshire parishes that standard national networks bypass.",
    ctaLabel: "Review Rural Wiltshire Broadbands",
    ctaTarget: "rural-broadband-wiltshire",
    relatedLinks: [
      { label: "Alternate Networks Wiltshire Guide", actionId: "alternative-network-broadband-wiltshire" },
      { label: "Postcode Coverage Hub Finder", actionId: "home" }
    ]
  },
  "wifi-vs-broadband-speed": {
    blockId: "wifi-vs-broadband-speed",
    eyebrow: "Home Networking Insights",
    heading: "WiFi versus broadband speed",
    intro: "Understanding where the signal gets bottlenecked prevents frustrating indoor speed drops.",
    contentParagraphs: [
      "Broadband speed is the connection coming into the home. WiFi is the wireless signal inside the home. A fast broadband package can still feel poor if the router is weak, the house has thick walls or devices are far from the router."
    ],
    bulletPoints: [
      "Modem sync rate measures external feed pipe speed purely",
      "Wireless attenuation caused by flint, traditional stone or plaster walls",
      "Configuring robust mesh Wi-Fi nodes to reach dead-spot expansions",
      "Frequency interference from household appliances on standard bands"
    ],
    editorNote: "For premium activities like UHD streaming or online gaming, connecting via a physical Ethernet cable rules out wireless dropouts.",
    ctaLabel: "Explore Best WiFi Guide",
    ctaTarget: "best-wifi-wiltshire",
    relatedLinks: [
      { label: "Home WiFi and Router Guide", actionId: "best-wifi-wiltshire" },
      { label: "Full Fibre speeds compared", actionId: "full-fibre-broadband-wiltshire" }
    ]
  }
};
