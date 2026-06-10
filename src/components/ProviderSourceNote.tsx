/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Calendar, ShieldCheck, ExternalLink } from "lucide-react";

interface ProviderSourceNoteProps {
  sourceName?: string;
  lastCheckedDate?: string;
  sourceUrl?: string;
  onClickAvailability?: () => void;
  className?: string;
  isDark?: boolean;
}

export function ProviderSourceNote({
  sourceName = "Official Broadband Registry",
  lastCheckedDate = "Unknown",
  sourceUrl,
  onClickAvailability,
  className = "",
  isDark = false,
}: ProviderSourceNoteProps) {
  const textColor = isDark ? "text-slate-300" : "text-slate-600";
  const labelColor = isDark ? "text-slate-400" : "text-slate-500";
  const iconColor = isDark ? "text-brand-gold" : "text-brand-green";

  return (
    <div
      className={`p-3 rounded-lg border text-[11px] space-y-2 leading-relaxed ${
        isDark
          ? "bg-slate-900 border-slate-700/50"
          : "bg-slate-50 border-slate-200"
      } ${className}`}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <div className="flex items-center gap-1">
          <ShieldCheck className={`h-3.5 w-3.5 ${iconColor}`} />
          <span>
            <strong className={labelColor}>Source Checked:</strong>{" "}
            <span className="font-semibold">{sourceName}</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Calendar className={`h-3.5 w-3.5 ${labelColor}`} />
          <span>
            <strong className={labelColor}>Last Reviewed:</strong>{" "}
            <span>{lastCheckedDate}</span>
          </span>
        </div>
      </div>

      <div className="pt-1 flex items-center justify-between border-t border-slate-200/40">
        <span className={textColor}>Availability varies by exact address.</span>
        
        {onClickAvailability ? (
          <button
            onClick={onClickAvailability}
            className={`font-black tracking-tight inline-flex items-center gap-1 text-[10.5px] cursor-pointer hover:underline ${
              isDark ? "text-brand-gold" : "text-brand-green"
            }`}
          >
            Check provider availability
            <ExternalLink className="h-2.5 w-2.5" />
          </button>
        ) : sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-black tracking-tight inline-flex items-center gap-1 text-[10.5px] hover:underline ${
              isDark ? "text-brand-gold" : "text-brand-green"
            }`}
          >
            Check provider availability
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default ProviderSourceNote;
