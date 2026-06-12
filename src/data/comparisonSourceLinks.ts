/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ComparisonSourceLink {
  sourceId: string;
  sourceName: string;
  officialWebsite: string;
  providerPageUrl?: string;
  checkerUrl?: string;
  mapUrl?: string;
  isActive: boolean;
}

export const comparisonSourceLinksData: Record<string, ComparisonSourceLink> = {
  uswitch: {
    sourceId: "uswitch",
    sourceName: "Uswitch",
    officialWebsite: "https://www.uswitch.com/broadband/",
    providerPageUrl: "https://www.uswitch.com/broadband/providers/",
    isActive: true
  },
  comparethemarket: {
    sourceId: "comparethemarket",
    sourceName: "Compare the Market",
    officialWebsite: "https://www.comparethemarket.com/broadband/",
    isActive: true
  },
  broadbandgenie: {
    sourceId: "broadbandgenie",
    sourceName: "Broadband Genie",
    officialWebsite: "https://www.broadband.co.uk/",
    isActive: true
  },
  moneysupermarket: {
    sourceId: "moneysupermarket",
    sourceName: "MoneySuperMarket",
    officialWebsite: "https://www.moneysupermarket.com/broadband/",
    isActive: true
  },
  moneysavingexpert: {
    sourceId: "moneysavingexpert",
    sourceName: "MoneySavingExpert",
    officialWebsite: "https://www.moneysavingexpert.com/compare-broadband-deals/",
    isActive: true
  },
  which: {
    sourceId: "which",
    sourceName: "Which Broadband",
    officialWebsite: "https://broadband.which.co.uk/",
    isActive: true
  },
  thinkbroadband: {
    sourceId: "thinkbroadband",
    sourceName: "ThinkBroadband",
    officialWebsite: "https://www.thinkbroadband.com/",
    mapUrl: "https://labs.thinkbroadband.com/local/broadband-map",
    isActive: true
  },
  ispreview: {
    sourceId: "ispreview",
    sourceName: "ISPreview",
    officialWebsite: "https://www.ispreview.co.uk/",
    isActive: true
  },
  ofcom: {
    sourceId: "ofcom",
    sourceName: "Ofcom checker",
    officialWebsite: "https://www.ofcom.org.uk/",
    checkerUrl: "https://checker.ofcom.org.uk/en-gb/broadband-coverage",
    isActive: true
  },
  openreach: {
    sourceId: "openreach",
    sourceName: "Openreach fibre checker",
    officialWebsite: "https://www.openreach.com/",
    checkerUrl: "https://www.openreach.com/fibre-checker",
    isActive: true
  }
};
