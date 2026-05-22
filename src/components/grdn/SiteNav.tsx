import { Link } from "@tanstack/react-router";
import { useState } from "react";

const navLinks = [
  { to: "/events", label: "Events" },
  { to: "/tickets", label: "Tickets" },
  { to: "/experience", label: "Experience" },
];

/**
 * Sticky top navigation with glass blur background.
 * Mobile: hamburger toggle with full-screen sheet.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b-0">
      <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="font-display text-2xl tracking-tighter hover:text-primary transition-colors"
        >
          THE GRDN
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/tickets"
            className="hidden sm:inline-block px-5 py-2 glass text-[10px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
          >
            Get Tickets
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden glass size-10 grid place-items-center"
          >
            <span className="flex flex-col gap-1">
              <span className="block w-4 h-px bg-foreground" />
              <span className="block w-4 h-px bg-foreground" />
              <span className="block w-4 h-px bg-foreground" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu sheet */}
      {open && (
        <div className="md:hidden glass-strong border-t border-border px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="text-sm font-mono uppercase tracking-widest hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/tickets"
            onClick={() => setOpen(false)}
            className="text-sm font-mono uppercase tracking-widest text-primary"
          >
            Get Tickets →
          </Link>
        </div>
      )}
    </nav>
  );
}
