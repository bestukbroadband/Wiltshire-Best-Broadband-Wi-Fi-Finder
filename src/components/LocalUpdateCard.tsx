/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { LocalUpdate } from "../types";

interface LocalUpdateCardProps {
  key?: any;
  update: LocalUpdate;
  onReadMore: (update: LocalUpdate) => void;
}

export function LocalUpdateCard({ update, onReadMore }: LocalUpdateCardProps) {
  return (
    <article className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden hover:border-brand-green/40 hover:shadow-md transition-all flex flex-col justify-between shadow-2xs" id={`blog-${update.id}`}>
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center text-xs font-bold text-slate-500">
          <span className="px-2 py-0.5 bg-brand-green/10 text-brand-green rounded-full font-black">
            {update.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {update.publishedDate}
          </span>
        </div>

        <h3 className="text-base font-black text-[#091e36] leading-snug hover:text-brand-green transition-colors">
          <button onClick={() => onReadMore(update)} className="text-left font-black font-sans cursor-pointer">
            {update.title}
          </button>
        </h3>

        <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed font-semibold">
          {update.excerpt}
        </p>
      </div>

      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
          <User className="h-3.5 w-3.5 text-slate-400" />
          By {update.author}
        </span>
        
        <button
          onClick={() => onReadMore(update)}
          className="text-xs font-black text-brand-green hover:text-brand-green-hover flex items-center gap-1 cursor-pointer transition-colors"
        >
          Read article
          <ArrowRight className="h-3.5 w-3.5 transition-transform hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}

export default LocalUpdateCard;
