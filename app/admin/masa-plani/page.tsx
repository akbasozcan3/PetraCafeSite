"use client";

import { useEffect, useRef, useState } from "react";
import { RestaurantTable } from "@/lib/content/tables-data";
import { Save, Plus, Trash2, Move, ZoomIn, ZoomOut, Sparkles, Check, AlertCircle } from "lucide-react";

export default function AdminMasaPlaniPage() {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Masaları yükle
  useEffect(() => {
    fetch("/api/v1/tables")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.tables)) {
          setTables(d.tables);
          if (d.tables.length > 0) setSelectedId(d.tables[0].id);
        }
      })
      .catch((err) => console.error("Masa yükleme hatası:", err));
  }, []);

  const selectedTable = tables.find((t) => t.id === selectedId) || null;

  // SVG Mouse Drag Mantığı (ViewBox 651 x 868)
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
    setDraggingId(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // ViewBox ölçekleme (651 x 868)
    const scaleX = 651 / rect.width;
    const scaleY = 868 / rect.height;

    const newX = Math.round(clientX * scaleX);
    const newY = Math.round(clientY * scaleY);

    setTables((prev) =>
      prev.map((t) =>
        t.id === draggingId
          ? { ...t, cx: Math.max(10, Math.min(640, newX)), cy: Math.max(10, Math.min(855, newY)) }
          : t
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const handleUpdateField = (field: keyof RestaurantTable, value: any) => {
    if (!selectedId) return;
    setTables((prev) =>
      prev.map((t) => (t.id === selectedId ? { ...t, [field]: value } : t))
    );
  };

  // Seçili masayı küçült / büyüt
  const adjustSelectedRadius = (delta: number) => {
    if (!selectedId || !selectedTable) return;
    const currentR = selectedTable.r || 22;
    const nextR = Math.max(12, Math.min(60, currentR + delta));
    handleUpdateField("r", nextR);
  };

  // Tüm masaları toplu küçült / büyüt
  const scaleAllTables = (delta: number) => {
    setTables((prev) =>
      prev.map((t) => ({
        ...t,
        r: Math.max(12, Math.min(60, (t.r || 22) + delta)),
      }))
    );
  };

  const handleAddNewTable = () => {
    const newNum = tables.length + 1;
    const newTable: RestaurantTable = {
      id: `masa-yeni-${Date.now()}`,
      tableNumber: `M-${newNum}`,
      name: `Masa ${newNum}`,
      zoneId: "masalar",
      zoneName: "Havuz Masaları",
      capacity: 4,
      minGuests: 1,
      shape: "circle",
      cx: 325,
      cy: 434,
      r: 20,
      description: "Yeni eklenen havuz masası",
    };
    setTables((prev) => [...prev, newTable]);
    setSelectedId(newTable.id);
  };

  const handleDeleteTable = (id: string) => {
    if (confirm("Bu masayı krokiden silmek istediğinize emin misiniz?")) {
      setTables((prev) => prev.filter((t) => t.id !== id));
      setSelectedId(null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/v1/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tables }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kaydedilemedi.");
      setMessage({ type: "ok", text: "✅ Tüm masa konumları ve boyutları başarıyla kaydedildi!" });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ type: "err", text: `Hata: ${err?.message || "Kayıt başarısız."}` });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 1440, margin: "0 auto", padding: "16px" }}>
      {/* Üst Başlık & Kaydet Buton Barı */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          background: "#141E2E",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#EEE9E0",
          padding: "18px 24px",
          borderRadius: 18,
          marginBottom: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div>
          <span style={{ fontSize: 11.5, color: "#D9A441", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Canlı Kroki & Masa Yönetimi
          </span>
          <h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>
            İnteraktif Masa & Loca Konumlandırıcı
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "#8A9BB0" }}>
            Masaları fareyle sürükleyin veya sağdaki panelden boyutunu (+ / -) ve koordinatlarını milimetrik ayarlayın.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
          {/* Toplu Boyut Butonları */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.05)", padding: "4px 8px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: 11, color: "#8A9BB0", fontWeight: 600, marginRight: 4 }}>Tüm Butonlar:</span>
            <button
              type="button"
              onClick={() => scaleAllTables(-2)}
              title="Tüm masaları küçült"
              style={{
                padding: "4px 8px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.1)",
                color: "#FFFFFF",
                fontSize: 11,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
              }}
            >
              - Küçült
            </button>
            <button
              type="button"
              onClick={() => scaleAllTables(2)}
              title="Tüm masaları büyüt"
              style={{
                padding: "4px 8px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.1)",
                color: "#FFFFFF",
                fontSize: 11,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
              }}
            >
              + Büyüt
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddNewTable}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 16px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.08)",
              color: "#FFFFFF",
              fontSize: 12.5,
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
            }}
          >
            <Plus style={{ width: 15, height: 15 }} />
            Yeni Masa Ekle
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 22px",
              borderRadius: 12,
              background: "#D9A441",
              color: "#0D0F0A",
              fontSize: 13.5,
              fontWeight: 800,
              border: "none",
              cursor: isSaving ? "not-allowed" : "pointer",
              boxShadow: "0 4px 16px rgba(217, 164, 65, 0.4)",
            }}
          >
            <Save style={{ width: 16, height: 16 }} />
            {isSaving ? "Kaydediliyor..." : "Konumları Kaydet"}
          </button>
        </div>
      </div>

      {message && (
        <div
          style={{
            padding: "12px 18px",
            borderRadius: 12,
            background: message.type === "ok" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
            border: `1px solid ${message.type === "ok" ? "#10b981" : "#ef4444"}`,
            color: message.type === "ok" ? "#34d399" : "#f87171",
            fontSize: 13.5,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {message.text}
        </div>
      )}

      {/* İkili Düzen: Sol (Canlı Kroki Tuvali) - Sağ (Koyu Tema Masa Parametreleri) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, alignItems: "start" }}>
        {/* SOL: İNTERAKTİF SÜRÜKLE-BIRAK SVG TUVALİ */}
        <div
          style={{
            background: "#141E2E",
            borderRadius: 18,
            padding: 16,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            userSelect: "none",
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#EEE9E0", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Move style={{ width: 15, height: 15, color: "#D9A441" }} />
              Masaları sürükleyerek havuz krokisi üzerine tam oturtun ({tables.length} Masa)
            </span>
            <span style={{ fontSize: 12, color: "#8A9BB0" }}>
              Seçili: <strong style={{ color: "#D9A441" }}>{selectedTable ? selectedTable.name : "Yok"}</strong>
            </span>
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "#ffffff",
            }}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 651 868"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                cursor: draggingId ? "grabbing" : "default",
              }}
            >
              {/* Orijinal Kroki Arka Plan Görseli */}
              <image
                href="/assets/img/havuz-kroki.png"
                x="0"
                y="0"
                width="651"
                height="868"
                preserveAspectRatio="xMidYMid meet"
              />

              {/* Sürüklenebilir Masa Hotspotları */}
              {tables.map((t) => {
                const isSelected = t.id === selectedId;
                const radius = t.r || 20;

                return (
                  <g
                    key={t.id}
                    onMouseDown={(e) => handleMouseDown(e, t.id)}
                    style={{ cursor: "grab" }}
                  >
                    {/* Seçim Vurgu Halkası */}
                    {isSelected && (
                      <circle
                        cx={t.cx}
                        cy={t.cy}
                        r={radius + 6}
                        fill="none"
                        stroke="#D9A441"
                        strokeWidth="3.5"
                        strokeDasharray="5 3"
                      />
                    )}

                    {/* Ana Masa Dairesi */}
                    <circle
                      cx={t.cx}
                      cy={t.cy}
                      r={radius}
                      fill={isSelected ? "rgba(217, 164, 65, 0.9)" : "rgba(34, 197, 94, 0.65)"}
                      stroke={isSelected ? "#0D0F0A" : "#15803D"}
                      strokeWidth={isSelected ? "3" : "2"}
                    />

                    {/* Masa Numarası */}
                    <text
                      x={t.cx}
                      y={(t.cy || 0) - (radius > 24 ? 3 : 2)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isSelected ? "#0D0F0A" : "#FFFFFF"}
                      fontSize={radius > 26 ? "13" : radius > 18 ? "10.5" : "9"}
                      fontWeight="900"
                      fontFamily="system-ui, sans-serif"
                      style={{ pointerEvents: "none" }}
                    >
                      {t.tableNumber}
                    </text>

                    {/* Kapasite */}
                    <text
                      x={t.cx}
                      y={(t.cy || 0) + (radius > 24 ? 11 : 9)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isSelected ? "#0D0F0A" : "#FFFFFF"}
                      fontSize={radius > 26 ? "9.5" : "8"}
                      fontWeight="700"
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

        {/* SAĞ: KOYU TEMA SEÇİLİ MASA ÖZELLİK PANELİ (YAZILAR NET VE OKUNUR) */}
        <div
          style={{
            background: "#141E2E",
            borderRadius: 18,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            color: "#EEE9E0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 10 }}>

            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#FFFFFF" }}>
              Masa Parametreleri
            </h2>
            {selectedTable && (
              <span style={{ fontSize: 11.5, background: "rgba(217, 164, 65, 0.15)", color: "#D9A441", padding: "3px 8px", borderRadius: 6, fontWeight: 700 }}>
                {selectedTable.tableNumber}
              </span>
            )}
          </div>

          {selectedTable ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#8A9BB0", display: "block", marginBottom: 4 }}>
                  Masa Numarası (Kısa Kod)
                </label>
                <input
                  type="text"
                  value={selectedTable.tableNumber}
                  onChange={(e) => handleUpdateField("tableNumber", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "#0D1117",
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: 700,
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#8A9BB0", display: "block", marginBottom: 4 }}>
                  Görünen İsim
                </label>
                <input
                  type="text"
                  value={selectedTable.name}
                  onChange={(e) => handleUpdateField("name", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "#0D1117",
                    color: "#FFFFFF",
                    fontSize: 13,
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#8A9BB0", display: "block", marginBottom: 4 }}>
                    Bölge
                  </label>
                  <select
                    value={selectedTable.zoneId}
                    onChange={(e) => {
                      const zid = e.target.value as "loca" | "masalar";
                      handleUpdateField("zoneId", zid);
                      handleUpdateField("zoneName", zid === "loca" ? "VIP Localar" : "Havuz Masaları");
                      handleUpdateField("isVip", zid === "loca");
                    }}
                    style={{
                      width: "100%",
                      padding: "9px 10px",
                      borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "#0D1117",
                      color: "#FFFFFF",
                      fontSize: 12.5,
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="masalar">Havuz Masası</option>
                    <option value="loca">VIP Loca</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#8A9BB0", display: "block", marginBottom: 4 }}>
                    Kapasite (Kişi)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={selectedTable.capacity}
                    onChange={(e) => handleUpdateField("capacity", Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "#0D1117",
                      color: "#FFFFFF",
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* MASA BOYUTUNU KÜÇÜLT / BÜYÜT KONTROL KARTI */}
              <div style={{ padding: 12, borderRadius: 12, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#D9A441" }}>
                    Masa Boyutu (Çap: {selectedTable.r || 20}px)
                  </span>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button
                      type="button"
                      onClick={() => adjustSelectedRadius(-2)}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.1)",
                        color: "#FFFFFF",
                        fontSize: 11,
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      - Küçült
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustSelectedRadius(2)}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.1)",
                        color: "#FFFFFF",
                        fontSize: 11,
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      + Büyüt
                    </button>
                  </div>
                </div>

                <input
                  type="range"
                  min={12}
                  max={50}
                  step={1}
                  value={selectedTable.r || 20}
                  onChange={(e) => handleUpdateField("r", Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#D9A441", cursor: "pointer" }}
                />
              </div>

              {/* Koordinat Ayarları (X, Y) */}
              <div style={{ padding: 12, borderRadius: 12, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#8A9BB0" }}>
                  Hassas Piksel Konumları
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 10.5, fontWeight: 600, color: "#8A9BB0", display: "block", marginBottom: 2 }}>X (cx)</label>
                    <input
                      type="number"
                      value={selectedTable.cx || 0}
                      onChange={(e) => handleUpdateField("cx", Number(e.target.value))}
                      style={{
                        width: "100%",
                        padding: "7px 10px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "#0D1117",
                        color: "#FFFFFF",
                        fontSize: 12,
                        fontWeight: 700,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 10.5, fontWeight: 600, color: "#8A9BB0", display: "block", marginBottom: 2 }}>Y (cy)</label>
                    <input
                      type="number"
                      value={selectedTable.cy || 0}
                      onChange={(e) => handleUpdateField("cy", Number(e.target.value))}
                      style={{
                        width: "100%",
                        padding: "7px 10px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "#0D1117",
                        color: "#FFFFFF",
                        fontSize: 12,
                        fontWeight: 700,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#8A9BB0", display: "block", marginBottom: 4 }}>
                  Açıklama
                </label>
                <textarea
                  rows={2}
                  value={selectedTable.description || ""}
                  onChange={(e) => handleUpdateField("description", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "#0D1117",
                    color: "#FFFFFF",
                    fontSize: 12,
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => handleDeleteTable(selectedTable.id)}
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "10px",
                    borderRadius: 10,
                    background: "rgba(239, 68, 68, 0.15)",
                    color: "#f87171",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <Trash2 style={{ width: 14, height: 14 }} />
                  Masayı Sil
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 10px", color: "#8A9BB0" }}>
              <p>Düzenlemek için krokiden bir masaya tıklayın.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}