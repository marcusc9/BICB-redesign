import Image from "next/image";
import Link from "next/link";
import type { Programme } from "@/data/site";
import { ButtonLink } from "@/components/button-link";

type ProgrammeCardProps = {
  programme: Programme;
  href: string;
};

export function ProgrammeCard({ programme, href }: ProgrammeCardProps) {
  const Icon = programme.icon;

  return (
    <article className="programme-card">
      <Link aria-label={`Learn more about ${programme.title}`} className="programme-card__media" href={href}>
        <Image alt={`${programme.title} in Manchester`} fill sizes="(max-width: 760px) 100vw, 50vw" src={programme.image} />
      </Link>
      <div className="programme-card__body">
        <div className="programme-card__meta">
          <span className="icon-badge">
            <Icon aria-hidden="true" size={18} />
          </span>
          <span>{programme.ageRange}</span>
        </div>
        <h3>
          <Link href={href}>{programme.title}</Link>
        </h3>
        <p>{programme.summary}</p>
        <div className="programme-card__actions">
          <ButtonLink href={href} variant="secondary">
            Learn more
          </ButtonLink>
          <ButtonLink external href={programme.registrationUrl} variant="ghost">
            Register
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
