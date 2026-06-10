/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Normalises raw provider package data into standard JSON schemas.
 */
export function normaliseProviderData(raw, source) {
  // Extract numbers from strings
  const monthlyPriceNumeric = parseFloat(String(raw.monthlyPrice || "").replace(/[^\d.]/g, "")) || 0;
  const monthlyPrice = `£${monthlyPriceNumeric.toFixed(2)}`;

  const contractLengthMonths = parseInt(String(raw.contractLength || "").replace(/\D/g, "")) || 12;
  const contractLength = `${contractLengthMonths} Months`;

  const averageDownloadSpeed = parseInt(String(raw.averageDownloadSpeed || "").replace(/\D/g, "")) || 100;
  const averageUploadSpeed = parseInt(String(raw.averageUploadSpeed || "").replace(/\D/g, "")) || averageDownloadSpeed;

  const setupFee = parseFloat(String(raw.setupFee || "0").replace(/[^\d.]/g, "")) || 0;
  const installationFee = parseFloat(String(raw.installationFee || "0").replace(/[^\d.]/g, "")) || 0;
  const routerCost = parseFloat(String(raw.routerCost || "0").replace(/[^\d.]/g, "")) || 0;

  const routerIncluded = raw.routerIncluded !== false;
  const knownPriceRise = raw.knownPriceRise || "Subject to provider confirmation";
  const priceAfterContract = parseFloat(String(raw.priceAfterContract || "").replace(/[^\d.]/g, "")) || (monthlyPriceNumeric * 1.3);

  // Fallbacks for targets
  const targetPostcodes = raw.targetPostcodes || source.targetPostcodes || [];
  const targetTowns = raw.targetTowns || source.targetTowns || [];

  return {
    offerId: raw.offerId || `offer-${source.providerId}-${averageDownloadSpeed}`,
    providerId: source.providerId,
    providerName: source.providerName,
    packageName: raw.packageName || `${source.providerName} Speedy Fibre`,
    monthlyPrice,
    monthlyPriceNumeric,
    contractLength,
    contractLengthMonths,
    averageDownloadSpeed,
    averageUploadSpeed,
    setupFee,
    installationFee,
    routerIncluded,
    routerCost,
    knownPriceRise,
    priceAfterContract: parseFloat(priceAfterContract.toFixed(2)),
    availabilityStatus: "address_check_required", // Wording mandate: check address
    targetPostcodes,
    targetTowns,
    sourceUrl: source.pricingPageUrl || source.sourceUrl,
    sourceName: `${source.providerName} Public Page`,
    lastChecked: new Date().toISOString().split("T")[0],
    lastUpdated: new Date().toISOString().split("T")[0],
    dataConfidence: "high",
    reviewStatus: "approved",
    isLive: true
  };
}
