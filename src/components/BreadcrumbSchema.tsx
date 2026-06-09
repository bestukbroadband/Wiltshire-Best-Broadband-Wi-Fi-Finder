/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { generateBreadcrumbSchema } from "../data/schemaMarkup";
import { JsonLdSchema } from "./JsonLdSchema";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  breadcrumbs: BreadcrumbItem[];
  id?: string;
}

export function BreadcrumbSchema({ breadcrumbs, id }: BreadcrumbSchemaProps) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;
  const schema = generateBreadcrumbSchema(breadcrumbs);
  return <JsonLdSchema schema={schema} id={id || "breadcrumb-schema-markup"} />;
}

export default BreadcrumbSchema;
