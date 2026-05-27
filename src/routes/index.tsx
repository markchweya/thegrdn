import { createFileRoute, Link } from "@tanstack/react-router";
import { LoadingExperience } from "@/components/grdn/LoadingExperience";
import { EventCard } from "@/components/grdn/EventCard";
import { events, getFeaturedEvent } from "@/data/events";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE GRDN" },
      {
        name: "description",
        content:
          "THE GRDN by The Garden Ke. Curated nights, ticket drops, living memories.",
      },
      { property: "og:title", content: "THE GRDN" },
      {
        property: "og:description",
        content: "Curated nights, ticket drops, living memories.",
      },
    ],
  }),
  component: HomePage,
});

const galleryImages = [
  { src: gallery1, alt: "DJ booth at sunset" },
  { src: gallery5, alt: "Crowd dancing under stage lights" },
  { src: gallery2, alt: "Fire dancer with spark trails" },
  { src: gallery3, alt: "Friends laughing at a garden party" },
  { src: gallery4, alt: "Pool at night with tropical leaves" },
];

const stickyMoments = [
  {
    label: "01 / Arrival",
    title: "The night has a gate",
    body: "Low light at arrival. Bass in the distance. The first GRDN moment begins before the wristband settles.",
    image: gallery1,
    accent: "var(--primary)",
  },
  {
    label: "02 / Access",
    title: "Access feels intentional",
    body: "Every pass carries its own pace: early bird, regular, VIP, and crew access for the people arriving together.",
    image: gallery2,
    accent: "var(--grdn-lime)",
  },
  {
    label: "03 / Memory",
    title: "Memories stay warm",
    body: "The GRDN vault keeps the night alive: faces, firelight, dancefloor fragments, and the proof that you were there.",
    image: gallery5,
    accent: "var(--grdn-cyan)",
  },
];

