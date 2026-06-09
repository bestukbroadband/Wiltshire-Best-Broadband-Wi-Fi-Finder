/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Advert } from "../types";

export const advertsData: Advert[] = [
  {
    id: "lead-banner-zzoomm",
    advertiserName: "Zzoomm",
    placement: "Top leaderboard advert",
    headline: "Fast Symmetrical Full Fibre Has Arrived in Devizes!",
    description: "Get 500Mbps up and down from just £27.95/month including professional installation. Zero setup fee on 12-month contract.",
    ctaText: "Check Zzoomm Coverage",
    ctaUrl: "https://zzoomm.com/",
    isActive: true,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    townTargeting: ["Devizes", "Calne", "Melksham"],
    sponsorLabel: "Sponsored",
    impressionGoal: 50000,
    clickGoal: 1200,
    monthlyPrice: 250.00,
    adminNotes: "Active campaign for central Wiltshire Towns."
  },
  {
    id: "banner-devizes-1",
    advertiserName: "Trooli Broadband",
    placement: "Town page sponsor banner",
    headline: "Unbeatable Rural Full Fibre for Devizes Villages",
    description: "Trooli is laying ultrafast gigabit-capable fibre lines directly to homes in Worton, Potterne and Rowde. Symmetrical speeds from £29.99.",
    ctaText: "Check My Village Now",
    ctaUrl: "https://www.trooli.com/",
    isActive: true,
    startDate: "2026-03-01",
    endDate: "2026-09-30",
    townTargeting: ["Devizes", "Worton", "Potterne", "Rowde", "Urchfont"],
    sponsorLabel: "Featured partner",
    monthlyPrice: 150.00,
    adminNotes: "Devizes-specific rural targeting."
  },
  {
    id: "banner-chippenham-1",
    advertiserName: "Truespeed",
    placement: "Town page sponsor banner",
    headline: "Lock Your Price with Truespeed in Chippenham",
    description: "Tired of yearly mid-contract price rises? Truespeed locks your price for the duration of your contract. Symmetrical FTTP speeds.",
    ctaText: "Lock My Price",
    ctaUrl: "https://www.truespeed.com/",
    isActive: true,
    startDate: "2026-02-01",
    endDate: "2026-12-31",
    townTargeting: ["Chippenham", "Corsham", "Lacock"],
    sponsorLabel: "Sponsored",
    monthlyPrice: 180.00,
    adminNotes: "Price freeze promo."
  },
  {
    id: "sidebar-wessex",
    advertiserName: "Wessex Internet",
    placement: "Sidebar advert",
    headline: "Wessex Internet - Rural Broadband Specialist",
    description: "Connecting the most remote properties across Wiltshire, Somerset and Dorset. No line rent required. Direct farming fibre.",
    ctaText: "Request Survey",
    ctaUrl: "https://www.wessexinternet.com/",
    isActive: true,
    startDate: "2026-01-15",
    endDate: "2026-11-15",
    providerCategoryTargeting: ["Rural broadband providers", "Alternative network providers"],
    sponsorLabel: "Featured partner",
    monthlyPrice: 120.00,
    adminNotes: "Generic rural sidebar campaign."
  },
  {
    id: "category-sponsor-mainstream",
    advertiserName: "Sky Broadband",
    placement: "Provider category sponsor",
    headline: "Sky Ultrafast: Settle for More in Wiltshire",
    description: "Combine fast fibre-optic streaming with award-winning entertainment packages on an 18-month contract.",
    ctaText: "Explore Sky Bundles",
    ctaUrl: "https://www.sky.com/broadband",
    isActive: true,
    startDate: "2026-04-01",
    endDate: "2026-10-31",
    providerCategoryTargeting: ["Mainstream broadband providers"],
    sponsorLabel: "Advertisement",
    monthlyPrice: 300.00,
    adminNotes: "Mainstream category sponsorship."
  },
  {
    id: "mobile-banner-1",
    advertiserName: "Three 5G",
    placement: "Mobile banner",
    headline: "No Wires. No Waiting. Three 5G from £20/mo",
    description: "Plug-and-play home internet with next-day free delivery. Fantastic temporary or primary solution across major Wiltshire towns.",
    ctaText: "Check 5G Postcode",
    ctaUrl: "https://www.three.co.uk/",
    isActive: true,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    sponsorLabel: "Sponsored",
    monthlyPrice: 90.00
  },
  {
    id: "footer-sponsor-strip",
    advertiserName: "Starlink Rural Wiltshire",
    placement: "Footer sponsor strip",
    headline: "Starlink LEO Satellite Broadband - 100% Wiltshire Coverage",
    description: "No cell tower? No fibre lines? Get instant 150Mbps low-latency high-speed internet anywhere in Wiltshire.",
    ctaText: "Order Starlink Kit",
    ctaUrl: "https://www.starlink.com/",
    isActive: true,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    sponsorLabel: "Advertisement"
  }
];
export type { Advert };
