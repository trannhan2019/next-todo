import { Button, Group, TextInput } from "@mantine/core";
import React from "react";

const AddTodoForm = () => {
  return (
    <form action="">
      <Group align="center">
        <TextInput placeholder="Add Todo" />
        <Button size="sm" type="submit">
          Add Todo
        </Button>
      </Group>
    </form>
  );
};

export default AddTodoForm;
