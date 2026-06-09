/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { siteSettingsData } from "../data/siteSettings";

interface BrandLogoProps {
  variant?: "header" | "footer" | "iconOnly" | "darkBackground" | "lightBackground" | "appIcon";
  size?: number | string;
  showText?: boolean;
  backgroundMode?: "light" | "dark";
  className?: string;
}

export function BrandLogo({
  variant = "header",
  size,
  showText = true,
  backgroundMode = "dark",
  className = ""
}: BrandLogoProps) {
  // Determine physical size classes
  let logoSizeClass = "w-10 h-10";
  if (size) {
    logoSizeClass = typeof size === "number" ? `w-[${size}px] h-[${size}px]` : `${size}`;
  } else if (variant === "footer") {
    logoSizeClass = "w-12 h-12";
  } else if (variant === "iconOnly") {
    logoSizeClass = "w-10 h-10";
  } else if (variant === "appIcon") {
    logoSizeClass = "w-16 h-16";
  }

  // Choose the background styling based on variant or backgroundMode
  const isDarkBg = variant === "darkBackground" || variant === "footer" || (variant !== "lightBackground" && backgroundMode === "dark");
  
  // Outer enclosure styling based on variant
  let outerContainerStyle = "flex items-center justify-center rounded-xl overflow-hidden shadow-inner transition-colors border";
  if (variant === "appIcon") {
    outerContainerStyle += " bg-[#f9f7f0] border-slate-200 p-2 shadow-md rounded-2xl";
  } else if (isDarkBg) {
    outerContainerStyle += " bg-slate-950/80 border-brand-gold/40 hover:border-brand-gold p-1";
  } else {
    outerContainerStyle += " bg-slate-50 border-slate-200 hover:border-slate-300 p-1";
  }

  // SVG graphic definition
  const renderSvgGraphic = () => {
    // Colors based on the visual requirements
    const tealColor = "#024252"; // High fidelity Wiltshire blue-teal
    const creamColor = "#fcfaf2"; // Cream white background path
    const goldColor = "#dca134"; // Gold central dot
    
    // For standard variants (plain transparent or app-icon with cream bg)
    const strokeColor = tealColor;
    const pathFill = creamColor;
    const dotFill = goldColor;

    return (
      <svg
        className="w-full h-full"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* If appIcon variant, we can add a subtle background inside the SVG itself or let the container handle it */}
        {variant === "appIcon" && (
          <rect width="500" height="500" rx="100" fill="#f9f7f1" />
        )}
        
        {/* WiFi Arches */}
        <path
          d="M165 115 C205 75, 295 75, 335 115"
          stroke={strokeColor}
          strokeWidth="28"
          strokeLinecap="round"
        />
        <path
          d="M195 150 C222 120, 278 120, 305 150"
          stroke={strokeColor}
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path
          d="M225 185 C238 168, 262 168, 275 185"
          stroke={strokeColor}
          strokeWidth="18"
          strokeLinecap="round"
        />
        
        {/* Golden Central Dot / Sun transmitter */}
        <circle cx="250" cy="225" r="21" fill={dotFill} />

        {/* Stonehenge Stones (Teal Monoliths) Arranged Geometrically */}
        {/* Outermost Left */}
        <path
          d="M150 340 L165 300 Q168 290, 178 295 L190 300 Q192 310, 185 340 Z"
          fill={tealColor}
        />
        {/* Inner Left */}
        <path
          d="M195 330 L212 245 Q216 230, 235 235 L248 240 Q250 255, 230 330 Z"
          fill={tealColor}
        />
        {/* Center Pillar (Tallest) */}
        <path
          d="M240 330 L248 220 Q250 205, 270 205 L285 220 Q285 240, 275 330 Z"
          fill={tealColor}
        />
        {/* Inner Right */}
        <path
          d="M280 330 L295 250 Q298 238, 318 242 L330 252 Q328 268, 312 330 Z"
          fill={tealColor}
        />
         {/* Outermost Right */}
        <path
          d="M333 345 L346 300 Q348 290, 358 294 L370 299 Q370 310, 363 345 Z"
          fill={tealColor}
        />

        {/* Lower Hills Contour with White winding path */}
        {/* Hills background container block */}
        <path
          d="M70 350 Q160 335, 250 350 Q340 335, 430 350 C430 460, 70 460, 70 350 Z"
          fill={tealColor}
        />
        
        {/* Winding Cream Path */}
        <path
          d="M145 448 C200 420, 210 395, 245 372 C280 350, 305 352, 345 352 C340 356, 315 356, 290 375 Q265 395, 205 448 Z"
          fill={pathFill}
        />
      </svg>
    );
  };

  if (variant === "iconOnly") {
    return (
      <div className={`${outerContainerStyle} ${logoSizeClass} ${className}`} id="brand-logo-icon">
        {renderSvgGraphic()}
      </div>
    );
  }

  // Default block rendering with text side-by-side or stacked
  return (
    <div className={`flex items-center gap-3 ${className}`} id="brand-logo-full">
      <div className={`${outerContainerStyle} ${logoSizeClass}`}>
        {renderSvgGraphic()}
      </div>
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`text-sm font-black tracking-tight font-sans ${isDarkBg ? "text-white" : "text-slate-900"}`}>
            {siteSettingsData.brandName}
          </span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold -mt-0.5 block leading-none">
            Rural Wiltshire Broadband Finder
          </span>
        </div>
      )}
    </div>
  );
}

export default BrandLogo;
