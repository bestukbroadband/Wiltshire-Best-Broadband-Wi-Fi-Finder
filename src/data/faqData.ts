/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const faqData: Record<string, FAQItem[]> = {
  "best-broadband-wiltshire": [
    {
      question: "Which provider offers the best broadband speed in Wiltshire?",
      answer: "Alternative network providers (altnets) like Wessex Internet, Trooli, and Gigaclear offer the fastest listed speeds in Wiltshire, providing up to 900+ Mbps symmetrical download and upload speeds. National providers using Openreach or Virgin Media also deliver gigabit speeds in major towns."
    },
    {
      question: "Can I get fibre broadband in rural Wiltshire villages?",
      answer: "Yes, many rural Wiltshire villages now have excellent full-fibre coverage thanks to dedicated rollouts from regional altnets such as Wessex Internet and Gigaclear. You should search by postcode to check which provider covers your exact local lane."
    }
  ],
  "best-wifi-wiltshire": [
    {
      question: "How do I get the best WiFi coverage inside a traditional stone Wiltshire cottage?",
      answer: "Thick parished limestone and brick walls in Wiltshire properties can block wireless waves. We recommend pairing your broadband with a multi-node Mesh WiFi system, or using powerline adapters, rather than relying on a single router."
    },
    {
      question: "Do Wiltshire altnets include high-specification routers for WiFi?",
      answer: "Yes, altnets like Zzoomm and Truespeed supply high-spec, dual-band or tri-band WiFi 6 routers, which are optimised to serve multiple active screens and smart devices."
    }
  ],
  "best-internet-provider-wiltshire": [
    {
      question: "What makes a broadband provider the 'best' for Wiltshire?",
      answer: "The best choice depends on whether you seek national brand reliability (BT, Sky) or regional altnet performance (Wessex, Trooli) which provides price-freeze locks and faster symmetrical speeds."
    }
  ],
  "best-broadband-provider-wiltshire": [
    {
      question: "Which broadband providers operating in Wiltshire are cheapest?",
      answer: "Mainstream brands like TalkTalk or Sky starting around £24 per month are usually the cheapest. However, altnets like Truespeed or Zzoomm offer excellent entry-level packages with free setups, giving superb speed-per-pound value."
    }
  ],
  "best-rural-broadband-wiltshire": [
    {
      question: "How can I get broadband in remote parts of Wiltshire with no fibre?",
      answer: "For properties outside wired fibre zones, the best options are high-speed 5G home broadband paths or satellite services like Starlink, which provide fast speeds with rapid setup times."
    }
  ],
  "best-rural-broadband-villages-towns": [
    {
      question: "Are there government schemes to help Wiltshire villages upgrade?",
      answer: "Yes, Wiltshire Broadband Finder tracks properties that may qualify for BDUK Project Gigabit voucher coordinates, helping rural parished communities group together to fund direct fibre builds."
    }
  ],
  "full-fibre-broadband-wiltshire": [
    {
      question: "What is full fibre broadband (FTTP)?",
      answer: "Full fibre (Fibre to the Premises) runs glass fibre cables directly into your property, ensuring incredible stability and gigabit speeds, completely replacing older copper telephone cables."
    }
  ],
  "alternative-network-broadband-wiltshire": [
    {
      question: "Why should I choose an altnet over a mainstream national provider?",
      answer: "Altnets build their own physical cables. If national Openreach lanes are slow in your area, an altnet like Wessex Internet or Gigaclear can offer faster, symmetrical speeds and contract price-freeze options."
    }
  ],
  "broadband-deals-wiltshire": [
    {
      question: "Do mid-contract price rises apply to all Wiltshire deals?",
      answer: "No. Many altnets operating in Wiltshire like Truespeed, Wessex Internet, and Zzoomm offer complete price locks, ensuring your monthly bill never rises during your contract."
    }
  ],
  "broadband-providers-wiltshire": [
    {
      question: "How many broadband providers serve the Wiltshire county?",
      answer: "There are over 10 active listed providers serving Wiltshire, ranging from national majors (BT, Sky, Virgin) to regional altnet specialists (Wessex Internet, Trooli, Zzoomm, Gigaclear, Voneus, and AllPoints)."
    }
  ]
};
