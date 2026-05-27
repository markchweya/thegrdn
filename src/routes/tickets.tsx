import { createFileRoute } from "@tanstack/react-router";
import { TicketCard } from "@/components/grdn/TicketCard";
import { getFeaturedEvent } from "@/data/events";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "THE GRDN" },
      {
        name: "description",
        content: "THE GRDN ticket room. Pick your pass, lock your entry, arrive ready.",
      },
      { property: "og:title", content: "THE GRDN" },
      {
        property: "og:description",
        content: "Pick your pass, lock your entry, arrive ready.",
      },
    ],
  }),
  component: TicketsPage,
});

function TicketsPage() {
  const event = getFeaturedEvent();

  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-grdn-lime mb-4">
          {event.displayDate} · {event.venue}
        </p>
        <h1 className="font-display text-6xl md:text-8xl uppercase leading-none mb-4">
          Choose your <span className="grdn-gradient-text">Pass</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          The gate opens by pass. Pick your tier, keep your QR close, arrive with the right energy.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {event.ticketTypes.map((ticket, i) => (
          <TicketCard key={ticket.id} ticket={ticket} event={event} index={i} />
        ))}
      </section>

      <section className="mt-20 glass rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mb-3">
          Gate protocol
        </p>
        <h2 className="font-display text-3xl uppercase mb-4">
          Lock the pass
        </h2>
        <p className="text-sm text-muted-foreground">
          Your GRDN pass is built for fast entry: choose the tier, confirm payment, carry the QR to the gate.
        </p>
      </section>
    </div>
  );
}
