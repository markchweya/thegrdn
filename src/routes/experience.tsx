import { createFileRoute, Link } from "@tanstack/react-router";
import { events } from "@/data/events";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "THE GRDN" },
      {
        name: "description",
        content: "The shared gallery of THE GRDN. Memories captured by the people inside the garden.",
      },
      { property: "og:title", content: "THE GRDN" },
      {
        property: "og:description",
        content: "Buy a ticket. Scan in. Share the moment.",
      },
    ],
  }),
  component: ExperiencePage,
});

const photos = events.flatMap((event) =>
  event.galleryPhotos.slice(0, 3).map((photo) => ({
    ...photo,
    eventTitle: event.title,
  })),
);

function ExperiencePage() {
  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      <header className="mb-16 max-w-3xl">
        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-grdn-lime mb-4">
          The shared vault
        </p>
        <h1 className="font-display text-6xl md:text-8xl uppercase leading-none mb-6">
          The <span className="grdn-gradient-text">Experience</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Memories captured from inside the garden. Posting unlocks at the venue.
          Viewing stays open forever.
        </p>
      </header>

      {/* Event group selector */}
      <section className="mb-16">
        <h2 className="font-display text-2xl uppercase text-muted-foreground mb-6">
          Pick an event
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.slug}
              to="/experience/$slug"
              params={{ slug: event.slug }}
              className="glass group overflow-hidden rounded-xl transition-transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={event.galleryPhotos[0].src}
                  alt={event.galleryPhotos[0].alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {event.displayDate}
                </span>
                <div className="mt-2 font-display text-2xl uppercase">{event.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sample wall */}
      <section>
        <h2 className="font-display text-2xl uppercase text-muted-foreground mb-6">
          Recent memories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <div
              key={`${photo.eventTitle}-${photo.src}`}
              className={`rounded-xl overflow-hidden bg-card border border-border ${
                photo.frame === "portrait" || i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Geofence callout */}
      <section className="mt-20 glass rounded-2xl p-8 md:p-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-grdn-lime/20 text-grdn-lime text-[10px] font-mono uppercase tracking-widest rounded-full mb-6">
          <span className="size-1.5 rounded-full bg-grdn-lime" />
          Geofence active
        </div>
        <h3 className="font-display text-3xl md:text-4xl uppercase mb-4">
          Posting unlocks at the venue
        </h3>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Buy a ticket. Scan the gate QR. We'll confirm you're inside the garden — then your camera unlocks
          to the event group. View memories anywhere, anytime, even after you leave.
        </p>
      </section>
    </div>
  );
}
