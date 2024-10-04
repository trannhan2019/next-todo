import { todoType } from "@/types/todo.type";
import { Button, Card, Group, Modal, Switch, TextInput } from "@mantine/core";

interface TodoEditModalProps {
  opened: boolean;
  close: () => void;

  todo: todoType;
}
const TodoEditModal = ({ opened, close, todo }: TodoEditModalProps & {}) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      closeOnClickOutside={false}
      centered
      title="Edit Todo"
    >
      <Card>
        <form>
          <Card.Section>
            <TextInput label="Edit Title" value={todo?.title as string} />
            <Switch label="Completed" checked={todo?.isCompleted} mt={10} />
          </Card.Section>
          <Card.Section mt={"md"}>
            <Group justify="flex-end">
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button variant="gradient">Save</Button>
            </Group>
          </Card.Section>
        </form>
      </Card>
    </Modal>
  );
};

export default TodoEditModal;
