import {
  Button,
  Center,
  Checkbox,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./style.module.css";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.bgImage}></div>
      <div className={classes.form}>
        <Center h={"100%"} w={"100%"}>
          <Paper>
            <Title order={2} ta="center" mb={50}>
              Welcome back to Mantine!
            </Title>
            <LoginForm />
          </Paper>
        </Center>
      </div>
    </div>
  );
}
