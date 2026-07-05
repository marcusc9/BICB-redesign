import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  external?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  className = ""
}: ButtonLinkProps) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const classes = ["button-link", `button-link--${variant}`, className].filter(Boolean).join(" ");
  const icon = isExternal ? <ExternalLink aria-hidden="true" size={18} /> : <ArrowRight aria-hidden="true" size={18} />;

  if (isExternal) {
    return (
      <a className={classes} href={href} rel="noreferrer" target="_blank">
        <span>{children}</span>
        {icon}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      <span>{children}</span>
      {icon}
    </Link>
  );
}
