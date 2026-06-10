/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Send, FileCheck, DollarSign } from "lucide-react";

export function AdvertiseForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    companyType: "Broadband Provider",
    targetTowns: "",
    monthlyBudget: "£100 - £500",
    campaignGoal: "Brand Awareness",
    preferredFormat: "Town page sponsorship",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatOptions = [
    "Homepage leaderboard",
    "Town page sponsorship",
    "Sponsored provider listing",
    "Sponsored deal placement",
    "Rural broadband feature",
    "Alternative network feature",
    "Newsletter sponsorship",
    "Lead generation campaign",
    "Local launch campaign",
    "Provider profile page",
    "Category sponsorship",
    "Mobile banner placement"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("[Advertise Verification Log] Campaign Request Filed:", {
        ...formData,
        id: `campaign-${Math.random().toString(36).substr(2, 9)}`,
        submittedAt: new Date().toISOString()
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  if (isSuccess) {
    return (
      <div className="bg-brand-gold-light border border-brand-gold/30 p-6 rounded-2xl text-center space-y-3" id="advertise-form-success">
        <div className="h-10 w-10 bg-brand-green text-brand-gold rounded-full flex items-center justify-center font-bold text-lg mx-auto shadow-sm shadow-[#1B3022]/20">
          ✔
        </div>
        <h4 className="text-base font-bold text-brand-green font-sans">Enquiry Submitted Successfully</h4>
        <p className="text-xs text-stone-650 leading-relaxed max-w-sm mx-auto">
          Thank you for your campaign enquiry. Our partnership director will review your targeted regions and send over the media pack rate sheet within one business day. You can also follow up directly at{" "}
          <a
            href="mailto:bestukbroaband@proton.me"
            className="underline font-bold text-brand-green hover:text-emerald-900 transition-colors"
            id="advertise-success-email-link"
          >
            Info
          </a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-4" id="advertise-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Company Name *</label>
          <input
            type="text"
            name="companyName"
            required
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="e.g. Regional Broadband Partner Ltd"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg outline-hidden bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Contact Name *</label>
          <input
            type="text"
            name="contactName"
            required
            value={formData.contactName}
            onChange={handleInputChange}
            placeholder="e.g. Sarah Jennings"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg outline-hidden bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Work Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="e.g. contact@localprovider.co.uk"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg outline-hidden bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="e.g. 01722 456789"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg outline-hidden bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Business Type</label>
          <select
            name="companyType"
            value={formData.companyType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          >
            <option value="Broadband Provider">Broadband Network Operator (Altnet)</option>
            <option value="Mainstream National">National Consumer Brand</option>
            <option value="Telecoms Reseller">Partner Agency / Reseller</option>
            <option value="Local Tech Firm">Regional Technology Business</option>
            <option value="Home Working Provider">Home Assistant Supplier</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Estimated Monthly Budget</label>
          <select
            name="monthlyBudget"
            value={formData.monthlyBudget}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          >
            <option value="Under £100">Under £100 / month</option>
            <option value="£100 - £500">£100 - £500 / month</option>
            <option value="£500 - £1,000">£500 - £1,000 / month</option>
            <option value="Over £1,000">Over £1,000 / month (Full County Takeover)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Campaign Goal</label>
          <select
            name="campaignGoal"
            value={formData.campaignGoal}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          >
            <option value="Brand Awareness">Brand Awareness & Local Coverage Launch</option>
            <option value="Lead Generation">Exclusive Lead Acquisitions (by postcode)</option>
            <option value="Contract Signups">Direct Link Swapping Specials</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Preferred Advert Placement</label>
          <select
            name="preferredFormat"
            value={formData.preferredFormat}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          >
            {formatOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Target Wiltshire Towns, Villages or Postcode Areas</label>
        <input
          type="text"
          name="targetTowns"
          value={formData.targetTowns}
          onChange={handleInputChange}
          placeholder="e.g. Devizes, Worton, Calne SN11"
          className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Message Details</label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Outline any special target villages, fibre build launch schedules, or custom requests."
          className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 px-4 bg-brand-green hover:bg-brand-green-hover disabled:bg-stone-300 text-white rounded-lg text-xs font-bold font-sans transition-all flex items-center justify-center gap-1 cursor-pointer leading-none shadow-3xs"
      >
        <span>{isSubmitting ? "Submitting Campaign Details..." : "File Commercial Enquiry"}</span>
        <Send className="h-3 w-3" />
      </button>

      <p className="text-[11px] text-stone-500 text-center leading-normal">
        Alternatively, please direct your commercial enquiries via email to{" "}
        <a 
          href="mailto:bestukbroaband@proton.me" 
          className="underline font-bold text-brand-green hover:text-emerald-900 transition-colors"
          id="advertise-direct-email-link"
        >
          Info
        </a>.
      </p>
    </form>
  );
}
export default AdvertiseForm;
