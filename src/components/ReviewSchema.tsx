/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { generateReviewSchema } from "../data/schemaMarkup";
import { JsonLdSchema } from "./JsonLdSchema";

interface ReviewSchemaProps {
  itemReviewedName: string;
  ratingValue: number;
  reviewBody: string;
  authorName?: string;
  id?: string;
}

export function ReviewSchema({ itemReviewedName, ratingValue, reviewBody, authorName, id }: ReviewSchemaProps) {
  const schema = generateReviewSchema(itemReviewedName, ratingValue, reviewBody, authorName);
  return <JsonLdSchema schema={schema} id={id || `review-schema-${itemReviewedName.toLowerCase().replace(/\s+/g, "-")}`} />;
}

export default ReviewSchema;
