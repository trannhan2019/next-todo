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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const skip = (page - 1) * limit;
    const take = limit;

    const todos = await prisma.todo.findMany({
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.todo.count();
    const pages = Math.ceil(total / limit);
    return NextResponse.json({ todos, total, pages });
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}
