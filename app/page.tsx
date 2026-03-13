import {
  AboutSection,
  ContactSection,
  FooterSection,
  GallerySection,
  HeroSection,
  ServicesSection,
  TestimonialsSection,
  HomeClient,
} from "@/components/sections/home";
import prisma from "@/lib/prisma";

export default async function Home() {
  const [heroStats, services, galleryItems, testimonials, footerLinks, aboutParagraphs] =
    await Promise.all([
      prisma.quickStats.findMany({ orderBy: { id: "asc" } }),
      prisma.service.findMany({ orderBy: { id: "asc" } }),
      prisma.project.findMany({ orderBy: { id: "asc" } }),
      prisma.testimonial.findMany({ orderBy: { id: "asc" } }),
      prisma.footerLink.findMany(),
      prisma.about.findMany({ orderBy: { id: "asc" } }),
    ]);

    console.log(aboutParagraphs)

  const socialLinks = footerLinks.filter((l) => l.type === "social");
  const navLinks = footerLinks.filter((l) => l.type === "nav");

  return (
    <HomeClient>
      <HeroSection stats={heroStats} />
      <AboutSection paragraphs={aboutParagraphs} />
      <ServicesSection items={services} />
      <GallerySection items={galleryItems} />
      <TestimonialsSection items={testimonials} />
      <ContactSection />
      <FooterSection navLinks={navLinks} socialLinks={socialLinks} />
    </HomeClient>
  );
}
