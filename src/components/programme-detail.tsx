import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import type { Programme } from "@/data/site";
import { programmes } from "@/data/site";

type ProgrammeDetailProps = {
  programme: Programme;
};

function hrefFor(programme: Programme) {
  if (programme.slug === "children" || programme.slug === "junior-youth") {
    return `/programmes/${programme.slug}`;
  }

  return `/get-involved/${programme.slug}`;
}

export function ProgrammeDetail({ programme }: ProgrammeDetailProps) {
  const Icon = programme.icon;
  const related = programmes.filter((item) => item.slug !== programme.slug);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <div>
            <p className="eyebrow">{programme.audience}</p>
            <h1>{programme.title}</h1>
            <p className="page-hero__copy">{programme.summary}</p>
            <div className="button-row">
              <ButtonLink external href={programme.registrationUrl}>
                {programme.ctaLabel}
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Ask a question
              </ButtonLink>
            </div>
          </div>
          <div className="page-hero__image">
            <Image
              alt={`${programme.title} activity in Manchester`}
              fill
              priority
              sizes="(max-width: 920px) 100vw, 44vw"
              src={programme.image}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div>
            <p className="eyebrow">{programme.ageRange}</p>
            <h2>What to expect</h2>
            {programme.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div>
            <div className="quote-panel">{programme.quote}</div>
            <article className="info-card">
              <span className="icon-badge">
                <Icon aria-hidden="true" size={18} />
              </span>
              <h3>Activities include</h3>
              <ul className="plain-list">
                {programme.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--band">
        <div className="section__inner">
          <div className="cta-band">
            <div>
              <p className="eyebrow eyebrow--light">Registration</p>
              <h2>Ready to take the next step?</h2>
              <p>
                Use the registration form to share details with the team. For safeguarding reasons,
                the form is kept with the existing registration provider for now.
              </p>
            </div>
            <ButtonLink external href={programme.registrationUrl}>
              {programme.ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Related spaces</h2>
        <div className="grid grid--3">
          {related.slice(0, 3).map((item) => (
            <article className="info-card" key={item.slug}>
              <h3>
                <Link href={hrefFor(item)}>{item.title}</Link>
              </h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
