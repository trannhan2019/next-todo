import { Paper, Stack, Title } from "@mantine/core";
import classes from "./page.module.css";
// import AddTodoForm from "@/components/AddTodoForm";
import TodoList from "@/components/TodoList";
import { PrismaClient } from "@prisma/client";
import AddTodoForm2 from "@/components/AddTodoForm2";

const prisma = new PrismaClient();
async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      title: true,
      id: true,
      isCompleted: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

const TodoPage = async () => {
  const data = await getData();
  return (
    <div className={classes.wrapper}>
      <Paper withBorder shadow="xs" p="xl">
        <Title mb={"md"} order={1}>
          Todo App
        </Title>
        {/* <AddTodoForm /> */}
        <AddTodoForm2 />
        <TodoList todoList={data} />
      </Paper>
    </div>
  );
};

export default TodoPage;
