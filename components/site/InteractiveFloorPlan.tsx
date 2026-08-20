"use client";

import { useState, useMemo } from "react";
import {
  RESTAURANT_TABLES,
  TABLE_ZONES,
  RestaurantTable,
  TableZoneId,
} from "@/lib/content/tables-data";

interface InteractiveFloorPlanProps {
  selectedTableId?: string;
  onSelectTable: (table: RestaurantTable | null) => void;
  bookedTableIds?: string[];
  guestsCount?: number;
  date?: string;
  time?: string;
}

export default function InteractiveFloorPlan({
  selectedTableId,
  onSelectTable,
  bookedTableIds = [],
  guestsCount = 2,
  date,
  time,
}: InteractiveFloorPlanProps) {
  const [activeZone, setActiveZone] = useState<"all" | TableZoneId>("all");
  const [hoveredTable, setHoveredTable] = useState<RestaurantTable | null>(null);

  const selectedTable = useMemo(
    () => RESTAURANT_TABLES.find((t) => t.id === selectedTableId) || null,
    [selectedTableId]
  );

  const filteredTables = useMemo(() => {
    if (activeZone === "all") return RESTAURANT_TABLES;
    return RESTAURANT_TABLES.filter((t) => t.zoneId === activeZone);
  }, [activeZone]);

  const isTableAvailable = (t: RestaurantTable) => {
    if (bookedTableIds.includes(t.id)) return false;
    if (guestsCount > t.capacity) return false;
    return true;
  };

  const getTableStatus = (t: RestaurantTable) => {
    if (t.id === selectedTableId) return "selected";
    if (bookedTableIds.includes(t.id)) return "booked";
    if (guestsCount > t.capacity) return "capacity_exceeded";
    return "available";
  };

  const handleTableClick = (t: RestaurantTable) => {
    const status = getTableStatus(t);
    if (status === "booked" || status === "capacity_exceeded") return;
    if (t.id === selectedTableId) {
      onSelectTable(null); // Tekrar tıklanırsa seçimi kaldır
    } else {
      onSelectTable(t);
    }
  };

  return (
    <div className="floor-plan-wrapper bg-[#12150E] border border-white/10 rounded-2xl p-4 sm:p-6 text-[#F4EEE1] shadow-2xl">
      {/* Üst Başlık & Açıklama */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#D9A441] animate-pulse" />
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#F4EEE1] tracking-wide">
              Havuz Başı & Loca Planı
            </h3>
          </div>
          <p className="text-xs text-[#6E6A5C] mt-0.5">
            {date && time
              ? `${date} saat ${time} için yerleşim planı (${guestsCount} Kişi)`
              : "Lütfen rezervasyon yapmak istediğiniz masaya veya locaya tıklayın."}
          </p>
        </div>

        {/* Bölge Filtreleri */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveZone("all")}
            className={`px-3 py-1 text-xs rounded-full font-medium transition ${
              activeZone === "all"
                ? "bg-[#D9A441] text-[#0D0F0A] font-semibold shadow-md"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            Tüm Masalar ({RESTAURANT_TABLES.length})
          </button>
          {TABLE_ZONES.map((z) => {
            const count = RESTAURANT_TABLES.filter((t) => t.zoneId === z.id).length;
            return (
              <button
                key={z.id}
                type="button"
                onClick={() => setActiveZone(z.id)}
                className={`px-3 py-1 text-xs rounded-full font-medium transition ${
                  activeZone === z.id
                    ? "bg-[#D9A441] text-[#0D0F0A] font-semibold shadow-md"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {z.name.split(" ")[0]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Lejant (Masa Durum Açıklamaları) */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-3 my-2 text-xs border-b border-white/5 text-white/70">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-[#22c55e] bg-[#22c55e]/20" />
          <span>Uygun Masa</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-[#D9A441] bg-[#D9A441] shadow-[0_0_8px_#d9a441]" />
          <span className="text-[#D9A441] font-semibold">Seçili Masanız</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-red-500/80 bg-red-500/20" />
          <span className="text-white/40">Dolu / Rezerve</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full border border-dashed border-amber-500/60 bg-amber-500/10" />
          <span className="text-amber-200/60">Kapasite Yetersiz</span>
        </div>
      </div>

      {/* İnteraktif Kroki Alanı */}
      <div className="relative w-full max-w-[720px] mx-auto my-3 overflow-hidden rounded-xl bg-[#0B0D08] border border-white/10 shadow-inner group">
        {/* Alt Katman: Gerçek Petra Havuz Krokisi */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/img/havuz-kroki.jpg"
          alt="Petra Havuz Yerleşim Planı"
          className="w-full h-auto block select-none pointer-events-none opacity-90 transition-opacity duration-300 group-hover:opacity-95"
        />

        {/* Üst Katman: İnteraktif SVG */}
        <svg
          viewBox="0 0 1000 1300"
          className="absolute inset-0 w-full h-full cursor-default"
        >
          <defs>
            <radialGradient id="selectedGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d9a441" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#b8842c" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#d9a441" stopOpacity="0.4" />
            </radialGradient>
            <radialGradient id="availableGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
              <stop offset="80%" stopColor="#22c55e" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </radialGradient>
            <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#d9a441" floodOpacity="0.8" />
            </filter>
          </defs>

          {RESTAURANT_TABLES.map((t) => {
            const status = getTableStatus(t);
            const isHovered = hoveredTable?.id === t.id;
            const isSelected = t.id === selectedTableId;
            const isDimmed = activeZone !== "all" && t.zoneId !== activeZone;

            // Renk ve stil hesaplamaları
            let fillColor = "rgba(34, 197, 94, 0.15)";
            let strokeColor = "#22c55e";
            let strokeWidth = 3;
            let cursor = "pointer";

            if (isSelected) {
              fillColor = "url(#selectedGlow)";
              strokeColor = "#F4EEE1";
              strokeWidth = 4;
            } else if (status === "booked") {
              fillColor = "rgba(239, 68, 68, 0.35)";
              strokeColor = "#ef4444";
              strokeWidth = 2;
              cursor = "not-allowed";
            } else if (status === "capacity_exceeded") {
              fillColor = "rgba(245, 158, 11, 0.15)";
              strokeColor = "rgba(245, 158, 11, 0.6)";
              strokeWidth = 2;
              cursor = "not-allowed";
            } else if (isHovered) {
              fillColor = "rgba(217, 164, 65, 0.35)";
              strokeColor = "#D9A441";
              strokeWidth = 4;
            }

            const opacity = isDimmed ? 0.25 : 1;

            return (
              <g
                key={t.id}
                onClick={() => handleTableClick(t)}
                onMouseEnter={() => setHoveredTable(t)}
                onMouseLeave={() => setHoveredTable(null)}
                style={{ cursor, opacity, transition: "all 0.2s ease" }}
                filter={isSelected ? "url(#goldShadow)" : undefined}
                className="group/table"
              >
                {/* Masa Yuvarlak Geometrisi */}
                <circle
                  cx={t.cx}
                  cy={t.cy}
                  r={t.r}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={status === "capacity_exceeded" ? "4 3" : undefined}
                />

                {/* Masa Numarası / Rozeti */}
                <text
                  x={t.cx}
                  y={(t.cy || 0) - 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isSelected ? "#0D0F0A" : "#FFFFFF"}
                  fontSize={t.isVip ? "14" : "13"}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  style={{
                    pointerEvents: "none",
                    textShadow: isSelected ? "none" : "0 1px 4px rgba(0,0,0,0.9)",
                  }}
                >
                  {t.tableNumber}
                </text>

                {/* Kapasite bilgisi */}
                <text
                  x={t.cx}
                  y={(t.cy || 0) + 14}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isSelected ? "#1F2416" : "rgba(255,255,255,0.75)"}
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="sans-serif"
                  style={{ pointerEvents: "none" }}
                >
                  {t.capacity} Kişilik
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Bilgi Kartı */}
        {hoveredTable ? (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:bottom-3 sm:max-w-xs bg-[#16190F]/95 backdrop-blur-md border border-[#D9A441]/40 rounded-xl p-3 shadow-2xl text-xs z-20 pointer-events-none transition-all">
            <div className="flex items-center justify-between gap-2">
              <p className="font-serif font-bold text-sm text-[#D9A441]">
                {hoveredTable.name}
              </p>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/80 font-medium">
                Maks. {hoveredTable.capacity} Kişi
              </span>
            </div>
            <p className="text-white/70 text-[11px] mt-1">
              {hoveredTable.description}
            </p>
            <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-semibold">
                {getTableStatus(hoveredTable) === "selected" && (
                  <span className="text-[#D9A441]">★ Şu Anki Seçiminiz</span>
                )}
                {getTableStatus(hoveredTable) === "booked" && (
                  <span className="text-red-400">✗ Dolu / Rezerve</span>
                )}
                {getTableStatus(hoveredTable) === "capacity_exceeded" && (
                  <span className="text-amber-300">⚠️ Kişi sayısı fazla</span>
                )}
                {getTableStatus(hoveredTable) === "available" && (
                  <span className="text-emerald-400">✓ Seçmek İçin Tıklayın</span>
                )}
              </span>
            </div>
          </div>
        ) : null}
      </div>

      {/* Alt Seçim Onay Paneli & Masa Listesi */}
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {selectedTable ? (
          <div className="flex items-center gap-3 bg-[#D9A441]/10 border border-[#D9A441]/30 rounded-xl p-3 sm:p-4 flex-1">
            <div className="w-10 h-10 rounded-full bg-[#D9A441] text-[#0D0F0A] flex items-center justify-center font-bold text-base flex-shrink-0 shadow-md">
              🪑
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm sm:text-base text-[#F4EEE1]">
                  {selectedTable.name}
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#D9A441]/20 text-[#D9A441] font-bold">
                  SEÇİLDİ
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                {selectedTable.zoneName} · {selectedTable.capacity} Kişilik Kapasite
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectTable(null)}
              className="text-xs text-red-400 hover:text-red-300 underline font-medium px-2 py-1"
            >
              Masa Seçimini Kaldır
            </button>
          </div>
        ) : (
          <div className="text-xs text-white/60 flex items-center gap-2 bg-white/5 rounded-xl p-3 flex-1">
            <span className="text-base">ℹ️</span>
            <span>
              Kroki üzerindeki yeşil masalardan dilediğinizi seçebilirsiniz veya masa seçmeden devam edebilirsiniz.
            </span>
          </div>
        )}
      </div>

      {/* Hızlı Masa Kartları (Alternatif Buton Seçimi) */}
      <div className="mt-4 pt-3 border-t border-white/5">
        <p className="text-xs text-white/50 mb-2 font-medium">Hızlı Liste Seçimi:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-44 overflow-y-auto pr-1">
          {filteredTables.map((t) => {
            const status = getTableStatus(t);
            const isSelected = t.id === selectedTableId;
            const disabled = status === "booked" || status === "capacity_exceeded";

            return (
              <button
                key={t.id}
                type="button"
                disabled={disabled}
                onClick={() => handleTableClick(t)}
                className={`text-left p-2 rounded-lg border text-xs transition ${
                  isSelected
                    ? "bg-[#D9A441] text-[#0D0F0A] border-[#D9A441] font-bold shadow-md scale-[1.02]"
                    : disabled
                      ? "bg-white/[0.02] border-white/5 text-white/30 cursor-not-allowed opacity-50"
                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{t.tableNumber}</span>
                  <span className="text-[10px] opacity-75">{t.capacity}k</span>
                </div>
                <div className="text-[10px] opacity-60 truncate mt-0.5">
                  {status === "booked" ? "Dolu" : t.zoneName.split(" ")[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}