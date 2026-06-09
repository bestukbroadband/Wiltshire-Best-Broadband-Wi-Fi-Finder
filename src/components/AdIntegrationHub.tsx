/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Copy, Check, ShieldAlert, Sparkles, Code2, Cpu, Smartphone, Layout, HelpCircle, ExternalLink, ShoppingCart, Star, Cookie } from "lucide-react";

export function AdIntegrationHub() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Tab within the Integration Hub: "adsense" | "amazon" | "medianet" | "cookie"
  const [activeHubTab, setActiveHubTab] = useState<"adsense" | "amazon" | "medianet" | "cookie">("adsense");

  // Custom states for Cookie Banner
  const [cookieBrandColor, setCookieBrandColor] = useState("#0284c7");
  const [cookieTitle, setCookieTitle] = useState("We Value Your Privacy");
  const [cookieDesc, setCookieDesc] = useState("We use cookies to analyze regional traffic, enhance browsing speed, and support local Wiltshire broadband recommendations through relevant affiliate positions.");
  const [cookiePrivacyLink, setCookiePrivacyLink] = useState("/privacy");
  const [cookieAcceptLabel, setCookieAcceptLabel] = useState("Accept All Cookies");
  const [cookieDeclineLabel, setCookieDeclineLabel] = useState("Decline");

  // Custom states for AdSense
  const [adClient, setAdClient] = useState("ca-pub-1234567890123456");
  const [adSlotInArticle, setAdSlotInArticle] = useState("9876543210");
  const [adSlotSidebar, setAdSlotSidebar] = useState("5432109876");

  // Custom states for Amazon Associates
  const [assocTag, setAssocTag] = useState("wiltshirebroad-21");
  const [framework, setFramework] = useState<"html" | "react" | "jekyll">("html");

  // Custom states for Media.net
  const [mediaNetPubId, setMediaNetPubId] = useState("8CU12345");
  const [mediaNetCrid, setMediaNetCrid] = useState("721839210");
  const [mediaNetSize, setMediaNetSize] = useState("728x90");
  const [mediaNetFallbackText, setMediaNetFallbackText] = useState("Featured Contextual Ad Links");

  // Sample products for Amazon Showcase Grid (thematically tied to rural internet)
  const products = [
    {
      id: "prod-1",
      title: "TP-Link Deco PX50 Powerline Mesh Wi-Fi 6 (3-Pack)",
      description: "Penetrates thick stone cottage walls using electrical mains wiring to secure gigabit speeds.",
      price: "£189.99",
      imgUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.8,
      reviews: 124,
      amazonUrl: `https://www.amazon.co.uk/dp/B0B589Y8Y4?tag=${assocTag}`
    },
    {
      id: "prod-2",
      title: "Wavlink Outdoor High-Power AC1200 Wi-Fi Extender",
      description: "Weatherproof dual-band range extender designed for farm yards, outbuildings and patios.",
      price: "£79.45",
      imgUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.5,
      reviews: 86,
      amazonUrl: `https://www.amazon.co.uk/dp/B0789XYZ12?tag=${assocTag}`
    },
    {
      id: "prod-3",
      title: "Cat 8 Ethernet Cable 15m - High-Speed Flat Wire",
      description: "Symmetrical 40Gbps rated shield cable with wire clips. Ideal for connecting home offices cleanly.",
      price: "£14.99",
      imgUrl: "https://images.unsplash.com/photo-1551703599-6b3dbb3f6f2b?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.9,
      reviews: 312,
      amazonUrl: `https://www.amazon.co.uk/dp/B07P8R5F5C?tag=${assocTag}`
    },
    {
      id: "prod-4",
      title: "Fritz!Box 7530 AX Wi-Fi 6 Router with VoIP DSL",
      description: "Superb alternative modem-router with stellar diagnostics, brilliant for FTTC and full-fibre connections.",
      price: "£119.00",
      imgUrl: "https://images.unsplash.com/photo-1600541519463-ebec772591e0?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.7,
      reviews: 94,
      amazonUrl: `https://www.amazon.co.uk/dp/B08V8Y8ZZX?tag=${assocTag}`
    }
  ];

  // Code copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Google AdSense Scripts
  const adSenseHeaderScript = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}" crossorigin="anonymous"></script>`;

  const inArticleHtml = `<!-- Google AdSense - CLS Protected In-Article Responsive Ad -->
<div class="adsense-article-ctr" style="min-height: 280px; margin: 1.5rem 0; background: #fafafa; border: 1px solid #e5e7eb; border-radius: 12px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
  <!-- Prefilled layout dimensions avoid Cumulative Layout Shift (CLS) on dynamic load -->
  <ins class="adsbygoogle"
       style="display:block; text-align:center;"
       data-ad-layout="in-article"
       data-ad-format="fluid"
       data-ad-client="${adClient}"
       data-ad-slot="${adSlotInArticle}"></ins>
  <script>
       (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>`;

  const sidebarHtml = `<!-- Google AdSense - CLS Protected Sidebar Medium Rectangle/Skyscraper Ad -->
<div class="adsense-sidebar-ctr" style="min-height: 250px; max-height: 600px; margin: 1rem 0; background: #fafafa; border: 1px solid #e5e7eb; border-radius: 12px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
  <!-- Responding height placeholder anchors layout positioning -->
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="${adClient}"
       data-ad-slot="${adSlotSidebar}"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
       (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>`;

  // Media.net Header-placement generator variables
  const getMediaNetCode = () => {
    return `<!-- Media.net Responsive Contextual Placement Sitting Beneath Page Header -->
<div id="mnet-ad-header-placement-${mediaNetPubId}" class="mnet-header-container">
  
  <!-- Fallback / Loading Banner remains gracefully active if blocked by user's browser -->
  <div class="mnet-fallback-placeholder">
    <div class="mnet-shimmer-animation"></div>
    <span class="mnet-fallback-text">${mediaNetFallbackText}</span>
  </div>

  <!-- Real tag targeted container. Script pushes iframe execution above fallback wrapper. -->
  <div id="${mediaNetCrid}-ad-slot">
    <script type="text/javascript">
      window._mNHandle = window._mNHandle || {};
      window._mNHandle.queue = window._mNHandle.queue || [];
      window._mNHandle.queue.push(function() {
        if (window._mNDetails && typeof window._mNDetails.loadTag === 'function') {
          window._mNDetails.loadTag("${mediaNetCrid}-ad-slot", "${mediaNetSize}", "${mediaNetCrid}");
        }
      });
    </script>
  </div>
</div>

<!-- Async script tag to request Media.net ad platform service engine -->
<script async src="https://contextual.media.net/adhost.js?cid=${mediaNetPubId}"></script>

<!-- CSS to enforce fluid rendering, avoid layout jumping (CLS), and render modern fallbacks -->
<style>
  .mnet-header-container {
    width: 100%;
    /* Pre-calculate and lock minimum-height to eliminate Cumulative Layout Shift (CLS) */
    min-height: 90px;
    margin: 1rem 0 2rem 0;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background-color: #f8fafc;
    border: 1px dashed #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.3s ease;
  }
  
  .mnet-header-container:hover {
    border-color: #0284c7;
  }

  /* Shimmer / Fallback layer rendered underneath or prior to payload injection */
  .mnet-fallback-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    background-color: #f1f5f9;
  }

  .mnet-shimmer-animation {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
    background-size: 200% 100%;
    animation: mnetShimmerScale 1.8s infinite linear;
    opacity: 0.65;
  }

  .mnet-fallback-text {
    position: relative;
    z-index: 2;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #64748b;
  }

  @keyframes mnetShimmerScale {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Elevates live contextual iframe when rendered by the client script engine */
  .mnet-header-container iframe {
    position: relative;
    z-index: 3;
    max-width: 100%;
  }
</style>`;
  };

  // Customizable GDPR Compliance Cookie Consent Banner Generator
  const getCookieBannerCode = () => {
    return `<!-- Lightweight, Modern Cookie Consent Banner -->
<div id="wiltshire-cookie-consent" class="wiltshire-cookie-bar" style="display: none;">
  <div class="wiltshire-cookie-wrapper">
    <div class="wiltshire-cookie-layout">
      <!-- Cookie Stamp Header -->
      <div class="wiltshire-cookie-body">
        <div class="wiltshire-cookie-indicator">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cookie">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
            <path d="M8.5 8.5v.01"/>
            <path d="M16 15.5v.01"/>
            <path d="M12 12v.01"/>
            <path d="M11 17v.01"/>
            <path d="M7 14v.01"/>
          </svg>
        </div>
        <div class="wiltshire-cookie-text">
          <h4 class="wiltshire-cookie-title">${cookieTitle}</h4>
          <p class="wiltshire-cookie-message">
            ${cookieDesc} <a href="${cookiePrivacyLink}" class="wiltshire-cookie-link">Cookie & Privacy Policy</a>
          </p>
        </div>
      </div>
      
      <!-- Interactive Choice Buttons -->
      <div class="wiltshire-cookie-actions">
        <button id="wiltshire-cookie-decline" class="wiltshire-btn wiltshire-btn-decline">
          ${cookieDeclineLabel}
        </button>
        <button id="wiltshire-cookie-accept" class="wiltshire-btn wiltshire-btn-accept">
          ${cookieAcceptLabel}
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Standard modern reset with absolute screen adherence position */
  .wiltshire-cookie-bar {
    position: fixed;
    bottom: -150px; /* Hidden offscreen prior to sliding up */
    left: 0;
    right: 0;
    z-index: 99999;
    background-color: #ffffff;
    border-top: 1px solid #e2e8f0;
    box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.08), 0 -8px 10px -6px rgba(0, 0, 0, 0.08);
    opacity: 0;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
    padding: 1.25rem 1rem;
    box-sizing: border-box;
  }

  /* Slide up display active trigger class */
  .wiltshire-cookie-bar.is-cookie-banner-active {
    transform: translateY(-150px); /* Custom smooth translate transition slide up */
    bottom: 0;
    opacity: 1;
  }

  .wiltshire-cookie-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .wiltshire-cookie-layout {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    align-items: flex-start;
  }

  @media (min-width: 768px) {
    .wiltshire-cookie-layout {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }
  }

  .wiltshire-cookie-body {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    flex-grow: 1;
    text-align: left;
  }

  .wiltshire-cookie-indicator {
    padding: 0.5rem;
    background-color: #ecfdf5;
    color: #10b981;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .wiltshire-cookie-text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  .wiltshire-cookie-title {
    margin: 0 0 0.25rem 0;
    font-size: 0.925rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.01em;
  }

  .wiltshire-cookie-message {
    margin: 0;
    font-size: 0.775rem;
    color: #64748b;
    line-height: 1.5;
  }

  .wiltshire-cookie-link {
    color: ${cookieBrandColor};
    font-weight: 600;
    text-decoration: underline;
    transition: opacity 0.2s ease;
  }

  .wiltshire-cookie-link:hover {
    opacity: 0.8;
  }

  .wiltshire-cookie-actions {
    display: flex;
    gap: 0.75rem;
    width: 100%;
    flex-shrink: 0;
  }

  @media (min-width: 480px) {
    .wiltshire-cookie-actions {
      width: auto;
    }
  }

  .wiltshire-btn {
    flex: 1;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 0.775rem;
    font-weight: 700;
    padding: 0.625rem 1.25rem;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s ease;
    border: none;
    outline: none;
    box-sizing: border-box;
  }

  @media (min-width: 480px) {
    .wiltshire-btn {
      flex: none;
    }
  }

  .wiltshire-btn-accept {
    background-color: ${cookieBrandColor};
    color: #ffffff;
  }

  .wiltshire-btn-accept:hover {
    filter: brightness(0.9);
  }

  .wiltshire-btn-decline {
    background-color: #f1f5f9;
    color: #475569;
  }

  .wiltshire-btn-decline:hover {
    background-color: #e2e8f0;
  }
</style>

<script type="text/javascript">
  (function() {
    document.addEventListener("DOMContentLoaded", function() {
      var bannerElement = document.getElementById("wiltshire-cookie-consent");
      var acceptBtn = document.getElementById("wiltshire-cookie-accept");
      var declineBtn = document.getElementById("wiltshire-cookie-decline");

      if (!bannerElement || !acceptBtn || !declineBtn) return;

      // 1. Verify consent state inside localStorage memory
      var activeConsent = localStorage.getItem("cookie_consent_approved");

      if (activeConsent === null) {
        // Expose container initially to avoid layout recalculation overlaps
        bannerElement.style.display = "block";
        
        // 2. Trigger elegant sliding animation with small offset delay
        setTimeout(function() {
          bannerElement.classList.add("is-cookie-banner-active");
          bannerElement.style.bottom = "0";
          bannerElement.style.opacity = "1";
        }, 1200);
      }

      // Dismiss cookie wrapper handler
      function commitChoice(approved) {
        localStorage.setItem("cookie_consent_approved", approved);
        bannerElement.style.opacity = "0";
        bannerElement.style.bottom = "-150px";
        bannerElement.classList.remove("is-cookie-banner-active");
        
        // Retract block display once animation retract completes
        setTimeout(function() {
          bannerElement.style.display = "none";
        }, 600);
      }

      acceptBtn.addEventListener("click", function() {
        commitChoice("accepted");
      });

      declineBtn.addEventListener("click", function() {
        commitChoice("declined");
      });
    });
  })();
</script>`;
  };

  // Amazon Grid Generator Output
  const getAmazonGridCode = () => {
    if (framework === "html") {
      return `<!-- Amazon Associates responsive showcase grid -->
<div class="amazon-showcase-grid-wrapper">
  <style>
    .amazon-showcase-grid-wrapper {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .amazon-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    @media (min-width: 640px) {
      .amazon-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1024px) {
      .amazon-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    .amazon-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      justify-between;
      transition: all 0.3s ease;
      position: relative;
    }
    .amazon-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
      border-color: #cbd5e1;
    }
    .amazon-img-container {
      width: 100%;
      height: 180px;
      background: #f8fafc;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .amazon-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
    .amazon-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 2.8rem;
    }
    .amazon-description {
      font-size: 0.75rem;
      color: #64748b;
      margin-bottom: 1rem;
      line-height: 1.5;
      height: 3.3rem;
      overflow: hidden;
    }
    .amazon-meta {
      margin-top: auto;
      border-top: 1px solid #f1f5f9;
      padding-top: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .amazon-price {
      font-size: 1.1rem;
      font-weight: 800;
      color: #0284c7;
    }
    .amazon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
      background: #ff9900;
      color: #111111;
      text-decoration: none;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.6rem 0.9rem;
      border-radius: 8px;
      transition: background 0.2s ease;
      border: 1px solid #d88000;
    }
    .amazon-btn:hover {
      background: #e68a00;
    }
  </style>

  <div class="amazon-grid">
    ${products
      .map(
        (p) => `<!-- Product ${p.id} -->
    <div class="amazon-card">
      <div class="amazon-img-container">
        <img class="amazon-img" src="${p.imgUrl}" alt="${p.title}" referrerpolicy="no-referrer" />
      </div>
      <h3 class="amazon-title">${p.title}</h3>
      <p class="amazon-description">${p.description}</p>
      <div class="amazon-meta">
        <span class="amazon-price">${p.price}</span>
        <a href="${p.amazonUrl}" target="_blank" rel="nofollow noopener" class="amazon-btn">
          Buy on Amazon
        </a>
      </div>
    </div>`
      )
      .join("\n    ")}
  </div>
</div>`;
    } else if (framework === "react") {
      return `import React from 'react';

export function AmazonShowcaseGrid() {
  const assocTag = "${assocTag}";
  const products = ${JSON.stringify(products, null, 2)};

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-full h-44 bg-slate-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                <img src={p.imgUrl} alt={p.title} className="max-w-full max-h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors line-clamp-2 min-h-[40px]">{p.title}</h3>
              <p className="text-[11px] text-slate-500 mt-2 line-clamp-3 leading-relaxed min-h-[50px]">{p.description}</p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-base font-extrabold text-sky-600">{p.price}</span>
              <a 
                href={\`https://www.amazon.co.uk/dp/\${p.id === 'prod-1' ? 'B0B589Y8Y4' : p.id === 'prod-2' ? 'B0789XYZ12' : p.id === 'prod-3' ? 'B07P8R5F5C' : 'B08V8Y8ZZX'}?tag=\${assocTag}\`}
                target="_blank" 
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 text-xs font-bold rounded-lg border border-[#D88000] shadow-2xs transition-colors"
              >
                Buy on Amazon
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`;
    } else {
      return `---
# Jekyll Liquid include file (save as _includes/amazon_showcase.html)
framework: jekyll
---
<div class="amazon-showcase-grid-wrapper">
  <div class="amazon-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem;">
    {% for product in site.data.amazon_products %}
    <div class="amazon-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:1.25rem; display:flex; flex-direction:column; justify-content:space-between;">
      <div class="amazon-img-container" style="height:180px; width:100%; display:flex; align-items:center; justify-content:center; background:#f8fafc; border-radius:12px; margin-bottom:1rem; overflow:hidden;">
        <img src="{{ product.img_url }}" alt="{{ product.title }}" style="max-width:100%; max-height:100%; object-fit:cover;" referrerpolicy="no-referrer" />
      </div>
      <h3 style="font-size:0.9rem; font-weight:700; color:#0f172a; margin:0 0 0.5rem 0;">{{ product.title }}</h3>
      <p style="font-size:0.75rem; color:#64748b; line-height:1.5;">{{ product.description }}</p>
      <div style="margin-top:auto; padding-top:0.75rem; border-t:1px solid #f1f5f9; display:flex; align-items:center; justify-content:space-between;">
        <span style="font-size:1.1rem; font-weight:800; color:#0284c7;">{{ product.price }}</span>
        <a href="https://www.amazon.co.uk/dp/{{ product.asin }}?tag=${assocTag}" target="_blank" rel="nofollow noopener" style="background:#ff9900; color:#111; font-size:0.75rem; font-weight:700; padding:0.6rem 0.9rem; border-radius:8px; border:1px solid #d88000; text-decoration:none;">
          Buy on Amazon
        </a>
      </div>
    </div>
    {% endfor %}
  </div>
</div>`;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="ad-integration-toolkit">
      
      {/* HEADER STATEMENT */}
      <div className="bg-gradient-to-r from-brand-blue via-brand-blue-hover to-sky-700 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative space-y-2 max-w-3xl text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest leading-none">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold animate-bounce" />
            Monetization & Custom Layouts Toolkit
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
            Integrated Monetization & Code Suite
          </h1>
          <p className="text-xs text-sky-100 leading-relaxed">
            Generate pixel-perfect, highly responsive container codes for Amazon, Google AdSense, and Media.net. Pre-built safety ratios completely mitigate Cumulative Layout Shift (CLS) and provide rich loading statuses to bypass ad-blocking layouts.
          </p>
        </div>
      </div>

      {/* HUB CHANNEL SELECTOR SECTION */}
      <div className="flex border-b border-slate-200 pb-0 justify-start gap-4 text-left">
        <button
          onClick={() => setActiveHubTab("adsense")}
          className={`pb-3 text-xs uppercase tracking-wider font-extrabold border-b-2 leading-none transition-all cursor-pointer flex items-center gap-1.5 ${
            activeHubTab === "adsense"
              ? "border-brand-blue text-brand-blue"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <Code2 className="h-4 w-4" />
          Google AdSense
        </button>
        <button
          onClick={() => setActiveHubTab("amazon")}
          className={`pb-3 text-xs uppercase tracking-wider font-extrabold border-b-2 leading-none transition-all cursor-pointer flex items-center gap-1.5 ${
            activeHubTab === "amazon"
              ? "border-brand-blue text-brand-blue"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <Layout className="h-4 w-4" />
          Amazon Associates Grid
        </button>
        <button
          onClick={() => setActiveHubTab("medianet")}
          className={`pb-3 text-xs uppercase tracking-wider font-extrabold border-b-2 leading-none transition-all cursor-pointer flex items-center gap-1.5 ${
            activeHubTab === "medianet"
              ? "border-brand-blue text-brand-blue"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <Cpu className="h-4 w-4 text-amber-500 animate-pulse" />
          Media.net Contextual Ads
        </button>
        <button
          onClick={() => setActiveHubTab("cookie")}
          className={`pb-3 text-xs uppercase tracking-wider font-extrabold border-b-2 leading-none transition-all cursor-pointer flex items-center gap-1.5 ${
            activeHubTab === "cookie"
              ? "border-brand-blue text-brand-blue"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <ShieldAlert className="h-4 w-4 text-emerald-500" />
          Cookie Consent Banner
        </button>
      </div>

      {/* ACTIVE TAB RENDERER */}
      <div className="animate-fadeIn">
        
        {/* TAB 1: GOOGLE ADSENSE */}
        {activeHubTab === "adsense" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FAFBFD] border border-slate-200 rounded-2xl p-5 space-y-5">
                <div className="space-y-1 text-left border-b border-slate-100 pb-3">
                  <h2 className="text-md font-bold text-slate-800 flex items-center gap-1.5 uppercase font-mono tracking-wide">
                    <Code2 className="h-4.5 w-4.5 text-brand-blue" />
                    Google AdSense Configuration
                  </h2>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Insert prefilled slot configurations. Locking layout-shift boundaries avoids negative search engine rank evaluations.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 block uppercase tracking-wider">
                      Publisher Client ID (<span className="text-slate-450 font-mono font-normal">data-ad-client</span>)
                    </label>
                    <input
                      type="text"
                      value={adClient}
                      onChange={(e) => setAdClient(e.target.value)}
                      className="w-full text-xs font-mono border border-slate-250 bg-white rounded-lg p-2.5 outline-hidden text-slate-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 block uppercase tracking-wider">
                      In-Article Ad Slot (<span className="text-slate-450 font-mono font-normal">data-ad-slot</span>)
                    </label>
                    <input
                      type="text"
                      value={adSlotInArticle}
                      onChange={(e) => setAdSlotInArticle(e.target.value)}
                      className="w-full text-xs font-mono border border-slate-250 bg-white rounded-lg p-2.5 outline-hidden text-slate-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 block uppercase tracking-wider">
                      Sidebar Ad Slot (<span className="text-slate-450 font-mono font-normal">data-ad-slot</span>)
                    </label>
                    <input
                      type="text"
                      value={adSlotSidebar}
                      onChange={(e) => setAdSlotSidebar(e.target.value)}
                      className="w-full text-xs font-mono border border-slate-250 bg-white rounded-lg p-2.5 outline-hidden text-slate-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <div className="bg-sky-50 border border-sky-100/60 rounded-xl p-3.5 text-[11px] leading-relaxed text-sky-900 font-sans space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[9.5px] block text-sky-800 flex items-center gap-1">
                    <ShieldAlert className="h-3.5 w-3.5 text-sky-600" />
                    CLS Prevention Rules
                  </span>
                  <p>
                    Wrap all active Google dynamic ads in explicit container classes. Pre-calculating height keeps layout static until delivery resolves.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#FAFBFD] border border-slate-200 rounded-2xl p-5 space-y-5">
                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0284c7]">Integration File Exports</span>
                  <h3 className="text-sm font-bold text-slate-800">Ready HTML Snippets</h3>
                </div>

                {/* ADSENSE HEAD COPIER */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold tracking-wider text-slate-400">
                    <span className="uppercase">1. HTML Header Async Load Script</span>
                    <button
                      onClick={() => handleCopy(adSenseHeaderScript, "header")}
                      className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold transition-colors cursor-pointer"
                    >
                      {copiedText === "header" ? (
                        <span className="text-emerald-500 font-extrabold flex items-center gap-0.5 animate-pulse">
                          <Check className="h-3 w-3" /> Copied!
                        </span>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3.5 text-[10.5px] font-mono text-slate-300 border border-slate-800 overflow-x-auto select-all leading-normal whitespace-pre">
                    {adSenseHeaderScript}
                  </div>
                </div>

                {/* IN-ARTICLE AD UNIT COPIER */}
                <div className="space-y-1.55">
                  <div className="flex justify-between items-center text-[10px] font-bold tracking-wider text-slate-400">
                    <span className="uppercase">2. In-Article CLS Protected Unit</span>
                    <button
                      onClick={() => handleCopy(inArticleHtml, "in-article")}
                      className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold transition-colors cursor-pointer"
                    >
                      {copiedText === "in-article" ? (
                        <span className="text-emerald-500 font-extrabold flex items-center gap-0.5">
                          <Check className="h-3 w-3" /> Copied!
                        </span>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy Wrapper HTML
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3.5 text-[10.5px] font-mono text-slate-300 border border-slate-800 overflow-x-auto select-all leading-relaxed whitespace-pre max-h-40 overflow-y-auto">
                    {inArticleHtml}
                  </div>
                </div>

                {/* SIDEBAR UNIT COPIER */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold tracking-wider text-slate-400">
                    <span className="uppercase">3. Sidebar Adaptive Unit</span>
                    <button
                      onClick={() => handleCopy(sidebarHtml, "sidebar")}
                      className="flex items-center gap-0.5 text-sky-600 hover:text-sky-700 font-bold transition-colors cursor-pointer"
                    >
                      {copiedText === "sidebar" ? (
                        <span className="text-emerald-500 font-extrabold flex items-center gap-0.5">
                          <Check className="h-3 w-3" /> Copied!
                        </span>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy Sidebar Unit
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3.5 text-[10.5px] font-mono text-slate-300 border border-slate-800 overflow-x-auto select-all leading-relaxed whitespace-pre max-h-40 overflow-y-auto">
                    {sidebarHtml}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AMAZON ASSOCIATES GRID SHOWCASE */}
        {activeHubTab === "amazon" && (
          <div className="space-y-6">
            <div className="bg-[#FAFBFD] border border-slate-200 rounded-2xl p-5 space-y-5 text-left">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-md font-bold text-slate-800 flex items-center gap-1.5 uppercase font-mono tracking-wide">
                    <Layout className="h-4.5 w-4.5 text-amber-500" />
                    Amazon Associates Grid Generator
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Generate highly responsive product recommendation grids including your affiliate tag parameter.
                  </p>
                </div>

                <div className="flex bg-slate-100 rounded-lg p-1 text-[10px] font-bold self-start sm:self-center shrink-0">
                  <button
                    onClick={() => setFramework("html")}
                    className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer ${framework === "html" ? "bg-white text-slate-900 shadow-3xs" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    HTML/CSS
                  </button>
                  <button
                    onClick={() => setFramework("react")}
                    className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer ${framework === "react" ? "bg-white text-slate-900 shadow-3xs" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    React TSX
                  </button>
                  <button
                    onClick={() => setFramework("jekyll")}
                    className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer ${framework === "jekyll" ? "bg-white text-slate-900 shadow-3xs" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    Jekyll Liquid
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10.5px] font-bold text-slate-705 block uppercase tracking-wider">
                    Amazon Partner Tracking Tag
                  </label>
                  <input
                    type="text"
                    value={assocTag}
                    onChange={(e) => setAssocTag(e.target.value)}
                    placeholder="e.g. wiltshirebroad-21"
                    className="w-full text-xs font-mono border border-slate-250 bg-white rounded-lg p-2.5 outline-hidden text-slate-800 focus:border-amber-500"
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-3.5 text-[11px] leading-relaxed text-amber-900 flex items-start gap-2">
                  <Smartphone className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-amber-850">Mobile Column Stacking:</span>
                    The generated CSS implements mobile-first definitions. Grid forces single stacked columns on phones, transitioning to double wide on tablets, and 4-column display grids on desktops.
                  </div>
                </div>
              </div>

              {/* WIREFRAME RENDER PREVIEW */}
              <div className="space-y-3.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Live Mock Grid Preview</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:border-brand-blue/30 hover:shadow-2xs transition-all relative group">
                      <div>
                        {/* Image Frame */}
                        <div className="w-full h-36 bg-slate-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center relative">
                          <img 
                            src={p.imgUrl} 
                            alt={p.title} 
                            className="max-h-full max-w-full object-cover group-hover:scale-102 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-1 right-2 bg-slate-900/80 text-[7.5px] text-white font-mono px-1 rounded select-none uppercase tracking-widest font-bold">
                            REFERRAL
                          </span>
                        </div>
                        <h3 className="text-[12px] font-extrabold text-slate-800 leading-snug line-clamp-2 min-h-[34px]">
                          {p.title}
                        </h3>
                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-3 leading-normal min-h-[44px]">
                          {p.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-black text-brand-blue">
                          {p.price}
                        </span>
                        <a
                          href={p.amazonUrl}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="inline-flex items-center gap-0.5 px-3 py-1.5 bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 text-[10px] font-bold rounded-lg border border-[#D88000] transition-colors"
                        >
                          <ShoppingCart className="h-3 w-3 inline" /> Buy on Amazon
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GENERATED EXPORT */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold tracking-wider text-slate-400">
                  <span>Generated Responsive Code Block ({framework.toUpperCase()})</span>
                  <button
                    onClick={() => handleCopy(getAmazonGridCode(), "amazon-grid")}
                    className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold transition-colors cursor-pointer"
                  >
                    {copiedText === "amazon-grid" ? (
                      <span className="text-emerald-500 font-extrabold flex items-center gap-0.5">
                        <Check className="h-3.5 w-3.5" /> Code Copied!
                      </span>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Code
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <div className="bg-slate-900 rounded-xl p-3.5 text-[10px] font-mono text-slate-300 border border-slate-850 overflow-x-auto whitespace-pre max-h-[290px] overflow-y-auto leading-relaxed">
                    {getAmazonGridCode()}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: MEDIA.NET CONTEXTUAL ADS */}
        {activeHubTab === "medianet" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            
            {/* INPUT CONFIGURATORS */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FAFBFD] border border-slate-200 rounded-2xl p-5 space-y-5">
                <div className="space-y-1 text-left border-b border-slate-100 pb-3">
                  <h2 className="text-md font-bold text-slate-800 flex items-center gap-1.5 uppercase font-mono tracking-wide">
                    <Cpu className="h-4.5 w-4.5 text-amber-500" />
                    Media.net Placement Config
                  </h2>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Generate the HTML/CSS container logic for fully responsive, contextual Media.net units designed to sit directly under headers.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 block uppercase tracking-wider">
                      Customer ID / pId (<span className="text-slate-450 font-mono font-normal">cid</span>)
                    </label>
                    <input
                      type="text"
                      value={mediaNetPubId}
                      onChange={(e) => setMediaNetPubId(e.target.value)}
                      placeholder="e.g. 8CU12345"
                      className="w-full text-xs font-mono border border-slate-250 bg-white rounded-lg p-2.5 outline-hidden text-slate-800 focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 block uppercase tracking-wider">
                      Placement slot token / crid
                    </label>
                    <input
                      type="text"
                      value={mediaNetCrid}
                      onChange={(e) => setMediaNetCrid(e.target.value)}
                      placeholder="e.g. 721839210"
                      className="w-full text-xs font-mono border border-slate-250 bg-white rounded-lg p-2.5 outline-hidden text-slate-800 focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 block uppercase tracking-wider">
                      Target Ad Dimensions
                    </label>
                    <select
                      value={mediaNetSize}
                      onChange={(e) => setMediaNetSize(e.target.value)}
                      className="w-full text-xs border border-slate-250 bg-white rounded-lg p-2.5 outline-hidden text-slate-800 focus:border-sky-600"
                    >
                      <option value="728x90">728x90 &mdash; Classic Leaderboard (Desktop/Tablet)</option>
                      <option value="970x90">970x90 &mdash; Super Leaderboard (Widescreen)</option>
                      <option value="320x50">320x50 &mdash; Mobile Header Banner (Phones)</option>
                      <option value="336x280">336x280 &mdash; Large Rectangle (Responsive block)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 block uppercase tracking-wider">
                      Ad Block Fallback Text
                    </label>
                    <input
                      type="text"
                      value={mediaNetFallbackText}
                      onChange={(e) => setMediaNetFallbackText(e.target.value)}
                      className="w-full text-xs border border-slate-250 bg-white rounded-lg p-2.5 outline-hidden text-slate-800 focus:border-sky-600"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-150 rounded-xl p-3.5 text-[11px] leading-relaxed text-amber-900/90 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[9.5px] block text-amber-800 flex items-center gap-1">
                    <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                    Bypassing Adblock Voids
                  </span>
                  <p>
                    Since Media.net scripts dynamically inject markup into target divs, adblockers will leave large empty blank spots inside the layout.
                  </p>
                  <p className="font-semibold mt-1">
                    By combining CSS absolute layers and keyframe shimmer scripts, our generator guarantees a loading fallback with custom label indicators remains safely displayed in the void.
                  </p>
                </div>
              </div>
            </div>

            {/* LIVE PREVIEW & CODE CODE BLOCK CONTROLLER */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* INTERACTIVE MOCK PREVIEW CARD */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Header Ad Position Preview</span>
                  <span className="bg-sky-50 text-sky-700 text-[8.5px] font-black uppercase px-2 py-0.5 rounded">Sit Directly Under-Header</span>
                </div>

                {/* Simulated Header Interface */}
                <div className="border border-slate-150 rounded-xl overflow-hidden bg-slate-50 text-[11px]">
                  <div className="bg-slate-900 p-3 flex justify-between items-center text-white/90">
                    <span className="font-black tracking-wide text-xs">WILTSHIRE BROAD &raquo; Mock Portal</span>
                    <div className="flex gap-2 text-[9px] uppercase font-bold text-slate-300">
                      <span>HOME</span>
                      <span>TOWNS</span>
                      <span>PROVIDERS</span>
                    </div>
                  </div>

                  {/* SITS DIRECTLY BENEATH HEADLINE */}
                  <div className="p-4 bg-white border-b border-slate-100 space-y-3">
                    
                    {/* Media.net Simulated Responsive Placement container */}
                    <div className="relative w-full h-[90px] rounded-xl overflow-hidden bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center">
                      
                      {/* Active Preview Fallback card */}
                      <div className="absolute inset-0 bg-slate-105 flex items-center justify-center overflow-hidden z-1">
                        
                        {/* CSS Simulated Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200 to-transparent -translate-x-full animate-shimmer" style={{ animation: 'shimmer 1.8s infinite' }} />
                        
                        <div className="text-center z-10 px-4 space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                            {mediaNetFallbackText}
                          </span>
                          <span className="text-[8px] text-slate-400 block font-mono">
                            ID: {mediaNetCrid} | Size: {mediaNetSize} | Fallback Active
                          </span>
                        </div>
                      </div>

                    </div>

                    <div className="space-y-1.5 pt-1 text-left">
                      <div className="h-3 w-5/6 bg-slate-100 rounded-sm" />
                      <div className="h-3 w-1/2 bg-slate-100 rounded-sm" />
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 text-center">
                  *Above mock illustrates the relative hierarchy placement inside web markup, directly beneath standard top page headers.
                </p>
              </div>

              {/* GENERATED EXPORT */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold tracking-wider text-slate-400">
                  <span className="uppercase">Generated Responsive Media.net Snippet</span>
                  <button
                    onClick={() => handleCopy(getMediaNetCode(), "medianet")}
                    className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold transition-colors cursor-pointer"
                  >
                    {copiedText === "medianet" ? (
                      <span className="text-emerald-500 font-extrabold flex items-center gap-0.5 animate-pulse">
                        <Check className="h-3.5 w-3.5" /> Media.net Code Copied!
                      </span>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Code Block
                      </>
                    )}
                  </button>
                </div>
                
                <div className="relative">
                  <div className="bg-slate-900 rounded-xl p-4 text-[10px] font-mono text-slate-300 border border-slate-850 overflow-x-auto select-all leading-relaxed whitespace-pre max-h-[300px] overflow-y-auto">
                    {getMediaNetCode()}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 flex bg-slate-950/85 rounded px-2.5 py-1 select-none text-[8px] uppercase tracking-widest text-amber-400 font-extrabold font-mono">
                    CLS Protected Falling Block
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: COMPLIANT COOKIE CONSENT BANNER */}
        {activeHubTab === "cookie" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-fadeIn">
            
            {/* PARAMETER CONFIGURATIONS */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FAFBFD] border border-slate-200 rounded-2xl p-5 space-y-5">
                <div className="space-y-1 text-left border-b border-slate-100 pb-3">
                  <h2 className="text-md font-bold text-slate-800 flex items-center gap-1.5 uppercase font-mono tracking-wide">
                    <ShieldAlert className="h-4.5 w-4.5 text-emerald-500" />
                    Consent Banner Config
                  </h2>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Fully customize titles, descriptions, branding colors, and redirect legal scopes for drop-in GDPR compliance on static sites like GitHub Pages.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 block uppercase tracking-wider">
                      Banner Brand Color Accent
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={cookieBrandColor}
                        onChange={(e) => setCookieBrandColor(e.target.value)}
                        className="h-9 w-12 border border-slate-250 bg-white rounded-lg p-1 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={cookieBrandColor}
                        onChange={(e) => setCookieBrandColor(e.target.value)}
                        className="w-full text-xs font-mono border border-slate-250 bg-white rounded-lg p-2 outline-hidden text-slate-800 focus:border-emerald-500"
                        placeholder="#0284c7"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 block uppercase tracking-wider">
                      Header Block Title
                    </label>
                    <input
                      type="text"
                      value={cookieTitle}
                      onChange={(e) => setCookieTitle(e.target.value)}
                      className="w-full text-xs border border-slate-250 bg-white rounded-lg p-2.5 outline-hidden text-slate-800 focus:border-brand-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 block uppercase tracking-wider">
                      Interactive Description
                    </label>
                    <textarea
                      value={cookieDesc}
                      onChange={(e) => setCookieDesc(e.target.value)}
                      rows={4}
                      className="w-full text-xs border border-slate-250 bg-white rounded-lg p-2.5 outline-hidden text-slate-800 focus:border-brand-blue leading-normal resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9.5px] font-bold text-slate-705 block uppercase tracking-wider">
                        Accept Button
                      </label>
                      <input
                        type="text"
                        value={cookieAcceptLabel}
                        onChange={(e) => setCookieAcceptLabel(e.target.value)}
                        className="w-full text-xs border border-slate-250 bg-white rounded-lg p-2 outline-hidden text-slate-800 focus:border-brand-blue"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9.5px] font-bold text-slate-705 block uppercase tracking-wider">
                        Decline Button
                      </label>
                      <input
                        type="text"
                        value={cookieDeclineLabel}
                        onChange={(e) => setCookieDeclineLabel(e.target.value)}
                        className="w-full text-xs border border-slate-250 bg-white rounded-lg p-2 outline-hidden text-slate-800 focus:border-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 block uppercase tracking-wider">
                      Privacy Policy URL Link
                    </label>
                    <input
                      type="text"
                      value={cookiePrivacyLink}
                      onChange={(e) => setCookiePrivacyLink(e.target.value)}
                      className="w-full text-xs font-mono border border-slate-250 bg-white rounded-lg p-2.5 outline-hidden text-slate-800 focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-3.5 text-[11px] leading-relaxed text-emerald-950 font-sans space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[9.5px] block text-emerald-800 flex items-center gap-1">
                    <ShieldAlert className="h-3.5 w-3.5 text-emerald-600" />
                    How LocalStorage Guard Functions
                  </span>
                  <p>
                    The sliding container includes standard IIFE (Immediately Invoked Function Expression) scripts. It checks the browser's <code>localStorage</code> database instantly on load.
                  </p>
                  <p className="font-medium mt-1">
                    Once clicked, it locks status choices in place to completely eliminate subsequent banner display flicker on refreshes.
                  </p>
                </div>
              </div>
            </div>

            {/* LIVE PREVIEW & CODE EXPORT SECTION */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* BEAUTIFUL MOCK SCREEN SIMULATION */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Live Visual Preview</span>
                  <span className="bg-emerald-50 text-emerald-700 text-[8.5px] font-black uppercase px-2 py-0.5 rounded">Desktop Sandbox View</span>
                </div>

                {/* Simulated Portal Page Structure */}
                <div className="border border-slate-150 rounded-xl overflow-hidden bg-slate-50 text-[11px] relative min-h-[220px] flex flex-col justify-between">
                  
                  {/* Mock Nav Header */}
                  <div className="bg-slate-900 p-3 flex justify-between items-center text-white/95">
                    <span className="font-black tracking-wide text-xs">WILTSHIRE PORTAL</span>
                    <div className="flex gap-2 text-[9px] uppercase font-bold text-slate-400">
                      <span>Speed Test</span>
                      <span>Alt-nets</span>
                    </div>
                  </div>

                  {/* Body wireframe content */}
                  <div className="p-4 flex-grow space-y-2 text-left bg-white">
                    <div className="h-4 w-1/3 bg-slate-100 rounded-lg font-bold" />
                    <div className="h-3.5 w-5/6 bg-slate-50 rounded-md" />
                    <div className="h-3.5 w-2/3 bg-slate-50 rounded-md" />
                    <div className="h-3.5 w-1/2 bg-slate-50 rounded-md" />
                  </div>

                  {/* CUSTOM PREVIEW COMPONENT OVERLAY */}
                  <div 
                    className="border-t border-slate-200 bg-white p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md relative z-10 bottom-0 left-0 right-0 animate-slideUp"
                  >
                    <div className="flex items-start gap-2 text-left">
                      <div className="p-1 px-1.5 bg-emerald-50 text-emerald-600 rounded-full shrink-0">
                        <Cookie className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h4 className="text-[11.5px] font-extrabold text-slate-900 leading-tight">
                          {cookieTitle}
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5 max-w-sm">
                          {cookieDesc} <a href={cookiePrivacyLink} className="font-semibold underline" style={{ color: cookieBrandColor }}>Cookie Policy</a>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto shrink-0 mt-1 sm:mt-0">
                      <button 
                        className="flex-1 sm:flex-none px-3 py-1.5 bg-slate-105 hover:bg-slate-205 text-slate-700 font-bold rounded-lg text-[10px] transition-colors"
                        onClick={() => alert("Cookie Decline simulated in preview! (In production this closes the banner and disables tracking script execution.)")}
                      >
                        {cookieDeclineLabel}
                      </button>
                      <button 
                        className="flex-1 sm:flex-none px-3.5 py-1.5 text-white font-bold rounded-lg text-[10px] transition-all"
                        style={{ backgroundColor: cookieBrandColor }}
                        onClick={() => alert("Cookie Accept simulated in preview! (In production this stores consent status and enables monetization script injections.)")}
                      >
                        {cookieAcceptLabel}
                      </button>
                    </div>
                  </div>

                </div>

                <p className="text-[10px] text-slate-500 text-center">
                  *Drag selectors on the left config panel to update the rendering accent and testing descriptions instantly.
                </p>
              </div>

              {/* EXPORT CODE BLOCK */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold tracking-wider text-slate-400">
                  <span className="uppercase">Generated Drag-And-Drop Cookie Snippet</span>
                  <button
                    onClick={() => handleCopy(getCookieBannerCode(), "cookiebanner")}
                    className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold transition-colors cursor-pointer"
                  >
                    {copiedText === "cookiebanner" ? (
                      <span className="text-emerald-500 font-extrabold flex items-center gap-0.5 animate-pulse">
                        <Check className="h-3.5 w-3.5" /> Copied To Clipboard!
                      </span>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Code Block
                      </>
                    )}
                  </button>
                </div>
                
                <div className="relative">
                  <div className="bg-slate-900 rounded-xl p-4 text-[10px] font-mono text-slate-300 border border-slate-850 overflow-x-auto select-all leading-relaxed whitespace-pre max-h-[300px] overflow-y-auto">
                    {getCookieBannerCode()}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 flex bg-slate-950/85 rounded px-2.5 py-1 select-none text-[8px] uppercase tracking-widest text-emerald-400 font-extrabold font-mono">
                    Slide-Up Script Protected
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
export default AdIntegrationHub;
