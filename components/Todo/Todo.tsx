"use client";

import { todoType } from "@/types/todo.type";
import { Button, ButtonGroup, Group, rem } from "@mantine/core";
import { IconCancel, IconEdit } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import TodoEditModal from "../TodoEditModal/TodoEditModal";

interface Props {
  todo: todoType;
}
const Todo = ({ todo }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group justify="space-between">
        <Button
          variant="subtle"
          my={10}
          size="sm"
          radius="md"
          color={todo?.isCompleted ? "green" : "gray"}
        >
          {todo.title}
        </Button>

        <ButtonGroup>
          <Button variant="outline" onClick={open}>
            <IconEdit size={18} />
          </Button>
          <Button variant="outline">
            <IconCancel size={18} color="red" />
          </Button>
        </ButtonGroup>
      </Group>

      {/* Edit Modal */}
      <TodoEditModal opened={opened} close={close} todo={todo} />
    </>
  );
};

export default Todo;
