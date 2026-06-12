/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProviderLink {
  providerId: string;
  providerName: string;
  officialWebsite: string;
  availabilityCheckerUrl: string;
  broadbandDealsUrl?: string;
  customerSupportUrl?: string;
  sourceType: string;
  defaultCtaLabel?: string;
  notes?: string;
  isActive: boolean;
}

export const providerLinksData: Record<string, ProviderLink> = {
  zzoomm: {
    providerId: "zzoomm",
    providerName: "Zzoomm",
    officialWebsite: "https://zzoomm.com/",
    availabilityCheckerUrl: "https://zzoomm.com/buy/check",
    broadbandDealsUrl: "https://zzoomm.com/full-fibre-broadband-in-my-area",
    sourceType: "provider_page",
    isActive: true
  },
  airband: {
    providerId: "airband",
    providerName: "Airband",
    officialWebsite: "https://www.airband.co.uk/",
    availabilityCheckerUrl: "https://www.airband.co.uk/check-availability/",
    sourceType: "provider_page",
    isActive: true
  },
  trooli: {
    providerId: "trooli",
    providerName: "Trooli",
    officialWebsite: "https://www.trooli.com/",
    availabilityCheckerUrl: "https://www.trooli.com/check-availability/",
    sourceType: "provider_page",
    isActive: true
  },
  wessex: {
    providerId: "wessex",
    providerName: "Wessex Internet",
    officialWebsite: "https://www.wessexinternet.com/",
    availabilityCheckerUrl: "https://www.wessexinternet.com/check-availability/",
    broadbandDealsUrl: "https://www.wessexinternet.com/wiltshire-broadband/",
    sourceType: "provider_page",
    isActive: true
  },
  truespeed: {
    providerId: "truespeed",
    providerName: "Truespeed",
    officialWebsite: "https://www.truespeed.com/",
    availabilityCheckerUrl: "https://www.truespeed.com/check-availability/",
    sourceType: "provider_page",
    isActive: true
  },
  gigaclear: {
    providerId: "gigaclear",
    providerName: "Gigaclear",
    officialWebsite: "https://www.gigaclear.com/",
    availabilityCheckerUrl: "https://www.gigaclear.com/check-availability/",
    sourceType: "provider_page",
    isActive: true
  },
  voneus: {
    providerId: "voneus",
    providerName: "Voneus",
    officialWebsite: "https://www.voneus.com/",
    availabilityCheckerUrl: "https://www.voneus.com/check-availability/",
    sourceType: "provider_page",
    isActive: true
  },
  openreach: {
    providerId: "openreach",
    providerName: "Openreach",
    officialWebsite: "https://www.openreach.com/",
    availabilityCheckerUrl: "https://www.openreach.com/fibre-checker",
    sourceType: "availability_checker",
    isActive: true
  },
  ofcom: {
    providerId: "ofcom",
    providerName: "Ofcom",
    officialWebsite: "https://www.ofcom.org.uk/",
    availabilityCheckerUrl: "https://checker.ofcom.org.uk/en-gb/broadband-coverage",
    sourceType: "availability_checker",
    isActive: true
  },
  bt: {
    providerId: "bt",
    providerName: "BT",
    officialWebsite: "https://www.bt.com/",
    availabilityCheckerUrl: "https://www.bt.com/broadband",
    sourceType: "provider_page",
    isActive: true
  },
  ee: {
    providerId: "ee",
    providerName: "EE",
    officialWebsite: "https://ee.co.uk/",
    availabilityCheckerUrl: "https://ee.co.uk/broadband",
    sourceType: "provider_page",
    isActive: true
  },
  sky: {
    providerId: "sky",
    providerName: "Sky",
    officialWebsite: "https://www.sky.com/",
    availabilityCheckerUrl: "https://www.sky.com/broadband",
    sourceType: "provider_page",
    isActive: true
  },
  now: {
    providerId: "now",
    providerName: "NOW Broadband",
    officialWebsite: "https://www.nowtv.com/",
    availabilityCheckerUrl: "https://www.nowtv.com/broadband",
    sourceType: "provider_page",
    isActive: true
  },
  talktalk: {
    providerId: "talktalk",
    providerName: "TalkTalk",
    officialWebsite: "https://www.talktalk.co.uk/",
    availabilityCheckerUrl: "https://www.talktalk.co.uk/broadband",
    sourceType: "provider_page",
    isActive: true
  },
  vodafone: {
    providerId: "vodafone",
    providerName: "Vodafone",
    officialWebsite: "https://www.vodafone.co.uk/",
    availabilityCheckerUrl: "https://www.vodafone.co.uk/broadband",
    sourceType: "provider_page",
    isActive: true
  },
  plusnet: {
    providerId: "plusnet",
    providerName: "Plusnet",
    officialWebsite: "https://www.plus.net/",
    availabilityCheckerUrl: "https://www.plus.net/broadband/",
    sourceType: "provider_page",
    isActive: true
  },
  zen: {
    providerId: "zen",
    providerName: "Zen Internet",
    officialWebsite: "https://www.zen.co.uk/",
    availabilityCheckerUrl: "https://www.zen.co.uk/broadband",
    sourceType: "provider_page",
    isActive: true
  },
  virgin: {
    providerId: "virgin",
    providerName: "Virgin Media",
    officialWebsite: "https://www.virginmedia.com/",
    availabilityCheckerUrl: "https://www.virginmedia.com/broadband",
    sourceType: "provider_page",
    isActive: true
  },
  three5g: {
    providerId: "three5g",
    providerName: "Three Broadband",
    officialWebsite: "https://www.three.co.uk/",
    availabilityCheckerUrl: "https://www.three.co.uk/broadband",
    sourceType: "provider_page",
    isActive: true
  },
  three: {
    providerId: "three",
    providerName: "Three Broadband",
    officialWebsite: "https://www.three.co.uk/",
    availabilityCheckerUrl: "https://www.three.co.uk/broadband",
    sourceType: "provider_page",
    isActive: true
  },
  hyperoptic: {
    providerId: "hyperoptic",
    providerName: "Hyperoptic",
    officialWebsite: "https://www.hyperoptic.com/",
    availabilityCheckerUrl: "https://www.hyperoptic.com/broadband/",
    sourceType: "provider_page",
    isActive: true
  },
  communityfibre: {
    providerId: "communityfibre",
    providerName: "Community Fibre",
    officialWebsite: "https://communityfibre.co.uk/",
    availabilityCheckerUrl: "https://communityfibre.co.uk/",
    sourceType: "provider_page",
    isActive: true
  },
  toob: {
    providerId: "toob",
    providerName: "toob",
    officialWebsite: "https://www.toob.co.uk/",
    availabilityCheckerUrl: "https://www.toob.co.uk/check-availability/",
    broadbandDealsUrl: "https://www.toob.co.uk/locations/chippenham/",
    sourceType: "provider_page",
    isActive: true
  },
  youfibre: {
    providerId: "youfibre",
    providerName: "YouFibre",
    officialWebsite: "https://www.youfibre.com/",
    availabilityCheckerUrl: "https://www.youfibre.com/check-availability/",
    sourceType: "provider_page",
    isActive: true
  },
  brsk: {
    providerId: "brsk",
    providerName: "Brsk",
    officialWebsite: "https://www.brsk.co.uk/",
    availabilityCheckerUrl: "https://www.brsk.co.uk/check-availability",
    sourceType: "provider_page",
    isActive: true
  },
  starlink: {
    providerId: "starlink",
    providerName: "Starlink",
    officialWebsite: "https://www.starlink.com/",
    availabilityCheckerUrl: "https://www.starlink.com/residential",
    sourceType: "provider_page",
    isActive: true
  }
};
