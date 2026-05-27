/**
 * Demo event + ticket data used until Supabase is wired up.
 * Mirrors the planned database schema so swap-out is straightforward.
 */

import heroImage from "@/assets/grdn-hero.jpg";
import posterImage from "@/assets/event-poster.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gardenMemoryDance from "@/assets/garden-memory-dance.jpg";
import gardenMemoryFire from "@/assets/garden-memory-fire.jpg";
import sunsetMemoryBonfire from "@/assets/sunset-memory-bonfire.jpg";
import sunsetMemoryDance from "@/assets/sunset-memory-dance.jpg";
import bassMemoryStage from "@/assets/bass-memory-stage.jpg";
import bassMemoryVisuals from "@/assets/bass-memory-visuals.jpg";

export interface TicketType {
  id: string;
  name: string;
  description: string;
  priceKes: number;
  benefits: string[];
  badge?: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  guestHandle: string;
  likes: number;
  frame: "portrait" | "square";
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
  galleryPhotos: GalleryPhoto[];
  ticketTypes: TicketType[];
}

export const events: GrdnEvent[] = [
  {
    slug: "the-garden-experience-july-11",
    title: "The Garden Experience",
    tagline: "Experience music, movement and garden energy.",
    description:
      "A summer garden pilgrimage. Live DJ sets, fire dance, swimming, food and drinks — all wrapped inside a secret garden under the Nairobi stars.",
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
    galleryPhotos: [
      {
        src: gardenMemoryDance,
        alt: "Guests dancing beside the garden DJ stage at sunset",
        guestHandle: "@nia",
        likes: 94,
        frame: "portrait",
      },
      {
        src: gallery1,
        alt: "DJ booth glowing over a garden crowd",
        guestHandle: "@gardenke",
        likes: 71,
        frame: "square",
      },
      {
        src: gardenMemoryFire,
        alt: "Fire dance show lighting up the garden poolside crowd",
        guestHandle: "@mali",
        likes: 126,
        frame: "portrait",
      },
      {
        src: gallery3,
        alt: "Friends laughing together inside the garden party",
        guestHandle: "@roamwithrae",
        likes: 58,
        frame: "square",
      },
      {
        src: gallery4,
        alt: "Night pool reflections beneath tropical leaves",
        guestHandle: "@vibecheck",
        likes: 83,
        frame: "portrait",
      },
      {
        src: gallery5,
        alt: "Crowd moving under bright festival lights",
        guestHandle: "@thedrop",
        likes: 112,
        frame: "square",
      },
      {
        src: gallery2,
        alt: "Fire trails captured during the evening performance",
        guestHandle: "@lensandbass",
        likes: 67,
        frame: "portrait",
      },
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
    tagline: "Coastal sound on the Indian Ocean.",
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
    galleryPhotos: [
      {
        src: sunsetMemoryDance,
        alt: "Sunset Sessions guests dancing by the Kilifi shoreline",
        guestHandle: "@coastgroove",
        likes: 88,
        frame: "portrait",
      },
      {
        src: sunsetMemoryBonfire,
        alt: "Beach bonfire dance after the coastal sunset set",
        guestHandle: "@saltandsound",
        likes: 104,
        frame: "portrait",
      },
    ],
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
    slug: "bass-and-bloom-september",
    title: "Bass & Bloom",
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
    activities: ["Deep bass sets", "Late-night kitchen", "Visuals lab"],
    galleryPhotos: [
      {
        src: bassMemoryStage,
        alt: "Warehouse crowd facing the Bass and Bloom DJ stage",
        guestHandle: "@nightfreq",
        likes: 97,
        frame: "portrait",
      },
      {
        src: bassMemoryVisuals,
        alt: "Friends inside the Bass and Bloom visual lab glow",
        guestHandle: "@afterdarkfiles",
        likes: 69,
        frame: "portrait",
      },
    ],
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
