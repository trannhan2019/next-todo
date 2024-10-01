"use client";

import { create2 } from "@/actions/todo.action";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const AddTodoForm2 = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      input: "",
    },
  });

  const onSubmit = (values: any) => {
    console.log(values);

    create2(values);
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Group align="center">
        <TextInput
          placeholder="Add Todo"
          key={form.key("input")}
          {...form.getInputProps("input")}
        />
        <Button size="sm" type="submit">
          Add Todo
        </Button>
      </Group>
    </form>
  );
};

export default AddTodoForm2;
