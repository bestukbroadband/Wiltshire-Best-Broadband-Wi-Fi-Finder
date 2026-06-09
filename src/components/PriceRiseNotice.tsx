/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AlertCircle, FileText } from "lucide-react";

interface PriceRiseNoticeProps {
  midContractPriceRise: boolean;
  annualPriceRiseNote: string;
}

export function PriceRiseNotice({ midContractPriceRise, annualPriceRiseNote }: PriceRiseNoticeProps) {
  if (!midContractPriceRise) {
    return (
      <div className="bg-brand-gold-light border border-brand-gold/30 rounded p-2.5 text-xs text-brand-green flex items-start gap-1.5 mt-2">
        <span className="shrink-0 text-[#1B3022] font-bold mt-0.5" aria-hidden="true">✔</span>
        <div>
          <span className="font-bold">Price Lock Commitment:</span> No scheduled annual increases during your initial minimum commitment period.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 border border-stone-200 rounded p-2.5 text-[11px] leading-relaxed text-stone-800 flex items-start gap-1.5 mt-2">
      <AlertCircle className="h-3.5 w-3.5 text-stone-600 shrink-0 mt-0.5" />
      <div>
        <span className="font-semibold">Annual Price Adjustment:</span> {annualPriceRiseNote || "Subject to annual inflation-led rises in April. Verify contracts before ordering."}
      </div>
    </div>
  );
}
