/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

export interface SEOInternalLink {
  label: string;
  targetId: string; // The activeTab page ID, postcode prefix, town ID, or provider category
  type: "seo-page" | "postcode" | "town" | "provider" | "broadband-type" | "guide";
  url: string;      // Simulated URL path for search indexing
}

// 1. Main SEO Pages Group
export const mainSeoPages: SEOInternalLink[] = [
  {
    label: "Best broadband in Wiltshire",
    targetId: "best-broadband-wiltshire",
    type: "seo-page",
    url: "https://www.wiltshirebroadbandfinder.co.uk/guide/best-broadband-in-wiltshire"
  },
  {
    label: "Best WiFi in Wiltshire",
    targetId: "best-wifi-wiltshire",
    type: "seo-page",
    url: "https://www.wiltshirebroadbandfinder.co.uk/guide/best-wifi-in-wiltshire"
  },
  {
    label: "Best internet provider in Wiltshire",
    targetId: "best-internet-provider-wiltshire",
    type: "seo-page",
    url: "https://www.wiltshirebroadbandfinder.co.uk/guide/best-internet-provider-in-wiltshire"
  }
];

// 2. Postcode Pages Group
export const postcodePages: SEOInternalLink[] = [
  {
    label: "Broadband in SN10",
    targetId: "SN10",
    type: "postcode",
    url: "https://www.wiltshirebroadbandfinder.co.uk/broadband/sn10_devizes"
  },
  {
    label: "Broadband in BA14",
    targetId: "BA14",
    type: "postcode",
    url: "https://www.wiltshirebroadbandfinder.co.uk/broadband/ba14_trowbridge_midsomer"
  },
  {
    label: "Broadband in SP1",
    targetId: "SP1",
    type: "postcode",
    url: "https://www.wiltshirebroadbandfinder.co.uk/broadband/sp1_salisbury_center"
  }
];

// 3. Town Pages Group
export const townPages: SEOInternalLink[] = [
  {
    label: "Broadband in Devizes",
    targetId: "devizes",
    type: "town",
    url: "https://www.wiltshirebroadbandfinder.co.uk/town/devizes"
  },
  {
    label: "Broadband in Trowbridge",
    targetId: "trowbridge",
    type: "town",
    url: "https://www.wiltshirebroadbandfinder.co.uk/town/trowbridge"
  },
  {
    label: "Broadband in Salisbury",
    targetId: "salisbury",
    type: "town",
    url: "https://www.wiltshirebroadbandfinder.co.uk/town/salisbury"
  },
  {
    label: "Broadband in Chippenham",
    targetId: "chippenham",
    type: "town",
    url: "https://www.wiltshirebroadbandfinder.co.uk/town/chippenham"
  },
  {
    label: "Broadband in Marlborough",
    targetId: "marlborough",
    type: "town",
    url: "https://www.wiltshirebroadbandfinder.co.uk/town/marlborough"
  }
];

// 4. Provider Guides/Pages Group
export const providerPages: SEOInternalLink[] = [
  {
    label: "Trooli Broadband Wiltshire",
    targetId: "alt-net", // targets altnet list
    type: "provider",
    url: "https://www.wiltshirebroadbandfinder.co.uk/providers#trooli"
  },
  {
    label: "Wessex Internet Wiltshire",
    targetId: "alt-net",
    type: "provider",
    url: "https://www.wiltshirebroadbandfinder.co.uk/providers#wessex"
  },
  {
    label: "Gigaclear Broadband Wiltshire",
    targetId: "alt-net",
    type: "provider",
    url: "https://www.wiltshirebroadbandfinder.co.uk/providers#gigaclear"
  },
  {
    label: "Truespeed Broadband Wiltshire",
    targetId: "alt-net",
    type: "provider",
    url: "https://www.wiltshirebroadbandfinder.co.uk/providers#truespeed"
  }
];

// 5. Broadband Type Pages Group
export const broadbandTypePages: SEOInternalLink[] = [
  {
    label: "Rural broadband in Wiltshire",
    targetId: "best-rural-broadband-wiltshire",
    type: "broadband-type",
    url: "https://www.wiltshirebroadbandfinder.co.uk/guide/best-rural-broadband-in-wiltshire"
  },
  {
    label: "Full fibre broadband in Wiltshire",
    targetId: "full-fibre-broadband-wiltshire",
    type: "broadband-type",
    url: "https://www.wiltshirebroadbandfinder.co.uk/guide/full-fibre-broadband-wiltshire"
  },
  {
    label: "Alternative network broadband in Wiltshire",
    targetId: "alternative-network-broadband-wiltshire",
    type: "broadband-type",
    url: "https://www.wiltshirebroadbandfinder.co.uk/guide/alternative-network-broadband-wiltshire"
  }
];

// 6. Guide Pages Group
export const guidePages: SEOInternalLink[] = [
  {
    label: "Rural Villages and Towns Guide",
    targetId: "best-rural-broadband-villages-towns",
    type: "guide",
    url: "https://www.wiltshirebroadbandfinder.co.uk/guide/best-broadband-for-rural-wiltshire-villages-and-towns"
  },
  {
    label: "Wiltshire Broadband Deals",
    targetId: "broadband-deals-wiltshire",
    type: "guide",
    url: "https://www.wiltshirebroadbandfinder.co.uk/guide/broadband-deals-wiltshire"
  },
  {
    label: "Broadband Providers Wiltshire",
    targetId: "broadband-providers-wiltshire",
    type: "guide",
    url: "https://www.wiltshirebroadbandfinder.co.uk/guide/broadband-providers-wiltshire"
  }
];
