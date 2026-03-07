import type { ContactMessage, FooterLink, DashboardStats } from "@/types/dashboard";

export const contactMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Arif Rahman",
    email: "arif@novatech.io",
    projectType: "Brand Identity",
    message:
      "We are launching a new SaaS product next month and need a complete brand identity — logo, colors, typography, and social media kit. Can you handle the full scope?",
    date: "2026-03-06",
    read: false,
  },
  {
    id: "msg-2",
    name: "Tasnia Haque",
    email: "tasnia@lunaredge.co",
    projectType: "Social Media Design",
    message:
      "Looking for a designer to create 30 Instagram post templates and 10 story templates for our fitness brand. Need it within two weeks.",
    date: "2026-03-05",
    read: false,
  },
  {
    id: "msg-3",
    name: "Imran Hossain",
    email: "imran@freshbites.com",
    projectType: "Motion Graphics",
    message:
      "We want a 30-second promotional reel for our restaurant launch. Should include menu highlights, ambiance shots, and a strong call to action.",
    date: "2026-03-03",
    read: true,
  },
  {
    id: "msg-4",
    name: "Nusrat Jahan",
    email: "nusrat@craftlyshop.com",
    projectType: "Logo Design",
    message:
      "I need a minimalist logo for my handmade jewelry brand. Something elegant with a feminine touch. Budget is flexible for the right design.",
    date: "2026-02-28",
    read: true,
  },
  {
    id: "msg-5",
    name: "Sakib Uddin",
    email: "sakib@voltgaming.gg",
    projectType: "Thumbnail Pack",
    message:
      "Need a set of 20 YouTube thumbnail templates for a gaming channel. Bold, high-contrast style with text-heavy layouts.",
    date: "2026-02-25",
    read: true,
  },
  {
    id: "msg-6",
    name: "Mim Akter",
    email: "mim@glowbeauty.bd",
    projectType: "Campaign Visual",
    message:
      "Planning a Ramadan campaign for our beauty brand. Need hero banners, social posts, and email header graphics. Deadline is tight — 10 days.",
    date: "2026-02-20",
    read: true,
  },
];

export const footerLinks: FooterLink[] = [
  { id: "fl-1", label: "Instagram", href: "https://instagram.com", type: "social", icon: "instagram" },
  { id: "fl-2", label: "Facebook", href: "https://facebook.com", type: "social", icon: "facebook" },
  { id: "fl-3", label: "Behance", href: "https://behance.net", type: "social", icon: "globe" },
  { id: "fl-4", label: "About", href: "#about", type: "nav" },
  { id: "fl-5", label: "Services", href: "#services", type: "nav" },
  { id: "fl-6", label: "Gallery", href: "#gallery", type: "nav" },
  { id: "fl-7", label: "Testimonials", href: "#testimonials", type: "nav" },
  { id: "fl-8", label: "Contact", href: "#contact", type: "nav" },
];

export const dashboardStats: DashboardStats = {
  totalProjects: 6,
  totalServices: 3,
  totalTestimonials: 3,
  unreadMessages: 2,
};
