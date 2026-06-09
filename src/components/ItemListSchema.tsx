/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { generateItemListSchema } from "../data/schemaMarkup";
import { JsonLdSchema } from "./JsonLdSchema";

interface ItemListItem {
  position: number;
  name: string;
  url: string;
}

interface ItemListSchemaProps {
  items: ItemListItem[];
  id?: string;
}

export function ItemListSchema({ items, id }: ItemListSchemaProps) {
  if (!items || items.length === 0) return null;
  const schema = generateItemListSchema(items);
  return <JsonLdSchema schema={schema} id={id || "item-list-schema-markup"} />;
}

export default ItemListSchema;
