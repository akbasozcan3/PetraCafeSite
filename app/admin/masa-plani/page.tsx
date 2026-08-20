"use client";

import { useEffect, useRef, useState } from "react";
import { RestaurantTable } from "@/lib/content/tables-data";
import { Save, Plus, Trash2, RotateCcw, Move, Sparkles, Check, AlertCircle } from "lucide-react";

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
      r: 22,
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
      setMessage({ type: "ok", text: "✅ Tüm masa konumları ve ayarları başarıyla kaydedildi!" });
    } catch (err: any) {
      setMessage({ type: "err", text: `Hata: ${err?.message || "Kayıt başarısız."}` });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px" }}>
      {/* Üst Başlık & Kaydet Buton Barı */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          background: "#12150e",
          color: "#f4eee1",
          padding: "20px 24px",
          borderRadius: 20,
          marginBottom: 24,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div>
          <span style={{ fontSize: 12, color: "#d9a441", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Canlı Kroki Yönetimi
          </span>
          <h1 style={{ margin: "4px 0 0", fontSize: 24, fontWeight: 800 }}>
            İnteraktif Masa & Loca Konumlandırıcı
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
            Kroki üzerindeki masaları fareyle tutup dilediğiniz konuma sürükleyin veya sağdaki panelden milimetrik düzenleyin.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            onClick={handleAddNewTable}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.1)",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
            }}
          >
            <Plus style={{ width: 16, height: 16 }} />
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
              padding: "12px 24px",
              borderRadius: 12,
              background: "#d9a441",
              color: "#0d0f0a",
              fontSize: 14,
              fontWeight: 800,
              border: "none",
              cursor: isSaving ? "not-allowed" : "pointer",
              boxShadow: "0 4px 16px rgba(217, 164, 65, 0.4)",
            }}
          >
            <Save style={{ width: 18, height: 18 }} />
            {isSaving ? "Kaydediliyor..." : "Konumları Kaydet"}
          </button>
        </div>
      </div>

      {message && (
        <div
          style={{
            padding: "14px 20px",
            borderRadius: 14,
            background: message.type === "ok" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
            border: `1px solid ${message.type === "ok" ? "#10b981" : "#ef4444"}`,
            color: message.type === "ok" ? "#065f46" : "#991b1b",
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          {message.text}
        </div>
      )}

      {/* İkili Düzen: Sol (Canlı Kroki Tuvali) - Sağ (Masa Detay Editörü) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "start" }}>
        {/* SOL: İNTERAKTİF SÜRÜKLE-BIRAK SVG TUVALİ */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 20,
            padding: 20,
            border: "2px solid #d9a441",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            userSelect: "none",
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0d0f0a", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Move style={{ width: 16, height: 16, color: "#b8842c" }} />
              Masaları sürükleyerek havuz krokisi üzerine tam oturtun ({tables.length} Masa)
            </span>
            <span style={{ fontSize: 12, color: "#6e6a5c" }}>
              Seçili Masa: <strong style={{ color: "#b8842c" }}>{selectedTable ? selectedTable.name : "Yok"}</strong>
            </span>
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid rgba(13,15,10,0.15)",
              background: "#fafafa",
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
                const isDragging = t.id === draggingId;

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
                        r={(t.r || 22) + 6}
                        fill="none"
                        stroke="#b8842c"
                        strokeWidth="3"
                        strokeDasharray="4 2"
                      />
                    )}

                    {/* Ana Masa Dairesi */}
                    <circle
                      cx={t.cx}
                      cy={t.cy}
                      r={t.r || 22}
                      fill={isSelected ? "rgba(217, 164, 65, 0.9)" : "rgba(34, 197, 94, 0.6)"}
                      stroke={isSelected ? "#0d0f0a" : "#15803d"}
                      strokeWidth={isSelected ? "3" : "2"}
                    />

                    {/* Masa Numarası */}
                    <text
                      x={t.cx}
                      y={(t.cy || 0) - 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isSelected ? "#0d0f0a" : "#ffffff"}
                      fontSize={t.isVip ? "13" : "11"}
                      fontWeight="900"
                      fontFamily="system-ui, sans-serif"
                      style={{ pointerEvents: "none" }}
                    >
                      {t.tableNumber}
                    </text>

                    {/* Kapasite */}
                    <text
                      x={t.cx}
                      y={(t.cy || 0) + 12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isSelected ? "#0d0f0a" : "#ffffff"}
                      fontSize="9"
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

        {/* SAĞ: SEÇİLİ MASA ÖZELLİK PANELİ */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 20,
            padding: 20,
            border: "1px solid rgba(13,15,10,0.12)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 800, color: "#0d0f0a" }}>
            Masa Parametreleri
          </h2>

          {selectedTable ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6e6a5c" }}>
                  Masa Numarası (Kısa Kod)
                </label>
                <input
                  type="text"
                  value={selectedTable.tableNumber}
                  onChange={(e) => handleUpdateField("tableNumber", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid rgba(13,15,10,0.15)",
                    marginTop: 4,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6e6a5c" }}>
                  Görünen İsim
                </label>
                <input
                  type="text"
                  value={selectedTable.name}
                  onChange={(e) => handleUpdateField("name", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid rgba(13,15,10,0.15)",
                    marginTop: 4,
                    fontSize: 13,
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6e6a5c" }}>
                    Bölge
                  </label>
                  <select
                    value={selectedTable.zoneId}
                    onChange={(e) => {
                      const zid = e.target.value as "loca" | "masalar";
                      handleUpdateField("zoneId", zid);
                      handleUpdateField("zoneName", zid === "loca" ? "VIP Localar" : "Havuz Masaları");
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1px solid rgba(13,15,10,0.15)",
                      marginTop: 4,
                      fontSize: 13,
                    }}
                  >
                    <option value="masalar">Havuz Masası</option>
                    <option value="loca">VIP Loca</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6e6a5c" }}>
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
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1px solid rgba(13,15,10,0.15)",
                      marginTop: 4,
                      fontSize: 13,
                    }}
                  />
                </div>
              </div>

              {/* Koordinat Ayarları (X, Y, Yarıçap) */}
              <div style={{ padding: 12, borderRadius: 12, background: "#f6f1e6", border: "1px solid rgba(13,15,10,0.1)" }}>
                <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#b8842c" }}>
                  Hassas Koordinatlar (Piksel)
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 600, color: "#6e6a5c" }}>X (cx)</label>
                    <input
                      type="number"
                      value={selectedTable.cx || 0}
                      onChange={(e) => handleUpdateField("cx", Number(e.target.value))}
                      style={{
                        width: "100%",
                        padding: "6px 8px",
                        borderRadius: 8,
                        border: "1px solid rgba(13,15,10,0.15)",
                        marginTop: 2,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 600, color: "#6e6a5c" }}>Y (cy)</label>
                    <input
                      type="number"
                      value={selectedTable.cy || 0}
                      onChange={(e) => handleUpdateField("cy", Number(e.target.value))}
                      style={{
                        width: "100%",
                        padding: "6px 8px",
                        borderRadius: 8,
                        border: "1px solid rgba(13,15,10,0.15)",
                        marginTop: 2,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 600, color: "#6e6a5c" }}>Çap (r)</label>
                    <input
                      type="number"
                      value={selectedTable.r || 22}
                      onChange={(e) => handleUpdateField("r", Number(e.target.value))}
                      style={{
                        width: "100%",
                        padding: "6px 8px",
                        borderRadius: 8,
                        border: "1px solid rgba(13,15,10,0.15)",
                        marginTop: 2,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6e6a5c" }}>
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
                    border: "1px solid rgba(13,15,10,0.15)",
                    marginTop: 4,
                    fontSize: 12,
                  }}
                />
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => handleDeleteTable(selectedTable.id)}
                  style={{
                    flex: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "10px",
                    borderRadius: 10,
                    background: "rgba(239, 68, 68, 0.1)",
                    color: "#dc2626",
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
            <div style={{ textAlign: "center", padding: "40px 10px", color: "#6e6a5c" }}>
              <p>Düzenlemek için krokiden bir masaya tıklayın.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}