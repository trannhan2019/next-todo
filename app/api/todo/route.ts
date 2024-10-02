// import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { todoAddSchema } from "@/validate-rules/todo";

// const prisma = new PrismaClient();

//1. validation

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    const validation = todoAddSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.format() },
        { status: 400 }
      );
    }

    const { title } = body;
    const todo = await prisma.todo.create({
      data: {
        title,
      },
    });
    return NextResponse.json(todo, {
      status: 201,
    });
  } catch (error) {
    console.log("Error while Registeing", error);
    return NextResponse.json(
      { message: "Error Occured While Registering the user." },
      { status: 500 }
    );
  }
}
