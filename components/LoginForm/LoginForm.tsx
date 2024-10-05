"use client";

import {
  Anchor,
  Button,
  Checkbox,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, zodResolver } from "@mantine/form";
import { authLoginSchema } from "@/validate-rules/auth";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(authLoginSchema),
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: callbackUrl || "/",
      });

      if (res?.ok) {
        router.push(callbackUrl || "/");
        setLoading(false);
      } else {
        notifications.show({
          title: "Error",
          message: "Invalid email or password",
          color: "red",
          position: "top-right",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        label="Email address"
        placeholder="hello@gmail.com"
        size="md"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        size="md"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      <Checkbox label="Keep me logged in" mt="xl" size="md" />
      <Text c="dimmed" size="sm" mt={5}>
        Do you have an account yet?{" "}
        <Anchor href="/register" size="sm" component={Link}>
          Register account
        </Anchor>
      </Text>
      <Button type="submit" loading={loading} fullWidth mt="xl" size="sm">
        Login
      </Button>
    </form>
  );
}
