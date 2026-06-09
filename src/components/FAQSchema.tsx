/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { generateFAQSchema } from "../data/schemaMarkup";
import { JsonLdSchema } from "./JsonLdSchema";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqItems: FAQItem[];
  id?: string;
}

export function FAQSchema({ faqItems, id }: FAQSchemaProps) {
  if (!faqItems || faqItems.length === 0) return null;
  const schema = generateFAQSchema(faqItems);
  return <JsonLdSchema schema={schema} id={id || "faq-schema-markup"} />;
}

export default FAQSchema;
