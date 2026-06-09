/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RankingBadge {
  id: string;
  label: string;
  colorClass: string;
}

export const rankingRulesData = {
  label: "Best listed deals",
  transparentNote: "Rankings are based on the package information currently listed on this site, including price, speed, contract length, upfront costs, router inclusion, known price rise information and editor review. Availability and final pricing must be confirmed by the provider. Sponsored listings are clearly marked and do not automatically receive a higher ranking.",
  criteriaWeightings: [
    { metric: "Monthly Price From", weight: "18%", explanation: "Lower monthly fee is highly weighted in the ultimate value score." },
    { metric: "Download & Upload Speed", weight: "20%", explanation: "Combines overall throughput rate with symmetric capabilities." },
    { metric: "Upfront Setup & Fees", weight: "12%", explanation: "Penalizes high setup, router and install charges." },
    { metric: "Flexibility & Post-Contract", weight: "14%", explanation: "Considers contract terms and limits post-contract pricing shock." },
    { metric: "Local Rural Suitability", weight: "10%", explanation: "Measures fit for rural parishes and homeworkers in Salisbury, Devizes, etc." },
    { metric: "Editor Review Score", weight: "10%", explanation: "Adds weight based on specific local service and technology appraisals." },
    { metric: "Price Freeze Protection", weight: "16%", explanation: "Recognises the value of zero mid-contract inflation or CPI price hikes." }
  ],
  warningDisclaimer: "We compare only listed alternative, local and mainstream providers serving parished Wiltshire addresses and towns."
};

export const rankingBadges: RankingBadge[] = [
  { id: "best-deal", label: "Best listed deal", colorClass: "bg-emerald-555/15 text-emerald-440 border border-emerald-500/30 font-black" },
  { id: "lowest-price", label: "Lowest listed monthly price", colorClass: "bg-teal-550/15 text-teal-350 border border-teal-500/30 font-bold" },
  { id: "fastest", label: "Fastest listed package", colorClass: "bg-sky-500/10 text-sky-400 border border-sky-500/25 font-bold" },
  { id: "strong-editor", label: "Strong editor score", colorClass: "bg-brand-gold/15 text-brand-gold border border-brand-gold/30 font-black" },
  { id: "rural-homes", label: "Best for rural homes", colorClass: "bg-[#7c3aed]/10 text-purple-300 border border-purple-500/20 font-extrabold" },
  { id: "homeworking", label: "Best for home working", colorClass: "bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold" },
  { id: "families", label: "Best for families", colorClass: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold" },
  { id: "five-g", label: "Good 5G option", colorClass: "bg-slate-800 text-slate-300 border border-slate-700 font-semibold" },
  { id: "satellite", label: "Good satellite option", colorClass: "bg-slate-800 text-slate-350 border border-slate-700 font-semibold" },
  { id: "price-rise", label: "Check price rise", colorClass: "bg-rose-500/10 text-rose-450 border border-rose-550/30 font-black" },
  { id: "sponsored", label: "Sponsored", colorClass: "bg-slate-900 text-amber-400 border border-amber-400/30 font-black" }
];
