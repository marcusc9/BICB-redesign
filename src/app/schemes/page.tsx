import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { registrationLinks, schemes } from "@/data/site";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Schemes",
  description:
    "Holiday activities and volunteering opportunities for children and teens in Ardwick and Moss Side."
};

export default function SchemesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <div>
            <p className="eyebrow">Holiday activities</p>
            <h1>{schemes.title}</h1>
            <p className="page-hero__copy">{schemes.summary}</p>
            <div className="button-row">
              <ButtonLink external href={registrationLinks.schemes}>
                Register
              </ButtonLink>
              <ButtonLink external href={registrationLinks.schemesVolunteer} variant="secondary">
                Volunteer
              </ButtonLink>
            </div>
          </div>
          <div className="page-hero__image">
            <Image
              alt="Summer Schemes poster and activities"
              className="image-contain"
              fill
              priority
              sizes="(max-width: 920px) 100vw, 44vw"
              src={withBasePath(schemes.image)}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Locations" title="Where schemes are running" />
        <div className="grid grid--2">
          {schemes.locations.map((location) => (
            <article className="info-card scheme-location" key={location.name}>
              <h3>{location.name}</h3>
              <div className="scheme-location__meta">
                <span>{location.dates}</span>
                {location.time ? <span>{location.time}</span> : null}
                {location.place ? <span>{location.place}</span> : null}
                {location.contact ? <span>Contact {location.contact}</span> : null}
              </div>
              {location.whatsapp ? (
                <ButtonLink external href={location.whatsapp} variant="secondary">
                  <MessageCircle aria-hidden="true" size={18} />
                  Chat on WhatsApp
                </ButtonLink>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
