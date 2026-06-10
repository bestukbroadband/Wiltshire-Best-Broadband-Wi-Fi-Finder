/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface PriceDisclaimerProps {
  customText?: string;
  className?: string;
}

export function PriceDisclaimer({ customText, className = "" }: PriceDisclaimerProps) {
  const defaultText = "Offers are checked regularly where possible. Final pricing, speeds, availability and contract terms must be confirmed by the provider.";
  return (
    <p className={`text-[11px] leading-normal text-slate-500 ${className}`}>
      * {customText || defaultText}
    </p>
  );
}
