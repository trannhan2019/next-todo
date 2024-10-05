"use client";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { authRegisterSchema } from "@/validate-rules/auth";

// interface FormValues {
//   username: string;
//   password: string;
// }

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: zodResolver(authRegisterSchema),
  });
  const handleSubmit = async (values: typeof form.values) => {
    // console.log(values);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push("/login");
        notifications.show({
          color: "green",
          title: "Default notification",
          message: "Do not forget to star Mantine on GitHub! 🌟",
        });
        form.reset();
      } else {
        console.log(res);
        if (res.status === 409) {
          notifications.show({
            color: "red",
            title: "User already exists",
            message: "It is red",
            position: "top-right",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = async (values: typeof form.values) => {
  //   console.log(values);
  //   const res = await fetch("/api/auth/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   });

  //   if (res.ok) {
  //     router.push("/login");
  //     console.log("User registration done");
  //     notifications.show({
  //       title: "Default notification",
  //       message: "Do not forget to star Mantine on GitHub! 🌟",
  //     });
  //   } else {
  //     console.log("Something went wrong in else block");
  //     notifications.show({
  //       color: "red",
  //       title: "Notification with custom styles",
  //       message: "It is red",
  //     });
  //   }
  // };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Username"
        placeholder="yourname"
        required
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Email address"
        placeholder="you@mantine.dev"
        mt={"md"}
        required
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
        mt="md"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      <Button type="submit" fullWidth mt="xl">
        Sign in
      </Button>
    </form>
  );
}
