/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { generateLocalBusinessSchema } from "../data/schemaMarkup";
import { JsonLdSchema } from "./JsonLdSchema";

export function LocalBusinessSchema() {
  const schema = generateLocalBusinessSchema();
  return <JsonLdSchema schema={schema} id="local-business-schema" />;
}

export default LocalBusinessSchema;
