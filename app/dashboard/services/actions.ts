"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createService(data: { title: string; description: string }) {
  try {
    const service = await prisma.service.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });
    revalidatePath("/dashboard/services");
    revalidatePath("/");
    return { success: true, data: service };
  } catch (error) {
    console.error("Failed to create service:", error);
    return { success: false, error: "Failed to create service" };
  }
}

export async function updateService(id: number, data: { title: string; description: string }) {
  try {
    const service = await prisma.service.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
      },
    });
    revalidatePath("/dashboard/services");
    revalidatePath("/");
    return { success: true, data: service };
  } catch (error) {
    console.error("Failed to update service:", error);
    return { success: false, error: "Failed to update service" };
  }
}

export async function deleteService(id: number) {
  try {
    await prisma.service.delete({
      where: { id },
    });
    revalidatePath("/dashboard/services");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete service:", error);
    return { success: false, error: "Failed to delete service" };
  }
}
