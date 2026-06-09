/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AdPlacement {
  placementId: string;
  placementName: string;
  size: 
    | "728 x 90 leaderboard"
    | "970 x 250 wide banner"
    | "320 x 100 mobile banner"
    | "300 x 250 medium rectangle"
    | "300 x 300 square"
    | "Sponsored provider card"
    | "Sponsored deal card"
    | "Sponsored text block";
  location: 
    | "top-leaderboard"
    | "hero-sponsor-strip"
    | "weekly-offer-sponsor"
    | "postcode-page-sponsor"
    | "town-page-sponsor"
    | "provider-category-sponsor"
    | "in-content-advert"
    | "sidebar-advert"
    | "mobile-sticky-banner"
    | "footer-sponsor-strip"
    | "newsletter-sponsor"
    | "sponsored-provider-card"
    | "sponsored-deal-card";
  targetPostcodes: string[];
  targetTowns: string[];
  advertiserName: string;
  headline: string;
  body: string;
  ctaText: string;
  ctaUrl: string;
  isActive: boolean;
  isSponsored: boolean;
  startDate: string;
  endDate: string;
  impressionGoal: number;
  clickGoal: number;
  notes: string;
  sponsorLabel: "Advertisement" | "Sponsored" | "Featured partner";
}

export const adPlacementsData: AdPlacement[] = [
  {
    placementId: "top-leaderboard-trooli",
    placementName: "Top Leaderboard Advert",
    size: "728 x 90 leaderboard",
    location: "top-leaderboard",
    targetPostcodes: ["SN1", "SN10", "SP1"],
    targetTowns: ["devizes", "chippenham", "salisbury"],
    advertiserName: "Trooli Broadband",
    headline: "Fast Symmetrical Full Fibre Has Arrived Across Wiltshire Parishes!",
    body: "Experience 100% optical fibre cables direct to rural homes. Symmetric speeds and friendly local support from £29.99/mo.",
    ctaText: "Check My Postcode",
    ctaUrl: "https://www.trooli.com/",
    isActive: true,
    isSponsored: true,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    impressionGoal: 50000,
    clickGoal: 2500,
    notes: "Prime page heading slot for high conversions on Wiltshire Broadband Finder.",
    sponsorLabel: "Featured partner"
  },
  {
    placementId: "hero-sponsor-strip-gigaclear",
    placementName: "Hero Sponsor Strip Advert",
    size: "Sponsored text block",
    location: "hero-sponsor-strip",
    targetPostcodes: ["SN1", "SN2", "SN3", "SN4", "SN5", "SN8", "SN10", "SP1", "SP2"],
    targetTowns: ["chippenham", "devizes", "marlborough", "potterne", "calne"],
    advertiserName: "Gigaclear FTTP",
    headline: "Gigaclear: Broadband Engineered Exclusively for Rural Wiltshire Villages",
    body: "Say goodbye to old metallic lines. Get instant full-fibre internet laid straight to villages, farms and rural estates.",
    ctaText: "Check Availability",
    ctaUrl: "https://www.gigaclear.com/",
    isActive: true,
    isSponsored: true,
    startDate: "2026-03-01",
    endDate: "2026-11-30",
    impressionGoal: 40000,
    clickGoal: 1800,
    notes: "Renders in prominent hero region to guarantee top of page visual weight.",
    sponsorLabel: "Sponsored"
  },
  {
    placementId: "weekly-offer-voneus",
    placementName: "Weekly Offer Sponsor Advert",
    size: "Sponsored deal card",
    location: "weekly-offer-sponsor",
    targetPostcodes: ["SN10", "SN14", "SP4"],
    targetTowns: ["devizes", "potterne", "chippenham", "salisbury"],
    advertiserName: "Voneus Broadband",
    headline: "Weekly Highlight: Free Installation & Symmetrical Gigabit Performance",
    body: "Perfect for homeworkers on agricultural outlying boundaries. Claim your government rural gigabit voucher terms with zero hassle.",
    ctaText: "Claim £150 Cashback Voucher",
    ctaUrl: "https://www.voneus.com/",
    isActive: true,
    isSponsored: true,
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    impressionGoal: 15000,
    clickGoal: 950,
    notes: "Weekly promotional spotlight targeted specifically at rural addresses.",
    sponsorLabel: "Sponsored"
  },
  {
    placementId: "postcode-page-wessex-internet",
    placementName: "Postcode Page Sponsor Advert",
    size: "970 x 250 wide banner",
    location: "postcode-page-sponsor",
    targetPostcodes: ["SN10", "SP1", "SP2", "SP3", "SP4", "SP5", "BA12"],
    targetTowns: ["devizes", "salisbury", "wilton", "tisbury", "shrewton", "warminster"],
    advertiserName: "Wessex Internet",
    headline: "Wessex Internet: True Rural Full Fibre Made in Wiltshire Towns & Valleys",
    body: "We construct proprietary glass fibre infrastructure from the fields up, avoiding standard Openreach queues. Speeds up to 900 Mbps.",
    ctaText: "Request Village Survey Free",
    ctaUrl: "https://www.wessexinternet.com/",
    isActive: true,
    isSponsored: true,
    startDate: "2026-02-15",
    endDate: "2026-12-15",
    impressionGoal: 35000,
    clickGoal: 1400,
    notes: "Provides localized high-fidelity coverage overlays across outer rural postal addresses.",
    sponsorLabel: "Featured partner"
  },
  {
    placementId: "town-page-trooli-devizes",
    placementName: "Town Page Sponsor Advert",
    size: "728 x 90 leaderboard",
    location: "town-page-sponsor",
    targetPostcodes: ["SN10 1", "SN10 3", "SN10 5"],
    targetTowns: ["devizes", "potterne", "worton", "rowde"],
    advertiserName: "Trooli",
    headline: "Unbreakable Symmetrical Fibre Speed in Devizes & Surrounding Towns",
    body: "Trooli matches your download capacity with equal upload power. Excellent customer feedback with zero annual mid-contract inflation hikes.",
    ctaText: "See Exclusive Rates",
    ctaUrl: "https://www.trooli.com/",
    isActive: true,
    isSponsored: true,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    impressionGoal: 20000,
    clickGoal: 1100,
    notes: "High conversion rate banner embedded within Salisbury Plain area town searches.",
    sponsorLabel: "Featured partner"
  },
  {
    placementId: "provider-cat-sky",
    placementName: "Provider Category Sponsor Advert",
    size: "Sponsored text block",
    location: "provider-category-sponsor",
    targetPostcodes: [],
    targetTowns: [],
    advertiserName: "Sky Broadband",
    headline: "Sky Ultrafast: Stream TV, Movies & Premium Sights With Ease",
    body: "Bring fast streaming and Openreach backup routers combined as one cohesive package. Symmetrical high speeds on 18-month contracts.",
    ctaText: "Check Bundles On Sky",
    ctaUrl: "https://www.sky.com/broadband",
    isActive: true,
    isSponsored: true,
    startDate: "2026-04-01",
    endDate: "2026-10-31",
    impressionGoal: 45000,
    clickGoal: 1300,
    notes: "Category filter banner targeting major national brands category searches.",
    sponsorLabel: "Advertisement"
  },
  {
    placementId: "in-content-truespeed-lock",
    placementName: "In Content Advert",
    size: "300 x 250 medium rectangle",
    location: "in-content-advert",
    targetPostcodes: ["BA14", "BA15", "SN14", "SN15"],
    targetTowns: ["trowbridge", "bradford on avon", "melksham", "chippenham"],
    advertiserName: "Truespeed FTTP",
    headline: "Freeze Your Monthly Bill Terms with Truespeed Symmetrical Fibre",
    body: "Stop paying massive inflation adjustments. Truespeed guarantees complete price protection for the whole lifetime of your active term.",
    ctaText: "Lock In My Premium Rate Today",
    ctaUrl: "https://www.truespeed.com/",
    isActive: true,
    isSponsored: true,
    startDate: "2026-04-01",
    endDate: "2026-12-31",
    impressionGoal: 25000,
    clickGoal: 1050,
    notes: "Injected straight into body update copies for editorial and reviews.",
    sponsorLabel: "Featured partner"
  },
  {
    placementId: "sidebar-voneus-gig",
    placementName: "Sidebar Advert",
    size: "300 x 300 square",
    location: "sidebar-advert",
    targetPostcodes: ["SN10", "SN11", "SP4", "SP3"],
    targetTowns: ["devizes", "calne", "shrewton", "tisbury"],
    advertiserName: "Voneus Home",
    headline: "Power Your Rural Home Office With Next-Gen Symmetrical Speeds",
    body: "No setup charges, no copper lags, and complete guidance from government gigabit vouchers. Start upgrading village lines.",
    ctaText: "Claim Free Survey Profile",
    ctaUrl: "https://www.voneus.com/",
    isActive: true,
    isSponsored: true,
    startDate: "2026-05-01",
    endDate: "2026-12-31",
    impressionGoal: 30000,
    clickGoal: 1200,
    notes: "Integrated with sidebar desktop displays on broadband search results.",
    sponsorLabel: "Sponsored"
  },
  {
    placementId: "mobile-sticky-three-5g",
    placementName: "Mobile Sticky Banner",
    size: "320 x 100 mobile banner",
    location: "mobile-sticky-banner",
    targetPostcodes: [],
    targetTowns: [],
    advertiserName: "Three Mobile",
    headline: "Three 5G broadband: Simple Setup & Speed From £20/mo",
    body: "No engineers, no garden digs. Just plug-and-play high-speed 5G internet delivered direct to your door with free next-day postage.",
    ctaText: "Get 5G Router Now",
    ctaUrl: "https://www.three.co.uk/",
    isActive: true,
    isSponsored: true,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    impressionGoal: 60000,
    clickGoal: 3200,
    notes: "Persistent viewport overlay banner showing strictly on mobile dimensions.",
    sponsorLabel: "Advertisement"
  },
  {
    placementId: "footer-sponsor-starlink",
    placementName: "Footer Sponsor Strip Advert",
    size: "Sponsored text block",
    location: "footer-sponsor-strip",
    targetPostcodes: [],
    targetTowns: [],
    advertiserName: "Starlink Satellite",
    headline: "Unreachable by Fibre? Starlink Low Earth Orbit Coverage is Instant",
    body: "Guaranteed 200+ Mbps satellite beams direct to any Wiltshire valley, field or farming address with zero cable requirements.",
    ctaText: "Order Starlink Receiver Kit",
    ctaUrl: "https://www.starlink.com/",
    isActive: true,
    isSponsored: true,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    impressionGoal: 50000,
    clickGoal: 2000,
    notes: "Wide horizontal block anchored above Wiltshire footer and privacy declarations.",
    sponsorLabel: "Advertisement"
  },
  {
    placementId: "newsletter-sponsor-bt",
    placementName: "Newsletter Sponsor Advert",
    size: "Sponsored text block",
    location: "newsletter-sponsor",
    targetPostcodes: [],
    targetTowns: [],
    advertiserName: "BT Broadband",
    headline: "BT Full Fibre: Get the UK's Most Reliable National Broadband Network",
    body: "Supercharge your home with BT's smart hub and complete Wi-Fi coverage guarantees across rural Wiltshire towns.",
    ctaText: "Check BT Rates",
    ctaUrl: "https://www.bt.com/broadband",
    isActive: true,
    isSponsored: true,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    impressionGoal: 10000,
    clickGoal: 450,
    notes: "Email template card format for periodic subscriber summaries.",
    sponsorLabel: "Advertisement"
  },
  {
    placementId: "sponsored-provider-card-zzoomm",
    placementName: "Sponsored Provider Card Advert",
    size: "Sponsored provider card",
    location: "sponsored-provider-card",
    targetPostcodes: ["SN10", "SN11", "SN12"],
    targetTowns: ["devizes", "calne", "melksham"],
    advertiserName: "Zzoomm",
    headline: "Zzoomm Symmetrical Fibre - No Mid-Contract Increases Guaranteed!",
    body: "Why wait for standard line upgrades? Zzoomm delivers symmetrical multi-gigabit fibre directly to your premises in Devizes and Calne on fixed rates.",
    ctaText: "Order Symmetrical Fibre",
    ctaUrl: "https://zzoomm.com/",
    isActive: true,
    isSponsored: true,
    startDate: "2026-03-01",
    endDate: "2026-12-31",
    impressionGoal: 20000,
    clickGoal: 1500,
    notes: "Featured premium partner block appearing adjacent to lists of standard providers.",
    sponsorLabel: "Sponsored"
  },
  {
    placementId: "sponsored-deal-card-trooli-1g",
    placementName: "Sponsored Deal Card Advert",
    size: "Sponsored deal card",
    location: "sponsored-deal-card",
    targetPostcodes: ["SN10", "SN14", "SN15"],
    targetTowns: ["devizes", "chippenham", "pewsey"],
    advertiserName: "Trooli FTTP",
    headline: "Trooli 1,000 Mbps Extreme Home Gigabit Promo",
    body: "Claim our exclusive discounted 1Gbps symmetrical option. Includes professional router, zero dropouts, and expert home installs.",
    ctaText: "View Gigabit Deal",
    ctaUrl: "https://www.trooli.com/",
    isActive: true,
    isSponsored: true,
    startDate: "2026-02-01",
    endDate: "2026-12-31",
    impressionGoal: 25000,
    clickGoal: 1900,
    notes: "Highlighted comparison deals banner showing on best-deals router grids.",
    sponsorLabel: "Featured partner"
  }
];
