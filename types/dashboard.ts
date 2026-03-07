export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  date: string;
  read: boolean;
};

export type FooterLink = {
  id: string;
  label: string;
  href: string;
  type: "social" | "nav";
  icon?: string;
};

export type DashboardStats = {
  totalProjects: number;
  totalServices: number;
  totalTestimonials: number;
  unreadMessages: number;
};
