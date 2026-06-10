/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Validates offer package against previous states and standard rules.
 * Flags offers as 'review_required' if criteria match.
 */
export function validateProviderData(newOffer, previousOffers = []) {
  const warnings = [];
  let reviewStatus = "approved";

  // Match previous offer
  const oldOffer = previousOffers.find(o => o.offerId === newOffer.offerId);

  // 1. Required fields checks
  if (!newOffer.packageName || newOffer.packageName === "Unknown") {
    warnings.push("Package name is empty or unknown.");
    reviewStatus = "review_required";
  }

  if (!newOffer.monthlyPriceNumeric || newOffer.monthlyPriceNumeric <= 0) {
    warnings.push("Monthly price could not be parsed or is zero.");
    reviewStatus = "review_required";
  }

  if (!newOffer.averageDownloadSpeed || newOffer.averageDownloadSpeed <= 0) {
    warnings.push("Download speed could not be parsed or is zero.");
    reviewStatus = "review_required";
  }

  // 2. Comparative Checks (when old offer is present)
  if (oldOffer) {
    // 20% price change check
    const priceDiff = Math.abs(newOffer.monthlyPriceNumeric - oldOffer.monthlyPriceNumeric);
    const pricePercentChange = oldOffer.monthlyPriceNumeric > 0 ? (priceDiff / oldOffer.monthlyPriceNumeric) : 0;
    if (pricePercentChange > 0.20) {
      warnings.push(`Suspicious price change of ${(pricePercentChange * 100).toFixed(1)}% (Old: £${oldOffer.monthlyPriceNumeric}, New: £${newOffer.monthlyPriceNumeric}).`);
      reviewStatus = "review_required";
    }

    // Contract length changes
    if (newOffer.contractLengthMonths !== oldOffer.contractLengthMonths) {
      warnings.push(`Contract length changed (Old: ${oldOffer.contractLength}, New: ${newOffer.contractLength}).`);
      reviewStatus = "review_required";
    }

    // Setup fee changes
    if (newOffer.setupFee !== oldOffer.setupFee) {
      warnings.push(`Setup fee changed (Old: £${oldOffer.setupFee}, New: £${newOffer.setupFee}).`);
      reviewStatus = "review_required";
    }

    // Price rise descriptor changes
    if (newOffer.knownPriceRise !== oldOffer.knownPriceRise) {
      warnings.push(`Regulatory price rise wording changed.`);
      reviewStatus = "review_required";
    }
  }

  // Double check duplicates count inside validation loop is handled by caller.
  return {
    isValid: warnings.length === 0,
    reviewStatus,
    warnings
  };
}
