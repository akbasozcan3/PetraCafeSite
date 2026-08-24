import type { SiteContent } from "@/lib/content/types";
import { iconFromLabel } from "@/lib/content/site-icons";
import { 
  Clock, 
  CalendarCheck, 
  Waves, 
  MapPin, 
  Sparkles,
  ArrowUpRight 
} from "lucide-react";
import Link from "next/link";

export default function HomeVisit({ content }: { content: SiteContent }) {
  const c = content.iletisim;
  const custom = (content.ziyaret || []).filter((item) => item.k?.trim());

  const defaultItems = [
    {
      k: "Saatler",
      v: "08:00 – 02:00",
      n: "Cafe açık · Havuz 09:00 – 18:00",
      href: "#iletisim"
    },
    {
      k: "Rezervasyon",
      v: c?.telefon || "0530 608 90 51",
      n: "Masa, havuz ve özel davetler",
      href: "#rezervasyon"
    },
    {
      k: "Havuz & Plaj",
      v: "09:00 – 18:00",
      n: "Yetişkin & çocuk havuzu, şezlong",
      href: "#pasta"
    },
    {
      k: "Konum",
      v: "Petra Yaşam Merkezi",
      n: "Taşdelen · Çekmeköy / İstanbul",
      href: "https://maps.google.com/?q=Petra+Yaşam+Merkezi+Taşdelen+Çekmeköy"
    }
  ];

  const items = custom.length > 0 ? custom : defaultItems;
  if (!items.length) return null;

  const getLucideIcon = (label: string, idx: number) => {
    const l = (label || "").toLowerCase();
    if (l.includes("saat") || l.includes("vakit") || l.includes("zaman")) return Clock;
    if (l.includes("rezerv") || l.includes("randevu") || l.includes("telefon")) return CalendarCheck;
    if (l.includes("havuz") || l.includes("plaj") || l.includes("beach") || l.includes("su")) return Waves;
    if (l.includes("konum") || l.includes("adres") || l.includes("harita") || l.includes("nerede")) return MapPin;
    const fallbackIcons = [Clock, CalendarCheck, Waves, MapPin];
    return fallbackIcons[idx % fallbackIcons.length] || Sparkles;
  };

  return (
    <section 
      id="ziyaret" 
      aria-label="Ziyaret bilgisi"
      style={{
        background: "linear-gradient(180deg, #101622 0%, #080C14 100%)",
        borderTop: "1px solid rgba(217, 164, 65, 0.25)",
        borderBottom: "1px solid rgba(217, 164, 65, 0.25)",
        padding: "clamp(32px, 4vw, 48px) 0",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* İnce Altın Arka Plan Işıltısı */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          maxWidth: "1000px",
          height: "1px",
          background: "radial-gradient(ellipse at center, rgba(229, 181, 85, 0.5) 0%, rgba(229, 181, 85, 0) 70%)",
          pointerEvents: "none"
        }} 
      />

      <div className="wrap" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px"
          }}
          data-stagger=""
        >
          {items.map((item, idx) => {
            const Icon = getLucideIcon(item.k, idx);
            const rawHref = item.href?.trim() || "";
            
            // Otomatik link tahmini (eğer admin link girmediyse)
            let href = rawHref;
            if (!href) {
              const l = item.k.toLowerCase();
              if (l.includes("rezerv")) href = "#rezervasyon";
              else if (l.includes("havuz")) href = "#pasta";
              else if (l.includes("konum")) href = "https://maps.google.com/?q=Petra+Yaşam+Merkezi+Taşdelen+Çekmeköy";
              else if (l.includes("saat")) href = "#iletisim";
            }

            const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
            const CardWrapper = href ? (isExternal ? "a" : Link) : "div";
            const wrapperProps: any = href ? (isExternal ? { href, target: "_blank", rel: "noopener noreferrer" } : { href }) : {};

            return (
              <CardWrapper
                key={idx}
                {...wrapperProps}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "22px 24px",
                  borderRadius: "18px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(217, 164, 65, 0.2)",
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.4)",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  cursor: href ? "pointer" : "default",
                  position: "relative",
                  backdropFilter: "blur(10px)"
                }}
                className="group hover:border-[#D9A441]/50 hover:bg-white/[0.06] hover:-translate-y-1"
              >
                <div>
                  {/* Üst Satır: İkon Rozeti & Kategori Başlığı */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div 
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, rgba(217, 164, 65, 0.2) 0%, rgba(217, 164, 65, 0.08) 100%)",
                          color: "#E5B555",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid rgba(217, 164, 65, 0.3)"
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span 
                        style={{
                          fontSize: "11px",
                          fontWeight: 900,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#D9A441"
                        }}
                      >
                        {item.k}
                      </span>
                    </div>

                    {href && (
                      <div style={{ opacity: 0.6, color: "#E5B555" }}>
                        <ArrowUpRight size={15} />
                      </div>
                    )}
                  </div>

                  {/* Ana Vurgu Başlığı */}
                  <div 
                    style={{
                      fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                      fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                      marginBottom: "6px"
                    }}
                  >
                    {item.v || item.k}
                  </div>
                </div>

                {/* Alt Açıklama */}
                {item.n && (
                  <div 
                    style={{
                      fontSize: "0.84rem",
                      color: "rgba(244, 238, 225, 0.72)",
                      lineHeight: 1.5,
                      fontWeight: 400,
                      paddingTop: "6px"
                    }}
                  >
                    {item.n}
                  </div>
                )}
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