function HomePage() {
  const featured = getFeaturedEvent();
  const upcoming = events.filter((e) => e.status === "upcoming");

  return (
    <>
      <LoadingExperience />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-12 pb-24">
        <div className="animate-entrance" style={{ animationDelay: "200ms" }}>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mb-8">
            The Garden Ke presents
          </p>
          <h1 className="font-display text-[18vw] md:text-[15vw] lg:text-[13rem] leading-[0.85] tracking-tighter uppercase mb-6">
            THE <span className="grdn-gradient-text">GRDN</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-balance opacity-80 font-light">
            Curated nights. Open-air energy. Living memories.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-12 animate-entrance"
          style={{ animationDelay: "450ms" }}
        >
          <Link
            to="/tickets"
            className="px-10 py-4 bg-foreground text-background font-display text-xl tracking-wide hover:bg-primary hover:text-primary-foreground transition-all transform hover:scale-105 active:scale-95"
          >
            GET TICKETS
          </Link>
          <Link
            to="/experience"
            className="px-10 py-4 glass font-display text-xl tracking-wide hover:bg-white/10 transition-all"
          >
            ENTER THE EXPERIENCE
          </Link>
        </div>

        <div className="absolute bottom-6 left-6 text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 [writing-mode:vertical-lr] hidden md:block">
          Est. 2024 / Nairobi, Kenya
        </div>
        <div className="absolute bottom-6 right-6 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
          <span
            className="size-2 rounded-full bg-grdn-lime"
            style={{ animation: "grdn-pulse-dot 2s ease-in-out infinite" }}
          />
          Scroll
        </div>
      </section>

      {/* FEATURED EVENT */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center glass p-6 md:p-12 rounded-[2rem] overflow-hidden">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-grdn-lime/20 text-grdn-lime text-[10px] font-mono rounded-full uppercase tracking-widest">
                Featured Experience
              </span>
              <span
                className="size-2 rounded-full bg-primary"
                style={{ animation: "grdn-pulse-dot 2s ease-in-out infinite" }}
              />
            </div>
            <h2 className="font-display text-5xl md:text-7xl mb-4 leading-none uppercase">
              {featured.title}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">{featured.description}</p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  Date
                </div>
                <div className="text-xl font-display tracking-wider">{featured.displayDate}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  Time
                </div>
                <div className="text-xl font-display tracking-wider">
                  {featured.startTime} — {featured.endTime}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
              {featured.activities.map((a) => (
                <span
                  key={a}
                  className="px-3 py-1 border border-border text-xs font-mono uppercase tracking-wider rounded-full"
                >
                  {a}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/events/$slug"
                params={{ slug: featured.slug }}
                className="px-6 py-3 glass font-mono text-xs uppercase tracking-widest hover:bg-white/10"
              >
                View Event
              </Link>
              <Link
                to="/tickets"
                className="px-8 py-3 bg-primary text-primary-foreground font-display text-lg tracking-wide hover:shadow-[0_0_30px_-5px_var(--color-primary)] transition-all"
              >
                Buy Early Bird
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="w-full aspect-square rounded-2xl overflow-hidden">
              <img
                src={featured.heroUrl}
                alt={`${featured.title} hero`}
                width={1600}
                height={1600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STICKY EXPERIENCE STACK */}
      <section className="sticky-story-section relative px-6 py-24 md:py-32 border-y border-border bg-white/[0.015]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
          <div className="absolute left-0 top-24 size-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-0 bottom-24 size-96 rounded-full bg-grdn-cyan/10 blur-3xl" />
        </div>

        <div className="sticky-story-shell relative max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-12">
          <div className="sticky top-20 lg:top-28 h-fit z-20 rounded-2xl bg-background/85 pb-4 pt-2 backdrop-blur-md lg:bg-transparent lg:pb-0 lg:pt-0 lg:backdrop-blur-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-grdn-lime mb-4">
              The GRDN method
            </p>
            <h2 className="font-display text-5xl md:text-7xl uppercase leading-none mb-6">
              The night in <span className="grdn-gradient-text">layers</span>
            </h2>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              THE GRDN moves like the event itself: arrival, access, memory.
              Every scroll should feel closer to the gate.
            </p>
          </div>

          <div className="sticky-story-deck relative space-y-[48vh] pb-[64vh]">
            {stickyMoments.map((moment, index) => (
              <article
                key={moment.label}
                className="sticky-story-card sticky rounded-[1.5rem] overflow-hidden min-h-[72vh] sm:min-h-[620px] md:min-h-[520px] grid md:grid-cols-2 shadow-[0_40px_120px_-70px_var(--color-primary)]"
                style={{
                  top: "clamp(96px, 12vh, 132px)",
                  zIndex: index + 1,
                  "--story-index": index,
                  "--story-count": stickyMoments.length,
                } as React.CSSProperties}
              >
                <div className="relative min-h-[36vh] sm:min-h-[320px] md:min-h-full overflow-hidden">
                  <img
                    src={moment.image}
                    alt={moment.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ backgroundColor: moment.accent }}
                  />
                </div>

                <div className="p-7 md:p-10 flex flex-col justify-between">
                  <div>
                    <p
                      className="text-[10px] font-mono uppercase tracking-[0.35em] mb-5"
                      style={{ color: moment.accent }}
                    >
                      {moment.label}
                    </p>
                    <h3 className="font-display text-4xl md:text-6xl uppercase leading-none mb-5">
                      {moment.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{moment.body}</p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Layer {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="size-3 rounded-full" style={{ backgroundColor: moment.accent }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT CAROUSEL */}
      <section className="py-20 overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-5xl md:text-6xl uppercase leading-none">
              Upcoming Drops
            </h2>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mt-2">
              The next gates opening
            </p>
          </div>
          <Link
            to="/events"
            className="hidden md:inline-block text-xs font-mono uppercase tracking-widest hover:text-primary"
          >
            All events →
          </Link>
        </div>

        <div className="px-6 max-w-7xl mx-auto flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
          {upcoming.map((event) => (
            <div key={event.slug} className="snap-start">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </section>

      {/* THE PROTOCOL */}
      <section className="py-24 bg-white/[0.02] border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-display text-5xl md:text-6xl uppercase">The Protocol</h2>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mt-2">
              From gate to dancefloor
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                num: "01",
                title: "Secure Access",
                body: "Choose your pass, lock it in, and carry THE GRDN on your phone.",
              },
              {
                num: "02",
                title: "Reach The Radius",
                body: "Arrive inside the radius. The night starts revealing itself.",
              },
              {
                num: "03",
                title: "Scan & Sync",
                body: "Scan once. Step through. The garden takes over.",
              },
              {
                num: "04",
                title: "Share Memories",
                body: "The vault opens for the people who were there. The night keeps moving after the venue clears.",
              },
            ].map((step) => (
              <div key={step.num} className="space-y-4 group">
                <div className="font-display text-6xl text-primary/30 group-hover:text-primary transition-colors">
                  {step.num}
                </div>
                <h3 className="font-display text-2xl uppercase tracking-tight">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVING MEMORIES — gallery marquee */}
      <section className="py-32 overflow-hidden">
        <div className="px-6 mb-12 flex flex-col md:flex-row justify-between md:items-end gap-6 max-w-7xl mx-auto">
          <h3 className="font-display text-5xl md:text-6xl leading-none uppercase">
            Living<br />Memories
          </h3>
          <div className="md:text-right">
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2">
              [ Live gallery feed ]
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Faces, flames, pool light, and dancefloor evidence from inside THE GRDN.
            </p>
          </div>
        </div>

        <div className="flex gap-4 animate-marquee w-[200%]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-4 shrink-0">
              {galleryImages.map((img, i) => (
                <div
                  key={`${dup}-${i}`}
                  className="w-[260px] md:w-[300px] aspect-[3/4] rounded-xl overflow-hidden bg-card border border-border"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/experience"
            className="inline-block px-8 py-4 glass font-display text-lg tracking-wide hover:bg-white/10"
          >
            Enter the gallery →
          </Link>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-5xl md:text-6xl uppercase mb-4">
            Follow the <span className="grdn-gradient-text">movement</span>
          </h2>
          <p className="text-muted-foreground mb-10">
            THE GRDN moves online before it opens in real life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/thegardenke/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass font-display text-lg tracking-wide hover:bg-white/10 transition-all"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@the.garden.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass font-display text-lg tracking-wide hover:bg-white/10 transition-all"
            >
              TikTok
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
