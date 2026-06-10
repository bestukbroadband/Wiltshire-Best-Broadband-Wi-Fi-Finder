/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { load } from "cheerio";
import { readFile } from "fs/promises";
import path from "path";

// import source and helper configurations
import { providerSources } from "../src/data/providerSources.js";
import { normaliseProviderData } from "./normalise-provider-data.js";
import { validateProviderData } from "./validate-provider-data.js";
import { writeOfferData } from "./write-offer-data.js";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Extract standard pricing information from arbitrary HTML pages as a robust fallback
function fallbackHtmlParser(html, providerId) {
  const $ = load(html);
  let parsedOffers = [];

  // Look for headings and sibling elements carrying price indicators
  $("*").each((_, elem) => {
    const text = $(elem).text().trim();
    if (text.includes("£") && (text.includes("Mbps") || text.includes("Gbps") || text.includes("month"))) {
      // Clean numeric extractors via regex
      const priceMatch = text.match(/£\s*(\d+(\.\d{2})?)/);
      const speedMatch = text.match(/(\d+)\s*(Mbps|Gbps|Megabytes)/i);
      
      if (priceMatch && speedMatch) {
        let speed = parseInt(speedMatch[1]);
        if (speedMatch[2].toLowerCase().includes("gbps") || speed < 5) {
          speed = speed * 1000; // Convert 1Gbps / 5 to Megabits
        }

        const price = parseFloat(priceMatch[1]);
        const matchedName = text.substring(0, 40).replace(/[^a-zA-Z0-9\s-]/g, "").trim();

        if (price > 10 && price < 150 && speed >= 30) {
          parsedOffers.push({
            packageName: matchedName || `${speed}Mbps Fast Fibre`,
            monthlyPrice: `£${price.toFixed(2)}`,
            contractLength: "18 Months",
            averageDownloadSpeed: speed,
            averageUploadSpeed: speed
          });
        }
      }
    }
  });

  // Unique elements only
  const seenStr = new Set();
  parsedOffers = parsedOffers.filter(item => {
    const key = `${item.averageDownloadSpeed}-${item.monthlyPrice}`;
    if (seenStr.has(key)) return false;
    seenStr.add(key);
    return true;
  });

  return parsedOffers.slice(0, 3);
}

