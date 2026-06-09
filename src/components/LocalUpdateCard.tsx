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
    <article className="bg-[#12192c] border-2 border-slate-700/60 rounded-xl overflow-hidden hover:border-brand-gold/50 hover:shadow-lg hover:shadow-brand-gold/5 transition-all flex flex-col justify-between" id={`blog-${update.id}`}>
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-350 font-bold">
          <span className="px-2 py-0.5 bg-brand-gold-light text-slate-950 rounded-full font-sans font-black">
            {update.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-brand-gold" />
            {update.publishedDate}
          </span>
        </div>

        <h3 className="text-base font-black text-white leading-snug hover:text-brand-gold transition-colors">
          <button onClick={() => onReadMore(update)} className="text-left font-black font-sans cursor-pointer">
            {update.title}
          </button>
        </h3>

        <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed font-semibold">
          {update.excerpt}
        </p>
      </div>

      <div className="px-5 py-3 bg-slate-900 border-t-2 border-slate-800 flex justify-between items-center">
        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
          <User className="h-3 w-3 text-brand-gold" />
          By {update.author}
        </span>
        
        <button
          onClick={() => onReadMore(update)}
          className="text-xs font-black text-brand-gold hover:text-brand-gold-hover flex items-center gap-1 cursor-pointer transition-colors"
        >
          Read article
          <ArrowRight className="h-3.5 w-3.5 animate-none" />
        </button>
      </div>
    </article>
  );
}
export default LocalUpdateCard;
