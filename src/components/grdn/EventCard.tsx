import { Link } from "@tanstack/react-router";
import type { GrdnEvent } from "@/data/events";

interface EventCardProps {
  event: GrdnEvent;
}

/**
 * Horizontal card used in the events carousel and grid.
 */
export function EventCard({ event }: EventCardProps) {
  const lowestPrice = Math.min(...event.ticketTypes.map((t) => t.priceKes));

  return (
    <Link
      to="/events/$slug"
      params={{ slug: event.slug }}
      className="group block shrink-0 w-[280px] md:w-[320px]"
    >
      <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 relative bg-card border border-border">
        <img
          src={event.posterUrl}
          alt={`Poster for ${event.title}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute top-4 left-4 px-3 py-1 glass text-[10px] font-mono uppercase tracking-widest">
          {event.status === "upcoming" ? "Upcoming" : "Past"}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
            {event.displayDate}
          </div>
          <div className="font-display text-3xl leading-none uppercase tracking-tight">
            {event.title}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-baseline text-sm">
        <span className="text-muted-foreground">{event.city}</span>
        <span className="font-mono text-xs text-primary">
          FROM KES {lowestPrice.toLocaleString()}
        </span>
      </div>
    </Link>
  );
}
