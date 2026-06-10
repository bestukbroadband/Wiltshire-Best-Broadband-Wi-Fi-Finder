/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Send, FileText } from "lucide-react";

export function ListProviderForm() {
  const [formData, setFormData] = useState({
    providerName: "",
    website: "",
    contactName: "",
    email: "",
    phone: "",
    providerType: "Alternative network providers",
    networkType: "FTTP (Full Fibre)",
    areasCovered: "",
    examplePackages: "",
    installationNotes: "",
    contractLengths: "18 Months",
    setupFees: "£0.00",
    routerInformation: "WiFi 6 router included",
    knownPriceRises: "April CPI + 3.9%",
    wholesaleOption: "No",
    affiliateOrApiFeed: "No",
    approvedPricingData: "Yes",
    permitBrandAssets: "Yes",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("[List Provider Submission] New Altnet Proposal Logged:", {
        ...formData,
        id: `proposal-${Math.random().toString(36).substr(2, 9)}`,
        submittedAt: new Date().toISOString()
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 850);
  };

  if (isSuccess) {
    return (
      <div className="bg-brand-gold-light border border-brand-gold/30 p-6 rounded-2xl text-center space-y-3" id="list-provider-success">
        <div className="h-10 w-10 bg-brand-green text-brand-gold rounded-full flex items-center justify-center font-bold text-lg mx-auto shadow-sm shadow-[#1B3022]/20">
          ✔
        </div>
        <h4 className="text-base font-bold text-brand-green font-sans">Proposal Lodged Successfully</h4>
        <p className="text-xs text-stone-650 leading-relaxed max-w-sm mx-auto">
          Thank you. Your listing request is registered. Our database compliance auditor will cross-examine your package files against active Wiltshire road scopes before activating your card listing.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#F9F7F2] border border-stone-200 rounded-2xl p-6 space-y-4" id="list-provider-form">
      <div className="bg-[#F9F7F2]/80 text-[#1B3022] border border-brand-gold/45 p-3 rounded-lg text-xs leading-relaxed font-sans">
        <strong>Review Note:</strong> Listings are reviewed before publication. We may ask providers to confirm package details, coverage, pricing, contract terms, price rise information and permitted use of brand assets before listings go live.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Provider Name *</label>
          <input
            type="text"
            name="providerName"
            required
            value={formData.providerName}
            onChange={handleInputChange}
            placeholder="e.g. Broadband Networks Ltd"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-hidden"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Website URL *</label>
          <input
            type="url"
            name="website"
            required
            value={formData.website}
            onChange={handleInputChange}
            placeholder="https://broadband-networks.co.uk"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Alliance Contact Name *</label>
          <input
            type="text"
            name="contactName"
            required
            value={formData.contactName}
            onChange={handleInputChange}
            placeholder="e.g. Richard Worth"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-hidden"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Contact Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="richard@broadband-networks.co.uk"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-hidden"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Contact Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="01722 987654"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Provider Core Category</label>
          <select
            name="providerType"
            value={formData.providerType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          >
            <option value="Alternative network providers">Alternative network provider (Altnet)</option>
            <option value="Mainstream broadband providers">Mainstream broadband provider</option>
            <option value="Wireless broadband providers">Wireless broadband provider</option>
            <option value="Satellite broadband providers">Satellite broadband provider</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Network Delivery Type</label>
          <select
            name="networkType"
            value={formData.networkType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          >
            <option value="FTTP (Full Fibre)">Fibre to the Premises (FTTP / FTTH)</option>
            <option value="FTTC (Fibre Cabinet)">Fibre to the Cabinet (FTTC)</option>
            <option value="Wireless (FWA)">Fixed Wireless Access (FWA)</option>
            <option value="LEO Satellite">Low Earth Orbit Satellite</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Wiltshire Towns/Villages Covered *</label>
        <input
          type="text"
          name="areasCovered"
          required
          value={formData.areasCovered}
          onChange={handleInputChange}
          placeholder="e.g. Calne, Melksham, Devizes, Worton"
          className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-hidden"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Starter Package Examples & Speed terms *</label>
        <input
          type="text"
          name="examplePackages"
          required
          value={formData.examplePackages}
          onChange={handleInputChange}
          placeholder="e.g. Symmetrical Home Fibre: 150Mbps Symmetrical, from £25.00/mo."
          className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-hidden"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Standard Contract lengths</label>
          <input
            type="text"
            name="contractLengths"
            value={formData.contractLengths}
            onChange={handleInputChange}
            placeholder="e.g. 12 Months or 24 Months"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-hidden"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Upfront Setup & Installation Fees</label>
          <input
            type="text"
            name="setupFees"
            value={formData.setupFees}
            onChange={handleInputChange}
            placeholder="e.g. Free installation or £49 setup fee"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Router & Hardware details</label>
          <input
            type="text"
            name="routerInformation"
            value={formData.routerInformation}
            onChange={handleInputChange}
            placeholder="e.g. Wi-Fi 6 Smart router included free"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-hidden"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Mid-Contract Price Increases</label>
          <input
            type="text"
            name="knownPriceRises"
            value={formData.knownPriceRises}
            onChange={handleInputChange}
            placeholder="e.g. Fixed price freeze for contract duration"
            className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs pt-2">
        <div className="space-y-1">
          <label className="font-bold text-brand-green block leading-tight">Wholesale/Reseller option?</label>
          <select
            name="wholesaleOption"
            value={formData.wholesaleOption}
            onChange={handleInputChange}
            className="w-full border border-stone-250 focus:border-brand-green focus:ring-1 focus:ring-brand-green rounded-md p-1 outline-hidden bg-white"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-brand-green block leading-tight">Have Affiliate feed/API?</label>
          <select
            name="affiliateOrApiFeed"
            value={formData.affiliateOrApiFeed}
            onChange={handleInputChange}
            className="w-full border border-stone-250 focus:border-brand-green focus:ring-1 focus:ring-brand-green rounded-md p-1 outline-hidden bg-white"
          >
            <option value="No">No</option>
            <option value="Yes, XML Feed">Yes, XML Feed</option>
            <option value="Yes, REST API">Yes, REST API</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-brand-green block leading-tight">Offer approved price data?</label>
          <select
            name="approvedPricingData"
            value={formData.approvedPricingData}
            onChange={handleInputChange}
            className="w-full border border-stone-250 focus:border-brand-green focus:ring-1 focus:ring-brand-green rounded-md p-1 outline-hidden bg-white"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-brand-green block leading-tight">Permit brand assets use?</label>
          <select
            name="permitBrandAssets"
            value={formData.permitBrandAssets}
            onChange={handleInputChange}
            className="w-full border border-stone-250 focus:border-brand-green focus:ring-1 focus:ring-brand-green rounded-md p-1 outline-hidden bg-white"
          >
            <option value="Yes">Yes</option>
            <option value="No">No (Text placeholders only)</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-bold text-brand-green block uppercase tracking-wider">Additional Message & Installation details</label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Outline any government BDUK codes, rollout milestones, or custom wholesale agreements."
          className="w-full px-3 py-2 text-xs border border-stone-250 rounded-lg bg-white text-stone-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 px-4 bg-brand-green hover:bg-brand-green-hover disabled:bg-stone-300 text-white rounded-lg text-xs font-bold font-sans transition-all flex items-center justify-center gap-1 cursor-pointer leading-none"
      >
        <span>{isSubmitting ? "Loading Proposal data..." : "Submit Listing Proposal"}</span>
        <Send className="h-3 w-3" />
      </button>
    </form>
  );
}
export default ListProviderForm;
