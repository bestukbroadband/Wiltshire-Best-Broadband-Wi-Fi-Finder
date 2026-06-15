/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    console.log("[Newsletter Signup] New submission recorded:", {
      email,
      timestamp: new Date().toISOString()
    });

    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs space-y-6" id="newsletter-signup-box">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg font-sans">
          <span className="text-xs font-black tracking-wider text-brand-green uppercase leading-none block">
            STAY UPDATED
          </span>
          <h2 className="text-xl md:text-2xl font-black text-[#091e36]">
            Get Wiltshire broadband updates
          </h2>
          <p className="text-sm text-slate-800 leading-relaxed font-semibold">
            Sign up for occasional updates about broadband availability, tracked offers, rural connectivity news and provider changes across Wiltshire. We do not sell broadband directly and cannot confirm address level availability.
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0 md:min-w-[320px]">
          {isSubmitted ? (
            <div className="flex items-center gap-2 text-xs text-teal-900 bg-teal-50 border border-teal-250 p-4 rounded-xl">
              <CheckCircle className="h-5 w-5 shrink-0 text-teal-800" />
              <p className="font-bold">Thanks for signing up! We'll keep you posted on Wiltshire broadband developments.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="name@postcode.co.uk"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-3 pl-9 rounded-xl text-xs bg-white border border-slate-300 focus:border-brand-green text-slate-900 outline-hidden placeholder:text-slate-400 font-bold"
                />
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              </div>
              <button
                type="submit"
                className="px-4 py-3 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs leading-none"
              >
                Track Now
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsletterSignup;
