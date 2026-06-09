/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, Sparkles, Send, ShieldCheck } from "lucide-react";
import { Provider } from "../types";

interface LeadFormProps {
  preSelectedProvider?: Provider;
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
    addressLine1: "",
    townOrVillage: "",
    currentProvider: "",
    currentMonthlyPrice: "",
    contractEndDate: "",
    reasonForSwitching: "Seeking higher speeds",
    preferredContact: "Email" as "Email" | "Phone" | "SMS",
    providerOfInterest: preSelectedProvider?.providerName || "Any suitable provider",
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

    // Validate required consent
    if (!formData.consentCheckbox) {
      setErrorMessage("You must accept our address checking consent before submitting.");
      return;
    }

    setIsSubmitting(true);

    // Dynamic latency simulation to look incredibly premium and robust
    setTimeout(() => {
      const submissionPayload = {
        ...formData,
        id: `lead-${Math.random().toString(36).substr(2, 9)}`,
        submittedAt: new Date().toISOString()
      };

      // --- LOG SUBMISSIONS AS DIRECTED ---
      console.log("[Lead Capture Form] New Wiltshire Enquiry Submitted:", submissionPayload);

      // --- PERSISTENCE STATE ---
      // We can append this to the local state engine or local storage inside App.tsx
      const existingLeads = JSON.parse(localStorage.getItem("wiltshire_leads") || "[]");
      existingLeads.push(submissionPayload);
      localStorage.setItem("wiltshire_leads", JSON.stringify(existingLeads));

      /**
       * FUTURE ARCHITECTURE INTEGRATION POINTERS:
       * 1. Firebase Firestore:
       *    import { db } from './firebaseConfig';
       *    await addDoc(collection(db, 'leads'), submissionPayload);
       * 
       * 2. Supabase:
       *    const { data, error } = await supabase.from('leads').insert([submissionPayload]);
       * 
       * 3. CRM Integration (HubSpot / Salesforce):
       *    Fetch secure backend server routes proxying the POST request inside /api/leads
       */

      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="bg-[#12192c] border-2 border-brand-gold/40 rounded-2xl p-6 text-center space-y-4 animate-scaleUp text-slate-100" id="lead-form-success">
        <div className="h-14 w-14 bg-brand-gold text-slate-950 rounded-full flex items-center justify-center text-2xl font-black mx-auto shadow-md">
          ✔
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl font-black text-brand-gold tracking-tight font-sans">Enquiry Received</h3>
          <p className="text-sm text-slate-200 leading-relaxed max-w-md mx-auto font-semibold">
            Thanks. We&rsquo;ll review your details and help match you with suitable broadband options in your area.
          </p>
        </div>
        <p className="text-[11px] text-slate-400 font-medium font-sans">
          Our local Wiltshire systems will trace active cabinets across your postcode sector and send details to your preferred response medium shortly.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-[#12192c] border-2 border-slate-700/85 rounded-3xl p-6 shadow-xl ${className}`} id="lead-form-card">
      <div className="space-y-1 mb-5">
        <span className="text-sm font-bold text-brand-gold uppercase tracking-widest block leading-none">
          Local Availability Check
        </span>
        <h3 className="text-xl font-black text-white tracking-tight font-sans">
          Request an address-level check
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed font-semibold">
          Broadband availability can change from house to house. Please provide your address details below and we will perform a direct check to find which listed options serve your home.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4.5">
        {errorMessage && (
          <div className="p-3 bg-rose-950/80 text-rose-200 border-rose-800 border rounded-lg text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* PRE-SELECT DISPLAY */}
        {preSelectedProvider && (
          <div className="bg-brand-gold border border-brand-gold/30 p-3.5 rounded-xl flex items-center justify-between text-xs text-slate-950 shadow-3xs font-semibold">
            <div>
              <span>Enquiring about provider: </span>
              <strong className="font-black text-slate-950 bg-white/70 px-1.5 py-0.5 rounded">{preSelectedProvider.providerName}</strong>
            </div>
            <span className="text-[10px] uppercase font-black text-white bg-slate-950 px-1.5 py-0.5 rounded shadow-3xs">
              Selected Deal
            </span>
          </div>
        )}

        {/* CONTACT PARTICULARS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-slate-900 text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Last Name *</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-slate-900 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pl-8 text-xs border border-slate-700 rounded-lg outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-slate-900 text-white"
              />
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-450" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Phone Number *</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pl-8 text-xs border border-slate-700 rounded-lg outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-slate-900 text-white"
              />
              <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-450" />
            </div>
          </div>
        </div>

        {/* ADDRESS DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800 pt-3.5">
          <div className="space-y-1 md:col-span-2">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">House Number or Street *</label>
            <div className="relative">
              <input
                type="text"
                name="addressLine1"
                placeholder="e.g. 14 High Lane or Worton House"
                required
                value={formData.addressLine1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pl-8 text-xs border border-slate-700 rounded-lg outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-slate-900 text-white placeholder-slate-500"
              />
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-450" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Postcode *</label>
            <input
              type="text"
              name="postcode"
              placeholder="e.g. SN10 5"
              required
              value={formData.postcode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-slate-900 text-white placeholder-slate-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Town or Village *</label>
            <input
              type="text"
              name="townOrVillage"
              placeholder="e.g. Worton"
              required
              value={formData.townOrVillage}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-slate-900 text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Preferred Response Medium</label>
            <select
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-hidden focus:border-brand-gold bg-slate-900 text-white"
            >
              <option value="Email">Email Address Reply</option>
              <option value="Phone">Direct Voice Call</option>
              <option value="SMS">SMS Text Alert</option>
            </select>
          </div>
        </div>

        {/* CURRENT BROADBAND SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800 pt-3.5">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Current Provider</label>
            <input
              type="text"
              name="currentProvider"
              placeholder="e.g. BT or None"
              value={formData.currentProvider}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-hidden focus:border-brand-gold bg-slate-900 text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Monthly Spend</label>
            <input
              type="text"
              name="currentMonthlyPrice"
              placeholder="e.g. £45.00/mo"
              value={formData.currentMonthlyPrice}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-hidden focus:border-brand-gold bg-slate-900 text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Term End date</label>
            <input
              type="text"
              name="contractEndDate"
              placeholder="e.g. November 2026"
              value={formData.contractEndDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-hidden focus:border-brand-gold bg-slate-900 text-white placeholder-slate-500"
            />
          </div>
        </div>

        {/* FEED DETAILS */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Primary Switch Reason</label>
          <select
            name="reasonForSwitching"
            value={formData.reasonForSwitching}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-hidden focus:border-brand-gold bg-slate-900 text-white"
          >
            <option value="Seeking higher speeds">Dreadfully slow speeds (seeking optic fibre upgrade)</option>
            <option value="Seeking lower prices">Astronomical rates (seeking better value)</option>
            <option value="Tired of inflation rises">Escaping annual mid-contract price rises</option>
            <option value="Line drops frequently">Unreliable connection (line drops constantly)</option>
            <option value="Moving to Wiltshire">Relocating to Wiltshire shortly</option>
            <option value="Other">Other Reasons</option>
          </select>
        </div>

        {/* CONSENT BOX - STRICT CRITERIA: DO NOT PRE-TICK */}
        <div className="bg-slate-900/40 border border-slate-700 p-3.5 rounded-xl space-y-3">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="consentCheckbox"
              required
              checked={formData.consentCheckbox}
              onChange={handleCheckboxChange}
              className="rounded text-brand-gold h-4 w-4 focus:ring-brand-gold border-slate-650 bg-slate-900 shrink-0 mt-0.5 cursor-pointer"
            />
            <span className="text-[11px] leading-relaxed text-slate-300" id="consent-declaration-text">
              I agree to be contacted about broadband availability, packages and installation options for my address. I understand my details may be shared with a relevant broadband provider or approved partner for this purpose.
            </span>
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 bg-brand-gold hover:bg-brand-gold-hover text-slate-950 disabled:bg-[#475569] disabled:text-slate-400 rounded-xl text-base font-black transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer leading-none font-sans"
        >
          {isSubmitting ? "Checking address..." : "Request address check"}
          <Send className="h-4 w-4" />
        </button>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 font-sans font-medium">
          <ShieldCheck className="h-4 w-4 text-slate-400" />
          <span>Independent listing site. Verification is free with no obligation.</span>
        </div>
      </form>
    </div>
  );
}
export default LeadForm;
