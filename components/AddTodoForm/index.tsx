import { create } from "@/actions/todo.action";
import { Button, Group, TextInput } from "@mantine/core";

const AddTodoForm = () => {
  return (
    <form action={create}>
      <Group align="center">
        <TextInput placeholder="Add Todo" name="input" />
        <Button size="sm" type="submit">
          Add Todo
        </Button>
      </Group>
    </form>
  );
};

export default AddTodoForm;
