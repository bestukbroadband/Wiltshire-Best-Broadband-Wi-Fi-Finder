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

---

## 🔍 Search Engine Optimization & Deployments

### Google Search Console Verification
- **Support**: Universal HTML file verification. Place your Google Search Console verification HTML file (e.g., `google46bc9a9e4cd6fd5e.html`) inside the `public/` directory. Confirm it is served directly from the live site root after deployment (e.g. `/google46bc9a9e4cd6fd5e.html`).
- **Active Verification File**: Done! `public/google46bc9a9e4cd6fd5e.html` is in place.

### Sitemap & Robots Verification
- **Dynamic Sitemap**: Built dynamically from your real dataset files (`seoPages.ts`, `postcodeAreas.ts`, `townPages.ts`, `providerDirectory.ts`).
- **Regenerate Command**: Run the following script to compile an updated `public/sitemap.xml` listing all indexable pages:
  ```bash
  npm run generate:sitemap
  ```
- **Build Integration**: The sitemap is automatically regenerated *prior* to every production build by default under `npm run build`.
- **Crawler Optimization**: `public/robots.txt` is configured to allow crawling from index bots (`User-agent: *`, `Allow: /`) and directs indexing packages directly to the compiled XML sitemap URL.

### 🚀 GitHub Pages Deployment Guide

We have pre-configured this application for automated, continuous deployment to **GitHub Pages** using GitHub Actions workflows.

#### Step 1: Set the Vite Base Path
To support the subpath directory layout used by GitHub Pages by default (e.g. `https://your-username.github.io/your-repository/`), the assets must be referenced correctly relative to your repository name.
1. Open up `vite.config.ts`.
2. Locate the `base` parameter.
3. Replace the placeholder with your actual GitHub repository name (surrounded by slashes):
   ```typescript
   // Use base: "/" only for a custom domain or root deployment.
   // Use base: "/REPOSITORY_NAME/" for GitHub Pages project deployment.
   base: "/your-repository-name/",
   ```
4. If you decide to link a **custom domain** (e.g. `wiltshirebroadbandfinder.co.uk`) to your GitHub Pages settings later on, revert this parameter to:
   ```typescript
   base: "/",
   ```

#### Step 2: Push Your Code to GitHub
We have configured an automated workflow file at `.github/workflows/deploy.yml` that will build and publish your project dynamically on every commit pushed to your default branch:
1. Initialize a Git repository locally if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "feat: configure github pages deployment"
   ```
2. Add your remote GitHub repository as origin:
   ```bash
   git remote add origin https://github.com/your-username/your-repository-name.git
   ```
3. Push your changes up to the `main` branch:
   ```bash
   git branch -M main
   git push -u origin main
   ```

#### Step 3: Enable Pages in GitHub Settings
Once you push your code, follow these steps inside your GitHub browser tab:
1. Navigate to your repository page on GitHub.
2. Click on the **Settings** tab.
3. In the left sidebar under the "Code and automation" section, click on **Pages**.
4. Inside the **Build and deployment** area, click on the **Source** dropdown menu and select:
   * **GitHub Actions** (highly recommended, as our `.github/workflows/deploy.yml` takes care of this automatically).
5. Once selected, head over to the **Actions** tab on top to see the active "Deploy static content to Pages" job compiling, uploading the `/dist` artifacts, and going green!

#### Step 4: Find Your Live URL
Once the actions deploy job status displays as completed successfully:
1. Return to **Settings > Pages**.
2. A banner on top will describe: **"Your site is live at..."** alongside your direct URL (e.g., `https://your-username.github.io/your-repository-name/`).

---

### 🔧 Troubleshooting Assets & Broken Links

If you notice broken logo graphics, blank screens, missing styles, or unresolved favicon pointers when first opening your live URL, it typically means the compilation base path mismatch occurred:
1. **Empty / Blank White Screen with JS Errors (Console 404)**: Verify that the `base` name supplied inside `vite.config.ts` matches your **case-sensitive** GitHub repository name exactly. If your repo is named `Wiltshire-Broadband`, the path *must* be `/Wiltshire-Broadband/` (including both enclosing slashes).
2. **Missing Google Search Console Verification**: Ensure your Search Console verification file (`google46bc9a9e4cd6fd5e.html`) is located exactly inside the `public/` folder, which gets cloned directly into the output root directory during construction.
3. **Canonical Sitemap Errors**: If hosting on a subpath, open up `/scripts/generate-sitemap.js`, adjust the `DOMAIN` constant value to include the subpath URL prefix (e.g., `https://your-username.github.io/your-repository-name`), and trigger `npm run build` or push code to let the pipeline generate sitemap entries properly matching your live route index layout.

