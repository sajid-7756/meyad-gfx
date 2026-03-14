"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTestimonial(formData: FormData) {
  const quote = formData.get("quote") as string;
  const author = formData.get("author") as string;
  const role = formData.get("role") as string;

  if (!quote || !author || !role) {
    throw new Error("Missing required fields");
  }

  await prisma.testimonial.create({
    data: {
      quote,
      author,
      role,
    },
  });

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
}

export async function updateTestimonial(id: number, formData: FormData) {
  const quote = formData.get("quote") as string;
  const author = formData.get("author") as string;
  const role = formData.get("role") as string;

  if (!quote || !author || !role) {
    throw new Error("Missing required fields");
  }

  await prisma.testimonial.update({
    where: { id },
    data: {
      quote,
      author,
      role,
    },
  });

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: number) {
  await prisma.testimonial.delete({
    where: { id },
  });

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
}
