import { Paper, Stack, Title } from "@mantine/core";
import classes from "./page.module.css";
import AddTodoForm from "@/components/AddTodoForm";

const TodoPage = () => {
  return (
    <div className={classes.wrapper}>
      <Paper withBorder shadow="xs" p="xl">
        <Title mb={"md"} order={1}>
          Todo App
        </Title>
        <AddTodoForm />
        <p>Todo List</p>
      </Paper>
    </div>
  );
};

export default TodoPage;
