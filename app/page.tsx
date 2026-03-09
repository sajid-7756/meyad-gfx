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
import {
  galleryItems,
  heroStats,
  services,
  testimonials,
} from "@/data/home-content";

export default function Home() {
  return (
    <HomeClient>
      <HeroSection stats={heroStats} />
      <AboutSection />
      <ServicesSection items={services} />
      <GallerySection items={galleryItems} />
      <TestimonialsSection items={testimonials} />
      <ContactSection />
      <FooterSection />
    </HomeClient>
  );
}
