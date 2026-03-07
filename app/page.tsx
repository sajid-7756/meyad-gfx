const services = [
  {
    title: "Brand Identity",
    desc: "Logos, color systems, and typography kits that make brands instantly recognizable.",
  },
  {
    title: "Social Media Design",
    desc: "Scroll-stopping post carousels, story templates, and ad creatives optimized for engagement.",
  },
  {
    title: "Motion Graphics",
    desc: "Short animated promos and reels with clean transitions, pacing, and visual impact.",
  },
];

const projects = [
  { name: "Lunar Coffee", type: "Cafe Branding" },
  { name: "Volt Studio", type: "Fitness Campaign" },
  { name: "Nova Wear", type: "Streetwear Launch" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0e1116] text-[#f7f8fa]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,#53e3ff33,transparent_35%),radial-gradient(circle_at_85%_10%,#ff7a1833,transparent_30%),radial-gradient(circle_at_55%_75%,#7aff9330,transparent_35%)]" />

      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-10 md:px-10 md:pt-16">
        <header className="flex items-center justify-between rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">
          <p className="text-sm font-semibold tracking-[0.22em] text-white/80">
            MIYAD-GFX
          </p>
          <a
            href="#contact"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:scale-105"
          >
            Book Project
          </a>
        </header>

        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div className="space-y-6">
            <p className="inline-block rounded-full border border-[#53e3ff55] bg-[#53e3ff1f] px-3 py-1 text-xs font-medium tracking-wide text-[#a6f4ff]">
              Graphics • Branding • Motion
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Design that makes your brand impossible to ignore.
            </h1>
            <p className="max-w-xl text-base text-white/75 md:text-lg">
              Miyad GFX builds bold visuals for creators, startups, and local
              businesses. Fast turnaround, clear communication, and premium
              results.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#portfolio"
                className="rounded-full bg-[#53e3ff] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#89edff]"
              >
                View Work
              </a>
              <a
                href="#services"
                className="rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10"
              >
                Explore Services
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-5 backdrop-blur-md">
            <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-white/60">
              QUICK STATS
            </p>
            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
              {[
                ["120+", "Projects Delivered"],
                ["48h", "Rush Delivery Option"],
                ["4.9/5", "Client Satisfaction"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/15 bg-black/30 px-4 py-3"
                >
                  <p className="text-2xl font-black text-[#53e3ff]">{value}</p>
                  <p className="text-sm text-white/75">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative mx-auto w-full max-w-6xl px-6 py-10 md:px-10">
        <h2 className="mb-5 text-2xl font-extrabold sm:text-3xl">Services</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-white/75">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="portfolio" className="relative mx-auto w-full max-w-6xl px-6 py-10 md:px-10">
        <h2 className="mb-5 text-2xl font-extrabold sm:text-3xl">Recent Work</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.12] to-white/[0.03] p-5"
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-white/60">
                0{index + 1}
              </p>
              <h3 className="mt-2 text-xl font-bold">{project.name}</h3>
              <p className="text-sm text-white/70">{project.type}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-10">
        <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-7 md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Let&apos;s build your next visual campaign.
            </h2>
            <p className="mt-2 text-sm text-white/75">
              Message Miyad GFX to get a custom quote and timeline for your
              project.
            </p>
          </div>
          <a
            href="mailto:hello@miyadgfx.com"
            className="mt-5 inline-block rounded-full bg-[#ff7a18] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#ffa35e] md:mt-0"
          >
            hello@miyadgfx.com
          </a>
        </div>
      </section>
    </main>
  );
}
