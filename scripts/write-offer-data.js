/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { writeFile } from "fs/promises";
import path from "path";

/**
 * Persists the updated arrays into project data folders JSON files.
 */
export async function writeOfferData(liveOffers, providerAvailability, updateLogs) {
  const dataDir = path.join(process.cwd(), "src", "data");

  // Save live offers
  await writeFile(
    path.join(dataDir, "liveOffers.json"),
    JSON.stringify(liveOffers, null, 2),
    "utf-8"
  );

  // Save provider availability
  await writeFile(
    path.join(dataDir, "providerAvailability.json"),
    JSON.stringify(providerAvailability, null, 2),
    "utf-8"
  );

  // Save update logs (keep under 20 runs to avoid bloated repo sizes)
  const trimmedLogs = updateLogs.slice(0, 50);
  await writeFile(
    path.join(dataDir, "sourceUpdateLogs.json"),
    JSON.stringify(trimmedLogs, null, 2),
    "utf-8"
  );

  console.log("Persistent JSON store written successfully.");
}
