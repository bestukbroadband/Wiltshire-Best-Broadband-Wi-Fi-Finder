/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { postcodeAreasData } from "../data/postcodeAreas";
import { extractOutwardCode } from "./postcodeHelpers";

interface TestResult {
  input: string;
  expectedOutward: string;
  expectedAreaName: string;
  actualOutward: string;
  actualAreaName: string;
  passed: boolean;
}

export function runPostcodeTests(): TestResult[] {
  const testCases = [
    { input: "SN1", expectedOutward: "SN1", expectedAreaName: "Swindon Central" },
    { input: "SN1 1AA", expectedOutward: "SN1", expectedAreaName: "Swindon Central" },
    { input: "SN10", expectedOutward: "SN10", expectedAreaName: "Devizes and Market Lavington" },
    { input: "SN10 1AA", expectedOutward: "SN10", expectedAreaName: "Devizes and Market Lavington" },
    { input: "SN11", expectedOutward: "SN11", expectedAreaName: "Calne and Lyneham" },
    { input: "SN12", expectedOutward: "SN12", expectedAreaName: "Melksham" },
    { input: "SN13", expectedOutward: "SN13", expectedAreaName: "Corsham and Box" },
    { input: "SN14", expectedOutward: "SN14", expectedAreaName: "Chippenham West" },
    { input: "SN15", expectedOutward: "SN15", expectedAreaName: "Chippenham East" },
    { input: "SN16", expectedOutward: "SN16", expectedAreaName: "Malmesbury" },
    { input: "SP1", expectedOutward: "SP1", expectedAreaName: "Salisbury City Centre" },
    { input: "SP1 1AA", expectedOutward: "SP1", expectedAreaName: "Salisbury City Centre" },
    { input: "SP10", expectedOutward: "SP10", expectedAreaName: "Andover" },
    { input: "SP10 1AA", expectedOutward: "SP10", expectedAreaName: "Andover" },
    { input: "SP11", expectedOutward: "SP11", expectedAreaName: "Ludgershall and Andover Border" },
    { input: "SP11 0AA", expectedOutward: "SP11", expectedAreaName: "Ludgershall and Andover Border" },
    { input: "BA14", expectedOutward: "BA14", expectedAreaName: "Trowbridge" },
    { input: "BA15", expectedOutward: "BA15", expectedAreaName: "Bradford on Avon" }
  ];

  const results: TestResult[] = testCases.map(tc => {
    const actualOutward = extractOutwardCode(tc.input);
    const area = postcodeAreasData.find(a => a.postcodePrefix === actualOutward);
    const actualAreaName = area ? area.areaName : "Not Found";
    
    return {
      input: tc.input,
      expectedOutward: tc.expectedOutward,
      expectedAreaName: tc.expectedAreaName,
      actualOutward,
      actualAreaName,
      passed: actualOutward === tc.expectedOutward && actualAreaName === tc.expectedAreaName
    };
  });

  console.log("=== WILTSHIRE POSTCODE MATCHING TEST RESULTS ===");
  results.forEach(res => {
    if (res.passed) {
      console.log(`✅ Passed: "${res.input}" matches "${res.actualAreaName}" (${res.actualOutward})`);
    } else {
      console.error(`❌ Failed: "${res.input}" matched "${res.actualAreaName}" (${res.actualOutward}), expected "${res.expectedAreaName}" (${res.expectedOutward})`);
    }
  });
  console.log("=========================================");

  return results;
}
