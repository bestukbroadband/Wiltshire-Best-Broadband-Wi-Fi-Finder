/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface JsonLdSchemaProps {
  key?: any;
  schema: object;
  id?: string;
}

/**
 * Renders JSON-LD structured data directly inside a script element.
 * Perfect for synchronous crawlers and indexing validators.
 */
export function JsonLdSchema({ schema, id }: JsonLdSchemaProps) {
  if (!schema) {
    return null;
  }

  // Safe JSON serialization pattern
  const schemaString = JSON.stringify(schema);

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaString }}
    />
  );
}

export default JsonLdSchema;
