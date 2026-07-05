import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { EventCard } from "@/components/event-card";
import { SectionHeading } from "@/components/section-heading";
import { eventArchive, schemes } from "@/data/site";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Current events, schemes, camps, festivals and training spaces from the Bahá'í Institute for Community Building in Manchester."
};

export default function EventsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <div>
            <p className="eyebrow">Events</p>
            <h1>Camps, festivals, seminars and community spaces</h1>
            <p className="page-hero__copy">
              Alongside weekly activities, the community building process includes larger spaces for
              prayer, food, learning, service and family life.
            </p>
            <div className="button-row">
              <ButtonLink href="/schemes">Current schemes</ButtonLink>
              <ButtonLink href="/events/archive" variant="secondary">
                Event archive
              </ButtonLink>
            </div>
          </div>
          <div className="page-hero__image">
            <Image
              alt="Friends gathered for a community building event"
              fill
              priority
              sizes="(max-width: 920px) 100vw, 44vw"
              src="/images/community-event.jpg"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div>
            <SectionHeading eyebrow="Upcoming" title="Current listing" />
            <p className="lead">
              There are no standalone event listings at the moment. The current public activity focus
              is the Summer Schemes programme.
            </p>
          </div>
          <article className="info-card">
            <h3>{schemes.title}</h3>
            <p>{schemes.summary}</p>
            <ButtonLink href="/schemes" variant="secondary">
              View scheme details
            </ButtonLink>
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
