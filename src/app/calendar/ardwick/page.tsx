import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Ardwick Calendar",
  description: "Weekly activities and upcoming spaces in Ardwick, Manchester."
};

export default function ArdwickCalendarPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <div>
            <p className="eyebrow">Ardwick</p>
            <h1>Monthly calendar of events</h1>
            <p className="page-hero__copy">
              Weekly activities, upcoming events and spaces in Ardwick. Contact the team for more
              information about getting involved.
            </p>
            <ButtonLink external href={site.ardwickCalendar}>
              <CalendarDays aria-hidden="true" size={18} />
              Download calendar
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
