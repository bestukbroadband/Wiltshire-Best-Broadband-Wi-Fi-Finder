/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import * as Icons from "lucide-react";
import { ProviderCategory } from "../data/providerCategories";

interface ProviderCategoryCardProps {
  key?: any;
  category: ProviderCategory;
  isActive: boolean;
  onClick: () => void;
}

export function ProviderCategoryCard({ category, isActive, onClick }: ProviderCategoryCardProps) {
  // Dynamically resolve icon from lucide-react if found, otherwise default to HelpCircle
  const IconComponent = (Icons as any)[category.iconName] || Icons.HelpCircle;

  return (
    <button
      onClick={onClick}
      className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex gap-3 ${
        isActive
          ? "bg-brand-green border-brand-green text-white shadow-sm ring-2 ring-brand-green/10"
          : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-brand-gold"
      }`}
      id={`cat-card-${category.id}`}
    >
      <div className={`p-2.5 rounded-lg shrink-0 h-fit transition-colors ${
        isActive ? "bg-brand-gold text-[#1B3022]" : "bg-brand-gold-light text-brand-green"
      }`}>
        <IconComponent className="h-4.5 w-4.5" />
      </div>

      <div className="space-y-1 font-sans">
        <h3 className="text-xs font-bold leading-tight uppercase tracking-wider">
          {category.name}
        </h3>
        <p className={`text-[10px] leading-relaxed line-clamp-2 ${
          isActive ? "text-stone-200" : "text-stone-500"
        }`}>
          {category.description}
        </p>
      </div>
    </button>
  );
}
