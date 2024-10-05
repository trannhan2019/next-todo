import { Paper, Title } from "@mantine/core";
import classes from "./page.module.css";
import TodoList from "@/components/TodoList/TodoList";
// import { PrismaClient } from "@prisma/client";
import TodoAddForm from "@/components/TodoAddForm/TodoAddForm";
// import { getTodos } from "@/services/todo.services";

import TodoPagination from "@/components/TodoPanigation/TodoPanigation";
import TodoSearch from "@/components/TodoSearch/TodoSearch";

import { Metadata } from "next";

import { URL_API } from "@/lib/contants";
import { prisma } from "@/utils/prisma";

type PageProps = {
  params?: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// interface searchParams{
//   page?: string;
//   limit?: string;
// }

export const metadata: Metadata = {
  title: "Todo App",
};

// FETCH DATA
// 1. FETCH TU API
const fetchTodos = async (query: any) => {
  try {
    const res = await fetch(
      `${URL_API}/todo?${new URLSearchParams(query as any)}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }
    return res.json();
  } catch (error) {
    console.log("error", error);
  }
};

// 2. FETCH TU PRISMA
const fetchTodosPrisma = async (query: any) => {
  try {
    const page = parseInt(query?.page || "1");
    const limit = parseInt(query?.limit || "5");
    const skip = (page - 1) * limit;
    const take = limit;
    const search = query?.search || "";

    let where: any = {};
    if (search) {
      where = {
        title: {
          contains: search,
          mode: "insensitive",
        },
      };
    }
    const todos = await prisma.todo.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.todo.count({ where });
    const totalPages = Math.ceil(total / limit);

    return { todos, totalPages };
  } catch (error) {
    console.log("error todo", error);
  }
};

const TodoPage = async ({ searchParams }: PageProps) => {
  console.log("searchParams", searchParams);

  // const data = await fetchTodos(searchParams);//cach 01
  const data = await fetchTodosPrisma(searchParams); //cach 02

  return (
    <div className={classes.wrapper}>
      <Paper withBorder shadow="xs" p="xl">
        <Title mb={"md"} order={1}>
          Todo App
        </Title>
        <TodoSearch />
        <TodoAddForm />
        <TodoList todos={data?.todos as any} />
        <TodoPagination total={data?.totalPages} />
      </Paper>
    </div>
  );
};

export default TodoPage;
