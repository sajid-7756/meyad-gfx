import { SectionContainer } from "@/components/shared/section-container";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
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
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1CFcgqkWEu/",
    icon: (
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
  },
  {
    label: "Behance",
    href: "https://www.behance.net/meyadgfx",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.gg/6eqtHzwVH",
    icon: (
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
        <path d="M8.5 8.5c.8-.6 1.8-1 3.5-1s2.7.4 3.5 1" />
        <path d="M7 16c1.2.8 2.8 1.3 5 1.3s3.8-.5 5-1.3" />
        <path d="M5.5 7.5c3-2 10-2 13 0 1.5 3 1.5 6 0 9-3 2-10 2-13 0-1.5-3-1.5-6 0-9z" />
        <circle cx="9" cy="12" r="1" />
        <circle cx="15" cy="12" r="1" />
      </svg>
    ),
  },
];

export function FooterSection() {
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
              {navLinks.map((link) => (
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
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:border-[#53e3ff]/40 hover:bg-[#53e3ff]/10 hover:text-[#53e3ff]"
                >
                  {social.icon}
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
