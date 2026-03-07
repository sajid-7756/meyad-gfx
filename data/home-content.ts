import type {
  GalleryItem,
  ServiceItem,
  StatItem,
  TestimonialItem,
} from "@/types/home";

export const heroStats: StatItem[] = [
  { value: "120+", label: "Projects Delivered" },
  { value: "48h", label: "Rush Delivery Option" },
  { value: "4.9/5", label: "Client Satisfaction" },
];

export const services: ServiceItem[] = [
  {
    title: "Brand Identity",
    description:
      "Logo systems, color language, and type direction that scale across every touchpoint.",
  },
  {
    title: "Social Media Design",
    description:
      "High-performance posts, carousels, and ad creatives built for growth and retention.",
  },
  {
    title: "Motion Graphics",
    description:
      "Promotional reels and product teasers with intentional pacing and cinematic transitions.",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    name: "Neon Crest",
    category: "Logo Design",
    image: "/gallery/neon-crest.svg",
  },
  {
    name: "Urban Pulse",
    category: "Poster Design",
    image: "/gallery/urban-pulse.svg",
  },
  {
    name: "Creator Boost",
    category: "Thumbnail Pack",
    image: "/gallery/creator-boost.svg",
  },
  {
    name: "Flash Sale X",
    category: "Banner Design",
    image: "/gallery/flash-sale-x.svg",
  },
  {
    name: "Orbita Cafe",
    category: "Brand Kit",
    image: "/gallery/orbita-cafe.svg",
  },
  {
    name: "HyperFit Drop",
    category: "Campaign Visual",
    image: "/gallery/hyperfit-drop.svg",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    quote:
      "Meyad completely transformed our launch visuals. The campaign looked premium from day one.",
    author: "Rafi Islam",
    role: "Founder, Nova Wear",
  },
  {
    quote:
      "Fast, sharp, and very creative. Every social post looked custom, not template-based.",
    author: "Jannat Tania",
    role: "Marketing Lead, Volt Studio",
  },
  {
    quote:
      "Best design partner we have worked with. Communication and quality were both top-tier.",
    author: "Mahim Chowdhury",
    role: "Owner, Lunar Coffee",
  },
];

export const aboutParagraphs = [
  "I design modern visual systems that help brands look more premium, memorable, and conversion-focused.",
  "My workflow blends strategy, visual storytelling, and motion to create assets that perform on social, web, and ads.",
];
