import type { StatItem } from "@/types/home";

type HeroSectionProps = {
  stats: StatItem[];
};

export function HeroSection({ stats }: HeroSectionProps) {

  return (
    <section id="home" className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-10 md:px-10 md:pt-16">
      <header className="js-hero flex items-center justify-between rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">
        <a href="#home" className="text-sm font-semibold tracking-[0.22em] text-white/80 cursor-pointer">MEYAD-GFX</a>
        <a
          href="#contact"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:scale-105"
        >
          Book Project
        </a>
      </header>

      <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
        <div className="js-hero space-y-6">
          <p className="inline-block rounded-full border border-[#53e3ff55] bg-[#53e3ff1f] px-3 py-1 text-xs font-medium tracking-wide text-[#a6f4ff]">
            Graphics • Branding • Motion
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Design that makes your brand impossible to ignore.
          </h1>
          <p className="max-w-xl text-base text-white/75 md:text-lg">
            Production-grade visual design studio for creators, startups, and
            local businesses. Distinct look, fast turnaround, no generic output.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#gallery"
              className="rounded-full bg-[#53e3ff] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#89edff]"
            >
              View Gallery
            </a>
            <a
              href="/Meyad-gfx-portfolio.pdf"
              download
              className="rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10"
            >
              Download Portfolio PDF
            </a>
          </div>
        </div>

        <div className="js-hero-stats rounded-3xl border border-white/20 bg-white/3 p-5 backdrop-blur-md">
          <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-white/60">
            QUICK STATS
          </p>
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/15 bg-black/30 px-4 py-3"
              >
                <p className="text-2xl font-black text-[#53e3ff]">{stat.value}</p>
                <p className="text-sm text-white/75">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
