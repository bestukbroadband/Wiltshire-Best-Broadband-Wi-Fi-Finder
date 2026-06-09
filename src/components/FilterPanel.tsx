/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Filter, RotateCcw, ShieldCheck, Zap, Coins, Sliders } from "lucide-react";
import { ProviderType } from "../types";

export interface FilterState {
  searchQuery: string;
  selectedTypes: ProviderType[];
  maxMonthlyPrice: number;
  minSpeed: number;
  maxContractLength: number; // 0 (rolling) or 12 or 18 or 24
  noSetupFee: boolean;
  routerIncluded: boolean;
  noKnownPriceRise: boolean; // price lock
  lowestUpfrontCost: boolean;
}

export const initialFilterState: FilterState = {
  searchQuery: "",
  selectedTypes: [],
  maxMonthlyPrice: 80,
  minSpeed: 30,
  maxContractLength: 24,
  noSetupFee: false,
  routerIncluded: false,
  noKnownPriceRise: false,
  lowestUpfrontCost: false
};

interface FilterPanelProps {
  filters: FilterState;
  onChange: (updater: (prev: FilterState) => FilterState) => void;
  onReset: () => void;
  resultCount: number;
}

export function FilterPanel({ filters, onChange, onReset, resultCount }: FilterPanelProps) {
  const providerTypesList: { label: string; value: ProviderType }[] = [
    { label: "Alternative Networks", value: "Alternative network providers" },
    { label: "Mainstream Brands", value: "Mainstream broadband providers" },
    { label: "FTTP (Full Fibre)", value: "Full fibre providers" },
    { label: "Openreach Based", value: "Openreach based providers" },
    { label: "Rural Specialized", value: "Rural broadband providers" },
    { label: "Wireless / FWA", value: "Wireless broadband providers" },
    { label: "5G Home Broadband", value: "5G home broadband providers" },
    { label: "LEO Satellite", value: "Satellite broadband providers" },
    { label: "Business High-SLA", value: "Business broadband providers" }
  ];

  const toggleType = (type: ProviderType) => {
    onChange((prev) => {
      const isSelected = prev.selectedTypes.includes(type);
      return {
        ...prev,
        selectedTypes: isSelected
          ? prev.selectedTypes.filter((t) => t !== type)
          : [...prev.selectedTypes, type]
      };
    });
  };

  return (
    <div className="bg-[#12192c] border-2 border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-5" id="filter-panel">
      <div className="flex items-center justify-between border-b-2 border-slate-700/50 pb-3">
        <div className="flex items-center gap-1.5 text-white font-black font-sans text-xs">
          <Filter className="h-4.5 w-4.5 text-brand-gold" />
          <span className="uppercase tracking-wider">Filters & Sort Options</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-black text-slate-300 hover:text-brand-gold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-300" />
          Reset All
        </button>
      </div>

      {/* MATCH COUNT */}
      <div className="text-xs text-slate-200 font-black bg-slate-900/60 py-2 px-3 rounded-lg flex justify-between items-center border border-slate-700/80 shadow-3xs">
        <span className="font-extrabold text-slate-300">Matching listings found:</span>
        <span className="font-black text-white bg-brand-blue px-2 py-0.5 rounded font-mono text-[11px]">{resultCount} items</span>
      </div>

      {/* FILTER BY PROVIDER CATEGORIES */}
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-205 uppercase tracking-widest block flex items-center gap-1 font-sans">
          <Zap className="h-4 w-4 text-brand-gold animate-pulse" />
          Network Structure
        </label>
        <div className="flex flex-col gap-1.5 font-sans">
          {providerTypesList.map((item) => {
            const isChecked = filters.selectedTypes.includes(item.value);
            return (
              <label
                key={item.value}
                className={`flex items-center justify-between text-xs px-3 py-2 border-2 rounded-lg cursor-pointer transition-all ${
                  isChecked
                    ? "bg-brand-blue/30 border-brand-blue text-[#a2d0ff] font-black shadow-sm"
                    : "bg-[#18233c] border-slate-700/60 text-slate-200 hover:bg-[#1f2d4e] font-bold"
                }`}
              >
                <span className="truncate">{item.label}</span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleType(item.value)}
                  className="rounded text-brand-blue h-4 w-4 focus:ring-brand-blue border-slate-500 ml-2 cursor-pointer accent-brand-blue bg-slate-900"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* SLIDERS: PRICE AND SPEED */}
      <div className="space-y-4 border-t-2 border-slate-700/50 pt-4">
        {/* PRICE RANGE */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-baseline font-sans">
            <label className="text-xs font-black text-slate-205 uppercase tracking-widest block flex items-center gap-1">
              <Coins className="h-4 w-4 text-brand-gold" />
              Monthly Cost
            </label>
            <span className="text-xs font-black text-brand-gold">Up to £{filters.maxMonthlyPrice}/mo</span>
          </div>
          <input
            type="range"
            min="20"
            max="80"
            step="1"
            value={filters.maxMonthlyPrice}
            onChange={(e) => onChange((prev) => ({ ...prev, maxMonthlyPrice: Number(e.target.value) }))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-gold"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-sans font-bold">
            <span>£20 / mo</span>
            <span>£80 / mo</span>
          </div>
        </div>

        {/* SPEED RANGE */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-baseline font-sans">
            <label className="text-xs font-black text-slate-205 uppercase tracking-widest block flex items-center gap-1">
              <Sliders className="h-4 w-4 text-brand-blue" />
              Minimum Speed
            </label>
            <span className="text-xs font-black text-brand-blue">{filters.minSpeed} Mbps+</span>
          </div>
          <input
            type="range"
            min="30"
            max="500"
            step="10"
            value={filters.minSpeed}
            onChange={(e) => onChange((prev) => ({ ...prev, minSpeed: Number(e.target.value) }))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-blue"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-sans font-bold">
            <span>30 Mbps</span>
            <span>500 Mbps</span>
          </div>
        </div>
      </div>

      {/* OPTIONAL SWITCHES */}
      <div className="space-y-2 border-t-2 border-slate-700/50 pt-4">
        <label className="text-xs font-black text-slate-205 uppercase tracking-widest block">
          Key Requirements
        </label>

        {/* CONTRACT LENGTH LIMIT */}
        <div className="space-y-1.5">
          <span className="text-[11px] text-slate-300 block font-bold">Maximum Contract Duration</span>
          <div className="grid grid-cols-4 gap-1">
            {[0, 12, 18, 24].map((length) => (
              <button
                key={length}
                type="button"
                onClick={() => onChange((prev) => ({ ...prev, maxContractLength: length }))}
                className={`py-1.5 text-[11px] font-black border-2 rounded-md cursor-pointer transition-all ${
                  filters.maxContractLength === length
                    ? "bg-brand-blue border-brand-blue text-white shadow-xs font-black"
                    : "bg-[#18233c] border-slate-700 text-slate-200 hover:bg-[#1f2d4e]"
                }`}
              >
                {length === 0 ? "Rolling" : `${length}m`}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5 pt-2 flex flex-col font-sans">
          {/* NO SETUP FEE */}
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-200 uppercase tracking-wide">
            <input
              type="checkbox"
              checked={filters.noSetupFee}
              onChange={(e) => onChange((prev) => ({ ...prev, noSetupFee: e.target.checked }))}
              className="rounded text-brand-blue h-4 w-4 focus:ring-brand-blue border-slate-600 bg-slate-900"
            />
            <span>No Upfront Setup Fees</span>
          </label>

          {/* ROUTER INCLUDED */}
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-200 uppercase tracking-wide">
            <input
              type="checkbox"
              checked={filters.routerIncluded}
              onChange={(e) => onChange((prev) => ({ ...prev, routerIncluded: e.target.checked }))}
              className="rounded text-brand-blue h-4 w-4 focus:ring-brand-blue border-slate-600 bg-slate-900"
            />
            <span>Free Router Included</span>
          </label>

          {/* NO KNOWN PRICE RISE */}
          <label className="flex items-center gap-2 cursor-pointer uppercase tracking-wide">
            <input
              type="checkbox"
              checked={filters.noKnownPriceRise}
              onChange={(e) => onChange((prev) => ({ ...prev, noKnownPriceRise: e.target.checked }))}
              className="rounded text-brand-blue h-4 w-4 focus:ring-brand-blue border-slate-600 bg-slate-900 pointer-events-auto"
            />
            <span className="text-xs font-black text-brand-green-light flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-green-light animate-pulse" />
              Price Freeze Locked
            </span>
          </label>

          {/* LOWEST UPFRONT COST */}
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-200 uppercase tracking-wide font-sans">
            <input
              type="checkbox"
              checked={filters.lowestUpfrontCost}
              onChange={(e) => onChange((prev) => ({ ...prev, lowestUpfrontCost: e.target.checked }))}
              className="rounded text-brand-blue h-4 w-4 focus:ring-brand-blue border-slate-600 bg-slate-900"
            />
            <span>Zero Installation Fees</span>
          </label>
        </div>
      </div>
    </div>
  );
}
