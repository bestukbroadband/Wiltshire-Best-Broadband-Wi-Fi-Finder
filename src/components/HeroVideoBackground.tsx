/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";

interface HeroVideoBackgroundProps {
  videoUrl?: string;
  posterImage?: string;
  overlayOpacity?: number;
  fallbackGradient?: string;
  reducedMotionFallback?: boolean;
}

export function HeroVideoBackground({
  videoUrl = "/videos/wiltshire-broadband-hero.mp4",
  posterImage = "/images/wiltshire-broadband-poster.jpg",
  overlayOpacity = 0.65,
  fallbackGradient = "from-[#0c101d] via-[#12192c] to-[#04060b]",
  reducedMotionFallback = false
}: HeroVideoBackgroundProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  const shouldShowVideo = !prefersReducedMotion && !reducedMotionFallback && videoUrl;

  useEffect(() => {
    if (shouldShowVideo && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked or failed:", err);
      });
    }
  }, [shouldShowVideo]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true" id="hero-custom-bg">
      {/* Fallback image and gradient layered underneath */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} bg-cover bg-center transition-all duration-1000`}
        style={{
          backgroundImage: posterImage && (prefersReducedMotion || reducedMotionFallback || !videoLoaded) 
            ? `linear-gradient(rgba(12, 16, 29, ${overlayOpacity}), rgba(12, 16, 29, ${overlayOpacity + 0.1})), url(${posterImage})` 
            : undefined
        }}
      />

      {/* Programmatic loop-autoplay playsinline custom video element */}
      {shouldShowVideo && (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterImage}
          muted
          autoPlay
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ 
            opacity: videoLoaded ? 1 - overlayOpacity : 0,
            mixBlendMode: "screen"
          }}
        />
      )}

      {/* Modern overlays for dynamic depth rendering  */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c101d] via-[#0c101d]/60 to-[#0c101d]/90 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-brand-gold/5 to-transparent pointer-events-none" />
    </div>
  );
}

export default HeroVideoBackground;
