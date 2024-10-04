import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { todoAddSchema } from "@/validate-rules/todo";

interface Props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = params;
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    await prisma.todo.delete({
      where: { id: todo.id },
    });

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error while Registeing", error);
    return NextResponse.json(
      { message: "Error Occured While Registering the user." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { id } = params;
    const body = await request.json();
    const validation = todoAddSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.format() },
        {
          status: 400,
        }
      );
    }

    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    const { title, isCompleted } = body;
    const todoUpdate = await prisma.todo.update({
      where: { id: todo.id },
      data: {
        title,
        isCompleted,
      },
    });

    return NextResponse.json(todoUpdate, {
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
