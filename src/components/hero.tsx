import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { withBasePath } from "@/lib/base-path";

type HeroProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
  image: string;
  imageAlt: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  quote?: string;
  quoteAttribution?: string;
};

export function Hero({
  eyebrow,
  title,
  copy,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
  quote,
  quoteAttribution
}: HeroProps) {
  return (
    <section className="hero">
      <Image alt={imageAlt} className="hero__image" fill priority sizes="100vw" src={withBasePath(image)} />
      <div className="hero__overlay" />
      <div className="hero__content">
        {eyebrow ? <p className="eyebrow eyebrow--light">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {copy ? <p className="hero__copy">{copy}</p> : null}
        {quote ? (
          <blockquote className="hero__quote">
            <p>{quote}</p>
            {quoteAttribution ? <cite>{quoteAttribution}</cite> : null}
          </blockquote>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="hero__actions">
            {primaryCta ? <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink> : null}
            {secondaryCta ? (
              <ButtonLink href={secondaryCta.href} variant="light">
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
