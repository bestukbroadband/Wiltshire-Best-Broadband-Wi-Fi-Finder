/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SeoPageData } from "../types";

export interface EditorReview extends SeoPageData {
  id: string;
  providerId: string;
  score: number;
  verdict: string;
  strengths: string[];
  weaknesses: string[];
}

export const editorReviewsData: EditorReview[] = [
  {
    id: "review-trooli-wiltshire",
    providerId: "trooli",
    score: 8.8,
    verdict: "A highly robust network with reliable speeds and rapid rural deployment.",
    strengths: ["Symmetrical speeds", "High customer rating", "Rapid fibre rollout"],
    weaknesses: ["Mid-contract price rise applies"],
    pageTitle: "Trooli Broadband Wiltshire Editorial Review | Scores & Ratings",
    metaTitle: "Trooli Broadband Review Wiltshire | Editor Score & Speed Tests",
    metaDescription: "Read our comprehensive editor evaluation on Trooli Broadband across Wiltshire. Find out about deployment speeds, symmetrical limits, and contract layouts.",
    canonicalUrl: "https://www.wiltshirebroadbandfinder.co.uk/reviews/trooli-broadband",
    slug: "trooli-broadband-review",
    h1: "Trooli Broadband Wiltshire Review",
    introCopy: "Our editors analyzed Trooli's rapid expansion in rural Wiltshire. Learn why their independent fibre network outperforms many traditional providers.",
    postcodeTargets: ["SN10", "SN14", "SN15", "SN9"],
    townTargets: ["devizes", "chippenham", "trowbridge", "pewsey"],
    primaryKeyword: "Trooli broadband review Wiltshire",
    secondaryKeywords: ["Trooli speed test", "rural fibre ratings Wiltshire", "symmetrical internet review"],
    faqItems: [
      {
        question: "Does Trooli provide synchronous upload speeds?",
        answer: "Yes, Trooli's FTTP connections supply the same upload capabilities as download capacities, exceeding standard Openreach products."
      }
    ],
    schemaType: "Review",
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "8.8",
        "bestRating": "10"
      },
      "itemReviewed": {
        "@type": "Product",
        "name": "Trooli Broadband"
      }
    }),
    ogTitle: "Trooli Broadband Wiltshire Editor Review - Wiltshire Finder",
    ogDescription: "Read the editorial score and breakdown of Trooli's rural performance.",
    ogImage: "https://www.wiltshirebroadbandfinder.co.uk/images/og-trooli-review.jpg",
    twitterTitle: "Trooli Broadband Wiltshire Review",
    twitterDescription: "Symmetrical full fibre with excellent customer service reviews.",
    twitterImage: "https://www.wiltshirebroadbandfinder.co.uk/images/twitter-trooli-review.jpg",
    lastUpdated: "2026-06-08",
    editorName: "Cane Editorial Team",
    reviewedBy: "Joshua Greedy",
    publishedBy: "Cane Communications Limited"
  },
  {
    id: "review-zzoomm-wiltshire",
    providerId: "zzoomm",
    score: 9.2,
    verdict: "A notable alternative network for listed areas of Wiltshire, with symmetric speeds where available.",
    strengths: ["Fixed contract pricing", "Excellent multi-gigabit speeds", "Friendly regional engineers"],
    weaknesses: ["Geographically limited to built towns"],
    pageTitle: "Zzoomm Broadband Wiltshire Editorial Review | Scores & Ratings",
    metaTitle: "Zzoomm Broadband Review Wiltshire | Fixed Pricing Winner",
    metaDescription: "Symmetric gigabit plans starting from £27.95/month. Read our deep-dive review of Zzoomm's fibre network and how coverage varies.",
    canonicalUrl: "https://www.wiltshirebroadbandfinder.co.uk/reviews/zzoomm-broadband",
    slug: "zzoomm-broadband-review",
    h1: "Zzoomm Broadband Wiltshire Review",
    introCopy: "Zzoomm is listed as an address-checker provider. Symmetrical fiber coverage is not universal and can vary dramatically by exact street segment. Residents in listed regions should use their exact postcode to verify active service before ordering.",
    postcodeTargets: ["SN10", "SN11", "SN12"],
    townTargets: ["devizes", "calne", "melksham"],
    primaryKeyword: "Zzoomm broadband review Wiltshire",
    secondaryKeywords: ["Zzoomm checker Wiltshire", "Zzoomm price review", "Listed broadband Calne"],
    faqItems: [
      {
        question: "Is Zzoomm's pricing really frozen?",
        answer: "Yes, Zzoomm commits to zero mid-contract CPI or RPI adjustments, meaning your monthly price remains predictable."
      }
    ],
    schemaType: "Review",
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "9.2",
        "bestRating": "10"
      },
      "itemReviewed": {
        "@type": "Product",
        "name": "Zzoomm Broadband"
      }
    }),
    ogTitle: "Zzoomm Broadband Wiltshire Review - Wiltshire Finder",
    ogDescription: "Why Zzoomm's fixed price models can be a great option if coverage matches your postcode.",
    ogImage: "https://www.wiltshirebroadbandfinder.co.uk/images/og-zzoomm-review.jpg",
    twitterTitle: "Zzoomm Broadband Wiltshire Review",
    twitterDescription: "Symmetric speed, zero setup fees, and zero mid-contract price rises.",
    twitterImage: "https://www.wiltshirebroadbandfinder.co.uk/images/twitter-zzoomm-review.jpg",
    lastUpdated: "2026-06-08",
    editorName: "Cane Editorial Team",
    reviewedBy: "Joshua Greedy",
    publishedBy: "Cane Communications Limited"
  }
];
