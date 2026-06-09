/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BroadbandNewsItem } from "../types";

export const broadbandNewsData: BroadbandNewsItem[] = [
  {
    id: "news-1",
    headline: "Wiltshire broadband update: new full fibre areas added to local tracking",
    sourceName: "Wiltshire Council broadband updates",
    sourceUrl: "https://www.wiltshire.gov.uk/broadband",
    publishedDate: "2026-06-05",
    category: "Wiltshire Council",
    region: "Wiltshire",
    isWiltshireRelevant: true,
    providerMentioned: "Multiple Networks",
    summary: "Wiltshire Council reports that another round of rural villages has successfully completed full-fibre infrastructure mapping builds. Digital tracking maps show a solid increase in active gigabit footprints.",
    displayPriority: 1,
    isActive: true
  },
  {
    id: "news-2",
    headline: "ISPreview: UK fibre rollout news monitored for rural broadband changes",
    sourceName: "ISPreview",
    sourceUrl: "https://www.ispreview.co.uk/",
    publishedDate: "2026-06-07",
    category: "Alt net press releases",
    region: "UK Rural",
    isWiltshireRelevant: true,
    providerMentioned: "Altnets",
    summary: "Recent telecom statistics analyzed by regional specialists indicate that independent altnets are continuing to establish the majority of hyper-local rural full-fibre nodes, bypassing national trunk delays.",
    displayPriority: 1,
    isActive: true
  },
  {
    id: "news-3",
    headline: "ThinkBroadband: coverage updates checked for Wiltshire relevance",
    sourceName: "ThinkBroadband",
    sourceUrl: "https://www.thinkbroadband.com/",
    publishedDate: "2026-06-06",
    category: "Wider UK broadband news",
    region: "South West",
    isWiltshireRelevant: true,
    providerMentioned: "Openreach & Gigaclear",
    summary: "Network logs show over 75% of properties across South West parishes can now arrange a gigabit-capable socket. Outlying hamlets represent the next target cluster.",
    displayPriority: 2,
    isActive: true
  },
  {
    id: "news-4",
    headline: "Ofcom: telecoms pricing and switching updates watched for consumer impact",
    sourceName: "Ofcom",
    sourceUrl: "https://www.ofcom.org.uk/",
    publishedDate: "2026-06-01",
    category: "Ofcom",
    region: "National",
    isWiltshireRelevant: false,
    providerMentioned: "Mainstream Providers",
    summary: "Ofcom reviews how clear providers must be about mid-contract inflation terms. Draft guidelines indicate companies should display precise money figures instead of complex % formulas.",
    displayPriority: 2,
    isActive: true
  },
  {
    id: "news-5",
    headline: "Bypass full-fibre layouts built for several Salisbury plain villages",
    sourceName: "Provider news pages",
    sourceUrl: "https://www.wiltshirebroadbandfinder.co.uk/",
    publishedDate: "2026-06-03",
    category: "Wider UK broadband news",
    region: "Wiltshire",
    isWiltshireRelevant: true,
    providerMentioned: "Wessex Internet",
    summary: "New micro-trench projects complete, bringing ultra-high-speed symmetrical fibre straight into valley farm bypass sectors. Coverage statuses updated.",
    displayPriority: 3,
    isActive: true
  },
  {
    id: "news-6",
    headline: "UK government details milestone in Project Gigabit rural fund deployments",
    sourceName: "Gov UK broadband updates",
    sourceUrl: "https://www.gov.uk/guidance/project-gigabit-uk-gigabit-programme",
    publishedDate: "2026-05-28",
    category: "Gov UK",
    region: "UK",
    isWiltshireRelevant: true,
    providerMentioned: "Project Gigabit",
    summary: "Government agencies announce that vouchers worth up to £4,500 have supported the construction of hundreds of rural connections across Southern England valleys.",
    displayPriority: 3,
    isActive: true
  }
];
