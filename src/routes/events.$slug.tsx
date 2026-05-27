import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getEventBySlug, type GrdnEvent } from "@/data/events";
import { TicketCard } from "@/components/grdn/TicketCard";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = getEventBySlug(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: "THE GRDN" },
          { name: "description", content: loaderData.event.description },
          { property: "og:title", content: "THE GRDN" },
          { property: "og:description", content: loaderData.event.tagline },
          { property: "og:image", content: loaderData.event.posterUrl },
        ]
      : [],
  }),
  component: SingleEventPage,
  notFoundComponent: () => (
    <div className="px-6 py-32 text-center max-w-md mx-auto">
      <h1 className="font-display text-5xl uppercase mb-4">Event not found</h1>
      <p className="text-muted-foreground mb-6">This event is no longer in the garden.</p>
      <Link to="/events" className="text-primary font-mono text-xs uppercase tracking-widest">
        ← All events
      </Link>
    </div>
  ),
});

function SingleEventPage() {
  const { event } = Route.useLoaderData() as { event: GrdnEvent };

  return (
    <article>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <img
          src={event.heroUrl}
          alt={`${event.title} stage`}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative z-10 px-6 py-16 max-w-7xl mx-auto w-full">
          <Link
            to="/events"
            className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-6 inline-block"
          >
            ← All events
          </Link>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-grdn-lime mb-4">
            {event.displayDate} · {event.startTime} — {event.endTime}
          </p>
          <h1 className="font-display text-6xl md:text-9xl uppercase leading-[0.85]">
            {event.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-xl">
            {event.tagline}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="font-display text-3xl uppercase mb-4">The Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{event.description}</p>
          </div>

          <div>
            <h2 className="font-display text-3xl uppercase mb-4">What's Inside</h2>
            <div className="flex flex-wrap gap-3">
              {event.activities.map((a) => (
                <span
                  key={a}
                  className="px-4 py-2 glass text-sm font-mono uppercase tracking-wider rounded-full"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="glass p-6 rounded-2xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Venue
            </div>
            <div className="font-display text-2xl uppercase">{event.venue}</div>
            <div className="text-sm text-muted-foreground">{event.city}</div>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Doors open
            </div>
            <div className="font-display text-2xl">{event.startTime}</div>
          </div>
          <Link
            to="/tickets"
            className="block w-full text-center px-6 py-5 bg-primary text-primary-foreground font-display text-xl tracking-wide hover:shadow-[0_0_40px_-10px_var(--color-primary)] transition-all rounded-2xl"
          >
            Get Tickets →
          </Link>
        </aside>
      </section>

      {/* Tickets */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl uppercase mb-10">Choose your ticket</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {event.ticketTypes.map((ticket, i) => (
            <TicketCard key={ticket.id} ticket={ticket} event={event} index={i} />
          ))}
        </div>
      </section>
    </article>
  );
}
