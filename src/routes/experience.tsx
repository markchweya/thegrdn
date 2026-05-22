import { createFileRoute, Link } from "@tanstack/react-router";
import { events } from "@/data/events";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "The Experience — THE GRDN" },
      {
        name: "description",
        content: "The shared gallery of THE GRDN. Memories captured by the people inside the garden.",
      },
      { property: "og:title", content: "The Experience — THE GRDN" },
      {
        property: "og:description",
        content: "Buy a ticket. Scan in. Share the moment.",
      },
    ],
  }),
  component: ExperiencePage,
});

const photos = [gallery1, gallery5, gallery2, gallery3, gallery4, gallery1, gallery5, gallery2];

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
        <div className="flex gap-3 flex-wrap">
          {events.map((event) => (
            <Link
              key={event.slug}
              to="/experience/$slug"
              params={{ slug: event.slug }}
              className="px-5 py-3 glass rounded-full text-sm hover:bg-white/10 transition-all"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mr-2">
                {event.displayDate}
              </span>
              {event.title}
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
          {photos.map((src, i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden bg-card border border-border ${
                i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <img
                src={src}
                alt={`Memory ${i + 1}`}
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
