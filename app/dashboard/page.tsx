import { authOptions } from "@/lib/auth";
import { Anchor } from "@mantine/core";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
  description: "Page description",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // console.log(session?.user?.role);

  if (!session) {
    redirect("/login");
  }

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div>
      <h3>Dashboard Page</h3>
      <Anchor component={Link} href="/">
        HomePage
      </Anchor>
    </div>
  );
}
