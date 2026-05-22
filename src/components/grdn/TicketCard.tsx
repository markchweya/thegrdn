import { Link } from "@tanstack/react-router";
import type { TicketType, GrdnEvent } from "@/data/events";

interface TicketCardProps {
  ticket: TicketType;
  event: GrdnEvent;
  index: number;
}

/**
 * Ticket tier card with benefits list and "Buy with M-Pesa" CTA.
 */
export function TicketCard({ ticket, event, index }: TicketCardProps) {
  const isFeatured = !!ticket.badge;

  return (
    <div
      className={`relative p-8 flex flex-col h-full transition-all duration-500 ${
        isFeatured
          ? "bg-primary text-primary-foreground rounded-2xl shadow-[0_0_60px_-15px_var(--color-primary)]"
          : "glass rounded-2xl hover:bg-white/[0.06]"
      }`}
    >
      {ticket.badge && (
        <span className="absolute top-4 right-4 px-2 py-1 bg-background text-foreground text-[9px] font-mono uppercase tracking-widest rounded-full">
          {ticket.badge}
        </span>
      )}

      <div className={`text-[10px] font-mono uppercase tracking-widest mb-3 ${isFeatured ? "opacity-80" : "text-muted-foreground"}`}>
        Tier 0{index + 1}
      </div>

      <h3 className="font-display text-3xl uppercase leading-none mb-2">{ticket.name}</h3>
      <p className={`text-sm mb-6 ${isFeatured ? "opacity-80" : "text-muted-foreground"}`}>
        {ticket.description}
      </p>

      <ul className="space-y-2 mb-8 flex-1">
        {ticket.benefits.map((b) => (
          <li key={b} className="text-sm flex items-start gap-2">
            <span className={isFeatured ? "text-primary-foreground/70" : "text-grdn-cyan"}>—</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mb-6">
        <div className={`text-xs font-mono uppercase tracking-widest mb-1 ${isFeatured ? "opacity-70" : "text-muted-foreground"}`}>
          Price
        </div>
        <div className="font-display text-4xl">
          KES {ticket.priceKes.toLocaleString()}
        </div>
      </div>

      <Link
        to="/checkout"
        search={{ event: event.slug, ticket: ticket.id }}
        className={`block text-center px-6 py-4 font-display text-lg tracking-wide transition-all ${
          isFeatured
            ? "bg-background text-foreground hover:bg-foreground hover:text-background"
            : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
        }`}
      >
        Buy with M-Pesa
      </Link>
    </div>
  );
}
