import { prisma } from "@/utils/prisma";
import { authRegisterSchema } from "@/validate-rules/auth";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = authRegisterSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error while Registeing", error);
    return NextResponse.json(
      { message: "Error Occured While Registering the user." },
      { status: 500 }
    );
  }
}
