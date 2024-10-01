import { Anchor } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h3>Home Page</h3>
      <Anchor component={Link} href={"/todo"}>
        Todo App
      </Anchor>
    </div>
  );
}
