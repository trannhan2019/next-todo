import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { authOptions } from "@/lib/auth";
import { Anchor, Paper, Title, Text, Container } from "@mantine/core";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <Container size={420} my={60}>
      <Title ta="center">Register Your Account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do you have an account yet?{" "}
        <Anchor href="/login" size="sm" component={Link}>
          Login account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <RegisterForm />
      </Paper>
    </Container>
  );
}
