import fs from 'fs';
import path from 'path';

// Let's import the data elements. Using tsx tool we can load TS files directly
import { seoPagesData } from '../src/data/seoPages.ts';
import { postcodeAreasData } from '../src/data/postcodeAreas.ts';
import { townPagesData } from '../src/data/townPages.ts';
import { providerDirectoryData } from '../src/data/providerDirectory.ts';

const DOMAIN = "https://www.wiltshirebroadbandfinder.co.uk";
const defaultDate = "2026-06-10";

function formatDate(dateStr) {
  if (!dateStr) return defaultDate;
  // If in format like "June 8, 2026" or "2026-06-08"
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateStr;
  }
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
  } catch (e) {
    // fallback
  }
  return defaultDate;
}

const urls = [];

// 1. Homepage & main SEO Guides
urls.push({ loc: `${DOMAIN}/`, lastmod: defaultDate, priority: "1.0", changefreq: "weekly" });

for (const key of Object.keys(seoPagesData)) {
  if (key === 'home') continue;
  const page = seoPagesData[key];
  if (page.indexStatus === 'noindex') {
    console.log(`Skipping no-index SEO Guide: ${page.slug}`);
    continue;
  }
  urls.push({
    loc: `${DOMAIN}/${page.slug}`,
    lastmod: formatDate(page.lastUpdated),
    priority: "0.8",
    changefreq: "weekly"
  });
}

// 2. Provider directory homepage
urls.push({ loc: `${DOMAIN}/broadband-providers`, lastmod: defaultDate, priority: "0.9", changefreq: "weekly" });

// 3. Independent Provider profiles
for (const provider of providerDirectoryData) {
  if (provider.isLive === false || provider.listingStatus === "Disabled") {
    console.log(`Skipping draft provider: ${provider.providerId}`);
    continue;
  }
  urls.push({
    loc: `${DOMAIN}/providers/${provider.slug}`,
    lastmod: formatDate(provider.lastCheckedDate),
    priority: "0.7",
    changefreq: "weekly"
  });
}

// 4. Town Pages
for (const key of Object.keys(townPagesData)) {
  const town = townPagesData[key];
  if (town.indexStatus === 'noindex') {
    console.log(`Skipping no-index Town: ${town.slug}`);
    continue;
  }
  urls.push({
    loc: `${DOMAIN}/town/${town.slug}`,
    lastmod: formatDate(town.lastUpdated),
    priority: "0.7",
    changefreq: "weekly"
  });
}

// 5. Postcode Pages
for (const area of postcodeAreasData) {
  // If indexStatus is noindex, we can skip it. By default postcode areas are index.
  // We can add check if there's indexStatus.
  urls.push({
    loc: `${DOMAIN}/broadband/${area.slug}`,
    lastmod: formatDate(area.lastUpdated),
    priority: "0.6",
    changefreq: "weekly"
  });
}

// 6. Contact, Advertise, with defaultDate
urls.push({ loc: `${DOMAIN}/contact`, lastmod: defaultDate, priority: "0.5", changefreq: "monthly" });
urls.push({ loc: `${DOMAIN}/advertise`, lastmod: defaultDate, priority: "0.5", changefreq: "monthly" });
urls.push({ loc: `${DOMAIN}/list-provider`, lastmod: defaultDate, priority: "0.5", changefreq: "monthly" });
urls.push({ loc: `${DOMAIN}/privacy`, lastmod: defaultDate, priority: "0.3", changefreq: "yearly" });
urls.push({ loc: `${DOMAIN}/terms`, lastmod: defaultDate, priority: "0.3", changefreq: "yearly" });
urls.push({ loc: `${DOMAIN}/cookie`, lastmod: defaultDate, priority: "0.3", changefreq: "yearly" });

// Build XML structure
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

for (const u of urls) {
  xml += '  <url>\n';
  xml += `    <loc>${u.loc}</loc>\n`;
  xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
  xml += `    <priority>${u.priority}</priority>\n`;
  xml += '  </url>\n';
}

xml += '</urlset>\n';

const sitemapPath = path.resolve('public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`\nSuccessfully compiled ${urls.length} indexable URLs to ${sitemapPath}!`);

// Ensure logo.png and og-image.png exist in public folders by copying the highest fidelity wbbw icon if available
try {
  const iconSource = path.resolve('public', 'icons', 'wbbw-app-icon.png');
  const logoDest = path.resolve('public', 'logo.png');
  const ogImageDest = path.resolve('public', 'icons', 'og-image.png');
  
  if (fs.existsSync(iconSource)) {
    fs.copyFileSync(iconSource, logoDest);
    fs.copyFileSync(iconSource, ogImageDest);
    console.log(`Successfully verified and updated ${logoDest} and ${ogImageDest}`);
  } else {
    console.warn(`Source icon not found at ${iconSource}`);
  }
} catch (logoErr) {
  console.error("Failed to copy logo asset:", logoErr);
}
