/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface SeoFaqSectionProps {
  faqItems: FAQItem[];
}

export function SeoFaqSection({ faqItems }: SeoFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqItems || faqItems.length === 0) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
        <HelpCircle className="h-5 w-5 text-indigo-600 font-bold" />
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors focus:outline-none"
              >
                <span className="text-sm font-bold text-slate-800 font-sans tracking-tight">
                  {item.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-slate-500 shrink-0 ml-3" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-500 shrink-0 ml-3" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/20">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SeoFaqSection;
