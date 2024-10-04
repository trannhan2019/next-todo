import { todoType } from "@/types/todo.type";
import Todo from "../Todo/Todo";

// interface Props {
//   todos: todoType[];
//   total: string;
//   pages: string;
// }

const TodoList = ({ todos }: any) => {
  // console.log(data);

  return (
    <>
      {todos?.map((todo: todoType) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default TodoList;
