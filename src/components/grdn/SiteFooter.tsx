import { Link } from "@tanstack/react-router";

const INSTAGRAM_URL = "https://www.instagram.com/thegardenke/";
const TIKTOK_URL = "https://www.tiktok.com/@the.garden.ke";

/**
 * Minimal footer matching the tropical-nocturne aesthetic.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12 px-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <Link to="/" className="font-display text-3xl tracking-tighter">
          THE GRDN
        </Link>
        <div className="flex flex-wrap gap-8 md:gap-12 justify-center text-[10px] font-mono uppercase tracking-[0.2em] opacity-70">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Instagram
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            TikTok
          </a>
          <Link to="/events" className="hover:text-primary transition-colors">
            Events
          </Link>
          <Link to="/tickets" className="hover:text-primary transition-colors">
            Tickets
          </Link>
        </div>
        <div className="text-[10px] font-mono opacity-50 text-center md:text-right">
          © {new Date().getFullYear()} THE GARDEN KE.<br className="md:hidden" />
          {" "}ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
