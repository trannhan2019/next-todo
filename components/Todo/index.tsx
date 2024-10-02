import { todoType } from "@/types/todo.type";
import { Button } from "@mantine/core";
import React from "react";

interface Props {
  todo: todoType;
}
const Todo = ({ todo }: Props) => {
  return (
    <Button variant="subtle" my={20} size="sm" radius="md" fullWidth>
      {todo.title}
    </Button>
  );
};

export default Todo;
