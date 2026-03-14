"use server";

import prisma from "@/lib/prisma";

export async function submitContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const projectType = formData.get("projectType") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !projectType || !message) {
    throw new Error("Missing required fields");
  }

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      projectType,
      message,
    },
  });
}
