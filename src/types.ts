/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProviderType =
  | "Alternative network providers"
  | "Mainstream broadband providers"
  | "Full fibre providers"
  | "Openreach based providers"
  | "Rural broadband providers"
  | "Wireless broadband providers"
  | "5G home broadband providers"
  | "Satellite broadband providers"
  | "Business broadband providers";

export interface Provider {
  id: string;
  providerName: string;
  providerType: ProviderType[];
  networkType: string; // e.g. "FTTP", "FTTC", "5G Mobile", "Satellite", "FWA"
  logoText: string; // Dynamic text logo block
  townsCovered: string[]; // List of Wiltshire towns covered
  postcodeAreas: string[]; // e.g. ["SN10", "SP4", "BA15"]
  packageName: string;
  averageDownloadSpeed: number; // in Mbps
  averageUploadSpeed: number; // in Mbps
  monthlyPriceFrom: number; // e.g. 25.00
  monthlyPrice: number; // For card standardisation
  monthlyPriceAfterContract?: number;
  priceAfterMinimumTerm?: number; // For card standardisation
  contractLength: number; // in months, e.g. 12, 18, 24
  setupFee: number;
  routerCost: number;
  routerIncluded: boolean;
  installationFee: number;
  deliveryFee: number;
  phoneLineRequired: boolean;
  midContractPriceRise: boolean;
  annualPriceRiseNote: string;
  knownAnnualPriceRise: string; // For card standardisation
  priceChangeDate?: string;
  bestFor: string; // e.g. "Rural homes", "Ultra-fast speed"
  coverageNote: string;
  availabilityStatus: "Available" | "Limited Coverage" | "Coming Soon";
  rankingScore: number; // computed or configured score
  dealRank: number;
  isSponsored: boolean;
  sponsoredRank?: number;
  ctaLabel: string;
  ctaUrl: string;
  leadFormEnabled: boolean;
  description: string;
  lastCheckedDate: string;
  pricingMode: "manual" | "affiliate" | "api" | "csv";
  manualPrice?: number;
  affiliateFeedUrl?: string;
  providerApiUrl?: string;
  trackingUrl?: string;
  lastPriceSync?: string;
  priceStatus: "Active" | "Pending Review" | "Expired";
  priceDisclaimer: string;
  editorScore?: number;
  editorVerdict?: string;
  editorNotes?: string;
  thingsToWatch?: string[];
  lastReviewedDate?: string;
}

export interface Town {
  id: string;
  name: string;
  shortIntro: string;
  postcodeExamples: string[];
  sponsoredBannerId?: string;
  nearbyTowns: string[]; // IDs/names of nearby towns
  faqs: { question: string; answer: string }[];
}

export type AdvertPlacement =
  | "Top leaderboard advert"
  | "Header sponsorship banner"
  | "Town page sponsor banner"
  | "Provider category sponsor"
  | "Sidebar advert"
  | "In content advert"
  | "Mobile banner"
  | "Footer sponsor strip"
  | "Newsletter sponsor"
  | "Sponsored provider card"
  | "Sponsored deal placement"
  | "Homepage takeover placeholder";

export interface Advert {
  id: string;
  advertiserName: string;
  placement: AdvertPlacement;
  headline: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl?: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  townTargeting?: string[]; // list of towns
  providerCategoryTargeting?: ProviderType[];
  sponsorLabel: "Advertisement" | "Sponsored" | "Featured partner";
  impressionGoal?: number;
  clickGoal?: number;
  monthlyPrice?: number;
  adminNotes?: string;
}

export interface LocalUpdate {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  category: string;
  imageUrl?: string;
  author: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface LeadSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
  addressLine1: string;
  townOrVillage: string;
  currentProvider: string;
  currentMonthlyPrice: string;
  contractEndDate: string;
  reasonForSwitching: string;
  preferredContact: "Email" | "Phone" | "SMS";
  providerOfInterest: string;
  consentCheckbox: boolean;
  submittedAt: string;
}

export interface AdvertiserEnquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  companyType: string;
  targetTowns: string;
  monthlyBudget: string;
  campaignGoal: string;
  preferredFormat: string;
  message: string;
  submittedAt: string;
}

export interface ProviderListingRequest {
  id: string;
  providerName: string;
  website: string;
  contactName: string;
  email: string;
  phone: string;
  providerType: string[];
  networkType: string;
  areasCovered: string;
  examplePackages: string;
  installationNotes: string;
  contractLengths: string;
  setupFees: string;
  routerInformation: string;
  knownPriceRises: string;
  wholesaleOption: string; // e.g. "yes", "no"
  affiliateOrApiFeed: string;
  approvedPricingData: string;
  permitBrandAssets: string;
  message: string;
  submittedAt: string;
}

