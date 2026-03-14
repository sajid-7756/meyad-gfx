import prisma from "@/lib/prisma";
import { TestimonialsClient } from "./testimonials-client";

export default async function TestimonialsPage() {
  const items = await prisma.testimonial.findMany({
    orderBy: { id: "desc" },
  });

  return <TestimonialsClient items={items} />;
}
