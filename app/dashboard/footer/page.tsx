import prisma from "@/lib/prisma";
import FooterClient from "./footer-client";

export default async function FooterPage() {
  const links = await prisma.footerLink.findMany();
  // Filter out any lingering nav links or uncategorized links to only manage social
  const socialLinks = links.filter((l) => l.type === "social");

  return <FooterClient socialLinks={socialLinks} />;
}
