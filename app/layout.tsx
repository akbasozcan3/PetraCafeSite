import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Taşdelen Fırıncı",
    template: "%s | Taşdelen Fırıncı",
  },
  description:
    "Taşdelen Fırıncı — Çekmeköy Taşdelen'de taze ekmek, simit, börek, pasta ve unlu mamuller. Özel tasarım pasta siparişi.",
  keywords: [
    "fırın",
    "pastane",
    "taşdelen",
    "çekmeköy",
    "ekmek",
    "pasta",
    "simit",
    "börek",
    "özel tasarım pasta",
  ],
  authors: [{ name: "Taşdelen Fırıncı" }],
  creator: "Taşdelen Fırıncı",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Taşdelen Fırıncı",
    title: "Taşdelen Fırıncı — Taze · Lezzetli · Doğal",
    description:
      "Çekmeköy Taşdelen'de taze ekmek, pasta ve özel tasarım pasta siparişi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taşdelen Fırıncı",
    description:
      "Çekmeköy Taşdelen'de taze ekmek, pasta ve özel tasarım pasta siparişi.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080D15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
