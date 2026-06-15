/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Info, HelpCircle } from "lucide-react";

export function RuralBroadbandWiltshire() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" id="rural-broadband-wiltshire">
      {/* Compare broadband providers to check across Wiltshire */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-3.5 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-green/10 rounded-xl text-brand-green border border-brand-green/20">
            <Info className="h-5 w-5" />
          </div>
          <h2 className="text-lg md:text-xl font-black text-[#091e36] tracking-tight leading-tight">
            Compare broadband providers to check across Wiltshire
          </h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-semibold">
          Wiltshire Broadband Finder helps you check listed broadband and WiFi options across towns, villages and rural postcode areas. We group national providers, regional broadband networks, full fibre options, mobile broadband and satellite choices so you can quickly open the right provider checkers.
        </p>
      </div>

      {/* Why postcode checks matter */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-3.5 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-50 rounded-xl text-amber-900 border border-amber-200">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-lg md:text-xl font-black text-[#091e36] tracking-tight leading-tight">
            Why postcode checks matter
          </h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-semibold">
          Broadband coverage can change from one street to the next. A provider may serve one part of a town but not another, so final availability must always be checked using the provider’s own address checker.
        </p>
      </div>
    </div>
  );
}

export default RuralBroadbandWiltshire;
