/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { providersData } from "./providers";
import { Provider } from "../types";

export interface ProviderListingCategory {
  categoryName: string;
  description: string;
  providerIds: string[];
}

export const providerListingsCategories: ProviderListingCategory[] = [
  {
    categoryName: "Alternative Networks",
    description: "Independent fibre builders who bypass national copper circuits to lay dedicated local fibre.",
    providerIds: ["wessex", "trooli", "zzoomm", "gigaclear", "voneus", "allpoints"]
  },
  {
    categoryName: "National Mainstreams",
    description: "National standards using the widespread Openreach or large-scale hybrid coaxial networks.",
    providerIds: ["bt", "virgin", "sky", "talktalk"]
  },
  {
    categoryName: "Wireless & Satellite Specialists",
    description: "Ideal alternatives delivering reliable connections with rapidly deployable microwave or satellite arrays.",
    providerIds: ["ee_5g", "starlink"]
  }
];

export function getProvidersByPostcode(postcodePrefix: string): Provider[] {
  const normalized = postcodePrefix.trim().toUpperCase();
  return providersData.filter(provider => 
    provider.postcodeAreas.some(area => area.toUpperCase() === normalized)
  );
}

export function getProvidersByTown(townName: string): Provider[] {
  const normalized = townName.trim().toLowerCase();
  return providersData.filter(provider => 
    provider.townsCovered.some(town => town.toLowerCase() === normalized)
  );
}
