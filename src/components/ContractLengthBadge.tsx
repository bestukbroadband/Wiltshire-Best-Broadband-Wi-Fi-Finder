/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface ContractLengthBadgeProps {
  months: number;
}

export function ContractLengthBadge({ months }: ContractLengthBadgeProps) {
  if (months === 0) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-900 border border-amber-200">
        No Contract (Rolling)
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">
      {months} Month Contract
    </span>
  );
}
