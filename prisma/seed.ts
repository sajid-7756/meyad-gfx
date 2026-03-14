import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding minimal records...");

  // Seed default About paragraphs if they don't exist
  const aboutCount = await prisma.about.count();
  if (aboutCount === 0) {
    await prisma.about.create({
      data: {
        title: "Paragraph 1",
        content: "I design modern visual systems that help brands look more premium, memorable, and conversion-focused.",
      },
    });
    await prisma.about.create({
      data: {
        title: "Paragraph 2",
        content: "My workflow blends strategy, visual storytelling, and motion to create assets that perform on social, web, and ads.",
      },
    });
    console.log("Seeded basic About entries.");
  }

  // Seed default QuickStats if they don't exist
  const statsCount = await prisma.quickStats.count();
  if (statsCount === 0) {
    await prisma.quickStats.create({ data: { label: "Years Experience", value: "3+" } });
    await prisma.quickStats.create({ data: { label: "Happy Clients", value: "50+" } });
    await prisma.quickStats.create({ data: { label: "Projects Done", value: "100+" } });
    console.log("Seeded basic QuickStats entries.");
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
