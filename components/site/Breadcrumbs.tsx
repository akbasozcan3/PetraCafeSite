import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="crumbs" aria-label="Sayfa yolu">
      <Link href="/" className="crumbs__home" title="Ana Sayfa">
        <Home size={13} style={{ display: "inline-block", verticalAlign: "-1px" }} />
        <span>Ana Sayfa</span>
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="crumbs__segment">
            <ChevronRight size={12} className="crumbs__sep" aria-hidden="true" />
            {isLast || !item.href ? (
              <span className="crumbs__current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="crumbs__link">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
