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
          maxHeight: "260px",
          overflowY: "auto",
          overflowX: "hidden",
          borderRadius: 12,
          background: "#080a06",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/havuz-kroki.jpg"
            alt="Petra Kroki"
            style={{ width: "100%", height: "auto", display: "block", opacity: 0.85 }}
          />

          {/* İnteraktif SVG Katmanı */}
          <svg
            viewBox="0 0 651 868"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <defs>
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#d9a441" floodOpacity="0.9" />
              </filter>
            </defs>

            {RESTAURANT_TABLES.map((t) => {
              const status = getTableStatus(t);
              const isHovered = hoveredTable?.id === t.id;
              const isSelected = t.id === selectedTableId;
              const isDimmed = activeZone !== "all" && t.zoneId !== activeZone;

              let fillColor = "rgba(34, 197, 94, 0.25)";
              let strokeColor = "#22c55e";
              let strokeWidth = 3;
              let cursor = "pointer";

              if (isSelected) {
                fillColor = "#d9a441";
                strokeColor = "#ffffff";
                strokeWidth = 5;
              } else if (status === "booked") {
                fillColor = "rgba(239, 68, 68, 0.4)";
                strokeColor = "#ef4444";
                strokeWidth = 2;
                cursor = "not-allowed";
              } else if (status === "capacity_exceeded") {
                fillColor = "rgba(245, 158, 11, 0.2)";
                strokeColor = "rgba(245, 158, 11, 0.6)";
                strokeWidth = 2;
                cursor = "not-allowed";
              } else if (isHovered) {
                fillColor = "rgba(217, 164, 65, 0.4)";
                strokeColor = "#d9a441";
                strokeWidth = 4;
              }

              const opacity = isDimmed ? 0.2 : 1;

              return (
                <g
                  key={t.id}
                  onClick={() => handleTableClick(t)}
                  onMouseEnter={() => setHoveredTable(t)}
                  onMouseLeave={() => setHoveredTable(null)}
                  style={{ cursor, opacity, transition: "all 0.15s ease" }}
                  filter={isSelected ? "url(#goldGlow)" : undefined}
                >
                  <circle
                    cx={t.cx}
                    cy={t.cy}
                    r={t.r}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={status === "capacity_exceeded" ? "5 3" : undefined}
                  />
                  <text
                    x={t.cx}
                    y={(t.cy || 0) - 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isSelected ? "#0d0f0a" : "#ffffff"}
                    fontSize={t.isVip ? "18" : "16"}
                    fontWeight="bold"
                    fontFamily="system-ui, sans-serif"
                    style={{ pointerEvents: "none" }}
                  >
                    {t.tableNumber}
                  </text>
                  <text
                    x={t.cx}
                    y={(t.cy || 0) + 16}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isSelected ? "#12150e" : "rgba(255,255,255,0.8)"}
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="system-ui, sans-serif"
                    style={{ pointerEvents: "none" }}
                  >
                    {t.capacity}k
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
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