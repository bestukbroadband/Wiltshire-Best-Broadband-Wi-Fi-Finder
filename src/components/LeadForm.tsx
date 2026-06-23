/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, ShieldCheck, MessageSquare } from "lucide-react";
import { Provider } from "../types";

interface LeadFormProps {
  preSelectedProvider?: any;
  onSubmitSuccess?: () => void;
  className?: string;
}

export function LeadForm({ preSelectedProvider, onSubmitSuccess, className = "" }: LeadFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postcode: "",
    townOrVillage: "",
    reasonForEnquiry: "Newsletter signup",
    message: "",
    consentCheckbox: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      consentCheckbox: e.target.checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.consentCheckbox) {
      setErrorMessage("You must agree to the updates and newsletter consent before submitting.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      let utm_source = "";
      let utm_medium = "";
      let utm_campaign = "";
      try {
        const urlParams = new URLSearchParams(window.location.search);
        utm_source = urlParams.get("utm_source") || "";
        utm_medium = urlParams.get("utm_medium") || "";
        utm_campaign = urlParams.get("utm_campaign") || "";
      } catch (err) {
        console.error("Could not parse search params:", err);
      }

      const submissionPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        postcode: formData.postcode,
        townOrVillage: formData.townOrVillage,
        reasonForEnquiry: formData.reasonForEnquiry,
        message: formData.message,
        consentCheckbox: formData.consentCheckbox,
        
        formPurpose: "newsletter_and_site_updates",
        region: "wiltshire",
        sourcePage: typeof window !== "undefined" ? window.location.href : "unknown",
        postcodeArea: formData.postcode ? formData.postcode.trim().toUpperCase().split(/\s+/)[0] : "wiltshire",
        utm_source,
        utm_medium,
        utm_campaign,

        id: `update-${Math.random().toString(36).substr(2, 9)}`,
        submittedAt: new Date().toISOString()
      };

      console.log("[Wiltshire Updates Form] Subscription Submitted:", submissionPayload);

      const existingSubscribers = JSON.parse(localStorage.getItem("wiltshire_subscribers") || "[]");
      existingSubscribers.push(submissionPayload);
      localStorage.setItem("wiltshire_subscribers", JSON.stringify(existingSubscribers));

      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="bg-white border-2 border-brand-green/40 rounded-2xl p-6 text-center space-y-4 animate-scaleUp text-slate-900" id="lead-form-success">
        <div className="h-14 w-14 bg-brand-green text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto shadow-md">
          ✔
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl font-black text-brand-green tracking-tight font-sans">Subscription Active</h3>
          <p className="text-sm text-slate-700 leading-relaxed max-w-md mx-auto font-bold">
            Thanks! You have been successfully added to our Wiltshire broadband update list.
          </p>
        </div>
        <p className="text-xs text-slate-500 font-bold font-sans">
          Occasional updates, tracked promotions and rural connectivity changes will be delivered straight to your email. Alternatively, query directly at <a href="mailto:bestukbroaband@proton.me" className="text-brand-green underline font-black">bestukbroaband@proton.me</a>.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-md ${className}`} id="lead-form-card">
      <div className="space-y-1.5 mb-5">
        <span className="text-xs font-black text-brand-green uppercase tracking-wider block leading-none">
          Stay Informed
        </span>
        <h3 className="text-xl font-black text-[#091e36] tracking-tight font-sans">
          Get Wiltshire broadband updates
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed font-semibold">
          Sign up for occasional updates about broadband availability, tracked offers, rural connectivity news and provider changes across Wiltshire. We do not sell broadband directly and cannot confirm address level availability. For package details or installation questions, please use the provider’s own availability checker.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-3 bg-red-50 text-red-900 border-red-200 border rounded-lg text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* PRIMARY FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-lg focus:border-brand-green bg-white text-slate-900 font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Last Name *</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-lg focus:border-brand-green bg-white text-slate-900 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 pl-8 text-xs border border-slate-300 rounded-lg focus:border-brand-green bg-white text-slate-900 font-bold"
              />
              <Mail className="absolute left-2.5 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Phone Number (Optional)</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 pl-8 text-xs border border-slate-300 rounded-lg focus:border-brand-green bg-white text-slate-900 font-bold"
              />
              <Phone className="absolute left-2.5 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* REGIONAL LOCALITIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Town or Village *</label>
            <input
              type="text"
              name="townOrVillage"
              placeholder="e.g. Worton"
              required
              value={formData.townOrVillage}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-lg focus:border-brand-green bg-white text-slate-900 font-bold placeholder-slate-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Postcode *</label>
            <input
              type="text"
              name="postcode"
              placeholder="e.g. SN10 5"
              required
              value={formData.postcode}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-lg focus:border-brand-green bg-white text-slate-900 font-bold placeholder-slate-400"
            />
          </div>
        </div>

        {/* REASON FOR ENQUIRY */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Reason for enquiry</label>
          <select
            name="reasonForEnquiry"
            value={formData.reasonForEnquiry}
            onChange={handleInputChange}
            className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-lg focus:border-brand-green bg-white text-slate-905 font-bold"
          >
            <option value="Newsletter signup">Newsletter signup</option>
            <option value="Local broadband updates">Local broadband updates</option>
            <option value="Provider or network news">Provider or network news</option>
            <option value="Advertising or sponsorship enquiry">Advertising or sponsorship enquiry</option>
            <option value="Suggest a correction">Suggest a correction</option>
            <option value="General site feedback">General site feedback</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* MESSAGE COMPONENT */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Your Message / Feedback (Optional)</label>
          <div className="relative">
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Type any questions, feedback or corrections here..."
              className="w-full px-3.5 py-2.5 pl-8 text-xs border border-slate-300 rounded-lg focus:border-brand-green bg-white text-slate-900 font-bold placeholder-slate-400"
            />
            <MessageSquare className="absolute left-2.5 top-3.5 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* CONSENT BOX */}
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="consentCheckbox"
              required
              checked={formData.consentCheckbox}
              onChange={handleCheckboxChange}
              className="rounded text-brand-green h-4 w-4 focus:ring-brand-green border-slate-300 bg-white shrink-0 mt-0.5 cursor-pointer"
            />
            <span className="text-xs leading-relaxed text-slate-700 font-bold" id="consent-declaration-text">
              I agree to be contacted about broadband updates, newsletter content or my general enquiry. I understand this site does not sell broadband directly and that provider availability must be checked with the provider.
            </span>
          </label>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 bg-brand-green hover:bg-brand-green-hover text-white disabled:bg-slate-200 disabled:text-slate-400 rounded-xl text-sm font-black transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer leading-none"
        >
          {isSubmitting ? "Submitting..." : "Stay updated"}
          <Send className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-slate-500 font-bold border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" />
            <span>Independent local site. We do not sell broadband directly.</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Direct email enquiry: <a href="mailto:bestukbroaband@proton.me" className="text-brand-green hover:underline font-extrabold">bestukbroaband@proton.me</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LeadForm;
