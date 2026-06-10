/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Town } from "../types";

export const townsData: Town[] = [
  {
    id: "devizes",
    name: "Devizes",
    shortIntro: "Broadband availability around Devizes and Market Lavington can vary by street and property. National providers may be available through Openreach based networks, while rural or alternative options should be checked by exact address. Use provider checkers and postcode tools before relying on any package or price.",
    postcodeExamples: ["SN10 1", "SN10 3", "SN10 5"],
    sponsoredBannerId: undefined,
    nearbyTowns: ["Potterne", "Worton", "Rowde", "Seend", "Urchfont", "Melksham"],
    faqs: [
      {
        question: "Is full fibre broadband available in Devizes?",
        answer: "Fibre-to-the-Premises (FTTP) and alternative networks are listed for select streets and areas, but availability is not county-wide and varies by address. You must use specific provider availability checkers with your exact postcode to confirm coverage."
      },
      {
        question: "Which networks are listed for checking in Devizes?",
        answer: "National providers using Openreach-based channels may be relevant, while alternative networks like Wessex Internet, Trooli, and Zzoomm are listed as regionally relevant or require separate address checkers to verify active service lines."
      }
    ]
  },
  {
    id: "chippenham",
    name: "Chippenham",
    shortIntro: "As one of Wiltshire's largest towns, Chippenham has excellent national transportation links and an advanced digital footprint. Mainstream providers cover the majority of and fibre deployment is highly competitive.",
    postcodeExamples: ["SN14 0", "SN15 1", "SN15 3"],
    sponsoredBannerId: "banner-chippenham-1",
    nearbyTowns: ["Lacock", "Corsham", "Calne", "Hullavington"],
    faqs: [
      {
        question: "Who is the fastest broadband provider in Chippenham?",
        answer: "Virgin Media offers gigabit cable broadband in selected streets, while altnets like Trooli, Truespeed, and Openreach-based FTTP lines deliver up to 1Gbps speeds."
      }
    ]
  },
  {
    id: "trowbridge",
    name: "Trowbridge",
    shortIntro: "Wiltshire's county town benefits from highly competitive broadband rates, with Truespeed and various mainstream providers actively battling for full fibre dominance in urban and newly constructed areas.",
    postcodeExamples: ["BA14 0", "BA14 7", "BA14 8"],
    nearbyTowns: ["Melksham", "Bradford on Avon", "Westbury", "Holt"],
    faqs: [
      {
        question: "Can I choose Truespeed in Trowbridge?",
        answer: "Yes, Truespeed is highly active in Trowbridge and runs a dedicated regional network offering symmetrical gigabit broadband to local households."
      }
    ]
  },
  {
    id: "melksham",
    name: "Melksham",
    shortIntro: "Ideally situated on the River Avon, Melksham boasts solid Openreach coverage, with Zzoomm and Trooli deploying full fibre lines into many older residential estates alongside major corporate zones.",
    postcodeExamples: ["SN12 6", "SN12 7", "SN12 8"],
    nearbyTowns: ["Devizes", "Trowbridge", "Calne", "Seend", "Holt"],
    faqs: [
      {
        question: "Which networks serve Melksham homes?",
        answer: "Zzoomm, Trooli, and traditional Openreach-based providers like BT, Sky, and TalkTalk are active in Melksham."
      }
    ]
  },
  {
    id: "marlborough",
    name: "Marlborough",
    shortIntro: "Located in the scenic Kennet Valley, Marlborough's historic high street acts as a central hub. Gigaclear provides high-performance rural full fibre connections to outlying villages alongside traditional copper-cabinet systems.",
    postcodeExamples: ["SN8 1", "SN8 2", "SN8 4"],
    nearbyTowns: ["Aldbourne", "Ramsbury", "Pewsey"],
    faqs: [
      {
        question: "Does Gigaclear cover Marlborough?",
        answer: "Yes, Gigaclear has excellent coverage in the rural villages surrounding Marlborough, as well as parts of the town itself, built to bypass slow telephone wires."
      }
    ]
  },
  {
    id: "calne",
    name: "Calne",
    shortIntro: "A historic Wiltshire market town undergoing significant growth. Calne has seen excellent network investment from Zzoomm alongside BT Openreach, eliminating outdated copper connections.",
    postcodeExamples: ["SN11 0", "SN11 8", "SN11 9"],
    nearbyTowns: ["Chippenham", "Devizes", "Bromham", "Lacock"],
    faqs: [
      {
        question: "Can I get Zzoomm broadband in Calne?",
        answer: "Yes, Zzoomm has built an extensive full-fibre network across Calne, offering residents highly affordable symmetrical speeds."
      }
    ]
  },
  {
    id: "warminster",
    name: "Warminster",
    shortIntro: "Bordering Salisbury Plain and the Cranborne Chase Area of Outstanding Natural Beauty, Warminster has unique geography. Altnets like Wessex Internet are key to connecting remote farmland.",
    postcodeExamples: ["BA12 0", "BA12 8", "BA12 9"],
    nearbyTowns: ["Westbury", "Heytesbury", "Mere", "Tisbury"],
    faqs: [
      {
        question: "Does Wessex Internet operate around Warminster?",
        answer: "Yes, Wessex Internet has run fibre lines deep into Warminster's outlying rural fields, offering premium gigabit fibre directly to agricultural and village clusters."
      }
    ]
  },
  {
    id: "westbury",
    name: "Westbury",
    shortIntro: "Nestled directly below the famous Westbury White Horse, Westbury enjoys standard Openreach FTTC and fibre access, with expansion from Wessex Internet serving peripheral hamlets.",
    postcodeExamples: ["BA13 3", "BA13 4"],
    nearbyTowns: ["Warminster", "Trowbridge", "Seend"],
    faqs: [
      {
        question: "Who provides broadband in Westbury?",
        answer: "BT, TalkTalk, Plusnet, and Sky provide standard network coverage, while Wessex Internet covers several adjoining rural locations."
      }
    ]
  },
  {
    id: "bradford-on-avon",
    name: "Bradford on Avon",
    shortIntro: "An architectural gem on the Kennet & Avon Canal. This lovely valley town has historically suffered from broadband bottlenecks due to tough planning protections on stone buildings, but Truespeed has made massive inroads.",
    postcodeExamples: ["BA15 1", "BA15 2"],
    nearbyTowns: ["Trowbridge", "Winsley", "Holt", "Box"],
    faqs: [
      {
        question: "Why does broadband speed vary in Bradford on Avon?",
        answer: "Victorian stone walls and restricted street works can make laying new cables difficult. However, bespoke installation from local altnet Truespeed is successfully bypassing these barriers."
      }
    ]
  },
  {
    id: "salisbury",
    name: "Salisbury",
    shortIntro: "Wiltshire's majestic cathedral city represents a major digital crossroads. Symmetrical altnets like Truespeed and Wessex Internet compete directly against national full-fibre Openreach connections.",
    postcodeExamples: ["SP1 1", "SP1 2", "SP1 3", "SP2 7", "SP5 4"],
    nearbyTowns: ["Wilton", "Downton", "Amesbury", "Shrewton"],
    faqs: [
      {
        question: "Are symmetric uploads available in Salisbury?",
        answer: "Yes, choosing altnets like Truespeed, Community Fibre, or Wessex Internet provides symmetric speeds (identical upload and download) in Salisbury."
      }
    ]
  },
  {
    id: "corsham",
    name: "Corsham",
    shortIntro: "Home to substantial underground MOD bunkers and digital data centers, Corsham is highly connected. Truespeed and AllPoints Fibre provide robust residential alternatives.",
    postcodeExamples: ["SN13 0", "SN13 9"],
    nearbyTowns: ["Box", "Colerne", "Chippenham", "Lacock"],
    faqs: []
  },
  {
    id: "pewsey",
    name: "Pewsey",
    shortIntro: "Situated in the spectacular Vale of Pewsey, this large village is connected by Trooli and Gigaclear, helping local commuters stay fully operational with work-from-home options.",
    postcodeExamples: ["SN9 5", "SN9 6"],
    nearbyTowns: ["Marlborough", "Devizes", "Urchfont"],
    faqs: []
  },
  {
    id: "amesbury",
    name: "Amesbury",
    shortIntro: "Just moments from historic Stonehenge, Amesbury's residential estates enjoy high Openreach coverage, with Three 5G home broadband and local satellite completing rural bottlenecks.",
    postcodeExamples: ["SP4 7", "SP4 0"],
    nearbyTowns: ["Salisbury", "Bulford", "Durrington", "Shrewton"],
    faqs: []
  },
  {
    id: "malmesbury",
    name: "Malmesbury",
    shortIntro: "Perched on a hilltop, Malmesbury is England's oldest borough. Highly tech-forward due to the major Dyson R&D headquarters, broadband is served by Gigaclear, Airband, and BT Openreach.",
    postcodeExamples: ["SN16 0", "SN16 9"],
    nearbyTowns: ["Sherston", "Hullavington", "Purton", "Cricklade"],
    faqs: []
  },
  {
    id: "royal-wootton-bassett",
    name: "Royal Wootton Bassett",
    shortIntro: "This prominent northern Wiltshire town has high digital connectivity. Residents can choose standard Openreach fibre services alongside fast Virgin Media cable lines in selected developments.",
    postcodeExamples: ["SN4 7", "SN4 8"],
    nearbyTowns: ["Purton", "Lyneham", "Wroughton"],
    faqs: []
  },
  {
    id: "tidworth",
    name: "Tidworth",
    shortIntro: "As a major military garrison town on the edge of Salisbury Plain, Tidworth has highly structured newer developments served by FibreNest and national mainstream brands.",
    postcodeExamples: ["SP9 7"],
    nearbyTowns: ["Ludgershall", "Amesbury", "Bulford"],
    faqs: []
  },
  {
    id: "ludgershall",
    name: "Ludgershall",
    shortIntro: "Located near the Hampshire border, Ludgershall gets strong Openreach coverage, plus military-community fibre options in modern housing complexes.",
    postcodeExamples: ["SP11 9"],
    nearbyTowns: ["Tidworth", "Amesbury"],
    faqs: []
  },
  {
    id: "market-lavington",
    name: "Market Lavington",
    shortIntro: "Just underneath Salisbury Plain, this lovely village is connected by Openreach and key wireless partners, which serve rural properties when fibre has not yet reached their lane.",
    postcodeExamples: ["SN10 4"],
    nearbyTowns: ["Devizes", "Potterne", "Urchfont", "Great Cheverell"],
    faqs: []
  },
  {
    id: "worton",
    name: "Worton",
    shortIntro: "A beautiful rural village near Devizes. Word is spreading of Trooli's expanding full-fibre networks delivering real symmetric speed alternatives to rural residents.",
    postcodeExamples: ["SN10 5"],
    nearbyTowns: ["Devizes", "Potterne", "Great Cheverell", "Seend"],
    faqs: []
  },
  {
    id: "bromham",
    name: "Bromham",
    shortIntro: "Famous for its market gardening and rich fertile soils, Bromham now benefits from Zzoomm and BT full fibre rollouts straight to local farming cottages.",
    postcodeExamples: ["SN15 2"],
    nearbyTowns: ["Calne", "Devizes", "Rowde", "Seend"],
    faqs: []
  },
  {
    id: "rowde",
    name: "Rowde",
    shortIntro: "Lying along the Caen Hill flight of locks, Rowde is connected by Openreach and Zzoomm networks, supporting reliable homeworking setups.",
    postcodeExamples: ["SN10 2"],
    nearbyTowns: ["Devizes", "Bromham", "Lacock"],
    faqs: []
  },
  {
    id: "urchfont",
    name: "Urchfont",
    shortIntro: "Famous for its village pond and annual scarecrow festival, Urchfont was once a broadband black hole. Altnets are now installing fibre directly across local roads.",
    postcodeExamples: ["SN10 4"],
    nearbyTowns: ["Devizes", "Potterne", "Market Lavington"],
    faqs: []
  },
  {
    id: "great-cheverell",
    name: "Great Cheverell",
    shortIntro: "A peaceful rural parish served by Voneus and Openreach, providing strong support for agricultural businesses and local home learners.",
    postcodeExamples: ["SN10 4"],
    nearbyTowns: ["Market Lavington", "Potterne", "Worton"],
    faqs: []
  },
  {
    id: "potterne",
    name: "Potterne",
    shortIntro: "Just south of Devizes, Potterne is served by Trooli, Voneus, and Openreach based providers, letting residents stream and game with ease.",
    postcodeExamples: ["SN10 5"],
    nearbyTowns: ["Devizes", "Urchfont", "Worton", "Market Lavington"],
    faqs: []
  },
  {
    id: "seend",
    name: "Seend",
    shortIntro: "An elevated ridgetop village with beautiful rural views, Seend is connected by Zzoomm, Trooli, and traditional cabinet networks.",
    postcodeExamples: ["SN12 6"],
    nearbyTowns: ["Devizes", "Melksham", "Trowbridge", "Bromham"],
    faqs: []
  },
  {
    id: "shrewton",
    name: "Shrewton",
    shortIntro: "A key Salisbury Plain village. Shrewton has substantial coverage from Wessex Internet and Voneus, bypassing older slow copper lines completely.",
    postcodeExamples: ["SP3 4"],
    nearbyTowns: ["Salisbury", "Amesbury", "Durrington"],
    faqs: []
  },
  {
    id: "aldbourne",
    name: "Aldbourne",
    shortIntro: "A classic Wiltshire downs village nested in Marlborough’s orbit. Gigaclear provides symmetrical fibre lines, supporting work-at-home professionals.",
    postcodeExamples: ["SN8 2"],
    nearbyTowns: ["Marlborough", "Ramsbury"],
    faqs: []
  },
  {
    id: "ramsbury",
    name: "Ramsbury",
    shortIntro: "Lying along the peaceful Kennet River, Ramsbury is served by Gigaclear, providing excellent symmetric fibre directly into beautiful historic properties.",
    postcodeExamples: ["SN8 2"],
    nearbyTowns: ["Marlborough", "Aldbourne"],
    faqs: []
  },
  {
    id: "lacock",
    name: "Lacock",
    shortIntro: "Owned almost entirely by the National Trust, Lacock preserves its historic layout. Modern broadband must be carefully managed, with Truespeed and AllPoints serving lines under strict heritage compliance.",
    postcodeExamples: ["SN15 2"],
    nearbyTowns: ["Chippenham", "Corsham", "Melksham", "Bromham"],
    faqs: []
  },
  {
    id: "tisbury",
    name: "Tisbury",
    shortIntro: "A bustling village in the Nadder Valley. Wessex Internet is highly active in the hills, alongside Jurassic Fibre closer to the railway line.",
    postcodeExamples: ["SP3 6"],
    nearbyTowns: ["Mere", "Salisbury", "Warminster"],
    faqs: []
  },
  {
    id: "mere",
    name: "Mere",
    shortIntro: "At Wiltshire's extreme South West corner, Mere has solid rural fibre alternatives from Wessex Internet alongside traditional providers.",
    postcodeExamples: ["BA12 6"],
    nearbyTowns: ["Zeals", "Warminster", "Tisbury"],
    faqs: []
  },
  {
    id: "downton",
    name: "Downton",
    shortIntro: "Positioned near the New Forest border, Downton relies on Wessex Internet and Openreach to handle growing population needs.",
    postcodeExamples: ["SP5 3"],
    nearbyTowns: ["Salisbury", "Wilton"],
    faqs: []
  },
  {
    id: "cricklade",
    name: "Cricklade",
    shortIntro: "The first town on the River Thames. Cricklade gets outstanding full fibre connectivity from Gigaclear alongside mainstream companies.",
    postcodeExamples: ["SN6 6"],
    nearbyTowns: ["Purton", "Malmesbury"],
    faqs: []
  },
  {
    id: "purton",
    name: "Purton",
    shortIntro: "A large parish near Swindon's border. Served by Gigaclear and Openreach, giving residents great homeworking options.",
    postcodeExamples: ["SN5 4"],
    nearbyTowns: ["Cricklade", "Royal Wootton Bassett", "Malmesbury"],
    faqs: []
  },
  {
    id: "wroughton",
    name: "Wroughton",
    shortIntro: "Nestled at the foot of the Marlborough Downs, Wroughton is highly connected, with Gigaclear and Openreach FTTP actively serving newer housing estates.",
    postcodeExamples: ["SN4 9"],
    nearbyTowns: ["Swindon", "Marlborough", "Purton"],
    faqs: []
  },
  {
    id: "lyneham",
    name: "Lyneham",
    shortIntro: "Famous for its historical military aviation history. Connected by Openreach and key 5G providers delivering flexible wireless broadband options.",
    postcodeExamples: ["SN15 4"],
    nearbyTowns: ["Royal Wootton Bassett", "Calne", "Chippenham"],
    faqs: []
  },
  {
    id: "bulford",
    name: "Bulford",
    shortIntro: "Another major Army garrison community on Salisbury Plain, served by high-speed Openreach FTTP and local mobile systems.",
    postcodeExamples: ["SP4 9"],
    nearbyTowns: ["Amesbury", "Durrington", "Tidworth"],
    faqs: []
  },
  {
    id: "durrington",
    name: "Durrington",
    shortIntro: "A prominent Salisbury Plain parish with high Openreach broadband availability and growing 5G smart backup structures.",
    postcodeExamples: ["SP4 8"],
    nearbyTowns: ["Amesbury", "Bulford", "Shrewton"],
    faqs: []
  },
  {
    id: "wilton",
    name: "Wilton",
    shortIntro: "Historically famous for its carpets and stately Wilton House. Wilton boasts Truespeed and Wessex Internet full fibre options across town streets.",
    postcodeExamples: ["SP2 0"],
    nearbyTowns: ["Salisbury", "Downton", "Shrewton"],
    faqs: []
  },
  {
    id: "heytesbury",
    name: "Heytesbury",
    shortIntro: "A gorgeous Wylye Valley village. High-performance rural full fibre from Wessex Internet and Voneus has transformed village speeds from single-digits to gigabits.",
    postcodeExamples: ["BA12 0"],
    nearbyTowns: ["Warminster", "Westbury", "Shrewton"],
    faqs: []
  },
  {
    id: "box",
    name: "Box",
    shortIntro: "Famous for Brunel's historic Box Tunnel. Truespeed and Openreach deliver advanced broadband through the valley despite steep limestone slopes.",
    postcodeExamples: ["SN13 8", "SN13 9"],
    nearbyTowns: ["Corsham", "Colerne", "Bradford on Avon"],
    faqs: []
  },
  {
    id: "colerne",
    name: "Colerne",
    shortIntro: "Perched high on a ridge, Colerne faces physical connection challenges. Truespeed full fibre helps bypass older telephone exchanges with extreme reliability.",
    postcodeExamples: ["SN14 8"],
    nearbyTowns: ["Box", "Corsham", "Chippenham"],
    faqs: []
  },
  {
    id: "sherston",
    name: "Sherston",
    shortIntro: "A beautifully preserved Cotswold border village. Connected by Gigaclear, delivering symmetric fibre directly into ancient stone properties.",
    postcodeExamples: ["SN16 0"],
    nearbyTowns: ["Malmesbury", "Hullavington"],
    faqs: []
  },
  {
    id: "hullavington",
    name: "Hullavington",
    shortIntro: "A former RAF village, connected by Gigaclear and Openreach, providing military personnel and homeworkers with solid, fast broadband.",
    postcodeExamples: ["SN14 6"],
    nearbyTowns: ["Malmesbury", "Sherston", "Chippenham"],
    faqs: []
  },
  {
    id: "winsley",
    name: "Winsley",
    shortIntro: "A hillside village on Bath's outskirts. Truespeed has built full FTTP directly to local homes, delivering speeds up to 900Mbps.",
    postcodeExamples: ["BA15 2"],
    nearbyTowns: ["Bradford on Avon", "Trowbridge", "Holt"],
    faqs: []
  },
  {
    id: "holt",
    name: "Holt",
    shortIntro: "This attractive old village has seen excellent coverage expansions from Truespeed alongside mainstream fibre providers.",
    postcodeExamples: ["BA14 6"],
    nearbyTowns: ["Trowbridge", "Winsley", "Bradford on Avon", "Melksham"],
    faqs: []
  }
];
export type { Town };
