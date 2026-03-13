import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { galleryItems, testimonials, services } from "../data/home-content";
import { contactMessages, footerLinks } from "../data/dashboard-data";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  // Seed Projects (from galleryItems)
  console.log("Seeding projects...");
  for (const item of galleryItems) {
    await prisma.project.create({
      data: {
        name: item.name,
        category: item.category,
        image: item.image,
      },
    });
  }

  // Seed Testimonials
  console.log("Seeding testimonials...");
  for (const item of testimonials) {
    await prisma.testimonial.create({
      data: {
        quote: item.quote,
        author: item.author,
        role: item.role,
      },
    });
  }

  // Seed Services
  console.log("Seeding services...");
  for (const item of services) {
    await prisma.service.create({
      data: {
        title: item.title,
        description: item.description,
      },
    });
  }

  // Seed Contact Messages
  console.log("Seeding contact messages...");
  for (const item of contactMessages) {
    await prisma.contactMessage.create({
      data: {
        name: item.name,
        email: item.email,
        projectType: item.projectType,
        message: item.message,
        date: new Date(item.date),
        read: item.read,
      },
    });
  }

  // Seed Footer Links
  console.log("Seeding footer links...");
  for (const item of footerLinks) {
    await prisma.footerLink.create({
      data: {
        label: item.label,
        href: item.href,
        type: item.type,
        icon: item.icon || null,
      },
    });
  }

  // Seed Quick Stats
  console.log("Seeding quick stats...");
  const stats = [
    { label: "Projects Delivered", value: "120+" },
    { label: "Rush Delivery Option", value: "48h" },
    { label: "Client Satisfaction", value: "4.9/5" },
  ];
  for (const stat of stats) {
    await prisma.quickStats.create({
      data: {
        label: stat.label,
        value: stat.value,
      },
    });
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
  });
