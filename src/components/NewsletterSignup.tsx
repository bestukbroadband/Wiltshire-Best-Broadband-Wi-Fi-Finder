/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { AdvertBanner } from "./AdvertBanner";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Log the submission as requested under guidelines
    console.log("[Newsletter Signup] New submission recorded:", {
      email,
      timestamp: new Date().toISOString()
    });

    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <div className="bg-brand-green text-white rounded-2xl p-6 md:p-8 border-b-4 border-brand-blue shadow-lg space-y-6" id="newsletter-signup-box">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg font-sans">
          <span className="text-[10px] font-bold tracking-widest text-brand-blue-light uppercase leading-none block">
            STAY UPDATED
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
            Wiltshire Rural Fibre & Mast Tracker
          </h2>
          <p className="text-xs text-stone-200 leading-relaxed">
            Sign up to receive monthly notifications of new altnet fibre rollouts, government Project Gigabit approvals, and 5G mast installations within Wiltshire villages.
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0 md:min-w-[320px]">
          {isSubmitted ? (
            <div className="flex items-center gap-2 text-xs text-brand-blue-light bg-white/5 border border-brand-blue/30 p-3.5 rounded-xl">
              <CheckCircle className="h-5 w-5 shrink-0 text-brand-blue-light" />
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
                  className="w-full px-3.5 py-2.5 pl-9 rounded-lg text-xs bg-white/10 border border-white/20 focus:border-brand-blue text-white outline-hidden placeholder:text-stone-300"
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-stone-300" />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs leading-none border border-brand-blue-light/10"
              >
                Track Now
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <AdvertBanner location="newsletter-sponsor" className="p-0 border-none bg-transparent" />
      </div>
    </div>
  );
}

export default NewsletterSignup;
