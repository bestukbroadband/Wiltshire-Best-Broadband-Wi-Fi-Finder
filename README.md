# Wiltshire Broadband Finder

Wiltshire Broadband Finder is a modern, responsive, local broadband listing, comparison, and lead generation platform designed specifically for rural villages, market towns, and larger communities across Wiltshire, UK. 

## 🌟 Brand Guidelines & Architecture

### Shorter Brand Name (Header & Footer)
The application utilizes **Wiltshire Broadband Finder** as its primary short brand identity.

### Long Brand Position
The full product title is **Best Broadband for Rural Wiltshire Villages and Towns**, directly targeting the unique infrastructure challenges of the West Country.

---

## 🛠️ Key Functionality Built
1. **Dynamic Provider Databases (`src/data/providers.ts`)**: Registers 30 detailed alternative networks (altnets) and mainstream national broadband providers. Includes text-based logos to fulfill legal constraints against unauthorized trademark use.
2. **Parish Landing Pages System (`src/data/towns.ts`)**: Pre-populates 50+ Wiltshire towns and villages (such as Devizes, Worton, Salisbury, Marlborough, Calne, Corsham, Amesbury, and Warminster) with custom local descriptions, postcode sectors, and parished FAQs.
3. **Objective Scored Rankings (`src/data/rankingRules.ts`)**: Ranks listed bargains transparently based on speed benchmarks, upfront installation fees, and price freeze shields.
4. **Interactive Filters Panels (`src/components/FilterPanel.tsx`)**: Integrates complex sliders for monthly cost controls, minimum speed triggers, maximum contract duration caps, and Openreach / wireless selectors.
5. **Robust Advertising System (`src/components/AdvertBanner.tsx`)**: Renders targeted sponsor banners by placement sizes (Homepage leaderboards, Town Page banners, sidebar slots) mapped from `src/data/adverts.ts`.
6. **Lead Conversion Form (`src/components/LeadForm.tsx`)**: Fully captures all 14 requested contact parameters, switching motives, and current contract details, guarded by a compliant, non-preticked address checking authorization box.
7. **Compliance and Disclaimers**: Integrates clear notices stating this independent comparison tool represents listed options rather than the whole UK market, owned by **Cane Communications Limited (Company Number 11485145)**.
8. **Structured Provider Directory & SEO Database (`src/data/providerDirectory.ts` & `src/components/ProviderDirectoryView.tsx`)**: Indexes 40+ canonical providers partitioned into distinct classifications (Mainstream, parished AltNets, Rural, LEO Satellite, Business & Enterprise, Student, and Wholesale Infrastructure). Implements dynamic canonicalization rules, brand alias search index mappings, interactive comparison SEO widgets, individual provider profile cards, and deep SEO template pages with integrated JSON-LD schemas (Breadcrumbs, WebPages, ItemLists, FAQPage, and localized product Offers).

---

## 🔒 Security & Persistent Backend Hooks
Wiltshire Broadband Finder initializes its state locally using React context and `localStorage` to ensure a responsive, zero-error preview environment.

Below are placeholders on how to migrate this to persistent full-stack environments like **Firebase** or **Supabase**:

### Firebase Integration Pointer
To persist lead enquiries in Firebase Firestore:
1. Setup a Firebase configuration module:
   ```typescript
   // src/lib/firebase.ts
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
     apiKey: process.env.FIREBASE_API_KEY,
     authDomain: "wiltshire-broadband.firebaseapp.com",
     projectId: "wiltshire-broadband",
     storageBucket: "wiltshire-broadband.appspot.com",
     messagingSenderId: "..."
   };

   export const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   ```
2. Modify `@/src/components/LeadForm.tsx`:
   ```typescript
   import { db } from "../lib/firebase";
   import { collection, addDoc } from "firebase/firestore";

   // Inside handleSubmit:
   await addDoc(collection(db, "leads"), submissionPayload);
   ```

### Supabase Integration Pointer
To collect listings proposals in Supabase:
```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Usage inside ListProviderForm:
const { data, error } = await supabase
  .from("provider_listings_requests")
  .insert([formData]);
```

---

## ⚖️ UK Legal Compliance Checklist
Before taking this comparing tool live in the United Kingdom, verify the following elements with your legal advisors:
1. **Whole-Market Disclaimers**: Ensure that our disclaimer stating we do not represent the whole UK market is visible at focal points adjacent to any rankings view.
2. **Advertising Disclosures**: Ensure sponsored provider placements (gold highlighting) clearly state that sponsored status represents visibility paid by sponsors and does not dictate objective rank positions.
3. **Data Protection & GDPR Consent**: The address verification consent check must remain strictly unchecked by default (no pre-ticking) and explain that details will only be passed to suppliers servicing their specific location.
4. **Affiliate and Commissions Transparency**: The commission wording details must describe that we may receive referral finder's fees from selected providers.
5. **Trading Style Ownership**: The footer must consistently declare Cane Communications Limited as the sole operator and copyright holder of the trading style.
