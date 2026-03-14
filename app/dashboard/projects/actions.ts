"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "meyad-gfx/projects" }, (error, result) => {
        if (error || !result) {
          reject(error || new Error("Failed to upload image."));
          return;
        }
        resolve(result.secure_url);
      })
      .end(buffer);
  });
}

export async function createProject(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File | null;

  if (!name || !category || !imageFile || imageFile.size === 0) {
    throw new Error("Missing required fields");
  }

  const imageUrl = await uploadImage(imageFile);

  await prisma.project.create({
    data: {
      name,
      category,
      image: imageUrl,
    },
  });

  revalidatePath("/dashboard/projects");
  revalidatePath("/");
}

export async function updateProject(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File | null;
  const existingImageUrl = formData.get("existingImage") as string;

  if (!name || !category) {
    throw new Error("Missing required fields");
  }

  let imageUrl = existingImageUrl;

  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage(imageFile);
  }

  await prisma.project.update({
    where: { id },
    data: {
      name,
      category,
      image: imageUrl,
    },
  });

  revalidatePath("/dashboard/projects");
  revalidatePath("/");
}

export async function deleteProject(id: number) {
  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/dashboard/projects");
  revalidatePath("/");
}
