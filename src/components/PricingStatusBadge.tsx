/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface PricingStatusBadgeProps {
  status: "Active" | "Pending Review" | "Expired";
}

export function PricingStatusBadge({ status }: PricingStatusBadgeProps) {
  let classes = "bg-brand-gold-light text-brand-green border-brand-gold/30";
  if (status === "Expired") {
    classes = "bg-rose-50 text-rose-800 border-rose-250";
  } else if (status === "Pending Review") {
    classes = "bg-stone-100 text-stone-700 border-stone-300";
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${classes}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>
      Price Status: {status}
    </span>
  );
}
