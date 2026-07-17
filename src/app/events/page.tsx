import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { EventCard } from "@/components/event-card";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { eventArchive, schemes } from "@/data/site";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Current events, schemes, camps, festivals and training spaces from the Bahá'í Institute for Community Building in Manchester."
};

export default function EventsPage() {
  return (
    <>
      <div className="events-hero">
        <Hero
          copy="Alongside weekly activities, the community building process includes larger spaces for prayer, food, learning, service and family life."
          eyebrow="Events"
          image="/images/events-hero.jpg"
          imageAlt="Children enjoying an outdoor team activity together"
          primaryCta={{ label: "Explore events", href: "#weekly-activities" }}
          secondaryCta={{ label: "Event archive", href: "/events/archive" }}
          title="Weekly activities, holiday schemes, camps and events"
        />
      </div>

      <section className="section" id="weekly-activities">
        <SectionHeading eyebrow="What is happening" title="Ways to take part throughout the year">
          <p>
            Find regular neighbourhood activities, school-holiday programmes, residential camps
            and one-off gatherings in one place.
          </p>
        </SectionHeading>
        <div className="grid grid--2 event-category-grid">
          <article className="info-card event-category-card">
            <p className="eyebrow">Every week</p>
            <h3>Weekly activities</h3>
            <p>Children&apos;s classes, junior youth groups, study circles and opportunities to serve.</p>
            <ButtonLink href="/programmes" variant="secondary">Explore programmes</ButtonLink>
          </article>
          <article className="info-card event-category-card">
            <p className="eyebrow">School holidays</p>
            <h3>Holiday schemes</h3>
            <p>{schemes.summary}</p>
            <ButtonLink href="/schemes" variant="secondary">View holiday schemes</ButtonLink>
          </article>
          <article
            className="info-card event-category-card event-category-card--with-image"
            id="residential-camps"
          >
            <div className="event-category-card__media">
              <Image
                alt="Young people walking together through the countryside during a residential camp"
                fill
                sizes="(max-width: 920px) 100vw, 50vw"
                src={withBasePath("/images/residential-camps.jpg")}
              />
            </div>
            <div className="event-category-card__body">
              <h3>Residential camps</h3>
              <p>Shared spaces for learning, friendship, consultation and building capacity for service.</p>
              <ButtonLink href="/events/archive" variant="secondary">Browse recent camps</ButtonLink>
            </div>
          </article>
          <article className="info-card event-category-card" id="other-events">
            <p className="eyebrow">Gatherings</p>
            <h3>Other events</h3>
            <p>Festivals, seminars, conferences and neighbourhood gatherings across Manchester.</p>
            <ButtonLink href="/events/archive" variant="secondary">Browse other events</ButtonLink>
          </article>
        </div>
      </section>

      <section className="section section--band">
        <div className="section__inner">
          <SectionHeading eyebrow="Archive" title="Recent camps and gatherings">
            <p>
              Historical Wix event URLs redirect here so visitors do not land on broken pages after
              the move to Vercel.
            </p>
          </SectionHeading>
          <div className="grid grid--3">
            {eventArchive.slice(0, 6).map((event) => (
              <EventCard event={event} key={event.slug} />
            ))}
          </div>
          <div className="button-row" style={{ marginTop: 28 }}>
            <ButtonLink href="/events/archive" variant="secondary">
              Browse archive
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
