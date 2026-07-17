"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/data/site";
import { withBasePath } from "@/lib/base-path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function normalizePath(path: string) {
  const pathWithoutHash = path.split("#")[0];
  const pathWithoutBase =
    basePath && (pathWithoutHash === basePath || pathWithoutHash.startsWith(`${basePath}/`))
      ? pathWithoutHash.slice(basePath.length) || "/"
      : pathWithoutHash;

  return pathWithoutBase === "/" ? "/" : pathWithoutBase.replace(/\/+$/, "");
}

function isActivePath(pathname: string, href: string, includeDescendants = false) {
  const currentPath = normalizePath(pathname);
  const targetPath = normalizePath(href);

  return (
    currentPath === targetPath ||
    (includeDescendants && targetPath !== "/" && currentPath.startsWith(`${targetPath}/`))
  );
}

function isActiveHref(pathname: string, hash: string, href: string) {
  const [targetPath, targetHash] = href.split("#");

  return isActivePath(pathname, targetPath) && (!targetHash || hash === `#${targetHash}`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const closeNavigation = () => {
    setOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <header className="site-header">
      <Link className="site-logo" href="/" onClick={closeNavigation}>
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
            (child) => isActivePath(pathname, child.href)
          );

          if (item.children) {
            return (
              <div
                className="site-nav__group"
                data-open={openSubmenu === item.href ? "true" : undefined}
                key={item.href}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setOpenSubmenu(null);
                  }
                }}
                onFocus={() => setOpenSubmenu(item.href)}
                onMouseEnter={() => setOpenSubmenu(item.href)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <Link
                  aria-current={
                    isActivePath(pathname, item.href, true) || childIsActive ? "page" : undefined
                  }
                  aria-expanded={openSubmenu === item.href}
                  aria-haspopup="true"
                  className="site-nav__parent"
                  href={item.href}
                  onClick={closeNavigation}
                >
                  {item.label}
                  <ChevronDown aria-hidden="true" size={15} />
                </Link>
                <div className="site-nav__submenu">
                  {item.children.map((child) => (
                    <Link
                      aria-current={
                        isActiveHref(pathname, currentHash, child.href) ? "page" : undefined
                      }
                      href={child.href}
                      key={child.href}
                      onClick={closeNavigation}
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
              aria-current={isActivePath(pathname, item.href, true) ? "page" : undefined}
              href={item.href}
              key={item.href}
              onClick={closeNavigation}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
