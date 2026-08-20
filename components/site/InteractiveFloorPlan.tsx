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
}: InteractiveFloorPlanProps) {
  const [activeZone, setActiveZone] = useState<"all" | TableZoneId>("all");
  const [hoveredTable, setHoveredTable] = useState<RestaurantTable | null>(null);

  const filteredTables = useMemo(() => {
    if (activeZone === "all") return RESTAURANT_TABLES;
    return RESTAURANT_TABLES.filter((t) => t.zoneId === activeZone);
  }, [activeZone]);

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
      onSelectTable(null);
    } else {
      onSelectTable(t);
    }
  };

  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      {/* Bölge Seçim Butonları */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          overflowX: "auto",
          paddingBottom: 8,
          marginBottom: 8,
        }}
      >
        <button
          type="button"
          onClick={() => setActiveZone("all")}
          style={{
            padding: "4px 10px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            background: activeZone === "all" ? "#d9a441" : "rgba(255,255,255,0.1)",
            color: activeZone === "all" ? "#0d0f0a" : "rgba(255,255,255,0.8)",
            whiteSpace: "nowrap",
          }}
        >
          Tümü ({RESTAURANT_TABLES.length})
        </button>
        {TABLE_ZONES.map((z) => {
          const count = RESTAURANT_TABLES.filter((t) => t.zoneId === z.id).length;
          const isSelected = activeZone === z.id;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => setActiveZone(z.id)}
              style={{
                padding: "4px 10px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                background: isSelected ? "#d9a441" : "rgba(255,255,255,0.1)",
                color: isSelected ? "#0d0f0a" : "rgba(255,255,255,0.8)",
                whiteSpace: "nowrap",
              }}
            >
              {z.name.split(" ")[0]} ({count})
            </button>
          );
        })}
      </div>

      {/* Lejant (Durumlar) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          fontSize: 11,
          color: "rgba(255,255,255,0.75)",
          marginBottom: 10,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} /> Uygun
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d9a441" }} /> Seçili
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} /> Dolu
        </span>
      </div>

      {/* İnteraktif Kroki Alanı (Kompakt ve Orantılı) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxHeight: "340px",
          overflowY: "auto",
          overflowX: "hidden",
          borderRadius: 14,
          background: "#ffffff",
          border: "2px solid #d9a441",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        }}
      >
        <svg
          viewBox="0 0 651 868"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        >
          <defs>
            <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#d9a441" floodOpacity="1" />
            </filter>
            <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22c55e" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* 1. KATMAN: Orijinal Havuz Krokisi Görseli */}
          <image
            href="/assets/img/havuz-kroki.png"
            x="0"
            y="0"
            width="651"
            height="868"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* 2. KATMAN: Masalar Üzerinde İnteraktif Hotspot Daireleri (🟢 Yeşil, 🔴 Kırmızı, 🟡 Sarı) */}
          {RESTAURANT_TABLES.map((t) => {
            const status = getTableStatus(t);
            const isHovered = hoveredTable?.id === t.id;
            const isSelected = t.id === selectedTableId;
            const isDimmed = activeZone !== "all" && t.zoneId !== activeZone;

            // Renk ve stil mantığı (🟢 🔴 🟡)
            let fillColor = "rgba(34, 197, 94, 0.4)";
            let strokeColor = "#16a34a";
            let strokeWidth = 3.5;
            let filter: string | undefined = "url(#greenGlow)";
            let cursor = "pointer";

            if (isSelected) {
              // 🟡 Seçili Masa (Altın Sarı & Güçlü Glow)
              fillColor = "rgba(217, 164, 65, 0.85)";
              strokeColor = "#b8842c";
              strokeWidth = 5;
              filter = "url(#goldGlow)";
            } else if (status === "booked") {
              // 🔴 Dolu Masa (Kırmızı)
              fillColor = "rgba(239, 68, 68, 0.65)";
              strokeColor = "#dc2626";
              strokeWidth = 3;
              filter = undefined;
              cursor = "not-allowed";
            } else if (status === "capacity_exceeded") {
              fillColor = "rgba(245, 158, 11, 0.3)";
              strokeColor = "rgba(245, 158, 11, 0.8)";
              strokeWidth = 2.5;
              filter = undefined;
              cursor = "not-allowed";
            } else if (isHovered) {
              fillColor = "rgba(34, 197, 94, 0.65)";
              strokeColor = "#15803d";
              strokeWidth = 4.5;
              filter = "url(#greenGlow)";
            }

            const opacity = isDimmed ? 0.2 : 1;

            return (
              <g
                key={t.id}
                onClick={() => handleTableClick(t)}
                onMouseEnter={() => setHoveredTable(t)}
                onMouseLeave={() => setHoveredTable(null)}
                style={{ cursor, opacity, transition: "all 0.15s ease" }}
                filter={filter ? filter : undefined}
              >
                {/* Hotspot Çemberi */}
                <circle
                  cx={t.cx}
                  cy={t.cy}
                  r={t.r}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />

                {/* Masa Numarası / Metni */}
                <text
                  x={t.cx}
                  y={(t.cy || 0) - 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isSelected ? "#0d0f0a" : "#ffffff"}
                  fontSize={t.isVip ? "14" : "12"}
                  fontWeight="900"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  style={{
                    pointerEvents: "none",
                    textShadow: isSelected ? "none" : "0 1px 3px rgba(0,0,0,0.8)",
                  }}
                >
                  {t.tableNumber}
                </text>

                {/* Kapasite */}
                <text
                  x={t.cx}
                  y={(t.cy || 0) + 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isSelected ? "#12150e" : "rgba(255,255,255,0.95)"}
                  fontSize="10"
                  fontWeight="700"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  style={{
                    pointerEvents: "none",
                    textShadow: isSelected ? "none" : "0 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  {t.capacity}k
                </text>
              </g>
            );
          })}
        </svg>
      </div>


      {/* Hover Kartı / Seçim İpucu */}
      {hoveredTable && (
        <div
          style={{
            marginTop: 6,
            padding: "6px 10px",
            borderRadius: 8,
            background: "rgba(217, 164, 65, 0.15)",
            border: "1px solid rgba(217, 164, 65, 0.3)",
            fontSize: 11,
            color: "#f4eee1",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontWeight: 700, color: "#d9a441" }}>{hoveredTable.name}</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{hoveredTable.zoneName} · {hoveredTable.capacity} Kişilik</span>
        </div>
      )}

      {/* Kompakt Hızlı Masa Butonları (Grid) */}
      <div style={{ marginTop: 10 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)", margin: "0 0 6px" }}>
          Hızlı Seçim Listesi:
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 5,
            maxHeight: 110,
            overflowY: "auto",
            paddingRight: 2,
          }}
        >
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
                style={{
                  padding: "6px 4px",
                  borderRadius: 8,
                  border: isSelected
                    ? "1px solid #d9a441"
                    : disabled
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "1px solid rgba(255,255,255,0.15)",
                  background: isSelected
                    ? "#d9a441"
                    : disabled
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.08)",
                  color: isSelected
                    ? "#0d0f0a"
                    : disabled
                    ? "rgba(255,255,255,0.25)"
                    : "#f4eee1",
                  fontSize: 11,
                  fontWeight: isSelected ? 700 : 500,
                  cursor: disabled ? "not-allowed" : "pointer",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                <div>{t.tableNumber}</div>
                <div style={{ fontSize: 9, opacity: 0.75 }}>{t.capacity}k</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}