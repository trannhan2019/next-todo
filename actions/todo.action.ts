"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function create(formData: FormData) {
  const input = formData.get("input") as string;

  if (!input.trim()) {
    return;
  }

  await prisma.todo.create({
    data: {
      title: input,
    },
  });

  revalidatePath("/");
}

export async function create2(values: any) {
  const input = values.input;

  if (!input.trim()) {
    return;
  }

  await prisma.todo.create({
    data: {
      title: input,
    },
  });

  revalidatePath("/");
}
