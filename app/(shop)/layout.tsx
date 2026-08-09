import Link from "next/link";
import type { ReactNode } from "react";
import "./shop.css";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="shop">
      <a className="skip" href="#icerik">
        İçeriğe geç
      </a>
      <header className="shop-nav">
        <div className="shop-nav__inner">
          <Link href="/index.htm" className="shop-nav__logo">
            FIRINCI
          </Link>
          <nav className="shop-nav__links" aria-label="Mağaza">
            <Link href="/urunler/urunler">Ürünler</Link>
            <Link href="/index.htm#hakkimizda">Hakkımızda</Link>
            <Link href="/index.htm#galeri">Galeri</Link>
            <Link href="/hesabim">Hesabım</Link>
            <Link href="/sepet">Sepet</Link>
          </nav>
          <a href="tel:+905523400202" className="shop-nav__cta">
            0552 340 02 02
          </a>
        </div>
      </header>
      <main id="icerik" className="shop-main">
        {children}
      </main>
      <footer className="shop-foot">
        <div className="shop-foot__inner">
          <span>© {new Date().getFullYear()} Taşdelen Fırıncı</span>
          <Link href="/index.htm">Ana Sayfa</Link>
        </div>
      </footer>
    </div>
  );
}
