import { createFileRoute } from "@tanstack/react-router";
import { EventCard } from "@/components/grdn/EventCard";
import { events } from "@/data/events";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "THE GRDN" },
      {
        name: "description",
        content: "Upcoming and past events from The Garden Ke. Drops, festivals and after-hours.",
      },
      { property: "og:title", content: "THE GRDN" },
      {
        property: "og:description",
        content: "All upcoming and past events from The Garden Ke.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const upcoming = events.filter((e) => e.status === "upcoming");

  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      <header className="mb-16">
        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mb-4">
          The Calendar
        </p>
        <h1 className="font-display text-6xl md:text-8xl uppercase leading-none">
          All <span className="grdn-gradient-text">Events</span>
        </h1>
      </header>

      <section className="mb-20">
        <h2 className="font-display text-2xl uppercase tracking-wider mb-8 text-muted-foreground">
          Upcoming
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcoming.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
