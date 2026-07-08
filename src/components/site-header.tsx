"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, site } from "@/data/site";
import { withBasePath } from "@/lib/base-path";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="site-logo" href="/" onClick={() => setOpen(false)}>
        <Image alt="" height={56} priority src={withBasePath("/images/bicb-logo.png")} width={56} />
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
        {navItems.map((item) => {
          const childIsActive = item.children?.some(
            (child) => pathname === child.href.split("#")[0]
          );

          if (item.children) {
            return (
              <div className="site-nav__group" key={item.href}>
                <Link
                  aria-current={pathname === item.href || childIsActive ? "page" : undefined}
                  className="site-nav__parent"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <ChevronDown aria-hidden="true" size={15} />
                </Link>
                <div className="site-nav__submenu">
                  {item.children.map((child) => (
                    <Link
                      aria-current={pathname === child.href.split("#")[0] ? "page" : undefined}
                      href={child.href}
                      key={child.href}
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
