"use client";

// import { create2 } from "@/actions/todo.action";
import { Button, FocusTrap, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { todoAddSchema } from "@/validate-rules/todo";
import { createTodo } from "@/services/todo.services";
import { useState } from "react";

const TodoAddForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },
    validate: zodResolver(todoAddSchema),
  });

  const onSubmit = async (values: any) => {
    // console.log(values);
    setLoading(true);
    try {
      const res = await createTodo(values);

      if (res.ok) {
        router.refresh();
        form.reset();
        setLoading(false);
        notifications.show({
          title: "Success",
          message: "Todo added successfully",
          color: "green",
        });
      } else {
        console.log("Error while Registeing", res);
        setLoading(false);
        notifications.show({
          title: "Error",
          message: "Error while Registeing",
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Group align="center">
        <FocusTrap>
          <TextInput
            placeholder="Add Todo"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
        </FocusTrap>
        <Button size="sm" loading={loading} type="submit">
          Add Todo
        </Button>
      </Group>
    </form>
  );
};

export default TodoAddForm;
