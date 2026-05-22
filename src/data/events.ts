/**
 * Demo event + ticket data used until Supabase is wired up.
 * Mirrors the planned database schema so swap-out is straightforward.
 */

import heroImage from "@/assets/grdn-hero.jpg";
import posterImage from "@/assets/event-poster.jpg";

export interface TicketType {
  id: string;
  name: string;
  description: string;
  priceKes: number;
  benefits: string[];
  badge?: string;
}

export interface GrdnEvent {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  date: string;             // ISO yyyy-mm-dd
  displayDate: string;      // human-readable
  startTime: string;
  endTime: string;
  venue: string;
  city: string;
  posterUrl: string;
  heroUrl: string;
  status: "upcoming" | "past";
  isFeatured: boolean;
  activities: string[];
  ticketTypes: TicketType[];
}

export const events: GrdnEvent[] = [
  {
    slug: "the-garden-experience-july-11",
    title: "The Garden Experience",
    tagline: "Experience Afro-house, tech and beats.",
    description:
      "A summer Afro-house pilgrimage. Live DJ sets, fire dance, swimming, food and drinks — all wrapped inside a secret garden under the Nairobi stars.",
    date: "2026-07-11",
    displayDate: "July 11, 2026",
    startTime: "15:00",
    endTime: "22:00",
    venue: "Secret Garden",
    city: "Nairobi, Kenya",
    posterUrl: posterImage,
    heroUrl: heroImage,
    status: "upcoming",
    isFeatured: true,
    activities: [
      "Live DJ Performances",
      "Food & Drinks",
      "Summer Activities",
      "Swimming",
      "Fire Dance Show",
    ],
    ticketTypes: [
      {
        id: "early-bird",
        name: "Early Bird",
        description: "Limited early access ticket.",
        priceKes: 1000,
        benefits: ["Event entry", "Shared gallery access", "QR ticket"],
      },
      {
        id: "regular",
        name: "Regular",
        description: "The full experience.",
        priceKes: 1500,
        benefits: ["Event entry", "Shared gallery", "Welcome drink", "QR ticket"],
        badge: "Most popular",
      },
      {
        id: "vip",
        name: "VIP",
        description: "Elevated experience for guests who want more.",
        priceKes: 3000,
        benefits: ["VIP entry", "Priority access", "Lounge access", "Gift bag"],
      },
      {
        id: "group",
        name: "Group Pass",
        description: "Roll with your people.",
        priceKes: 5000,
        benefits: ["Entry for 5", "Reserved table", "Bottle service"],
      },
    ],
  },
  {
    slug: "sunset-sessions-august",
    title: "Sunset Sessions",
    tagline: "Coastal Afro-house on the Indian Ocean.",
    description: "A beachfront edition of THE GRDN. Sand, sound and a saltwater sunset.",
    date: "2026-08-24",
    displayDate: "August 24, 2026",
    startTime: "16:00",
    endTime: "23:00",
    venue: "Coastline Bandstand",
    city: "Kilifi, Kenya",
    posterUrl: posterImage,
    heroUrl: heroImage,
    status: "upcoming",
    isFeatured: false,
    activities: ["Sunset DJ sets", "Coastal food", "Bonfire after-hours"],
    ticketTypes: [
      {
        id: "regular",
        name: "Regular",
        description: "Standard entry.",
        priceKes: 2000,
        benefits: ["Event entry", "Shared gallery"],
      },
      {
        id: "vip",
        name: "VIP",
        description: "VIP lounge.",
        priceKes: 4000,
        benefits: ["VIP entry", "Lounge", "Welcome drink"],
      },
    ],
  },
  {
    slug: "tech-and-bass-september",
    title: "Tech & Bass",
    tagline: "Underground frequencies, after dark.",
    description: "A late-night warehouse edition. Low light, deep bass, no compromise.",
    date: "2026-09-02",
    displayDate: "September 2, 2026",
    startTime: "22:00",
    endTime: "04:00",
    venue: "Industrial Yard 9",
    city: "Nairobi, Kenya",
    posterUrl: posterImage,
    heroUrl: heroImage,
    status: "upcoming",
    isFeatured: false,
    activities: ["Tech-house sets", "Late-night kitchen", "Visuals lab"],
    ticketTypes: [
      {
        id: "regular",
        name: "Regular",
        description: "All-night access.",
        priceKes: 1800,
        benefits: ["Entry", "Shared gallery"],
      },
    ],
  },
];

export function getEventBySlug(slug: string): GrdnEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getFeaturedEvent(): GrdnEvent {
  return events.find((e) => e.isFeatured) ?? events[0];
}
