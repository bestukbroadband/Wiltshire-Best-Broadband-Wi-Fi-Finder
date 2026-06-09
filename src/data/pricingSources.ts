/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from "./providers";

export interface PricingSourceType {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  lastSyncDate?: string;
  connectedEndpoints?: number;
}

export const pricingSourcesData: PricingSourceType[] = [
  {
    id: "manual",
    name: "Manual Admin Panel Pricing",
    description: "Manual adjustments uploaded directly by our content moderation team following verification of official company brochures.",
    isActive: true,
    lastSyncDate: "2026-06-04"
  },
  {
    id: "csv_import",
    name: "CSV Bulk Pricing Sheets",
    description: "CSV files uploaded weekly containing verified partner spreadsheet listings, contracts, and regional setup pricing.",
    isActive: false,
    connectedEndpoints: 0
  },
  {
    id: "affiliate_feed",
    name: "Broadband Affiliate Feed Sync",
    description: "Dynamic XML/JSON product feeds with tracking tokens provided by networks like Awin, Tradedoubler, or direct partners.",
    isActive: false,
    connectedEndpoints: 4
  },
  {
    id: "provider_api",
    name: "Direct Provider SOAP/REST APIs",
    description: "Live availability and localized quote queries executed against Trooli, Wessex Internet, or Zzoomm postcode databases.",
    isActive: false,
    connectedEndpoints: 3
  }
];

// --- PLACEHOLDER FUNCTIONS FOR FUTURE API EXPANSION ---

/**
 * Simulates fetching live pricing from Wiltshire broadband providers.
 * Future integration plan: Connect to approved REST APIs via secure backend proxy routes inside /api/*.
 * Keep secret API keys inside process.env.PROVIDER_API_KEY.
 * Do NOT store keys on the client-side.
 */
export async function fetchProviderPrices(providerId: string): Promise<Record<string, any>> {
  console.log(`[Pricing Engine] Initiating live API lookup for provider: ${providerId}`);
  // Simulated latent network task
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        providerId,
        message: "Demo sync successful. Connect active provider SOAP/REST APIs inside server.ts first.",
        timestamp: new Date().toISOString()
      });
    }, 400);
  });
}

/**
 * Simulates synchronizing prices via an affiliate aggregator feed (e.g., Awin, Webgains, or Decision Technologies).
 */
export async function syncAffiliatePrices(feedUrl: string): Promise<number> {
  console.log(`[Pricing Engine] Synchronizing active products from affiliate feed URL: ${feedUrl}`);
  // Return mock count of synchronized packages
  return 42;
}

/**
 * Simulates direct synchronization against registered provider APIs.
 */
export async function syncProviderApiPrices(providerId: string, apiEndpoint: string): Promise<boolean> {
  console.log(`[Pricing Engine] Connecting to direct API: ${apiEndpoint} for provider: ${providerId}`);
  return true;
}

/**
 * Simulates parsing and applying bulk CSV pricing tables uploaded via the Admin Portal.
 * Future integration plan: Use PapaParse or equivalent parser server-side to batch update sqlite/sql/firestore databases.
 */
export async function syncCsvPrices(csvContent: string): Promise<{ updatedCount: number; errors: string[] }> {
  console.log(`[Pricing Engine] Parsing CSV content payload of length: ${csvContent.length}`);
  return {
    updatedCount: 15,
    errors: []
  };
}

/**
 * Sets the verified date of provider listings, triggering automated compliance audits.
 */
export async function updateProviderLastCheckedDate(providerId: string): Promise<string> {
  const newDate = new Date().toISOString().split("T")[0];
  console.log(`[Compliance] Updating checked timestamp for: ${providerId} to: ${newDate}`);
  return newDate;
}

/**
 * Scans listed broadband packages and flags entries older than 30 days as expired or pending revision.
 */
export function flagExpiredPrices(providers: Provider[]): Provider[] {
  console.log("[Compliance Audit] Scanning database packages for stale date terms...");
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return providers.map((prov) => {
    const checkedDate = new Date(prov.lastCheckedDate);
    if (checkedDate < thirtyDaysAgo) {
      console.warn(`[Compliance Warning] Package ${prov.packageName} pricing is stale. Flagging for admin check.`);
      return { ...prov, priceStatus: "Expired" as const };
    }
    return prov;
  });
}

/**
 * Recalculates ranked broadband deals based on a transparent score weighting:
 * - Monthly price (lower is better, weight: 35%)
 * - Speed (ratio of download mbps, weight: 25%)
 * - Contract length (shorter is more flexible, weight: 15%)
 * - Setup fees (lower is better, weight: 15%)
 * - Value-add inclusion / Price freeze locks (weight: 10%)
 */
