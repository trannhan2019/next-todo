import { todoType } from "@/types/todo.type";
import Todo from "../Todo";

interface Props {
  todos: todoType[];
  total: string;
  pages: string;
}

const TodoList = ({ data }: any) => {
  // console.log(data);
  return (
    <>
      {data?.todos?.map((todo: todoType) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default TodoList;
