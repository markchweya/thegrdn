import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { getEventBySlug, type GrdnEvent, type TicketType } from "@/data/events";

const checkoutSearchSchema = z.object({
  event: z.string().optional(),
  ticket: z.string().optional(),
});

export const Route = createFileRoute("/checkout")({
  validateSearch: checkoutSearchSchema,
  head: () => ({
    meta: [
      { title: "THE GRDN" },
      { name: "description", content: "Lock your THE GRDN pass and meet us at the gate." },
    ],
  }),
  component: CheckoutPage,
});

type PaymentStatus = "idle" | "initiating" | "waiting" | "success" | "failed";

function CheckoutPage() {
  const { event: eventSlug, ticket: ticketId } = Route.useSearch();

  const event: GrdnEvent | undefined = eventSlug ? getEventBySlug(eventSlug) : undefined;
  const ticket: TicketType | undefined =
    event && ticketId ? event.ticketTypes.find((item) => item.id === ticketId) : undefined;

  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<PaymentStatus>("idle");

  if (!event || !ticket) {
    return (
      <div className="px-6 py-32 text-center max-w-md mx-auto">
        <h1 className="font-display text-4xl uppercase mb-4">Choose a pass first</h1>
        <p className="text-muted-foreground mb-6">
          The gate needs a pass. Pick your tier, then return to checkout.
        </p>
        <Link
          to="/tickets"
          className="inline-block px-6 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest"
        >
          See passes
        </Link>
      </div>
    );
  }

  const total = ticket.priceKes * quantity;

  const handlePay = async (eventObject: React.FormEvent) => {
    eventObject.preventDefault();
    setStatus("initiating");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("waiting");
    await new Promise((resolve) => setTimeout(resolve, 2200));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="px-6 py-24 max-w-2xl mx-auto text-center">
        <div className="glass rounded-2xl p-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-grdn-lime/20 text-grdn-lime text-[10px] font-mono uppercase tracking-widest rounded-full mb-6">
            Pass confirmed
          </div>
          <h1 className="font-display text-5xl uppercase mb-4">You're on the list.</h1>
          <p className="text-muted-foreground mb-8">
            Your GRDN pass is on its way to {email || phone}.
          </p>

          <div className="mx-auto size-48 grid place-items-center bg-foreground text-background rounded-2xl mb-8 font-mono text-[10px] tracking-widest uppercase">
            QR / {ticket.id.toUpperCase()}
          </div>

          <div className="text-left space-y-2 mb-8 font-mono text-xs uppercase tracking-widest">
            <div className="flex justify-between"><span className="text-muted-foreground">Night</span><span>{event.title}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Pass</span><span>{ticket.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Qty</span><span>x{quantity}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span>KES {total.toLocaleString()}</span></div>
          </div>

          <Link
            to="/experience"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-display text-lg tracking-wide"
          >
            Enter the vault
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-20 max-w-5xl mx-auto">
      <Link
        to="/tickets"
        className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-6 inline-block"
      >
        Back to passes
      </Link>

      <h1 className="font-display text-5xl md:text-6xl uppercase mb-12">Gate checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <form onSubmit={handlePay} className="lg:col-span-2 glass rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Full name
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(eventObject) => setName(eventObject.target.value)}
              maxLength={100}
              className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary rounded-lg"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Email for pass delivery
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(eventObject) => setEmail(eventObject.target.value)}
              maxLength={255}
              className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary rounded-lg"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              M-Pesa phone number
            </label>
            <input
              required
              type="tel"
              placeholder="254712345678"
              value={phone}
              onChange={(eventObject) => setPhone(eventObject.target.value)}
              pattern="^254[0-9]{9}$"
              className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-primary rounded-lg font-mono"
            />
            <p className="text-[10px] font-mono text-muted-foreground mt-2">
              Format: 2547XXXXXXXX
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="size-10 glass rounded-lg hover:bg-white/10"
                aria-label="Decrease"
              >
                -
              </button>
              <span className="font-display text-3xl w-12 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                className="size-10 glass rounded-lg hover:bg-white/10"
                aria-label="Increase"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={status !== "idle"}
            className="w-full px-6 py-5 bg-primary text-primary-foreground font-display text-xl tracking-wide hover:shadow-[0_0_40px_-10px_var(--color-primary)] transition-all disabled:opacity-60 disabled:cursor-not-allowed rounded-lg"
          >
            {status === "idle" && `Lock pass - KES ${total.toLocaleString()}`}
            {status === "initiating" && "Opening the gate..."}
            {status === "waiting" && "Confirm on your phone"}
            {status === "failed" && "Retry payment"}
          </button>

          {status === "waiting" && (
            <p className="text-xs text-center text-grdn-cyan font-mono uppercase tracking-widest animate-pulse">
              Holding your place at the gate...
            </p>
          )}
        </form>

        <aside className="glass rounded-2xl p-8 h-fit space-y-6">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Night
            </div>
            <div className="font-display text-2xl uppercase">{event.title}</div>
            <div className="text-sm text-muted-foreground">{event.displayDate}</div>
          </div>
          <div className="border-t border-border pt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>{ticket.name} x {quantity}</span>
              <span className="font-mono">KES {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-display text-2xl pt-4 border-t border-border mt-4">
              <span>Total</span>
              <span>KES {total.toLocaleString()}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