export function calculateDealRankings(providers: Provider[]): Provider[] {
  console.log("[Ranking Engine] Recalculating deal scoring for Wiltshire listings with multi-factor criteria...");
  
  const scoredProviders = providers.map((prov) => {
    // 1. Monthly Price: lower is better (ratio between £15 and £85)
    const priceFrom = Math.min(85, Math.max(15, prov.monthlyPriceFrom));
    const priceScore = ((85 - priceFrom) / 70) * 100;

    // 2. Average Download Speed: higher is better (between 10 Mbps and 1000 Mbps)
    const dlSpeed = Math.min(1000, Math.max(10, prov.averageDownloadSpeed));
    const dlScore = (dlSpeed / 1000) * 100;

    // 3. Average Upload Speed: higher is better (between 1 Mbps and 1000 Mbps)
    const ulSpeed = Math.min(1000, Math.max(1, prov.averageUploadSpeed));
    const ulScore = (ulSpeed / 1000) * 100;

    // 4. Contract Length: shorter is better (rolling or 12m is best: 0 is 100, 12 is 85, 18 is 65, 24 is 45)
    let contractScore = 40;
    if (prov.contractLength === 0) contractScore = 100;
    else if (prov.contractLength <= 12) contractScore = 85;
    else if (prov.contractLength <= 18) contractScore = 65;
    else if (prov.contractLength <= 24) contractScore = 45;

    // 5. Setup & Installation Fees & Router Costs (lower upfront is better)
    const upfrontTotal = Math.min(100, Math.max(0, prov.setupFee + prov.installationFee + prov.routerCost));
    const upfrontScore = ((100 - upfrontTotal) / 100) * 100;

    // 6. Router included: direct true / false score
    const routerScore = prov.routerIncluded ? 100 : 0;

    // 7. Known price changes (no mid-contract CPI/RPI increases is best)
    const priceRiseScore = !prov.midContractPriceRise ? 100 : 30;

    // 8. Price after contract (lower or same as starter is best)
    const priceAfter = prov.monthlyPriceAfterContract ?? prov.monthlyPriceFrom;
    const riseDiff = Math.max(0, priceAfter - prov.monthlyPriceFrom);
    const postContractScore = Math.max(0, 100 - (riseDiff * 5));

    // 9. Availability confidence
    let availabilityScore = 50;
    if (prov.availabilityStatus === "Available") availabilityScore = 100;
    else if (prov.availabilityStatus === "Limited Coverage") availabilityScore = 75;
    else if (prov.availabilityStatus === "Coming Soon") availabilityScore = 30;

    // 10. Editor Score: map 0-10 format to 0-100 scale (fallback to 8.0/80 if not set)
    const editorScoreRaw = prov.editorScore ?? 8.0;
    const editorScoreNormalized = editorScoreRaw * 10;

    // 11. Rural Suitability
    const isRuralType = prov.providerType.some(t => 
      t.includes("Rural") || 
      t.includes("Alternative") || 
      t.includes("Satellite")
    );
    const isRuralBestFor = prov.bestFor.toLowerCase().includes("rural") || 
                           prov.bestFor.toLowerCase().includes("village") ||
                           prov.bestFor.toLowerCase().includes("parish");
    const ruralScore = (isRuralType || isRuralBestFor) ? 100 : 50;

    // 12. Home Working Suitability
    const isHomeworkingBestFor = prov.bestFor.toLowerCase().includes("work") || 
                                 prov.bestFor.toLowerCase().includes("office") || 
                                 prov.bestFor.toLowerCase().includes("homeworker");
    const highUpload = prov.averageUploadSpeed >= 100;
    const workingScore = (isHomeworkingBestFor || highUpload) ? 100 : 50;

    // Calculate complex weighted ranking score out of 100
    const finalScore = Math.round(
      priceScore * 0.18 +               // Monthly Price From (18%)
      dlScore * 0.12 +                  // Download speed (12%)
      ulScore * 0.08 +                  // Upload speed (8%)
      contractScore * 0.08 +            // Contract term flexibility (8%)
      upfrontScore * 0.08 +             // Setup & registration fees (8%)
      routerScore * 0.04 +              // Router inclusion (4%)
      priceRiseScore * 0.08 +           // Fixed price protection (8%)
      postContractScore * 0.06 +        // After-contract surge penalty (6%)
      availabilityScore * 0.08 +        // Active deployment status (8%)
      editorScoreNormalized * 0.10 +    // Editor assessment score (10%)
      ruralScore * 0.05 +               // Rural village suitability (5%)
      workingScore * 0.05               // Remote workspace suitability (5%)
    );

    // CRITICAL REQUIREMENT: Sponsored status does NOT automatically improve ranking position. 
    // Sponsored listings evaluate identical relative score terms without bias.

    return {
      ...prov,
      rankingScore: finalScore
    };
  });

  // Sort by score descending
  const sorted = [...scoredProviders].sort((a, b) => b.rankingScore - a.rankingScore);

  // Re-assign ranks based on standard sort order
  return sorted.map((prov, index) => ({
    ...prov,
    dealRank: index + 1
  }));
}
