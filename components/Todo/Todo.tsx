"use client";

import { modals } from "@mantine/modals";
import { todoType } from "@/types/todo.type";
import {
  Button,
  ButtonGroup,
  Group,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconCancel, IconEdit } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import TodoEditModal from "../TodoEditModal/TodoEditModal";
import { deleteTodo } from "@/services/todo.services";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

interface Props {
  todo: todoType;
}
const Todo = ({ todo }: Props) => {
  // console.log("todo tai client todo", todo);
  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();

  const openModal = () =>
    modals.openConfirmModal({
      title: "Delete your profile",
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      // onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        try {
          await deleteTodo(todo.id);
          router.refresh();
          notifications.show({
            title: "Success",
            message: "Todo deleted successfully",
            color: "green",
          });
        } catch (error) {
          notifications.show({
            title: "Error",
            message: "Error while deleting todo",
            color: "red",
          });
        }
      },
    });

  return (
    <>
      <Group justify="space-between">
        <UnstyledButton variant="subtle">
          <Text py={10} c={todo.isCompleted ? "green" : ""}>
            {todo.title}
          </Text>
        </UnstyledButton>

        <ButtonGroup>
          <Button variant="white" onClick={open}>
            <IconEdit size={18} />
          </Button>
          <Button variant="white" onClick={openModal}>
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
