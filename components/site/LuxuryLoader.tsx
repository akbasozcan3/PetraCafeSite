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
  const isDark = config ? config.tema !== "light" : true;
  const finalTitle = label || config?.baslik || "PETRA";
  const finalSub = sublabel ?? config?.sublabel ?? "ÇEKMEKÖY · YAŞAM MERKEZİ";
  const logoSize = Number(config?.logoBoyut || 100);
  const ringSize = logoSize + 56;
  const wrapSize = logoSize + 22;
  const brassColor = config?.halkaRenk || "#D9A441";
  const bgColor = config?.arkaplanRenk || (isDark ? "#090C08" : "#FAF7F0");
  const textColor = config?.yaziRenk || (isDark ? "#FFFFFF" : "#1A1D16");
  const subColor = isDark ? "#A8B0A2" : "#7A7466";
  const showCorners = config?.koseSusleri !== false;

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
          ? `radial-gradient(circle at 50% 48%, rgba(217, 164, 65, 0.12) 0%, rgba(9, 12, 8, 0.98) 65%, ${bgColor} 100%)`
          : `radial-gradient(circle at 50% 48%, rgba(217, 164, 65, 0.16) 0%, rgba(250, 247, 240, 0.98) 65%, ${bgColor} 100%)`,
      }}
      role="status"
      aria-live="polite"
      aria-label={finalTitle}
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
          gap: 22px;
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
          gap: 18px;
          padding: 48px 24px;
          min-height: 48vh;
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .luxury-corner {
          position: absolute;
          width: 30px;
          height: 30px;
          opacity: 0.6;
          pointer-events: none;
        }
        .luxury-corner-tl { top: 22px; left: 22px; border-top: 1.5px solid ${brassColor}; border-left: 1.5px solid ${brassColor}; }
        .luxury-corner-tr { top: 22px; right: 22px; border-top: 1.5px solid ${brassColor}; border-right: 1.5px solid ${brassColor}; }
        .luxury-corner-bl { bottom: 22px; left: 22px; border-bottom: 1.5px solid ${brassColor}; border-left: 1.5px solid ${brassColor}; }
        .luxury-corner-br { bottom: 22px; right: 22px; border-bottom: 1.5px solid ${brassColor}; border-right: 1.5px solid ${brassColor}; }
        
        .luxury-loader-bg-glow {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(217, 164, 65, 0.22) 0%, rgba(124, 139, 79, 0.08) 45%, transparent 70%);
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
          border: 2.5px solid rgba(217, 164, 65, 0.18);
          border-top-color: ${brassColor};
          border-right-color: rgba(217, 164, 65, 0.65);
          animation: ringSpinClockwise 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          box-shadow: 0 0 20px rgba(217, 164, 65, 0.35);
        }
        .luxury-loader-ring-inner {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          border: 1.5px dashed rgba(124, 139, 79, 0.5);
          animation: ringSpinCounter 2.2s linear infinite;
        }
        .luxury-loader-logo-wrap {
          border-radius: 50%;
          background: ${isDark ? "#121710" : "#FFFFFF"};
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          box-shadow: 0 12px 32px -4px rgba(217, 164, 65, 0.35), 0 0 0 1.5px rgba(217, 164, 65, 0.25);
          animation: logoFloatBreathe 2.4s ease-in-out infinite;
        }
        .luxury-loader-logo {
          border-radius: 50%;
          object-fit: contain;
        }
        .luxury-loader-text-wrap {
          text-align: center;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .luxury-loader-title {
          font-family: var(--f-head, 'Playfair Display', Georgia, serif);
          font-size: clamp(17px, 2.4vw, 21px);
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${textColor};
          margin: 0;
          position: relative;
        }
        .luxury-loader-subtitle {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: ${subColor};
          margin: 0;
          text-transform: uppercase;
        }
        .luxury-loader-progress-bar {
          width: 160px;
          height: 3px;
          background: ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"};
          border-radius: 999px;
          overflow: hidden;
          position: relative;
          margin-top: 6px;
        }
        .luxury-loader-progress-line {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 45%;
          background: linear-gradient(90deg, transparent, ${brassColor}, #FFF0C8, ${brassColor}, transparent);
          border-radius: 999px;
          animation: progressBeamLight 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          box-shadow: 0 0 10px rgba(217, 164, 65, 0.7);
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
          0%, 100% { transform: scale(0.97); }
          50% { transform: scale(1.03); }
        }
        @keyframes pulseWarmGlow {
          0% { transform: scale(0.88); opacity: 0.5; }
          100% { transform: scale(1.15); opacity: 0.9; }
        }
        @keyframes progressBeamLight {
          0% { left: -50%; width: 30%; }
          50% { width: 55%; }
          100% { left: 120%; width: 30%; }
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
          style={{ width: wrapSize, height: wrapSize }}
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

      <div className="luxury-loader-text-wrap">
        <h2 className="luxury-loader-title">{finalTitle}</h2>
        {finalSub && <p className="luxury-loader-subtitle">{finalSub}</p>}
        <div className="luxury-loader-progress-bar" aria-hidden="true">
          <div className="luxury-loader-progress-line" />
        </div>
      </div>
    </div>
  );
}

