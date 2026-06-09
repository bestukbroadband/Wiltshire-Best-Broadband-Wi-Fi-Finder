/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { generateServiceSchema } from "../data/schemaMarkup";
import { JsonLdSchema } from "./JsonLdSchema";

interface ServiceAreaSchemaProps {
  serviceName: string;
  areaServedName?: string;
  id?: string;
}

export function ServiceAreaSchema({ serviceName, areaServedName, id }: ServiceAreaSchemaProps) {
  const schema = generateServiceSchema(serviceName, areaServedName);
  return <JsonLdSchema schema={schema} id={id || `service-schema-${serviceName.toLowerCase().replace(/\s+/g, "-")}`} />;
}

export default ServiceAreaSchema;
