import type { ReactNode } from "react";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import { getContentAsync } from "@/lib/db/content";
import "@/styles/storefront.css";

/**
 * Ürün / blog / iletişim sayfalarında ortak kabuk (katalog + WhatsApp sipariş).
 */
export default async function SiteShell({
  children,
}: {
  children: ReactNode;
}) {
  const content = await getContentAsync();
  const logo = content.images?.logo || "/assets/img/logo.webp";

  return (
    <div className="site-shop">
      <link
        rel="stylesheet"
        href="/css2.css?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
      />
      <link rel="stylesheet" href="/assets/css/style.css?v=20260810x9" />
      <link rel="stylesheet" href="/assets/css/nav-actions.css?v=6" />

      <a className="skip" href="#icerik">
        İçeriğe geç
      </a>

      <SiteNav navbar={content.navbar} logoUrl={logo} homeHref="/" />

      <div className="site-shop__body">
        <div className="oc-shell wrap">
          <main id="icerik" className="shop-main oc-main">
            {children}
          </main>
        </div>
      </div>

      <SiteFooter content={content} />
    </div>
  );
}
