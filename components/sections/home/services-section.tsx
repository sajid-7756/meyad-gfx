import { SectionContainer } from "@/components/shared/section-container";
import prisma from "@/lib/prisma";

type ServiceSType = {
  id: number;
  title: string;
  description: string;
}[];

export async function ServicesSection() {
  const services: ServiceSType = await prisma.service.findMany();

  return (
    <SectionContainer id="services" className="js-reveal">
      <h2 className="mb-5 text-2xl font-extrabold sm:text-3xl">Services</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.id}
            className="rounded-2xl border border-white/15 bg-white/4 p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/8"
          >
            <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
            <p className="text-sm leading-relaxed text-white/75">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}
