"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, site } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="site-logo" href="/" onClick={() => setOpen(false)}>
        <Image alt="" height={56} priority src="/images/bicb-logo.png" width={56} />
        <span>
          <strong>{site.name} - {site.location}</strong>
        </span>
      </Link>

      <button
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="nav-toggle"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
      </button>

      <nav aria-label="Main navigation" className={open ? "site-nav site-nav--open" : "site-nav"}>
        {navItems.map((item) => (
          <Link
            aria-current={pathname === item.href ? "page" : undefined}
            href={item.href}
            key={item.href}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
