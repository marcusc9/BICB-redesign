import { CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/data/site";

type EventCardProps = {
  event: EventItem;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="event-card">
      <p className="event-card__type">{event.type}</p>
      <h3>{event.title}</h3>
      <div className="event-card__detail">
        <CalendarDays aria-hidden="true" size={17} />
        <span>{event.date}</span>
      </div>
      <div className="event-card__detail">
        <MapPin aria-hidden="true" size={17} />
        <span>{event.location}</span>
      </div>
      <p>{event.summary}</p>
    </article>
  );
}
