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
  const defaultText = "Example price only. Final pricing, hardware compatibility, and exact local coverage will be confirmed directly by the provider upon formal address check.";
  return (
    <p className={`text-[11px] leading-normal text-slate-500 ${className}`}>
      * {customText || defaultText}
    </p>
  );
}
