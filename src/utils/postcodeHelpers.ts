/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Correctly extracts the outward code from a UK postcode.
 * Handles:
 * - "SN10 1AA" -> "SN10"
 * - "SN101AA" -> "SN10"
 * - "SN1 1AA" -> "SN1"
 * - "SN11AA" -> "SN1"
 * - "SP11 0AA" -> "SP11"
 * - "SP110AA" -> "SP11"
 * - "SP11AA" -> "SP1"
 * - "BA14 8AA" -> "BA14"
 * - "BA148AA" -> "BA14"
 * - "GL8 8AA" -> "GL8"
 * - "RG17 0AA" -> "RG17"
 */
export function extractOutwardCode(input: string): string {
  if (!input) return "";
  const trimmed = input.trim().toUpperCase();
  
  // If there is any space, take the portion before the first space
  const spaceIndex = trimmed.indexOf(" ");
  if (spaceIndex !== -1) {
    return trimmed.substring(0, spaceIndex);
  }
  
  // If no space, check if it matches a full postcode run-together (like SN101AA, SP110AA, SP11AA)
  // UK inward code is always exactly 3 characters: a digit followed by two letters.
  if (trimmed.length >= 5) {
    const ending = trimmed.slice(-3);
    if (/^\d[A-Z]{2}$/.test(ending)) {
      return trimmed.slice(0, -3);
    }
  }
  
  return trimmed;
}

/**
 * Trims whitespace, converts to uppercase, removes extra spaces,
 * and extracts the outward code for reliable matching.
 * Supports both full postcodes and outward codes.
 */
export function normalisePostcodeInput(input: string): string {
  if (!input) return "";
  const outward = extractOutwardCode(input);
  return outward.replace(/\s+/g, "");
}
