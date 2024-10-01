import { todoType } from "@/types/todo.type";
import React from "react";
import Todo from "../Todo";

interface Props {
  todoList: todoType[];
}

const TodoList = ({ todoList }: Props) => {
  return (
    <>
      {todoList.map((todo: todoType) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default TodoList;
