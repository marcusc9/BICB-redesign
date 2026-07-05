import type { Metadata } from "next";
import { Camera, Mail, Phone } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { contactPoints, registrationLinks, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Bahá'í Institute for Community Building in Manchester and register for children's classes, junior youth groups or volunteering."
};

const registrationCards = [
  {
    title: "Children's Classes",
    text: "For parents or guardians registering a child aged 5-10.",
    href: registrationLinks.children
  },
  {
    title: "Junior Youth Groups",
    text: "For young people aged 11-15 joining a junior youth group.",
    href: registrationLinks.juniorYouth
  },
  {
    title: "Youth Volunteers",
    text: "For youth interested in training and service.",
    href: registrationLinks.youthVolunteers
  },
  {
    title: "Adult Volunteers",
    text: "For adults and families who want to support local activities.",
    href: registrationLinks.adults
  }
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <div>
            <p className="eyebrow">Contact</p>
            <h1>Get in touch with us</h1>
            <p className="page-hero__copy">
              Contact the team to learn about ongoing activities, upcoming events, registrations or
              volunteering in your neighbourhood.
            </p>
            <div className="button-row">
              <ButtonLink href={`mailto:${site.email}`}>
                <Mail aria-hidden="true" size={18} />
                Email us
              </ButtonLink>
              <ButtonLink external href={site.instagram} variant="secondary">
                <Camera aria-hidden="true" size={18} />
                Instagram
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Neighbourhood contacts" title="Speak with a local contact" />
        <div className="contact-list">
          {contactPoints.map((point) => (
            <article className="contact-card" key={point.name}>
              <h3>{point.name}</h3>
              {point.note ? <p>{point.note}</p> : null}
              <a href={point.href}>
                <Phone aria-hidden="true" size={18} />
                {point.phone}
              </a>
            </article>
          ))}
          <article className="contact-card">
            <h3>Email</h3>
            <p>For general questions and registration support.</p>
            <a href={`mailto:${site.email}`}>
              <Mail aria-hidden="true" size={18} />
              {site.email}
            </a>
          </article>
        </div>
      </section>

      <section className="section section--band">
        <div className="section__inner">
          <SectionHeading eyebrow="Registration" title="Choose the right form">
            <p>
              These forms remain with the existing providers for now so sensitive details are not
              stored in the website codebase.
            </p>
          </SectionHeading>
          <div className="grid grid--4">
            {registrationCards.map((card) => (
              <article className="info-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <ButtonLink external href={card.href} variant="secondary">
                  Register
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
