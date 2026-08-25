"use client";

import React from "react";
import type { LoaderContent } from "@/lib/content/types";

interface LuxuryLoaderProps {
  label?: string;
  sublabel?: string;
  fullScreen?: boolean;
  config?: LoaderContent;
}

export default function LuxuryLoader({
  label,
  sublabel,
  fullScreen = true,
  config,
}: LuxuryLoaderProps) {
  const isDark = config?.tema === "dark";
  const finalTitle = label !== undefined ? label : (config?.baslik || "");
  const finalSub = sublabel !== undefined ? sublabel : (config?.sublabel || "");
  const logoSize = Number(config?.logoBoyut || 108);
  const ringSize = logoSize + 54;
  const brassColor = config?.halkaRenk || "#D9A441";
  const bgColor = config?.arkaplanRenk || (isDark ? "#090C08" : "#FFFFFF");
  const textColor = config?.yaziRenk || (isDark ? "#FFFFFF" : "#0D0F0A");
  const subColor = isDark ? "#A8B0A2" : "#6A6556";
  const showCorners = config?.koseSusleri !== false;
  const hasText = Boolean(finalTitle.trim() || finalSub.trim());

  return (
    <div
      className={
        fullScreen
          ? "luxury-loader-fullscreen"
          : "luxury-loader-inline"
      }
      style={{
        backgroundColor: bgColor,
        background: isDark
          ? `radial-gradient(circle at 50% 50%, rgba(217, 164, 65, 0.12) 0%, rgba(9, 12, 8, 0.98) 65%, ${bgColor} 100%)`
          : `radial-gradient(circle at 50% 50%, rgba(217, 164, 65, 0.09) 0%, rgba(255, 255, 255, 0.98) 55%, ${bgColor} 100%)`,
      }}
      role="status"
      aria-live="polite"
      aria-label="Petra Yükleniyor"
    >
      <style>{`
        .luxury-loader-fullscreen {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          padding: 24px;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .luxury-loader-inline {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 48px 24px;
          min-height: 44vh;
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .luxury-corner {
          position: absolute;
          width: 28px;
          height: 28px;
          opacity: 0.5;
          pointer-events: none;
        }
        .luxury-corner-tl { top: 22px; left: 22px; border-top: 1.5px solid ${brassColor}; border-left: 1.5px solid ${brassColor}; }
        .luxury-corner-tr { top: 22px; right: 22px; border-top: 1.5px solid ${brassColor}; border-right: 1.5px solid ${brassColor}; }
        .luxury-corner-bl { bottom: 22px; left: 22px; border-bottom: 1.5px solid ${brassColor}; border-left: 1.5px solid ${brassColor}; }
        .luxury-corner-br { bottom: 22px; right: 22px; border-bottom: 1.5px solid ${brassColor}; border-right: 1.5px solid ${brassColor}; }
        
        .luxury-loader-bg-glow {
          position: absolute;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(217, 164, 65, 0.2) 0%, rgba(124, 139, 79, 0.06) 45%, transparent 70%);
          pointer-events: none;
          animation: pulseWarmGlow 3s ease-in-out infinite alternate;
        }
        .luxury-loader-ring-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .luxury-loader-ring-outer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(217, 164, 65, 0.15);
          border-top-color: ${brassColor};
          border-right-color: rgba(217, 164, 65, 0.7);
          animation: ringSpinClockwise 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          box-shadow: 0 0 24px rgba(217, 164, 65, 0.35);
        }
        .luxury-loader-ring-inner {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1.5px dashed rgba(124, 139, 79, 0.45);
          animation: ringSpinCounter 2.2s linear infinite;
        }
        .luxury-loader-logo-wrap {
          border-radius: 50%;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          animation: logoFloatBreathe 2.4s ease-in-out infinite;
        }
        .luxury-loader-logo {
          border-radius: 50%;
          object-fit: contain;
          filter: drop-shadow(0 4px 16px rgba(217, 164, 65, 0.35));
        }
        .luxury-loader-text-wrap {
          text-align: center;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .luxury-loader-title {
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(16px, 2.2vw, 20px);
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${textColor};
          margin: 0;
        }
        .luxury-loader-subtitle {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: ${subColor};
          margin: 0;
          text-transform: uppercase;
        }
        @keyframes ringSpinClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ringSpinCounter {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes logoFloatBreathe {
          0%, 100% { transform: scale(0.97); opacity: 0.92; }
          50% { transform: scale(1.03); opacity: 1; filter: drop-shadow(0 6px 22px rgba(217, 164, 65, 0.55)); }
        }
        @keyframes pulseWarmGlow {
          0% { transform: scale(0.88); opacity: 0.5; }
          100% { transform: scale(1.15); opacity: 0.9; }
        }
      `}</style>

      {showCorners && (
        <>
          <div className="luxury-corner luxury-corner-tl" aria-hidden="true" />
          <div className="luxury-corner-tr" aria-hidden="true" />
          <div className="luxury-corner-bl" aria-hidden="true" />
          <div className="luxury-corner-br" aria-hidden="true" />
        </>
      )}

      <div className="luxury-loader-bg-glow" aria-hidden="true" />

      <div
        className="luxury-loader-ring-wrapper"
        style={{ width: ringSize, height: ringSize }}
      >
        <div className="luxury-loader-ring-outer" aria-hidden="true" />
        <div className="luxury-loader-ring-inner" aria-hidden="true" />
        <div
          className="luxury-loader-logo-wrap"
          style={{ width: logoSize, height: logoSize }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/cms/logo.png"
            alt="Petra"
            className="luxury-loader-logo"
            style={{ width: logoSize, height: logoSize }}
          />
        </div>
      </div>

      {hasText && (
        <div className="luxury-loader-text-wrap">
          {finalTitle && <h2 className="luxury-loader-title">{finalTitle}</h2>}
          {finalSub && <p className="luxury-loader-subtitle">{finalSub}</p>}
        </div>
      )}
    </div>
  );
}

