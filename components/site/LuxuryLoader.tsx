"use client";

import React from "react";

interface LuxuryLoaderProps {
  label?: string;
  sublabel?: string;
  fullScreen?: boolean;
}

export default function LuxuryLoader({
  label = "Petra Yaşam Merkezi Hazırlanıyor",
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
          background: #090C08;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 20px;
          overflow: hidden;
        }
        .luxury-loader-inline {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 40px 20px;
          min-height: 45vh;
          width: 100%;
        }
        .luxury-loader-bg-glow {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(217, 164, 65, 0.12) 0%, rgba(124, 139, 79, 0.05) 50%, transparent 70%);
          pointer-events: none;
          animation: pulseGlow 3s ease-in-out infinite alternate;
        }
        .luxury-loader-ring-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .luxury-loader-ring-outer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #D9A441;
          border-right-color: rgba(217, 164, 65, 0.4);
          animation: ringSpinClockwise 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          filter: drop-shadow(0 0 8px rgba(217, 164, 65, 0.5));
        }
        .luxury-loader-ring-inner {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1.5px dashed rgba(232, 184, 75, 0.5);
          animation: ringSpinCounter 2s linear infinite;
        }
        .luxury-loader-logo {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          object-fit: contain;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 0 12px rgba(217, 164, 65, 0.4));
          animation: logoBreathe 2.4s ease-in-out infinite;
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
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #D9A441 0%, #FFF5DC 50%, #D9A441 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shineText 2.5s linear infinite;
          margin: 0;
        }
        .luxury-loader-subtitle {
          font-size: 11px;
          letter-spacing: 0.12em;
          color: #A8B0A2;
          margin: 0;
          text-transform: uppercase;
        }
        .luxury-loader-progress-bar {
          width: 140px;
          height: 2px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
          margin-top: 4px;
        }
        .luxury-loader-progress-line {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 45%;
          background: linear-gradient(90deg, transparent, #D9A441, #FFF5DC, #D9A441, transparent);
          border-radius: 999px;
          animation: progressBeam 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes ringSpinClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ringSpinCounter {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes logoBreathe {
          0%, 100% { transform: scale(0.96); opacity: 0.9; }
          50% { transform: scale(1.04); opacity: 1; filter: drop-shadow(0 0 18px rgba(217, 164, 65, 0.7)); }
        }
        @keyframes pulseGlow {
          0% { transform: scale(0.85); opacity: 0.4; }
          100% { transform: scale(1.15); opacity: 0.8; }
        }
        @keyframes shineText {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes progressBeam {
          0% { left: -50%; width: 30%; }
          50% { width: 60%; }
          100% { left: 120%; width: 30%; }
        }
      `}</style>

      <div className="luxury-loader-bg-glow" aria-hidden="true" />

      <div className="luxury-loader-ring-wrapper">
        <div className="luxury-loader-ring-outer" aria-hidden="true" />
        <div className="luxury-loader-ring-inner" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/cms/logo.png"
          alt="Petra"
          className="luxury-loader-logo"
        />
      </div>

      <div className="luxury-loader-text-wrap">
        <p className="luxury-loader-title">{label}</p>
        {sublabel && <p className="luxury-loader-subtitle">{sublabel}</p>}
        <div className="luxury-loader-progress-bar" aria-hidden="true">
          <div className="luxury-loader-progress-line" />
        </div>
      </div>
    </div>
  );
}