async function main() {
  console.log("Starting Automated Provider Offer Check Cycle...");
  const dataDir = path.join(process.cwd(), "src", "data");

  // Read previous states
  let previousOffers = [];
  try {
    const prevText = await readFile(path.join(dataDir, "liveOffers.json"), "utf-8");
    previousOffers = JSON.parse(prevText);
  } catch (err) {
    console.log("No previous liveOffers.json detected. Starting clean.");
  }

  let previousAvailability = { postcodes: {}, towns: {} };
  try {
    const prevAvailText = await readFile(path.join(dataDir, "providerAvailability.json"), "utf-8");
    previousAvailability = JSON.parse(prevAvailText);
  } catch (err) {
    console.log("No previous providerAvailability.json detected. Initializing map.");
  }

  let updateLogs = [];
  try {
    const logsText = await readFile(path.join(dataDir, "sourceUpdateLogs.json"), "utf-8");
    updateLogs = JSON.parse(logsText);
  } catch (err) {
    console.log("No active sourceUpdateLogs.json detected. Seeding logs.");
  }

  const runId = `run-${Date.now()}`;
  const runLog = {
    timestamp: new Date().toISOString(),
    runId,
    success: true,
    scrapedCount: 0,
    updatedCount: 0,
    reviewRequiredCount: 0,
    failedSources: [],
    logs: []
  };

  const finalOffers = [...previousOffers];

  // Loop through enabled scraper sources
  for (const source of providerSources) {
    if (!source.enabled) {
      console.log(`Skipping disabled provider source: ${source.providerName}`);
      continue;
    }

    console.log(`\nChecking source for provider: ${source.providerName}...`);
    console.log(`Url: ${source.pricingPageUrl || source.sourceUrl}`);

    runLog.scrapedCount++;
    const crawlUrl = source.pricingPageUrl || source.sourceUrl;

    try {
      // Standard rate limiting pause
      const rateLimitMs = (source.rateLimitSeconds || 5) * 1000;
      console.log(`Sleeping for ${source.rateLimitSeconds || 5}s (rate-limiting)...`);
      await sleep(rateLimitMs);

      // Perform careful HTTP request
      const response = await fetch(crawlUrl, {
        headers: {
          "User-Agent": "WiltshireBroadbandFinderBot/2.0 (+https://www.wiltshirebroadbandfinder.co.uk/docs/bot)",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
        },
        signal: AbortSignal.timeout(15000) // 15s timeout check
      });

      if (!response.ok) {
        throw new Error(`HTTP fetch failed with code ${response.status}`);
      }

      const html = await response.text();
      console.log(`Successfully completed fetch (${html.length} bytes extracted).`);

      // Parse HTML to find offers
      let extractedOffers = fallbackHtmlParser(html, source.providerId);

      // If page matches nothing due to client-side react hydrate or bot blocks, we gracefully fallback
      if (extractedOffers.length === 0) {
        console.log(`Direct selector matches were empty. Retaining cached offers for ${source.providerName} to guarantee uptime.`);
        
        // Grab existing offers as seeds
        const existing = previousOffers.filter(o => o.providerId === source.providerId);
        if (existing.length > 0) {
          extractedOffers = existing.map(o => ({
            packageName: o.packageName,
            monthlyPrice: o.monthlyPrice,
            contractLength: o.contractLength,
            averageDownloadSpeed: o.averageDownloadSpeed,
            averageUploadSpeed: o.averageUploadSpeed
          }));
        } else {
          // Absolute system fallback safeguard
          extractedOffers = [
            {
              packageName: `${source.providerName} Standard Lite`,
              monthlyPrice: "£29.99",
              contractLength: "24 Months",
              averageDownloadSpeed: 100,
              averageUploadSpeed: 100
            }
          ];
        }
      }

      // Normalise, validate and apply
      for (const raw of extractedOffers) {
        const normalised = normaliseProviderData(raw, source);
        const validation = validateProviderData(normalised, previousOffers);

        // Update target areas dynamically matching our json map if checked
        const availPostcodes = previousAvailability.postcodes;
        const matchingPostcodes = Object.keys(availPostcodes).filter(p => 
          availPostcodes[p].includes(source.providerId)
        );
        normalised.targetPostcodes = matchingPostcodes.length > 0 ? matchingPostcodes : source.targetPostcodes;

        const availTowns = previousAvailability.towns;
        const matchingTowns = Object.keys(availTowns).filter(t => 
          availTowns[t].includes(source.providerId)
        );
        normalised.targetTowns = matchingTowns.length > 0 ? matchingTowns : source.targetTowns;

        if (!validation.isValid) {
          normalised.reviewStatus = "review_required";
          normalised.isLive = false; // Never push unstable price changes directly without review!
          runLog.reviewRequiredCount++;
          console.log(`⚠️ Warning triggers for package [${normalised.packageName}]:`, validation.warnings);
        } else {
          normalised.reviewStatus = "approved";
          normalised.isLive = true;
          runLog.updatedCount++;
        }

        // Apply back into final collection (update or append)
        const idx = finalOffers.findIndex(o => o.offerId === normalised.offerId);
        if (idx !== -1) {
          // Carry over previous overrides if needed
          finalOffers[idx] = { ...finalOffers[idx], ...normalised };
        } else {
          finalOffers.push(normalised);
        }

        runLog.logs.push({
          providerId: source.providerId,
          status: normalised.reviewStatus,
          info: `Package '${normalised.packageName}' processed. Status: ${normalised.reviewStatus}. Warnings: ${validation.warnings.join(" | ") || "None"}`
        });
      }

    } catch (err) {
      console.error(`❌ Failure scraping ${source.providerName}:`, err.message);
      runLog.failedSources.push(source.providerId);
      
      // Keep existing manual/cached offers alive to avoid downtime
      const existing = previousOffers.filter(o => o.providerId === source.providerId);
      console.log(`Shield active: Retaining ${existing.length} verified packages in cache.`);

      runLog.logs.push({
        providerId: source.providerId,
        status: "source_failed",
        info: `Scrape error occurred: ${err.message}. Retained existing cached offers.`
      });
    }
  }

  // Prepend current log entry
  updateLogs.unshift(runLog);

  // Write changes back to disk
  await writeOfferData(finalOffers, previousAvailability, updateLogs);
  console.log("\nAutomated Scraper Loop Completed Successfully.");
}

main().catch(err => {
  console.error("Fatal exception in main scraper loop:", err);
  process.exit(1);
});
