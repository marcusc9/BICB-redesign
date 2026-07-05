import type { Metadata } from "next";
import { EventCard } from "@/components/event-card";
import { SectionHeading } from "@/components/section-heading";
import { eventArchive } from "@/data/site";

export const metadata: Metadata = {
  title: "Event Archive",
  description:
    "Archived camps, conferences, seminars and festivals from the Bahá'í Institute for Community Building in Manchester."
};

export default function EventArchivePage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <div>
            <p className="eyebrow">Archive</p>
            <h1>Past camps, conferences and festivals</h1>
            <p className="page-hero__copy">
              A compact archive of historical event pages from the previous Wix site.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading title="Event archive">
          <p>
            These entries preserve the public record of previous gatherings while keeping the new
            site focused on current activities.
          </p>
        </SectionHeading>
        <div className="grid grid--3">
          {eventArchive.map((event) => (
            <EventCard event={event} key={event.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
