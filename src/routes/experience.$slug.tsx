import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getEventBySlug, type GrdnEvent } from "@/data/events";

export const Route = createFileRoute("/experience/$slug")({
  loader: ({ params }) => {
    const event = getEventBySlug(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.event.title} - Gallery - THE GRDN` },
          {
            name: "description",
            content: `Shared memories from ${loaderData.event.title}.`,
          },
        ]
      : [],
  }),
  component: EventGalleryPage,
});

function EventGalleryPage() {
  const { event } = Route.useLoaderData() as { event: GrdnEvent };

  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      <Link
        to="/experience"
        className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-6 inline-block"
      >
        Back to all experiences
      </Link>

      <header className="mb-12">
        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-grdn-lime mb-4">
          {event.displayDate} / {event.venue}
        </p>
        <h1 className="font-display text-5xl md:text-7xl uppercase leading-none mb-4">
          {event.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Memories captured from inside the garden.
        </p>
      </header>

      <div className="glass rounded-2xl p-6 mb-12 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
            Posting status
          </div>
          <div className="font-display text-xl uppercase">View only</div>
          <p className="text-xs text-muted-foreground mt-1">
            Posting unlocks when you scan the gate QR from inside the venue.
          </p>
        </div>
        <button
          type="button"
          className="px-5 py-3 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest rounded-lg hover:shadow-[0_0_30px_-10px_var(--color-primary)] transition-all"
        >
          Scan gate QR
        </button>
      </div>

      <section className="columns-2 md:columns-3 lg:columns-4 gap-3 [&>*]:mb-3">
        {event.galleryPhotos.map((photo) => (
          <div
            key={`${event.slug}-${photo.src}`}
            className="break-inside-avoid rounded-xl overflow-hidden bg-card border border-border group relative"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-background/80 to-transparent flex justify-between items-end text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-muted-foreground">{photo.guestHandle}</span>
              <span className="flex items-center gap-1 text-primary">Heart {photo.likes}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
