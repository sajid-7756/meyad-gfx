import prisma from "@/lib/prisma";
import { ProjectsClient } from "./projects-client";

export default async function ProjectsPage() {
  const items = await prisma.project.findMany({
    orderBy: { id: "desc" },
  });

  return <ProjectsClient items={items} />;
}
