import { createFileRoute } from "@tanstack/react-router";
import { TicketCard } from "@/components/grdn/TicketCard";
import { getFeaturedEvent } from "@/data/events";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Tickets — THE GRDN" },
      {
        name: "description",
        content: "Buy your ticket into THE GRDN. Early Bird, Regular, VIP and Group passes via M-Pesa.",
      },
      { property: "og:title", content: "Tickets — THE GRDN" },
      {
        property: "og:description",
        content: "Your ticket into the experience. Pay with M-Pesa.",
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
          Your <span className="grdn-gradient-text">Ticket</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Pay with M-Pesa. Receive your QR ticket instantly. Scan in at the gate.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {event.ticketTypes.map((ticket, i) => (
          <TicketCard key={ticket.id} ticket={ticket} event={event} index={i} />
        ))}
      </section>

      <section className="mt-20 glass rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mb-3">
          Secure checkout
        </p>
        <h2 className="font-display text-3xl uppercase mb-4">
          Paying with M-Pesa
        </h2>
        <p className="text-sm text-muted-foreground">
          Select a tier, enter your Safaricom number, and confirm the STK Push prompt on your phone.
          Your QR ticket arrives the moment payment confirms.
        </p>
      </section>
    </div>
  );
}
