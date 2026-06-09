/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { generateOfferSchema } from "../data/schemaMarkup";
import { JsonLdSchema } from "./JsonLdSchema";

interface OfferSchemaProps {
  packageName: string;
  price: number;
  providerName: string;
  id?: string;
}

export function OfferSchema({ packageName, price, providerName, id }: OfferSchemaProps) {
  const schema = generateOfferSchema(packageName, price, "GBP", providerName);
  return <JsonLdSchema schema={schema} id={id || `offer-schema-${providerName.toLowerCase().replace(/\s+/g, "-")}`} />;
}

export default OfferSchema;
