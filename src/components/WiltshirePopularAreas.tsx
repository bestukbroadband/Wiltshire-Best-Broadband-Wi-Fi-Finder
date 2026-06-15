/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MapPin, ArrowRight } from "lucide-react";

interface WiltshirePopularAreasProps {
  onAreaSubmit: (postcodeOrName: string) => void;
}

export function WiltshirePopularAreas({ onAreaSubmit }: WiltshirePopularAreasProps) {
  const areas = [
    { name: "Devizes", postcode: "SN10", label: "Devizes (SN10)" },
    { name: "Market Lavington", postcode: "SN10", label: "Market Lavington (SN10)" },
    { name: "Marlborough", postcode: "SN8", label: "Marlborough (SN8)" },
    { name: "Pewsey", postcode: "SN9", label: "Pewsey (SN9)" },
    { name: "Calne", postcode: "SN11", label: "Calne (SN11)" },
    { name: "Melksham", postcode: "SN12", label: "Melksham (SN12)" },
    { name: "Chippenham", postcode: "SN15", label: "Chippenham (SN14/SN15)" },
    { name: "Corsham", postcode: "SN13", label: "Corsham (SN13)" },
    { name: "Malmesbury", postcode: "SN16", label: "Malmesbury (SN16)" },
    { name: "Trowbridge", postcode: "BA14", label: "Trowbridge (BA14)" },
    { name: "Bradford on Avon", postcode: "BA15", label: "Bradford on Avon (BA15)" },
    { name: "Warminster", postcode: "BA12", label: "Warminster (BA12)" },
    { name: "Westbury", postcode: "BA13", label: "Westbury (BA13)" },
    { name: "Salisbury", postcode: "SP1", label: "Salisbury (SP1/SP2)" },
    { name: "Amesbury", postcode: "SP4", label: "Amesbury (SP4)" },
    { name: "Tidworth", postcode: "SP9", label: "Tidworth (SP9)" },
    { name: "Royal Wootton Bassett", postcode: "SN4", label: "Royal Wootton Bassett (SN4)" },
    { name: "Swindon", postcode: "SN1", label: "Swindon (SN1/2/3/5)" },
    { name: "Cricklade", postcode: "SN6", label: "Cricklade (SN6)" },
    { name: "Highworth", postcode: "SN6", label: "Highworth (SN6)" },
  ];

  return (
    <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs" id="popular-wiltshire-areas">
      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 border border-brand-green/20 text-brand-green rounded-full text-xs font-black tracking-wider uppercase">
          <MapPin className="h-3 w-3" />
          Popular Wiltshire Areas
        </div>
        <h2 className="text-xl md:text-2xl font-black text-[#091e36] tracking-tight">
          Broadband &amp; WiFi Checkers by Town or Postcode
        </h2>
        <p className="text-sm text-slate-700 font-semibold leading-relaxed">
          Select a Wiltshire area below to see listed broadband provider choices and available address-level checkers immediately.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-3">
        {areas.map((area) => (
          <button
            key={area.name}
            onClick={() => onAreaSubmit(area.postcode)}
            className="p-3.5 bg-slate-50 border border-slate-200 hover:border-brand-green/40 hover:bg-brand-green/5 text-slate-800 hover:text-brand-green rounded-xl transition-all font-sans font-bold text-xs flex items-center justify-between text-left cursor-pointer group shadow-2xs"
          >
            <span className="truncate pr-1.5">{area.label}</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-brand-green transition-transform group-hover:translate-x-0.5 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default WiltshirePopularAreas;
