/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProviderType } from "../types";

export interface ProviderCategory {
  id: string;
  name: ProviderType;
  description: string;
  badgeColor: string;
  iconName: string;
}

export const providerCategoriesData: ProviderCategory[] = [
  {
    id: "altnet",
    name: "Alternative network providers",
    description: "Independent companies constructing their own physical fibre cables, operating separately from mainstream Openreach infrastructure. Altnets frequently prioritize rural zones that others neglect.",
    badgeColor: "bg-brand-gold-light text-[#1B3022] border-[#C5A059]/35 hover:bg-[#C5A059]/20",
    iconName: "Network"
  },
  {
    id: "mainstream",
    name: "Mainstream broadband providers",
    description: "Major national brands (such as BT, Sky, EE, and TalkTalk) utilizing either Openreach wires or custom cables to deliver services to millions of households.",
    badgeColor: "bg-stone-100 text-stone-850 border-stone-250 hover:bg-stone-200",
    iconName: "Globe"
  },
  {
    id: "full-fibre",
    name: "Full fibre providers",
    description: "Fibre-to-the-Premises (FTTP) lines running directly into your home, bypassing aging copper cables to ensure massive multi-gigabit speeds.",
    badgeColor: "bg-teal-50 text-teal-900 border-teal-200 hover:bg-teal-100",
    iconName: "Zap"
  },
  {
    id: "openreach-based",
    name: "Openreach based providers",
    description: "Retail providers accessing BT's physical network of exchanges, ducts, and cabinets, offering easy activation and consistent country coverage.",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-250 hover:bg-stone-200",
    iconName: "Server"
  },
  {
    id: "rural",
    name: "Rural broadband providers",
    description: "Specialized operators with customized technology (such as field fibre plowing or rural radio masts) designed to deliver robust internet in countryside villages.",
    badgeColor: "bg-brand-gold-light text-[#1B3022] border-[#C5A059]/35 hover:bg-[#C5A059]/25",
    iconName: "Home"
  },
  {
    id: "wireless",
    name: "Wireless broadband providers",
    description: "Fixed Wireless Access (FWA) routers connecting your home through wireless frequencies beamed from local transmission poles.",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-250 hover:bg-stone-200",
    iconName: "Radio"
  },
  {
    id: "five-g",
    name: "5G home broadband providers",
    description: "Superfast mobile routers operating on cell towers, enabling instant plug-and-play internet with zero engineer installations or phone line charges.",
    badgeColor: "bg-stone-100 text-stone-850 border-stone-200 hover:bg-stone-200",
    iconName: "Cpu"
  },
  {
    id: "satellite",
    name: "Satellite broadband providers",
    description: "Universal internet beam straight from low or high orbit satellite networks. Works anywhere with a clear sky, crucial for extremely remote locations.",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-200",
    iconName: "Orbit"
  },
  {
    id: "business",
    name: "Business broadband providers",
    description: "Broadband links supporting static IP addresses, dedicated service-level agreements (SLAs), and round-the-clock priority technical repair.",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-200",
    iconName: "Briefcase"
  }
];
