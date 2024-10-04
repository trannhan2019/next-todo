import { Paper, Title } from "@mantine/core";
import classes from "./page.module.css";
// import AddTodoForm from "@/components/AddTodoForm";
import TodoList from "@/components/TodoList/TodoList";
// import { PrismaClient } from "@prisma/client";
import TodoAddForm from "@/components/TodoAddForm/TodoAddForm";
import { getTodos } from "@/services/todo.services";
import TodoPagination from "@/components/TodoPanigation/TodoPanigation";
import TodoSearch from "@/components/TodoSearch/TodoSearch";

import { Metadata } from "next";

// const prisma = new PrismaClient();
// async function getData() {
//   const data = await prisma.todo.findMany({
//     select: {
//       title: true,
//       id: true,
//       isCompleted: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   return data;
// }

export const metadata: Metadata = {
  title: "Todo App",
};

const TodoPage = async ({ searchParams }: any) => {
  const data = await getTodos(searchParams);

  // console.log("todos tu page todo o server component", data);

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
