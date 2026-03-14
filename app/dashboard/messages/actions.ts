"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUnreadCount(): Promise<number> {
  return prisma.contactMessage.count({ where: { read: false } });
}

export async function markAsRead(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  });

  revalidatePath("/dashboard/messages");
}

export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({
    where: { id },
  });

  revalidatePath("/dashboard/messages");
}
