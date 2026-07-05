import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { contactPoints, programmes, schemes, site, values } from "@/data/site";

function programmeHref(slug: string) {
  if (slug === "children" || slug === "junior-youth") {
    return `/programmes/${slug}`;
  }

  return `/get-involved/${slug}`;
}

export default function Home() {
  return (
    <>
      <Hero
        image="/images/hero-community-building.jpg"
        imageAlt="People gathered around tables during a community building activity"
        quote='"The betterment of the world can be accomplished through pure and goodly deeds, through commendable and seemly conduct."'
        quoteAttribution="Bahá'u'lláh"
        title="Building a Better World Together"
      />

      <section className="pathway-section" id="programmes">
        <div className="pathway-shell">
          <div className="pathway-intro">
            <p className="eyebrow">Find your place</p>
            <h2>Community building begins with a path of service</h2>
            <p className="lead">
              From children discovering spiritual qualities to youth and adults learning to serve,
              each programme helps neighbours strengthen the life of their community.
            </p>
          </div>

          <div className="pathway-grid">
            {programmes.map((programme) => (
              <article className="pathway-item" key={programme.slug}>
                <span className="pathway-item__meta">{programme.ageRange}</span>
                <h3>{programme.title}</h3>
                <p>{programme.summary}</p>
                <Link className="pathway-item__link" href={programmeHref(programme.slug)}>
                  Explore this path
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--warm">
        <div className="section__inner">
          <div className="cta-band">
            <div>
              <p className="eyebrow eyebrow--light">Weekly Activities</p>
              <h2>{schemes.title}</h2>
              <p>{schemes.summary}</p>
            </div>
            <ButtonLink href="/schemes" variant="primary">
              View schemes
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section service-section" id="service">
        <div className="section-heading section-heading--center">
          <h2>A path of service, walked together</h2>
        </div>
        <div className="grid grid--4 service-steps">
          {values.map((value) => (
            <article className="info-card value-card" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
        <div className="testimony-grid">
          <article className="testimony-card">
            <p className="testimony-card__label">Testimony placeholder</p>
            <blockquote>
              Add a short reflection from a parent, young person or volunteer about what changed
              for them through the programme.
            </blockquote>
          </article>
          <article className="testimony-card">
            <p className="testimony-card__label">Testimony placeholder</p>
            <blockquote>
              Add a second lived experience here to show the human effect of service, friendship
              and accompaniment.
            </blockquote>
          </article>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Contact" title="Start with your neighbourhood">
          <p>
            For general questions, registrations or local activity details, contact the team by
            email or phone.
          </p>
        </SectionHeading>
        <div className="grid grid--4">
          {contactPoints.map((point) => (
            <article className="contact-card" key={point.name}>
              <h3>{point.name}</h3>
              <a href={point.href}>
                <Phone aria-hidden="true" size={18} />
                {point.phone}
              </a>
            </article>
          ))}
        </div>
        <div className="button-row" style={{ marginTop: 24 }}>
          <ButtonLink href={`mailto:${site.email}`} variant="secondary">
            <Mail aria-hidden="true" size={18} />
            Email us
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact details
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