export interface PostcodeArea {
  postcodePrefix: string;
  areaName: string;
  primaryTown: string;
  nearbyAreas: string[];
  county: string;
  region: string;
  slug: string;
  introCopy: string;
  localBroadbandNotes: string;
  postcodeExamples: string[];
  providerIds: string[];
  offerIds?: string[];
  weeklyOfferId?: string;
  sponsoredOfferIds?: string[];
  seoTitle: string;
  metaDescription: string;
  h1: string;
  faqs: { question: string; answer: string }[];
  nearbyPostcodes: string[];
  lastUpdated: string;
}

export interface Offer {
  offerId: string;
  providerId: string;
  providerName: string;
  packageName: string;
  headline: string;
  shortDescription: string;
  monthlyPrice: number;
  contractLength: number;
  averageDownloadSpeed: number;
  averageUploadSpeed: number;
  setupFee: number;
  installationFee: number;
  routerCost: number;
  routerIncluded: boolean;
  knownAnnualPriceRise: string;
  midContractPriceRise: boolean;
  priceAfterMinimumTerm: number;
  offerValidUntil: string;
  targetPostcodes: string[];
  targetTowns: string[];
  targetProviderTypes: string[];
  availabilityConfidence: "High" | "Medium" | "Low";
  editorScore: number;
  editorVerdict: string;
  editorNotes: string;
  thingsToCheck: string[];
  bestFor: string;
  isSponsored: boolean;
  sponsorLabel: string;
  baseUrl: string;
  ctaLabel: string;
  pricingMode: "manual" | "csv_import" | "affiliate_feed" | "provider_api" | "availability_api";
  lastCheckedDate: string;
  isLive: boolean;
}

export interface OfferAvailability {
  offerId: string;
  postcodePrefix: string;
  availabilityStatus: "Likely available" | "Limited availability" | "Address check required" | "Not currently listed" | "Coming soon";
  availabilityConfidence: "High" | "Medium" | "Low";
  addressLevelCheckRequired: boolean;
  notes: string;
  lastCheckedDate: string;
}

export interface FeaturedOffer {
  offerId: string;
  weekCommencing: string;
  providerName: string;
  providerType: string;
  packageName: string;
  headline: string;
  shortDescription: string;
  monthlyPrice: number;
  contractLength: number;
  averageDownloadSpeed: number;
  averageUploadSpeed: number;
  setupFee: number;
  installationFee: number;
  routerIncluded: boolean;
  knownPriceRise: string;
  priceAfterContract: number;
  offerValidUntil: string;
  targetPostcodes: string[];
  targetTowns: string[];
  editorScore: number;
  editorVerdict: string;
  editorNotes: string;
  thingsToCheck: string[];
  bestFor: string;
  sponsoredStatus: string;
  sponsorLabel: string;
  ctaLabel: string;
  baseUrl: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  lastReviewedDate: string;
  isLive: boolean;
}

export interface BroadbandNewsItem {
  id?: string;
  headline: string;
  sourceName: string;
  sourceUrl: string;
  publishedDate: string;
  category: string;
  region: string;
  isWiltshireRelevant: boolean;
  providerMentioned?: string;
  summary: string;
  displayPriority: number; // e.g. 1 (high), 2, 3
  isActive: boolean;
}

export interface SeoPageData {
  pageId?: string;
  slug: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  h1: string;
  heroIntro?: string;
  introCopy?: string; // backwards compatibility
  supportingIntro?: string;
  sections?: { title: string; content: string }[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent?: string;
  targetAudience?: string;
  postcodeTargets: string[];
  townTargets: string[];
  relatedPages?: string[];
  internalLinks?: { label: string; target: string }[];
  faqItems: { question: string; answer: string }[];
  schemaType: string; // backwards compatibility
  schemaTypes?: string[];
  schemaJson: string; // String representation or JSON object for schema markup
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  lastUpdated: string;
  editorName?: string;
  reviewedBy: string;
  publishedBy: string;
  editorNote?: string;
  ctaLabel?: string;
  ctaTarget?: string;
}

export interface DirectoryProvider {
  providerId: string;
  providerName: string;
  displayName: string;
  alternativeNames: string[];
  providerType: string[];
  providerCategories: string[];
  networkType: string;
  retailOrWholesale: "retail" | "wholesale" | "both" | string;
  isRetailProvider: boolean;
  isWholesaleProvider: boolean;
  isNetworkOwner: boolean;
  isAltNet: boolean;
  isMainstream: boolean;
  isRuralProvider: boolean;
  isBusinessProvider: boolean;
  isStudentProvider: boolean;
  isSatelliteProvider: boolean;
  isClosedNetworkProvider: boolean;
  websiteUrl: string;
  coverageNotes: string;
  knownRegions: string[];
  postcodeTargets: string[];
  townTargets: string[];
  wiltshireRelevance: boolean;
  listingStatus: "Active" | "Pending" | "Disabled" | string;
  ctaLabel: string;
  baseUrl: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  lastCheckedDate: string;
  editorNotes: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  isLive: boolean;
}


