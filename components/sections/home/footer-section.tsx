import { SectionContainer } from "@/components/shared/section-container";

interface FooterLink {
  id: string;
  label: string;
  href: string;
  type: string;
  icon?: string | null;
}

interface FooterSectionProps {
  navLinks?: FooterLink[];
  socialLinks?: FooterLink[];
}

const defaultNavLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const iconMap: Record<string, React.ReactNode> = {
  instagram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  facebook: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  globe: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

export function FooterSection({ navLinks, socialLinks }: FooterSectionProps) {
  const displayNavLinks = navLinks || defaultNavLinks;
  const displaySocialLinks = socialLinks || [];
  return (
    <footer className="relative border-t border-white/10 bg-[#090b0f]">
      {/* Subtle glow accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#53e3ff]/40 to-transparent" />

      <SectionContainer className="pb-8 pt-12">
        <div className="grid gap-10 md:grid-cols-3 md:items-start">
          {/* Brand column */}
          <div className="space-y-4">
            <a href="#home" className="text-lg font-extrabold tracking-[0.22em] text-white">
              MEYAD-GFX
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              Production-grade visual design studio. Bold brands, social
              creatives, and motion graphics — crafted for impact.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.22em] text-white/50">
              QUICK LINKS
            </p>
            <nav className="flex flex-col gap-2">
              {displayNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-white/65 transition-colors hover:text-[#53e3ff]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social + CTA */}
          <div className="space-y-5">
            <p className="text-xs font-semibold tracking-[0.22em] text-white/50">
              CONNECT
            </p>
            <div className="flex gap-3">
              {displaySocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:border-[#53e3ff]/40 hover:bg-[#53e3ff]/10 hover:text-[#53e3ff]"
                >
                  {social.icon && iconMap[social.icon] ? iconMap[social.icon] : iconMap.globe}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/8 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Meyad GFX. All rights reserved.
            </p>
            <p className="text-xs text-white/30">
              Designed with precision & intent
            </p>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}
