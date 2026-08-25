"use client";

import React from "react";

interface LuxuryLoaderProps {
  label?: string;
  sublabel?: string;
  fullScreen?: boolean;
}

export default function LuxuryLoader({
  label = "Petra Yaşam Merkezi",
  sublabel = "Cafe · Restaurant · Pool & Beach · Spor Salonu",
  fullScreen = true,
}: LuxuryLoaderProps) {
  return (
    <div
      className={
        fullScreen
          ? "luxury-loader-fullscreen"
          : "luxury-loader-inline"
      }
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <style>{`
        .luxury-loader-fullscreen {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #FAF7F0;
          background: radial-gradient(circle at 50% 48%, rgba(217, 164, 65, 0.15) 0%, rgba(250, 247, 240, 0.98) 65%, #FAF7F0 100%);
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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          padding: 48px 24px;
          min-height: 48vh;
          width: 100%;
          background: #FAF7F0;
          border-radius: 24px;
        }
        .luxury-corner {
          position: absolute;
          width: 28px;
          height: 28px;
          opacity: 0.55;
          pointer-events: none;
        }
        .luxury-corner-tl { top: 22px; left: 22px; border-top: 1.5px solid #D9A441; border-left: 1.5px solid #D9A441; }
        .luxury-corner-tr { top: 22px; right: 22px; border-top: 1.5px solid #D9A441; border-right: 1.5px solid #D9A441; }
        .luxury-corner-bl { bottom: 22px; left: 22px; border-bottom: 1.5px solid #D9A441; border-left: 1.5px solid #D9A441; }
        .luxury-corner-br { bottom: 22px; right: 22px; border-bottom: 1.5px solid #D9A441; border-right: 1.5px solid #D9A441; }
        
        .luxury-loader-bg-glow {
          position: absolute;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(217, 164, 65, 0.22) 0%, rgba(124, 139, 79, 0.08) 45%, transparent 70%);
          pointer-events: none;
          animation: pulseWarmGlow 3s ease-in-out infinite alternate;
        }
        .luxury-loader-ring-wrapper {
          position: relative;
          width: 108px;
          height: 108px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .luxury-loader-ring-outer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2.5px solid rgba(217, 164, 65, 0.18);
          border-top-color: #D9A441;
          border-right-color: rgba(217, 164, 65, 0.6);
          animation: ringSpinClockwise 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          box-shadow: 0 0 16px rgba(217, 164, 65, 0.3);
        }
        .luxury-loader-ring-inner {
          position: absolute;
          inset: 9px;
          border-radius: 50%;
          border: 1.5px dashed rgba(124, 139, 79, 0.45);
          animation: ringSpinCounter 2.2s linear infinite;
        }
        .luxury-loader-logo-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          box-shadow: 0 10px 28px -4px rgba(217, 164, 65, 0.28), 0 0 0 1px rgba(217, 164, 65, 0.2);
          animation: logoFloatBreathe 2.4s ease-in-out infinite;
        }
        .luxury-loader-logo {
          width: 48px;
          height: 48px;
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
          font-size: clamp(16px, 2.2vw, 19px);
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #1A1D16;
          margin: 0;
          position: relative;
        }
        .luxury-loader-subtitle {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: #7A7466;
          margin: 0;
          text-transform: uppercase;
        }
        .luxury-loader-progress-bar {
          width: 150px;
          height: 3px;
          background: rgba(0, 0, 0, 0.06);
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
          background: linear-gradient(90deg, transparent, #D9A441, #B3862A, #D9A441, transparent);
          border-radius: 999px;
          animation: progressBeamLight 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          box-shadow: 0 0 8px rgba(217, 164, 65, 0.6);
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
          0%, 100% { transform: scale(0.96); box-shadow: 0 8px 20px -4px rgba(217, 164, 65, 0.2); }
          50% { transform: scale(1.03); box-shadow: 0 14px 34px -2px rgba(217, 164, 65, 0.4); }
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

      {fullScreen && (
        <>
          <div className="luxury-corner luxury-corner-tl" aria-hidden="true" />
          <div className="luxury-corner-tr" aria-hidden="true" />
          <div className="luxury-corner-bl" aria-hidden="true" />
          <div className="luxury-corner-br" aria-hidden="true" />
        </>
      )}

      <div className="luxury-loader-bg-glow" aria-hidden="true" />

      <div className="luxury-loader-ring-wrapper">
        <div className="luxury-loader-ring-outer" aria-hidden="true" />
        <div className="luxury-loader-ring-inner" aria-hidden="true" />
        <div className="luxury-loader-logo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/cms/logo.png"
            alt="Petra"
            className="luxury-loader-logo"
          />
        </div>
      </div>

      <div className="luxury-loader-text-wrap">
        <h2 className="luxury-loader-title">{label}</h2>
        {sublabel && <p className="luxury-loader-subtitle">{sublabel}</p>}
        <div className="luxury-loader-progress-bar" aria-hidden="true">
          <div className="luxury-loader-progress-line" />
        </div>
      </div>
    </div>
  );
}
