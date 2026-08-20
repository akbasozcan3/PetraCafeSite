"use client";

import { useState, useMemo, useEffect } from "react";

import {
  RESTAURANT_TABLES,
  TABLE_ZONES,
  RestaurantTable,
  TableZoneId,
} from "@/lib/content/tables-data";
import { Check, Sparkles, AlertCircle } from "lucide-react";

interface InteractiveFloorPlanProps {
  selectedTableId?: string;
  onSelectTable: (table: RestaurantTable | null) => void;
  bookedTableIds?: string[];
  guestsCount?: number;
}

export default function InteractiveFloorPlan({
  selectedTableId,
  onSelectTable,
  bookedTableIds = [],
  guestsCount = 2,
}: InteractiveFloorPlanProps) {
  const [tables, setTables] = useState<RestaurantTable[]>(RESTAURANT_TABLES);
  const [activeZone, setActiveZone] = useState<"all" | TableZoneId>("all");
  const [hoveredTable, setHoveredTable] = useState<RestaurantTable | null>(null);

  // Veritabanı / Admin tarafından güncellenen güncel masa verilerini yükle
  useEffect(() => {
    let active = true;
    fetch("/api/v1/tables")
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (Array.isArray(d?.tables) && d.tables.length > 0) {
          setTables(d.tables);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const selectedTable = useMemo(
    () => tables.find((t) => t.id === selectedTableId) || null,
    [tables, selectedTableId]
  );

  const filteredTables = useMemo(() => {
    if (activeZone === "all") return tables;
    return tables.filter((t) => t.zoneId === activeZone);
  }, [tables, activeZone]);


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
      {/* 1. Üst Filtre Sekmeleri (Lüks Krem & Altın Butonlar) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          overflowX: "auto",
          paddingBottom: 4,
          marginBottom: 10,
        }}
      >
        <button
          type="button"
          onClick={() => setActiveZone("all")}
          style={{
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            border: activeZone === "all" ? "1px solid #b8842c" : "1px solid rgba(13,15,10,0.12)",
            cursor: "pointer",
            background: activeZone === "all" ? "#12150e" : "#f6f1e6",
            color: activeZone === "all" ? "#f4eee1" : "#0d0f0a",
            whiteSpace: "nowrap",
            transition: "all 0.2s ease",
          }}
        >
          Tüm Masalar ({tables.length})
        </button>
        {TABLE_ZONES.map((z) => {
          const count = tables.filter((t) => t.zoneId === z.id).length;
          const isSelected = activeZone === z.id;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => setActiveZone(z.id)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                border: isSelected ? "1px solid #b8842c" : "1px solid rgba(13,15,10,0.12)",
                cursor: "pointer",
                background: isSelected ? "#12150e" : "#f6f1e6",
                color: isSelected ? "#f4eee1" : "#0d0f0a",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              {z.name.split(" ")[0]} ({count})
            </button>
          );
        })}
      </div>

      {/* 2. Lejant (Durum Göstergeleri) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          fontSize: 11,
          fontWeight: 600,
          color: "#6e6a5c",
          marginBottom: 10,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 6px #22c55e" }} />
          Müsait Masa
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#b8842c" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#d9a441", boxShadow: "0 0 8px #d9a441" }} />
          Seçtiğiniz Masa
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#9ca3af" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
          Dolu
        </span>
      </div>

      {/* 3. İnteraktif Kroki Alanı (Beyaz Zemin, Altın Çerçeve, Tam Görünüm) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: 16,
          overflow: "hidden",
          background: "#ffffff",
          border: "1.5px solid rgba(184, 132, 44, 0.35)",
          boxShadow: "0 6px 20px -6px rgba(0,0,0,0.12)",
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
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#d9a441" floodOpacity="1" />
            </filter>
            <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#16a34a" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Orijinal Havuz Krokisi */}
          <image
            href="/assets/img/havuz-kroki.png"
            x="0"
            y="0"
            width="651"
            height="868"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* İnteraktif Masa Hotspotları */}
          {tables.map((t) => {

            const status = getTableStatus(t);
            const isHovered = hoveredTable?.id === t.id;
            const isSelected = t.id === selectedTableId;
            const isDimmed = activeZone !== "all" && t.zoneId !== activeZone;

            let fillColor = "rgba(34, 197, 94, 0.4)";
            let strokeColor = "#15803d";
            let strokeWidth = 3;
            let filter: string | undefined = "url(#greenGlow)";
            let cursor = "pointer";

            if (isSelected) {
              fillColor = "rgba(217, 164, 65, 0.85)";
              strokeColor = "#b8842c";
              strokeWidth = 4.5;
              filter = "url(#goldGlow)";
            } else if (status === "booked") {
              fillColor = "rgba(239, 68, 68, 0.6)";
              strokeColor = "#b91c1c";
              strokeWidth = 2.5;
              filter = undefined;
              cursor = "not-allowed";
            } else if (status === "capacity_exceeded") {
              fillColor = "rgba(245, 158, 11, 0.25)";
              strokeColor = "rgba(245, 158, 11, 0.7)";
              strokeWidth = 2;
              filter = undefined;
              cursor = "not-allowed";
            } else if (isHovered) {
              fillColor = "rgba(34, 197, 94, 0.65)";
              strokeColor = "#166534";
              strokeWidth = 4;
              filter = "url(#greenGlow)";
            }

            const opacity = isDimmed ? 0.15 : 1;

            return (
              <g
                key={t.id}
                onClick={() => handleTableClick(t)}
                onMouseEnter={() => setHoveredTable(t)}
                onMouseLeave={() => setHoveredTable(null)}
                style={{ cursor, opacity, transition: "all 0.15s ease" }}
                filter={filter ? filter : undefined}
              >
                <circle
                  cx={t.cx}
                  cy={t.cy}
                  r={t.r}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
                <text
                  x={t.cx}
                  y={(t.cy || 0) - 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isSelected ? "#0d0f0a" : "#ffffff"}
                  fontSize={t.isVip ? "13" : "11"}
                  fontWeight="900"
                  fontFamily="system-ui, sans-serif"
                  style={{
                    pointerEvents: "none",
                    textShadow: isSelected ? "none" : "0 1px 3px rgba(0,0,0,0.9)",
                  }}
                >
                  {t.tableNumber}
                </text>
                <text
                  x={t.cx}
                  y={(t.cy || 0) + 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isSelected ? "#12150e" : "rgba(255,255,255,0.95)"}
                  fontSize="9.5"
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                  style={{
                    pointerEvents: "none",
                    textShadow: isSelected ? "none" : "0 1px 2px rgba(0,0,0,0.9)",
                  }}
                >
                  {t.capacity}k
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* 4. Seçilen Masa veya Hızlı Liste Seçimi (Lüks Kart) */}
      <div style={{ marginTop: 12 }}>
        {selectedTable ? (
          <div
            style={{
              padding: "14px 16px",
              borderRadius: 14,
              background: "rgba(184, 132, 44, 0.1)",
              border: "1.5px solid rgba(184, 132, 44, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "#d9a441",
                  color: "#0d0f0a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(217, 164, 65, 0.4)",
                }}
              >
                <Check style={{ width: 18, height: 18 }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0d0f0a" }}>
                  {selectedTable.name}
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6e6a5c" }}>
                  {selectedTable.zoneName} · Maks. {selectedTable.capacity} Kişilik
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectTable(null)}
              style={{
                background: "none",
                border: "none",
                color: "#dc2626",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
                padding: "4px 8px",
              }}
            >
              Kaldır
            </button>
          </div>
        ) : (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: 14,
              background: "#f6f1e6",
              border: "1px solid rgba(13,15,10,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6e6a5c" }}>
              <Sparkles style={{ width: 15, height: 15, color: "#b8842c" }} />
              <span>Krokiden dokunarak seçin veya listeden belirleyin:</span>
            </div>

            <select
              value={selectedTableId || ""}
              onChange={(e) => {
                const found = tables.find((t) => t.id === e.target.value) || null;
                onSelectTable(found);
              }}
              style={{
                padding: "6px 12px",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 700,
                border: "1px solid rgba(13,15,10,0.15)",
                background: "#ffffff",
                color: "#0d0f0a",
                cursor: "pointer",
                maxWidth: 160,
              }}
            >
              <option value="">Otomatik Masa</option>
              {filteredTables.map((t) => (
                <option key={t.id} value={t.id} disabled={bookedTableIds.includes(t.id)}>
                  {t.name} ({t.capacity}k) {bookedTableIds.includes(t.id) ? "— Dolu" : ""}
                </option>
              ))}
            </select>

          </div>
        )}
      </div>
    </div>
  );
}