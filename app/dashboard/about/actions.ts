"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAboutAndStats(data: {
  paragraphs: { id: number; content: string }[];
  stats: { id: number; label: string; value: string }[];
}) {
  try {
    // Update About paragraphs
    await Promise.all(
      data.paragraphs.map((p) =>
        prisma.about.update({
          where: { id: p.id },
          data: { content: p.content },
        })
      )
    );

    // Update QuickStats
    await Promise.all(
      data.stats.map((s) =>
        prisma.quickStats.update({
          where: { id: s.id },
          data: { label: s.label, value: s.value },
        })
      )
    );

    revalidatePath("/");
    revalidatePath("/dashboard/about");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update about and stats:", error);
    return { success: false, error: "Failed to update changes" };
  }
}
