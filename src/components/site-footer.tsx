import Link from "next/link";
import { Camera, Mail, ShieldCheck } from "lucide-react";
import { navItems, site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div>
          <h2>{site.name}</h2>
          <p>
            Educational programmes for people from all backgrounds and ages in Manchester,
            offered under the auspices of the Local Spiritual Assembly of the Bahá'ís of Manchester.
          </p>
        </div>
        <div className="footer-links" aria-label="Footer navigation">
          {navItems.map((item) =>
            item.children ? (
              <div className="footer-link-group" key={item.href}>
                <Link href={item.href}>{item.label}</Link>
                {item.children.map((child) => (
                  <Link className="footer-sublink" href={child.href} key={child.href}>
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            )
          )}
        </div>
        <div className="footer-actions">
          <a href={`mailto:${site.email}`}>
            <Mail aria-hidden="true" size={18} />
            {site.email}
          </a>
          <a href={site.instagram} rel="noreferrer" target="_blank">
            <Camera aria-hidden="true" size={18} />
            Instagram
          </a>
          <a href={site.safeguardingPolicy} rel="noreferrer" target="_blank">
            <ShieldCheck aria-hidden="true" size={18} />
            Safeguarding policy
          </a>
        </div>
      </div>
      <div className="site-footer__bottom">
        <p>Registered in England - Company limited by guarantee No.00543024.</p>
        <p>Registered Charity - 1064903.</p>
      </div>
    </footer>
  );
}
