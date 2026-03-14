"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSocialLink(formData: FormData) {
  const label = formData.get("label") as string;
  const href = formData.get("href") as string;
  const icon = formData.get("icon") as string;

  if (!label || !href || !icon) {
    throw new Error("Missing required fields");
  }

  await prisma.footerLink.create({
    data: {
      label,
      href,
      icon,
      type: "social",
    },
  });

  revalidatePath("/dashboard/footer");
  revalidatePath("/");
}

export async function updateSocialLink(id: string, formData: FormData) {
  const label = formData.get("label") as string;
  const href = formData.get("href") as string;
  const icon = formData.get("icon") as string;

  if (!label || !href || !icon) {
    throw new Error("Missing required fields");
  }

  await prisma.footerLink.update({
    where: { id },
    data: {
      label,
      href,
      icon,
      type: "social",
    },
  });

  revalidatePath("/dashboard/footer");
  revalidatePath("/");
}

export async function deleteSocialLink(id: string) {
  await prisma.footerLink.delete({
    where: { id },
  });

  revalidatePath("/dashboard/footer");
  revalidatePath("/");
}
