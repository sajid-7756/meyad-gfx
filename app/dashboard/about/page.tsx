import prisma from "@/lib/prisma";
import AboutClient from "./about-client";

export default async function AboutPage() {
  const [paragraphs, stats] = await Promise.all([
    prisma.about.findMany({ orderBy: { id: "asc" } }),
    prisma.quickStats.findMany({ orderBy: { id: "asc" } }),
  ]);

  return (
    <AboutClient 
      initialParagraphs={paragraphs} 
      initialStats={stats} 
    />
  );
}
