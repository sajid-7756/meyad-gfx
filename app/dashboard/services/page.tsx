import prisma from "@/lib/prisma";
import ServicesClient from "./services-client";

export default async function ServicesPage() {
  const items = await prisma.service.findMany({
    orderBy: { id: "asc" },
  });

  return <ServicesClient initialItems={items} />;
}
